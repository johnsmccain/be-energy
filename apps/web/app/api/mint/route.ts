import { NextRequest, NextResponse } from "next/server"
import * as StellarSdk from "@stellar/stellar-sdk"
import { supabase } from "@/lib/supabase"
import { CONTRACTS, STELLAR_CONFIG, NETWORK_PASSPHRASE } from "@/lib/contracts-config"

export async function POST(req: NextRequest) {
  try {
    const { reading_id } = await req.json()

    if (!reading_id) {
      return NextResponse.json({ error: "Missing reading_id" }, { status: 400 })
    }

    // Fetch reading and validate status
    const { data: reading, error: readingError } = await supabase
      .from("readings")
      .select("*, prosumers(stellar_address)")
      .eq("id", reading_id)
      .single()

    if (readingError || !reading) {
      return NextResponse.json({ error: "Reading not found" }, { status: 404 })
    }

    if (reading.status !== "pending") {
      return NextResponse.json(
        { error: `Reading status is '${reading.status}', expected 'pending'` },
        { status: 400 }
      )
    }

    const prosumerAddress = reading.prosumers.stellar_address
    const minterSecret = process.env.MINTER_SECRET_KEY
    if (!minterSecret) {
      return NextResponse.json({ error: "MINTER_SECRET_KEY not configured" }, { status: 500 })
    }

    const contractAddress = CONTRACTS.ENERGY_TOKEN
    if (!contractAddress) {
      return NextResponse.json({ error: "ENERGY_TOKEN contract not configured" }, { status: 500 })
    }

    // Convert kWh to stroops (7 decimals)
    const amountInStroops = BigInt(Math.round(reading.kwh_injected * 1e7))

    // Build and submit mint transaction
    const server = new StellarSdk.rpc.Server(STELLAR_CONFIG.RPC_URL)
    const minterKeypair = StellarSdk.Keypair.fromSecret(minterSecret)
    const minterAccount = await server.getAccount(minterKeypair.publicKey())
    const contract = new StellarSdk.Contract(contractAddress)

    const transaction = new StellarSdk.TransactionBuilder(minterAccount, {
      fee: "100000",
      networkPassphrase: NETWORK_PASSPHRASE,
    })
      .addOperation(
        contract.call(
          "mint_energy",
          StellarSdk.nativeToScVal(prosumerAddress, { type: "address" }),
          StellarSdk.nativeToScVal(amountInStroops, { type: "i128" })
        )
      )
      .setTimeout(30)
      .build()

    const preparedTx = await server.prepareTransaction(transaction)
    preparedTx.sign(minterKeypair)

    const sendResult = await server.sendTransaction(preparedTx)

    if (sendResult.status === "ERROR") {
      return NextResponse.json(
        { error: "Transaction failed to submit" },
        { status: 500 }
      )
    }

    // Poll for confirmation
    let txResponse = await server.getTransaction(sendResult.hash)
    while (txResponse.status === "NOT_FOUND") {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      txResponse = await server.getTransaction(sendResult.hash)
    }

    if (txResponse.status !== "SUCCESS") {
      return NextResponse.json(
        { error: `Transaction failed with status: ${txResponse.status}` },
        { status: 500 }
      )
    }

    const txHash = sendResult.hash

    // Update reading status and insert mint_log
    const { error: updateError } = await supabase
      .from("readings")
      .update({ status: "minted", tx_hash: txHash })
      .eq("id", reading_id)

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    const { error: logError } = await supabase.from("mint_log").insert({
      reading_id,
      prosumer_address: prosumerAddress,
      amount_hdrop: reading.kwh_injected,
      tx_hash: txHash,
    })

    if (logError) {
      return NextResponse.json({ error: logError.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      tx_hash: txHash,
      amount_hdrop: reading.kwh_injected,
      prosumer_address: prosumerAddress,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

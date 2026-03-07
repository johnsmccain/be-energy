# BeEnergy — Cómo funciona

BeEnergy es infraestructura de certificación energética on-chain. Tokeniza la producción de energía renovable como certificados ambientales verificables en Stellar.

## El problema

La generación distribuida crece en Argentina. Cooperativas y comunidades instalan paneles solares y generan energía renovable. Pero esa generación no tiene un registro verificable, transparente ni accesible para terceros.

**Hoy:**

- La producción renovable se registra en sistemas cerrados o planillas manuales.
- No hay forma estandarizada de certificar cuánta energía renovable se generó.
- Empresas con metas ESG no pueden acceder fácilmente a certificados de generación distribuida en Latinoamérica.
- El atributo ambiental de la generación renovable (el "verde" de la energía) se pierde o no se monetiza.

## Qué hace BeEnergy

BeEnergy mide la producción renovable de una cooperativa, emite proto-certificados on-chain (1 token = 1 kWh generado) y facilita su venta a compradores externos.

El token representa el **atributo ambiental** de la generación — no la electricidad física. Una empresa puede usar energía de red convencional pero comprar certificados para respaldar su operación como "renovable".

| Sin BeEnergy | Con BeEnergy |
|---|---|
| Generación sin registro verificable | Proto-certificados on-chain auditables |
| Atributo ambiental no monetizado | Certificados vendibles a compradores externos |
| Sin trazabilidad para ESG | Historial completo e inmutable en Stellar |
| Acceso limitado al mercado de RECs | Puerta de entrada al mercado de certificados |

## Cómo funciona

### 1. La cooperativa genera energía

La cooperativa o comunidad solar genera energía renovable. La producción se mide con medidores.

- En el piloto: la cooperativa carga datos manualmente o por CSV.
- En Fase 2: se integra con medidores inteligentes y el dato llega automáticamente.

### 2. Se emiten los proto-certificados

Contra el dato de producción validado, el sistema emite tokens:

- **1 token = 1 kWh** de generación renovable certificada por la cooperativa.
- El token es un **proto-certificado**: un claim verificable on-chain de que esa energía fue generada.
- Cada cooperativa tiene su propio token con nombre y símbolo propios.

### 3. Compradores externos adquieren los certificados

Empresas con metas ESG, fondos climáticos o programas de compensación compran los proto-certificados.

- El comprador adquiere tokens que representan el atributo ambiental de la generación.
- Al comprar, puede declarar que respalda su consumo con energía renovable verificada.

### 4. Se retiran los certificados

El comprador retira el certificado (burn on-chain). Esto evita doble conteo: una vez retirado, ese kWh certificado no puede reclamarse de nuevo.

Los ingresos de la venta vuelven a la cooperativa y benefician a sus miembros.

## Qué es un proto-certificado

Un proto-certificado es un **claim verificable on-chain de que 1 kWh de energía renovable fue generado**. Es la base sobre la cual se construye una certificación completa.

**Qué es:**
- Registro inmutable de generación renovable
- Verificable por cualquier tercero en Stellar
- Vendible como atributo ambiental

**Qué NO es (todavía):**
- No es un REC formal (le falta metadata estandarizada, verificación independiente, integración con registro reconocido)
- No es energía física para consumir
- No es un instrumento financiero ni especulativo

Para convertirse en un REC completo necesita: metadata por mint (fecha, fuente, ubicación, tecnología), verificación independiente y aceptación por un estándar reconocido (I-REC, Energy Web, TIGR).

## Quiénes participan

### Cooperativa (nuestro cliente)
La cooperativa genera energía renovable y usa BeEnergy para certificar esa producción. Administra el sistema, valida datos, gestiona miembros.

### Miembros de la cooperativa
Los miembros son participantes de la cooperativa energética. Según cada cooperativa pueden ser:
- **Prosumers**: instalan paneles, generan energía, reciben certificados por su producción.
- **Copropietarios de activos compartidos**: la cooperativa instala un parque solar, los miembros son copropietarios y el reparto es por participación.
- **Modelo mixto**: combinación de ambos.

No se asume un modelo único — el sistema es flexible.

### Compradores externos
- Empresas con metas ESG (Google, Microsoft, corporaciones con compromisos climáticos)
- Fondos climáticos
- Programas de compensación de carbono
- Mercados de certificados renovables

## Por qué blockchain

El registro de certificados se implementa sobre Stellar:

- **Trazabilidad**: cada mint, transferencia y retiro es verificable on-chain.
- **Inmutabilidad**: el historial no puede alterarse.
- **Transparencia**: cualquier tercero puede auditar sin depender de BeEnergy.
- **Fees bajos**: ~0.00001 XLM por transacción en Stellar.
- **Interoperabilidad**: token SEP-41, estándar de Stellar, compatible con el ecosistema.

La blockchain es infraestructura invisible para el usuario final. Solo está para que todo sea verificable y auditable.

## Niveles del producto

### Nivel 1 — Registro interno (actual)
Token = registro de producción renovable para cooperativas. Proto-certificado con trazabilidad on-chain.

### Nivel 2 — Certificación verificable
Se agregan: medidores inteligentes, oráculos, verificación independiente. El token gana credibilidad externa y metadata estandarizada.

### Nivel 3 — Estándar reconocido
Integración con I-REC, Energy Web, TIGR. Acceso al mercado global de RECs. El token se acepta internacionalmente como certificado renovable.

## Modelo de negocio

BeEnergy cobra una comisión sobre la venta de certificados a compradores externos. Los ingresos de la venta benefician a la cooperativa y sus miembros.

## Lo que BeEnergy no es

- No es un mercado P2P de energía entre miembros.
- No es un activo cripto ni un instrumento de inversión.
- No reemplaza a la cooperativa — le da infraestructura para certificar y monetizar su generación.
- No instala paneles, no maneja la red, no pone medidores.
- No es un REC formal todavía — es la base para llegar ahí.

# Guardado de leads del registro en SendPulse

El formulario "¡Sé de los Primeros en Probar la App Bivo y Obtén 1 Mes
GRATIS!" envía cada alta a:

1. **Google Sheets** (Apps Script) — mantenido como destino actual.
2. **SendPulse** (libreta de direcciones / mailing list) — nuevo destino.

Ambos destinos se llaman **en paralelo**. Si SendPulse no está configurado,
el formulario sigue funcionando contra Google Sheets sin error visible para
el usuario; en consola del servidor verás un warning.

## Variables de entorno

Se leen desde Vercel (Project Settings → Environment Variables) y desde
`.env.local` en desarrollo:

| Variable | Obligatoria | Descripción |
|---|---|---|
| `SENDPULSE_CLIENT_ID` | ✅ | Client ID de la API REST de SendPulse. |
| `SENDPULSE_CLIENT_SECRET` | ✅ | Client Secret. |
| `SENDPULSE_FROM_EMAIL` | ✅ (para `/api/contact`) | Email verificado como remitente. |
| `SENDPULSE_ADDRESSBOOK_ID` | ✅ (para guardar leads) | ID numérico de la libreta donde guardar los contactos. |
| `SENDPULSE_ADMIN_SECRET` | Opcional | Si se define, habilita el endpoint admin para listar/crear libretas. |

## Endpoints

### POST `/api/register`

Lo llama el frontend al enviar el formulario. No requiere autenticación, pero
exige que `aceptaPoliticas === true` y que el email sea válido.

Body esperado:

```json
{
  "nombre": "Erik",
  "apellido": "Mozos",
  "email": "erik@example.com",
  "telefono": "+34600000000",
  "deporteRaqueta": "Pádel",
  "aceptaPoliticas": true
}
```

Variables que se guardan en SendPulse como **Variables del contacto**:

- `Nombre`
- `Apellido`
- `Telefono`
- `Deporte`
- `AceptaPoliticas` (`Si` / `No`)
- `FechaRegistro` (ISO 8601)
- `Origen` (`Web bivotraining.com`)

> ⚠️ Tip SendPulse: para que las variables aparezcan correctamente, dale de
> alta esos nombres como variables personalizadas dentro de la libreta antes
> de empezar a recibir contactos (Email → Direcciones → tu libreta →
> Configuración → Variables).

### GET / POST `/api/sendpulse-addressbooks` (admin)

Protegido por `?secret=...` o cabecera `x-admin-secret: ...` que debe
coincidir con `SENDPULSE_ADMIN_SECRET`.

- **GET** lista todas las libretas de la cuenta.
- **POST** con body `{ "name": "Bivo Leads Web" }` crea una nueva libreta y
  devuelve el ID.

## Setup paso a paso (la primera vez)

1. Define un secret en `.env.local` (y luego en Vercel) para activar el endpoint admin:

   ```bash
   SENDPULSE_ADMIN_SECRET=elige-un-secret-largo
   ```

2. Arranca el dev server (`npm run dev`) y crea la libreta (o lista las existentes):

   ```bash
   # Listar libretas existentes
   curl "http://localhost:5173/api/sendpulse-addressbooks?secret=elige-un-secret-largo"

   # Crear una nueva
   curl -X POST "http://localhost:5173/api/sendpulse-addressbooks?secret=elige-un-secret-largo" \
        -H "Content-Type: application/json" \
        -d '{ "name": "Bivo Leads Web" }'
   ```

   La respuesta de creación incluye un campo `envExample` listo para copiar:

   ```json
   { "envExample": "SENDPULSE_ADDRESSBOOK_ID=123456" }
   ```

3. Pega el `SENDPULSE_ADDRESSBOOK_ID` en `.env.local` y en Vercel.

4. (Opcional) Borra `SENDPULSE_ADMIN_SECRET` o déjalo vacío cuando termines
   para volver a deshabilitar el endpoint admin.

5. Configura en SendPulse → Automation360 un trigger sobre la libreta para
   enviar el email de bienvenida con "1 mes gratis" si así lo quieres.

## Cómo migrar a SendPulse-only

Cuando confirmes que los leads están llegando a SendPulse, puedes dejar de
mandarlos a Google Sheets editando `src/services/formSubmission.ts` y
quitando la llamada a `sendToGoogleSheets` dentro de `submitToGoogleSheets`.

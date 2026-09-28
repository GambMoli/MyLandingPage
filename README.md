## My Landing Page

Landing page en `Vite + React` lista para desplegar en Vercel.

### Scripts

- `npm install`
- `npm run dev`
- `npm run build`

### Variables de entorno

Crea un archivo `.env.local` basado en `.env.example`.

- `BREVO_API_KEY`
- `BREVO_SENDER_EMAIL`
- `BREVO_SENDER_NAME`
- `CONTACT_TO_EMAIL`

`BREVO_SENDER_EMAIL` debe ser un remitente verificado dentro de Brevo.

### Deploy

En Vercel agrega las mismas variables de entorno del `.env.local`.

### Contenido

Todo el texto del sitio (proyectos, experiencia, stack, servicios y redes sociales) vive en
`src/content/profile.ts`. Para agregar una red social, agrega una entrada a `socials` y aparece
en el hero, en contacto y en el footer.

### Bot

El bot no usa ninguna API externa: es un clasificador de intenciones que corre en el navegador.

- `src/app/bot/classifier.ts`: vectores TF-IDF con palabras (sin tildes, stopwords ni sufijos comunes)
  y trigramas de caracteres, más k vecinos más cercanos por similitud coseno.
- `src/app/bot/intents.ts`: preguntas de ejemplo en español e inglés y la respuesta de cada intención.
- `src/app/bot/engine.ts`: decide si responde, si ofrece sugerencias o si cae al mensaje de respaldo.

Para enseñarle algo nuevo, agrega una intención en `intents.ts` con varias formas de preguntarlo.
Pasa el mouse sobre una respuesta del bot para ver qué intención eligió y con qué similitud.

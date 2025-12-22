# WEVIS - LOCAL ELECTION QUIZ 2026

### Fit Check! เช็คความพร้อม ซ้อมความเป๊ะ ก่อนออกไปเลือกตั้ง อบต.

มาทบทวนความเป๊ะก่อนออกจากบ้านไปเข้าคูหากันหน่อย!

## 💻 Tech Stack + CSS

- [Vue 3 + Nuxt 4](https://nuxt.com/docs/getting-started/introduction)
- [TailwindCSS](https://tailwindcss.com/)

## 🚀 Deployments

| Name       | URL                             | Hosting Provider |
| ---------- | ------------------------------- | ---------------- |
| Production | https://wevis.info/fitcheckquiz | Wevis            |

## 🥣 Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

## 🌱 Environment Variables

This project uses environment variables for runtime configuration.

Required variables:

- `NUXT_PUBLIC_BASE_URL`  
  Base URL used by the app (set per environment: staging / production)

For local development, create a `.env` file:

````env
NUXT_PUBLIC_BASE_URL=https://example.pages.dev

## 🎮 Development Server

Start the development server on `http://localhost:3000/`:

```bash
# npm
npm run dev
````

## 🧤 Production Build

Generate a static version of your Nuxt 4 site:

```bash
# npm
npm run generate
```

This will create the production-ready files in the `.output/public` directory.

You can preview the generated site locally using:

```bash
npx serve .output/public
```

## 🧩 Team members

- 💻 **Developer:** Key
- 🎨 **Designer:** Shin
- 📖 **Project Manager:** Pat
- 👀 **Supervisor:** GG

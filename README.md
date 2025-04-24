# Hint Frontend

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Structure

```bash
hint-frontend/
  ├── .github
  │   └── workflows
  │       └── ci.yml
  ├── .git
  │   └── pre-commit
  ├── app
  │   ├── [lang]
  │   │   ├── (admin)
  │   │   │   ├── dashboard
  │   │   │   │   ├── components
  │   │   │   │   │   └── index.tsx
  │   │   │   │   ├── hooks
  │   │   │   │   │   └── index.ts
  │   │   │   │   └── page.tsx
  │   │   │   └── layout.tsx
  │   │   ├── (user)
  │   │   │   └── (auth)
  │   │   │       ├── layout.tsx
  │   │   │       ├── sign-in
  │   │   │       │   ├── components
  │   │   │       │   │   └── index.tsx
  │   │   │       │   ├── hooks
  │   │   │       │   │   └── index.ts
  │   │   │       │   └── page.tsx
  │   │   │       └── sign-up
  │   │   │           ├── components
  │   │   │           │   └── index.tsx
  │   │   │           ├── hooks
  │   │   │           │   └── index.ts
  │   │   │           └── page.tsx
  │   │   ├── [...notFound]
  │   │   │   └── page.tsx
  │   │   ├── layout.tsx
  │   │   └── page.tsx
  │   ├── manifest.ts
  │   └── robots.ts
  ├── components
  │   ├── layout
  │   │   └── index.tsx
  │   └── ui
  │       ├── Button
  │       │   └── Button.tsx
  │       ├── Counter
  │       │   └── Counter.tsx
  │       ├── Header
  │       │   └── Header.tsx
  │       └── Loading
  │           └── Loading.tsx
  ├── docker
  │   ├── entrypoint.sh
  │   └── pm2.json
  ├── docker-compose.yml
  ├── Dockerfile
  ├── i18next.config.ts
  ├── locales
  │   ├── en
  │   │   └── common.json
  │   └── vi
  │       └── common.json
  ├── middleware.ts
  ├── next-env.d.ts
  ├── next.config.mjs
  ├── package.json
  ├── postcss.config.mjs
  ├── public
  │   ├── favicon.ico
  │   ├── file.svg
  │   ├── globe.svg
  │   ├── icons
  │   ├── images
  │   ├── next.svg
  │   ├── vercel.svg
  │   └── window.svg
  ├── README.md
  ├── services
  │   └── api
  │       └── index.ts
  ├── shared
  │   ├── constants
  │   │   └── index.ts
  │   ├── hooks
  │   │   ├── index.ts
  │   │   ├── useCard.ts
  │   │   └── useUser.ts
  │   ├── lib
  │   │   ├── animations
  │   │   │   └── index.ts
  │   │   └── i18n
  │   │       └── config.ts
  │   ├── provider
  │   │   ├── QueryProvider.tsx
  │   │   └── TranslationsProvider.tsx
  │   ├── styles
  │   │   └── globals.css
  │   ├── types
  │   │   ├── index.ts
  │   │   ├── order.ts
  │   │   ├── product.ts
  │   │   └── user.ts
  │   ├── utils
  │   │   ├── currency.ts
  │   │   ├── date.ts
  │   │   ├── index.ts
  │   │   ├── number.ts
  │   │   ├── string.ts
  │   │   └── validate.ts
  │   └── validations
  │       ├── auth.schema.ts
  │       ├── index.ts
  │       ├── order.schema.ts
  │       ├── product.schema.ts
  │       └── user.schema.ts
  ├── store
  │   └── setting.tsx
  ├── .dockerignore
  ├── .env.example
  ├── .eslintignore
  ├── .eslintrc.json
  ├── .prettierignore
  ├── .prettierrc
  ├── tailwind.config.ts
  ├── tsconfig.json
  └── yarn.lock
```

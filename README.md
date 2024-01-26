# Noodfonds front-end

A React + Vite template powered by shadcn/ui.

## 🎉 Features

- **React** - A JavaScript library for building user interfaces.
- **Vite** - A fast, opinionated frontend build tool.
- **TypeScript** - A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS** - A utility-first CSS framework.
- **Tailwind Prettier Plugin** - A Prettier plugin for formatting Tailwind CSS classes.
- **ESLint** - A pluggable linting utility for JavaScript and TypeScript.
- **PostCSS** - A tool for transforming CSS with JavaScript.
- **Autoprefixer** - A PostCSS plugin to parse CSS and add vendor prefixes.
- **shadcn/ui** - Beautifully designed components that you can copy and paste into your apps.

## ⚙️ Prerequisites

Make sure you have the following installed on your development machine:

- Node.js (version 16 or above)
- pnpm (package manager)

  ```bash
  npm install -g pnpm
  ```

- vite (fast build tool)

  ```bash
  npm init @vitejs/app
  ```

## 🚀 Getting Started

Follow these steps to get started with this frontend

1. Clone the repository:

2. Navigate to the project directory:

   ```bash
   cd webapp/frontend/react-ts
   ```

3. Install the dependencies (only if there are new dependencies to be installed):

   ```bash
   pnpm install
   ```

4. Start the development server:

   ```bash
   pnpm run dev
   ```

## Run with Azure Static Web App CLI

1. Make sure to install SWA CLI

   ```bash
   pnpm install -g @azure/static-web-apps-cli
   ```

2. Install [Azure Functions extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)
3. By default, the CLI starts and serves any the static content from the current working directory ./.
   For run without API:

   ```bash
   cd webapp
   swa start http://localhost:5173 --run "pnpm run dev"
   ```

   The following is faster, but requires a build first:

   ```bash
   cd webapp/frontend/react-ts
   pnpm run build
   cd ../..
   swa start --output-location ./frontend/react-ts/dist
   ```

4. For run with api (FastAPI)
   Start your API using Azure Functions Core Tools: func host start or start debugging in VS Code.
   Then run the following command (assuming you're in the root folder of the project):

   ```bash
   cd webapp
   swa start
   ```

## 📜 Available Scripts

- pnpm dev - Starts the development server.
- pnpm build - Builds the production-ready code.
- pnpm lint - Runs ESLint to analyze and lint the code.
- pnpm preview - Starts the Vite development server in preview mode.

## 📂 Project Structure

The project structure follows a standard React application layout:

```python
react-vite-ui/
  ├── node_modules/      # Project dependencies
  ├── public/            # Public assets
  ├── src/               # Application source code
  │   ├── components/    # React components
  │   │   └── ui/        # shadc/ui components
  │   ├── styles/        # CSS stylesheets
  │   ├── lib/           # Utility functions
  │   ├── App.tsx        # Application entry point
  │   └── index.tsx      # Main rendering file
  ├── .eslintrc.json     # ESLint configuration
  ├── index.html         # HTML entry point
  ├── postcss.config.js  # PostCSS configuration
  ├── tailwind.config.js # Tailwind CSS configuration
  ├── tsconfig.json      # TypeScript configuration
  └── vite.config.ts     # Vite configuration
```

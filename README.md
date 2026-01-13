[![License: NCSL](https://img.shields.io/badge/License-NonCommercial-red.svg)](LICENSE)
[![Open Source? YES](https://img.shields.io/badge/Open%20Source-Yes-brightgreen.svg)](LICENSE)
[![Free to Use](https://img.shields.io/badge/Free%20to%20Use-Yes-brightgreen.svg)](LICENSE)
[![Commercial Use](https://img.shields.io/badge/Commercial%20Use-No-red.svg)](LICENSE)

This is an open-source repository for **Better Bedrock** Project. It contains frontend and the backend of the website used by hundreds of thousands of people. This repository follows a Turborepo monorepo structure with separate frontend and backend packages, built with modern frameworks and tools. It provides a clean developer workflow, integrated PostgreSQL database, and easy environment configuration. 🚀

🚀 Features
-----------

*   🗂 **Monorepo Architecture**: Powered by Turborepo for streamlined package management and shared tooling
*   🎨 **Rich Frontend**: Built with React + Vite, styled with Sass, monetized via LinkVertise
*   ⚙️ **Robust Backend**: NestJS API using Prisma ORM & PostgreSQL for data storage
*   🔧 **Validation & Schemas**: Zod & class-validator enforce type safety and input validation
*   🛠 **Developer Tools**: Yarn scripts, ESLint, Prettier, and conventional commits ensure code quality
*   📑 **API Docs**: OpenAPI/Swagger specification for interactive API documentation
*   ⛏ **Ore-UI**: Custom component library optimized for Minecraft-themed interfaces

📸 Screenshots
--------------

![Home](./docs/home.png)
![Downloads](./docs/downloads.png)
![Information](./docs/information.png)

🛠 Tech Stack
-------------

*   ⚛️ React
*   💅 Sass
*   🔡 TypeScript
*   ✔ ESLint
*   🐘 PostgreSQL
*   📄 Swagger / OpenAPI
*   🎨 Prettier
*   🔗 LinkVertise
*   📐 class-validator
*   🏗 NestJS
*   🔨 Prisma
*   🚀 Vite
*   🔍 Zod
*   🧱 Ore-UI
*   🌐 Turborepo & Yarn
*   💲 Stripe
*   📧 Mailersend

🏁 Getting Started
------------------

### 1\. 🍴 Fork & Clone

    # Fork the repository on GitHub, and then:
    git clone https://github.com/your-username/better-bedrock-web.git
    cd better-bedrock-web
    

### 2\. 📥 Install Dependencies

    yarn install
    

### 3\. 🐘 Set Up PostgreSQL

Ensure you have PostgreSQL installed and running. Create a new database:

    createdb better_bedrock_db
    

### 4\. 🔐 Configure Environment Variables

Create two `.env` files:

*   **Frontend** (`apps/frontend/.env`):
    
        VITE_LINKVERTISE_ID=401625
        
    
*   **Backend** (`apps/api/.env`):
    
        DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/better_bedrock_db"
        LINKVERTISE_API_KEY=your_linkvertise_api_key
        
    

### 5\. 🧱 Generate Prisma Client

    # From (apps/api):
    yarn prisma generate

> 📝 **Note:** every single time you update `schema.prisma` in `apps/api`, regenerate Prisma client with using this command in project scope:  
>     
>     yarn generate:api
>     
    

### 6\. 💻 Development Server

    yarn dev
    

\- Frontend: [http://localhost:5173](http://localhost:5173)  
\- API: [http://localhost:8084](http://localhost:8084)

📦 Building for Production
--------------------------

    yarn build
    

This compiles both `apps/frontend` and `apps/api` into production-ready bundles.

🤝 Contributing Guidelines
--------------------------

We welcome contributions! Please follow:

*   🍴 **Fork** & **clone** the repo
*   🌿 **Create a feature branch** (`git checkout -b feature/your-feature`)
*   🔄 **Make changes** and test with `yarn dev`
*   💬 **Commit** using Conventional Commits. See [EU Git Conventions](https://ec.europa.eu/component-library/v1.15.0/eu/docs/conventions/git/)
*   🚀 **Push** to your fork & open a PR against `main`
*   📂 **File Structure** make sure to follow our file distribution and naming structure
*   ✔️ **Ensure** the feature works on all platforms (mobile, desktop, etc) & adds value to the site

### 📝 Commit Message Types

*   **feat**: A new feature
*   **fix**: A bug fix
*   **docs**: Documentation only changes
*   **style**: Formatting, etc.
*   **refactor**: Code change without feature or fix
*   **test**: Adding/correcting tests
*   **chore**: Build process or tools

    git commit -m "feat: add user authentication flow"
    

📄 🚫 NonCommercial License
----------

**This project is free to use, modify, and share — but you may NOT use it for commercial purposes.**

- ✅ Use it personally or for learning  
- ✅ Modify and share your changes  
- ❌ No selling, paid services, or monetization  
- ❌ No use in commercial products

📜 Full license text: [LICENSE](LICENSE)

* * *

🎉 Happy coding! If you have any questions, feel free to open an issue or join our Discord channel. 🌐

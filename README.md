# AETHER Playground

![AETHER Playground](https://img.shields.io/badge/AETHER-Playground-000000?style=for-the-badge&logo=php&logoColor=white)
![React](https://img.shields.io/badge/React-18.0-000000?style=for-the-badge&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-3.0-000000?style=for-the-badge&logo=tailwindcss)

A production-quality interactive web platform and architectural showcase for the **AETHER PHP framework**. This repository contains the source code for the fully static frontend visualization of AETHER's runtime mechanics.

## 🌐 Live Demo
**[Launch AETHER Playground](https://kisalnelaka.github.io/aether)**

## 🚀 About AETHER
AETHER is a modern, high-performance "Persistent Memory PHP" runtime built for maximum throughput and zero bootstrap overhead. It reimagines traditional PHP request life-cycles using persistent worker fibers and AOT (Ahead-Of-Time) kernel initialization.

- **Main Framework Repository**: [kisalnelaka/aether](https://github.com/kisalnelaka/aether)
- **Demo Implementation**: [kisalnelaka/aether-demo](https://github.com/kisalnelaka/aether-demo)
- **CRUD Example**: [kisalnelaka/aether-crud](https://github.com/kisalnelaka/aether-crud)

## 🛠 Features of the Playground
The AETHER Playground is designed as a developer-centric documentation hub:

1. **Interactive Code Simulator**: An embedded Monaco editor simulating persistent memory routing and output tracing.
2. **Runtime Visualizer**: Animated Framer Motion diagrams visualizing the AETHER request lifecycle, Fiber Scheduler, and Worker Loops.
3. **Route Explorer**: An interactive O(K) Radix Tree visualizer built with `cytoscape.js`.
4. **Performance Benchmarks**: Simulated metrics and bar charts comparing AETHER against traditional architectures.
5. **Architectural Deep-Dive**: Comprehensive overviews of the service container, memory model, and cooperative multitasking.

## 💻 Tech Stack
- **React 18** + **Vite**
- **TypeScript**
- **TailwindCSS** (High-contrast, Monochromatic Minimalist theme)
- **Framer Motion** (Subtle UI animations)
- **Monaco Editor**
- **Cytoscape.js** & **Recharts**
- **Lucide React** (Icons)

## ⚙️ Running Locally
You can run the playground locally using Node.js (v18+ recommended):

```bash
# Clone the repository
git clone https://github.com/kisalnelaka/aether-playground.git
cd aether-playground

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

The application will be available at `http://localhost:5173`.

## 📦 Deployment
This repository is configured to automatically deploy to GitHub Pages via GitHub Actions. Any push to the `main` branch will trigger the `.github/workflows/deploy.yml` workflow, building the static assets and pushing them to the `gh-pages` branch.

## 📝 License
This project is open-sourced under the [MIT license](LICENSE).

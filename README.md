# Vietnam Biofuel Atlas — Agricultural Resource Guide

<p align="center">
  <img src="client/public/images/ai4u-logo.png" alt="AI4U.now Logo" width="180" />
</p>

<p align="center">
  <strong>An interactive stakeholder decision guide to Vietnam's agricultural biofuel feedstocks, policy signals, sustainability safeguards, and regional deployment priorities.</strong>
</p>

<p align="center">
  <a href="https://biofuelresources.ai4u.now"><img src="https://img.shields.io/badge/Live-biofuelresources.ai4u.now-e3a72f?logo=vercel" alt="Live Site" /></a>
  <a href="https://github.com/ai4u23/vietnam-biofuel-atlas"><img src="https://img.shields.io/badge/GitHub-ai4u23%2Fvietnam--biofuel--atlas-181717?logo=github" alt="GitHub" /></a>
  <img src="https://img.shields.io/badge/React-19-61dafb?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite" alt="Vite 7" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwind-css" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Ecosystem-AI4U.now-e3a72f" alt="AI4U.now" />
</p>

---

## 🌾 Overview

**Vietnam Biofuel Atlas** translates dense agricultural-resource evidence into a transparent, interactive decision tool for policymakers, investors, researchers, and agribusiness leaders.

### Core Strategic Focus
- **Map What is Abundant:** 40,501–84,936 GWh<sub>th</sub>/year illustrative sustainable biomass energy potential across six crop families.
- **Prioritize What is Deliverable:** Distinguish gross theoretical potential from commercially deployable, bankable supply.
- **Residue-First Safeguards:** Enforce strict field-retention boundaries (soil carbon, nutrients, erosion) before large-scale biomass removal.

---

## ⚡ Key Interactive Modules

1. **Feedstock Field Explorer:** Filter 6 major crop & processing residue pathways (*Rice Husk, Bagasse, Cassava, Livestock Manure, Rice Straw, Coffee/Coconut*) by energy pathway and priority.
2. **E10 Blend Scenario Planner:** Interactive demand-stress calculator modeling nationwide E10 mandate requirements, domestic production baselines, and dry-chip gap exposure.
3. **Regional Deployment Clusters:** Practical spatial roadmaps for the Mekong Delta (rice cascades), Sugar Mill Belts (high-pressure bagasse CHP), and Livestock Corridors (biogas & digestate loops).
4. **Four Investment Safeguards:** Structured screening criteria required prior to final investment decisions (FID).
5. **Evidence Base & Citations:** Primary references from MOIT, FAO, IEA, and IRRI.

---

## 🛠️ Tech Stack

- **Framework:** React 19 (SPA)
- **Tooling:** Vite 7 + TypeScript
- **Styling:** Tailwind CSS v4, custom Field Atlas tokens, and Google Fonts (`DM Serif Display` & `Manrope`)
- **Components:** Radix UI Primitives, Lucide Icons, Framer Motion
- **Deployment:** Vercel

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 20.x
- [pnpm](https://pnpm.io/) >= 10.x

### Installation

```bash
# Clone the repository
git clone https://github.com/ai4u23/vietnam-biofuel-atlas.git
cd vietnam-biofuel-atlas

# Install dependencies
pnpm install
```

### Development

```bash
# Start local development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Typecheck

```bash
# Run TypeScript typecheck
pnpm check

# Build production bundle
pnpm build
```

---

## 🌐 Deployment to Vercel

This repository includes a pre-configured `vercel.json` for seamless zero-config deployment to Vercel:

```bash
# Deploy with Vercel CLI
vercel --prod
```

---

## 📄 License & Attribution

Part of the **[AI4U.now](https://ai4u.now)** ecosystem. Built from the Vietnam Biofuel Potential Study (2024–2026).
Licensed under the [MIT License](LICENSE).

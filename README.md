# CarbonWise

> A personal carbon-footprint tracker for more conscious online purchases.

CarbonWise helps people log products, estimate their CO2e impact, and understand the patterns behind their purchases. It combines a local estimation model with optional verified freight estimates from emissions.dev, presented in a responsive green-themed dashboard.

**[Live demo](https://carbonwise-beta.vercel.app/)** · **[GitHub repository](https://github.com/SumitGupta-27/carbonwise)**

## Features

- Product footprint estimates based on category, material, weight, and shipping method
- Optional verified freight estimates through emissions.dev using origin/destination country codes
- Automatic local-estimate fallback for missing API configuration, unsupported routes, rate limits, and upstream errors
- Dashboard charts, category breakdowns, time-based summaries, and sustainability insights
- Searchable product history with editing, deletion, filters, and sorting
- Achievement badges, impact equivalents, and practical eco tips
- Persistent light/dark theme and browser `localStorage` data
- Responsive navigation with an accessible Explore menu
- Community and Doomsday Challenge previews with future-feature roadmaps

> CarbonWise estimates are educational and are not a certified product life-cycle assessment. emissions.dev results cover freight emissions for the supplied route.

## Screenshots

<p align="center">
  <img src="assets/landing-light.png" alt="CarbonWise landing page in light mode" width="49%" />
  <img src="assets/landing-dark.png" alt="CarbonWise landing page in dark mode" width="49%" />
</p>

<p align="center">
  <img src="assets/Dashboard.png" alt="CarbonWise dashboard" width="49%" />
  <img src="assets/Footprint_Record.png" alt="CarbonWise footprint history" width="49%" />
</p>

## Tech Stack

- React 18, Vite, and React Router
- Tailwind CSS and PostCSS
- Framer Motion for page and UI animation
- Recharts for dashboard visualizations
- Lucide React icons
- Node.js built-in HTTP server for the carbon-data proxy
- emissions.dev Freight API for optional verified shipment estimates

## Getting Started

### Prerequisites

- Node.js 18 or later
- An [emissions.dev API key](https://emissions.dev/docs/getting-started) for verified freight estimates (optional)

### Installation

```bash
git clone https://github.com/SumitGupta-27/carbonwise.git
cd carbonwise
npm install
```

### Environment variables

Copy `.env.example` to `.env` and add an emissions.dev key if you want verified freight estimates:

```bash
EMISSIONS_DEV_API_KEY=em_live_replace_with_your_key
CARBON_API_PORT=8787
```

`.env` is ignored by Git. The key is read only by the Node server and is never exposed to the browser. Without a key, CarbonWise continues to use its local estimation model.

### Run locally

Start the API proxy in one terminal:

```bash
npm run server
```

Start the Vite app in another terminal:

```bash
npm run dev
```

Vite runs at `http://localhost:5173` and proxies `/api` requests to `http://localhost:8787`.

### Production build

```bash
npm run build
npm run preview
```

## Carbon Data Flow

`CarbonService` sends estimate requests to the local `POST /api/carbon/estimate` endpoint. The server validates shipment input, keeps the emissions.dev key private, and caches identical freight calculations in memory for 24 hours (up to 500 entries). Successful responses include their available source information. If a verified result cannot be obtained, the UI falls back to the transparent local calculator and labels the result accordingly.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/dashboard` | Footprint summaries and charts |
| `/add-product` | Product estimate and logging flow |
| `/history` | Product history management |
| `/insights` | Trends, achievements, and comparison insights |
| `/eco-tips` | Practical sustainability tips |
| `/impact` | Real-world footprint equivalents |
| `/community` | Community preview and roadmap |
| `/doomsday-challenge` | Seven-day challenge preview |
| `/about` | CarbonWise and SDG 13 overview |

## Project Structure

```text
carbonwise/
├── assets/
├── server/
├── src/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   └── utils/
├── .env.example
├── package.json
├── tailwind.config.js
└── vite.config.js
```

| Folder | Purpose |
| --- | --- |
| `assets/` | README and application preview images |
| `server/` | Node HTTP proxy for emissions.dev requests and caching |
| `src/components/` | Reusable layout, UI, chart, product, and feature components |
| `src/context/` | Theme, product data, toast, and persistence state |
| `src/hooks/` | Reusable browser hooks, including `useLocalStorage` |
| `src/pages/` | Route-level React views |
| `src/services/` | Carbon service and local estimation provider |
| `src/utils/` | Calculation, formatting, statistics, sample-data, and achievement helpers |

## Roadmap

- Add user accounts and optional cloud sync
- Expand the Community experience with groups, discussions, and leaderboards
- Launch random matching and daily check-ins for Doomsday Challenge
- Add richer factor provenance and additional verified carbon-data sources

## Contributing

Contributions are welcome. Please open an issue to discuss substantial changes, then submit a focused pull request with a clear description and build verification.

## License

No license file is currently included in this repository. All rights are reserved unless the project owner adds a license.

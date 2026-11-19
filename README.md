# EquityLens – Indian Stock Market Valuation & Financial Tracker

[![Project Status: Active Development](https://img.shields.io/badge/Status-Institutional%20Edition-emerald.svg)](#)
[![Coverage: NIFTY 50](https://img.shields.io/badge/Index-NIFTY%2050%20(50%20Equities)-blue.svg)](#)
[![Stack: Vanilla HTML/CSS/JS](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20ES6%20JS-orange.svg)](#)
[![Data Source: Screener.in](https://img.shields.io/badge/Data%20Source-Screener.in-green.svg)](https://www.screener.in)

**EquityLens** is a professional equity valuation, fundamental analysis, and portfolio tracking single-page web application engineered specifically for Indian stock market investors and CS students of quantitative value investing.

Built from scratch using modern **HTML5, CSS3, and modular ES6 JavaScript** with **zero heavy frameworks, zero runtime server dependencies**, and client-side `localStorage` state management.

---

## 📌 Table of Contents
- [What Makes EquityLens Stand Out](#-what-makes-equitylens-stand-out)
- [Key Features](#-key-features)
- [Valuation & Analytical Models](#-valuation--analytical-models)
- [Automated Midnight Cron Engine](#-automated-midnight-cron-engine)
- [Complete NIFTY 50 Coverage](#-complete-nifty-50-coverage)
- [Export Capabilities](#-export-capabilities)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)

---

## 🌟 What Makes EquityLens Stand Out

Unlike standard academic projects that only display static price tables or clone basic ticker widgets, **EquityLens** integrates authentic institutional finance practices:

1. **Piotroski 9-Point F-Score Card:**
   - Real-time evaluation across **Profitability** (PAT, ROCE, Margin expansion, Earnings quality), **Leverage & Solvency** (Debt/Equity, ROE, EPS dilution), and **Operating Efficiency** (Revenue growth, OPM trend).
   - Generates institutional health badges: *Strong Financial Health (Score 7-9)*, *Moderate (4-6)*, or *Weak / Distressed (0-3)*.

2. **Reverse DCF (Implied Growth Rate) Calculator:**
   - Instead of guessing arbitrary 5-year growth, the reverse engineering formula answers: *"What annual earnings growth rate is the current market price actively pricing in?"*
   - Immediately alerts investors when market expectations outstrip reasonable historical compounding.

3. **Sector-Adjusted Financial Awareness:**
   - Distinguishes financial institutions (e.g. HDFC Bank, ICICI Bank, SBI) from industrial firms.
   - Intelligently recognizes that bank deposits represent operational liabilities rather than traditional corporate debt, focusing on P/B and capital adequacy rather than misleading D/E ratios.

4. **5-Axis Peer Comparison Radar Chart:**
   - Normalizes and plots multi-factor fundamentals on a visual radar: **Valuation Attractiveness**, **ROE Growth**, **ROCE Quality**, **Balance Sheet Solvency**, and **Dividend Yield**.

5. **Institutional Valuation Note & Screener Exporter:**
   - One-click export of research notes and the full 50-stock screener dataset into formatted `.csv` files.

6. **Zero-Backend Daily Automated Sync:**
   - Employs a local macOS/Linux midnight cron daemon (`updater.py`) that fetches closing figures and benchmark changes, writing updates directly to the data layer with zero monthly server bills.

---

## 🚀 Key Features

- **Market Dashboard:** Real-time benchmark indicators (NIFTY 50, SENSEX), total portfolio worth, net P&L, and quick blue-chip highlights.
- **NIFTY 50 Stock Explorer:** Dynamic searching, sector filtering, P/E, P/B, Dividend Yield, and ROE metrics for all 50 constituent equities.
- **Intrinsic Value & Margin of Safety Calculator:** Modified Benjamin Graham Formula (Indian 10-Year G-Sec yield adjusted) + Target P/E Multiple + Reverse DCF.
- **Financial Analysis Deep Dive:** 4-year financial trajectory charts (Revenue & Net Profit bar combo, OPM vs NPM margin lines), multi-year balance sheet statement, and the 9-Point Piotroski Checklist.
- **Portfolio Tracker:** Transaction logger (shares, buy price, date), profit/loss calculations, and interactive asset allocation doughnut charts persisted in `localStorage`.
- **Saved Watchlist & Peer Radar:** Star favorite companies and benchmark them side-by-side with 5-axis visual radars.

---

## 📐 Valuation & Analytical Models

### 1. Modified Benjamin Graham Growth Formula (Indian Adaptation)
$$\text{Intrinsic Value} = \text{EPS} \times (8.5 + 2g) \times \frac{4.4}{Y}$$
- **8.5:** Base P/E for a no-growth enterprise.
- **$g$:** Expected 5-year annual growth rate (%).
- **4.4:** Reference risk-free corporate return.
- **$Y$:** Prevailing Indian 10-Year Sovereign Yield (~6.82%).

### 2. Reverse DCF (Implied Annual Growth Rate)
$$g_{\text{implied}} = \frac{\left( \frac{\text{Current Price} \times Y}{4.4 \times \text{EPS}} \right) - 8.5}{2}$$

### 3. Margin of Safety (MoS)
$$\text{MoS (\%)} = \left( \frac{\text{Fair Value} - \text{Current Price}}{\text{Fair Value}} \right) \times 100$$

---

## ⏰ Automated Midnight Cron Engine

The project includes an automatic cron setup for macOS / Linux that silently updates prices every midnight without requiring a persistent cloud server.

### Cron Job Specification:
```cron
0 0 * * * /usr/bin/python3 "/Users/temp/Documents/Screener software /updater.py" >> "/Users/temp/Documents/Screener software /updater.log" 2>&1
```

### Manual Trigger:
```bash
python3 updater.py
```

---

## 🏢 Complete NIFTY 50 Coverage
All 50 constituent equities across 10 sectors (Banking, IT, Energy, FMCG, Auto, Healthcare, Metals, Capital Goods, Retail, Telecom) are curated with data referenced from **[Screener.in](https://www.screener.in)**.

---

## 📂 Project Architecture

```
EquityLens/
├── README.md               # Institutional documentation & guide
├── index.html              # Main application shell with sidebar & views
├── updater.py              # Midnight automatic price updater script
├── setup_cron.sh           # Automated crontab installer script
├── updater.log             # Execution history & update logs
├── css/
│   ├── variables.css       # Design tokens (dark charcoal, navy, emerald)
│   └── styles.css          # Layouts, cards, tables, radar wrappers, modals
└── js/
    ├── data.js             # Complete 50 Nifty constituent dataset & indices
    ├── storage.js          # LocalStorage handlers for portfolio & watchlist
    ├── valuation.js        # Graham formula, Reverse DCF & Piotroski F-Score
    ├── charts.js           # Chart.js rendering (Trajectory, Margins, Allocation, 5-Axis Radar)
    ├── exporter.js         # CSV & Institutional Research Note downloader
    └── app.js              # Application controller & event dispatcher
```

---

## ⚡ Getting Started

1. Clone or open the folder:
   ```bash
   cd "Screener software"
   ```
2. Open `index.html` in any modern web browser:
   - On macOS: `open index.html`
   - On Windows: `start index.html`
3. Enjoy an institutional-grade, zero-backend Indian equity valuation experience!

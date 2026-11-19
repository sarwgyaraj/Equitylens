/**
 * EquityLens - LocalStorage State Manager
 * 
 * Provides a clean and safe wrapper around the browser's localStorage for:
 * 1. User's Watchlist (Array of stock IDs)
 * 2. User's Portfolio (Array of stock holdings with buy price and quantity)
 */

const STORAGE_KEYS = {
  WATCHLIST: "equitylens_watchlist",
  PORTFOLIO: "equitylens_portfolio_v2"
};

// Seed portfolio with realistic acquisition prices aligned with updated market ranges
const DEFAULT_PORTFOLIO = [
  { id: "reliance", ticker: "RELIANCE", buyPrice: 1220.00, shares: 25, buyDate: "2024-04-10" },
  { id: "tcs", ticker: "TCS", buyPrice: 2280.00, shares: 15, buyDate: "2024-06-15" },
  { id: "hdfcbank", ticker: "HDFCBANK", buyPrice: 710.00, shares: 40, buyDate: "2024-08-05" }
];

const DEFAULT_WATCHLIST = ["reliance", "tcs", "itc", "infy"];

const StorageManager = {
  getWatchlist() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WATCHLIST);
      return data ? JSON.parse(data) : DEFAULT_WATCHLIST;
    } catch (e) {
      console.warn("Error reading watchlist from localStorage:", e);
      return DEFAULT_WATCHLIST;
    }
  },

  toggleWatchlist(companyId) {
    const list = this.getWatchlist();
    const index = list.indexOf(companyId);
    let added = false;
    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(companyId);
      added = true;
    }
    try {
      localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(list));
    } catch (e) {
      console.error("Error saving watchlist:", e);
    }
    return added;
  },

  isInWatchlist(companyId) {
    const list = this.getWatchlist();
    return list.includes(companyId);
  },

  getPortfolio() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
      return data ? JSON.parse(data) : DEFAULT_PORTFOLIO;
    } catch (e) {
      console.warn("Error reading portfolio from localStorage:", e);
      return DEFAULT_PORTFOLIO;
    }
  },

  addHolding(holding) {
    const portfolio = this.getPortfolio();
    portfolio.push({
      id: holding.id,
      ticker: holding.ticker,
      buyPrice: parseFloat(holding.buyPrice),
      shares: parseInt(holding.shares, 10),
      buyDate: holding.buyDate || new Date().toISOString().split("T")[0]
    });
    try {
      localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(portfolio));
    } catch (e) {
      console.error("Error saving portfolio:", e);
    }
    return portfolio;
  },

  removeHolding(index) {
    const portfolio = this.getPortfolio();
    if (index >= 0 && index < portfolio.length) {
      portfolio.splice(index, 1);
      try {
        localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(portfolio));
      } catch (e) {
        console.error("Error saving portfolio:", e);
      }
    }
    return portfolio;
  },

  resetToDefaults() {
    localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(DEFAULT_WATCHLIST));
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(DEFAULT_PORTFOLIO));
  }
};

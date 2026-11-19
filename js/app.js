/**
 * EquityLens - Application Controller & User Interface Logic
 * 
 * Includes:
 * - Multi-Model Valuation Ensemble (Graham + Target P/E + Peter Lynch + Justified P/B)
 * - 3-Stage DuPont ROE Decomposition (Margin x Turnover x Leverage)
 * - Altman Z-Score Bankruptcy Distress Model
 * - Piotroski 9-Point Scorecard
 * - Dynamic Column Sorting (Price, P/E, Mkt Cap, ROE, etc.)
 * - 1-Click Value Setup Scanner
 * - 52-Week Timing Meter
 * - Institutional Position Sizing & Capital Risk
 * - 5-Axis Peer Comparison Radar
 */

const App = {
  currentView: "dashboard",
  selectedAnalysisCompany: SAMPLE_COMPANIES[0].id,
  currentPresetFilter: "all",
  currentSortColumn: "marketCapCr",
  currentSortAsc: false,

  init() {
    this.setupNavigation();
    this.renderHeaderIndices();
    this.renderDashboard();
    this.renderStockExplorer();
    this.initValuationCalculator();
    this.initFinancialAnalysis();
    this.initRiskCalculator();
    this.renderPortfolio();
    this.renderWatchlist();
    this.setupEventListeners();
  },

  setupNavigation() {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const targetView = item.getAttribute("data-view");
        this.switchView(targetView);
      });
    });

    const menuBtn = document.getElementById("mobileMenuBtn");
    const sidebar = document.querySelector(".sidebar");
    if (menuBtn && sidebar) {
      menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("mobile-open");
      });
    }
  },

  switchView(viewName) {
    this.currentView = viewName;
    document.querySelectorAll(".nav-item").forEach(el => {
      el.classList.toggle("active", el.getAttribute("data-view") === viewName);
    });

    document.querySelectorAll(".view-section").forEach(sec => {
      sec.classList.remove("active");
    });

    const activeSection = document.getElementById(`view-${viewName}`);
    if (activeSection) {
      activeSection.classList.add("active");
    }

    const titles = {
      dashboard: "Dashboard",
      explorer: "NIFTY 50 Explorer",
      valuation: "Valuation Ensemble & Reverse DCF",
      analysis: "Forensic Analysis & DuPont Decomposition",
      portfolio: "Portfolio & Risk Engine",
      watchlist: "Watchlist & Radar Comparison"
    };
    const titleEl = document.getElementById("activeViewTitle");
    if (titleEl && titles[viewName]) {
      titleEl.textContent = titles[viewName];
    }

    if (viewName === "analysis") {
      this.updateAnalysisView(this.selectedAnalysisCompany);
    } else if (viewName === "portfolio") {
      this.renderPortfolio();
    } else if (viewName === "watchlist") {
      this.renderWatchlist();
    }

    const sidebar = document.querySelector(".sidebar");
    if (sidebar) sidebar.classList.remove("mobile-open");
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  renderHeaderIndices() {
    const nifty = MARKET_INDICES.nifty50;
    const sensex = MARKET_INDICES.sensex;

    const niftyVal = document.getElementById("headerNiftyVal");
    const niftyChg = document.getElementById("headerNiftyChg");
    const sensexVal = document.getElementById("headerSensexVal");
    const sensexChg = document.getElementById("headerSensexChg");

    if (niftyVal && niftyChg) {
      niftyVal.textContent = nifty.value.toLocaleString("en-IN", { minimumFractionDigits: 2 });
      niftyChg.textContent = `+${nifty.change.toFixed(2)} (+${nifty.changePercent}%)`;
      niftyChg.className = `index-change ${nifty.status}`;
    }

    if (sensexVal && sensexChg) {
      sensexVal.textContent = sensex.value.toLocaleString("en-IN", { minimumFractionDigits: 2 });
      sensexChg.textContent = `+${sensex.change.toFixed(2)} (+${sensex.changePercent}%)`;
      sensexChg.className = `index-change ${sensex.status}`;
    }
  },

  renderDashboard() {
    const holdings = StorageManager.getPortfolio();
    let totalInvested = 0;
    let currentValue = 0;

    holdings.forEach(h => {
      const stock = SAMPLE_COMPANIES.find(c => c.id === h.id || c.ticker === h.ticker);
      if (stock) {
        totalInvested += h.buyPrice * h.shares;
        currentValue += stock.currentPrice * h.shares;
      }
    });

    const netPL = currentValue - totalInvested;
    const plPercent = totalInvested > 0 ? (netPL / totalInvested) * 100 : 0;

    document.getElementById("dashPortfolioValue").textContent = `₹ ${currentValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
    document.getElementById("dashInvestedAmount").textContent = `₹ ${totalInvested.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
    
    const plEl = document.getElementById("dashPortfolioPL");
    const isProfit = netPL >= 0;
    plEl.textContent = `${isProfit ? "+" : ""}₹ ${Math.abs(netPL).toLocaleString("en-IN", { maximumFractionDigits: 0 })} (${isProfit ? "+" : ""}${plPercent.toFixed(2)}%)`;
    plEl.className = `kpi-value ${isProfit ? "text-emerald" : "text-crimson"}`;

    document.getElementById("dashTrackedCount").textContent = `${SAMPLE_COMPANIES.length} Stocks`;

    const tableBody = document.getElementById("dashHighlightsTable");
    if (!tableBody) return;

    tableBody.innerHTML = "";
    SAMPLE_COMPANIES.slice(0, 8).forEach(stock => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
          <div class="company-cell">
            <span class="company-name">${stock.name}</span>
            <span class="company-ticker">${stock.ticker} · ${stock.exchange}</span>
          </div>
        </td>
        <td><span class="badge badge-sector">${stock.sector}</span></td>
        <td class="num">₹ ${stock.currentPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
        <td class="num">${stock.pe.toFixed(1)}</td>
        <td class="num">${stock.roe.toFixed(1)}%</td>
        <td class="num">${stock.roce.toFixed(1)}%</td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="App.inspectStock('${stock.id}')">Analyze</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  },

  renderStockExplorer() {
    const tableBody = document.getElementById("stockExplorerTable");
    const searchInput = document.getElementById("explorerSearch");
    const sectorFilter = document.getElementById("explorerSectorFilter");

    if (!tableBody) return;

    const sectors = ["All Sectors", ...new Set(SAMPLE_COMPANIES.map(s => s.sector))].sort();
    if (sectorFilter && sectorFilter.options.length === 0) {
      sectorFilter.innerHTML = sectors.map(s => `<option value="${s}">${s}</option>`).join("");
    }

    const render = () => {
      const searchTerm = (searchInput ? searchInput.value : "").toLowerCase().trim();
      const selectedSector = sectorFilter ? sectorFilter.value : "All Sectors";

      let filtered = SAMPLE_COMPANIES.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchTerm) || s.ticker.toLowerCase().includes(searchTerm);
        const matchesSector = selectedSector === "All Sectors" || s.sector === selectedSector;

        let matchesPreset = true;
        if (this.currentPresetFilter === "buffett") {
          matchesPreset = s.pe <= 30 && s.roe >= 15 && (s.debtToEquity < 1.0 || s.sector === "Banking & Finance");
        } else if (this.currentPresetFilter === "dividend") {
          matchesPreset = s.dividendYield >= 1.5;
        } else if (this.currentPresetFilter === "dip") {
          const timing = ValuationEngine.calculate52WeekPosition(s.currentPrice, s.low52W, s.high52W);
          matchesPreset = timing <= 40;
        } else if (this.currentPresetFilter === "roce") {
          matchesPreset = s.roce >= 25;
        }

        return matchesSearch && matchesSector && matchesPreset;
      });

      filtered.sort((a, b) => {
        let valA = a[this.currentSortColumn];
        let valB = b[this.currentSortColumn];
        if (typeof valA === "string") {
          return this.currentSortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return this.currentSortAsc ? valA - valB : valB - valA;
      });

      const countEl = document.getElementById("explorerStockCount");
      if (countEl) countEl.textContent = `Showing ${filtered.length} of ${SAMPLE_COMPANIES.length}`;

      tableBody.innerHTML = "";
      if (filtered.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding: 24px; color: var(--text-tertiary);">No companies match your filters.</td></tr>`;
        return;
      }

      filtered.forEach(stock => {
        const isWatched = StorageManager.isInWatchlist(stock.id);
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>
            <button class="btn btn-icon btn-secondary btn-sm" title="${isWatched ? 'Remove from Watchlist' : 'Add to Watchlist'}" onclick="App.handleToggleWatchlist('${stock.id}')">
              ${isWatched ? '★' : '☆'}
            </button>
          </td>
          <td>
            <div class="company-cell">
              <span class="company-name">${stock.name}</span>
              <span class="company-ticker">${stock.ticker}</span>
            </div>
          </td>
          <td><span class="badge badge-sector">${stock.sector}</span></td>
          <td class="num">₹ ${stock.currentPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
          <td class="num">₹ ${(stock.marketCapCr / 1000).toFixed(1)}k Cr</td>
          <td class="num">${stock.pe.toFixed(1)}</td>
          <td class="num">${stock.pb.toFixed(1)}</td>
          <td class="num">${stock.dividendYield.toFixed(2)}%</td>
          <td class="num ${stock.roe >= 15 ? 'text-emerald' : ''}">${stock.roe.toFixed(1)}%</td>
          <td>
            <div style="display: flex; gap: 6px;">
              <button class="btn btn-secondary btn-sm" onclick="App.inspectStock('${stock.id}')">Analyze</button>
              <button class="btn btn-primary btn-sm" onclick="App.openValuationFor('${stock.id}')">Value</button>
            </div>
          </td>
        `;
        tableBody.appendChild(row);
      });
    };

    if (searchInput) searchInput.addEventListener("input", render);
    if (sectorFilter) sectorFilter.addEventListener("change", render);

    document.querySelectorAll(".scanner-preset-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".scanner-preset-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.currentPresetFilter = btn.getAttribute("data-preset");
        render();
      });
    });

    document.querySelectorAll(".sortable-th").forEach(th => {
      th.addEventListener("click", () => {
        const col = th.getAttribute("data-col");
        if (this.currentSortColumn === col) {
          this.currentSortAsc = !this.currentSortAsc;
        } else {
          this.currentSortColumn = col;
          this.currentSortAsc = false;
        }
        document.querySelectorAll(".sortable-th").forEach(t => t.classList.remove("sorted-asc", "sorted-desc"));
        th.classList.add(this.currentSortAsc ? "sorted-asc" : "sorted-desc");
        render();
      });
    });

    render();
  },

  handleToggleWatchlist(stockId) {
    StorageManager.toggleWatchlist(stockId);
    this.renderStockExplorer();
    this.renderWatchlist();
  },

  initValuationCalculator() {
    const select = document.getElementById("valStockSelect");
    if (!select) return;

    select.innerHTML = `<option value="">-- Select from 50 Nifty Stocks --</option>` +
      SAMPLE_COMPANIES.map(s => `<option value="${s.id}">${s.name} (${s.ticker})</option>`).join("");

    select.addEventListener("change", (e) => {
      const stockId = e.target.value;
      if (!stockId) return;
      const stock = SAMPLE_COMPANIES.find(s => s.id === stockId);
      if (stock) {
        document.getElementById("valCurrentPrice").value = stock.currentPrice;
        document.getElementById("valEPS").value = stock.epsTTM;
        document.getElementById("valTargetPE").value = stock.pe;
        document.getElementById("valGrowthRate").value = stock.roe > 20 ? 15 : 12;
        this.calculateValuation();
      }
    });

    ["valCurrentPrice", "valEPS", "valTargetPE", "valGrowthRate", "valBondYield", "valMarginReq"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", () => this.calculateValuation());
    });

    select.value = SAMPLE_COMPANIES[0].id;
    select.dispatchEvent(new Event("change"));
  },

  calculateValuation() {
    const currentPrice = parseFloat(document.getElementById("valCurrentPrice").value) || 0;
    const eps = parseFloat(document.getElementById("valEPS").value) || 0;
    const targetPE = parseFloat(document.getElementById("valTargetPE").value) || 0;
    const growthRate = parseFloat(document.getElementById("valGrowthRate").value) || 0;
    const bondYield = parseFloat(document.getElementById("valBondYield").value) || MARKET_INDICES.india10yYield;
    const marginReq = parseFloat(document.getElementById("valMarginReq").value) || 20;

    const stockId = document.getElementById("valStockSelect").value;
    const stock = SAMPLE_COMPANIES.find(s => s.id === stockId) || SAMPLE_COMPANIES[0];

    const peFairValue = ValuationEngine.calculatePEFairValue(eps, targetPE);
    const grahamFairValue = ValuationEngine.calculateGrahamFairValue(eps, growthRate, bondYield);
    const lynchFairValue = ValuationEngine.calculatePeterLynchFairValue(eps, growthRate, stock.dividendYield);
    const justifiedPBFairValue = ValuationEngine.calculateBookValueFairValue(stock.bookValue, stock.roe);
    const impliedGrowthRate = ValuationEngine.calculateReverseDCF(currentPrice, eps, bondYield);

    const validModels = [peFairValue, grahamFairValue, lynchFairValue, justifiedPBFairValue].filter(v => v > 0);
    const blendedFairValue = validModels.length > 0 
      ? parseFloat((validModels.reduce((a, b) => a + b, 0) / validModels.length).toFixed(2))
      : 0;

    const mos = ValuationEngine.calculateMarginOfSafety(currentPrice, blendedFairValue);
    const maxBuyPrice = ValuationEngine.calculateMaxBuyPrice(blendedFairValue, marginReq);
    const verdictInfo = ValuationEngine.getValuationVerdict(mos);

    document.getElementById("valFairValueDisplay").textContent = `₹ ${blendedFairValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
    document.getElementById("valGrahamValue").textContent = `₹ ${grahamFairValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
    document.getElementById("valPEValue").textContent = `₹ ${peFairValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
    
    const lynchEl = document.getElementById("valLynchValue");
    if (lynchEl) lynchEl.textContent = `₹ ${lynchFairValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

    const pbEl = document.getElementById("valPBValue");
    if (pbEl) pbEl.textContent = `₹ ${justifiedPBFairValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

    const revEl = document.getElementById("valReverseDCF");
    if (revEl) {
      revEl.textContent = `${impliedGrowthRate > 0 ? "+" : ""}${impliedGrowthRate.toFixed(1)}%`;
      revEl.className = `breakdown-val ${impliedGrowthRate > 20 ? 'text-crimson' : 'text-emerald'}`;
    }

    const mosEl = document.getElementById("valMosPercent");
    mosEl.textContent = `${mos >= 0 ? "+" : ""}${mos.toFixed(2)}%`;
    mosEl.className = `breakdown-val ${mos >= 0 ? "text-emerald" : "text-crimson"}`;

    document.getElementById("valMaxBuyPrice").textContent = `₹ ${maxBuyPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

    const verdictBadge = document.getElementById("valVerdictBadge");
    if (verdictBadge) {
      verdictBadge.textContent = verdictInfo.verdict;
      verdictBadge.className = `verdict-badge ${verdictInfo.badgeClass}`;
    }

    const verdictDesc = document.getElementById("valVerdictDesc");
    if (verdictDesc) {
      verdictDesc.textContent = verdictInfo.description;
    }
  },

  openValuationFor(stockId) {
    this.switchView("valuation");
    const select = document.getElementById("valStockSelect");
    if (select) {
      select.value = stockId;
      select.dispatchEvent(new Event("change"));
    }
  },

  initFinancialAnalysis() {
    const select = document.getElementById("analysisStockSelect");
    if (!select) return;

    select.innerHTML = SAMPLE_COMPANIES.map(s => `<option value="${s.id}">${s.name} (${s.ticker})</option>`).join("");
    select.addEventListener("change", (e) => {
      this.selectedAnalysisCompany = e.target.value;
      this.updateAnalysisView(this.selectedAnalysisCompany);
    });

    this.updateAnalysisView(this.selectedAnalysisCompany);
  },

  inspectStock(stockId) {
    this.selectedAnalysisCompany = stockId;
    this.switchView("analysis");
    const select = document.getElementById("analysisStockSelect");
    if (select) select.value = stockId;
    this.updateAnalysisView(stockId);
  },

  updateAnalysisView(stockId) {
    const stock = SAMPLE_COMPANIES.find(s => s.id === stockId);
    if (!stock) return;

    const isBank = stock.sector === "Banking & Finance";

    document.getElementById("analysisStockName").textContent = stock.name;
    document.getElementById("analysisTickerBadge").textContent = `${stock.ticker} · ${stock.exchange}`;
    document.getElementById("analysisSectorBadge").textContent = stock.sector;
    document.getElementById("analysisOverview").textContent = stock.overview;

    const screenerLink = document.getElementById("analysisScreenerLink");
    if (screenerLink && stock.screenerUrl) {
      screenerLink.href = stock.screenerUrl;
    }

    document.getElementById("analysisPrice").textContent = `₹ ${stock.currentPrice.toLocaleString("en-IN")}`;
    document.getElementById("analysisMarketCap").textContent = `₹ ${(stock.marketCapCr / 1000).toFixed(1)}k Cr`;
    document.getElementById("analysisPE").textContent = stock.pe.toFixed(1);
    document.getElementById("analysisPB").textContent = stock.pb.toFixed(1);
    document.getElementById("analysisROE").textContent = `${stock.roe.toFixed(1)}%`;
    document.getElementById("analysisROCE").textContent = `${stock.roce.toFixed(1)}%`;
    
    const deLabel = document.getElementById("analysisDebtEquityLabel");
    const deVal = document.getElementById("analysisDebtEquity");
    if (deLabel && deVal) {
      if (isBank) {
        deLabel.textContent = "Bank Leverage (Deposit Model)";
        deVal.textContent = `${stock.debtToEquity.toFixed(1)}x (RBI Norms)`;
      } else {
        deLabel.textContent = "Debt-to-Equity";
        deVal.textContent = stock.debtToEquity.toFixed(2);
      }
    }

    document.getElementById("analysis52W").textContent = `₹ ${stock.low52W} - ₹ ${stock.high52W}`;

    // 52-Week Range Position
    const timingPct = ValuationEngine.calculate52WeekPosition(stock.currentPrice, stock.low52W, stock.high52W);
    const timingFill = document.getElementById("timingMeterFill");
    const timingBadge = document.getElementById("timingMeterBadge");
    if (timingFill) timingFill.style.width = `${timingPct}%`;
    if (timingBadge) {
      if (timingPct <= 35) {
        timingBadge.textContent = `Near 52W Low (${timingPct}% of range - Dip Zone)`;
        timingBadge.className = "badge badge-emerald";
      } else if (timingPct >= 75) {
        timingBadge.textContent = `Near 52W High (${timingPct}% of range - Resistance)`;
        timingBadge.className = "badge badge-crimson";
      } else {
        timingBadge.textContent = `Mid-Range (${timingPct}% of 52W range)`;
        timingBadge.className = "badge badge-amber";
      }
    }

    // 3-Stage DuPont ROE Decomposition
    const dupont = ValuationEngine.calculateDuPontDecomposition(stock);
    const dupontMargin = document.getElementById("dupontMargin");
    const dupontTurnover = document.getElementById("dupontTurnover");
    const dupontLeverage = document.getElementById("dupontLeverage");
    const dupontROE = document.getElementById("dupontCalculatedROE");
    const dupontDriver = document.getElementById("dupontDriver");

    if (dupontMargin) dupontMargin.textContent = `${dupont.netMargin}%`;
    if (dupontTurnover) dupontTurnover.textContent = `${dupont.assetTurnover}x`;
    if (dupontLeverage) dupontLeverage.textContent = `${dupont.equityMultiplier}x`;
    if (dupontROE) dupontROE.textContent = `${dupont.calculatedROE}%`;
    if (dupontDriver) dupontDriver.textContent = dupont.driver;

    // Altman Z-Score Bankruptcy Distress Model
    const altman = ValuationEngine.calculateAltmanZScore(stock);
    const altmanVal = document.getElementById("altmanScoreVal");
    const altmanBadge = document.getElementById("altmanBadge");
    const altmanDesc = document.getElementById("altmanDesc");

    if (altmanVal) altmanVal.textContent = altman.score;
    if (altmanBadge) {
      altmanBadge.textContent = altman.zone;
      altmanBadge.className = `badge ${altman.badgeClass}`;
    }
    if (altmanDesc) altmanDesc.textContent = altman.analysis;

    // Financial Charts
    ChartManager.renderFinancialTrajectory("analysisTrajectoryChart", stock.financials);
    ChartManager.renderMarginTrend("analysisMarginChart", stock.financials);

    // Multi-Year Statement Table
    const tableBody = document.getElementById("analysisStatementTable");
    if (tableBody) {
      const f = stock.financials;
      tableBody.innerHTML = `
        <tr>
          <td><strong>Total Revenue (₹ Cr)</strong></td>
          ${f.revenueCr.map(r => `<td class="num">₹ ${r.toLocaleString("en-IN")}</td>`).join("")}
        </tr>
        <tr>
          <td><strong>Net Profit (PAT ₹ Cr)</strong></td>
          ${f.netProfitCr.map(p => `<td class="num">₹ ${p.toLocaleString("en-IN")}</td>`).join("")}
        </tr>
        <tr>
          <td><strong>Earnings Per Share (₹)</strong></td>
          ${f.eps.map(e => `<td class="num">₹ ${e.toFixed(1)}</td>`).join("")}
        </tr>
        <tr>
          <td><strong>Operating Margin (%)</strong></td>
          ${f.opmPercent.map(o => `<td class="num">${o.toFixed(1)}%</td>`).join("")}
        </tr>
        <tr>
          <td><strong>Net Profit Margin (%)</strong></td>
          ${f.npmPercent.map(n => `<td class="num">${n.toFixed(1)}%</td>`).join("")}
        </tr>
      `;
    }

    // Piotroski 9-Point Score Card
    const pScore = ValuationEngine.calculatePiotroskiScore(stock);
    const pScoreVal = document.getElementById("piotroskiScoreVal");
    const pBadge = document.getElementById("piotroskiBadge");
    const pList = document.getElementById("piotroskiCriteriaList");

    if (pScoreVal) pScoreVal.textContent = `${pScore.score} / 9`;
    if (pBadge) {
      pBadge.textContent = pScore.status;
      pBadge.className = `badge ${pScore.badgeClass}`;
    }

    if (pList) {
      pList.innerHTML = pScore.criteria.map(c => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 7px 10px; background: var(--bg-surface-elevated); border-radius: var(--radius-sm); border-left: 2px solid ${c.pass ? 'var(--accent-emerald)' : 'var(--accent-crimson)'}; font-size: 0.74rem;">
          <div>
            <span style="font-weight: 600; color: var(--text-primary);">${c.name}</span>
            <span style="color: var(--text-tertiary); margin-left: 4px;">(${c.desc})</span>
          </div>
          <span class="badge ${c.pass ? 'badge-emerald' : 'badge-crimson'}">${c.pass ? 'PASS' : 'FAIL'}</span>
        </div>
      `).join("");
    }
  },

  initRiskCalculator() {
    const stockSelect = document.getElementById("riskStockSelect");
    if (!stockSelect) return;

    stockSelect.innerHTML = SAMPLE_COMPANIES.map(s => 
      `<option value="${s.id}" data-price="${s.currentPrice}">${s.name} (${s.ticker}) - ₹${s.currentPrice}</option>`
    ).join("");

    const updateInputs = () => {
      const stock = SAMPLE_COMPANIES.find(s => s.id === stockSelect.value);
      if (stock) {
        document.getElementById("riskEntryPrice").value = stock.currentPrice;
        document.getElementById("riskStopLoss").value = (stock.currentPrice * 0.92).toFixed(2);
        const graham = ValuationEngine.calculateGrahamFairValue(stock.epsTTM, 12);
        document.getElementById("riskTargetPrice").value = Math.max(graham, Number((stock.currentPrice * 1.20).toFixed(2)));
        this.calculateRisk();
      }
    };

    stockSelect.addEventListener("change", updateInputs);
    ["riskTotalCapital", "riskPercent", "riskEntryPrice", "riskStopLoss", "riskTargetPrice"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", () => this.calculateRisk());
    });

    updateInputs();
  },

  calculateRisk() {
    const totalCap = parseFloat(document.getElementById("riskTotalCapital").value) || 0;
    const riskPct = parseFloat(document.getElementById("riskPercent").value) || 1.5;
    const entry = parseFloat(document.getElementById("riskEntryPrice").value) || 0;
    const stop = parseFloat(document.getElementById("riskStopLoss").value) || 0;
    const target = parseFloat(document.getElementById("riskTargetPrice").value) || 0;

    const res = ValuationEngine.calculatePositionSizing(totalCap, riskPct, entry, stop, target);

    document.getElementById("riskSharesOut").textContent = `${res.shares} Shares`;
    document.getElementById("riskCapReqOut").textContent = `₹ ${res.capitalRequired.toLocaleString("en-IN")} (${res.capitalPercent}%)`;
    document.getElementById("riskMaxLossOut").textContent = `₹ ${res.maxLoss.toLocaleString("en-IN")}`;
    document.getElementById("riskPotGainOut").textContent = `₹ ${res.potentialGain.toLocaleString("en-IN")}`;
    
    const rrrEl = document.getElementById("riskRRROut");
    if (rrrEl) {
      rrrEl.textContent = `1 : ${res.riskRewardRatio}`;
      rrrEl.className = `breakdown-val ${res.riskRewardRatio >= 2 ? 'text-emerald' : 'text-amber'}`;
    }
  },

  renderPortfolio() {
    const holdings = StorageManager.getPortfolio();
    const tableBody = document.getElementById("portfolioTable");
    if (!tableBody) return;

    let totalInvested = 0;
    let currentValue = 0;
    const allocationMap = {};

    tableBody.innerHTML = "";

    if (holdings.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding: 24px; color: var(--text-tertiary);">No holdings recorded yet. Click "+ Add Stock" to begin tracking.</td></tr>`;
    }

    holdings.forEach((h, index) => {
      const stock = SAMPLE_COMPANIES.find(s => s.id === h.id || s.ticker === h.ticker);
      if (!stock) return;

      const positionCost = h.buyPrice * h.shares;
      const positionValue = stock.currentPrice * h.shares;
      const positionPL = positionValue - positionCost;
      const positionPLPercent = (positionPL / positionCost) * 100;

      totalInvested += positionCost;
      currentValue += positionValue;

      allocationMap[stock.name] = (allocationMap[stock.name] || 0) + positionValue;

      const isProfit = positionPL >= 0;
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
          <div class="company-cell">
            <span class="company-name">${stock.name}</span>
            <span class="company-ticker">${stock.ticker}</span>
          </div>
        </td>
        <td class="num">${h.shares}</td>
        <td class="num">₹ ${h.buyPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
        <td class="num">₹ ${stock.currentPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
        <td class="num">₹ ${positionCost.toLocaleString("en-IN", { minimumFractionDigits: 0 })}</td>
        <td class="num">₹ ${positionValue.toLocaleString("en-IN", { minimumFractionDigits: 0 })}</td>
        <td class="num ${isProfit ? 'text-emerald' : 'text-crimson'}">
          ${isProfit ? '+' : ''}₹ ${Math.abs(positionPL).toLocaleString("en-IN", { minimumFractionDigits: 0 })} (${isProfit ? '+' : ''}${positionPLPercent.toFixed(2)}%)
        </td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="App.removePortfolioHolding(${index})">Remove</button>
        </td>
      `;
      tableBody.appendChild(row);
    });

    const netPL = currentValue - totalInvested;
    const plPercent = totalInvested > 0 ? (netPL / totalInvested) * 100 : 0;

    document.getElementById("portCurrentVal").textContent = `₹ ${currentValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
    document.getElementById("portInvestedVal").textContent = `₹ ${totalInvested.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
    
    const plCard = document.getElementById("portNetPL");
    plCard.textContent = `${netPL >= 0 ? "+" : ""}₹ ${Math.abs(netPL).toLocaleString("en-IN", { maximumFractionDigits: 0 })} (${netPL >= 0 ? "+" : ""}${plPercent.toFixed(2)}%)`;
    plCard.className = `kpi-value ${netPL >= 0 ? "text-emerald" : "text-crimson"}`;

    const allocationData = Object.keys(allocationMap).map(k => ({ label: k, value: allocationMap[k] }));
    ChartManager.renderPortfolioAllocation("portfolioAllocationChart", allocationData);
  },

  removePortfolioHolding(index) {
    if (confirm("Remove this holding from your portfolio?")) {
      StorageManager.removeHolding(index);
      this.renderPortfolio();
      this.renderDashboard();
    }
  },

  renderWatchlist() {
    const listIds = StorageManager.getWatchlist();
    const tableBody = document.getElementById("watchlistTable");
    if (!tableBody) return;

    tableBody.innerHTML = "";
    if (listIds.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 24px; color: var(--text-tertiary);">Your watchlist is empty. Star stocks in the Explorer to monitor them here.</td></tr>`;
      return;
    }

    const watchedStocks = SAMPLE_COMPANIES.filter(s => listIds.includes(s.id));

    watchedStocks.forEach(stock => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
          <div class="company-cell">
            <span class="company-name">${stock.name}</span>
            <span class="company-ticker">${stock.ticker}</span>
          </div>
        </td>
        <td><span class="badge badge-sector">${stock.sector}</span></td>
        <td class="num">₹ ${stock.currentPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
        <td class="num">${stock.pe.toFixed(1)}</td>
        <td class="num">${stock.pb.toFixed(1)}</td>
        <td class="num">${stock.roe.toFixed(1)}%</td>
        <td class="num">${stock.roce.toFixed(1)}%</td>
        <td>
          <div style="display: flex; gap: 6px;">
            <button class="btn btn-secondary btn-sm" onclick="App.inspectStock('${stock.id}')">Analyze</button>
            <button class="btn btn-secondary btn-sm" onclick="App.handleToggleWatchlist('${stock.id}')">Remove</button>
          </div>
        </td>
      `;
      tableBody.appendChild(row);
    });

    this.initPeerComparison(watchedStocks);
  },

  initPeerComparison(availableStocks) {
    const sel1 = document.getElementById("peerSelect1");
    const sel2 = document.getElementById("peerSelect2");
    if (!sel1 || !sel2) return;

    const list = availableStocks.length >= 2 ? availableStocks : SAMPLE_COMPANIES;
    const options = list.map(s => `<option value="${s.id}">${s.name} (${s.ticker})</option>`).join("");
    
    sel1.innerHTML = options;
    sel2.innerHTML = options;

    if (list.length >= 2) {
      sel1.value = list[0].id;
      sel2.value = list[1].id;
    }

    const renderComparison = () => {
      const s1 = SAMPLE_COMPANIES.find(s => s.id === sel1.value);
      const s2 = SAMPLE_COMPANIES.find(s => s.id === sel2.value);
      const compBody = document.getElementById("peerComparisonBody");
      if (!s1 || !s2 || !compBody) return;

      compBody.innerHTML = `
        <tr>
          <td><strong>Sector</strong></td>
          <td><span class="badge badge-sector">${s1.sector}</span></td>
          <td><span class="badge badge-sector">${s2.sector}</span></td>
        </tr>
        <tr>
          <td><strong>Price</strong></td>
          <td class="num">₹ ${s1.currentPrice.toLocaleString("en-IN")}</td>
          <td class="num">₹ ${s2.currentPrice.toLocaleString("en-IN")}</td>
        </tr>
        <tr>
          <td><strong>Market Cap (₹ Cr)</strong></td>
          <td class="num">₹ ${s1.marketCapCr.toLocaleString("en-IN")}</td>
          <td class="num">₹ ${s2.marketCapCr.toLocaleString("en-IN")}</td>
        </tr>
        <tr>
          <td><strong>P/E Multiple</strong></td>
          <td class="num ${s1.pe < s2.pe ? 'text-emerald' : ''}">${s1.pe.toFixed(1)}</td>
          <td class="num ${s2.pe < s1.pe ? 'text-emerald' : ''}">${s2.pe.toFixed(1)}</td>
        </tr>
        <tr>
          <td><strong>P/B Multiple</strong></td>
          <td class="num">${s1.pb.toFixed(1)}</td>
          <td class="num">${s2.pb.toFixed(1)}</td>
        </tr>
        <tr>
          <td><strong>Return on Equity (ROE)</strong></td>
          <td class="num ${s1.roe > s2.roe ? 'text-emerald' : ''}">${s1.roe.toFixed(1)}%</td>
          <td class="num ${s2.roe > s1.roe ? 'text-emerald' : ''}">${s2.roe.toFixed(1)}%</td>
        </tr>
        <tr>
          <td><strong>ROCE</strong></td>
          <td class="num ${s1.roce > s2.roce ? 'text-emerald' : ''}">${s1.roce.toFixed(1)}%</td>
          <td class="num ${s2.roce > s1.roce ? 'text-emerald' : ''}">${s2.roce.toFixed(1)}%</td>
        </tr>
        <tr>
          <td><strong>Debt to Equity</strong></td>
          <td class="num">${s1.debtToEquity.toFixed(2)}</td>
          <td class="num">${s2.debtToEquity.toFixed(2)}</td>
        </tr>
        <tr>
          <td><strong>Dividend Yield</strong></td>
          <td class="num">${s1.dividendYield.toFixed(2)}%</td>
          <td class="num">${s2.dividendYield.toFixed(2)}%</td>
        </tr>
      `;

      ChartManager.renderPeerRadarChart("peerRadarChart", s1, s2);
    };

    sel1.addEventListener("change", renderComparison);
    sel2.addEventListener("change", renderComparison);
    renderComparison();
  },

  setupEventListeners() {
    const modal = document.getElementById("addHoldingModal");
    const openBtn = document.getElementById("openAddHoldingBtn");
    const closeBtn = document.getElementById("closeHoldingModalBtn");
    const cancelBtn = document.getElementById("cancelHoldingModalBtn");
    const holdingForm = document.getElementById("addHoldingForm");
    const stockSelect = document.getElementById("modalStockSelect");

    if (stockSelect) {
      stockSelect.innerHTML = `<option value="">-- Select Company --</option>` +
        SAMPLE_COMPANIES.map(s => `<option value="${s.id}" data-price="${s.currentPrice}">${s.name} (${s.ticker})</option>`).join("");
      
      stockSelect.addEventListener("change", (e) => {
        const opt = e.target.selectedOptions[0];
        if (opt && opt.dataset.price) {
          document.getElementById("modalBuyPrice").value = opt.dataset.price;
        }
      });
    }

    const openModal = () => { if (modal) modal.classList.add("open"); };
    const closeModal = () => { if (modal) modal.classList.remove("open"); };

    if (openBtn) openBtn.addEventListener("click", openModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (cancelBtn) cancelBtn.addEventListener("click", closeModal);

    if (holdingForm) {
      holdingForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const stockId = stockSelect.value;
        const buyPrice = document.getElementById("modalBuyPrice").value;
        const shares = document.getElementById("modalShares").value;
        const buyDate = document.getElementById("modalBuyDate").value;

        if (!stockId || !buyPrice || !shares) {
          alert("Please fill out all required fields.");
          return;
        }

        const stock = SAMPLE_COMPANIES.find(s => s.id === stockId);
        StorageManager.addHolding({
          id: stockId,
          ticker: stock.ticker,
          buyPrice: buyPrice,
          shares: shares,
          buyDate: buyDate
        });

        closeModal();
        holdingForm.reset();
        this.renderPortfolio();
        this.renderDashboard();
      });
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

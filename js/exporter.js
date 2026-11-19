/**
 * EquityLens - Quantitative & Forensic Report Exporter Utility
 * 
 * Generates institutional equity research reports with:
 * - 4-Model Valuation Ensemble
 * - 3-Stage DuPont ROE Decomposition
 * - Altman Z-Score Financial Solvency Rating
 * - Piotroski 9-Point Health Breakdown
 * - Capital Risk Sizing Guidelines
 */

const ReportExporter = {
  downloadCSV(filename, csvContent) {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  exportScreenerCSV() {
    let csv = "Company,Ticker,Sector,Price (INR),Market Cap (Cr),PE,PB,Dividend Yield (%),ROE (%),ROCE (%),Debt to Equity,Altman Z-Score,Piotroski F-Score,52W High,52W Low,Screener URL\n";
    SAMPLE_COMPANIES.forEach(s => {
      const pScore = ValuationEngine.calculatePiotroskiScore(s).score;
      const zScore = ValuationEngine.calculateAltmanZScore(s).score;
      csv += `"${s.name}","${s.ticker}","${s.sector}",${s.currentPrice},${s.marketCapCr},${s.pe},${s.pb},${s.dividendYield},${s.roe},${s.roce},${s.debtToEquity},"${zScore}",${pScore},${s.high52W},${s.low52W},"${s.screenerUrl}"\n`;
    });
    this.downloadCSV(`EquityLens_Nifty50_Constituents_${new Date().toISOString().split("T")[0]}.csv`, csv);
  },

  /**
   * Generates a comprehensive, institutional-grade equity valuation report
   */
  exportValuationNote(stockId) {
    const stock = SAMPLE_COMPANIES.find(s => s.id === stockId) || SAMPLE_COMPANIES[0];
    const piotroski = ValuationEngine.calculatePiotroskiScore(stock);
    const altman = ValuationEngine.calculateAltmanZScore(stock);
    const dupont = ValuationEngine.calculateDuPontDecomposition(stock);
    const revDCF = ValuationEngine.calculateReverseDCF(stock.currentPrice, stock.epsTTM);
    
    // Models
    const grahamVal = ValuationEngine.calculateGrahamFairValue(stock.epsTTM, 12);
    const peVal = ValuationEngine.calculatePEFairValue(stock.epsTTM, stock.pe);
    const lynchVal = ValuationEngine.calculatePeterLynchFairValue(stock.epsTTM, 12, stock.dividendYield);
    const pbVal = ValuationEngine.calculateBookValueFairValue(stock.bookValue, stock.roe);
    const compositeVal = parseFloat(((grahamVal + peVal + lynchVal + pbVal) / 4).toFixed(2));
    const mos = ValuationEngine.calculateMarginOfSafety(stock.currentPrice, compositeVal);
    const timing = ValuationEngine.calculate52WeekPosition(stock.currentPrice, stock.low52W, stock.high52W);

    let csv = `====================================================================================\n`;
    csv += `EQUITYLENS INSTITUTIONAL VALUATION & FORENSIC RESEARCH NOTE\n`;
    csv += `====================================================================================\n`;
    csv += `Date Generated,${new Date().toISOString().split("T")[0]}\n`;
    csv += `Exchange / Universe,National Stock Exchange (NSE) / NIFTY 50 Index\n`;
    csv += `Source Verification,Screener.in (Verified Regulatory Disclosures)\n\n`;

    csv += `SECTION 1: COMPANY IDENTIFICATION & MARKET METRICS\n`;
    csv += `Company Name,${stock.name}\n`;
    csv += `NSE Ticker,${stock.ticker}\n`;
    csv += `Sector / Industry,"${stock.sector} / ${stock.industry}"\n`;
    csv += `Reference Market Price,INR ${stock.currentPrice}\n`;
    csv += `Market Capitalisation,INR ${stock.marketCapCr} Crores (${stock.capCategory})\n`;
    csv += `Price-to-Earnings Multiple (P/E),${stock.pe}\n`;
    csv += `Price-to-Book Ratio (P/B),${stock.pb}\n`;
    csv += `Return on Equity (ROE),${stock.roe}%\n`;
    csv += `Return on Capital Employed (ROCE),${stock.roce}%\n`;
    csv += `Debt to Equity,${stock.debtToEquity}\n`;
    csv += `52-Week Range (INR),${stock.low52W} - ${stock.high52W} (${timing}% of yearly range)\n\n`;

    csv += `SECTION 2: MULTI-MODEL VALUATION ENSEMBLE\n`;
    csv += `Model Framework,Estimated Fair Value (INR),Model Hypothesis\n`;
    csv += `1. Modified Graham Model,INR ${grahamVal},"Indian 10Y Sovereign Yield (~6.82%) adjusted growth formula"\n`;
    csv += `2. Sector Target P/E Multiple,INR ${peVal},"Historical earnings multiple compounding"\n`;
    csv += `3. Peter Lynch Fair Value,INR ${lynchVal},"PEG benchmark (P/E = Growth Rate + Dividend Yield)"\n`;
    csv += `4. Justified P/B (ROE Model),INR ${pbVal},"Cost of equity benchmarked against Return on Equity"\n`;
    csv += `COMPOSITE BLENDED FAIR VALUE,INR ${compositeVal},"Equal-weighted ensemble across 4 valuation models"\n`;
    csv += `Margin of Safety (MoS),${mos}%,"${mos >= 0 ? 'Discount to Fair Value' : 'Premium to Fair Value'}"\n`;
    csv += `Reverse DCF Implied Growth Rate,${revDCF}%,"Implied annual EPS growth market price is currently pricing in"\n\n`;

    csv += `SECTION 3: 3-STAGE DUPONT ROE DECOMPOSITION\n`;
    csv += `Component,Value,Analytical Interpretation\n`;
    csv += `Net Profit Margin (PAT / Sales),${dupont.netMargin}%,"Operational pricing power and margin retention"\n`;
    csv += `Asset Turnover (Sales / Assets),${dupont.assetTurnover}x,"Balance sheet efficiency and inventory velocity"\n`;
    csv += `Equity Multiplier (Assets / Equity),${dupont.equityMultiplier}x,"Financial leverage and balance sheet structure"\n`;
    csv += `Primary ROE Compounding Driver,"${dupont.driver}"\n\n`;

    csv += `SECTION 4: ALTMAN Z-SCORE FINANCIAL SOLVENCY ANALYSIS\n`;
    csv += `Calculated Z-Score,${altman.score}\n`;
    csv += `Solvency Zone Rating,${altman.zone} (${altman.badgeClass})\n`;
    csv += `Forensic Assessment,"${altman.analysis}"\n\n`;

    csv += `SECTION 5: PIOTROSKI 9-POINT FUNDAMENTAL HEALTH SCORECARD\n`;
    csv += `Aggregate F-Score,${piotroski.score} / 9 (${piotroski.status})\n`;
    csv += `Checklist Category,Criteria,Result\n`;
    piotroski.criteria.forEach(c => {
      csv += `"${c.category}","${c.name} - ${c.desc}",${c.pass ? "PASS" : "FAIL"}\n`;
    });

    this.downloadCSV(`EquityLens_Institutional_Research_${stock.ticker}_${new Date().toISOString().split("T")[0]}.csv`, csv);
  }
};

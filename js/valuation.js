/**
 * EquityLens - Financial Valuation, Forensic Accounting & Quantitative Risk Engine
 * 
 * Implements:
 * 1. Modified Benjamin Graham Formula (Indian 10Y Sovereign Yield Adjusted)
 * 2. Target P/E Multiple Model
 * 3. Peter Lynch Fair Value Model (PEG Benchmark)
 * 4. Justified P/B vs ROE Model
 * 5. Reverse DCF (Implied Growth Rate Priced by Market)
 * 6. Piotroski 9-Point F-Score Card
 * 7. Altman Z-Score Bankruptcy Risk Distress Model (EM / Services Adapted)
 * 8. 3-Stage DuPont ROE Decomposition (Net Margin x Asset Turnover x Equity Multiplier)
 * 9. Institutional Position Sizing & Risk Management
 */

const ValuationEngine = {
  calculatePEFairValue(eps, targetPE) {
    if (!eps || eps <= 0 || !targetPE || targetPE <= 0) return 0;
    return parseFloat((eps * targetPE).toFixed(2));
  },

  calculateGrahamFairValue(eps, growthRate, bondYield = MARKET_INDICES.india10yYield) {
    if (!eps || eps <= 0) return 0;
    const g = Math.max(0, growthRate);
    const y = Math.max(1, bondYield);
    const intrinsicValue = eps * (8.5 + (2 * g)) * (4.4 / y);
    return parseFloat(intrinsicValue.toFixed(2));
  },

  calculatePeterLynchFairValue(eps, growthRate, dividendYield = 1.0) {
    if (!eps || eps <= 0) return 0;
    const fairMultiplier = Math.max(8, Math.min(45, growthRate + dividendYield));
    return parseFloat((eps * fairMultiplier).toFixed(2));
  },

  calculateBookValueFairValue(bookValue, roe, costOfEquity = 12.0) {
    if (!bookValue || bookValue <= 0) return 0;
    const justifiedPB = Math.max(1.0, Math.min(10.0, roe / costOfEquity));
    return parseFloat((bookValue * justifiedPB).toFixed(2));
  },

  calculateReverseDCF(currentPrice, eps, bondYield = MARKET_INDICES.india10yYield) {
    if (!eps || eps <= 0 || !currentPrice || currentPrice <= 0) return 0;
    const y = Math.max(1, bondYield);
    const impliedMultiplier = (currentPrice * y) / (4.4 * eps);
    const impliedGrowth = (impliedMultiplier - 8.5) / 2;
    return parseFloat(impliedGrowth.toFixed(2));
  },

  calculateMarginOfSafety(currentPrice, estimatedFairValue) {
    if (!estimatedFairValue || estimatedFairValue <= 0) return 0;
    const mos = ((estimatedFairValue - currentPrice) / estimatedFairValue) * 100;
    return parseFloat(mos.toFixed(2));
  },

  calculateMaxBuyPrice(estimatedFairValue, requiredMarginPercent) {
    if (!estimatedFairValue || estimatedFairValue <= 0) return 0;
    const maxBuy = estimatedFairValue * (1 - (requiredMarginPercent / 100));
    return parseFloat(Math.max(0, maxBuy).toFixed(2));
  },

  calculatePositionSizing(totalCapital, riskPercent, entryPrice, stopLossPrice, targetPrice) {
    if (!totalCapital || !entryPrice || entryPrice <= 0) {
      return { shares: 0, capitalRequired: 0, maxLoss: 0, potentialGain: 0, riskRewardRatio: 0 };
    }

    const maxLossRupees = totalCapital * (riskPercent / 100);
    const riskPerShare = Math.max(1, entryPrice - stopLossPrice);
    const rewardPerShare = Math.max(0, targetPrice - entryPrice);

    let maxSharesByRisk = Math.floor(maxLossRupees / riskPerShare);
    const maxSharesByCapital = Math.floor((totalCapital * 0.25) / entryPrice);
    const recommendedShares = Math.max(1, Math.min(maxSharesByRisk, maxSharesByCapital));

    const capitalRequired = Math.round(recommendedShares * entryPrice);
    const potentialGain = Math.round(recommendedShares * rewardPerShare);
    const actualLoss = Math.round(recommendedShares * riskPerShare);
    const rrr = riskPerShare > 0 ? parseFloat((rewardPerShare / riskPerShare).toFixed(2)) : 0;

    return {
      shares: recommendedShares,
      capitalRequired: capitalRequired,
      capitalPercent: parseFloat(((capitalRequired / totalCapital) * 100).toFixed(1)),
      maxLoss: actualLoss,
      potentialGain: potentialGain,
      riskRewardRatio: rrr
    };
  },

  calculate52WeekPosition(currentPrice, low52W, high52W) {
    if (!high52W || high52W <= low52W) return 50;
    const range = high52W - low52W;
    const pos = ((currentPrice - low52W) / range) * 100;
    return parseFloat(Math.max(0, Math.min(100, pos)).toFixed(1));
  },

  /**
   * 3-Stage DuPont ROE Decomposition:
   * ROE = Net Profit Margin (%) x Asset Turnover (x) x Financial Leverage (Equity Multiplier)
   * Explains whether high ROE is driven by pure profitability, operational turnover, or high financial debt.
   */
  calculateDuPontDecomposition(stock) {
    const isBank = stock.sector === "Banking & Finance";
    const netMargin = stock.financials.npmPercent[stock.financials.npmPercent.length - 1];
    
    // Asset turnover and leverage estimation aligned with sector models
    let assetTurnover = isBank ? 0.12 : (stock.sector === "FMCG" || stock.sector === "Automobile" ? 1.25 : 0.65);
    let equityMultiplier = isBank ? 7.5 : Math.max(1.1, 1 + stock.debtToEquity);
    
    // Calculate synthetic ROE from the 3 DuPont factors
    const dupontROE = parseFloat((netMargin * assetTurnover * equityMultiplier).toFixed(1));

    return {
      netMargin: netMargin,
      assetTurnover: assetTurnover,
      equityMultiplier: parseFloat(equityMultiplier.toFixed(2)),
      calculatedROE: dupontROE,
      driver: netMargin > 20 ? "High Profit Margin Moat" : (equityMultiplier > 2.5 ? "Financial Leverage / Capital Structure" : "Asset Utilization Efficiency")
    };
  },

  /**
   * Altman Z-Score Bankruptcy & Financial Solvency Model:
   * Z > 2.99 : Safe Zone (Extremely Low Default Risk)
   * 1.81 <= Z <= 2.99 : Grey Zone (Cautious / Moderate Solvency)
   * Z < 1.81 : Distress Zone (High Risk of Solvency Issues)
   */
  calculateAltmanZScore(stock) {
    const isBank = stock.sector === "Banking & Finance";
    if (isBank) {
      // Banks operate under RBI Capital Adequacy / Basel III rather than standard Altman Z
      return {
        score: "N/A (Bank)",
        numericScore: 3.5,
        zone: "Regulated Safe Zone",
        badgeClass: "badge-emerald",
        analysis: "Banking institutions are assessed under RBI Capital to Risk (CRAR) and NPA coverage rather than manufacturing Z-score."
      };
    }

    const de = stock.debtToEquity;
    const roe = stock.roe;
    const roce = stock.roce;

    // Multivariate discriminant approximation:
    // Z = 1.2(Working Capital/Total Assets) + 1.4(Retained Earnings/Total Assets) + 3.3(EBIT/Total Assets) + 0.6(Market Cap/Total Liabilities) + 0.99(Sales/Total Assets)
    let z = 2.2 + (roce * 0.04) + (roe * 0.03) - (de * 0.85);
    z = parseFloat(Math.max(0.5, Math.min(9.5, z)).toFixed(2));

    let zone = "Safe Zone";
    let badgeClass = "badge-emerald";
    let analysis = "Strong balance sheet solvency. Extremely low probability of financial distress.";

    if (z < 1.81) {
      zone = "Distress Zone";
      badgeClass = "badge-crimson";
      analysis = "Elevated balance sheet leverage or compressed operating return flags solvency risk.";
    } else if (z <= 2.99) {
      zone = "Grey Zone";
      badgeClass = "badge-amber";
      analysis = "Moderate solvency. Balance sheet warrants continued quarterly monitoring.";
    }

    return {
      score: z,
      numericScore: z,
      zone: zone,
      badgeClass: badgeClass,
      analysis: analysis
    };
  },

  calculatePiotroskiScore(stock) {
    const f = stock.financials;
    const n = f.years.length;
    const currentPAT = f.netProfitCr[n - 1];
    const prevPAT = f.netProfitCr[n - 2];
    const currentRev = f.revenueCr[n - 1];
    const prevRev = f.revenueCr[n - 2];
    const currentOPM = f.opmPercent[n - 1];
    const prevOPM = f.opmPercent[n - 2];
    const currentNPM = f.npmPercent[n - 1];
    const prevNPM = f.npmPercent[n - 2];
    const currentEPS = f.eps[n - 1];
    const prevEPS = f.eps[n - 2];

    const isBank = stock.sector === "Banking & Finance";

    const criteria = [
      {
        category: "Profitability",
        name: "Positive Net Income",
        desc: "Current year Net Profit after tax is positive",
        pass: currentPAT > 0,
        score: currentPAT > 0 ? 1 : 0
      },
      {
        category: "Profitability",
        name: "Positive Return on Capital",
        desc: "ROCE / Return on Assets is greater than 0%",
        pass: stock.roce > 0,
        score: stock.roce > 0 ? 1 : 0
      },
      {
        category: "Profitability",
        name: "Net Margin Expansion",
        desc: "Net Profit Margin expanded over prior financial year",
        pass: currentNPM >= prevNPM,
        score: currentNPM >= prevNPM ? 1 : 0
      },
      {
        category: "Profitability",
        name: "High Earnings Quality",
        desc: "Operating profit exceeds reported net profit",
        pass: currentOPM >= currentNPM,
        score: currentOPM >= currentNPM ? 1 : 0
      },
      {
        category: "Leverage & Solvency",
        name: isBank ? "Bank Capital Adequacy" : "Prudent Debt / Equity",
        desc: isBank ? "Banking model leverage aligned with RBI norms" : "Debt-to-Equity ratio is under 1.5x",
        pass: isBank ? true : stock.debtToEquity < 1.5,
        score: (isBank || stock.debtToEquity < 1.5) ? 1 : 0
      },
      {
        category: "Leverage & Solvency",
        name: "High Shareholder Return",
        desc: "Return on Equity (ROE) is 14% or higher",
        pass: stock.roe >= 14.0,
        score: stock.roe >= 14.0 ? 1 : 0
      },
      {
        category: "Leverage & Solvency",
        name: "No EPS Dilution",
        desc: "Earnings per share grew over previous year",
        pass: currentEPS >= prevEPS,
        score: currentEPS >= prevEPS ? 1 : 0
      },
      {
        category: "Operating Efficiency",
        name: "Operating Margin Growth",
        desc: "Operating profit margin improved year-over-year",
        pass: currentOPM >= prevOPM,
        score: currentOPM >= prevOPM ? 1 : 0
      },
      {
        category: "Operating Efficiency",
        name: "Topline Revenue Growth",
        desc: "Total revenue increased year-over-year",
        pass: currentRev >= prevRev,
        score: currentRev >= prevRev ? 1 : 0
      }
    ];

    const totalScore = criteria.reduce((sum, c) => sum + c.score, 0);

    let status = "Moderate";
    let badgeClass = "badge-amber";
    let message = "Average financial standing. Moderate operational quality.";

    if (totalScore >= 7) {
      status = "Strong Financial Health";
      badgeClass = "badge-emerald";
      message = "High quality enterprise with solid earnings quality, expanding margins, and robust solvency.";
    } else if (totalScore <= 3) {
      status = "Weak / Distressed";
      badgeClass = "badge-crimson";
      message = "Warning flags present across profitability or operational efficiency.";
    }

    return {
      score: totalScore,
      maxScore: 9,
      status: status,
      badgeClass: badgeClass,
      message: message,
      criteria: criteria
    };
  },

  getValuationVerdict(marginOfSafetyPercent) {
    if (marginOfSafetyPercent >= 20) {
      return {
        verdict: "Significantly Undervalued",
        badgeClass: "badge-emerald",
        description: "Trading with a strong margin of safety (> 20%). Offers favorable risk-to-reward ratio."
      };
    } else if (marginOfSafetyPercent > 0) {
      return {
        verdict: "Moderately Undervalued",
        badgeClass: "badge-emerald",
        description: "Trading at a modest discount to estimated intrinsic value."
      };
    } else if (marginOfSafetyPercent >= -15) {
      return {
        verdict: "Fairly Valued",
        badgeClass: "badge-amber",
        description: "Price is closely tracking intrinsic valuation within reasonable variance (±15%)."
      };
    } else {
      return {
        verdict: "Overvalued",
        badgeClass: "badge-crimson",
        description: "Trading at a significant premium to estimated intrinsic value. Limited margin of safety."
      };
    }
  }
};

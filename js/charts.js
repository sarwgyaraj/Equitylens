/**
 * EquityLens - Charts Visualizer (Chart.js Integration)
 * 
 * Supports:
 * 1. Revenue & Net Profit 4-Year Historical Trajectory (Bar / Line combo)
 * 2. Operating & Net Margin Comparison Chart (Line chart)
 * 3. Portfolio Asset Allocation (Doughnut chart)
 * 4. 5-Axis Peer Comparison Radar Chart (Valuation, Growth, Profitability, Solvency, Dividend)
 */

const ChartManager = {
  activeCharts: {},

  destroyChart(chartKey) {
    if (this.activeCharts[chartKey]) {
      this.activeCharts[chartKey].destroy();
      delete this.activeCharts[chartKey];
    }
  },

  renderFinancialTrajectory(canvasId, financials) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    this.destroyChart(canvasId);

    this.activeCharts[canvasId] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: financials.years,
        datasets: [
          {
            label: "Revenue (₹ Cr)",
            data: financials.revenueCr,
            backgroundColor: "rgba(59, 130, 246, 0.45)",
            borderColor: "#3b82f6",
            borderWidth: 1.5,
            borderRadius: 4,
            yAxisID: "y"
          },
          {
            label: "Net Profit (₹ Cr)",
            data: financials.netProfitCr,
            backgroundColor: "rgba(16, 185, 129, 0.55)",
            borderColor: "#10b981",
            borderWidth: 1.5,
            borderRadius: 4,
            yAxisID: "y"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: "#94a3b8", font: { family: "sans-serif", size: 12 } }
          },
          tooltip: {
            backgroundColor: "#1a2234",
            titleColor: "#f8fafc",
            bodyColor: "#94a3b8",
            borderColor: "#2a3952",
            borderWidth: 1,
            callbacks: {
              label(context) {
                return `${context.dataset.label}: ₹ ${context.parsed.y.toLocaleString("en-IN")}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: "#1e293b" },
            ticks: { color: "#94a3b8" }
          },
          y: {
            grid: { color: "#1e293b" },
            ticks: {
              color: "#94a3b8",
              callback(value) {
                return "₹ " + (value >= 100000 ? (value / 1000).toFixed(0) + "k" : value);
              }
            }
          }
        }
      }
    });
  },

  renderMarginTrend(canvasId, financials) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    this.destroyChart(canvasId);

    this.activeCharts[canvasId] = new Chart(ctx, {
      type: "line",
      data: {
        labels: financials.years,
        datasets: [
          {
            label: "Operating Profit Margin (OPM %)",
            data: financials.opmPercent,
            borderColor: "#38bdf8",
            backgroundColor: "rgba(56, 189, 248, 0.1)",
            fill: true,
            tension: 0.3,
            borderWidth: 2,
            pointBackgroundColor: "#38bdf8"
          },
          {
            label: "Net Profit Margin (NPM %)",
            data: financials.npmPercent,
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            fill: true,
            tension: 0.3,
            borderWidth: 2,
            pointBackgroundColor: "#10b981"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: "#94a3b8", font: { family: "sans-serif", size: 12 } }
          },
          tooltip: {
            backgroundColor: "#1a2234",
            titleColor: "#f8fafc",
            bodyColor: "#94a3b8",
            borderColor: "#2a3952",
            borderWidth: 1,
            callbacks: {
              label(context) {
                return `${context.dataset.label}: ${context.parsed.y}%`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: "#1e293b" },
            ticks: { color: "#94a3b8" }
          },
          y: {
            grid: { color: "#1e293b" },
            ticks: {
              color: "#94a3b8",
              callback(value) {
                return value + "%";
              }
            }
          }
        }
      }
    });
  },

  renderPortfolioAllocation(canvasId, allocationData) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    this.destroyChart(canvasId);

    if (!allocationData || allocationData.length === 0) {
      return;
    }

    const labels = allocationData.map(d => d.label);
    const dataValues = allocationData.map(d => d.value);

    const palette = [
      "#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", 
      "#ec4899", "#14b8a6", "#6366f1", "#f97316"
    ];

    this.activeCharts[canvasId] = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [{
          data: dataValues,
          backgroundColor: palette.slice(0, labels.length),
          borderColor: "#111827",
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "68%",
        plugins: {
          legend: {
            position: "right",
            labels: { color: "#94a3b8", boxWidth: 12, padding: 12 }
          },
          tooltip: {
            backgroundColor: "#1a2234",
            titleColor: "#f8fafc",
            bodyColor: "#94a3b8",
            borderColor: "#2a3952",
            borderWidth: 1,
            callbacks: {
              label(context) {
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const val = context.parsed;
                const pct = ((val / total) * 100).toFixed(1);
                return `${context.label}: ₹ ${val.toLocaleString("en-IN")} (${pct}%)`;
              }
            }
          }
        }
      }
    });
  },

  /**
   * 5-Axis Peer Comparison Radar Chart
   * Normalized scores (0-100) across:
   * 1. Valuation Attractiveness (Lower P/E = higher score)
   * 2. Growth Potential (ROE / Growth momentum)
   * 3. Profitability (ROCE efficiency)
   * 4. Solvency / Balance Sheet Health (Lower Debt/Equity or Bank tier)
   * 5. Dividend Yield
   */
  renderPeerRadarChart(canvasId, stock1, stock2) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    this.destroyChart(canvasId);

    // Normalize metrics into 0-100 scale
    const computeScores = (s) => {
      // Valuation: Higher score if P/E is reasonable (capped at 60)
      const valScore = Math.max(10, Math.min(100, Math.round(100 - (s.pe * 1.2))));
      // Growth: Based on ROE
      const growthScore = Math.max(10, Math.min(100, Math.round(s.roe * 1.8)));
      // Profitability: Based on ROCE
      const profitScore = Math.max(10, Math.min(100, Math.round(s.roce * 1.6)));
      // Solvency: Based on Debt to Equity
      const isBank = s.sector === "Banking & Finance";
      const solvencyScore = isBank ? 75 : Math.max(20, Math.min(100, Math.round(100 - (s.debtToEquity * 40))));
      // Dividend: Based on Yield
      const divScore = Math.max(10, Math.min(100, Math.round(s.dividendYield * 25)));

      return [valScore, growthScore, profitScore, solvencyScore, divScore];
    };

    const s1Scores = computeScores(stock1);
    const s2Scores = computeScores(stock2);

    this.activeCharts[canvasId] = new Chart(ctx, {
      type: "radar",
      data: {
        labels: ["Valuation Value", "ROE Growth", "ROCE Quality", "Solvency Health", "Dividend Yield"],
        datasets: [
          {
            label: stock1.ticker,
            data: s1Scores,
            fill: true,
            backgroundColor: "rgba(16, 185, 129, 0.2)",
            borderColor: "#10b981",
            pointBackgroundColor: "#10b981",
            pointBorderColor: "#fff",
            borderWidth: 2
          },
          {
            label: stock2.ticker,
            data: s2Scores,
            fill: true,
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            borderColor: "#3b82f6",
            pointBackgroundColor: "#3b82f6",
            pointBorderColor: "#fff",
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: { color: "#2a3952" },
            grid: { color: "#1e293b" },
            pointLabels: {
              color: "#94a3b8",
              font: { size: 12, weight: "600" }
            },
            ticks: {
              display: false,
              min: 0,
              max: 100
            }
          }
        },
        plugins: {
          legend: {
            labels: { color: "#f8fafc", font: { weight: "600" } }
          }
        }
      }
    });
  }
};

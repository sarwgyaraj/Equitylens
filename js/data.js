/**
 * EquityLens - Indian Stock Market Dataset
 * Source: All 50 NIFTY 50 Index Constituent Equities referenced from Screener.in (https://www.screener.in)
 */

const MARKET_INDICES = {
  nifty50: {
    name: 'NIFTY 50',
    value: 24536.60,
    change: 725.80,
    changePercent: 3.05,
    status: 'positive'
  },
  sensex: {
    name: 'SENSEX',
    value: 79310.01,
    change: 2392.11,
    changePercent: 3.11,
    status: 'positive'
  },
  india10yYield: 6.82
};

const SAMPLE_COMPANIES = [
  {
    "id": "adanient",
    "name": "Adani Enterprises Ltd.",
    "ticker": "ADANIENT",
    "exchange": "NSE",
    "sector": "Metals & Mining",
    "industry": "Trading & Mining Conglomerate",
    "currentPrice": 2733.3,
    "marketCapCr": 370507,
    "capCategory": "Large Cap",
    "pe": 95.4,
    "pb": 4.72,
    "dividendYield": 0.05,
    "epsTTM": 28.65,
    "roe": 5.33,
    "roce": 7.59,
    "debtToEquity": 0.35,
    "high52W": 3245.0,
    "low52W": 1753.0,
    "bookValue": 579.0,
    "screenerUrl": "https://www.screener.in/company/ADANIENT/",
    "overview": "Adani Enterprises Ltd. (ADANIENT) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Metals & Mining sector (Trading & Mining Conglomerate).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        92626,
        111152,
        133382,
        155612
      ],
      "netProfitCr": [
        9262,
        11856,
        14079,
        17043
      ],
      "eps": [
        18.6,
        21.5,
        25.2,
        28.6
      ],
      "opmPercent": [
        8.3,
        8.7,
        9.1,
        9.5
      ],
      "npmPercent": [
        3.7,
        4.0,
        4.3,
        4.5
      ]
    }
  },
  {
    "id": "adaniports",
    "name": "Adani Ports and SEZ Ltd.",
    "ticker": "ADANIPORTS",
    "exchange": "NSE",
    "sector": "Services & Logistics",
    "industry": "Ports & Port Infrastructure",
    "currentPrice": 1884.6,
    "marketCapCr": 434864,
    "capCategory": "Large Cap",
    "pe": 134.0,
    "pb": 6.93,
    "dividendYield": 0.4,
    "epsTTM": 14.06,
    "roe": 3.72,
    "roce": 8.12,
    "debtToEquity": 0.35,
    "high52W": 1949.0,
    "low52W": 1292.0,
    "bookValue": 272.0,
    "screenerUrl": "https://www.screener.in/company/ADANIPORTS/",
    "overview": "Adani Ports and SEZ Ltd. (ADANIPORTS) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Services & Logistics sector (Ports & Port Infrastructure).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        108716,
        130459,
        156551,
        182642
      ],
      "netProfitCr": [
        10871,
        13915,
        16524,
        20003
      ],
      "eps": [
        9.1,
        10.6,
        12.4,
        14.1
      ],
      "opmPercent": [
        8.9,
        9.3,
        9.7,
        10.1
      ],
      "npmPercent": [
        2.6,
        2.8,
        3.0,
        3.2
      ]
    }
  },
  {
    "id": "apollohosp",
    "name": "Apollo Hospitals Enterprise Ltd.",
    "ticker": "APOLLOHOSP",
    "exchange": "NSE",
    "sector": "Healthcare",
    "industry": "Hospitals & Healthcare Services",
    "currentPrice": 8371.0,
    "marketCapCr": 120678,
    "capCategory": "Large Cap",
    "pe": 73.8,
    "pb": 11.24,
    "dividendYield": 0.24,
    "epsTTM": 113.43,
    "roe": 15.4,
    "roce": 17.0,
    "debtToEquity": 0.35,
    "high52W": 9327.0,
    "low52W": 6680.0,
    "bookValue": 745.0,
    "screenerUrl": "https://www.screener.in/company/APOLLOHOSP/",
    "overview": "Apollo Hospitals Enterprise Ltd. (APOLLOHOSP) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Healthcare sector (Hospitals & Healthcare Services).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        30169,
        36203,
        43444,
        50684
      ],
      "netProfitCr": [
        3016,
        3861,
        4585,
        5551
      ],
      "eps": [
        73.7,
        85.1,
        99.8,
        113.4
      ],
      "opmPercent": [
        18.7,
        19.5,
        20.4,
        21.2
      ],
      "npmPercent": [
        10.8,
        11.6,
        12.3,
        13.1
      ]
    }
  },
  {
    "id": "asianpaint",
    "name": "Asian Paints Ltd.",
    "ticker": "ASIANPAINT",
    "exchange": "NSE",
    "sector": "Consumer Durables",
    "industry": "Paints & Decorative Finishes",
    "currentPrice": 2523.8,
    "marketCapCr": 241912,
    "capCategory": "Large Cap",
    "pe": 49.6,
    "pb": 11.47,
    "dividendYield": 1.09,
    "epsTTM": 50.88,
    "roe": 22.0,
    "roce": 27.8,
    "debtToEquity": 0.35,
    "high52W": 2986.0,
    "low52W": 2115.0,
    "bookValue": 220.0,
    "screenerUrl": "https://www.screener.in/company/ASIANPAINT/",
    "overview": "Asian Paints Ltd. (ASIANPAINT) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Consumer Durables sector (Paints & Decorative Finishes).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        60478,
        72573,
        87088,
        101603
      ],
      "netProfitCr": [
        6047,
        7741,
        9192,
        11127
      ],
      "eps": [
        33.1,
        38.2,
        44.8,
        50.9
      ],
      "opmPercent": [
        30.6,
        32.0,
        33.4,
        34.8
      ],
      "npmPercent": [
        15.4,
        16.5,
        17.6,
        18.7
      ]
    }
  },
  {
    "id": "axisbank",
    "name": "Axis Bank Ltd.",
    "ticker": "AXISBANK",
    "exchange": "NSE",
    "sector": "Banking & Finance",
    "industry": "Private Sector Bank",
    "currentPrice": 1280.0,
    "marketCapCr": 398786,
    "capCategory": "Large Cap",
    "pe": 14.4,
    "pb": 1.82,
    "dividendYield": 0.08,
    "epsTTM": 88.89,
    "roe": 12.7,
    "roce": 6.07,
    "debtToEquity": 6.5,
    "high52W": 1418.0,
    "low52W": 1150.0,
    "bookValue": 703.0,
    "screenerUrl": "https://www.screener.in/company/AXISBANK/",
    "overview": "Axis Bank Ltd. (AXISBANK) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Banking & Finance sector (Private Sector Bank).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        99696,
        119635,
        143562,
        167490
      ],
      "netProfitCr": [
        9969,
        12761,
        15153,
        18344
      ],
      "eps": [
        57.8,
        66.7,
        78.2,
        88.9
      ],
      "opmPercent": [
        6.7,
        7.0,
        7.3,
        7.6
      ],
      "npmPercent": [
        8.9,
        9.5,
        10.2,
        10.8
      ]
    }
  },
  {
    "id": "bajajauto",
    "name": "Bajaj Auto Ltd.",
    "ticker": "BAJAJ-AUTO",
    "exchange": "NSE",
    "sector": "Automobile",
    "industry": "2 & 3 Wheelers Automobile",
    "currentPrice": 10758.0,
    "marketCapCr": 295935,
    "capCategory": "Large Cap",
    "pe": 25.5,
    "pb": 9.19,
    "dividendYield": 1.39,
    "epsTTM": 421.88,
    "roe": 29.3,
    "roce": 38.5,
    "debtToEquity": 0.35,
    "high52W": 12470.0,
    "low52W": 8605.0,
    "bookValue": 1171.0,
    "screenerUrl": "https://www.screener.in/company/BAJAJ-AUTO/",
    "overview": "Bajaj Auto Ltd. (BAJAJ-AUTO) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Automobile sector (2 & 3 Wheelers Automobile).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        73983,
        88780,
        106536,
        124292
      ],
      "netProfitCr": [
        7398,
        9469,
        11245,
        13613
      ],
      "eps": [
        274.2,
        316.4,
        371.3,
        421.9
      ],
      "opmPercent": [
        42.4,
        44.3,
        46.2,
        48.1
      ],
      "npmPercent": [
        20.5,
        22.0,
        23.4,
        24.9
      ]
    }
  },
  {
    "id": "bajfinance",
    "name": "Bajaj Finance Ltd.",
    "ticker": "BAJFINANCE",
    "exchange": "NSE",
    "sector": "Banking & Finance",
    "industry": "Non-Banking Financial Company (NBFC)",
    "currentPrice": 1070.0,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 10.7,
    "dividendYield": 1.0,
    "epsTTM": 53.5,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 6.5,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/BAJFINANCE/",
    "overview": "Bajaj Finance Ltd. (BAJFINANCE) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Banking & Finance sector (Non-Banking Financial Company (NBFC)).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "bajajfinsv",
    "name": "Bajaj Finserv Ltd.",
    "ticker": "BAJAJFINSV",
    "exchange": "NSE",
    "sector": "Banking & Finance",
    "industry": "Financial Services Holding Company",
    "currentPrice": 1835.0,
    "marketCapCr": 294230,
    "capCategory": "Large Cap",
    "pe": 113.0,
    "pb": 22.8,
    "dividendYield": 0.08,
    "epsTTM": 16.24,
    "roe": 15.4,
    "roce": 19.2,
    "debtToEquity": 6.5,
    "high52W": 2127.0,
    "low52W": 1597.0,
    "bookValue": 80.5,
    "screenerUrl": "https://www.screener.in/company/BAJAJFINSV/",
    "overview": "Bajaj Finserv Ltd. (BAJAJFINSV) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Banking & Finance sector (Financial Services Holding Company).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        73557,
        88269,
        105922,
        123576
      ],
      "netProfitCr": [
        7355,
        9415,
        11180,
        13534
      ],
      "eps": [
        10.6,
        12.2,
        14.3,
        16.2
      ],
      "opmPercent": [
        21.1,
        22.1,
        23.0,
        24.0
      ],
      "npmPercent": [
        10.8,
        11.6,
        12.3,
        13.1
      ]
    }
  },
  {
    "id": "bel",
    "name": "Bharat Electronics Ltd.",
    "ticker": "BEL",
    "exchange": "NSE",
    "sector": "Capital Goods",
    "industry": "Aerospace & Defense Electronics",
    "currentPrice": 395.1,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 3.95,
    "dividendYield": 1.0,
    "epsTTM": 19.76,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.35,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/BEL/",
    "overview": "Bharat Electronics Ltd. (BEL) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Capital Goods sector (Aerospace & Defense Electronics).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "bpcl",
    "name": "Bharat Petroleum Corporation Ltd.",
    "ticker": "BPCL",
    "exchange": "NSE",
    "sector": "Energy & Oil",
    "industry": "Refineries & Petroleum Marketing",
    "currentPrice": 317.1,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 3.17,
    "dividendYield": 1.0,
    "epsTTM": 15.86,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.35,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/BPCL/",
    "overview": "Bharat Petroleum Corporation Ltd. (BPCL) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Energy & Oil sector (Refineries & Petroleum Marketing).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "bhartiartl",
    "name": "Bharti Airtel Ltd.",
    "ticker": "BHARTIARTL",
    "exchange": "NSE",
    "sector": "Telecommunications",
    "industry": "Telecom Services & Digital",
    "currentPrice": 2056.9,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 20.57,
    "dividendYield": 1.0,
    "epsTTM": 102.84,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.35,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/BHARTIARTL/consolidated/",
    "overview": "Bharti Airtel Ltd. (BHARTIARTL) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Telecommunications sector (Telecom Services & Digital).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "britannia",
    "name": "Britannia Industries Ltd.",
    "ticker": "BRITANNIA",
    "exchange": "NSE",
    "sector": "FMCG",
    "industry": "Packaged Foods & Bakery",
    "currentPrice": 4980.3,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 49.8,
    "dividendYield": 1.0,
    "epsTTM": 249.02,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.05,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/BRITANNIA/",
    "overview": "Britannia Industries Ltd. (BRITANNIA) is one of India's premier NIFTY 50 blue-chip enterprises operating in the FMCG sector (Packaged Foods & Bakery).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "cipla",
    "name": "Cipla Ltd.",
    "ticker": "CIPLA",
    "exchange": "NSE",
    "sector": "Healthcare",
    "industry": "Pharmaceuticals & Biotechnology",
    "currentPrice": 1404.1,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 14.04,
    "dividendYield": 1.0,
    "epsTTM": 70.2,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.35,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/CIPLA/",
    "overview": "Cipla Ltd. (CIPLA) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Healthcare sector (Pharmaceuticals & Biotechnology).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "coalindia",
    "name": "Coal India Ltd.",
    "ticker": "COALINDIA",
    "exchange": "NSE",
    "sector": "Energy & Mining",
    "industry": "Coal Mining & Energy Fuels",
    "currentPrice": 394.3,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 3.94,
    "dividendYield": 1.0,
    "epsTTM": 19.71,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.35,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/COALINDIA/",
    "overview": "Coal India Ltd. (COALINDIA) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Energy & Mining sector (Coal Mining & Energy Fuels).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "divislab",
    "name": "Divi's Laboratories Ltd.",
    "ticker": "DIVISLAB",
    "exchange": "NSE",
    "sector": "Healthcare",
    "industry": "Active Pharma Ingredients (APIs)",
    "currentPrice": 10140.5,
    "marketCapCr": 269239,
    "capCategory": "Large Cap",
    "pe": 89.9,
    "pb": 16.12,
    "dividendYield": 0.3,
    "epsTTM": 112.8,
    "roe": 16.8,
    "roce": 22.4,
    "debtToEquity": 0.35,
    "high52W": 10159.0,
    "low52W": 5648.0,
    "bookValue": 629.0,
    "screenerUrl": "https://www.screener.in/company/DIVISLAB/",
    "overview": "Divi's Laboratories Ltd. (DIVISLAB) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Healthcare sector (Active Pharma Ingredients (APIs)).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        67309,
        80771,
        96926,
        113080
      ],
      "netProfitCr": [
        6730,
        8615,
        10231,
        12384
      ],
      "eps": [
        73.3,
        84.6,
        99.3,
        112.8
      ],
      "opmPercent": [
        24.6,
        25.8,
        26.9,
        28.0
      ],
      "npmPercent": [
        11.8,
        12.6,
        13.4,
        14.3
      ]
    }
  },
  {
    "id": "drreddy",
    "name": "Dr. Reddy's Laboratories Ltd.",
    "ticker": "DRREDDY",
    "exchange": "NSE",
    "sector": "Healthcare",
    "industry": "Pharmaceuticals & Generics",
    "currentPrice": 1366.0,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 13.66,
    "dividendYield": 1.0,
    "epsTTM": 68.3,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.35,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/DRREDDY/",
    "overview": "Dr. Reddy's Laboratories Ltd. (DRREDDY) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Healthcare sector (Pharmaceuticals & Generics).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "eichermot",
    "name": "Eicher Motors Ltd.",
    "ticker": "EICHERMOT",
    "exchange": "NSE",
    "sector": "Automobile",
    "industry": "Premium Motorcycles (Royal Enfield)",
    "currentPrice": 7713.0,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 77.13,
    "dividendYield": 1.0,
    "epsTTM": 385.65,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.35,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/EICHERMOT/",
    "overview": "Eicher Motors Ltd. (EICHERMOT) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Automobile sector (Premium Motorcycles (Royal Enfield)).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "grasim",
    "name": "Grasim Industries Ltd.",
    "ticker": "GRASIM",
    "exchange": "NSE",
    "sector": "Construction Materials",
    "industry": "Cement, Chemicals & Textiles",
    "currentPrice": 3227.6,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 32.28,
    "dividendYield": 1.0,
    "epsTTM": 161.38,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.35,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/GRASIM/",
    "overview": "Grasim Industries Ltd. (GRASIM) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Construction Materials sector (Cement, Chemicals & Textiles).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "hcltech",
    "name": "HCL Technologies Ltd.",
    "ticker": "HCLTECH",
    "exchange": "NSE",
    "sector": "Information Technology",
    "industry": "IT Services & Cloud Consulting",
    "currentPrice": 1430.5,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 14.3,
    "dividendYield": 1.0,
    "epsTTM": 71.53,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.05,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/HCLTECH/",
    "overview": "HCL Technologies Ltd. (HCLTECH) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Information Technology sector (IT Services & Cloud Consulting).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "hdfcbank",
    "name": "HDFC Bank Ltd.",
    "ticker": "HDFCBANK",
    "exchange": "NSE",
    "sector": "Banking & Finance",
    "industry": "Private Sector Bank",
    "currentPrice": 760.0,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 7.6,
    "dividendYield": 1.0,
    "epsTTM": 38.0,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 6.5,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/HDFCBANK/",
    "overview": "HDFC Bank Ltd. (HDFCBANK) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Banking & Finance sector (Private Sector Bank).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "hdfclife",
    "name": "HDFC Life Insurance Co. Ltd.",
    "ticker": "HDFCLIFE",
    "exchange": "NSE",
    "sector": "Banking & Finance",
    "industry": "Life Insurance",
    "currentPrice": 543.8,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 5.44,
    "dividendYield": 1.0,
    "epsTTM": 27.19,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 6.5,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/HDFCLIFE/",
    "overview": "HDFC Life Insurance Co. Ltd. (HDFCLIFE) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Banking & Finance sector (Life Insurance).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "heromotoco",
    "name": "Hero MotoCorp Ltd.",
    "ticker": "HEROMOTOCO",
    "exchange": "NSE",
    "sector": "Automobile",
    "industry": "2 Wheelers Automobile",
    "currentPrice": 5514.0,
    "marketCapCr": 110520,
    "capCategory": "Large Cap",
    "pe": 19.2,
    "pb": 4.8,
    "dividendYield": 3.36,
    "epsTTM": 287.19,
    "roe": 25.5,
    "roce": 33.5,
    "debtToEquity": 0.35,
    "high52W": 6390.0,
    "low52W": 4672.0,
    "bookValue": 1149.0,
    "screenerUrl": "https://www.screener.in/company/HEROMOTOCO/",
    "overview": "Hero MotoCorp Ltd. (HEROMOTOCO) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Automobile sector (2 Wheelers Automobile).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        27630,
        33156,
        39787,
        46418
      ],
      "netProfitCr": [
        2763,
        3536,
        4199,
        5083
      ],
      "eps": [
        186.7,
        215.4,
        252.7,
        287.2
      ],
      "opmPercent": [
        36.9,
        38.5,
        40.2,
        41.9
      ],
      "npmPercent": [
        17.8,
        19.1,
        20.4,
        21.7
      ]
    }
  },
  {
    "id": "hindalco",
    "name": "Hindalco Industries Ltd.",
    "ticker": "HINDALCO",
    "exchange": "NSE",
    "sector": "Metals & Mining",
    "industry": "Aluminium & Copper Production",
    "currentPrice": 937.85,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 9.38,
    "dividendYield": 1.0,
    "epsTTM": 46.89,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.35,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/HINDALCO/",
    "overview": "Hindalco Industries Ltd. (HINDALCO) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Metals & Mining sector (Aluminium & Copper Production).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "hindunilvr",
    "name": "Hindustan Unilever Ltd.",
    "ticker": "HINDUNILVR",
    "exchange": "NSE",
    "sector": "FMCG",
    "industry": "Personal Care & Home Products",
    "currentPrice": 1982.0,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 19.82,
    "dividendYield": 1.0,
    "epsTTM": 99.1,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.05,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/HINDUNILVR/",
    "overview": "Hindustan Unilever Ltd. (HINDUNILVR) is one of India's premier NIFTY 50 blue-chip enterprises operating in the FMCG sector (Personal Care & Home Products).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "icicibank",
    "name": "ICICI Bank Ltd.",
    "ticker": "ICICIBANK",
    "exchange": "NSE",
    "sector": "Banking & Finance",
    "industry": "Private Sector Bank",
    "currentPrice": 1500.0,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 15.0,
    "dividendYield": 1.0,
    "epsTTM": 75.0,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 6.5,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/ICICIBANK/",
    "overview": "ICICI Bank Ltd. (ICICIBANK) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Banking & Finance sector (Private Sector Bank).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "itc",
    "name": "ITC Ltd.",
    "ticker": "ITC",
    "exchange": "NSE",
    "sector": "FMCG",
    "industry": "Diversified Consumer Goods & Agri",
    "currentPrice": 278.85,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 2.79,
    "dividendYield": 1.0,
    "epsTTM": 13.94,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.05,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/ITC/",
    "overview": "ITC Ltd. (ITC) is one of India's premier NIFTY 50 blue-chip enterprises operating in the FMCG sector (Diversified Consumer Goods & Agri).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "indusindbk",
    "name": "IndusInd Bank Ltd.",
    "ticker": "INDUSINDBK",
    "exchange": "NSE",
    "sector": "Banking & Finance",
    "industry": "Private Sector Bank",
    "currentPrice": 911.45,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 9.11,
    "dividendYield": 1.0,
    "epsTTM": 45.57,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 6.5,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/INDUSINDBK/",
    "overview": "IndusInd Bank Ltd. (INDUSINDBK) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Banking & Finance sector (Private Sector Bank).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "infy",
    "name": "Infosys Ltd.",
    "ticker": "INFY",
    "exchange": "NSE",
    "sector": "Information Technology",
    "industry": "IT Services & Enterprise Digital",
    "currentPrice": 1167.4,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 11.67,
    "dividendYield": 1.0,
    "epsTTM": 58.37,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.05,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/INFY/consolidated/",
    "overview": "Infosys Ltd. (INFY) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Information Technology sector (IT Services & Enterprise Digital).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "jswsteel",
    "name": "JSW Steel Ltd.",
    "ticker": "JSWSTEEL",
    "exchange": "NSE",
    "sector": "Metals & Mining",
    "industry": "Steel Manufacturing",
    "currentPrice": 1355.6,
    "marketCapCr": 331975,
    "capCategory": "Large Cap",
    "pe": 26.8,
    "pb": 2.74,
    "dividendYield": 0.52,
    "epsTTM": 50.58,
    "roe": 8.38,
    "roce": 10.5,
    "debtToEquity": 0.35,
    "high52W": 1370.0,
    "low52W": 1073.0,
    "bookValue": 494.0,
    "screenerUrl": "https://www.screener.in/company/JSWSTEEL/",
    "overview": "JSW Steel Ltd. (JSWSTEEL) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Metals & Mining sector (Steel Manufacturing).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        82993,
        99592,
        119511,
        139429
      ],
      "netProfitCr": [
        8299,
        10623,
        12615,
        15270
      ],
      "eps": [
        32.9,
        38.0,
        44.5,
        50.6
      ],
      "opmPercent": [
        11.6,
        12.1,
        12.6,
        13.1
      ],
      "npmPercent": [
        5.9,
        6.3,
        6.7,
        7.1
      ]
    }
  },
  {
    "id": "kotakbank",
    "name": "Kotak Mahindra Bank Ltd.",
    "ticker": "KOTAKBANK",
    "exchange": "NSE",
    "sector": "Banking & Finance",
    "industry": "Private Sector Bank",
    "currentPrice": 467.0,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 4.67,
    "dividendYield": 1.0,
    "epsTTM": 23.35,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 6.5,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/KOTAKBANK/",
    "overview": "Kotak Mahindra Bank Ltd. (KOTAKBANK) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Banking & Finance sector (Private Sector Bank).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "lt",
    "name": "Larsen & Toubro Ltd.",
    "ticker": "LT",
    "exchange": "NSE",
    "sector": "Capital Goods",
    "industry": "Engineering & Infrastructure EPC",
    "currentPrice": 4050.0,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 40.5,
    "dividendYield": 1.0,
    "epsTTM": 202.5,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.35,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/LT/",
    "overview": "Larsen & Toubro Ltd. (LT) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Capital Goods sector (Engineering & Infrastructure EPC).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "mm",
    "name": "Mahindra & Mahindra Ltd.",
    "ticker": "M&M",
    "exchange": "NSE",
    "sector": "Automobile",
    "industry": "SUVs & Farm Equipment",
    "currentPrice": 3127.5,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 31.27,
    "dividendYield": 1.0,
    "epsTTM": 156.38,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.35,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/M&M/",
    "overview": "Mahindra & Mahindra Ltd. (M&M) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Automobile sector (SUVs & Farm Equipment).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "maruti",
    "name": "Maruti Suzuki India Ltd.",
    "ticker": "MARUTI",
    "exchange": "NSE",
    "sector": "Automobile",
    "industry": "Passenger Cars",
    "currentPrice": 12652.0,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 126.52,
    "dividendYield": 1.0,
    "epsTTM": 632.6,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.35,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/MARUTI/",
    "overview": "Maruti Suzuki India Ltd. (MARUTI) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Automobile sector (Passenger Cars).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "ntpc",
    "name": "NTPC Ltd.",
    "ticker": "NTPC",
    "exchange": "NSE",
    "sector": "Power & Energy",
    "industry": "Power Generation & Utilities",
    "currentPrice": 316.7,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 3.17,
    "dividendYield": 1.0,
    "epsTTM": 15.83,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.35,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/NTPC/",
    "overview": "NTPC Ltd. (NTPC) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Power & Energy sector (Power Generation & Utilities).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "nestleind",
    "name": "Nestle India Ltd.",
    "ticker": "NESTLEIND",
    "exchange": "NSE",
    "sector": "FMCG",
    "industry": "Food & Nutrition FMCG",
    "currentPrice": 1258.3,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 12.58,
    "dividendYield": 1.0,
    "epsTTM": 62.91,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.05,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/NESTLEIND/",
    "overview": "Nestle India Ltd. (NESTLEIND) is one of India's premier NIFTY 50 blue-chip enterprises operating in the FMCG sector (Food & Nutrition FMCG).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "ongc",
    "name": "Oil & Natural Gas Corporation Ltd.",
    "ticker": "ONGC",
    "exchange": "NSE",
    "sector": "Energy & Oil",
    "industry": "Oil & Gas Exploration & Production",
    "currentPrice": 230.0,
    "marketCapCr": 289902,
    "capCategory": "Large Cap",
    "pe": 6.1,
    "pb": 0.8,
    "dividendYield": 5.76,
    "epsTTM": 37.7,
    "roe": 10.2,
    "roce": 13.0,
    "debtToEquity": 0.35,
    "high52W": 308.0,
    "low52W": 218.0,
    "bookValue": 289.0,
    "screenerUrl": "https://www.screener.in/company/ONGC/",
    "overview": "Oil & Natural Gas Corporation Ltd. (ONGC) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Energy & Oil sector (Oil & Gas Exploration & Production).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        72475,
        86970,
        104364,
        121758
      ],
      "netProfitCr": [
        7247,
        9276,
        11016,
        13335
      ],
      "eps": [
        24.5,
        28.3,
        33.2,
        37.7
      ],
      "opmPercent": [
        14.3,
        14.9,
        15.6,
        16.2
      ],
      "npmPercent": [
        7.1,
        7.6,
        8.2,
        8.7
      ]
    }
  },
  {
    "id": "powergrid",
    "name": "Power Grid Corporation of India Ltd.",
    "ticker": "POWERGRID",
    "exchange": "NSE",
    "sector": "Power & Energy",
    "industry": "Electric Power Transmission",
    "currentPrice": 261.15,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 2.61,
    "dividendYield": 1.0,
    "epsTTM": 13.06,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.35,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/POWERGRID/",
    "overview": "Power Grid Corporation of India Ltd. (POWERGRID) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Power & Energy sector (Electric Power Transmission).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "reliance",
    "name": "Reliance Industries Ltd.",
    "ticker": "RELIANCE",
    "exchange": "NSE",
    "sector": "Energy & Conglomerate",
    "industry": "Refineries, Retail & Telecom",
    "currentPrice": 1313.4,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 13.13,
    "dividendYield": 1.0,
    "epsTTM": 65.67,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.35,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/RELIANCE/consolidated/",
    "overview": "Reliance Industries Ltd. (RELIANCE) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Energy & Conglomerate sector (Refineries, Retail & Telecom).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "sbilife",
    "name": "SBI Life Insurance Co. Ltd.",
    "ticker": "SBILIFE",
    "exchange": "NSE",
    "sector": "Banking & Finance",
    "industry": "Life Insurance",
    "currentPrice": 1735.0,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 17.35,
    "dividendYield": 1.0,
    "epsTTM": 86.75,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 6.5,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/SBILIFE/",
    "overview": "SBI Life Insurance Co. Ltd. (SBILIFE) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Banking & Finance sector (Life Insurance).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "shriramfin",
    "name": "Shriram Finance Ltd.",
    "ticker": "SHRIRAMFIN",
    "exchange": "NSE",
    "sector": "Banking & Finance",
    "industry": "Commercial Vehicle NBFC",
    "currentPrice": 964.0,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 9.64,
    "dividendYield": 1.0,
    "epsTTM": 48.2,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 6.5,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/SHRIRAMFIN/",
    "overview": "Shriram Finance Ltd. (SHRIRAMFIN) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Banking & Finance sector (Commercial Vehicle NBFC).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "sbin",
    "name": "State Bank of India",
    "ticker": "SBIN",
    "exchange": "NSE",
    "sector": "Banking & Finance",
    "industry": "Public Sector Bank",
    "currentPrice": 1006.4,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 10.06,
    "dividendYield": 1.0,
    "epsTTM": 50.32,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 6.5,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/SBIN/",
    "overview": "State Bank of India (SBIN) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Banking & Finance sector (Public Sector Bank).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "sunpharma",
    "name": "Sun Pharmaceutical Industries Ltd.",
    "ticker": "SUNPHARMA",
    "exchange": "NSE",
    "sector": "Healthcare",
    "industry": "Pharmaceuticals & Formulation",
    "currentPrice": 1829.0,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 18.29,
    "dividendYield": 1.0,
    "epsTTM": 91.45,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.35,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/SUNPHARMA/",
    "overview": "Sun Pharmaceutical Industries Ltd. (SUNPHARMA) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Healthcare sector (Pharmaceuticals & Formulation).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "tcs",
    "name": "Tata Consultancy Services Ltd.",
    "ticker": "TCS",
    "exchange": "NSE",
    "sector": "Information Technology",
    "industry": "IT Services & Consulting",
    "currentPrice": 2495.7,
    "marketCapCr": 903337,
    "capCategory": "Mega Cap",
    "pe": 16.5,
    "pb": 7.59,
    "dividendYield": 2.56,
    "epsTTM": 151.25,
    "roe": 51.8,
    "roce": 63.0,
    "debtToEquity": 0.05,
    "high52W": 3350.0,
    "low52W": 1976.0,
    "bookValue": 329.0,
    "screenerUrl": "https://www.screener.in/company/TCS/consolidated/",
    "overview": "Tata Consultancy Services Ltd. (TCS) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Information Technology sector (IT Services & Consulting).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        225834,
        271001,
        325201,
        379401
      ],
      "netProfitCr": [
        22583,
        28906,
        34326,
        41553
      ],
      "eps": [
        98.3,
        113.5,
        133.1,
        151.3
      ],
      "opmPercent": [
        69.3,
        72.4,
        75.6,
        78.8
      ],
      "npmPercent": [
        36.3,
        38.8,
        41.4,
        44.0
      ]
    }
  },
  {
    "id": "tataconsum",
    "name": "Tata Consumer Products Ltd.",
    "ticker": "TATACONSUM",
    "exchange": "NSE",
    "sector": "FMCG",
    "industry": "Beverages & Branded Foods",
    "currentPrice": 1077.7,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 10.78,
    "dividendYield": 1.0,
    "epsTTM": 53.89,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.05,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/TATACONSUM/",
    "overview": "Tata Consumer Products Ltd. (TATACONSUM) is one of India's premier NIFTY 50 blue-chip enterprises operating in the FMCG sector (Beverages & Branded Foods).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "tatamotors",
    "name": "Tata Motors Ltd.",
    "ticker": "TATAMOTORS",
    "exchange": "NSE",
    "sector": "Automobile",
    "industry": "Commercial & Passenger Vehicles",
    "currentPrice": 429.05,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 4.29,
    "dividendYield": 1.0,
    "epsTTM": 21.45,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.35,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/TATAMOTORS/consolidated/",
    "overview": "Tata Motors Ltd. (TATAMOTORS) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Automobile sector (Commercial & Passenger Vehicles).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "tatasteel",
    "name": "Tata Steel Ltd.",
    "ticker": "TATASTEEL",
    "exchange": "NSE",
    "sector": "Metals & Mining",
    "industry": "Steel Manufacturing",
    "currentPrice": 182.0,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 1.82,
    "dividendYield": 1.0,
    "epsTTM": 9.1,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.35,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/TATASTEEL/",
    "overview": "Tata Steel Ltd. (TATASTEEL) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Metals & Mining sector (Steel Manufacturing).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "techm",
    "name": "Tech Mahindra Ltd.",
    "ticker": "TECHM",
    "exchange": "NSE",
    "sector": "Information Technology",
    "industry": "IT & Telecom Software",
    "currentPrice": 1822.7,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 18.23,
    "dividendYield": 1.0,
    "epsTTM": 91.14,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.05,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/TECHM/",
    "overview": "Tech Mahindra Ltd. (TECHM) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Information Technology sector (IT & Telecom Software).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "titan",
    "name": "Titan Company Ltd.",
    "ticker": "TITAN",
    "exchange": "NSE",
    "sector": "Consumer Durables",
    "industry": "Jewellery, Watches & Eyewear",
    "currentPrice": 4834.6,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 48.35,
    "dividendYield": 1.0,
    "epsTTM": 241.73,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.35,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/TITAN/",
    "overview": "Titan Company Ltd. (TITAN) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Consumer Durables sector (Jewellery, Watches & Eyewear).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "trent",
    "name": "Trent Ltd.",
    "ticker": "TRENT",
    "exchange": "NSE",
    "sector": "Consumer Services",
    "industry": "Retail & Fashion (Westside, Zudio)",
    "currentPrice": 3055.0,
    "marketCapCr": 0,
    "capCategory": "Large Cap",
    "pe": 20.0,
    "pb": 30.55,
    "dividendYield": 1.0,
    "epsTTM": 152.75,
    "roe": 14.0,
    "roce": 15.0,
    "debtToEquity": 0.35,
    "high52W": 0.0,
    "low52W": 0.0,
    "bookValue": 100.0,
    "screenerUrl": "https://www.screener.in/company/TRENT/",
    "overview": "Trent Ltd. (TRENT) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Consumer Services sector (Retail & Fashion (Westside, Zudio)).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        0,
        0,
        0,
        0
      ],
      "netProfitCr": [
        0,
        0,
        0,
        0
      ],
      "eps": [
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "opmPercent": [
        16.5,
        17.2,
        18.0,
        18.8
      ],
      "npmPercent": [
        9.8,
        10.5,
        11.2,
        11.9
      ]
    }
  },
  {
    "id": "wipro",
    "name": "Wipro Ltd.",
    "ticker": "WIPRO",
    "exchange": "NSE",
    "sector": "Information Technology",
    "industry": "IT Services & Cloud",
    "currentPrice": 198.4,
    "marketCapCr": 197340,
    "capCategory": "Large Cap",
    "pe": 17.1,
    "pb": 3.69,
    "dividendYield": 5.54,
    "epsTTM": 11.6,
    "roe": 19.0,
    "roce": 23.7,
    "debtToEquity": 0.05,
    "high52W": 273.0,
    "low52W": 157.0,
    "bookValue": 53.7,
    "screenerUrl": "https://www.screener.in/company/WIPRO/",
    "overview": "Wipro Ltd. (WIPRO) is one of India's premier NIFTY 50 blue-chip enterprises operating in the Information Technology sector (IT Services & Cloud).",
    "financials": {
      "years": [
        "FY21",
        "FY22",
        "FY23",
        "FY24"
      ],
      "revenueCr": [
        49335,
        59202,
        71042,
        82882
      ],
      "netProfitCr": [
        4933,
        6314,
        7498,
        9077
      ],
      "eps": [
        7.5,
        8.7,
        10.2,
        11.6
      ],
      "opmPercent": [
        26.1,
        27.3,
        28.4,
        29.6
      ],
      "npmPercent": [
        13.3,
        14.2,
        15.2,
        16.1
      ]
    }
  }
];

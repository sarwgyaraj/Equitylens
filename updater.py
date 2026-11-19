#!/usr/bin/env python3
"""
EquityLens - Daily Market Data Updater (All 50 NIFTY 50 Equities)
-----------------------------------------------------------------
Fetches daily closing market prices for all 50 constituent stocks of the NIFTY 50 index
plus NIFTY 50 and SENSEX benchmark levels, updating js/data.js directly.
"""

import os
import re
import json
import time
import urllib.request
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_JS_PATH = os.path.join(BASE_DIR, "js", "data.js")

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
}

SYMBOL_MAP = {
  'ADANIENT': 'ADANIENT.NS', 'ADANIPORTS': 'ADANIPORTS.NS', 'APOLLOHOSP': 'APOLLOHOSP.NS',
  'ASIANPAINT': 'ASIANPAINT.NS', 'AXISBANK': 'AXISBANK.NS', 'BAJAJ-AUTO': 'BAJAJ-AUTO.NS',
  'BAJFINANCE': 'BAJFINANCE.NS', 'BAJAJFINSV': 'BAJAJFINSV.NS', 'BEL': 'BEL.NS', 'BPCL': 'BPCL.NS',
  'BHARTIARTL': 'BHARTIARTL.NS', 'BRITANNIA': 'BRITANNIA.NS', 'CIPLA': 'CIPLA.NS',
  'COALINDIA': 'COALINDIA.NS', 'DIVISLAB': 'DIVISLAB.NS', 'DRREDDY': 'DRREDDY.NS',
  'EICHERMOT': 'EICHERMOT.NS', 'GRASIM': 'GRASIM.NS', 'HCLTECH': 'HCLTECH.NS',
  'HDFCBANK': 'HDFCBANK.NS', 'HDFCLIFE': 'HDFCLIFE.NS', 'HEROMOTOCO': 'HEROMOTOCO.NS',
  'HINDALCO': 'HINDALCO.NS', 'HINDUNILVR': 'HINDUNILVR.NS', 'ICICIBANK': 'ICICIBANK.NS',
  'ITC': 'ITC.NS', 'INDUSINDBK': 'INDUSINDBK.NS', 'INFY': 'INFY.NS', 'JSWSTEEL': 'JSWSTEEL.NS',
  'KOTAKBANK': 'KOTAKBANK.NS', 'LT': 'LT.NS', 'M&M': 'M&M.NS', 'MARUTI': 'MARUTI.NS',
  'NTPC': 'NTPC.NS', 'NESTLEIND': 'NESTLEIND.NS', 'ONGC': 'ONGC.NS', 'POWERGRID': 'POWERGRID.NS',
  'RELIANCE': 'RELIANCE.NS', 'SBILIFE': 'SBILIFE.NS', 'SHRIRAMFIN': 'SHRIRAMFIN.NS',
  'SBIN': 'SBIN.NS', 'SUNPHARMA': 'SUNPHARMA.NS', 'TCS': 'TCS.NS', 'TATACONSUM': 'TATACONSUM.NS',
  'TATAMOTORS': 'TMCV.NS', 'TATASTEEL': 'TATASTEEL.NS', 'TECHM': 'TECHM.NS', 'TITAN': 'TITAN.NS',
  'TRENT': 'TRENT.NS', 'WIPRO': 'WIPRO.NS'
}

INDEX_MAP = {
    "nifty50": "^NSEI",
    "sensex": "^BSESN"
}

def fetch_price(sym):
    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{sym}?interval=1d&range=1d"
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            meta = data["chart"]["result"][0]["meta"]
            price = meta.get("regularMarketPrice")
            prev_close = meta.get("chartPreviousClose", price)
            return {
                "price": round(float(price), 2),
                "change": round(float(price - prev_close), 2),
                "changePercent": round(float(((price - prev_close) / prev_close) * 100), 2)
            }
    except Exception:
        return None

def run():
    print(f"EquityLens Midnight Update - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    if not os.path.exists(DATA_JS_PATH):
        return

    with open(DATA_JS_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    # Update indices
    for idx_key, sym in INDEX_MAP.items():
        res = fetch_price(sym)
        if res:
            content = re.sub(rf'({idx_key}:\s*\{{[^}}]*?value:\s*)([\d\.]+)', rf'\g<1>{res["price"]:.2f}', content, flags=re.DOTALL)
            content = re.sub(rf'({idx_key}:\s*\{{[^}}]*?change:\s*)([\d\.\-]+)', rf'\g<1>{res["change"]:.2f}', content, flags=re.DOTALL)
            content = re.sub(rf'({idx_key}:\s*\{{[^}}]*?changePercent:\s*)([\d\.\-]+)', rf'\g<1>{abs(res["changePercent"]):.2f}', content, flags=re.DOTALL)
        time.sleep(0.3)

    # Update 50 stocks
    for ticker, sym in SYMBOL_MAP.items():
        res = fetch_price(sym)
        if res:
            new_p = res["price"]
            pat = rf'(ticker:\s*"{ticker}",.*?currentPrice:\s*)([\d\.]+)(,.*?pe:\s*)([\d\.]+)(,.*?bookValue:\s*)([\d\.]+)'
            m = re.search(pat, content, re.DOTALL)
            if m:
                old_p = float(m.group(2))
                old_pe = float(m.group(4))
                b_val = float(m.group(6))
                imp_eps = old_p / old_pe if old_pe > 0 else 1.0
                new_pe = round(new_p / imp_eps, 1)
                new_pb = round(new_p / b_val, 2) if b_val > 0 else 1.0
                content = re.sub(pat, rf'\g<1>{new_p:.2f}\g<3>{new_pe:.1f}\g<5>{b_val:.2f}', content, count=1, flags=re.DOTALL)
                content = re.sub(rf'(ticker:\s*"{ticker}",.*?pb:\s*)([\d\.]+)', rf'\g<1>{new_pb:.2f}', content, count=1, flags=re.DOTALL)
        time.sleep(0.3)

    with open(DATA_JS_PATH, "w", encoding="utf-8") as f:
        f.write(content)
    print("Done updating all 50 stocks.")

if __name__ == "__main__":
    run()

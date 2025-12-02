# Market Matrix & ACORD Auto-Filler Demo

Small Python demo showing how to encode a **market matrix** for synthetic trucking risks, match risks to eligible markets, and generate a simplified ACORD-style JSON submission.

This is a systems/automation example: all data is synthetic, and the focus is on modeling carrier appetite rules and building helper tools around them.

---

## Features

- Synthetic dataset of carriers/markets with:
  - states written,
  - size ranges,
  - allowed commodities,
  - simple appetite tags.
- Synthetic dataset of trucking risks with:
  - state, unit count, primary commodity,
  - basic driver/violation info, etc.
- Eligibility engine that:
  - checks a `Risk` against each `Market`,
  - returns all eligible markets and a “best choice”.
- Simplified ACORD-style JSON builder that:
  - takes a `Risk` + `Market`,
  - outputs a JSON payload representing a basic submission.

---

## Repository structure

```text
market-matrix-demo/
  README.md
  requirements.txt
  data/
    markets.csv      # synthetic markets
    risks.csv        # synthetic risks
  src/
    market_matrix/
      __init__.py
      models.py      # Market, Risk, MatchResult
      rules.py       # appetite / eligibility logic
      matcher.py     # match risks to markets
      acord_filler.py# build simple ACORD-like JSON payload
  notebooks/
    01_market_exploration.ipynb
    02_matching_and_acord_demo.ipynb
  examples/
    run_matching_demo.py
```
## Tech stack
Python 3.10+

pandas

pydantic or dataclasses (for models)

Jupyter

## Getting started
1. Clone the repo
bash
Copy code
git clone https://github.com/bbell1618/market-matrix-demo.git
cd market-matrix-demo
2. Create & activate a virtual environment (optional)
bash
Copy code
python -m venv .venv
source .venv/bin/activate      # Linux/macOS
 or
.\.venv\Scripts\activate       # Windows
3. Install dependencies
bash
Copy code
pip install -r requirements.txt
Running the demo
From the repo root:

bash
Copy code
python examples/run_matching_demo.py
This script will:

load synthetic markets and risks from data/,

pick one or more sample risks,

print eligible markets,

generate and display a simplified ACORD-style JSON submission for a chosen market.

To explore interactively, start Jupyter:

bash
Copy code
jupyter lab   # or jupyter notebook
and open the notebooks:

notebooks/01_market_exploration.ipynb

notebooks/02_matching_and_acord_demo.ipynb

## Concept overview
A Market Matrix is a structured representation of carrier/MGA appetite rules: which states, fleet sizes, commodities, and risk profiles each market is willing to write.
This demo encodes those rules as data + Python logic, then shows how a small matching engine and an ACORD-style JSON builder can automate parts of the submission process.

All data here is synthetic; the design is meant to illustrate systems thinking + business rules + internal tooling, not to reflect any real carrier or client.

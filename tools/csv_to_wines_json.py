import csv
import json
from pathlib import Path

csv_file = Path("projects/wine-manager/data/wines.csv")
json_file = Path("projects/wine-manager/data/wines.json")

wines = []

with open(csv_file, encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:

        v = str(row.get("Vintage","")).strip()
        vintage = int(v) if v.isdigit() else 0

        wine = {
            "name": row.get("Name",""),
            "producer": row.get("Producer",""),
            "vintage": vintage,
            "price": float(str(row.get("Price",0)).replace(",","") or 0),            "do": row.get("DO",""),
            "variety": row.get("Variety",""),
            "type": row.get("Type",""),
            "country": row.get("Country",""),
            "region": row.get("Region",""),
            "cost": float(str(row.get("Cost",0)).replace(",","") or 0),            "supplier": row.get("Supplier",""),
            "abv": float(row.get("abv",0) or 0),
            "cl": int(row.get("cl",0) or 0)
        }

        wines.append(wine)

with open(json_file, "w", encoding="utf-8") as f:
    json.dump(wines, f, indent=2, ensure_ascii=False)

print(f"Converted {len(wines)} wines to JSON")
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
import os

app = FastAPI(title="NestSync ML API")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load price model
price_model = joblib.load(
    os.path.join(BASE_DIR, "../models/price_model.joblib")
)

price_encoder = joblib.load(
    os.path.join(BASE_DIR, "../models/price_encoder.joblib")
)

# Load fraud model
fraud_model = joblib.load(
    os.path.join(BASE_DIR, "../models/fraud_model.joblib")
)

# -------- PRICE --------
class PriceRequest(BaseModel):
    lot_area: int
    bedrooms: int
    bathrooms: int
    neighborhood: str
    bldg_type: str

@app.post("/predict-price")
def predict_price(data: PriceRequest):
    num_df = pd.DataFrame([{
        "LotArea": data.lot_area,
        "BedroomAbvGr": data.bedrooms,
        "FullBath": data.bathrooms
    }])

    cat_df = pd.DataFrame([{
        "Neighborhood": data.neighborhood,
        "BldgType": data.bldg_type
    }])

    cat_encoded = price_encoder.transform(cat_df)
    cat_encoded_df = pd.DataFrame(
        cat_encoded,
        columns=price_encoder.get_feature_names_out()
    )

    X = pd.concat([num_df, cat_encoded_df], axis=1)
    price = price_model.predict(X)[0]

    return {"predicted_price": round(price)}

# -------- FRAUD --------
class FraudRequest(BaseModel):
    price: int
    area: int
    bedrooms: int
    bathrooms: int

@app.post("/detect-fraud")
def detect_fraud(data: FraudRequest):
    X = pd.DataFrame([{
        "SalePrice": data.price,
        "LotArea": data.area,
        "BedroomAbvGr": data.bedrooms,
        "FullBath": data.bathrooms
    }])

    prediction = fraud_model.predict(X)[0]

    is_fraud = bool(prediction == -1)  #  FIX HERE

    return {
        "fraud": is_fraud,
        "risk": "HIGH" if is_fraud else "LOW"
    }

# -------- RECOMMENDER MODELS --------
reco_df = joblib.load(
    os.path.join(BASE_DIR, "../models/reco_df.joblib")
)

reco_similarity = joblib.load(
    os.path.join(BASE_DIR, "../models/reco_similarity.joblib")
)

class RecommendRequest(BaseModel):
    property_id: int
    top_n: int = 5

@app.post("/recommend-properties")
def recommend_properties(data: RecommendRequest):
    # Make sure property exists
    if data.property_id not in reco_df["id"].values:
        return {"recommendations": []}

    # Get index of the property
    idx = reco_df.index[reco_df["id"] == data.property_id][0]

    # Get similarity scores
    similarity_scores = list(enumerate(reco_similarity[idx]))

    # Sort by similarity (highest first)
    similarity_scores = sorted(
        similarity_scores,
        key=lambda x: x[1],
        reverse=True
    )

    # Skip itself and take top N
    top_indices = [
        i for i, _ in similarity_scores[1:data.top_n + 1]
    ]

    # Select recommended properties
    recommendations = reco_df.iloc[top_indices][
        ["id", "title", "location", "price"]
    ].to_dict(orient="records")

    return {"recommendations": recommendations}

from fastapi import FastAPI, HTTPException
from dataprep.eda import create_report
import pandas as pd
from decouple import config
import cloudinary
from cloudinary.uploader import upload
from fastapi.middleware.cors import CORSMiddleware
import tempfile
import os

app = FastAPI()
cloudinary.config(
    cloud_name=config('CLOUDINARY_CLOUD_NAME'),
    api_key=config('CLOUDINARY_API_KEY'),
    api_secret=config('CLOUDINARY_API_SECRET')
)
from pydantic import BaseModel

origins = [
    "*",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RequestData(BaseModel):
  url: str

@app.post("/get_visualization")
async def fetch_url(data: RequestData):
    try:
        url = data.url
        df = pd.read_csv(url)
        report = create_report(df)
        with tempfile.NamedTemporaryFile(suffix='.html', dir='./visualization', delete=False) as f:
            report.save(f.name)
            response = upload(f.name, public_id='report.html', resource_type='auto')
            cloudinary_link=response["secure_url"]
        return {"cloudinary_link": cloudinary_link}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

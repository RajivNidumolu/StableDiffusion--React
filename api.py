from auth_token import auth_token
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
import torch
from torch import autocast
from diffusers import StableDiffusionPipeline
import base64
from io import BytesIO


app= FastAPI()

app.add_middleware(
    CORSMiddleware,allow_credentials=True,
    allow_origins={"*"},
    allow_headers=["*"]
)
device="cuda"
model_id= "CompVis/stable-diffusion-v1-4"
pipe = StableDiffusionPipeline.from_pretrained(model_id, use_auth_token=auth_token)
pipe.to()

@app.get("/")
def generate(prompt: str):
    with autocast(device):
        image = pipe(prompt,guidance_scale= 8.5).images[0]

    image.save("testimage.png")
    buffer = BytesIO()
    image.save(buffer,format="PNG")
    imgstr=base64.b64encode(buffer.getvalue())

    return Response(content = imgstr,media_type="image/png")
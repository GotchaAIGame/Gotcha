"""
main application of python backend
Recent update : 2023.03.14 15:18
"""
from fastapi import FastAPI
from utils import lifespan
from api import api
from starlette.middleware.cors import CORSMiddleware

app = FastAPI(lifespan = lifespan)
app.mount('/api/game', api)

# cors setting
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)


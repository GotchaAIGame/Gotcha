"""
main application of python backend
Recent update : 2023.03.14 15:18
"""
from fastapi import FastAPI
from utils import lifespan
from api import api

app = FastAPI(lifespan = lifespan)
app.mount('/api/game', api)
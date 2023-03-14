"""
main application of python backend
Recent update : 2023.03.14 15:18
"""
from fastapi import FastAPI, File
import io
from PIL import Image
import numpy as np
import torch
from utils import lifespan, get_model
from api import api

app = FastAPI(lifespan = lifespan)
app.mount('/api/game', api)
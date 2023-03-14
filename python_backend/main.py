from fastapi import FastAPI, File
import io
from PIL import Image
import numpy as np
import torch
from utils import lifespan, get_model

app = FastAPI(lifespan = lifespan)

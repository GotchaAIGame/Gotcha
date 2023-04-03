"""
main application of python backend
Recent update : 2023.03.14 15:18
"""
from fastapi import FastAPI
import utils
from api import api
from starlette.middleware.cors import CORSMiddleware

app = FastAPI(lifespan = utils.lifespan)
app.mount('/api/python', api)

# cors setting
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

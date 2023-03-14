"""
APIs to be used in python backend server
Recent update : 2023.03.14 15:20
"""
from fastapi import FastAPI
from models import SolveRequest

api = FastAPI()

@api.post("/solve")
def solve(solve_request : SolveRequest):
    """
    get datas required to calculate the similarities between two images and return the similarities between
    """
    pass



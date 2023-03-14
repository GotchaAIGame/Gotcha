"""
models to be used as input parameter of api function
Recent update : 2023.03.14 15:19
"""
from pydantic import BaseModel
from fastapi import File

class SolveRequest(BaseModel):
    """
    request format to ask if the image sent is right one 
    """
    roomId : int # id of the room 
    problemId : int # id of the problem
    answerImg : bytes = File() # answer Image



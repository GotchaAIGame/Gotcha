"""
APIs to be used in python backend server
Recent update : 2023.03.14 15:20
"""
from fastapi import FastAPI, Form, UploadFile, File
from PIL import Image, ImageOps
from io import BytesIO
import requests
from utils import infer

api = FastAPI()

@api.post("/predict")
async def predict(originalUrl : str = Form(...), inputImage : UploadFile = File(...)):

    """
    get datas required to calculate the similarities between two images and return the similarities between
    """

    # get target image through the original image url
    response = requests.get(originalUrl)
    original_image = Image.open(BytesIO(response.content))
    original_image = ImageOps.exif_transpose(original_image)

    # get input image
    input_image = Image.open(BytesIO(inputImage.file.read()))
    input_image = ImageOps.exif_transpose(input_image)

    result, similarity = infer(original_image, input_image)
    
    return {
        'result' : result,
        'similarity' : similarity
    }

def fibonacci(n):
    if n <= 1:
        return n
    else:
        return (fibonacci(n-1) + fibonacci(n-2))

@api.get("/load-test/{number}")
def load_test(number: int):
    result = fibonacci(number)
    return {"result": result}









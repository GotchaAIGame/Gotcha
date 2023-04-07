"""
utility functions for python backends
Recent update : 2023.03.14 15:19
"""

import torch
import torchvision.transforms as transforms
from SuperGlueModels.matching import Matching
from fastapi import FastAPI
from contextlib import asynccontextmanager
import psutil

model = None
similarity_threshold = 40
keys = ['keypoints', 'scores', 'descriptors']
transform = transforms.Compose([
    transforms.Resize([360, 360]),
    transforms.Grayscale(),
    transforms.ToTensor(),
])
device = 'cuda' if torch.cuda.is_available() else 'cpu'
print('Running inference on device \"{}\"'.format(device))

@asynccontextmanager
async def lifespan(app : FastAPI):
    # set lifespan of the main application
    # it loads model when the server is on, and remove it when the server is down
    print("lifespan is called")

    global model

    # start-up

    nms_radius = 4
    keypoint_threshold = 0.005
    max_keypoints = -1
    superglue = 'indoor'
    sinkhorn_iterations = 20
    match_threshold = 0.05

    config = {
        'superpoint': {
            'nms_radius': nms_radius,
            'keypoint_threshold': keypoint_threshold,
            'max_keypoints': max_keypoints
        },
        'superglue': {
            'weights': superglue,
            'sinkhorn_iterations': sinkhorn_iterations,
            'match_threshold': match_threshold,
        }
    }

    model = Matching(config).eval().to(device)
    print("the model is successfully loaded")

    yield

    # shut-down
    model = None
    print("the model is successfully deleted")

def infer(original_image, input_image):
    """
    get two images and return the output of the model

    input:
        - original_image : the original image that problem maker provided
        - input_image : the input image that problem solver provided

    output:
        - result : True, if the two images have the same object
        - similarity : similarity between two images (yet to be implement)
    """

    # memory_usage("#1 initial")
    result = None
    similarity = -1

    original = transform(original_image).to(device).unsqueeze(1)
    input_ = transform(input_image).to(device).unsqueeze(1)

    # memory_usage("#2 transform")
 
    last_data = model.superpoint({'image' : original})
    last_data = {k+'0' : last_data[k] for k in keys}
    last_data['image0'] = original

    
    # memory_usage("#3 lastdata")

    matches, confidence = model({**last_data, 'image1': input_})

    # # kpts0 = last_data['keypoints0'][0].detach().cpu().numpy()
    # kpts1 = pred['keypoints1'][0].detach().cpu().numpy()
    # matches = pred['matches0'][0].detach().cpu().numpy()
    # # confidence = pred['matching_scores0'][0].detach().cpu().numpy()

    # del pred # pred 용량이 꽤 크니, 필요한 것만 받아오자.

    # memory_usage("#4 result")

    valid = matches > -1
    confidence = torch.mean(confidence[valid])

    print(confidence)
    conf_threshold = 0.7

    if torch.isnan(confidence):
        result = False
        similarity = 0
    elif confidence.item() < conf_threshold:
        result = False
        similarity = confidence.item()
    else:
        result = True
        similarity = confidence.item()    

    # memory_usage("#5 over")

    return result, similarity

def memory_usage(message : str = 'debug'):
    p = psutil.Process()
    rss = p.memory_info().rss / 2 ** 20
    print(f"{message} memory usage : {rss:10.5f} MB")
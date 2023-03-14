"""
utility functions for python backends
Recent update : 2023.03.14 15:19
"""

import torch
import os
from SuperGlueModels.matching import Matching


model = None

async def lifespan(app):
    # set lifespan of the main application
    # it loads model when the server is on, and remove it when the server is down

    global model

    # start-up
    # set configuration
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    print('Running inference on device \"{}\"'.format(device))

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

def get_model():
    # get model
    return model
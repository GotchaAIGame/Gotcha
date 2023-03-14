import cv2
import matplotlib.cm as cm
import torch

from PIL import Image, ImageOps
import torchvision.transforms as transforms

from SuperGlueModels.matching import Matching
from SuperGlueModels.utils import make_matching_plot_fast

torch.set_grad_enabled(False)

if __name__ == '__main__':

    # device setting

    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    print('Running inference on device \"{}\"'.format(device))

    nms_radius = 4
    keypoint_threshold = 0.005
    max_keypoints = -1
    superglue = 'indoor'
    sinkhorn_iterations = 20
    match_threshold = 0.05
    similarity_threshold = 40

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
    matching = Matching(config).eval().to(device)
    keys = ['keypoints', 'scores', 'descriptors']

    # get inputs

    transform = transforms.Compose([
        transforms.Resize([480, 360]),
        transforms.ToTensor(),
        transforms.Grayscale()
    ])

    image_0_path = r"test_images\2.jpg" # path to image 0
    image_1_path = r"test_images\2_test.jpg" # path to image 1 

    image_0 = ImageOps.exif_transpose(Image.open(image_0_path))
    image_1 = ImageOps.exif_transpose(Image.open(image_1_path))

    image_0 = transform(image_0).unsqueeze(1)
    image_1 = transform(image_1).unsqueeze(1)

    last_data = matching.superpoint({'image' : image_0})
    last_data = {k+'0' : last_data[k] for k in keys}
    last_data['image0'] = image_0
    last_image_id = 0


    pred = matching({**last_data, 'image1': image_1})
    kpts0 = last_data['keypoints0'][0].cpu().numpy()
    kpts1 = pred['keypoints1'][0].cpu().numpy()
    matches = pred['matches0'][0].cpu().numpy()
    confidence = pred['matching_scores0'][0].cpu().numpy()

    valid = matches > -1
    mkpts0 = kpts0[valid]
    mkpts1 = kpts1[matches[valid]]

    if len(mkpts0) >= similarity_threshold:
        print("Images are Similar")
    else:
        print("Images are different")

    # visualization from here

    stem0, stem1 = 'original', 'compare'

    color = cm.jet(confidence[valid])
    text = [
        'SuperGlue',
        'Keypoints: {}:{}'.format(len(kpts0), len(kpts1)),
        'Matches: {}'.format(len(mkpts0))
    ]
    k_thresh = matching.superpoint.config['keypoint_threshold']
    m_thresh = matching.superglue.config['match_threshold']
    small_text = [
        'Keypoint Threshold: {:.4f}'.format(k_thresh),
        'Match Threshold: {:.2f}'.format(m_thresh),
        'Image Pair: {:06}:{:06}'.format(stem0, stem1),
    ]

    out = make_matching_plot_fast(
        (image_0.squeeze()*255).long(), (image_1.squeeze()*255).long(), kpts0, kpts1, mkpts0, mkpts1, color, text,
        path=None, show_keypoints=False, small_text=small_text)
    
    # 전체 개수 중 맞춘 개수 , 확률 도입
    cv2.imshow('SuperGlue matches', out)
    cv2.waitKey(0)

    cv2.destroyAllWindows()

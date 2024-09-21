from config import *
from crnn import CRNNHandle
from angnet import AngleNetHandle
from utils import draw_bbox, crop_rect, sorted_boxes, get_rotate_crop_image
from PIL import Image
import numpy as np
import copy
from dbnet.dbnet_infer import DBNET
import traceback


class OcrHandle(object):
    def __init__(self):
        self.text_handle = DBNET(model_path)
        self.crnn_handle = CRNNHandle(crnn_model_path)
        if angle_detect:
            self.angle_handle = AngleNetHandle(angle_net_path)
        else:
            self.angle_handle = None

    def crnnRecWithBox(self, im, boxes_list, score_list):
        results = []
        boxes_list = sorted_boxes(np.array(boxes_list))

        line_imgs = []
        for index, (box, score) in enumerate(zip(boxes_list[:angle_detect_num], score_list[:angle_detect_num])):
            tmp_box = copy.deepcopy(box)
            partImg_array = get_rotate_crop_image(im, tmp_box.astype(np.float32))
            partImg = Image.fromarray(partImg_array).convert("RGB")
            line_imgs.append(partImg)

        angle_res = False
        if self.angle_handle:
            angle_res = self.angle_handle.predict_rbgs(line_imgs)

        count = 1
        for index, (box, score) in enumerate(zip(boxes_list, score_list)):
            tmp_box = copy.deepcopy(box)
            partImg_array = get_rotate_crop_image(im, tmp_box.astype(np.float32))
            partImg = Image.fromarray(partImg_array).convert("RGB")

            if self.angle_handle and angle_res:
                partImg = partImg.rotate(180)

            if not is_rgb:
                partImg = partImg.convert('L')

            try:
                if is_rgb:
                    simPred = self.crnn_handle.predict_rbg(partImg)  # Recognize text
                else:
                    simPred = self.crnn_handle.predict(partImg)  # Recognize text
            except Exception as e:
                print(traceback.format_exc())
                continue

            if simPred.strip() != '':
                results.append([tmp_box, "{}、 ".format(count) + simPred, score])
                count += 1

        return results

    def text_predict(self, img, short_size):
        boxes_list, score_list = self.text_handle.process(np.asarray(img).astype(np.uint8), short_size=short_size)
        result = self.crnnRecWithBox(np.array(img), boxes_list, score_list)

        return result


# Function to load models (for API use)
def load_model():
    return OcrHandle()

# Function to perform OCR prediction (for API use)
def ocr_predict(model, image, short_size):
    try:
        result = model.text_predict(image, short_size)
        return {'results': result}
    except Exception as e:
        return {'error': str(e)}


if __name__ == "__main__":
    pass

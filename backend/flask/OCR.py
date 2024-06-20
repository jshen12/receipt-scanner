import pytesseract
import cv2
import imutils
from imutils.perspective import four_point_transform
import uuid
import os
import re
import config

pytesseract.pytesseract.tesseract_cmd = config.TESSERACT_PATH


def process_image(img_file):
    file_path = 'temp/' + str(uuid.uuid4())
    img_file.save(file_path)

    try:
        transformed = transform_image(file_path)
        parsed_lines = OCR_image(transformed)
        price_lines = filter_price(parsed_lines)
    except Exception as e:
        raise e
    finally:
        os.remove(file_path)
    return price_lines


# applies perspective transform to get top-down view
def transform_image(img_path):
    img_orig = cv2.imread(img_path)
    # reshape to reduce noise
    img = imutils.resize(img_orig, width=config.CONTOUR_IMG_WIDTH)
    ratio = img_orig.shape[1] / float(img.shape[1])

    grayscale = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # blur image to reduce noise
    blurred = cv2.GaussianBlur(grayscale, (5, 5), 0)
    edge = cv2.Canny(
        blurred, config.CANNY_THRESHOLD_1, config.CANNY_THRESHOLD_2
    )

    contours, _ = cv2.findContours(
        edge, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
    )
    contours = sorted(contours, key=cv2.contourArea, reverse=True)

    # find contour corresponding to receipt outline
    receiptContour = None
    for c in contours:
        epsilon = 0.02 * cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, epsilon, True)

        if len(approx) == 4:
            receiptContour = approx
            break

    if receiptContour is None:
        raise Exception("Couldn't find receipt outline")

    perspective_rcpt = four_point_transform(
        img_orig, ratio * receiptContour.reshape(4, 2)
    )
    return perspective_rcpt


def OCR_image(img):
    parsed_str = pytesseract.image_to_string(img, config=config.OCR_OPTIONS)
    print(parsed_str)

    return parsed_str.split("\n")


def filter_price(lines):
    price_lines = []

    for line in lines:
        matched = re.search(config.PRICE_REGEX, line)
        if matched is not None:
            price_lines.append({'text': line, 'price': matched.group()})
    print(price_lines)
    return price_lines

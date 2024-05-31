from PIL import Image
import pytesseract
import cv2
import numpy as np
import imutils
from imutils.perspective import four_point_transform
import uuid
import os
import re

contour_img_width = 500
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract'
ocr_options = "--psm 4"  # parse by lines
price_regex = r'([0-9]+\.[0-9]+)'


def process_image(img_file):
    file_path = 'temp/' + str(uuid.uuid4())
    img_file.save(file_path)

    try:
        transformed = transform_image(file_path)
        parsed_lines = read_image(transformed)
        price_lines = filter_lines(parsed_lines)
    except Exception as e:
        raise e
    finally:
        os.remove(file_path)
    return price_lines


def transform_image(img_path):
    img_orig = cv2.imread(img_path)
    # reshape to reduce noise
    img = imutils.resize(img_orig, width=contour_img_width)
    ratio = img_orig.shape[1] / float(img.shape[1])

    grayscale = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # blur image to reduce noise
    blurred = cv2.GaussianBlur(grayscale, (5, 5), 0)
    edge = cv2.Canny(blurred, 75, 200)

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


# OCRs an image
def read_image(img):
    # img = Image.open('receipt-ocr-original.png')

    parsed_str = pytesseract.image_to_string(img, config=ocr_options)
    print(parsed_str)

    return parsed_str.split("\n")


# filters by price
def filter_lines(lines):
    price_lines = []

    for line in lines:
        matched = re.search(price_regex, line)
        if matched is not None:
            price_lines.append({'text': line, 'price': matched.group()})
    print(price_lines)
    return price_lines

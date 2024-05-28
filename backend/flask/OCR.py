from PIL import Image
import pytesseract
import uuid
import os
import re

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract'
ocr_options = "--psm 4"  # parse by lines
price_regex = r'([0-9]+\.[0-9]+)'


def process_image(img_file):
    # apply opencv transformations
    # regex and process text
    # cleanup
    file_path = 'temp/' + str(uuid.uuid4())
    img_file.save(file_path)

    parsed_lines = read_image(file_path)
    price_lines = filter_lines(parsed_lines)

    os.remove(file_path)
    return price_lines


# OCRs an image
def read_image(img_path):
    img = Image.open('receipt-ocr-original.png')

    parsed_str = pytesseract.image_to_string(img, config=ocr_options)
    print(parsed_str)

    img.close()
    return parsed_str.split("\n")


def filter_lines(lines):
    price_lines = []

    for line in lines:
        matched = re.search(price_regex, line)
        if matched is not None:
            price_lines.append({'text': line, 'price': matched.group()})
    print(price_lines)
    return price_lines

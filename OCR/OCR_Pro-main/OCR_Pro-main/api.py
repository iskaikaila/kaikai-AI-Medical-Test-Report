from flask import Flask, request, jsonify
import os
import base64
import re
import csv
import pytesseract
import psycopg2
from PIL import Image, ImageEnhance, ImageFilter
from io import BytesIO
import fitz  # PyMuPDF for PDF processing

# 手动指定 Tesseract 的路径
pytesseract.pytesseract.tesseract_cmd = os.path.join(os.path.dirname(__file__), "Tesseract-OCR", "tesseract.exe")

app = Flask(__name__)

# 配置 PostgreSQL 数据库连接
db_params = {
    'dbname': 'ocr_db',
    'user': 'postgres',
    'password': '123456',
    'host': 'localhost',
    'port': '5432'
}

# 设置目录
pdf_dir = "./input_pdf"
output_img_dir = "./OCR_img"
cropped_img_dir = "./cropped_images"
output_csv_dir = "./output_csv"
crop_box = (655, 415, 1005, 1135)  # 根据需要调整裁剪区域

for dir_path in [pdf_dir, output_img_dir, cropped_img_dir, output_csv_dir]:
    os.makedirs(dir_path, exist_ok=True)

# Helper function for resizing images
def resize_image(image, max_size=960):
    width, height = image.size
    if width > height:
        new_width = max_size
        new_height = int((max_size / width) * height)
    else:
        new_height = max_size
        new_width = int((max_size / height) * width)
    return image.resize((new_width, new_height), Image.Resampling.LANCZOS)

# PDF to image
def pdf_to_img(pdf_file):
    pdf_doc = fitz.open(stream=pdf_file.read(), filetype="pdf")
    page = pdf_doc[0]
    mat = fitz.Matrix(3, 3)
    pix = page.get_pixmap(matrix=mat, alpha=False)
    image_path = os.path.join(output_img_dir, "output.png")
    pix.save(image_path)
    return image_path

# Enhance image
def enhance_image(image):
    enhancer = ImageEnhance.Contrast(image)
    enhanced_img = enhancer.enhance(2)
    cleaned_img = enhanced_img.filter(ImageFilter.MedianFilter(size=3))
    sharpened_img = cleaned_img.filter(ImageFilter.UnsharpMask())
    grayscale_img = sharpened_img.convert('L')
    binary_img = grayscale_img.point(lambda x: 0 if x < 128 else 255, '1')
    return binary_img

# Clean text
def clean_text(text):
    english_parts = re.findall(r'[A-Za-z]+', text)
    numeric_parts = re.findall(r'-?\d+(?:,\d{3})*(?:\.\d+)?', text.replace(',', ''))
    return english_parts, numeric_parts

# Process image
def process_image(image_path, crop_box):
    im = Image.open(image_path)
    cropped_img = im.crop(crop_box)
    img = enhance_image(cropped_img)
    text = pytesseract.image_to_string(img, config='--oem 3 --psm 6', lang='eng')
    return clean_text(text)

# API to process PDF and generate CSV
@app.route('/process_pdf', methods=['POST'])
def process_pdf():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    pdf_file = request.files['file']
    image_path = pdf_to_img(pdf_file)
    english_parts, numeric_parts = process_image(image_path, crop_box)

    # Save to CSV
    csv_file_path = os.path.join(output_csv_dir, "output_results.csv")
    with open(csv_file_path, 'w', newline='', encoding='utf-8') as csv_file:
        csv_writer = csv.writer(csv_file)
        csv_writer.writerow(english_parts)
        csv_writer.writerow(numeric_parts)

    return jsonify({'message': 'PDF processed successfully', 'csv_path': csv_file_path}), 200

# API to import CSV to PostgreSQL
@app.route('/import_csv', methods=['POST'])
def import_csv():
    try:
        conn = psycopg2.connect(**db_params)
        cursor = conn.cursor()

        # Read the CSV file
        csv_path = os.path.join(output_csv_dir, "output_results.csv")
        with open(csv_path, mode='r', encoding='utf-8') as csv_file:
            csv_reader = csv.reader(csv_file)
            rows = list(csv_reader)

            # Ensure equal length of rows
            max_length = max(len(rows[0]), len(rows[1]))
            rows[0].extend([''] * (max_length - len(rows[0])))
            rows[1].extend([''] * (max_length - len(rows[1])))

            insert_query = 'INSERT INTO "检验单数据" ("检验项目", "检验结果") VALUES (%s, %s)'
            for item, result in zip(rows[0], rows[1]):
                try:
                    result = float(result) if result else None
                except ValueError:
                    result = None
                cursor.execute(insert_query, (item, result))

        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'message': 'CSV imported successfully into database'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

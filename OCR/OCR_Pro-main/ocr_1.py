import os
from PIL import Image, ImageEnhance, ImageFilter
from io import BytesIO
import base64
import re
import pytesseract
import fitz  # PyMuPDF for PDF processing
import csv

# 手动指定 Tesseract 的路径
pytesseract.pytesseract.tesseract_cmd = os.path.join(os.path.dirname(__file__), "Tesseract-OCR", "tesseract.exe")


# 图片转base64
def get_base64(image_path):
    with open(image_path, "rb") as f:
        base64_data = base64.b64encode(f.read())
        return base64_data

# 调整图片大小
def resize_image(image, max_size=960):
    width, height = image.size
    if width > height:
        new_width = max_size
        new_height = int((max_size / width) * height)
    else:
        new_height = max_size
        new_width = int((max_size / height) * width)
    return image.resize((new_width, new_height), Image.Resampling.LANCZOS)

# 增强对比度并锐化图像
def enhance_image(image):
    # 提高对比度
    enhancer = ImageEnhance.Contrast(image)
    enhanced_img = enhancer.enhance(2)

    # 去噪声处理
    cleaned_img = enhanced_img.filter(ImageFilter.MedianFilter(size=3))

    # 锐化处理
    sharpened_img = cleaned_img.filter(ImageFilter.UnsharpMask())

    # 转换为灰度并进行二值化
    grayscale_img = sharpened_img.convert('L')
    binary_img = grayscale_img.point(lambda x: 0 if x < 128 else 255, '1')

    return binary_img

# 清理文本，提取英文字母和浮点数
def clean_text(text):
    # 提取英文字符
    english_parts = re.findall(r'[A-Za-z]+', text)

    # 提取符号
    numeric_parts = re.findall(r'[^\s\w]', text)

    # 提取浮点数和整数，支持千分位逗号
    numeric_parts += re.findall(r'-?\d+(?:,\d{3})*(?:\.\d+)?', text.replace(',', ''))

    # 仅保留合理的数字范围（根据需要修改）
    def filter_invalid_numbers(numbers):
        valid_numbers = []
        for num in numbers:
            try:
                # 去掉千分位逗号
                cleaned_num = num.replace(',', '')
                # 尝试转换为浮点数
                float_num = float(cleaned_num)
                # 仅保留在指定范围内的数字
                if -100000 < float_num < 100000:
                    valid_numbers.append(num)
            except ValueError:
                # 如果转换失败，跳过该条数字
                continue
        return valid_numbers

    numeric_parts = filter_invalid_numbers(numeric_parts)

    return english_parts, numeric_parts

# 裁剪图片
def crop_image(image, crop_box):
    return image.crop(crop_box)

# PDF 转图片
def pdf_to_img(pdf_dir, output_img_dir):
    print("正在将PDF文件转换成图片......")
    cons = []
    pdf_files = [f for f in os.listdir(pdf_dir) if f.endswith('.pdf')]
    for pdf in pdf_files:
        pdf_path = os.path.join(pdf_dir, pdf)
        pdf_doc = fitz.open(pdf_path)
        page = pdf_doc[0]
        zoom_x = 3
        zoom_y = 3
        mat = fitz.Matrix(zoom_x, zoom_y)
        pix = page.get_pixmap(matrix=mat, alpha=False)
        Name = pdf[:pdf.rfind(".")]
        image_ori = os.path.join(output_img_dir, Name + ".png")
        pix.save(image_ori)
        cons.append(image_ori)
    return cons

# 调整曝光度、饱和度和对比度
def adjust_image_properties(image):
    # 降低曝光度（亮度）
    brightness_enhancer = ImageEnhance.Brightness(image)
    image = brightness_enhancer.enhance(0.8)  # 降低曝光度

    # 降低饱和度
    saturation_enhancer = ImageEnhance.Color(image)
    image = saturation_enhancer.enhance(0.5)  # 降低饱和度

    # 提高对比度
    contrast_enhancer = ImageEnhance.Contrast(image)
    image = contrast_enhancer.enhance(2.0)  # 提高对比度

    return image

# 裁剪和处理图片并进行 OCR 识别
def process_image(image_path, crop_box):
    im = Image.open(image_path)
    cropped_img = crop_image(im, crop_box)
    cropped_image_path = os.path.join(cropped_img_dir, "cropped_" + os.path.basename(image_path))
    cropped_img.save(cropped_image_path)
    print(f"裁剪后的图片已保存到: {cropped_image_path}")
    img_b64 = get_base64(cropped_image_path)
    raw_image = base64.b64decode(img_b64)
    img = Image.open(BytesIO(raw_image))

    # 调整图片的曝光度、饱和度和对比度
    img = adjust_image_properties(img)

    img = resize_image(img, max_size=960)
    img = enhance_image(img)

    # 使用 OCR 进行识别
    custom_config = r'--oem 3 --psm 6'
    text = pytesseract.image_to_string(img, config=custom_config, lang='eng')

    # 清理文本，提取英文和数字
    english_parts, numeric_parts = clean_text(text)

    return english_parts, numeric_parts

# 主程序入口
if __name__ == '__main__':
    pdf_dir = "./input_pdf"
    output_img_dir = "./OCR_img"
    cropped_img_dir = "./cropped_images"
    output_csv_dir = "./output_csv"

    if not os.path.exists(output_img_dir):
        os.makedirs(output_img_dir)

    if not os.path.exists(cropped_img_dir):
        os.makedirs(cropped_img_dir)

    if not os.path.exists(output_csv_dir):
        os.makedirs(output_csv_dir)

    crop_box = (655, 415, 1005, 1135)  # 根据需要调整裁剪区域

    image_paths = pdf_to_img(pdf_dir, output_img_dir)

    all_english_parts = []
    all_numeric_parts = []

    for image_path in image_paths:
        english_parts, numeric_parts = process_image(image_path, crop_box)
        all_english_parts.extend(english_parts)
        all_numeric_parts.extend(numeric_parts)

    # 确保A列和B列长度一致
    max_length = max(len(all_english_parts), len(all_numeric_parts))
    all_english_parts.extend([''] * (max_length - len(all_english_parts)))
    all_numeric_parts.extend([''] * (max_length - len(all_numeric_parts)))

    # 导出未转置的 CSV 文件
    re_csv_file = os.path.join(output_csv_dir, "re_finnal_results.csv")
    with open(re_csv_file, mode='w', newline='', encoding='utf-8') as file:
        csv_writer = csv.writer(file)
        for english, numeric in zip(all_english_parts, all_numeric_parts):
            csv_writer.writerow([english, numeric])

    # 将数据转置后写入新的 CSV 文件
    csv_file = os.path.join(output_csv_dir, "finnal_results1.csv")
    with open(csv_file, mode='w', newline='', encoding='utf-8') as file:
        csv_writer = csv.writer(file)
        csv_writer.writerow(all_english_parts)  # 第一行：英文
        csv_writer.writerow(all_numeric_parts)  # 第二行：数字和符号

    print(f"结果已保存至 {csv_file} 和 {re_csv_file}")
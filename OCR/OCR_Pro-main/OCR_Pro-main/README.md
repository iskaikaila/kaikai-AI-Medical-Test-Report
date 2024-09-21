# OCR_python

# OCR 处理 API：PDF 转换为图片并导入数据库

本项目提供了一个 OCR（光学字符识别）处理流程，可以将 PDF 文件转换为图片，提取文本内容，并将结果存储到 PostgreSQL 数据库中。该解决方案通过基于 Flask 的 RESTful API 实现，允许用户处理 PDF 文件并将结果以结构化格式保存。

## 功能
- 使用 PyMuPDF 将 PDF 文件转换为图片
- 使用 Tesseract OCR 从图片中提取文本
- 清理并处理提取的文本
- 将结果导出到 CSV 文件
- 将 CSV 结果导入 PostgreSQL 数据库

## 环境要求

确保您已安装以下软件：
- Python 3.x
- PostgreSQL
- Tesseract OCR （下载链接：[Tesseract OCR](https://github.com/tesseract-ocr/tesseract)）

目录结构：
OCR_Pro-main/
│
├── Tesseract-OCR/           # 包含 Tesseract 可执行文件的目录
├── input_pdf/               # 存放待处理 PDF 文件的目录
├── OCR_img/                 # 存放处理后图片的目录
├── cropped_images/          # 存放裁剪后的图片
├── output_csv/              # 输出 CSV 文件的目录
├── api.py                   # 主 API 服务器代码
├── process_pdf.py           # PDF 转换为图片并提取文本的脚本
└── README.md                # 本文件

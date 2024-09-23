# 1. 使用 Python 基础镜像
FROM python:3.9-slim

# 2. 设置工作目录
WORKDIR /app

# 3. 复制并安装依赖项
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt && \
    rm -rf /root/.cache/pip

# 4. 复制项目文件到工作目录
COPY . .

# 5. 暴露容器端口
EXPOSE 8000

# 6. 启动应用程序
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]

import psycopg2
import csv

# 数据库连接配置
conn_params = {
    'dbname': 'ocr_db',
    'user': 'postgres',
    'password': '123456',
    'host': 'localhost',
    'port': '5432'
}

# CSV 文件路径
csv_path = './output_csv/re_finnal_results.csv'

# 连接到 PostgreSQL 数据库
conn = psycopg2.connect(**conn_params)
cursor = conn.cursor()

# 插入数据
with open(csv_path, mode='r', encoding='utf-8') as csv_file:
    csv_reader = csv.reader(csv_file)

    # 跳过标题行
    next(csv_reader)

    insert_query = 'INSERT INTO "检验单数据" ("检验项目", "检验结果") VALUES (%s, %s)'

    for row in csv_reader:
        if len(row) == 2:
            item, result = row
            try:
                result = float(result)  # 将结果转化为 float 类型
            except ValueError:
                result = None  # 如果无法转换为 float，将其设为 None

            cursor.execute(insert_query, (item, result))

# 提交事务
conn.commit()

# 关闭数据库连接
cursor.close()
conn.close()

print("数据导入成功!")

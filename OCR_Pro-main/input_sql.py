import psycopg2
import csv

# 数据库连接配置
conn_params = {
    'dbname': 'ocr_db',  # 数据库名称
    'user': 'postgres',  # 用户名
    'password': '123456',  # 密码
    'host': 'localhost',  # 本地数据库主机
    'port': '5432'  # 默认端口
}

# CSV 文件路径
csv_path = './output_csv/re_finnal_results.csv'

# 连接到 PostgreSQL 数据库
conn = psycopg2.connect(**conn_params)
cursor = conn.cursor()

# 确保表存在，如果不存在则创建表
create_table_query = """
CREATE TABLE IF NOT EXISTS "检验单数据" (
    "检验项目" TEXT,
    "检验结果" NUMERIC
);
"""
cursor.execute(create_table_query)
conn.commit()

# 读取 CSV 文件并插入数据
with open(csv_path, mode='r', encoding='utf-8') as csv_file:
    csv_reader = csv.reader(csv_file)

    # 循环遍历 CSV 文件的每一行
    for row in csv_reader:
        if len(row) == 2:  # 确保每行有两列数据
            item, result = row
            try:
                # 尝试将第二列的检验结果转换为 float 类型
                result = float(result)
            except ValueError:
                result = None  # 如果转换失败，设置为 None

            # 插入数据到 PostgreSQL 表中
            insert_query = 'INSERT INTO "检验单数据" ("检验项目", "检验结果") VALUES (%s, %s)'
            cursor.execute(insert_query, (item, result))

# 提交事务
conn.commit()

# 关闭数据库连接
cursor.close()
conn.close()

print("CSV 文件数据已成功导入到数据库!")

import csv

# CSV 文件路径
csv_path = './output_csv/re_finnal_results.csv'

# 打开 CSV 文件并检查数据格式
with open(csv_path, mode='r', encoding='utf-8') as csv_file:
    csv_reader = csv.reader(csv_file)

    # 检查每一行数据
    row_num = 1
    for row in csv_reader:
        if len(row) != 2:
            print(f"第 {row_num} 行的数据格式不正确: {row}")
        else:
            item, result = row

            # 检查第一列是否是文本
            if isinstance(item, str):
                print(f"第 {row_num} 行: '检验项目' 是有效的文本: {item}")
            else:
                print(f"第 {row_num} 行: '检验项目' 不是文本: {item}")

            # 检查第二列是否可以转换为数值
            try:
                result_float = float(result)
                print(f"第 {row_num} 行: '检验结果' 是有效的数值: {result_float}")
            except ValueError:
                print(f"第 {row_num} 行: '检验结果' 不是有效的数值: {result}")

        row_num += 1

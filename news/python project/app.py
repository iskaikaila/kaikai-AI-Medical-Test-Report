# app.py
from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS  # 导入 CORS

app = Flask(__name__)
CORS(app)  # 允许所有来源的跨域请求

def fetch_news():
    url = 'http://health.china.com.cn'
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        news_sections = soup.find_all('div', class_=['box3', 'box4', 'story clearfix', 'clearfix zhuanti'])

        news_list = []

        for section in news_sections:
            links = section.find_all('a')
            for link in links:
                href = link.get('href')
                img = link.find('img')

                if img:
                    img_src = img.get('src')
                    title = img.get('alt', 'No Title')
                    news_list.append({'title': title, 'link': href, 'image': img_src})
                else:
                    title = link.get_text(strip=True)
                    news_list.append({'title': title, 'link': href})

        return news_list
    else:
        return []

@app.route('/news', methods=['GET'])
def get_news():
    # 获取所有新闻数据
    all_news = fetch_news()

    # 返回前5条指定新闻
    specified_news = [
        {"title": "国家药监局公布4起药品违法案件典型案例", "link": "http://www.news.cn/health/20240919/1e80cf02e0334e0592bf46c59ed833f9/c.html",
         "image": "http://www.news.cn/health/20240919/1e80cf02e0334e0592bf46c59ed833f9/202409191e80cf02e0334e0592bf46c59ed833f9_2024091921bc788bf5d0486fb020eb99c3ac2721.jpg"},
        {"title": "河南禹州：税惠“良方”为中医药产业添动力", "link": "http://health.china.com.cn/2024-03/29/content_42741002.htm",
         "image": "http://health.china.com.cn/2024-03/29/t2_(69X3X523X292)ce9e83b5-8176-4fd4-9706-4db369d8df05.png"},
        {"title": "河北省传统文化教育学会中医药文化传播工作委员会在石成立", "link": "http://health.china.com.cn/2024-04/02/content_42744707.htm",
         "image": " http://health.china.com.cn/2024-04/02/t2_(7X5X600X382)bb3b8a4f-2bc1-4383-8947-cda28f8a50bd.png"},
        {"title": "撑“大”了的胃 还能这样“缩”回去", "link": " http://www.news.cn/health/20230620/b4a261873fac44209bfd0c2d53a6ad47/c.html",
         "image": " http://www.news.cn/health/20230620/fdd765305c394e0987c7bd98cbc42da8/5ff202db284d458692262c8fa7b84c71_VCG211368127965123.jpg"},
        {"title": "雪道的尽头是骨科？专家作出这些提示", "link": "http://www.news.cn/health/20240119/01be0a89ce22488ca90227ba410783f6/c.html",
         "image": "http://www.news.cn/health/20240124/fc9dd0f7366c4aad97c5ab26f136a69e/76c9007f6b3f4274a41b6cd5d230fcd3.jpg"}
    ]

    # 如果想返回爬取到的新闻，只需替换为: return jsonify(all_news[:5])
    return jsonify(specified_news)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

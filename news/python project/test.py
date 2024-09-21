import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin


def fetch_news():
    # 要爬取的目标 URL
    url = 'http://www.news.cn/health/'

    try:
        # 发送请求获取页面内容
        response = requests.get(url, timeout=10)
        response.raise_for_status()  # 如果请求失败，抛出异常

        soup = BeautifulSoup(response.text, 'html.parser')

        # 根据截图中可能的新闻所在的 div 结构进行查找
        news_sections = soup.find_all('div', class_=['main clearfix'])  # 查找特定的 div class 名称

        # 存储新闻数据
        news_list = []

        for section in news_sections:
            # 查找所有 <a> 标签
            links = section.find_all('a')
            for link in links:
                href = link.get('href')
                img = link.find('img')

                if href:
                    full_link = urljoin(url, href)  # 处理相对路径链接

                    if img:
                        img_src = urljoin(url, img.get('src'))
                        title = img.get('alt', 'No Title')
                        news_list.append({'title': title, 'link': full_link, 'image': img_src})
                    else:
                        title = link.get_text(strip=True)
                        news_list.append({'title': title, 'link': full_link})

        return news_list
    except requests.RequestException as e:
        print(f"Error fetching the news: {e}")
        return []


# 测试爬取函数
if __name__ == '__main__':
    news_list = fetch_news()
    for news in news_list:
        print(f"Title: {news['title']}")
        print(f"Link: {news['link']}")
        print(f"Image: {news.get('image', 'No Image')}")
        print('-' * 50)

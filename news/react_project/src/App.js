// App.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // 引入样式
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="container">
        {/* 奇闻趣事部分 */}
        <div className="fun-facts">
          <p2>奇闻趣事</p2>
          <div className="fun-fact-item">
            <a href="https://www.biomart.cn/news/110/111/2893999.htm" target="_blank" rel="noopener noreferrer">
              <p>传染病和慢性病都与微生物有关系</p>
            </a>
          </div>
          <div className="fun-fact-item">
            <a href="https://www.biomart.cn/news/110/111/2893691.htm" target="_blank" rel="noopener noreferrer">
              <p>未来患者有望获得更轻松的服药方式</p>
            </a>
          </div>
          <div className="fun-fact-item">
            <a href="https://www.biomart.cn/news/110/111/2879258.htm" target="_blank" rel="noopener noreferrer">
              <p>Medidata与南京希麦迪再度强强联手，助力中国临床试验取得新进展</p>
            </a>
          </div>
          <div className="fun-fact-item">
            <a href="https://www.biomart.cn/news/110/111/2830282.htm" target="_blank" rel="noopener noreferrer">
              <p>小白鼠在水迷宫</p>
            </a>
          </div>
          <div className="fun-fact-item">
            <a href="https://www.biomart.cn/news/110/111/2807812.htm" target="_blank" rel="noopener noreferrer">
              <p>内分泌临床综合征速查手册读后感</p>
            </a>
          </div>
          <div className="fun-fact-item">
            <a href="https://www.biomart.cn/news/110/111/2800449.htm" target="_blank" rel="noopener noreferrer">
              <p>T 细胞的非对称分裂</p>
            </a>
          </div>

          <div className="fun-fact-item">
            <a href="https://www.biomart.cn/news/110/111/2787671.htm" target="_blank" rel="noopener noreferrer">
              <p>九强生物年报点评：收入同增18.52%，净利润同增16.33%</p>
            </a>
          </div>
          <div className="fun-fact-item">
            <a href="https://www.biomart.cn/news/111/index.htm" target="_blank" rel="noopener noreferrer">
              <p>更多》》</p>
            </a>
          </div>
        </div>

        {/*主要内容部分 */}
        <div className="container-lun">
          <div className="main-content">
            <Carousel
              showThumbs={false}
              autoPlay
              infiniteLoop
              showStatus={false}
              interval={3000}
              transitionTime={500}
            >
              {/* 轮播的第一页 */}
              <div>
                <a href="https://www.biomart.cn/news/index.htm" target="_blank" rel="noopener noreferrer">
                  <img src="ea81.jpg" alt="数字医疗，全球共享" />
                  <div className="carousel-caption">
                    <h2>数字医疗，全球共享</h2>
                    <p>AI赋能健康 科技引领未来</p>
                  </div>
                </a>
              </div>

              {/* 轮播的第二页 */}
              <div>
                <a href="https://h.dxy.cn/AC2024/kz/article/20772?article_source=kz&referer=30332" target="_blank" rel="noopener noreferrer">
                  <img src="ea821.png" alt="慕尼黑上海分析生化展" />
                  <div className="carousel-caption">
                    <h2>抢鲜看！analytica China 2024 同期会议亮点揭秘 思维碰撞，共创未来！</h2>
                    <p>亚洲重要的分析、生化技术、诊断和实验室技术博览会——第十二届慕尼黑上海分析生化展（analytica China 2024）即将于 2024 年 11 月 18-20 日在上海新国际博览中心拉开帷幕。</p>
                  </div>
                </a>
              </div>

              {/* 轮播的第三页 */}
              <div>
                <a href="/page3" target="_blank" rel="noopener noreferrer">
                  <img src="ea83.png" alt="纳米孔基因测序仪" />
                  <div className="carousel-caption">
                    <h2>华大集团发布纳米孔基因测序仪，成为全球首个具备三种不同技术路径测序仪机构</h2>
                    <p>伴随全读长时代的到来，生命更加可以测量。华大在「读」生命的工具——基因测序仪领域成为全世界首个拥有激发光、自发光、不发光三种不同技术路径测序仪的机构，中国将给全世界更多、更新、更好的选择。</p>
                  </div>
                </a>
              </div>

              {/* 轮播的第四页 */}
              <div>
                <a href="https://www.biomart.cn/news/103/3222987.htm" target="_blank" rel="noopener noreferrer">
                  <img src="ea84.jpg" alt="自然大师课堂" />
                  <div className="carousel-caption">
                    <h2>自然大师课堂圆满落幕，赋能医疗高质量发展与人才培育</h2>
                    <p>2024 年 8 月 20 日至 8 月 22 日，由中国研究型医院协会检验医学专业委员会，万泰生物及施普林格·自然（SpringerNature）联合主办的「自然大师课堂（Nature Masterclasses）」为医学科研人员提供了一次宝贵的学习交流机会。</p>
                  </div>
                </a>
              </div>

              {/* 轮播的第五页 */}
              <div>
                <a href="https://www.biomart.cn/news/103/3215992.htm" target="_blank" rel="noopener noreferrer">
                  <img src="ea85.png" alt="分子医学学术会议" />
                  <div className="carousel-caption">
                    <h2>第28届国际分子医学学术会议（ISMM28）简介</h2>
                    <p>这将是一场欧洲西方和东方文明的两个医学文化交流与融合的盛会，为全球学术界带来前所未有的交流与启迪。</p>
                  </div>
                </a>
              </div>

            </Carousel>
          </div>


          {/* 在轮播图下方添加三个新闻 */}
          <div className="news-section">

            <h2>人物访谈</h2>

            <div className="news-item">
              <a href="https://www.biomart.cn/news/17/3224720.htm" target="_blank" rel="noopener noreferrer">
                <img src="ren1.png" alt="对话一作：无症状 AD 怎么提前预测" className="news-image" />
              </a>
              <div className="news-content">
                <a href="https://www.biomart.cn/news/17/3224720.htm" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3>对话一作：无症状 AD 怎么提前预测</h3>
                </a>
                <p>《中国阿尔茨海默（AD）病报告 2024》显示，2021 年，</p>
                <p>中国现存的 AD 及其他痴呆患者人数达到近 1,700 万例，并且随着人口老龄化程度不断加重，</p>
                <p>AD 的患病率和死亡率均呈现上升趋势。基于生物标志物检测的早期诊断与干预，被认为是有可能逆转这一态势的有效手段.</p>
              </div>
            </div>

            <div className="news-item">
              <a href="https://www.biomart.cn/news/17/77/3005052.htm" target="_blank" rel="noopener noreferrer">
                <img src="ren2.jpg" alt="赛默飞世尔科技" className="news-image" />
              </a>
              <div className="news-content">
                <a href="https://www.biomart.cn/news/17/77/3005052.htm" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3>赛默飞世尔科技：赋能医药创新，共迎生物医药长期发展机遇</h3>
                </a>
                <p>在生物医药行业迎来新的发展窗口期之时，致力于加速企业新药研发、提高临床试验效率</p>
                <p>、实现高效生产、降低运营成本及建立稳定的供应链，将帮助我们更好地回应疫情的挑战并抓住其中的机遇。</p>
              </div>
            </div>

            <div className="news-item">
              <a href="https://www.biomart.cn/news/17/3177670.htm" target="_blank" rel="noopener noreferrer">
                <img src="ren3.jpg" alt="发力研发创新，聚焦高新制造，书写专属博日科技的精彩篇章" className="news-image" />
              </a>
              <div className="news-content">
                <a href="https://www.biomart.cn/news/17/3177670.htm" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3>发力研发创新，聚焦高新制造，书写专属博日科技的精彩篇章</h3>
                </a>
                <p>发力研发创新，聚售高新制造，书导专属博日科技的精彩篇章勤勉立志。开拓创优，打造分子诊断行业的顶流产品与服务。</p>
              </div>
            </div>
          </div>

        </div>

        {/* 右侧边栏 */}
        <div className="sidebar">
          <div className="authority-release">
            <a href="http://www.news.cn/health/qwfb/index.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2>药监局发布</h2>
            </a>
            <ul>
              <li>
                <a href="http://www.news.cn/health/20240913/b4058696ab8c40a2bf73f01d3d8a97b2/c.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  国家药监局关于发布国家医疗器械监督抽检结果的通告
                </a>
              </li>
              <li>
                <a href="http://www.news.cn/health/20240919/0e2313f53d794ac4a9ec872b00d86a8f/c.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  国家药监局公布4起药品网络销售违法违规典型案例（第六批）
                </a>
              </li>
              <li>
                <a href="http://www.news.cn/health/20240705/82fc3c77557d4806801d7c4430b91d31/c.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  国家药监局通报3起化妆品违规典型案例
                </a>
              </li>
            </ul>
          </div>

          <div className="video-section">
            <a href="https://www.biomart.cn/news/16/index.htm" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2>合作宣发</h2>
            </a>
            <div className="video-item">
              <a href="http://www.news.cn/health/20240521/e8fa7f4c4e234544a2db8151055f7e52/c.html" target="_blank" rel="noopener noreferrer">
                <img src="9e13.jpg" alt="GE医疗" />
              </a>
              <a href="http://www.news.cn/health/20240521/e8fa7f4c4e234544a2db8151055f7e52/c.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                <p>继昨日GE医疗宣布与上海市浦东新区科技和经济委员会签署投资合作意向书后，又一家全球知名药企宣布持续加码在华投资。</p>
              </a>
            </div>
            <div className="video-item">
              <a href="http://www.news.cn/health/20240920/a2c25a5568e54df9996e014ffe3c95bc/c.html" target="_blank" rel="noopener noreferrer">
                <img src="ee67.jpg" alt="全国爱牙日" />
              </a>
              <a href="http://www.news.cn/health/20240920/a2c25a5568e54df9996e014ffe3c95bc/c.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                <p>全国爱牙日 | 解放军总医院第六医学中心口腔科主任王成龙：普通牙病也能揭示日常常见</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 使用 Routes 包裹 Route 组件 */}
      <Routes>
        <Route path="/page1" element={<div><h1>页面1内容</h1><p>这是第一个页面的详细内容</p></div>} />
        <Route path="/page2" element={<div><h1>页面2内容</h1><p>这是第二个页面的详细内容</p></div>} />
        <Route path="/page3" element={<div><h1>页面3内容</h1><p>这是第三个页面的详细内容</p></div>} />
        <Route path="/page4" element={<div><h1>页面4内容</h1><p>这是第四个页面的详细内容</p></div>} />
        <Route path="/page5" element={<div><h1>页面5内容</h1><p>这是第五个页面的详细内容</p></div>} />
      </Routes>

    </Router>
  );
}

export default App;

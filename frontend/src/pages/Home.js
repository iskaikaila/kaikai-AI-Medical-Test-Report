import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';  //  引入CSS文件

const App = () => {
    return (
        <div className="App">
            {/* 页面顶端容器内容 */}
            <header id="top-bar">
                <div className="container">
                    <img src="/brand-ye.png" alt="Brand  Logo" />
                    <nav>
                        <ul>
                            <li>
                                <a href="#">产品服务</a>
                            </li>
                            <li>
                                <a href="#">新闻资讯</a>
                            </li>
                            <li>
                                <a href="#">联系我们</a>
                            </li>
                            <li>
                                <a href="#">更多内容</a>
                            </li>
                            <li id="placeholder">
                                <a href="#"> </a>
                            </li>
                         
                            <li>
                                <a href="/Register">注册</a>
                            </li>
                            <li>
                                <a href="/Login">登录</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/*页面内容*/}
            <main  className="content">
        <div  className="left-side">
          <div  className="title">MedixAI</div>
          <div  className="introduction">欢迎登录医院检测单网站，通过填写以下信息进行登录</div>
          <ul className="learn-more" style={{ listStyleType: 'none' }}>
  <li id="learnMoreLink">
    <Link to="/login">了解更多</Link>
  </li>
</ul>
        </div>
        <div  className="yihu2">
        <img src="/yihu2.png" alt="yihu_Image" className="yihu2" />      
         </div>
      </main>



            {/*尾部1区*/}
            <footer id="footer_box">
 
    <ul class="left">
        <li><b>医院检测单</b></li>
    </ul>

   
    <ul class="left" >
        <li><a href="#">关于我们</a></li>
        <li><a href="#">联系我们</a></li>
        <li><a href="#">加入我们</a></li>
        <li><a href="#">服务条款</a></li>
    </ul>

    
    <ul class="left">
        <li><a href="#">帮助中心</a></li>
        <li><a href="#">常见问题</a></li>
        <li><a href="#">使用指南</a></li>
        <li><a href="#">意见反馈</a></li>
    </ul>

 
    <ul class="left">
        <li><a href="#">相关资源</a></li>
        <li><a href="#">医院资讯</a></li>
        <li><a href="#">检测技术</a></li>
        <li><a href="#">疾病知识</a></li>
    </ul>


    <ul class="left">
        <li><a href="#">关注我们</a></li>
        <li><a href="#">抖音</a></li>
        <li><a href="#">推特</a></li>
        <li><a href="#">微博</a></li>
    </ul>
    
</footer>

<div className="footer-bottom">
        <div>©2023 产品版权所有。保留所有权利。</div>
        <div>
          <a href="#">隐私政策</a>
          <a href="#">服务条款</a>
          <a href="#">Cookie设置</a>
        </div>
      </div>

        </div>
    );
};

export default App;

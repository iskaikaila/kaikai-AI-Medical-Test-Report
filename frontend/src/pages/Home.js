import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// Import images from the 'images' directory inside 'src'
import logo from './images/brand.png';
import leaf from './images/tree-2.png';
import mainImage from './images/image.png';
import socialIcons from './images/Social Icons.png';

const HomePage = () => {
    return (
        <div className="homepage">
            {/* Header */}
            <header className="header-container">
                <div className="header-inner">
                    <div className="logo-section">
                        <img src={logo} alt="MedixAI Logo" className="logo" />
                        <img src={leaf} alt="Leaf Icon" className="leaf" />
                    </div>
                    <nav className="nav-menu">
                        <a href="#">产品介绍</a>
                        <a href="#">产品服务</a>
                        <a href="#">新闻资讯</a>
                        <a href="#">联系我们</a>
                        <a href="#">更多内容</a>
                    </nav>
                    <div className="auth-buttons">
                        <Link to="/register" className="register-btn">注册</Link>
                        <Link to="/login" className="login-btn">登录</Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="main-content">
                <div className="text-section">
                    <h1>MedixAI</h1>
                    <p>欢迎登录医院检测单网站，通过填写以下信息进行登录。</p>
                    <Link to="/learn-more" className="learn-more-btn">了解更多</Link>
                </div>
                <div className="image-section">
                    <img src={mainImage} alt="MRI Scan" />
                </div>
            </main>

            {/* Footer */}
            <footer className="footer-container">
                <div className="footer-content">
                    <div className="footer-column">
                        <h4>医院检测单</h4>
                    </div>
                    <div className="footer-column">
                        <h4>关于我们</h4>
                        <ul>
                            <li><a href="#">联系我们</a></li>
                            <li><a href="#">加入我们</a></li>
                            <li><a href="#">服务条款</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>帮助中心</h4>
                        <ul>
                            <li><a href="#">常见问题</a></li>
                            <li><a href="#">使用指南</a></li>
                            <li><a href="#">意见反馈</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>相关资源</h4>
                        <ul>
                            <li><a href="#">医院资讯</a></li>
                            <li><a href="#">检查技术</a></li>
                            <li><a href="#">疾病知识</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>关注我们</h4>
                        <div className="social-icons">
                            <img src={socialIcons} alt="Social Icons" />
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>©2023 产品版权所有。保留所有权利。</p>
                    <div className="footer-links">
                        <a href="#">隐私政策</a>
                        <a href="#">服务条款</a>
                        <a href="#">Cookie设置</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;

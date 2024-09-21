// src/NewsList.js
import React, { useEffect, useState } from 'react';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:5000/news');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data); // 调试输出
        setNews(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Latest News</h1>
      <ul className="news-list">
        {news.length > 0 ? (
          news.slice(0, 5).map((item, index) => (
            <li key={index}>
              <h3>{item.title ? item.title : "No Title"}</h3>
              {item.image && (
                <img src={item.image} alt={item.title} style={{ width: '200px', height: 'auto' }} />
              )}
              <br />
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </li>
          ))
        ) : (
          <p>No news available</p>
        )}
      </ul>
    </div>
  );
};

export default NewsList;

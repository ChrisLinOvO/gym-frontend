import React, { useState, useEffect } from "react"
import { Link, withRouter } from "react-router-dom"

import "./Articles.scss"

import ArticleCard from "../../component/article-card/ArticleCard"
import ArticlePopular from "../../component/article-popular/ArticlePopular"

function Articles() {
  const [allArticles, setAllArticles] = useState([])

  const [text, setText] = useState("")

  function handleClick(value) {
    setText(value);
  }

  //取得文章列表資料
  async function getData() {
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request("http://localhost:5000/api/articles", {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "appliaction/json",
      }),
    });
    const response = await fetch(request);
    const data = await response.json();
    // console.log(data);
    // 設定資料
    setAllArticles(data);
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <>

      {/* <div className="articlesHomePage"> */}
        <div className="articleCategory">
          <button
            className="articleCategoryButton"
            onClick={() => {
              handleClick("");
            }}
          >
            全部
          </button>
          <button
            className="articleCategoryButton"
            onClick={() => {
              handleClick("重訓技巧");
            }}
          >
            重訓技巧
          </button>

          <button
            className="articleCategoryButton"
            onClick={() => {
              handleClick("體脂控制");
            }}
          >
            體脂控制
          </button>
          <button
            className="articleCategoryButton"
            onClick={() => {
              handleClick("健康飲食");
            }}
          >
            健康飲食
          </button>
          <button
            className="articleCategoryButton"
            onClick={() => {
              handleClick("提升免疫力");
            }}
          >
            提升免疫力
          </button>
          <button
            className="articleCategoryButton"
            onClick={() => {
              handleClick("減肥");
            }}
          >
            減肥
          </button>
        </div>

        <Link to="./articlesAdd">
          <div className="articleHomePageAdd">
            <button className="articleHomePageAdd-btn">發表文章</button>
          </div>
        </Link>
        <div className="article-page">
          <div className="article-container-left">
            <ArticleCard
              text={text}
              allArticles={allArticles}
              setAllArticles={setAllArticles}
            />
          </div>
          <div className="article-container-right">
            <div className="article-popular-top">人氣文章排行</div>
            <ul className="article-popular-list">
              <ArticlePopular />
            </ul>
          </div>
        </div>
      {/* </div> */}
    </>
  );
}

export default withRouter(Articles)

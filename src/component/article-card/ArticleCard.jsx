import React from "react" 
import { Link, withRouter } from "react-router-dom"
import axios from "axios"
import Moment from "react-moment"

import "./ArticleCard.scss"
import { AiFillLike } from "react-icons/ai"

const ArticleCard = (props) => {
  const { text, allArticles, setAllArticles } = props

 //取得個別文章資料
  function handleClick(articleId) {
    const result = axios.get(
      `http://localhost:5000/api/articles/${articleId}`,
      {
        method: "GET",
        credentials: "include", // 需傳送 Cookie 必須開啟
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
        data: {},
      }
    );
    setAllArticles(result)
  }

  
//類別篩選
  function change() {
    let update = allArticles.filter((item) => {
      return item.categoryName.indexOf(text) !== -1;
    });
    // console.log(update);

    const card = update.map((v) => {
      return (
        <>
          <div className="item">
            <div className="card-container" key={v.articleId}>
              <img className="card-img" src={v.articleImages} ></img>
              <div className="card-body">
                <div className="card-body-top">
                  <img className="member-avatar" src={v.memberImg} alt=""></img>
                  <div className="membar-info">
                    <h4>{v.memberNickname}</h4>
                    <Moment format="YYYY-MM-DD HH:mm">{v.created_at}</Moment>
                  </div>
                </div>
                <div className="card-body-mid">
                  <Link to={"/articles/" + v.articleId}>
                    <h4
                      className="articleTitle"
                      onClick={() => {
                        handleClick(v.articleId);
                        // console.log(v.articleId);
                      }}
                    >
                      {v.articleTitle}
                    </h4>
                  </Link>
                  <div className="card-category">
                    <div className="card-category-parent">{v.categoryName}</div>
                  </div>
                  <div className="articleContent">{v.articleContent}</div>

                  <div className="card-tag">
                    <div className="card-tag1">{v.tagName1}</div>
                    <div className="card-tag2">{v.tagName2}</div>
                  </div>
                </div>
                <div className="card-body-under">
                  <div className="card-like">
                    <div className="icon">
                      <AiFillLike />
                    </div>
                    <p>{v.articleLike}</p>
                  </div>
                  <div className="card-comment">
                    <p>留言</p>
                    <p></p>
                  </div>
                  <div className="card-watch">
                    <p>瀏覽人數</p>
                    <p>800</p>
                  </div>
                </div>
              </div>
            </div></div>
        </>
      );
    });
    return card;
  }

  return (
    <>
      <div className="masonry">
        {change()}
      </div>
    </>
  );
};

export default withRouter(ArticleCard)

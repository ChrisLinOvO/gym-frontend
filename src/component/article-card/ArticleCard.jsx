import React, { useState,useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";

import "./ArticleCard.scss";
import { AiFillLike } from "react-icons/ai";

const ArticleCard = (props) => {
  const { text, allArticles, setAllArticles } = props;
  console.log(props.allArticles)
    // console.log(props.allArticles[0]);
  const [getArticleId, setGetArticleId] = useState("");

  const [commentsNum, setCommentsNum] = useState("");
  console.log(commentsNum);
  console.log(props.match.params)
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
    setGetArticleId(result);
    // console.log(result);

  }

  async function getCommentsNumber() {
    // 開啟載入指示
    // setDataLoading(true)

    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(
      `http://localhost:5000/api/articles/getCommentsNumber/${props.match.params.articleId}`,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "appliaction/json",
        }),
      }
    );

    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
    for (let i of data) {
      console.log("test" + Object.values(i));
      setCommentsNum(Object.values(i));
    }
    // 設定資料
  }
  useEffect(() => {
    getCommentsNumber();
  }, []);


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
                <img className="member-avatar" src={v.memberImg}></img>
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
                  <p>1000</p>
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
export default withRouter(ArticleCard);

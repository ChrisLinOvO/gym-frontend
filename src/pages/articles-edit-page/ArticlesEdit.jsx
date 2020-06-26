import React, { useState, useEffect } from "react";
import { withRouter, useParams, Link } from "react-router-dom";
import "./ArticlesEdit.scss";
import axios from "axios";

function ArticlesEdit(props) {
  const [Data, setData] = useState("");

  // console.log(Data);
  const userId = useParams().memberId;
  console.log(userId);

  useEffect(() => {
    const FetchData = async (userId) => {
      const result = await axios(
        `http://localhost:5000/api/articles/member/${userId}`
      );
     
      setData(result.data);
    };
    FetchData(props.match.params.memberId);
  }, []);

  async function articleDataDelete() {
    console.log(props.match.params.articleId);
    // 開啟載入指示
    // setDataLoading(true)

    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(
      `http://localhost:5000/api/articles/articlesEdit/${props.match.params.articleId}`,
      {
        method: "POST",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "appliaction/json",
        }),
      }
    );
      
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
    
  }

  return (
    <>
      <div className="articleContainer">
        <div className="edit-list-container">
          <ul className="edit-list">
            <li>文章編號</li>
            <li>文章標題</li>
            <li>文章內容</li>
            <li>功能</li>
          </ul>
        </div>
        {Data
          ? Data.map((list, index) => (
              <div className="articleItem">
                <ul className="articleList " key={index}>
                  <li className="articleListId">{list.articleId}</li>
                  <li className="articleListTitle">{list.articleTitle}</li>
                  <li className="articleListContent">{list.articleContent}</li>
                  <div className="features">
                  <Link to={`/ArticlesUpdate/${list.articleId}`}>
                    <button>編輯</button>
                  </Link>
                  <button onClick={articleDataDelete}>刪除</button></div>
                </ul>
              </div>
            ))
          : ""}
      </div>
    </>
  );
}
export default withRouter(ArticlesEdit);

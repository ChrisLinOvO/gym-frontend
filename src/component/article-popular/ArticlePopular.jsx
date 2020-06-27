import React, { useState, useEffect } from "react";
import "./ArticlePopular.scss";
import { AiFillLike } from "react-icons/ai";

function ArticlePopular(props) {
  const { popular, setPopular } = props;
  const [hotdata, setHotdata] = useState("");

  async function getHotData() {
    // 開啟載入指示
    // setDataLoading(true)

    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(
      `http://localhost:5000/api/articles/getHotData/1`,
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
    // console.log(data[0]);
    setHotdata(data);
  }

  useEffect(() => {
    getHotData();
  }, []);

  return (
    <>
   
         
      {hotdata
      
        ? hotdata.map((list, index) => (
         
            <div className="hotArticle" key={index}>
            
              <div className="hotArticle-title">{list.articleTitle}</div>
              <div className="hotArticle-under">
                <div className="hotArticle-like">
                  <div className="icon">
                    <AiFillLike />
                  </div>
                  <p>{list.articleLike}</p>
                </div>
                <div className="hotArticle-comment">
                  <p>留言</p>
                  <p>30</p>
                </div>
                <div className="hotArticle-watch">
                  <p>瀏覽人數</p>
                  <p>20</p>
                </div>
              </div>
            </div>
          ))
        : ""}
    </>
  );
}

export default ArticlePopular;
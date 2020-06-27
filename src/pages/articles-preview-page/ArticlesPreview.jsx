import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./ArticlesPreview.scss";
import Moment from "react-moment";
import { AiFillLike } from "react-icons/ai";
import MyTextInput from "../../component/article-comment/MyTextInput";

import { createStructuredSelector } from "reselect";
import { currentUserSelect } from "../../redux/user/user-selector"


const ArticlesPreview = (props) => {

  const { currentUserData } = props
  //該使用者的id
  const currentUserId = currentUserData ? currentUserData.memberId : ''
  console.log(currentUserId)
  console.log(currentUserData.memberNickname)


  const [Data, setData] = useState();

// const [count, setCount] = useState(articleLike);
  const [articleId, setArticleId] = useState();
  const [memberId, setMemberId] = useState(1);
  const [memberName, setMemberName] = useState("");
  const [content, setContent] = useState("");
  const [memberImg, setMemberImg] = useState("");

  const [comments, setComments] = useState("");
  const [commentsNum, setCommentsNum] = useState("");
  console.log(commentsNum);

  useEffect(() => {
    setArticleId(props.match.params.articleId);
  }, [articleId]);
  // console.log(props.match.params)

  useEffect(() => {
    const FetchData = async (id) => {
      const result = await axios(`http://localhost:5000/api/articles/${id}`);
      setData(result.data);
    };
    FetchData(props.match.params.articleId);
  }, []);

  // function total() {
  //   setEnterE(inputText);
  //   setInputText("");
  // }

  async function addToSever(item) {
    // 注意資料格式要設定，伺服器才知道是json格式
    console.log(item);
    axios.post(
      `http://localhost:5000/api/articles/postComments/:articleId`,
      {
        method: "POST",
        credentials: "include", // 需傳送 Cookie 必須開啟
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
        data: {
          articleId: item.articleId,
          memberId: item.memberId,
          memberName: item.memberName,
          content: item.content,
          memberImg: item.memberImg,
        },
      },
      window.location.reload()
    );
  }

  async function getAddCommentsData() {
    // 開啟載入指示
    // setDataLoading(true)

    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(
      `http://localhost:5000/api/articles/getComments/${props.match.params.articleId}`,
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
    // 設定資料
    setComments(data);
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
    getAddCommentsData();
  }, []);
  useEffect(() => {
    console.log(comments);
  }, [comments]);
  useEffect(() => {
    getCommentsNumber();
  }, []);

  return (
    <>
      <div className="articles-preview-container">
        {Data
          ? Data.map((list, index) => (
              <>
                <div className="contentCard-container" key={index}>
                  <div className="card-top">
                    <div className="membar">
                      <img className="member-avatar" src={list.memberImg}></img>
                      <div className="membar-info">
                        <h4>{list.memberNickname}</h4>
                        <Moment format="YYYY-MM-DD HH:mm">
                          {list.created_at}
                        </Moment>
                      </div>
                    </div>
                  </div>
                  <div className="card-body-mid">
                    <h1>{list.articleTitle}</h1>
                    <div className="card-category">
                      <div className="card-category-parent">
                        {list.categoryName}
                      </div>
                    </div>
                    <p>{list.articleContent}</p>
                    <img src={list.articleImages}></img>
                    <div className="card-tag">
                      <div className="card-tag1">{list.tagName1}</div>
                      <div className="card-tag2">{list.tagName2}</div>
                    </div>
                  </div>
                  <div className="card-body-under">
                    <div className="card-like">
                      <div className="icon">
                        <AiFillLike />
                      </div>
                      <p>{list.articleLike}</p>
                    </div>
                    <div className="card-comment">
                      <p>留言</p>
                      <p>{commentsNum}</p>
                    </div>
                    <div className="card-watch">
                      <p>瀏覽人數</p>
                      <p>800</p>
                    </div>
                  </div>
                </div>
                <div className="ArticleContentCard">
                  <div className="line"></div>
                  <div className="articleCommentCard">
                    <p>{commentsNum}則留言</p>
                    <div className="membar-comment">
                      <img className="member-avatar" src={currentUserData.memberImg}></img>
                      <MyTextInput
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                      />

                      <button
                        type="button"
                        onClick={() => {
                          addToSever({
                            content,
                            articleId,
                            memberId,
                            memberName,
                            memberImg,
                          });
                        }}
                      >
                        發佈
                      </button>
                    </div>
                    <p>熱門留言</p>
                    {comments
                      ? comments.map((list, index) => (
                          <div className="article-comment" key={index}>
                            <img
                              className="member-avatar-res"
                              src={currentUserData.memberImg}
                            ></img>
                            <div className="member-info">
                              <div className="info">
                                <h5>{currentUserData.memberNickname}</h5>
                                <Moment className="time" format="YYYY-MM-DD HH:mm">
                                  {list.created_at}
                                </Moment>
                              </div>
                              <div className="commentText">{list.content}</div>
                            </div>
                          </div>
                        ))
                      : ""}
                  </div>
                </div>
              </>
            ))
          : ""}
      </div>
    </>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUserData: currentUserSelect,
});

export default withRouter(connect(mapStateToProps)(ArticlesPreview));


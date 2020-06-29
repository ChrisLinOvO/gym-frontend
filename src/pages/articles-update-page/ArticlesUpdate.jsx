import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./ArticlesUpdate.scss";
import axios from "axios";
import Moment from "react-moment";

import { createStructuredSelector } from "reselect";
import { currentUserSelect } from "../../redux/user/user-selector"

function ArticlesUpdate(props) {


  const { currentUserData } = props
  //該使用者的id
  // const currentUserId = currentUserData ? currentUserData.memberId : ''
  const currentUserImg = currentUserData ? currentUserData.memberImg : ''
  const currentUserNickname = currentUserData ? currentUserData.memberNickname : ''
 

  const {
    match: { params },
  } = props;
  const { articleId } = params;

  const [Data, setData] = useState();

  // const [memberId, setMemberId] = useState(currentUserId);
  // const [memberName, setMemberName] = useState("");
  // const [articleId, setArticleId] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [tagName1, setTagName1] = useState("");
  const [tagName2, setTagName2] = useState("");
  // const [memberImg, setMemberImg] = useState("");
  const [articleImages, setArticleImages] = useState("");
  const [avatarFile, setAvatarFile] = useState("");

  //圖片更新後轉base64存進資料庫
  const handleImgChange = (event) => {
    let input = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function () {
      let dataURL = reader.result;
      setArticleImages(dataURL)
    };
    reader.readAsDataURL(input);
  };

  //上傳圖片 即時顯示

  const handleImgDisplay = (event) => {

    setAvatarFile(URL.createObjectURL(event.target.files[0]));

    setArticleImages(event.target.files[0]);
  };
  useEffect(() => {
    const FetchData = async (articleId) => {
      const result = await axios(
        `http://localhost:5000/api/articles/articleItem/${articleId}`
      );
      console.log(result);
      setData(result.data);
      setArticleTitle(result.articleTitle);
      setCategoryName(result.categoryName);
      setArticleContent(result.articleContent);
      setArticleImages(result.articleImages);
      setTagName1(result.tagName1);
      setTagName2(result.tagName2);
     

    };
    FetchData(props.match.params.articleId);
  }, [props.match.params.articleId]);

  async function articleDataUpdate(item) {
    console.log(item);

    // 注意資料格式要設定，伺服器才知道是json格式
    axios.post(
      `http://localhost:5000/api/articles/articlesUpdate/${articleId}`,
      {
        method: "POST",
        credentials: "include", // 需傳送 Cookie 必須開啟
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
          
        }),
        data: {
          articleId: item.articleId,
          // memberId: item.memberId,
          // memberName: item.memberName,
          articleTitle: item.articleTitle,
          categoryName: item.categoryName,
          articleContent: item.articleContent,
          tagName1: item.tagName1,
          tagName2: item.tagName2,
          articleImages: item.articleImages,
          // memberImg: item.memberImg,
        },
      }
    );
  }

  return (
    <>
      {Data
        ? Data.map((list, index) => (
            <div className="articleUpdate-container " key={index}>
              <div className="articleUpdate-container-top">
              <div className="membar">
                <img className="member-avatar" src={currentUserImg} alt=""></img>
                <div className="membar-info">
                  <h4>{currentUserNickname}</h4>
                  <Moment format="YYYY-MM-DD HH:mm">{list.created_at}</Moment>
                </div>
              </div>
                <label className="updateLabel">
                  <h2>點選發表類別：</h2>
                  <select
                    className="select1"
                    defaultValue={list.categoryName}
                    onChange={(event) => {
                      setCategoryName(event.target.value);
                    }}
                  >
                    <option>重訓技巧</option>
                    <option>體脂控制</option>
                    <option>健康飲食</option>
                    <option>提升免疫力</option>
                    <option>減肥</option>
                  </select>
                </label>

                <div className="updateTag">
                  <h2>請輸入標籤:</h2>
                  <input
                    name="updateTagName1"
                    type="text"
                    placeholder="輸入標籤"
                    defaultValue={list.tagName1}
                    className="updateTagName1"
                    onChange={(event) => setTagName1(event.target.value)}
                  />
                  <input
                    name="updateTagName2"
                    type="text"
                    placeholder="輸入標籤"
                    defaultValue={list.tagName2}
                    className="updateTagName2"
                    onChange={(event) => setTagName2(event.target.value)}
                  />
                </div>
              </div>
              
              <input
                type="text"
                name="articleTitle"
                defaultValue={list.articleTitle}
                placeholder="請輸入標題"
                className=" updateInputTitle"
                onChange={(event) => setArticleTitle(event.target.value)}
              />
              <br />
              <textarea
                name="updateContent"
                className="updateContent"
                defaultValue={list.articleContent}
                placeholder="請輸入內文"
                onChange={(event) => setArticleContent(event.target.value)}
              />

              <div className="updateData">
                <h2>上傳檔案</h2>
                <input
                  name="updateImg"
                  className="inputavatar"
                  // value={list.articleImages}
                  type="file"
                  onChange={(event) => {
                    handleImgChange(event);
                    handleImgDisplay(event);
                  }}
                />
              </div>
              
              <img
                className="updateImg"
                src={avatarFile ? avatarFile : list.articleImages} alt=""
             />
              <div className="updateBtn">
                <button
                  onClick={(e) => {}}
                  className=" updateCancle"
                  type="button"
                >
                  取消
                </button>

                <button
                  type="button"
                  onClick={() => {
                    articleDataUpdate({
                      // memberId,
                      // memberName,
                      articleTitle,
                      categoryName,
                      articleContent,
                      tagName1,
                      tagName2,
                      articleImages,
                      // memberImg,
                    });
                    props.history.push("/articlesEdit");
                  }}
                >
                  更新
                </button>
              </div>
            </div>
          ))
        : ""}
    </>
  );
}
const mapStateToProps = createStructuredSelector({
  currentUserData: currentUserSelect,
});

export default withRouter(connect(mapStateToProps)(ArticlesUpdate));


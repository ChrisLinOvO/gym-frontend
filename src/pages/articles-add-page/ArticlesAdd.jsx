import React, { useState } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom";

import "./ArticlesAdd.scss"
import axios from "axios";

import { createStructuredSelector } from "reselect";
import { currentUserSelect } from "../../redux/user/user-selector"

function ArticlesAdd(props) {
  const { currentUserData } = props
  //該使用者的id
  const currentUserId = currentUserData ? currentUserData.memberId : ''
  // console.log(currentUserId)
  // console.log(currentUserData.memberNickname)


  const [memberId] = useState(currentUserId);
  const [memberName] = useState("");
  // const [articleId, setArticleId] = useState();
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [tagName1, setTagName1] = useState("");
  const [tagName2, setTagName2] = useState("");
  const [memberImg] = useState("");
  const [articleImages, setArticleImages] = useState("");
  const [imgDataFiles, setImgDataFiles] = useState();

  const handleImgChange = (event) => {
    setArticleImages(URL.createObjectURL(event.target.files[0]));
    setImgDataFiles(event.target.files[0]);
  };

  //上傳圖片 即時顯示
  const [avatarFile, setAvatarFile] = useState("");
  const [avatarDataFiles, setAvatarDataFiles] = useState("");
  const handleChange = (event) => {
    // console.log(event.target.files);
    setAvatarFile(URL.createObjectURL(event.target.files[0]));
    // console.log(event.target.files[0]);
    setAvatarDataFiles(event.target.files[0]);
  };

  async function addArticleToSever(item) {
    // 注意資料格式要設定，伺服器才知道是json格式
    // console.log(item);
    axios.post(`http://localhost:5000/api/articles/add`, {
      method: "POST",
      credentials: "include", // 需傳送 Cookie 必須開啟
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      data: {
        memberId: item.memberId,
        memberName: item.memberName,
        // articleId: item.articleId,
        articleTitle: item.articleTitle,
        categoryName: item.categoryName,
        articleContent: item.articleContent,
        tagName1: item.tagName1,
        tagName2: item.tagName2,
        articleImages: item.articleImages,
        memberImg: item.memberImg,
      },
    });
  }

  return (
    <>
      <div className="articleAdd-container">
        <div className="articleAdd-container-top">
          <label className="addLabel">
            <h2>點選發表類別：</h2>
            <select
              className="select"
              value={categoryName}
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

          <div className="addTag">
            <h2>請輸入標籤:</h2>
            <input
              name="addTagName1"
              type="text"
              placeholder="輸入標籤"
              value={tagName1}
              className="addTagName1"
              onChange={(event) => setTagName1(event.target.value)}
            />
            <input
              name="addTagName2"
              type="text"
              placeholder="輸入標籤"
              value={tagName2}
              className="addTagName2"
              onChange={(event) => setTagName2(event.target.value)}
            />
          </div>
        </div>
        <div className="memberInfo">
        <img
          className ="member-avatar"
           src={currentUserData.memberImg}
        ></img>
        <div>{currentUserData.memberNickname}</div>
        </div>
        
        <input
          type="text"
          name="articleTitle"
          value={articleTitle}
          placeholder="請輸入標題"
          className=" addInputTitle"
          onChange={(event) => setArticleTitle(event.target.value)}
          required
        />
        <br />
        <textarea
          name="addContent"
          className="addContent"
          value={articleContent}
          placeholder="請輸入內文"
          onChange={(event) => setArticleContent(event.target.value)}
        />

        <label class="addData">
          <h2>上傳檔案</h2>
          <input
            name="addImg"
            className="inputavatar"
            type="file"
            onChange={(event) => {
              handleChange(event);
              handleImgChange(event);
            }}
          />
        </label>
        <img className="addImg" src={avatarFile ? avatarFile : imgDataFiles} />
        <div className="addBtn">
          <button onClick={(e) => { }} className=" addCancle" type="button">
            取消
          </button>

          <button
            type="button"
            onClick={() => {
              addArticleToSever({
                memberId,
                memberName,
                articleTitle,
                categoryName,
                articleContent,
                tagName1,
                tagName2,
                articleImages,
                memberImg,
              });
              props.history.push("/articles");
            }}
          >
            發佈
          </button>
        </div>

      </div>
    </>
  );
}
const mapStateToProps = createStructuredSelector({
  currentUserData: currentUserSelect,
});

export default withRouter(connect(mapStateToProps)(ArticlesAdd));

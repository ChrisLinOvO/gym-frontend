import React from "react";
import "./Home.scss";
import GYM2 from "../../API/GYM.mp4";
import PhotosImgbackground from "./PhotosImgbackground1.png";
import PhotosImgFront from "./PhotosImgFront.png";
import CoachBackGround from "./CoachBackGround.jpg";
const HomePage = () => {
  window.onscroll = function () {
    var windowH = document.documentElement.clientHeight; //網頁可視區域高度
    //windowH = window.innerHeight;
    //windowH=window.scrollY;
    // var documentH = document.documentElement.offsetHeight;
    //documentH=document.documentElement.offsetHeight;
    var scrollH = document.documentElement.scrollTop;
    // console.log(windowH);
    // console.log(scrollH);
    // console.log(documentH);

    if (windowH + scrollH >= 1000) {
      const VideoScroll = document.getElementById("VideoScroll");

      // VideoScroll.style.bottom = "200px";
      // VideoScroll.style.left = "20%";
    }
  };

  return (
    <>
      <div className="VideoContainer">
        <video autoPlay loop muted className="video">
          <source src={GYM2} type="video/mp4" />
        </video>
        <div id="VideoScroll" className="VideoScroll">
          <h3>關於我們</h3>
          <span>
            尖頂是數位顧問公司，幫助客戶找出機會、創造體驗成為系統，從科技轉變中獲利。
            <br />
            Acme is a digital consultancy that identifies opportunities, creates
            experiences and builds systems to help our clients benefit from
            technological change.
          </span>
        </div>
      </div>
      <div className="HomePageContainer">
        <div className="NewsPageContainer">
          <div className="ImgContainer">
            <figure className="GYMImagePhotos">
              <img className="objcetFit" src={PhotosImgbackground} alt=""></img>
            </figure>
            <figure className="GYMImagePhotos2">
              <img className="objcetFit" src={PhotosImgFront} alt=""></img>
            </figure>
          </div>
          <div className="NewsFont">
            <h3 className="title">
              <span className="news">最新消息</span>
            </h3>

            <span className="NewsFontIntroduction">
              包含最熱門的飛輪、 舞蹈、瑜珈、LESM ILLS、MOSSA與獨
              家系列，有氧老師 師資也非常充足與 專業，滿足您隨時 想上課的需求。
              Including the most popular flywheels, dance, yoga, LESM ILLS,
              MOSSA and exclusive series, the aerobic teacher is also very
              adequate and professional, to meet your needs at any time.
            </span>
            <br />
            <button className="btn draw-border">了解更多</button>
          </div>
        </div>
      </div>

      <div className="CoachBoxPageContainer">
        <div className="bg-text">
          <div className="CoachTitle">
            <h3>Coach List</h3>
          </div>
          <div className="CoachBox Coach grd">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <img className="objcetFit" src={CoachBackGround} alt="" />
          </div>
          <div className="CoachBox Coach grd">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <img className="objcetFit" src={PhotosImgbackground} alt="" />
          </div>
          <div className="CoachBox Coach grd">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <img className="objcetFit" src={PhotosImgbackground} alt="" />
          </div>
          <div className="CoachBox Coach4 grd">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <img className="objcetFit" src={PhotosImgbackground} alt="" />
          </div>
        </div>
      </div>

      <div className="HomePageContainer">
        <div className="ProductBoxPageContainer">
          <div className="CoachTitle">
            <h3>最新課程</h3>
          </div>
          <div className="ProductBox">
            <img className="objcetFit" src={PhotosImgbackground} alt="" />
            <div className="nameShadow">小明</div>
          </div>
          <div className="ProductBox">
            <img className="objcetFit" src={PhotosImgbackground} alt="" />
            <div className="nameShadow">小明</div>
          </div>
          <div className="ProductBox">
            <img className="objcetFit" src={PhotosImgbackground} alt="" />
            <div className="nameShadow">小明</div>
          </div>
          <div className="ProductBox">
            <img className="objcetFit" src={PhotosImgbackground} alt="" />
            <div className="nameShadow">小明</div>
          </div>
          <div className="ProductBox">
            <img className="objcetFit" src={PhotosImgbackground} alt="" />
            <div className="nameShadow">小明</div>
          </div>
          <div className="ProductBox">
            <img className="objcetFit" src={PhotosImgbackground} alt="" />
            <div className="nameShadow">小明</div>
          </div>
          <div className="ProductBox">
            <img className="objcetFit" src={PhotosImgbackground} alt="" />
            <div className="nameShadow">小明</div>
          </div>
          <div className="ProductBox">
            <img className="objcetFit" src={PhotosImgbackground} alt="" />
            <div className="nameShadow">小明</div>
          </div>
          <div className="ProductBox">
            <img className="objcetFit" src={PhotosImgbackground} alt="" />
            <div className="nameShadow">
              <span>小明</span>
            </div>
          </div>
          <div className="ProductBox">
            <img className="objcetFit" src={PhotosImgbackground} alt="" />
            <div className="nameShadow">小明</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;

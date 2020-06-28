import React, { useState } from "react";
import "./CourseBox.scss";
import CJumpWindow from "../c-jump-window/CJumpWindow";
import SJumpWindow from "../s-jump-window/SJumpWindow";
import { Link } from "react-router-dom";
// import ControllerButton from '../controller-button/controllerButton'
function CourseBox(props) {
  let t = props.course.courseTime;
  // console.log('t', t)
  // console.log(t.split(/[- T .]/))
  let newT = t.split(/[' ']/)[3];
  // console.log(newT)
  const [cModalShow, setCModalShow] = useState(false);
  const [sModalShow, setSModalShow] = useState(false);

  // console.log(props)

  async function bookingCourse() {
    // console.log('yeeee')
    //b = localStorage裡的資料
    const b = JSON.parse(localStorage.getItem("member"));

    //c = 點擊預約後抓該課程資料
    const c = [
      {
        courseId: props.course.courseId,
        staffId: props.course.staffId,
        courseName: props.course.courseName,
        courseCategoryName: props.course.courseCategoryName,
        courseTime: props.course.courseTime,
        courseHour: props.course.courseHour,
        numberOfCourse: props.course.numberOfCourse,
        courseQuoda: props.course.courseQuoda,
      },
    ];
    console.log("b:", b);
    //將b跟c陣列中的物件合併

    // const d = Object.assign(b[0], c[0]);

    //將資料轉成json字串格式
    // await localStorage.setItem('member', JSON.stringify(d))
    // console.log(d)

    // const request = new Request("http://localhost:5000/api/insertCourse", {
    //   method: "POST",
    //   body: JSON.stringify(d),
    //   headers: new Headers({
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   }),
    // });
    // const response = await fetch(request)
    // const data = await response.json()
  }

  return (
    <>
      <div className="courseBox">
        <div onClick={() => setCModalShow(true)}>{props.course.courseName}</div>

        <div className="courseTime">{newT}</div>
        {/* <div className="courseTime">{props.course.staffId}</div> */}
        <div onClick={() => setSModalShow(true)} className="coachName">
          {props.course.Ename}
        </div>
        {/* <a onClick={} className="booking btn">已報名</a> */}
        {/* <a className="bookingFull btn">已額滿</a> */}

        <Link to={() => bookingCourse()} className="accessBooking btn">
          預約
        </Link>
      </div>
      <div className="jumpWindow">
        {cModalShow && (
          <CJumpWindow
            show={cModalShow}
            onHide={() => setCModalShow(false)}
            courseName={props.course.courseName}
            courseIntroduce={props.course.courseIntroduce}
            courseImg={props.course.courseImg}
          />
        )}
        {sModalShow && (
          <SJumpWindow
            show={sModalShow}
            onHide={() => setSModalShow(false)}
            coachName={props.course.Ename}
            //專長
            coachExpertise={props.course.Eexpertise}
            //證照
            coachLicense={props.course.Elicense}
            coachImg={props.course.Eimg}
          />
        )}
      </div>
    </>
  );
}

export default CourseBox;

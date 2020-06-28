import React, { useState, useEffect, useCallback } from "react";
import "./Courses.scss";
import CourseInformation from "../../component/course-information/CourseInformation";
import Selector from "../../component/course-selector/CourseSelector";
import CourseCalender from "../../component/course-calender/CourseCalender";

function Courses(props) {
  const [allCourses, setAllCourses] = useState([]);
  const [choose, setChoose] = useState([]);
  const [newCourses, setNewCourses] = useState([]);
  const [coaches, setCoaches] = useState([]);
  // console.log('app.js',newCourses)

  async function getData() {
    // 開啟載入指示
    // setDataLoading(true)
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request("http://localhost:5000/api/courses/data", {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });

    const response = await fetch(request);
    const data = await response.json();

    // console.log(data)
    // 設定資料
    setAllCourses(data);
    setChoose(data);
    // console.log(data)
  }
  async function getCoachesData() {
    // 開啟載入指示
    // setDataLoading(true)
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request("http://localhost:5000/api/employee", {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });

    const response = await fetch(request);
    const data = await response.json();

    // console.log(data)
    // 設定資料
    setCoaches(data);
  }
  // const introduce = allCourses.map(introduce =>(
  //   introduce.categoryIntroduce
  // ))

  // console.log('introduce:'+introduce)
  async function getCategoryData() {
    // 開啟載入指示
    // setDataLoading(true)
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request("http://localhost:5000/api/category", {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });

    const response = await fetch(request);
    const data = await response.json();

    // console.log(data)
    // 設定資料
    setChoose(data);
  }

  const handleChange = useCallback((e) => {
    // console.log(allCourses)
    // console.log(e.target.value)
    // setChoose(e.target.value)
    const oop = e.target.value;
    const renewCourses =
      allCourses.coursesRow &&
      allCourses.coursesRow.filter(
        (course) => course.courseCategoryName === oop
      );

    // console.log("renewCourses",renewCourses)

    setNewCourses(renewCourses);

    // const b = allCourses.coursesRow ? renewCourses : ''
    // console.log('aa',{ ...choose })
    if (!allCourses.coursesRow) {
      const aa = { ...choose };
      setChoose(aa);

      // setAllCourses([b])
    }
  }, []);
  useEffect(() => {
    getData();
    getCoachesData();
    getCategoryData();
    handleChange({ target: { value: "有氧教室" } });
    console.log("fire");
  }, []);

  return (
    <>
      <header className="navbar">
        <div className="logo">
          <img src="./img/logo2.jpg" alt="logo" />
        </div>
      </header>
      <div className="banner">
        {/* <img  alt="logo" src={logo} /> */}

        <h1>課程資訊 Class information</h1>
      </div>
      <div className="container">
        <CourseInformation
          // introduce={introduce}
          // setIntroduce={setIntroduce}
          setChoose={setChoose}
          allCourses={allCourses}
        />
        <Selector
          // selector={information}
          choose={choose}
          setChoose={setChoose}
          allCourses={allCourses}
          setAllCourses={setAllCourses}
          handleChange={handleChange}
          // newCourses={newCourses}
          // setNewCourses={setNewCourses}
        />
        <CourseCalender
          choose={choose}
          setChoose={setChoose}
          allCourses={allCourses}
          setAllCourses={setAllCourses}
          newCourses={newCourses}
          coaches={coaches}
          setCoaches={setCoaches}
          mId={props.mId}
          setMId={props.setMId}
        />
      </div>
    </>
  );
}
export default Courses;

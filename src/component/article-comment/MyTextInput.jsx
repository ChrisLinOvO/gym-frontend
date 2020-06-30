import React from "react"
import "./MyTextInput.scss"
// 所有狀態與更動狀態均來自於上層父母元件
function MyTextInput(props) {
  const { value, onChange } = props;

  return (
    <>
      <input
       className="myCommentsInput"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="分享你的留言"
      />
    </>
  );
}

export default MyTextInput;

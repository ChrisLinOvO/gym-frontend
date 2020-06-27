import React, { useState } from "react";

function ArticleCounter() {

    const [count, setCount] = useState(0);

    return (
        <>
      
      <div
        className="chevron chevron-up"
        onClick={() => {
          setCount(count + 1);
        }}
      />
             
        </>
      );
    }
    
    export default ArticleCounter;
    
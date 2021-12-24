import React from "react";
import loader from "../../assets/images/loader.gif";

const Loading = () => {
  return (
    <div className="loading">
      <img height="100px" width="100px" src={loader} alt="" />
    </div>
  );
};

export default Loading;

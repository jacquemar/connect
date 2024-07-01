import React from 'react';
import loadingGif from "../assets/connect-gif.gif";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <img src={loadingGif} alt="Loading..."/>
    </div>
  );
};

export default Loading;
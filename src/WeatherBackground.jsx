import React from "react";

const WeatherBackground = ({ imageUrl }) => {
  const backgroundStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: -1,
  };

  return <div style={backgroundStyle}></div>;
};

export default WeatherBackground;

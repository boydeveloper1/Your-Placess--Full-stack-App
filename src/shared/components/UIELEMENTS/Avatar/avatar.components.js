import React from "react";

import "./avatar.styles.css";

const Avatar = ({ image, alt }) => {
  return (
    <div className="avatar">
      <img src={image} alt={alt} />
    </div>
  );
};

export default Avatar;

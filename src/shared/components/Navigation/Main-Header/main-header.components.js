import React from "react";

import "./main-header.styles.css";

const MainHeader = ({ children }) => {
  return <header className="main-header">{children}</header>;
};

export default MainHeader;

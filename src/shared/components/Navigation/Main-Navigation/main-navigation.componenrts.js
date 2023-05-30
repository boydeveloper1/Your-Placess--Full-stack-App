import React, { useState } from "react";
import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

import MainHeader from "../Main-Header/main-header.components";
import Navlinks from "../Nav-Links/nav-links.components";
import SideDrawer from "../Side-Drawer/side-drawer.components";
import Backdrop from "../../UIELEMENTS/Backdrop/backdrop.components";
import "./main-navigation.styles.css";

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  // to handle opening of the side drawer
  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  // to handle closing of the side drawer
  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <Navlinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <Link to="/">
          <h1 className="main-navigation__title">Your Places</h1>
        </Link>
        <nav className="main-navigation__header-nav">
          <Navlinks />
        </nav>
      </MainHeader>
      <Outlet />
    </Fragment>
  );
};

export default MainNavigation;

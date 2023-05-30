import React from "react";
import { NavLink } from "react-router-dom";

import "./nav-links.styles.css";
const Navlinks = () => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact="true">
          ALL USERS
        </NavLink>
      </li>
      <li>
        <NavLink to="/ul/places">MY PLACES</NavLink>
      </li>
      <li>
        <NavLink to="/places/new">ADD PLACE</NavLink>
      </li>
      <li>
        <NavLink to="/auth">AUTHENTICATE</NavLink>
      </li>
    </ul>
  );
};

export default Navlinks;

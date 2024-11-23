import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
        <li>
        <NavLink to="/auth">Authen</NavLink>
      </li>
        <li>
        <NavLink to="/">All Users</NavLink>
      </li>
      <li>
        <NavLink to="/u1/income">Income</NavLink>
      </li>
      <li>
        <NavLink to="/u1/expense">Expense</NavLink>
      </li>
      <li>
        <NavLink to="/">SignOut</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;

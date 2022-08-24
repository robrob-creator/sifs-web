import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as VscIcons from "react-icons/vsc";
import * as CgIcons from "react-icons/cg";
import profile from "../Pages/data/profile";
import logo from "./images/logo.png";

function Sidebar() {
  return (
    <>
      <div class="sidebar">
        <header>
          <img src={logo} alt="cabulohan-paradise-logo" className="image" />
          {profile.map((profiles, index) => {
            return <p>{profiles.teacher}</p>;
          })}
        </header>
        <Link to="/teacher/subjects">
          <FaIcons.FaHome className="icons" />
          <span>Home</span>
        </Link>

        <Link to="/teacher/feedback">
          <VscIcons.VscFeedback className="icons" />
          <span>Feedbacks</span>
        </Link>

        <Link to="/">
          <CgIcons.CgLogOut className="icons" />
          <span>Logout</span>
        </Link>
      </div>
    </>
  );
}

export default Sidebar;

import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import * as CgIcons from "react-icons/cg";
import profile from "../Pages/data/profile";
import logo from "./images/logo.png";
import { getProfile } from "../services/user";
import { getGrades, getGradesById } from "../services/grades";
import store from "store";

function Sidebar({ profile }) {
  let navigate = useNavigate();
  console.log(profile);
  return (
    <>
      <div class="sidebar">
        <header>
          <img src={logo} alt="cabulohan-paradise-logo" className="image" />

          <p className="parag">
            Student Name: {profile?.firstName}. {profile?.lastName}
            <br />
            Grade: {profile?.gradeLevel}
            <br />
            Strand: {profile?.strand_track}
            {/*<br />
            Section:
  <br />*/}
          </p>
        </header>

        <a
          onClick={() => {
            store.remove("accessToken");
            navigate("/");
          }}
        >
          <CgIcons.CgLogOut className="icons" />
          <span>Logout</span>
        </a>
      </div>
    </>
  );
}

export default Sidebar;

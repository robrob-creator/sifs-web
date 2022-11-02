import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import * as CgIcons from "react-icons/cg";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { getProfile } from "../services/user";
import profile from "../Pages/data/profile";
import logo from "./images/logo.png";
import store from "store";

function Admin_Sidebar() {
  const [profile, setProfile] = useState();
  let navigate = useNavigate();

  const fetchProfile = async () => {
    let res = await getProfile();
    setProfile(res?.data?.data?.profile);
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <div class="sidebar">
        <header>
          <img src={logo} alt="cabulohan-paradise-logo" className="image" />
          <p>
            {profile?.firstName.charAt(0)}. {profile?.lastName}
          </p>
        </header>
        <div
          style={{
            overflowY: "scroll",
            width: "100%",
            height: "300px",
            position: "relative",
            marginBottom: "100px",
          }}
        >
          {!profile?.role?.includes("teacher") && (
            <>
              <Link to="/admin/dashboard">
                <FaIcons.FaHome className="icons" />
                <span>Home</span>
              </Link>

              <Link to="/admin/teachers-dashboard">
                <FaIcons.FaUserTie className="icons" />
                <span>Teachers</span>
              </Link>

              <Link to="/admin/students-dashboard">
                <FaIcons.FaUserGraduate className="icons" />
                <span>Students</span>
              </Link>

              <Link to="/admin/subjects-dashboard">
                <FaIcons.FaBook className="icons" />
                <span>Subjects</span>
              </Link>
              <Link to="/admin/section-dashboard">
                <FaIcons.FaBook className="icons" />
                <span>Sections</span>
              </Link>
            </>
          )}
          {profile?.role?.includes("teacher") && (
            <Link to="/grade">
              <FaIcons.FaBook className="icons" />
              <span>Upload Grades</span>
            </Link>
          )}
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
      </div>
    </>
  );
}

export default Admin_Sidebar;

import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import * as CgIcons from "react-icons/cg";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from 'react-icons/md';
import { getProfile } from "../services/user";
import profile from "../Pages/data/profile";
import logo from "./images/logo.png";

function Admin_Sidebar() {
  const [profile, setProfile] = useState();
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
          <span>subjects</span>
        </Link>

        <Link to='/admin/account-choice'>
          <MdIcons.MdManageAccounts className='icons'/>
          <span>Accounts</span> 
        </Link>

        <Link to="/">
          <CgIcons.CgLogOut className="icons" />
          <span>Logout</span>
        </Link>
      </div>
    </>
  );
}

export default Admin_Sidebar;

import React, { useEffect, useState } from "react";
import "./css/container.css";
import "./css/table.css";
import "./css/icons.css";
import AdminSidebar from "../Components/Admin_Sidebar";
import subjects from "./data/subjects";
import * as MdIcons from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import { getUsers } from "../services/user";
import { getSections } from "../services/sections";

function AdminStudentInfo() {
  const [profile, setProfile] = useState();
  const [section, setSection] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  const getProfile = async () => {
    let id = searchParams.get("id");
    let res = await getUsers({ id });
    setProfile(res?.data?.data?.list[0]);
  };
  const getStudentSection = async () => {
    let id = searchParams.get("id");
    let res = await getSections({ student: id });
    setSection(res?.data?.data?.list);
  };
  useEffect(() => {
    getProfile();
    getStudentSection();
  }, []);
  console.log(section);
  return (
    <>
      <AdminSidebar />
      <div className="container">
        <div className="con">
          <h2 className="t-name">{`${profile?.lastName}, ${profile?.firstName}`}</h2>
          <div className="con-tab">
            {section?.map((item, index) => {
              return (
                <>
                  <h3 className="t-sub">Section: {item?.name} || Subjects</h3>
                  <table className="tbl-tch">
                    <thead>
                      <th>Subject Name</th>
                      <th>Units</th>
                      <th>Schedule</th>
                      {/* <th className="del-col">Delete</th>*/}
                    </thead>

                    <tbody>
                      {item?.subjects &&
                        item?.subjects?.map((sub, index) => {
                          return (
                            <tr>
                              <td data-label="Subject Name">
                                {sub.subject.name}
                              </td>
                              <td data-label="Units">{sub.subject.units}</td>
                              <td data-label="School year">
                                {sub?.subject?.schedule}
                              </td>
                              {/*  <td data-label="Delete">
                                <MdIcons.MdDelete className="icons-red" />
                          </td>*/}
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </>
              );
            })}
          </div>
          {/* <div className="row2">
            <div className="column">
              <select className="sel">
                <option value="IPT2">IPT2</option>
                <option value="IPT2">IPT2</option>
                <option value="IPT2">IPT2</option>
              </select>
              <Link to="/admin/teacher-info">
                <input type="button" className="add-btn" value="Add Subject" />
              </Link>
            </div>
            <div className="column mar">
              <Link to="/admin/teacher-info">
                <input type="button" className="add-btn grn" value="Submit" />
              </Link>
              <Link to="/admin/students-dashboard">
                <input type="button" className="add-btn red" value="Cancel" />
              </Link>
            </div>
          </div>*/}
        </div>
      </div>
    </>
  );
}

export default AdminStudentInfo;

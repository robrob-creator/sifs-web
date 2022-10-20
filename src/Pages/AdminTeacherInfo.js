import React, { useEffect, useState } from "react";
import "./css/container.css";
import "./css/table.css";
import "./css/icons.css";
import AdminSidebar from "../Components/Admin_Sidebar";
import subjects from "./data/subjects";
import * as MdIcons from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import { getUsers } from "../services/user";
import { getSections, editSection } from "../services/sections";

function AdminTeacherInfo() {
  const [profile, setProfile] = useState();
  const [section, setSection] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  const getProfile = async () => {
    let id = searchParams.get("id");
    let res = await getUsers({ id });
    setProfile(res?.data?.data?.list[0]);
  };
  const getTeacherSection = async () => {
    let id = searchParams.get("id");
    let res = await getSections({ teacher: id });
    setSection(res?.data?.data?.list);
  };
  useEffect(() => {
    getProfile();
    getTeacherSection();
  }, []);

  return (
    <>
      <AdminSidebar />
      <div className="container">
        <h2>Teacher Info</h2>
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
                      <th>School year</th>
                      <th className="del-col">Delete</th>
                    </thead>

                    <tbody>
                      {item?.subjects &&
                        item?.subjects
                          ?.filter(
                            (subj) => subj?.teacher?._id === profile?._id
                          )
                          .map((sub, index) => {
                            return (
                              <tr>
                                <td data-label="Subject Name">
                                  {sub.subject.name}
                                </td>
                                <td data-label="Units">{sub.subject.units}</td>
                                <td data-label="School year">
                                  {item?.schoolYear}
                                </td>
                                <td data-label="Delete">
                                  <MdIcons.MdDelete
                                    className="icons-red"
                                    onClick={async () => {
                                      let subject = item?.subjects;
                                      subject[index].teacher = "";
                                      let data = { subjects: subject };
                                      console.log(data);
                                      editSection(item._id, {
                                        subjects: data.subjects?.map(
                                          (val, i) => {
                                            return {
                                              subject: val?.subject?._id,
                                              teacher: val?.teacher?._id,
                                            };
                                          }
                                        ),
                                      });
                                    }}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                </>
              );
            })}
          </div>
          <div className="row2">
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
              <Link to="/admin/teacher-info">
                <input type="button" className="add-btn red" value="Cancel" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminTeacherInfo;

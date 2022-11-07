/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./css/container.css";
import "./css/table.css";
import "./css/icons.css";
import AdminSidebar from "../Components/Admin_Sidebar";
import teacher_dashboard from "./data/teacher-dashboard";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";
import { getUsers, updateRoles } from "../services/user";
import { ToastContainer, toast } from "react-toastify";
import EditTeacher from "../Components/modals/EditTeacher";

function AdminTeacherDash() {
  const [data, setData] = useState();
  const [trigger, setTrigger] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState();
  const [currentRow, setCurrentRow] = useState();

  const fetchTeachers = async () => {
    let res = await getUsers({ role: "teacher" });
    setData(res?.data?.data?.list);
  };
  const removeTeacher = async (id) => {
    updateRoles(id, { role: "civilian" });
    setTrigger(trigger ? false : true);
  };
  useEffect(() => {
    fetchTeachers();
  }, [trigger, data]);
  return (
    <>
      <AdminSidebar />
      <div className="container">
        <div className="row">
          <div className="column">
            <h1>Teachers List</h1>
          </div>
          <div className="column">
            <Link to="/admin/teacher-add">
              <input type="button" className="add-btn" value="Add Teacher" />
            </Link>
          </div>
        </div>
        <ToastContainer position="top-right" newestOnTop />
        <EditTeacher
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          fetch={fetchTeachers}
          currentRow={currentRow}
          setCurrentRow={setCurrentRow}
        />
        <table>
          <thead className="thead">
            <th>Teacher Name</th>
            {/* <th>Subject #</th>
            <th>Subject Name</th>*/}
            <th>View / Delete</th>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <tr>
                  <td data-label="Teacher Name">
                    {" "}
                    {item?.firstName} {item?.lastName}
                  </td>
                  {/*  <td data-label="Subject #">subject no</td>
                  <td data-label="Subject Name">subject name</td>*/}
                  <td data-label="View / Delete">
                    <Link to={`/admin/teacher-info?id=${item?._id}`}>
                      <button className="icons-grn">
                        <BsIcons.BsFillEyeFill />
                      </button>
                    </Link>
                    <a>
                      <MdIcons.MdOutlineModeEditOutline
                        style={{ fontSize: "20px" }}
                        onClick={() => {
                          setCurrentRow(item);
                          setIsModalVisible(true);
                        }}
                      />
                    </a>
                    <Link to="#">
                      <button
                        className="icons-red"
                        onClick={() => removeTeacher(item?._id)}
                      >
                        <MdIcons.MdDelete />
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminTeacherDash;

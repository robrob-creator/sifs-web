/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/container.css";
import "./css/table.css";
import "./css/icons.css";
import AdminSidebar from "../Components/Admin_Sidebar";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import student_dashboard from "./data/grades";
import { ToastContainer, toast } from "react-toastify";
import EditStudent from "../Components/modals/EditUser";
import loader from "../Components/images/loader.gif";
import { getUsers, updateRoles } from "../services/user";
import profile from "./data/profile";

function AdminStudentDash() {
  const [data, setData] = useState();
  const [isModalVisible, setIsModalVisible] = useState();
  const [currentRow, setCurrentRow] = useState();
  const fetchStudents = async () => {
    let res = await getUsers({ role: "student" });
    setData(res?.data?.data?.list);
  };
  const [trigger, setTrigger] = useState(false);

  const removeTeacher = async (id) => {
    updateRoles(id, { role: "civilian" });
    setTrigger(trigger ? false : true);
  };
  useEffect(() => {
    fetchStudents();
  }, [trigger]);

  return (
    <>
      <AdminSidebar />
      {data ? (
        <div className="container">
          <div className="row">
            <div className="column">
              <h1>Students Dashboard</h1>
            </div>
            <div className="column">
              <Link to="/admin/student-add">
                <input type="button" className="add-btn" value="Add Student" />
              </Link>
              <Link to="/admin/csv-add">
                <input
                  type="button"
                  className="add-btn"
                  value="Add CSV"
                  style={{ marginInline: 4 }}
                />
              </Link>
            </div>
          </div>
          <ToastContainer position="top-right" newestOnTop />
          <EditStudent
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            fetch={fetchStudents}
            currentRow={currentRow}
            setCurrentRow={setCurrentRow}
          />
          <table>
            <thead>
              <th>Student ID</th>
              <th>Student Name</th>

              <th>View / Edit / Delete</th>
            </thead>
            <tbody>
              {data?.map((item, index) => {
                return (
                  <tr>
                    <td data-label="Student ID">{item?.idNo}</td>
                    <td data-label="Student Name">
                      {item?.firstName} {item?.lastName}
                    </td>

                    <td data-label="View / Delete">
                      <Link to={`/admin/student-info?id=${item._id}`}>
                        <button className="icons-grn">
                          <BsIcons.BsFillEyeFill style={{ color: "#45a049" }} />
                        </button>
                      </Link>
                      <a>
                        <MdIcons.MdOutlineModeEditOutline
                          style={{ fontSize: "20px", color: "#45a049" }}
                          onClick={() => {
                            setCurrentRow(item);
                            setIsModalVisible(true);
                          }}
                        />
                      </a>
                      <Link to="#">
                        <button className="icons-red">
                          <MdIcons.MdDelete
                            onClick={() => removeTeacher(item?._id)}
                            style={{ color: "#45a049" }}
                          />
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          className="container"
          style={{
            backgroundImage: `url(${loader})`,
            height: "100vh",
            width: "100%",
            backgroundPosition: "center",
          }}
        ></div>
      )}
    </>
  );
}

export default AdminStudentDash;

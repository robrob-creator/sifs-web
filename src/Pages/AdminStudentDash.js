import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/container.css";
import "./css/table.css";
import "./css/icons.css";
import AdminSidebar from "../Components/Admin_Sidebar";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import student_dashboard from "./data/grades";

import { getUsers, updateRoles } from "../services/user";

function AdminStudentDash() {
  const [data, setData] = useState();
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
  }, [trigger, data]);

  return (
    <>
      <AdminSidebar />
      <div className="container">
        <div className="row">
          <div className="column">
            <h1>Students Dashboard</h1>
          </div>
          <div className="column">
            <Link to="/admin/student-add">
              <input type="button" className="add-btn" value="Add Student" />
            </Link>
          </div>
        </div>
        <table>
          <thead>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Subjects</th>
            <th>Units</th>
            <th>View / Delete</th>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <tr>
                  <td data-label="Student ID">{item?.idNo}</td>
                  <td data-label="Student Name">
                    {item?.firstName} {item?.lastName}
                  </td>
                  <td data-label="Subjects">subs</td>
                  <td data-label="Units">units</td>
                  <td data-label="View / Delete">
                    <Link to={`/admin/student-info?id=${item._id}`}>
                      <button className="icons-grn">
                        <BsIcons.BsFillEyeFill />
                      </button>
                    </Link>

                    <Link to="#">
                      <button className="icons-red">
                        <MdIcons.MdDelete
                          onClick={() => removeTeacher(item?._id)}
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
    </>
  );
}

export default AdminStudentDash;

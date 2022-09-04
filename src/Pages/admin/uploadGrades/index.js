import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/container.css";
import "../../css/table.css";
import "../../css/icons.css";
import AdminSidebar from "../../../Components/Admin_Sidebar";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import { getSections } from "../../../services/sections";

function AdminStudentDash() {
  const [data, setData] = useState();
  const fetchStudents = async () => {
    let res = await getSections();
    setData(res?.data?.data?.list);
  };
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <>
      <AdminSidebar />
      <div className="container">
        <div className="row">
          <div className="column">
            <h1>Section List</h1>
          </div>
          <div className="column">
            <Link to="/admin/student-add">
              <input type="button" className="add-btn" value="Add Student" />
            </Link>
          </div>
        </div>
        <table>
          <thead>
            <th>Section</th>
            <th>View / Delete</th>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <tr>
                  <td data-label="Student ID">{item?.name}</td>

                  <td data-label="View / Delete">
                    <Link to="/admin/student-info">
                      <button className="icons-grn">
                        <BsIcons.BsFillEyeFill />
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

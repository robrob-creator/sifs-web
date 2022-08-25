import React from "react";
import "./css/container.css";
import "./css/table.css";
import "./css/icons.css";
import AdminSidebar from "../Components/Admin_Sidebar";
import subjects from "./data/subjects";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";
import { createUser } from "../services/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminTeacherAdd() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    suffix: "",
    idNo: "",
    password: "",
    email: "",
    role: "teacher",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await createUser(state);
      if (res.status === 200) {
        navigate("/admin/teacher-info");
      } else {
        setErrors({ message: "unauthorized" });
      }
    } catch (error) {
      toast(error.response.data.message, {
        type: "error",
      });
      setErrors(error.response.data);
      console.log("error", error.response.data.message);
      return error;
    }
  };
  return (
    <>
      <AdminSidebar />
      <ToastContainer position="top-right" newestOnTop />
      <div className="container">
        <h1>Add Teacher</h1>
        <div className="con">
          <h3 className="t-sub">Teachers Info</h3>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-inline">
              <input
                type="text"
                id="fname"
                placeholder="First Name"
                name="fname"
                required
                onChange={(e) => {
                  setState({ ...state, firstName: e.target.value });
                }}
              />
              <input
                type="text"
                id="lname"
                placeholder="Last Name"
                name="lname"
                required
                onChange={(e) => {
                  setState({ ...state, lastName: e.target.value });
                }}
              />
              <input
                type="text"
                id="mname"
                placeholder="Middle Name"
                name="mname"
                required
                onChange={(e) => {
                  setState({ ...state, middleName: e.target.value });
                }}
              />
              <input
                type="text"
                id="suffix"
                placeholder="Suffix"
                name="suffix"
                onChange={(e) => {
                  setState({ ...state, suffix: e.target.value });
                }}
              />
              <input
                type="text"
                id="username"
                placeholder="Username"
                name="username"
                required
                onChange={(e) => {
                  setState({ ...state, userName: e.target.value });
                }}
              />
              <input
                type="text"
                id="username"
                placeholder="ID no."
                name="ID no."
                required
                onChange={(e) => {
                  setState({ ...state, idNo: e.target.value });
                }}
              />
              <input
                type="password"
                id="pswd"
                placeholder="Password"
                name="pswd"
                required
                onChange={(e) => {
                  setState({ ...state, password: e.target.value });
                }}
              />
            </div>

            <div className="con-tab">
              <h3 className="t-sub">Subjects</h3>
              <table className="tbl-tch">
                <thead>
                  <th>Subject Name</th>
                  <th className="del-col">Delete</th>
                </thead>

                <tbody>
                  {subjects.map((sub, index) => {
                    return (
                      <tr>
                        <td className=".del-col" data-label="Subject">
                          {sub.subname}
                        </td>
                        <td data-label="Delete">
                          <MdIcons.MdDelete className="icons-red" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="row2">
              <div className="column">
                <select className="sel">
                  <option value="IPT2">IPT2</option>
                  <option value="IPT2">IPT2</option>
                  <option value="IPT2">IPT2</option>
                </select>
                <Link to="/admin/teacher-info">
                  <input
                    type="button"
                    className="add-btn"
                    value="Add Subject"
                  />
                </Link>
              </div>
              <div className="column mar">
                <button className="add-btn grn" type="submit">
                  Submit
                </button>

                <Link to="/admin/teacher-info">
                  <input type="button" className="add-btn red" value="Cancel" />
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminTeacherAdd;

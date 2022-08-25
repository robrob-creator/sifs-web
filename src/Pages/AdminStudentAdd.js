import React from "react";
import "./css/container.css";
import "./css/table.css";
import "./css/icons.css";
import AdminSidebar from "../Components/Admin_Sidebar";
import subjects from "./data/subjects";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminStudentAdd() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    suffix: "",
    idNo: "",
    password: "",
    gradeLevel: "",
    strand_track: "",
    email: "",
    role: "student",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await createUser(state);
      if (res.status === 200) {
        navigate("/admin/dashboard");
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
        <h1>Add Student</h1>
        <div className="con">
          <h3 className="t-sub">Student Info</h3>
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
                type="number"
                max="12"
                id="username"
                placeholder="Grade Level"
                name="username"
                required
                onChange={(e) => {
                  setState({ ...state, gradeLevel: e.target.value });
                }}
              />
              <input
                type="text"
                id="suffix"
                placeholder="Strand/Track"
                name="suffix"
                onChange={(e) => {
                  setState({ ...state, strand_track: e.target.value });
                }}
              />
              <input
                type="number"
                id="suffix"
                placeholder="Student No."
                name="suffix"
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
                  <th>Units</th>
                  <th>Quarter</th>
                  <th className="del-col">Delete</th>
                </thead>

                <tbody>
                  {subjects.map((sub, index) => {
                    return (
                      <tr>
                        <td data-label="Subject Name">{sub.subname}</td>
                        <td data-label="Units">24</td>
                        <td data-label="Quarter">
                          <select className="sel quart">
                            <option value="First">First</option>
                            <option value="Second">Second</option>
                            <option value="Third">Third</option>
                            <option value="Fourth">Fourth</option>
                          </select>
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

export default AdminStudentAdd;

import React from "react";
import logo from "../Components/images/logo.png";
import "./css/signup.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../services/user";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignInStudent() {
  const [state, setState] = useState({
    idNo: "",
    password: "",
    role: "student",
  });
  const [errors, setErrors] = useState();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await login(state);
      if (res.status === 200) {
        navigate("/student");
      } else {
        setErrors({ message: "unauthorized" });
      }
    } catch (error) {
      toast(error.response.data.message, {
        type: "error",
      });
      setErrors(error.response.data);
      console.log("error", error.response);
      return error;
    }
  };
  return (
    <>
      <center>
        <div className="container2">
          <img src={logo} alt="cabulohan-paradise-logo" className="logo" />
          <h2 style={{ fontWeight: 600, color: "#476b6b" }} className="txt">
            STUDENT INFORMATION AND FEEDBACKING SYSTEM
          </h2>
          <ToastContainer position="top-right" newestOnTop />
          <div className="disabled">Student</div>
          <center>
            <form className="input-div" onSubmit={(e) => handleSubmit(e)}>
              <input
                type="text"
                className="input"
                placeholder="ID Number..."
                required
                onChange={(e) => {
                  setState({ ...state, idNo: e.target.value });
                }}
              />
              <input
                type="password"
                className="input"
                placeholder="Password..."
                onChange={(e) => {
                  setState({ ...state, password: e.target.value });
                }}
                required
              />

              <button type="submit" className="button sub">
                Submit
              </button>
            </form>
          </center>
        </div>
      </center>
    </>
  );
}

export default SignInStudent;

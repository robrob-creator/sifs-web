import React from "react";
import logo from "../Components/images/logo.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../services/user";
import { useState } from "react";

function SignInAdmin() {
  const [state, setState] = useState({ idNo: "", password: "", role: "admin" });
  const [errors, setErrors] = useState();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await login(state);
      if (res.status === 200) {
        toast("Success", {
          type: "success",
        });
        navigate("/admin/dashboard");
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
          <h2 className="txt">
            Student Information and Feedbacking Using Web Technology
          </h2>
          <ToastContainer position="top-right" newestOnTop />
          <div className="disabled">Admin</div>
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
                type="text"
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

export default SignInAdmin;

// /admin/dashboard

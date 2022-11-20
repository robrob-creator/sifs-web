import React from "react";
import logo from "../Components/images/logo.png";
import "./css/signup.css";
import "./css/container.css";
import { Link } from "react-router-dom";
function SignInChoices() {
  return (
    <>
      <div className="container2">
        <center>
          <img src={logo} alt="cabulohan-paradise-logo" className="logo" />
          <h2 className="txt">
            Student Information and Feedbacking Using Web Technology
          </h2>
          <div className="cen">
            <Link to="/admin-signup">
              <input type="button" className="button ad" value="Admin" />
            </Link>

            <Link to="/teacher-signup">
              <input type="button" className="button" value="Teacher" />
            </Link>

            <Link to="/student-signup">
              <input type="button" className="button" value="Student" />
            </Link>
          </div>
        </center>
      </div>
    </>
  );
}

export default SignInChoices;

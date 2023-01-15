import React, { useState } from "react";
import logo from "../Components/images/logo.png";
import "./css/signup.css";
import "./css/container.css";
import { Link } from "react-router-dom";
import loader from "../Components/images/loader.gif";
import { useEffect } from "react";
function SignInChoices() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setReady(true);
    }, 3000);
    return () => clearInterval(interval);
  });
  return (
    <>
      {ready ? (
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
      ) : (
        <div
          className="container2"
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

export default SignInChoices;

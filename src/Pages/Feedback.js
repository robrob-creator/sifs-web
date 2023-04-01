import React from "react";
import "./css/table.css";
import { Link } from "react-router-dom";
import feedbacks from "./data/feedbacks";
import Sidebar from "../Components/Sidebar";
import "./css/container.css";
import loader from "../Components/images/loader.gif";

function Feedback() {
  return (
    <>
      <Sidebar />
      <div className="container">
        <h2>feedbacks</h2>
        <table>
          <thead>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Feedback</th>
          </thead>
          <tbody>
            {feedbacks.map((feedback, index) => {
              return (
                <tr>
                  <td data-label="Student ID">{feedback.student_id}</td>
                  <td data-label="Student Name">{feedback.student_name}</td>
                  <td data-label="View">
                    <Link className="link" to={feedback.path}>
                      <input type="button" class="btn" value="View" />
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

export default Feedback;

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/container.css";
import "../css/table.css";
import "../css/icons.css";
import AdminSidebar from "../../Components/Admin_Sidebar";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import { getSections } from "../../services/sections";
import { Button, Modal, Select, Form, Input, Space, Checkbox } from "antd";
import { getSubjects } from "../../services/subjects";
import { addSubjecttoSection } from "../../services/sections";
import { getUsers } from "../../services/user";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import AddStudentSection from "../../Components/modals/AddStudentSection";
import AddSection from "../../Components/modals/AddSection";
import EditSection from "../../Components/modals/EditSection";
import { deleteSection } from "../../services/sections";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getFeedbacks } from "../../services/feedback";
import { getProfile } from "../../services/user";
import { editFeedback } from "../../services/feedback";
import loader from "../../Components/images/loader.gif";
const { Option } = Select;

function FeedbackDashboard() {
  const [data, setData] = useState();
  const [update, handleUpdates] = useState(true);

  const [payload, setPayload] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState();
  const [profile, setProfile] = useState();

  const fetchProfile = async () => {
    let res = await getProfile();
    setProfile(res?.data?.data?.profile);
  };

  const fetchFeedbacks = async () => {
    let res = await getFeedbacks({ reciever: profile?._id });
    setData(res?.data?.data?.list);
  };

  const rateResult = (value) => {
    if (value <= 10) return "Very Good";
    if (value <= 19) return "Good";
    if (value <= 25) return "Satisfactory";
    if (value >= 26) return "Very unsatisfactory";
  };

  useEffect(() => {
    if (!profile) {
      fetchProfile();
    }
    if (profile) {
      fetchFeedbacks();
    }
  }, [update, profile]);
  console.log(data);
  return (
    <>
      <AdminSidebar />
      {data ? (
        <div className="container">
          <ToastContainer position="top-right" newestOnTop />
          <div className="row">
            <div className="column">
              <h1>Feedback Dashboard</h1>
            </div>
            <div className="column"></div>
          </div>
          {profile?.role && (
            <table>
              <thead>
                <th>Student</th>
                {profile?.role.includes("teacher") && <th>Grade</th>}
                <th>Rating</th>
                <th>Result</th>
                <th>Subject</th>
                <th>Teacher</th>
                {profile?.role.includes("teacher") && <th>Remarks</th>}
              </thead>
              <tbody>
                {data &&
                  data?.map((item, index) => {
                    return (
                      <tr>
                        <td data-label="Name">
                          {item?.sender?.firstName +
                            " " +
                            item?.sender?.lastName}
                        </td>
                        {profile?.role.includes("teacher") && (
                          <td>{item?.grade}</td>
                        )}
                        <td data-label="Name">
                          {Object?.values(item?.review).reduce(
                            (accumulator, value) => {
                              return accumulator + value;
                            },
                            0
                          )}
                        </td>
                        <td data-label="Name">
                          {" "}
                          {rateResult(
                            Object?.values(item?.review).reduce(
                              (accumulator, value) => {
                                return accumulator + value;
                              },
                              0
                            )
                          )}
                        </td>
                        <td data-label="Name"> {item?.subject}</td>
                        <td data-label="School year">
                          {item?.reciever?.firstName +
                            " " +
                            item?.reciever?.lastName}
                        </td>
                        {profile?.role.includes("teacher") && (
                          <td>
                            <Checkbox
                              checked={item?.seen}
                              onChange={async (e) => {
                                await editFeedback(item?._id, {
                                  seen: e.target.checked,
                                });
                                fetchFeedbacks();
                              }}
                            >
                              {item?.seen ? "Done" : "Mark as done?"}
                            </Checkbox>
                          </td>
                        )}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
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

export default FeedbackDashboard;

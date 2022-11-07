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
import { Button, Modal, Select, Form, Input, Space } from "antd";
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

  useEffect(() => {
    if (!profile) {
      fetchProfile();
    }
    fetchFeedbacks();
  }, [update, profile]);
  console.log(profile);
  return (
    <>
      <AdminSidebar />
      <div className="container">
        <ToastContainer position="top-right" newestOnTop />
        <div className="row">
          <div className="column">
            <h1>Feedback Dashboard</h1>
          </div>
          <div className="column"></div>
        </div>
        <table>
          <thead>
            <th>Sender</th>
            <th>Teacher</th>
            <th>Message</th>
          </thead>
          <tbody>
            {data &&
              data?.map((item, index) => {
                return (
                  <tr>
                    <td data-label="Name">
                      {item?.sender?.firstName + " " + item?.sender?.lastName}
                    </td>
                    <td data-label="School year">
                      {item?.reciever?.firstName +
                        " " +
                        item?.reciever?.lastName}
                    </td>
                    <td data-label="School year">{item?.message}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default FeedbackDashboard;

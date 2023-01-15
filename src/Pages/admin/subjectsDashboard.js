import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, List, Space } from "antd";
import AdminSidebar from "../../Components/Admin_Sidebar";
import React, { useState } from "react";
import { Button, Descriptions, PageHeader } from "antd";
import { getSubjects } from "../../services/subjects";
import { useEffect } from "react";
import Addsubject from "../../Components/modals/AddSubject";
import { Skeleton } from "antd";
import { deleteSubject } from "../../services/subjects";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Editsubject from "../../Components/modals/EditSubject";
import "react-toastify/dist/ReactToastify.css";
import loader from "../../Components/images/loader.gif";
var randomColor = require("randomcolor");

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function SubjectsDashboard() {
  const [data, setData] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState();
  const [update, handleUpdates] = useState(true);

  const fetchSubject = async () => {
    let res = await getSubjects();
    console.log(res.data.data.list);
    setData(res.data.data.list);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    await deleteSubject(id);
    handleUpdates(update ? true : false);
    fetchSubject();
    toast("Subject deleted!", {
      type: "success",
    });
  };

  useEffect(() => {
    fetchSubject();
  }, [update]);

  console.log("case", currentRow);

  return (
    <>
      <AdminSidebar />
      <ToastContainer position="top-right" newestOnTop />
      {data ? (
        <div className="container">
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title="Subjects"
            subTitle="available subjects"
            extra={[
              <Button key="1" type="primary" onClick={() => showModal()}>
                Add Subject
              </Button>,
            ]}
          />
          <Editsubject
            isEditVisible={isEditVisible}
            setIsEditVisible={setIsEditVisible}
            fetchSubject={fetchSubject}
            currentRow={currentRow}
          />
          <Addsubject
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            fetchSubject={fetchSubject}
          />
          <table>
            <thead>
              <th>Name</th>
              <th>Description</th>
              <th>Edit / Delete</th>
            </thead>
            <tbody>
              {data &&
                data?.map((item, index) => {
                  return (
                    <tr>
                      <td data-label="Name">{item?.name}</td>
                      <td data-label="Units">{item?.description}</td>
                      <td data-label="View / Delete">
                        <Link to="#">
                          <MdIcons.MdOutlineModeEditOutline
                            style={{ fontSize: "20px" }}
                            onClick={() => {
                              setCurrentRow(item);
                              setInterval(setIsEditVisible(true), 1000);
                              return clearInterval();
                            }}
                          />
                        </Link>
                        <Link to="#">
                          <button
                            className="icons-red"
                            onClick={() => handleDelete(item?._id)}
                          >
                            <MdIcons.MdDelete />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
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

export default SubjectsDashboard;

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
import "react-toastify/dist/ReactToastify.css";
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
  const [editSectModal, setEditSectModal] = useState(false);
  const [currentRow, setCurrentRow] = useState();
  const [defaultVal, setDefaultVal] = useState();
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
  return (
    <>
      <AdminSidebar />
      <ToastContainer position="top-right" newestOnTop />
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
        <Addsubject
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          fetchSubject={fetchSubject}
        />
        <table>
          <thead>
            <th>Name</th>
            <th>Units</th>
            <th>Edit / Delete</th>
          </thead>
          <tbody>
            {data &&
              data?.map((item, index) => {
                return (
                  <tr>
                    <td data-label="Name">{item?.name}</td>
                    <td data-label="Units">{item?.units}</td>
                    <td data-label="View / Delete">
                      {/* <a>
                        <MdIcons.MdOutlineModeEditOutline
                          style={{ fontSize: "20px" }}
                          onClick={() => {
                            setDefaultVal(item);
                            setInterval(setEditSectModal(true), 1000);
                            return clearInterval();
                          }}
                        />
                        </a>*/}
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
    </>
  );
}

export default SubjectsDashboard;

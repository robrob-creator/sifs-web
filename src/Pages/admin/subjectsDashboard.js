import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, List, Space } from "antd";
import AdminSidebar from "../../Components/Admin_Sidebar";
import React, { useState } from "react";
import { Button, Descriptions, PageHeader } from "antd";
import { getSubjects } from "../../services/subjects";
import { useEffect } from "react";
import Addsubject from "../../Components/modals/AddSubject";
import { ToastContainer } from "react-toastify";
import { Skeleton } from "antd";
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

  const fetchSubject = async () => {
    let res = await getSubjects();
    console.log(res.data.data.list);
    setData(res.data.data.list);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    fetchSubject();
  }, []);
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
        {data ? (
          <List
            style={{ backgroundColor: "white", padding: 10 }}
            itemLayout="vertical"
            title="header"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 5,
            }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                key={item?.name}
                actions={[
                  <IconText
                    icon={EditOutlined}
                    text="Edit"
                    key="list-vertical-star-o"
                  />,
                  <IconText
                    icon={EyeOutlined}
                    text="View"
                    key="list-vertical-like-o"
                  />,
                  <IconText
                    icon={DeleteOutlined}
                    text="Delete"
                    key="list-vertical-message"
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: randomColor(),
                        verticalAlign: "middle",
                      }}
                    >
                      {item.name.charAt(0)}
                    </Avatar>
                  }
                  title={<a href={item.href}>{item.name}</a>}
                  description={item?.units + ` Units`}
                />
                {item.description}
              </List.Item>
            )}
          />
        ) : (
          <Skeleton style={{ backgroundColor: "white", padding: 10 }} />
        )}
      </div>
    </>
  );
}

export default SubjectsDashboard;

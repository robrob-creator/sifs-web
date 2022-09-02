import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/container.css";
import "../css/table.css";
import "../css/icons.css";
import AdminSidebar from "../../Components/Admin_Sidebar";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import { getSections } from "../../services/sections";
import { Button, Modal, Select } from "antd";
import { getSubjects } from "../../services/subjects";
const { Option } = Select;

function SectionDashboard() {
  const [data, setData] = useState();
  const [subjects, setSubjects] = useState();
  const [defaultSub, setDefaultSub] = useState();
  const fetchSections = async () => {
    let res = await getSections();
    setData(res?.data?.data?.list);
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    fetchSections();
  }, []);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  console.log("defaultSub", data);
  return (
    <>
      <AdminSidebar />
      <div className="container">
        <Modal
          title="Add Subject to Section"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            defaultValue={defaultSub}
            placeholder="Please select"
            onChange={handleChange}
          >
            {subjects?.map((item, index) => {
              return <Option value={item._id}>{item?.name}</Option>;
            })}
          </Select>
        </Modal>
        <div className="row">
          <div className="column">
            <h1>Students Dashboard</h1>
          </div>
          <div className="column">
            <Link to="/admin/student-add">
              <input type="button" className="add-btn" value="Add Student" />
            </Link>
          </div>
        </div>
        <table>
          <thead>
            <th>Name</th>
            <th>School year</th>
            <th>Subjects</th>
            <th>Students</th>
            <th>View / Delete</th>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <tr>
                  <td data-label="Name">{item?.name}</td>
                  <td data-label="School year">{item?.schoolYear}</td>
                  <td data-label="Subjects">
                    {item.subjects
                      .map((item, i) => {
                        return item.subject.name;
                      })
                      .join(",")}
                    <Button
                      type="primary"
                      onClick={async () => {
                        setDefaultSub(
                          item.subjects.map((item) => {
                            return item.subject._id;
                          })
                        );
                        let res = await getSubjects();
                        setSubjects(res.data.data.list);
                        showModal();
                      }}
                    >
                      Add Subject
                    </Button>
                  </td>
                  <td data-label="Students">student</td>
                  <td data-label="View / Delete">
                    <Link to="/admin/student-info">
                      <button className="icons-grn">
                        <BsIcons.BsFillEyeFill />
                      </button>
                    </Link>

                    <Link to="#">
                      <button className="icons-red">
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

export default SectionDashboard;

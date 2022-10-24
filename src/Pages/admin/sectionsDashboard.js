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
const { Option } = Select;

function SectionDashboard() {
  const [data, setData] = useState();
  const [update, handleUpdates] = useState(true);
  const [subjects, setSubjects] = useState();
  const [teacher, setTeacher] = useState();
  const [students, setStudents] = useState();
  const [seeMore, handleSeeMore] = useState(false);
  const [defaultSub, setDefaultSub] = useState();
  const [defaultStud, setDefaultStud] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [addSectModal, setAddSectModal] = useState(false);
  const [editSectModal, setEditSectModal] = useState(false);
  const fetchSections = async () => {
    let res = await getSections();
    setData(res?.data?.data?.list);
  };
  const [payload, setPayload] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState();
  const [defaultVal, setDefaultVal] = useState();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    let res = await addSubjecttoSection(currentRow, payload);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleDelete = async (id) => {
    await deleteSection(id);
    handleUpdates(true ? false : true);
    toast("Section deleted!", {
      type: "success",
    });
  };
  useEffect(() => {
    fetchSections();
  }, [update]);
  
  const handleChange = (value) => {
    setPayload(value);
  };
  console.log("defaultSub", data);
  const onFinish = async (values) => {
    console.log("defaultSub", values);
    await addSubjecttoSection(currentRow, values.subjects);
    await fetchSections();
    handleUpdates(true ? false : true);
    setIsModalVisible(false);
  };
  return (
    <>
      <AdminSidebar />
      <div className="container">
        <ToastContainer position="top-right" newestOnTop />
        <AddSection
          addSectModal={addSectModal}
          setAddSectModal={setAddSectModal}
          fetchSections={fetchSections}
        />
        <EditSection
          editSectModal={editSectModal}
          setEditSectModal={setEditSectModal}
          fetchSections={fetchSections}
          defaultVal={defaultVal}
          setDefaultVal={setDefaultVal}
        />
        <AddStudentSection
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          students={students}
          currentRow={currentRow}
          defaultStud={defaultStud}
        />
        <Modal
          title="Add Subject to Section"
          visible={isModalVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <Form
            name="dynamic_form_nest_item"
            onFinish={(value) => onFinish(value)}
            autoComplete="off"
          >
            <Form.List name="subjects" initialValue={defaultSub}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "subject"]}
                        rules={[
                          { required: true, message: "Missing first name" },
                        ]}
                      >
                        <Select
                          style={{ width: 120 }}
                          placeholder="Select Subject"
                          allowClear
                        >
                          {subjects?.map((item, index) => {
                            return (
                              <Option value={item?._id}>{item?.name}</Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "teacher"]}
                        rules={[
                          { required: true, message: "Missing last name" },
                        ]}
                      >
                        <Select
                          style={{ width: 120 }}
                          placeholder="Select teacher"
                          allowClear
                        >
                          {teacher?.map((item, index) => {
                            return (
                              <Option value={item?._id}>{`${
                                item.firstName
                              } ${item?.middleName.charAt(0)} ${
                                item?.lastName
                              }`}</Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <div className="row">
          <div className="column">
            <h1>Sections Dashboard</h1>
          </div>
          <div className="column">
            <input
              type="button"
              className="add-btn"
              value="Add Section"
              onClick={() => setAddSectModal(true)}
            />
          </div>
        </div>
        <table>
          <thead>
            <th>Name</th>
            <th>School year</th>
            <th>Subjects</th>
            <th>Students</th>
            <th>Edit / Delete</th>
          </thead>
          <tbody>
            {data &&
              data?.map((item, index) => {
                return (
                  <tr>
                    <td data-label="Name">{item?.name}</td>
                    <td data-label="School year">{item?.schoolYear}</td>
                    <td data-label="Subjects">
                      {seeMore ? (
                        <span>
                          {item?.subjects &&
                            item?.subjects
                              ?.map((item, i) => {
                                return item?.subject?.name;
                              })
                              .join(",")}
                          <br></br>
                          <a
                            style={{ marginLeft: "12px" }}
                            onClick={() => handleSeeMore(false)}
                          >
                            See less
                          </a>
                        </span>
                      ) : (
                        <span>
                          {`${
                            item?.subjects &&
                            item?.subjects
                              ?.map((item, i) => {
                                return item?.subject?.name;
                              })
                              .join(",")
                              .substring(0, 25)
                          } ...`}

                          <a
                            style={{ marginLeft: "12px" }}
                            onClick={() => handleSeeMore(true)}
                          >
                            See more
                          </a>
                        </span>
                      )}

                      <Button
                        type="primary"
                        onClick={async () => {
                          setCurrentRow(item?._id);
                          setDefaultSub(
                            item?.subjects &&
                              item?.subjects?.map((item) => {
                                return {
                                  subject: item?.subject?._id,
                                  teacher: item?.teacher?._id,
                                };
                              })
                          );
                          let res = await getSubjects();
                          setSubjects(res.data.data.list);
                          let teacher = await getUsers({ role: "teacher" });
                          setTeacher(teacher.data.data.list);
                          showModal();
                        }}
                      >
                        Add Subject
                      </Button>
                    </td>
                    <td data-label="name">
                      <Button
                        type="primary"
                        onClick={async () => {
                          setCurrentRow(item?._id);
                          setDefaultStud(
                            item?.students &&
                              item?.students.map((item) => {
                                return item?.student?._id;
                              })
                          );
                          let stud = await getUsers({ role: "student" });
                          setStudents(stud?.data?.data?.list);
                          setModalVisible(true);
                        }}
                      >
                        Add Students
                      </Button>
                    </td>
                    <td data-label="View / Delete">
                      <a>
                        <MdIcons.MdOutlineModeEditOutline
                          style={{ fontSize: "20px" }}
                          onClick={() => {
                            setDefaultVal(item);
                            setInterval(setEditSectModal(true), 1000);
                            return clearInterval();
                          }}
                        />
                      </a>
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

export default SectionDashboard;

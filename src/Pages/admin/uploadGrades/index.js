import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/container.css";
import "../../css/table.css";
import "../../css/icons.css";
import AdminSidebar from "../../../Components/Admin_Sidebar";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import { getSections } from "../../../services/sections";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { getProfile } from "../../../services/user";

const { Option } = Select;
function AdminStudentDash() {
  const [data, setData] = useState();
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();
  const [profile, setProfile] = useState();

  const fetchProfile = async () => {
    let res = await getProfile();
    setProfile(res?.data?.data?.profile);
  };

  const getFields = () => {
    const count = expand ? 4 : 3;
    const data = [
      { field: "name", label: "Name", type: "input" },
      { field: "schoolYear", label: "School year", type: "input" },
      {
        field: "gradeLevel",
        label: "Grade level",
        options: [7, 8, 9, 10, 11, 12],
        type: "select",
      },
      {
        field: "semester",
        label: "Semester",
        options: ["1st", "2nd"],
        type: "select",
      },
    ];
    const children = [];
    data.map((item, i) => {
      return children.push(
        <Col span={8} key={i}>
          <Form.Item name={`${item.field}`} label={`${item.label}`}>
            {item.type === "input" ? (
              <Input placeholder="Please enter" />
            ) : (
              <Select placeholder="PLease select">
                {item.options.map((item) => {
                  return <Option value={item}>{item}</Option>;
                })}
              </Select>
            )}
          </Form.Item>
        </Col>
      );
    });
    for (let i = 0; i < count; i++) {}
    return children;
  };

  const fetchStudents = async (values) => {
    let res = await getSections({ ...values, teacher: profile?._id });
    setData(res?.data?.data?.list);
  };

  const onFinish = (values) => {
    fetchStudents(values);
  };

  useEffect(() => {
    if (!profile) {
      fetchProfile();
    }
    fetchStudents({ teacher: profile?._id });
  }, [profile]);
  return (
    <>
      <AdminSidebar />
      <div className="container">
        <div className="row">
          <div className="column">
            <h1>Subject List</h1>
          </div>
          <div className="column"></div>
        </div>

        {data?.map((datas, index) => {
          return (
            <>
              {datas?.subjects
                ?.filter((item) => item?.teacher?._id === profile?._id)
                .map((item, index) => {
                  return (
                    <table>
                      <thead>
                        <th>Subject</th>
                        <th>View</th>
                      </thead>
                      <tbody>
                        <tr>
                          <td data-label="Student ID">{item?.subject?.name}</td>
                          <td data-label="View / Delete">
                            <Link
                              to={`/grade/students?id=${datas?._id}&subject=${item?.subject?._id}&subject_name=${item?.subject?.name}`}
                            >
                              <button className="icons-grn">
                                <BsIcons.BsFillEyeFill />
                              </button>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  );
                })}
            </>
          );
        })}
      </div>
    </>
  );
}

export default AdminStudentDash;

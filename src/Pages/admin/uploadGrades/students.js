/* eslint-disable jsx-a11y/anchor-is-valid */
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
import { getGrades } from "../../../services/grades";
import { useSearchParams } from "react-router-dom";
import UploadGrade from "../../../Components/modals/UploadGrade";
const { Option } = Select;

function UploadStudentsList() {
  const [data, setData] = useState();
  const [showUpload, handleUpload] = useState(false);
  const [section, setSection] = useState();
  const [grades, setGrades] = useState();
  const [student, setStudent] = useState();
  const [searchParams] = useSearchParams();
  let id = searchParams.get("id");
  let subject = searchParams.get("subject");
  let subjectName = searchParams.get("subject_name");

  const fetchSections = async (values) => {
    let res = await getSections(id);
    setSection(res?.data?.data?.list[0]);
    setData(res?.data?.data?.list[0]?.students);
  };
  const fetchGrades = async () => {
    let res = await getGrades({ subject, section: id });
    setGrades(res?.data?.data?.list);
  };
  useEffect(() => {
    fetchSections();
    fetchGrades();
  }, []);
  console.log(data);
  return (
    <>
      <AdminSidebar />
      <div className="container">
        <UploadGrade
          showUpload={showUpload}
          handleUpload={handleUpload}
          fetchSections={fetchSections}
          id={id}
          subject={subject}
          student={student}
          section={section}
          fetchGrades={fetchGrades}
        />
        <div className="row">
          <div className="column">
            <h1>{subjectName.substring(0, 10)}...</h1>
          </div>
          <div className="column"></div>
        </div>

        <table>
          <thead>
            <th>Student</th>
            <th>Grade</th>
            <th>Upload/Edit</th>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <tr>
                  <td data-label="Student ID">{`${item?.student?.firstName} ${item?.student?.lastName}`}</td>
                  <td data-label="Student ID">
                    {" "}
                    {grades?.map((grade, i) => {
                      return grade?.student?._id === item?.student?._id
                        ? grade?.grade
                        : "";
                    })}
                  </td>
                  <td data-label="View / Delete">
                    <a
                      onClick={() => {
                        setStudent(item?.student?._id);
                        handleUpload(true);
                      }}
                    >
                      Upload
                    </a>
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

export default UploadStudentsList;

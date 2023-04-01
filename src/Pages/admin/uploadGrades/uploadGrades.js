/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/container.css";
import "../../css/table.css";
import "../../css/icons.css";
import AdminSidebar from "../../../Components/Admin_Sidebar";
import { getGrades } from "../../../services/grades";
import { getSections } from "../../../services/sections";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select } from "antd";
import UploadGrade from "../../../Components/modals/UploadGrade";
import { useSearchParams } from "react-router-dom";
import loader from "../../../Components/images/loader.gif";
const { Option } = Select;

function Upload() {
  const [data, setData] = useState();
  const [showUpload, handleUpload] = useState(false);
  const [section, setSection] = useState();
  const [subject, setSubject] = useState();
  const [grades, setGrades] = useState();
  const [searchParams] = useSearchParams();
  let id = searchParams.get("id");
  let student = searchParams.get("student");
  const fetchSections = async (values) => {
    let res = await getSections({ ...values, id });
    setSection(res?.data?.data?.list[0]);
    setData(res?.data?.data?.list[0]?.subjects);
  };
  const fetchGrades = async (values) => {
    let res = await getGrades({ ...values });
    setGrades(res?.data?.data?.list);
  };
  const onFinish = (values) => {
    fetchSections(values);
  };

  useEffect(() => {
    fetchSections();
    fetchGrades({ student, section: id });
  }, []);
  console.log("grades", grades);
  return (
    <>
      <AdminSidebar />
      {data ? (
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
              <h1>Upload grades</h1>
            </div>
            <div className="column"></div>
          </div>

          <table>
            <thead>
              <th>Subject</th>
              <th>Grade</th>
              <th>Upload/Edit</th>
            </thead>
            <tbody>
              {data?.map((item, index) => {
                return (
                  <tr>
                    <td data-label="Student ID">{`${item?.subject?.name}`}</td>
                    <td data-label="Student ID">
                      {grades?.map((grade, i) => {
                        return grade?.subject?._id === item?.subject?._id
                          ? grade?.grade
                          : "";
                      })}
                    </td>
                    <td data-label="View / Delete">
                      <span>
                        <a
                          onClick={() => {
                            setSubject(item?.subject?._id);
                            handleUpload(true);
                          }}
                        >
                          Upload
                        </a>{" "}
                        | <a>Edit</a>
                      </span>
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

export default Upload;

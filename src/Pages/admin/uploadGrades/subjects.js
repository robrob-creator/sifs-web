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
import { BsEyeFill } from "react-icons/bs";
const { Option } = Select;

function UploadSubjectPage() {
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

            <th>View</th>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <tr>
                  <td data-label="Student ID">{`${item?.subject?.name}`}</td>

                  <td data-label="View / Delete">
                    <span>
                      <Link
                        to={`/grade/students?id=${item?._id}&subject=${item?.subject?._id}&subject_name=${item?.subject?.name}`}
                      >
                        <button className="icons-grn">
                          <BsEyeFill />
                        </button>
                      </Link>{" "}
                    </span>
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

export default UploadSubjectPage;

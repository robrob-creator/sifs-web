/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import EditGrade from "../../../Components/modals/EditGrade";
import UploadGrade from "../../../Components/modals/UploadGrade";
const { Option } = Select;

function UploadStudentsList() {
  const [data, setData] = useState();
  const [showGradeEdit, setShowGradeEdit] = useState();
  const [currentRow, setCurrentRow] = useState();
  const [showUpload, handleUpload] = useState(false);
  const [section, setSection] = useState();
  const [grades, setGrades] = useState();
  const [student, setStudent] = useState();
  const [searchParams] = useSearchParams();
  let id = searchParams.get("id");
  let subject = searchParams.get("subject");
  let subjectName = searchParams.get("subject_name");
  let subjectDescription = searchParams.get("subject_description");

  const fetchSections = async (values) => {
    let res = await getSections({ id });
    setSection(res?.data?.data?.list[0]);
    console.log(res?.data);
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

  return (
    <>
      <AdminSidebar />
      <div className="container">
        <ToastContainer position="top-right" newestOnTop />
        <EditGrade
          showGradeEdit={showGradeEdit}
          setShowGradeEdit={setShowGradeEdit}
          id={currentRow?._id}
          fetch={fetchGrades}
        />
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
        <div className="">
          <div
            className="column"
            style={{
              textTransform: "uppercase",
              fontSize: 18,
              letterSpacing: 2,
            }}
          >
            <div>
              <span style={{ fontWeight: 600 }}>Strand:</span>{" "}
              {section?.students
                ? section?.students[0]?.student?.strand_track
                : ""}
            </div>
            <div>
              <span style={{ fontWeight: 600 }}>Grade level:</span>{" "}
              {section?.gradeLevel}
            </div>
            <div>
              {" "}
              <span style={{ fontWeight: 600 }}>Description: </span>
              {subjectDescription}
            </div>
          </div>

          <div className="column"></div>
        </div>
        <br></br>
        <table>
          <thead>
            <th>Student</th>
            <th>1st Grading</th>
            <th>2nd Grading</th>
            <th>Upload</th>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <tr>
                  <td data-label="Student ID">{`${item?.student?.firstName} ${item?.student?.lastName}`}</td>
                  <td data-label="Student ID">
                    {" "}
                    {grades
                      ?.filter((item) => item.gradingPeriod === "1st")
                      ?.map((grade, i) => {
                        return grade?.student?._id === item?.student?._id ? (
                          <span>
                            {grade?.grade}{" "}
                            <a>
                              {" "}
                              <MdIcons.MdOutlineModeEditOutline
                                style={{ fontSize: "15px" }}
                                onClick={() => {
                                  setCurrentRow(grade);
                                  setShowGradeEdit(true);
                                }}
                              />
                            </a>
                          </span>
                        ) : (
                          ""
                        );
                      })}
                  </td>
                  <td data-label="Student ID">
                    {" "}
                    {grades
                      ?.filter((item) => item.gradingPeriod === "2nd")
                      ?.map((grade, i) => {
                        return grade?.student?._id === item?.student?._id ? (
                          <span>
                            {grade?.grade}{" "}
                            <a>
                              {" "}
                              <MdIcons.MdOutlineModeEditOutline
                                style={{ fontSize: "15px" }}
                                onClick={() => {
                                  setCurrentRow(grade);
                                  setShowGradeEdit(true);
                                }}
                              />
                            </a>
                          </span>
                        ) : (
                          ""
                        );
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

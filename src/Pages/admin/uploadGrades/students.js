/* eslint-disable react/jsx-no-target-blank */
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
import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import { createGrade, editGrade, getGrades } from "../../../services/grades";
import { useSearchParams } from "react-router-dom";
import EditGrade from "../../../Components/modals/EditGrade";
import UploadGrade from "../../../Components/modals/UploadGrade";
import store from "store";
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
  let code = searchParams.get("code");
  let subjectDescription = searchParams.get("subject_description");
  let subjectName = searchParams.get("subject_name");
  const firstSemGrades = grades?.filter((item) => item.gradingPeriod === "1st");
  const secondSemGrade = grades?.filter((item) => item.gradingPeriod === "2nd");
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
  console.log(
    "the datat your looking for",
    grades?.filter(
      (item) =>
        item.gradingPeriod === "2nd" && item.student?.idNo === "30395224"
    )
  );
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
              <span style={{ fontWeight: 600 }}>STRAND:</span>{" "}
              {section?.students
                ? section?.students[0]?.student?.strand_track
                : ""}
            </div>
            <div>
              <span style={{ fontWeight: 600 }}>GRADE LEVEL:</span>{" "}
              {section?.gradeLevel}
            </div>
            <div>
              {" "}
              <span style={{ fontWeight: 600 }}>SUBJECT CODE: </span>
              {code}
            </div>
            <div>
              {" "}
              <span style={{ fontWeight: 600 }}>SUBJECT NAME: </span>
              {subjectDescription}
            </div>
          </div>

          <div className="column"></div>
        </div>
        <br></br>
        <table>
          <thead>
            <th>Name</th>
            <th>1st Grading</th>
            <th>2nd Grading</th>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <tr>
                  <td data-label="Student ID">{`${item?.student?.firstName} ${item?.student?.lastName}`}</td>
                  <td>
                    {firstSemGrades?.map((grade, i) => {
                      if (grade?.student?._id === item?.student?._id) {
                        return (
                          <span key={i}>
                            <InputNumber
                              min={0}
                              max={100}
                              defaultValue={grade?.grade}
                              onBlur={async (event) => {
                                const newGrade = event.target.value;
                                await editGrade(grade?._id, {
                                  grade: newGrade,
                                  gradingPeriod: "1st",
                                  schoolYear: section?.schoolYear,
                                  section: section?._id,
                                  semester: section?.semester,
                                  subject: subject,
                                  student: item?.student?._id,
                                });
                                await fetchSections();
                                await fetchGrades();
                              }}
                            />
                          </span>
                        );
                      }
                      return null;
                    })}
                    {!firstSemGrades?.some(
                      (grade) => grade?.student?._id === item?.student?._id
                    ) && (
                      <InputNumber
                        min={0}
                        max={100}
                        onBlur={async (event) => {
                          const newGrade = event.target.value;
                          await createGrade({
                            grade: newGrade,
                            gradingPeriod: "1st",
                            schoolYear: section?.schoolYear,
                            section: section?._id,
                            semester: section?.semester,
                            subject: subject,
                            student: item?.student?._id,
                          });
                          await fetchSections();
                          await fetchGrades();
                        }}
                      />
                    )}
                  </td>

                  <td>
                    {secondSemGrade?.map((grade, i) => {
                      if (grade?.student?._id === item?.student?._id) {
                        return (
                          <span key={i}>
                            <InputNumber
                              min={0}
                              max={100}
                              defaultValue={grade?.grade}
                              onBlur={async (event) => {
                                const newGrade = event.target.value;
                                await editGrade(grade?._id, {
                                  grade: newGrade,
                                  gradingPeriod: "2nd",
                                  schoolYear: section?.schoolYear,
                                  section: section?._id,
                                  semester: section?.semester,
                                  subject: subject,
                                  student: item?.student?._id,
                                });
                                await fetchSections();
                                await fetchGrades();
                              }}
                            />
                          </span>
                        );
                      }
                      return null;
                    })}
                    {!secondSemGrade?.some(
                      (grade) => grade?.student?._id === item?.student?._id
                    ) && (
                      <InputNumber
                        min={0}
                        max={100}
                        onBlur={async (event) => {
                          const newGrade = event.target.value;
                          await createGrade({
                            grade: newGrade,
                            gradingPeriod: "2nd",
                            schoolYear: section?.schoolYear,
                            section: section?._id,
                            semester: section?.semester,
                            subject: subject,
                            student: item?.student?._id,
                          });
                          await fetchSections();
                          await fetchGrades();
                        }}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <a
          href={` https://chipper-tartufo-914ac6.netlify.app?subject-code=${code}&type=student-list&id=${id}&subject${subject}&subject_name=${subjectName}&subject_code=${subjectDescription}&token=${store.get(
            "accessToken"
          )}`}
          style={{
            display: "flex",
            alignItems: "flex-start",
          }}
          target="_blank"
        >
          <button class="dl-pdf pdf">PDF</button>
        </a>
      </div>
    </>
  );
}

export default UploadStudentsList;

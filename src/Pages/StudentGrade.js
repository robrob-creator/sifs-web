/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./css/table.css";
import { Link, useNavigate } from "react-router-dom";
import StudentSidebar from "../Components/Student_Sidebar";
import "./css/container.css";
import student_grade from "./data/student_grade1";
import { getProfile } from "../services/user";
import { getGradesById } from "../services/grades";
import { Button, Col, Form, Input, Row, Select, Modal } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { authChecker } from "../services/auth";
import FeedbackModal from "../Components/modals/FeedbackModal";
import * as MdIcons from "react-icons/md";
import Pdf from "react-to-pdf";
import PDF from "./admin/grades";
import loader from "../Components/images/loader.gif";
const ref = React.createRef();
const { Option } = Select;

function StudentGrade() {
  const [profile, setProfile] = useState();
  const [grades, setGrades] = useState();
  const [expand, setExpand] = useState(false);
  const [currentRow, setCurrentRow] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  let navigate = useNavigate();

  const getFields = () => {
    const count = expand ? 4 : 3;
    const data = [
      { field: "schoolYear", label: "School year", type: "input" },
      {
        field: "gradeLevel",
        label: "Grade level",
        default: "",
        options: [7, 8, 9, 10, 11, 12],
        type: "select",
      },
      {
        field: "semester",
        label: "Semester",
        default: "1st",
        options: ["1st", "2nd"],
        type: "select",
      },
    ];
    const children = [];
    data.map((item, i) => {
      return children.push(
        <Col span={8} key={i}>
          <Form.Item
            name={`${item.field}`}
            label={`${item.label}`}
            initialValue={item?.default}
          >
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

  const fetchProfile = async (values) => {
    return await getProfile().then(async (res) => {
      setProfile(res?.data?.data?.profile);
      let grade = await getGradesById(res?.data?.data?.profile?._id, {
        ...values,
      });
      const grouped = grade?.data?.data?.list?.reduce(
        (catsSoFar, { subject, gradingPeriod, grade, gradedBy }) => {
          if (!catsSoFar[subject.name]) catsSoFar[subject.name] = [];
          catsSoFar[subject.name].push({
            name: subject.name,
            gradingPeriod,
            grade,
            gradedBy,
          });
          return catsSoFar;
        },
        {}
      );

      setGrades(Object.keys(grouped).map((key) => grouped[key]));
      return grade;
    });
  };

  useEffect(() => {
    authCheck();
    fetchProfile({ semester: "1st" });
  }, []);

  const authCheck = async () => {
    let auth = await authChecker();
    console.log(auth);
    if (!auth) {
      navigate("/");
    }
  };

  const onFinish = (values) => {
    fetchProfile(values);
  };

  return (
    <>
      <StudentSidebar profile={profile} />
      <FeedbackModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        currentRow={currentRow}
        Sender={profile?._id}
      />
      {grades ? (
        <div className="container">
          <h1 style={{ fontWeight: "bolder" }}>
            Welcome, {profile?.firstName}
          </h1>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>
                Name: {profile?.firstName} {profile?.lastName}
                <br></br>
                Strand/Track: {profile?.strand_track}
              </h4>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>
                Student No: {profile?.idNo}
                <br></br>Grade Level: {profile?.gradeLevel}
              </h4>
            </div>
          </div>
          <h2>Grades</h2>
          <table style={{ margin: 2 }} ref={ref}>
            <thead>
              <th>Subject Name</th>
              <th>1st Grading</th>
              <th>2nd Grading</th>
              <th>Average</th>
              <th>Remarks</th>
            </thead>
            <tbody>
              {grades?.map((s_grade, index) => {
                return (
                  <tr>
                    <td data-label="Subject Name">
                      {s_grade[0] && s_grade[0]?.name}
                    </td>
                    <td data-label="1st Grading">
                      <center>
                        <div
                          style={{
                            width: 40,
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {s_grade[0] &&
                            s_grade.filter((i) => i?.gradingPeriod === "1st")[0]
                              ?.grade}
                          {s_grade[0] &&
                          s_grade.filter((i) => i?.gradingPeriod === "1st")[0]
                            ?.grade ? (
                            <a
                              className="link"
                              onClick={() => {
                                setCurrentRow(
                                  s_grade[0]
                                    ? s_grade.filter(
                                        (i) => i?.gradingPeriod === "1st"
                                      )[0]
                                    : ""
                                );
                                setIsModalVisible(true);
                              }}
                            >
                              <MdIcons.MdOutlineComment color="#4caa75" />
                            </a>
                          ) : (
                            ""
                          )}
                        </div>
                      </center>
                    </td>
                    <td data-label="2nd Grading">
                      <center>
                        <div
                          style={{
                            width: 40,
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {s_grade[0] &&
                            s_grade?.filter(
                              (i) => i?.gradingPeriod === "2nd"
                            )[0]?.grade}
                          {s_grade[0] &&
                          s_grade?.filter((i) => i?.gradingPeriod === "2nd")[0]
                            ?.grade ? (
                            <a
                              className="link"
                              onClick={() => {
                                setCurrentRow(
                                  s_grade[0]
                                    ? s_grade.filter(
                                        (i) => i?.gradingPeriod === "2nd"
                                      )[0]
                                    : ""
                                );
                                setIsModalVisible(true);
                              }}
                            >
                              <MdIcons.MdOutlineComment color="#4caa75" />
                            </a>
                          ) : (
                            ""
                          )}
                        </div>
                      </center>
                    </td>
                    <td data-label="Average">
                      {" "}
                      {s_grade.filter((i) => i?.gradingPeriod === "1st")[0]
                        ?.grade &&
                      s_grade?.filter((i) => i?.gradingPeriod === "2nd")[0]
                        ?.grade
                        ? s_grade.filter((i) => i?.gradingPeriod === "1st")[0]
                            ?.grade +
                          s_grade?.filter((i) => i?.gradingPeriod === "2nd")[0]
                            ?.grade /
                            200
                        : "0"}
                    </td>
                    <td data-label="Remarks">
                      {" "}
                      {s_grade[0] &&
                      s_grade.filter((i) => i?.gradingPeriod === "1st")[0]
                        .grade &&
                      s_grade?.filter((i) => i?.gradingPeriod === "2nd")[0]
                        ?.grade
                        ? s_grade.filter((i) => i?.gradingPeriod === "1st")[0]
                            ?.grade +
                            s_grade?.filter(
                              (i) => i?.gradingPeriod === "2nd"
                            )[0]?.grade /
                              200 >
                          75
                          ? "passed"
                          : "failed"
                        : ""}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <button class="dl-pdf pdf" onClick={() => navigate("/pdf-file")}>
            Generate Pdf
          </button>
        </div>
      ) : (
        <div
          className="container2"
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

export default StudentGrade;

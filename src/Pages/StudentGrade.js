import React, { useEffect, useState } from "react";
import "./css/table.css";
import { Link } from "react-router-dom";
import StudentSidebar from "../Components/Student_Sidebar";
import "./css/container.css";
import student_grade from "./data/student_grade1";
import { getProfile } from "../services/user";
import { getGradesById } from "../services/grades";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
const { Option } = Select;

function StudentGrade() {
  const [profile, setProfile] = useState();
  const [grades, setGrades] = useState();
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();

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
        (catsSoFar, { subject, gradingPeriod, grade }) => {
          if (!catsSoFar[subject.name]) catsSoFar[subject.name] = [];
          catsSoFar[subject.name].push({
            name: subject.name,
            gradingPeriod,
            grade,
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
    fetchProfile({ semester: "1st" });
  }, []);
  console.log(
    "map",
    grades?.map((item) => {
      return item.filter((i) => i.gradingPeriod === "1st")[0].grade;
    })
  );

  const onFinish = (values) => {
    fetchProfile(values);
  };
  console.log(getFields());
  return (
    <>
      <StudentSidebar profile={profile} />
      <div className="container">
        <Form
          form={form}
          name="advanced_search"
          style={{ background: "white", padding: "20px", marginBottom: "20px" }}
          className="ant-advanced-search-form"
          onFinish={onFinish}
        >
          <Row gutter={24}>{getFields()}</Row>
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Button
                style={{ margin: "0 8px" }}
                onClick={() => {
                  form.resetFields();
                }}
              >
                Clear
              </Button>
              <a
                style={{ fontSize: 12 }}
                onClick={() => {
                  setExpand(!expand);
                }}
              >
                {expand ? <UpOutlined /> : <DownOutlined />} Collapse
              </a>
            </Col>
          </Row>
        </Form>
        <h2>Grades</h2>
        <table>
          <thead>
            <th>Subject Name</th>
            <th>1st Grading</th>
            <th>2nd Grading</th>
            <th>Average</th>
            <th>Remarks</th>
            <th>Feedback</th>
          </thead>
          <tbody>
            {grades?.map((s_grade, index) => {
              return (
                <tr>
                  <td data-label="Subject Name">
                    {s_grade[0] && s_grade[0]?.name}
                  </td>
                  <td data-label="1st Grading">
                    {s_grade[0] &&
                      s_grade.filter((i) => i?.gradingPeriod === "1st")[0]
                        ?.grade}
                  </td>
                  <td data-label="2nd Grading">
                    {" "}
                    {s_grade[0] &&
                      s_grade?.filter((i) => i?.gradingPeriod === "2nd")[0]
                        ?.grade}
                  </td>
                  <td data-label="Average">
                    {" "}
                    {s_grade[0] &&
                      s_grade.filter((i) => i?.gradingPeriod === "1st")[0]
                        ?.grade +
                        s_grade?.filter((i) => i?.gradingPeriod === "2nd")[0]
                          ?.grade /
                          200}
                  </td>
                  <td data-label="Remarks">
                    {" "}
                    {s_grade[0] &&
                    s_grade.filter((i) => i?.gradingPeriod === "1st")[0]
                      ?.grade +
                      s_grade?.filter((i) => i?.gradingPeriod === "2nd")[0]
                        ?.grade /
                        200 >
                      75
                      ? "passed"
                      : "failed"}
                  </td>
                  <td data-label="Feedback">
                    <Link className="link" to="/student/subject_feedback">
                      <input type="button" class="btn red" value="Feedback" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <input type="button" class="dl-pdf pdf" value="Download PDF" />
      </div>
    </>
  );
}

export default StudentGrade;

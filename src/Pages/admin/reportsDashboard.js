/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/container.css";
import "../css/table.css";
import "../css/icons.css";
import AdminSidebar from "../../Components/Admin_Sidebar";
import { Select, Row, Col, Typography } from "antd";
import { getSubjects } from "../../services/subjects";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getFeedbacks } from "../../services/feedback";
import { getProfile } from "../../services/user";
import { editFeedback } from "../../services/feedback";
import { getGrades } from "../../services/grades";
import loader from "../../Components/images/loader.gif";
const { Option } = Select;
const { Title } = Typography;

function ReportsDashboard() {
  const [data, setData] = useState();
  const [update, handleUpdates] = useState(true);
  const [subject, setSubject] = useState();
  const [profile, setProfile] = useState();

  const fetchProfile = async () => {
    let res = await getProfile();
    setProfile(res?.data?.data?.profile);
  };

  const fetchGrades = async () => {
    let res = await getGrades({});
    setData(res?.data?.data?.list);
  };
  const fetchSubjects = async () => {
    let res = await getSubjects({});
    setSubject(res?.data?.data?.list);
  };
  const rateResult = (value) => {
    if (value <= 10) return "Very Good";
    if (value <= 19) return "Good";
    if (value <= 25) return "Satisfactory";
    if (value >= 26) return "Very unsatisfactory";
  };

  useEffect(() => {
    if (!profile) {
      fetchProfile();
    }
    if (profile) {
      fetchGrades();
    }
    if (profile) {
      fetchSubjects();
    }
  }, [update, profile]);
  console.log(
    data?.filter(
      (e) => e?.subject?.name === "ET" && e.grade >= 80 && e.grade < 85
    )
  );
  return (
    <>
      <AdminSidebar />
      {data ? (
        <div className="container">
          <ToastContainer position="top-right" newestOnTop />
          <div className="row" style={{ marginBottom: 20 }}>
            <div className="column">
              <span>
                <Title level={3}>Reports</Title>
                <p>Learner Progress Report</p>
              </span>
              <Row>
                <Col span={12}>Outstanding</Col>
                <Col>90-100</Col>
              </Row>
              <Row>
                <Col span={12}>Very Satisfactory</Col>
                <Col>85-89</Col>
              </Row>
              <Row>
                <Col span={12}>Satisfactory</Col>
                <Col>80-84</Col>
              </Row>
              <Row>
                <Col span={12}>Fairly Satisfactory</Col>
                <Col>85-89</Col>
              </Row>
              <Row>
                <Col span={12}>Did Not Meet Expectations</Col>
                <Col>74 Below</Col>
              </Row>
            </div>
            <div className="column"></div>
          </div>
          {profile?.role && (
            <table>
              <thead>
                <th>Subject</th>

                <th>Outstanding</th>
                <th>Very Satisfactory</th>
                <th>Satisfactory</th>
                <th>Fairly Satisfactory</th>
                <th>Did Not Meet Expectations</th>
                {profile?.role.includes("teacher") && <th>Remarks</th>}
              </thead>
              <tbody>
                {subject &&
                  subject?.map((item, index) => {
                    return (
                      <tr>
                        <td data-label="Name">{item?.name}</td>

                        <td data-label="Name">
                          {
                            data?.filter(
                              (e) =>
                                e?.subject?.name === item?.name && e.grade >= 90
                            )?.length
                          }
                        </td>
                        <td data-label="Name">
                          {
                            data?.filter(
                              (e) =>
                                e?.subject?.name === item?.name &&
                                e.grade >= 85 &&
                                e.grade < 90
                            )?.length
                          }
                        </td>
                        <td data-label="Name">
                          {
                            data?.filter(
                              (e) =>
                                e?.subject?.name === item?.name &&
                                e.grade >= 80 &&
                                e.grade < 85
                            )?.length
                          }
                        </td>
                        <td data-label="School year">
                          {
                            data?.filter(
                              (e) =>
                                e?.subject?.name === item?.name &&
                                e.grade >= 75 &&
                                e.grade < 80
                            )?.length
                          }
                        </td>
                        <td data-label="School year">
                          {
                            data?.filter(
                              (e) =>
                                e?.subject?.name === item?.name && e.grade < 75
                            )?.length
                          }
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
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

export default ReportsDashboard;

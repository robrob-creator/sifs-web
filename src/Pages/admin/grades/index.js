/* eslint-disable jsx-a11y/alt-text */
import React, { createRef } from "react";
import background from "../../../Components/images/bg.png";
import header from "../../../Components/images/header.png";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useEffect } from "react";
import { getProfile } from "../../../services/user";
import { getGradesById } from "../../../services/grades";
import { useState } from "react";
const ref = React.createRef();

export default function PDF() {
  const [profile, setProfile] = useState();
  const [grades, setGrades] = useState();
  const [expand, setExpand] = useState(false);

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
    fetchProfile({ semester: "1st" });
  }, []);
  const printDocument = () => {
    html2canvas(ref.current, {
      width: 810,
      height: 1010,
      scale: 1,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("download.pdf");
    });
  };
  return (
    <div>
      <div style={{ padding: "40px" }}>
        <button
          class="dl-pdf pdf"
          style={{ backgroundColor: "blue" }}
          onClick={() => printDocument()}
        >
          Generate Pdf
        </button>
      </div>
      <div ref={ref} style={{ width: 810, height: 919 }}>
        <div style={{ width: 810, height: 504, position: "relative" }}>
          <img
            style={{
              width: 810,
              height: 104,
              right: 0,
              backgroundColor: "#94E49C",
              top: -10,
              paddingTop: "13px",
              paddingLeft: "10px",
              paddingRight: "10px",
              paddingBottom: "13px",
              position: "absolute",
            }}
            src={header}
          />
          <div
            style={{
              width: 810,
              height: 438,
              left: 0,
              top: 1,

              backgroundColor: "white",
            }}
          >
            <div
              style={{
                width: 810,
                height: 958,
                left: 0,
                top: 190,
                position: "absolute",
                backgroundColor: "rgba(255, 252.88, 252.88, 1)",
              }}
            />

            <div
              style={{
                width: "810px",
                top: "105px",
                height: "903px",
                position: "absolute",
                backgroundRepeat: "no-repeat",
                opacity: "60%",
                backgroundSize: "100%",
                backgroundImage: `url(${background})`,
              }}
            >
              <p
                style={{
                  width: 613,
                  height: 27,
                  fontSize: 17,
                  left: 37,
                  position: "absolute",
                  justifySelf: "flex-start",
                  lineHeight: "100%",
                  textAlign: "start",
                  color: "black",
                }}
              >
                Student Name: {profile?.firstName + " " + profile?.lastName}
                <br />
                Grade Level:{profile?.gradeLevel}
                <br />
                Strand :{profile?.strand_track}
                <br />
              </p>
              <div
                style={{
                  display: "flex",
                  position: "absolute",
                  top: "85px",
                  fontWeight: "bold",
                }}
              >
                <p
                  style={{
                    fontSize: 17,
                    width: "120px",
                    paddingRight: "91px",
                    paddingLeft: "91px",
                  }}
                >
                  Subject
                </p>{" "}
                <p
                  style={{
                    fontSize: 17,
                    width: "120px",
                    paddingRight: "21px",
                    paddingLeft: "21px",
                  }}
                >
                  Grades
                </p>{" "}
                <p
                  style={{
                    fontSize: 17,
                    width: "120px",
                    paddingRight: "91px",
                    paddingLeft: "91px",
                  }}
                >
                  Percentage
                </p>{" "}
                <p
                  style={{
                    fontSize: 17,
                    width: "120px",
                    paddingRight: "71px",
                    paddingLeft: "71px",
                  }}
                >
                  Remarks
                </p>
              </div>
              {/**cute here */}

              {grades &&
                grades.map((item, index) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        position: "absolute",
                        top: `${index + 1}40px`,
                      }}
                    >
                      <p
                        style={{
                          fontSize: 17,
                          width: "120px",
                          paddingRight: "91px",
                          paddingLeft: "91px",
                        }}
                      >
                        {item[0] && item[0]?.name}
                      </p>{" "}
                      <p
                        style={{
                          fontSize: 17,
                          width: "120px",
                          paddingRight: "21px",
                          textAlign: "center",
                          paddingLeft: "21px",
                        }}
                      >
                        {item[0]
                          ? item.filter((i) => i?.gradingPeriod === "1st")[0]
                              ?.grade
                          : "0"}{" "}
                        |{" "}
                        {item[0]
                          ? item.filter((i) => i?.gradingPeriod === "2nd")[0]
                              ?.grade
                          : "0"}
                      </p>{" "}
                      <p
                        style={{
                          fontSize: 17,
                          width: "120px",
                          paddingRight: "91px",
                          paddingLeft: "91px",
                        }}
                      >
                        {item.filter((i) => i?.gradingPeriod === "1st")[0]
                          ?.grade &&
                        item?.filter((i) => i?.gradingPeriod === "2nd")[0]
                          ?.grade
                          ? item.filter((i) => i?.gradingPeriod === "1st")[0]
                              ?.grade +
                            item?.filter((i) => i?.gradingPeriod === "2nd")[0]
                              ?.grade /
                              200
                          : "0"}
                      </p>{" "}
                      <p
                        style={{
                          fontSize: 17,
                          width: "120px",
                          paddingRight: "91px",
                          paddingLeft: "91px",
                        }}
                      >
                        {item[0] &&
                        item.filter((i) => i?.gradingPeriod === "1st")[0]
                          .grade &&
                        item?.filter((i) => i?.gradingPeriod === "2nd")[0]
                          ?.grade
                          ? item.filter((i) => i?.gradingPeriod === "1st")[0]
                              ?.grade +
                              item?.filter((i) => i?.gradingPeriod === "2nd")[0]
                                ?.grade /
                                200 >
                            75
                            ? "passed"
                            : "failed"
                          : ""}
                      </p>
                    </div>
                  );
                })}
              {/**cute here */}
              <div style={{ position: "absolute", bottom: 50 }}>
                <p
                  style={{
                    fontSize: 17,
                    paddingRight: "71px",
                    paddingLeft: "71px",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>
                    EMMANUEL P. CASEROS, Ph.D.
                  </span>
                  <br />
                  Senior High School Coordinator
                  <br />
                </p>
              </div>
              <div style={{ position: "absolute", bottom: 25, right: 0 }}>
                <p
                  style={{
                    fontSize: 17,
                    paddingRight: "71px",
                    paddingLeft: "71px",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>
                    {" "}
                    ELVIRA A. SALVANERA
                  </span>
                  <br />
                  Secondary School Principal I<br />
                  <br />
                </p>
              </div>
              <p
                style={{
                  fontSize: 17,
                  paddingRight: "71px",
                  paddingLeft: "71px",
                  position: "absolute",
                  bottom: 0,
                  color: "black",
                }}
              >
                Not Valid without School Seal
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import "./css/container.css";
import "./css/table.css";
import "./css/icons.css";
import AdminSidebar from "../Components/Admin_Sidebar";
import { getSubjects } from "../services/subjects";
import * as MdIcons from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import { getUsers } from "../services/user";
import { getSections, editSection } from "../services/sections";
import DefineSection from "../Components/modals/DefineSection";
import loader from "../Components/images/loader.gif";
import { Button } from "antd";

function AdminTeacherInfo() {
  const [profile, setProfile] = useState();
  const [section, setSection] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [subject, setSubject] = useState();
  const [selected, setSelected] = useState();
  const [allSection, setAllSection] = useState();
  const [addSectModal, setAddSectModal] = useState();
  const getProfile = async () => {
    let id = searchParams.get("id");
    let res = await getUsers({ id });
    setProfile(res?.data?.data?.list[0]);
  };
  const getTeacherSection = async () => {
    let id = searchParams.get("id");
    let res = await getSections({ teacher: id });
    setSection(res?.data?.data?.list);
  };

  const getSection = async () => {
    let res = await getSections();
    setAllSection(res?.data?.data?.list);
  };

  const fetchSubject = async () => {
    let res = await getSubjects();
    console.log(res.data.data.list);
    setSubject(res.data.data.list);
  };

  useEffect(() => {
    getProfile();
    getTeacherSection();
    fetchSubject();
    getSection();
  }, []);
  console.log("Failed2:", section);
  return (
    <>
      <AdminSidebar />
      {section ? (
        <div className="container">
          <DefineSection
            id={searchParams.get("id")}
            fetchSections={getTeacherSection}
            defaultSubjects={section?.subjects}
            selected={selected}
            section={allSection}
            addSectModal={addSectModal}
            setAddSectModal={setAddSectModal}
          />
          <h2>Teaching Load</h2>
          <div className="con">
            <h2 className="t-name">{`${profile?.lastName}, ${profile?.firstName}`}</h2>
            <div className="con-tab">
              {section?.map((item, index) => {
                return (
                  <>
                    <h3 className="t-sub">Section: {item?.name} || Subjects</h3>
                    <table className="tbl-tch">
                      <thead>
                        <th>Subject Name</th>

                        <th>School year</th>
                        {/*  <th className="del-col">Delete</th>*/}
                      </thead>

                      <tbody>
                        {item?.subjects &&
                          item?.subjects
                            ?.filter(
                              (subj) => subj?.teacher?._id === profile?._id
                            )
                            .map((sub, index) => {
                              return (
                                <tr>
                                  <td data-label="Subject Name">
                                    {sub?.subject?.name}
                                  </td>

                                  <td data-label="School year">
                                    {item?.schoolYear}
                                  </td>
                                  {/* <td data-label="Delete">
                                  <MdIcons.MdDelete
                                    className="icons-red"
                                    onClick={async () => {
                                      let subject = item?.subjects;
                                      subject[index].teacher = "";
                                      let data = { subjects: subject };
                                      console.log(data);
                                      editSection(item._id, {
                                        subjects: data.subjects?.map(
                                          (val, i) => {
                                            return {
                                              subject: val?.subject?._id,
                                              teacher: val?.teacher?._id,
                                            };
                                          }
                                        ),
                                      });
                                    }}
                                  />
                                </td>*/}
                                </tr>
                              );
                            })}
                      </tbody>
                    </table>
                  </>
                );
              })}
            </div>
            {/*  <div className="row2">
            <div className="column">
              <select
                className="sel"
                onChange={(e) => setSelected(e?.target?.value)}
              >
                {subject?.map((item, i) => {
                  return <option value={item?._id}>{item?.name}</option>;
                })}
              </select>
              <Button
                onClick={() => {
                  setAddSectModal(true);
                }}
                style={{ marginTop: 4 }}
                type="primary"
              >
                Add Subject
              </Button>
            </div>
            <div className="column mar">        
            </div>
          </div>*/}
          </div>
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

export default AdminTeacherInfo;

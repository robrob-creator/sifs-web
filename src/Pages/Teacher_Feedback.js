import React, { useEffect, useState } from "react";
import Student_Sidebar from "../Components/Student_Sidebar";
import "./css/form.css";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { createMessage } from "../services/feedback";
import { useSearchParams } from "react-router-dom";
import { getProfile } from "../services/user";
import { ToastContainer, toast } from "react-toastify";

function Teacher_Feedback() {
  const [message, setMessage] = useState();
  const [searchParams] = useSearchParams();
  const [profile, setProfile] = useState();
  let reciever = searchParams.get("to");

  const sendFeedBack = async () => {
    try {
      createMessage({ message, reciever, sender: profile?._id });
      toast("feedback sent", {
        type: "success",
      });
    } catch (err) {}
  };

  const fetchProfile = async () => {
    let res = await getProfile();
    setProfile(res?.data?.data?.profile);
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  console.log(profile);
  return (
    <>
      <Student_Sidebar />
      <div className="container">
        <ToastContainer position="top-right" newestOnTop />
        <div class="contact-section">
          <div class="contact-form">
            <h2>Send Feedback Here</h2>
            <form class="contact">
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                required
                onChange={(e) => setMessage(e?.target?.value)}
              />
              <input
                name="submit"
                class="send-btn"
                value="Send"
                onClick={() => sendFeedBack()}
              />
            </form>
          </div>
          <div class="contact-info">
            <div>
              <MdIcons.MdLocationOn className="icons-info" />
              Cabulohan, Cabanglasan, Bukidnon
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MdIcons.MdMail className="icons-info" />
              <span style={{ fontSize: "15px" }}>
                cabulohanparadisenationalhighschool@gmail.com
              </span>
            </div>
            <div>
              <FaIcons.FaPhoneAlt className="icons-info" />
              +63 9751 001 823
            </div>
            <div>
              <FaIcons.FaClock className="icons-info" />
              Mon - Fri 8:00 AM to 5:00 PM
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Teacher_Feedback;

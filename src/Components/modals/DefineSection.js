import { Button, Modal, Select, Form, Input } from "antd";
import React, { useState } from "react";
import { createSubject } from "../../services/subjects";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddStudentSection from "./AddStudentSection";
import {
  addOneSubjecttoSection,
  addSubjecttoSection,
} from "../../services/sections";
import { createSection } from "../../services/sections";
const { Option } = Select;
const { TextArea } = Input;

function DefineSection({
  addSectModal,
  setAddSectModal,
  selected,
  section,
  fetchSections,
  id,
  defaultSubjects,
}) {
  const handleOk = () => {
    setAddSectModal(false);
  };

  const handleCancel = () => {
    setAddSectModal(false);
  };
  const onFinish = async (value) => {
    await addOneSubjecttoSection(value.section, {
      subject: selected,
      teacher: id,
    });
    setAddSectModal(false);
    fetchSections();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title="Specify section"
      visible={addSectModal}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={"choose the section for the subject"}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Section"
          name="section"
          rules={[{ required: true, message: "Please select semester" }]}
        >
          <Select>
            {section?.map((item, i) => {
              return <Option value={item._id}>{item?.name}</Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default DefineSection;

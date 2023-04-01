import { Button, Modal, Select, Form, Input } from "antd";
import React, { useState } from "react";
import { createSubject } from "../../services/subjects";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddStudentSection from "./AddStudentSection";
import { createSection } from "../../services/sections";
const { Option } = Select;
const { TextArea } = Input;

function AddSection({ addSectModal, setAddSectModal, fetchSections }) {
  const handleOk = () => {
    setAddSectModal(false);
  };

  const handleCancel = () => {
    setAddSectModal(false);
  };
  const onFinish = async (values) => {
    let res = await createSection(values);
    setAddSectModal(false);
    fetchSections();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Modal
      title="Add Section"
      visible={addSectModal}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={"instruction: fill up the fields"}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please input the section name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="School Year"
          name="schoolYear"
          rules={[{ required: true, message: "Please input School Year!" }]}
        >
          <Select>
            <Option value="2021-2022">2021-2022</Option>
            <Option value="2022-2023">2022-2023</Option>
            <Option value="2023-2024">2023-2024</Option>
            <Option value="2024-2025">2024-2025</Option>
            <Option value="2025-2026">2025-2026</Option>
            <Option value="2026-2027">2026-2027</Option>
            <Option value="2027-2028">2027-2028</Option>
            <Option value="2028-2029">2028-2029</Option>
            <Option value="2029-2030">2029-2030</Option>
            <Option value="2030-2031">2030-2031</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Semester"
          name="semester"
          rules={[{ required: true, message: "Please select semester" }]}
        >
          <Select>
            <Option value="1st"> 1st Semester</Option>
            <Option value="2nd"> 2nd Semester</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Grade Level"
          name="gradeLevel"
          rules={[{ required: true, message: "Please select level" }]}
        >
          <Select>
            <Option value="11"> Grade 11</Option>
            <Option value="12"> Grade 12</Option>
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

export default AddSection;

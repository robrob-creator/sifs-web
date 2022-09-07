import { Button, Modal, Select, Form, Input } from "antd";
import React, { useState } from "react";
import { createGrade } from "../../services/grades";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddStudentSection from "./AddStudentSection";
import { createSection } from "../../services/sections";

import { useEffect } from "react";
const { Option } = Select;
const { TextArea } = Input;

function UploadGrade({
  showUpload,
  handleUpload,
  fetchSections,
  id,
  student,
  section,
  subject,
  fetchGrades,
}) {
  const [form] = Form.useForm();
  const handleOk = () => {
    handleUpload(false);
  };

  const handleCancel = () => {
    handleUpload(false);
  };
  const onFinish = async (values) => {
    try {
      let res = await createGrade(values);
      handleUpload(false);
      fetchSections();
      fetchGrades({ student, section: id });
    } catch (err) {
      toast(err?.response?.data?.message, {
        type: "error",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  console.log("passed data", section);
  useEffect(() => {
    form.setFieldsValue({
      student,
      section: id,
      schoolYear: section?.schoolYear,
      subject,
      semester: section?.semester,
    });
  }, [form, student, id, section, subject]);
  return (
    <Modal
      title="Upload Grade"
      visible={showUpload}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={"instruction: fill up the fields"}
    >
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          hidden
          label="Student"
          name="student"
          initialValue={student}
          rules={[{ required: true, message: "Please input the student!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          hidden
          label="Section"
          name="section"
          initialValue={id}
          rules={[{ required: true, message: "Please input the student!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          hidden
          label="School Year"
          name="schoolYear"
          initialValue={section?.schoolYear}
          rules={[{ required: true, message: "Please input School Year!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          hidden
          label="subject"
          name="subject"
          initialValue={subject}
          rules={[{ required: true, message: "Please input the student!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Grade"
          name="grade"
          rules={[{ required: true, message: "Please input the student!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Grading Period"
          name="gradingPeriod"
          rules={[{ required: true, message: "Please input the student!" }]}
        >
          <Select placeholder="PLease select">
            <Option value="1st">1st</Option>
            <Option value="2nd">2nd</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Semester"
          name="semester"
          hidden
          initialValue={section?.semester}
          rules={[{ required: true, message: "Please select semester" }]}
        >
          <Input />
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

export default UploadGrade;

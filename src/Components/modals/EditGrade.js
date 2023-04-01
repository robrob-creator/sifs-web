/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Modal, Select, Form, Input } from "antd";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editGrade } from "../../services/grades";

function EditGrade({ showGradeEdit, setShowGradeEdit, id, fetch }) {
  const handleOk = () => {
    setShowGradeEdit(false);
  };

  const handleCancel = () => {
    setShowGradeEdit(false);
  };

  const onFinish = async (value) => {
    await editGrade(id, value);
    await fetch();
    setShowGradeEdit(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  console.log(id);
  return (
    <Modal
      title="Change grade"
      visible={showGradeEdit}
      onOk={handleOk}
      onCancel={handleCancel}
      footer="enter the fields above"
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Grade"
          name="grade"
          rules={[{ required: true, message: "Please enter grade" }]}
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

export default EditGrade;

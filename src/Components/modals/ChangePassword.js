/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Modal, Select, Form, Input } from "antd";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { changePassword } from "../../services/user";

function ChangePassword({ changePassModal, setChangePassModal, id }) {
  const handleOk = () => {
    setChangePassModal(false);
  };

  const handleCancel = () => {
    setChangePassModal(false);
  };

  const onFinish = async (value) => {
    await changePassModal(id, value);
    setChangePassModal(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title="Change password"
      visible={changePassModal}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={<a>Use admin controls?</a>}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Old Password"
          name="oldPassword"
          rules={[{ required: true, message: "Please enter old password" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[{ required: true, message: "Please enter new password" }]}
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

export default ChangePassword;

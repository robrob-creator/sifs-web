/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Modal, Select, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminChangePassword } from "../../services/user";

function AdminChangePassword({
  changePassModal,
  setChangePassModal,
  id,
  password,
}) {
  const [form] = Form.useForm();
  const handleOk = () => {
    setChangePassModal(false);
  };

  const handleCancel = () => {
    setChangePassModal(false);
  };

  const onFinish = async (value) => {
    try {
      await adminChangePassword(id, value);
      setChangePassModal(false);
      toast("Succesfully changed", {
        type: "success",
      });
    } catch (err) {}
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    form.setFieldsValue({ oldPassword: password });
  }, [form, password]);
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
          initialValue={password}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[{ required: true, message: "Please enter new password" }]}
        >
          <Input type="password" />
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

export default AdminChangePassword;

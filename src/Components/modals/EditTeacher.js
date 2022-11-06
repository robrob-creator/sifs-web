import { Button, Modal, Checkbox, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { updateUser } from "../../services/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { TextArea } = Input;

function EditTeacher({ isModalVisible, setIsModalVisible, fetch, currentRow }) {
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    form.setFieldsValue({});
    setIsModalVisible(false);
  };
  const onFinish = async (values) => {
    try {
      let res = await updateUser(currentRow._id, values);
      toast("Succesfully added", {
        type: "success",
      });
      fetch();
      setIsModalVisible(false);
      console.log(res);
      return res;
    } catch (err) {
      toast("Adding failed", {
        type: "error",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    form.setFieldsValue(currentRow);
  }, [form, currentRow]);
  return (
    <Modal
      title="Edit User"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={"instruction: fill up the fields"}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        initialValues={currentRow}
        form={form}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input the first name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input the last name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Middle Name"
          name="middleName"
          rules={[{ required: true, message: "Please input the middle name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Suffix"
          name="suffix"
          rules={[{ required: false, message: "Please input the suffix!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Contact number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input the contact number!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Username"
          name="userName"
          rules={[
            { required: true, message: "Please input the strand/track!" },
          ]}
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

export default EditTeacher;

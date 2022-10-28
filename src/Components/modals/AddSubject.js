import { Button, Modal, Checkbox, Form, Input } from "antd";
import React, { useState } from "react";
import { createSubject } from "../../services/subjects";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { TextArea } = Input;

function Addsubject({ isModalVisible, setIsModalVisible, fetchSubject }) {
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = async (values) => {
    try {
      let res = await createSubject(values);
      toast("Succesfully added", {
        type: "success",
      });
      fetchSubject();
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
  return (
    <Modal
      title="Add Subject"
      visible={isModalVisible}
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
          label="Subject Name"
          name="name"
          rules={[
            { required: true, message: "Please input the subject name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Units" name="units">
          <Input />
        </Form.Item>
        <Form.Item label="Schedule" name="schedule">
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

export default Addsubject;

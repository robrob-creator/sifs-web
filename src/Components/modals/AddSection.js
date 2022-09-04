import { Button, Modal, Checkbox, Form, Input } from "antd";
import React, { useState } from "react";
import { createSubject } from "../../services/subjects";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddStudentSection from "./AddStudentSection";
import { createSection } from "../../services/sections";
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

export default AddSection;

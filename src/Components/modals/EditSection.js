import { Button, Modal, Select, Form, Input } from "antd";
import React, { useState } from "react";
import { createSubject } from "../../services/subjects";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editSection } from "../../services/sections";
import { createSection } from "../../services/sections";
import { useEffect } from "react";
const { Option } = Select;
const { TextArea } = Input;

function EditSection({
  editSectModal,
  setEditSectModal,
  fetchSections,
  defaultVal,
  setDefaultVal,
}) {
  const [form] = Form.useForm();
  const handleOk = () => {
    setDefaultVal([]);
    setEditSectModal(false);
  };

  const handleCancel = () => {
    setDefaultVal([]);
    setEditSectModal(false);
  };
  const onFinish = async (values) => {
    let res = await editSection(defaultVal._id, values);
    setEditSectModal(false);
    fetchSections();
    setDefaultVal([]);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  console.log("def", defaultVal);
  useEffect(() => {
    form.setFieldsValue(defaultVal);
  }, [form, defaultVal]);
  return (
    <Modal
      title="Edit Section"
      visible={editSectModal}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={"instruction: fill up the fields"}
    >
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={defaultVal}
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
            <Option value="7"> Grade 7</Option>
            <Option value="8"> Grade 8</Option>
            <Option value="9"> Grade 9</Option>
            <Option value="10"> Grade 10</Option>
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

export default EditSection;

import { Button, Modal, Checkbox, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { createSubject } from "../../services/subjects";
import { editSubject } from "../../services/subjects";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { TextArea } = Input;

function Editsubject({
  isEditVisible,
  setIsEditVisible,
  fetchSubject,
  currentRow,
}) {
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsEditVisible(false);
  };

  const handleCancel = () => {
    setIsEditVisible(false);
  };
  const onFinish = async (values) => {
    try {
      let res = await editSubject(currentRow?._id, values);
      toast("Succesfully edited", {
        type: "success",
      });
      fetchSubject();
      setIsEditVisible(false);
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
      title="Edit Subject"
      visible={isEditVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={"instruction: fill up the fields"}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={currentRow}
        form={form}
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

export default Editsubject;

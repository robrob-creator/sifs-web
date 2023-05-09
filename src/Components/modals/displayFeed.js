/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Modal, Checkbox, Form, Input, Radio } from "antd";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createMessage } from "../../services/feedback";

const { TextArea } = Input;

function DisplayFeed({
  isModalVisible,
  setIsModalVisible,
  currentRow,
  Sender,
}) {
  const [form] = Form.useForm();
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    form.setFieldsValue({});
    setIsModalVisible(false);
  };
  const onFinish = async (values) => {
    console.log(values);
    try {
      let res = await createMessage({
        review: values,
        sender: Sender,
        reciever: currentRow?.gradedBy,
        grade: currentRow?.grade,
        subject: currentRow?.code,
        seen: false,
        message: "N/A",
      });
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
  console.log("current", currentRow, Sender);
  return (
    <Modal
      title="Feedback"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        name="basic"
        labelCol={{ span: 18 }}
        disabled
        initialValues={currentRow}
        title="*Note:  5 is the highest 1 is the lowest"
        layout="vertical"
        form={form}
        wrapperCol={{ span: 18 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="The grade given was satisfactory to my performance"
          name="1"
          rules={[{ required: true, message: "Field required" }]}
        >
          <div>
            <Form.Item name={["rating", "1"]} noStyle>
              <Radio.Group>
                <Radio value={1}>1</Radio>
                <Radio value={2}>2</Radio>
                <Radio value={3}>3</Radio>
                <Radio value={4}>4</Radio>
                <Radio value={5}>5</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name={["comment", "1"]} noStyle>
              <Input />
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item
          label="The teacher had given the grades on time"
          name="2"
          rules={[{ required: true, message: "Field required" }]}
        >
          <div>
            <Form.Item name={["rating", "2"]} noStyle>
              <Radio.Group>
                <Radio value={1}>1</Radio>
                <Radio value={2}>2</Radio>
                <Radio value={3}>3</Radio>
                <Radio value={4}>4</Radio>
                <Radio value={5}>5</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name={["comment", "2"]} noStyle>
              <Input />
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item
          label="The grade was computed correctly"
          name="3"
          rules={[{ required: true, message: "Field required" }]}
        >
          <div>
            <Form.Item name={["rating", "3"]} noStyle>
              <Radio.Group>
                <Radio value={1}>1</Radio>
                <Radio value={2}>2</Radio>
                <Radio value={3}>3</Radio>
                <Radio value={4}>4</Radio>
                <Radio value={5}>5</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name={["comment", "3"]} noStyle>
              <Input />
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item
          label="The SMS notification was timely"
          name="4"
          rules={[{ required: true, message: "Field required" }]}
        >
          <div>
            <Form.Item name={["rating", "4"]} noStyle>
              <Radio.Group>
                <Radio value={1}>1</Radio>
                <Radio value={2}>2</Radio>
                <Radio value={3}>3</Radio>
                <Radio value={4}>4</Radio>
                <Radio value={5}>5</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name={["comment", "4"]} noStyle>
              <Input />
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item
          label="There was no hassle in accessing the link"
          name="5"
          rules={[{ required: true, message: "Field required" }]}
        >
          <div>
            <Form.Item name={["rating", "5"]} noStyle>
              <Radio.Group>
                <Radio value={1}>1</Radio>
                <Radio value={2}>2</Radio>
                <Radio value={3}>3</Radio>
                <Radio value={4}>4</Radio>
                <Radio value={5}>5</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name={["comment", "5"]} noStyle>
              <Input />
            </Form.Item>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default DisplayFeed;

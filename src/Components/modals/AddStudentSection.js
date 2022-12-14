import { Select, Input, Modal, Form } from "antd";
import React, { useState } from "react";
import { createSubject } from "../../services/subjects";
import { ToastContainer, toast } from "react-toastify";
import { addStudenttoSection } from "../../services/sections";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import { useEffect } from "react";
const { Option } = Select;

function AddStudentSection({
  modalVisible,
  setModalVisible,
  students,
  currentRow,
  fetchSections,
  defaultStud,
}) {
  const [payload, setPayload] = useState();
  const actionRef = useRef();
  const [form] = Form.useForm();

  const handleOk = async () => {
    let res = await addStudenttoSection(
      currentRow,
      payload.map((item) => {
        return { student: item };
      })
    );
    fetchSections();
    setModalVisible(false);
    toast("Succesfully added", {
      type: "success",
    });
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  const handleChange = (value) => {
    setPayload(value);
    console.log(`selected ${payload}`);
  };
  useEffect(() => {
    let values = students?.map((val, i) => {
      return val?._id;
    });
    form.setFieldsValue({
      student: defaultStud?.filter((item) => values?.includes(item)),
    });
    console.log("default", values);
  }, [form, defaultStud, students]);
  console.log(
    "default",
    students?.map((val, i) => {
      return val?._id;
    })
  );
  return (
    <Modal
      title="Add Student to Section"
      visible={modalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form name="basic" form={form} initialValues={{ student: defaultStud }}>
        <Form.Item name="student">
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            onChange={handleChange}
          >
            {students &&
              students.map((item, index) => {
                return (
                  <Option value={item._id}>
                    {`${item?.firstName} ${item?.lastName}`}{" "}
                  </Option>
                );
              })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddStudentSection;

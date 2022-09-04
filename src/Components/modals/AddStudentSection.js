import { Select, Input, Modal } from "antd";
import React, { useState } from "react";
import { createSubject } from "../../services/subjects";
import { ToastContainer, toast } from "react-toastify";
import { addStudenttoSection } from "../../services/sections";
import "react-toastify/dist/ReactToastify.css";
const { Option } = Select;

function AddStudentSection({
  modalVisible,
  setModalVisible,
  students,
  currentRow,
  defaultStud,
}) {
  const [payload, setPayload] = useState();
  const handleOk = async () => {
    let res = await addStudenttoSection(
      currentRow,
      payload.map((item) => {
        return { student: item };
      })
    );
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  const handleChange = (value) => {
    setPayload(value);
    console.log(`selected ${payload}`);
  };
  return (
    <Modal
      title="Add Student to Section"
      visible={modalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Please select"
        defaultValue={defaultStud}
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
    </Modal>
  );
}

export default AddStudentSection;

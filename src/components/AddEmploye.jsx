import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';
import { getManagerApi } from '../service/allApi';

const { Option } = Select;

function AddEmployee() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    assignedEmployees: "",
  });
console.log(userDetails);

  const [searchKey, setSearchKey] = useState("");
  const [allManagers, setAllManagers] = useState([]);

  // Get token from sessionStorage
  const token = sessionStorage.getItem("token");

  const reqHeader = {
    Authorization: `Bearer ${token}`,
  };

  const getAllManagers = async () => {
    try {
      const result = await getManagerApi(searchKey, reqHeader);
      setAllManagers(result?.data || []);
    } catch (error) {
      console.error("Failed to fetch managers:", error);
    }
  };

  useEffect(() => {
    if (userDetails.role === "Employee") {
      getAllManagers();
    } else {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        assignedEmployees: "",
      }));
    }
  }, [userDetails.role, searchKey]);

  const showModal = () => {
    setIsModalOpen(true);
    resetForm();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    form.resetFields();
    setUserDetails({
      name: "",
      email: "",
      password: "",
      role: "",
      assignedEmployees: "",
    });
    setSearchKey("");
  };

  const handleInputChange = (field, value) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleRegister = () => {
    console.log("User registered:", userDetails);
    handleCancel();
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add Employee or Manager
      </Button>
      <Modal
        title="Register Employee"
        open={isModalOpen}
        onOk={handleRegister}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="fullName" label="Full Name">
            <Input
              placeholder="Enter full name"
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input
              placeholder="Enter email"
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </Form.Item>

          <Form.Item name="password" label="Password">
            <Input.Password
              placeholder="Enter password"
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
          </Form.Item>

          <Form.Item name="role" label="Role">
            <Select
              placeholder="Select role"
              onChange={(value) => handleInputChange("role", value)}
            >
              <Option value="Manager">Manager</Option>
              <Option value="Employee">Employee</Option>
            </Select>
          </Form.Item>

          {userDetails.role === "Employee" && (
            <Form.Item name="assignManager" label="Assign Manager">
              <Select
                showSearch
                placeholder="Select manager"
                onChange={(value) => handleInputChange("assignedEmployees", value)}
                onSearch={(value) => setSearchKey(value)}
              >
                {allManagers.map((manager) => (
                  <Option key={manager._id} value={manager._id}>
                    {manager.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
}

export default AddEmployee;

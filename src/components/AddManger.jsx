import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';
import { requestApi } from '../service/allApi';
import { ToastContainer, toast } from 'react-toastify';

const { Option } = Select;

function AddManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    role: "Manager",
  });

  // Get token from sessionStorage
  const token = sessionStorage.getItem("token");
  const reqHeader = { Authorization: `Bearer ${token}` };

  // Show and hide modal
  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  // Update userDetails state
  const handleInputChange = (field, value) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  // Handle registration
  const handleRegister = async () => {
    const { name, email, password, role } = userDetails;
    if (!name || !email || !password || !role) {
      toast.info("Please fill out all fields.");
      return;
    }

    try {
      const result = await requestApi(userDetails, reqHeader);
      if (result.status === 200) {
        toast.success('Manager registered successfully!');
        setIsModalOpen(false);
        form.resetFields();
        setUserDetails({ name: "", email: "", password: "", role: "Manager" });
        handleCancel()
      } else if (result.status === 406) {
        toast.error("Email is already in use.");
      } else {
        toast.error('Something went wrong.');
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(error.response?.data?.message || "Server Error. Please try again.");
    }
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add Manager
      </Button>

      <Modal
        title="Register Manager"
        open={isModalOpen}
        onOk={handleRegister}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Please enter full name' }]}>
            <Input
              placeholder="Enter full name"
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
            <Input
              placeholder="Enter email"
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </Form.Item>

          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter a password' }]}>
            <Input.Password
              placeholder="Enter password"
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
          </Form.Item>

          <Form.Item name="role" label="Role">
            <Select defaultValue="Manager" disabled>
              <Option value="Manager">Manager</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <ToastContainer position="top-center" theme="colored" />
    </div>
  );
}

export default AddManager;

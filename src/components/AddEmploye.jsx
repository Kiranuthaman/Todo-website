import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';

const { Option } = Select;

function AddEmployee() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleRegister = () => {
   
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
          <Form.Item
            name="fullName"
            label="Full Name"
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
          >
            <Select placeholder="Select role">
              <Option value="Manager">Manager</Option>
              <Option value="Employee">Employee</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AddEmployee;

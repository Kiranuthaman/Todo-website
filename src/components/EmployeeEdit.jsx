import React, { useEffect, useState } from 'react';
import { Table, Tag, Card, Button, Modal, Form, Input, Select, DatePicker, message } from 'antd';

const { Option } = Select;

function EmployeeEdit() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
 
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleTaskRegister = () => {
    console.log('Task data submitted:');
    message.success('Task updated successfully!');
    handleCancel();
  };

  return (
    <div>
     
        <Button type="primary" onClick={showModal}>
          Edit Task
        </Button>
   

      <Modal
        title="Edit Task"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleTaskRegister}>
            Save Changes
          </Button>
        ]}
      >
        <Form form={form} layout="vertical">
         
          {/* Priority Dropdown */}
          <Form.Item name="priority" label="Status" >
            <Select
              placeholder="Update Status"
              
            >
              <Option value="High">Completed</Option>
              <Option value="Medium">In Progress</Option>
              <Option value="Medium">Pending</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default EmployeeEdit;

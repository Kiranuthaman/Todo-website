import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import Layout, { Content } from 'antd/es/layout/layout';
import AdminHeader from '../components/AdminHeader';
import { Table, Tag, Card, Button, Modal, Form, Input, Select, DatePicker } from 'antd';

const { Option } = Select;

function TaskStatus() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      console.log('Task added:', values);
      handleCancel();
    }).catch(info => {
      console.log('Validation failed:', info);
    });
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideBar />
      <Layout>
        <AdminHeader />
        <Content style={{ margin: '24px', padding: '24px', background: '#fff', borderRadius: '8px' }}>
          <Card>
            <Button type="primary" onClick={showModal} style={{ marginBottom: '16px' }}>
              Add Task
            </Button>
            <Table 
              columns={[
                { title: 'Task Name', dataIndex: 'taskName', key: 'taskName' },
                { title: 'Assigned To', dataIndex: 'assignedTo', key: 'assignedTo' },
                { 
                  title: 'Priority', 
                  dataIndex: 'priority', 
                  key: 'priority', 
                  render: (priority) => {
                    let color = priority === 'High' ? 'red' : priority === 'Medium' ? 'orange' : 'green';
                    return <Tag color={color}>{priority}</Tag>;
                  } 
                },
                { 
                  title: 'Status', 
                  dataIndex: 'status', 
                  key: 'status', 
                  render: (status) => {
                    let color = status === 'Completed' ? 'green' : status === 'In Progress' ? 'blue' : 'volcano';
                    return <Tag color={color}>{status}</Tag>;
                  } 
                }
              ]} 
              dataSource={[
                { key: '1', taskName: 'Build UI', assignedTo: 'Kiran', priority: 'High', status: 'In Progress' },
                { key: '2', taskName: 'Set up Backend', assignedTo: 'Rino', priority: 'Medium', status: 'Completed' },
                { key: '3', taskName: 'Create Database', assignedTo: 'Devu', priority: 'Low', status: 'Pending' },
                { key: '4', taskName: 'Design API', assignedTo: 'Aparna', priority: 'High', status: 'In Progress' },
                { key: '5', taskName: 'Write Tests', assignedTo: 'Leo', priority: 'Medium', status: 'Pending' },
              ]}
              pagination={{ pageSize: 5 }}
              scroll={{ x: 'max-content' }} 
              responsive 
            />
          </Card>
        </Content>
      </Layout>

      <Modal title="Add Task" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="taskName" label="Task Name" rules={[{ required: true, message: 'Please enter task name' }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="assignedTo" label="Assign To" rules={[{ required: true, message: 'Please select an assignee' }]}> 
            <Input></Input>
          </Form.Item>
          <Form.Item name="priority" label="Priority" rules={[{ required: true, message: 'Please select priority' }]}> 
            <Select placeholder="Select Priority">
              <Option value="High">High</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Low">Low</Option>
            </Select>
          </Form.Item>
          <Form.Item name="dueDate" label="Due Date" rules={[{ required: true, message: 'Please select due date' }]}> 
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}

export default TaskStatus;

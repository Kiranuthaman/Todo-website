import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import Layout, { Content } from 'antd/es/layout/layout';
import AdminHeader from '../components/AdminHeader';
import { Table, Tag, Card, Button, Modal, Form, Input, Select, DatePicker, message } from 'antd';
import { addTaskAPI, getAllEmployeesAndManagersAPI } from '../service/allApi';


const { Option } = Select;

function TaskStatus() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState({
    title: "",
    assignedTo: "",
    priority: "",
    dueDate: ""
  });

  useEffect(() => {
    getAllUsers();
  }, []);

  // Fetch employees and managers
  const getAllUsers = async () => {
    try {
      const result = await getAllEmployeesAndManagersAPI();
      if (result.status === 200) {
        setUsers(result.data);
      } else {
        console.error("Unexpected response:", result);
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleTaskRegister = async () => {
    try {
      const { title, assignedTo, priority, dueDate } = taskData;

      if (!title || !assignedTo || !priority || !dueDate) {
        message.error("Please fill all fields");
        return;
      }

      const reqBody = {
        title,
        assignedTo,
        priority,
        dueDate
      };

      const token = sessionStorage.getItem("token");
      if (!token) {
        message.error("Authentication token is missing");
        return;
      }

      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      const result = await addTaskAPI(reqBody, reqHeader);
      if (result.status === 200) {
        console.log(result.status);
        
        message.success("Task successfully added");
        setTasks([...tasks, result.data]); // Update table with new task
        handleCancel();
      } else {
        message.error(result.response.data);
      }
    } catch (err) {
      console.error("Error adding task:", err);
      message.error("Failed to add task");
    }
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
                { title: 'Task Name', dataIndex: 'title', key: 'title' },
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
              dataSource={tasks.map((task, index) => ({
                key: index,
                title: task.title,
                assignedTo: users.find(user => user._id === task.assignedTo)?.name || "Unknown",
                priority: task.priority,
                status: task.status || "Pending"
              }))}
              pagination={{ pageSize: 5 }}
              scroll={{ x: 'max-content' }}
              responsive
            />
          </Card>
        </Content>
      </Layout>

      {/* Modal for Adding Tasks */}
      <Modal
        title="Add Task"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleTaskRegister}>
            Add Task
          </Button>
        ]}
      >
        <Form form={form} layout="vertical">
          {/* Task Name */}
          <Form.Item name="title" label="Task Name" rules={[{ required: true, message: 'Please enter title' }]}>
            <Input onChange={(e) => setTaskData({ ...taskData, title: e.target.value })} />
          </Form.Item>

          {/* Assign To Dropdown */}
          <Form.Item name="assignedTo" label="Assign To" rules={[{ required: true, message: 'Please select an assignee' }]}>
            <Select
              placeholder="Select an assignee"
              onChange={(value) => setTaskData({ ...taskData, assignedTo: value })}
            >
              {users.map(user => (
                <Option key={user._id} value={user._id}>
                  {user.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Priority Dropdown */}
          <Form.Item name="priority" label="Priority" rules={[{ required: true, message: 'Please select priority' }]}>
            <Select
              placeholder="Select Priority"
              onChange={(value) => setTaskData({ ...taskData, priority: value })}
            >
              <Option value="High">High</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Low">Low</Option>
            </Select>
          </Form.Item>

          {/* Due Date Picker */}
          <Form.Item name="dueDate" label="Due Date" rules={[{ required: true, message: 'Please select due date' }]}>
            <DatePicker
              style={{ width: '100%' }}
              onChange={(date, dateString) => setTaskData({ ...taskData, dueDate: dateString })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}

export default TaskStatus;

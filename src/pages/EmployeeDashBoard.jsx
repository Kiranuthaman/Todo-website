import React from "react";
import { Layout, Card, Typography, Table, Tag, Button } from "antd";
import AdminHeader from "../components/AdminHeader";
import EmployeeEdit from "../components/EmployeeEdit";

const { Content } = Layout;
const { Title, Text } = Typography;

const EmployeeDashboard = () => {
  

  const columns = [
    { title: "Task Name", dataIndex: "title", key: "title" },
    { title: "Assigned To", dataIndex: "assignedTo", key: "assignedTo" },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => {
        const color = priority === "High" ? "red" : priority === "Medium" ? "orange" : "green";
        return <Tag color={color}>{priority}</Tag>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color = status === "Completed" ? "green" : status === "In Progress" ? "blue" : "volcano";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
      <EmployeeEdit/>
      ),
    },
  ];

  const dataSource = [
    {
      key: "1",
      title: "Task 1",
      assignedTo: "Arshul",
      priority: "High",
      status: "In Progress",
    },
    {
      key: "2",
      title: "Task 2",
      assignedTo: "Rahul",
      priority: "Medium",
      status: "Completed",
    },
    {
      key: "3",
      title: "Task 3",
      assignedTo: "Arshul",
      priority: "Low",
      status: "Pending",
    },
    {
      key: "4",
      title: "Task 4",
      assignedTo: "Sneha",
      priority: "High",
      status: "In Progress",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <AdminHeader />
        <Content
          style={{
            margin: "24px",
            padding: "24px",
            background: "#fff",
            borderRadius: "8px",
          }}
        >
          {/* Statistics Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "24px",
              marginBottom: "24px",
            }}
          >
            <Card hoverable>
              <Title level={4}>Total Tasks</Title>
              <Text>{dataSource.length}</Text>
            </Card>
            <Card hoverable>
              <Title level={4}>Tasks Pending</Title>
              <Text>{dataSource.filter((task) => task.status === "Pending").length}</Text>
            </Card>
            <Card hoverable>
              <Title level={4}>Completed Tasks</Title>
              <Text>{dataSource.filter((task) => task.status === "Completed").length}</Text>
            </Card>
          </div>

          {/* Task Table */}
          <Card title="Task List">
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={{ pageSize: 5 }}
              scroll={{ x: "max-content" }}
            />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default EmployeeDashboard;

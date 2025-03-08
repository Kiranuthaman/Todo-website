import React, { useEffect, useState } from "react";
import { Layout, Card, Typography, Spin } from "antd";
import AdminHeader from "../components/AdminHeader";
import ManagerSidebar from "../components/ManagerSidebar";

const { Content } = Layout;
const { Title, Text } = Typography;

function ManagerDashboard() {
 


  return (
    <Layout style={{ minHeight: "100vh" }}>
    <ManagerSidebar/>
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
              <Title level={4}>Total Employees</Title>
              <Text>4</Text>
            </Card>
            <Card hoverable>
              <Title level={4}>Tasks Pending</Title>
              <Text>6</Text>
            </Card>
            <Card hoverable>
              <Title level={4}>Completed Tasks</Title>
              <Text>5</Text>
            </Card>
          </div>
            <Card title="Employee List">
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li>
                  <Text>Kiran</Text>
                </li>
              </ul>
            </Card>
         
        </Content>
      </Layout>
    </Layout>
  );
}

export default ManagerDashboard;

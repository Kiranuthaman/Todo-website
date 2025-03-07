import React from 'react';
import { Layout, Card, Typography, Button } from 'antd';
import AddEmploye from '../components/AddEmploye';
import SideBar from '../components/SideBar';
import AddManager from '../components/AddManager';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const AdminDashboard = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideBar />
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={3} style={{ margin: 0 }}>Admin Dashboard</Title>
          <Button type='primary'>Logout</Button>
        </Header>

        <Content style={{ margin: '24px', padding: '24px', background: '#fff', borderRadius: '8px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '24px' }}>
            <Card hoverable>
              <Title level={4} style={{ marginBottom: 0 }}>Total Employees</Title>
              <Text>5</Text>
            </Card>
            <Card hoverable>
              <Title level={4} style={{ marginBottom: 0 }}>Total Managers</Title>
              <Text>5</Text>
            </Card>
            <Card hoverable>
              <Title level={4} style={{ marginBottom: 0 }}>Completed Tasks</Title>
              <Text>3</Text>
            </Card>
          </div>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <AddEmploye />
              <AddManager/>
            </div>
          </Card>

          <Card title="Employee List" style={{ marginBottom: '24px' }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li>KIRAN</li>
              <li>RINO</li>
              <li>DEVU</li>
            </ul>
          </Card>

          <Card title="Manager List">
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li>KIRAN</li>
              <li>RINO</li>
              <li>DEVU</li>
            </ul>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;

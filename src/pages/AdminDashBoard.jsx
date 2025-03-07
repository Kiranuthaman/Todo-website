import React, { useEffect, useState } from 'react';
import { Layout, Card, Typography, Button } from 'antd';
import AddEmploye from '../components/AddEmploye';
import SideBar from '../components/SideBar';
import AdminHeader from '../components/AdminHeader';


const { Header, Content } = Layout;
const { Title, Text } = Typography;

const AdminDashboard = () => {
 

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideBar />
      <Layout>
       
<AdminHeader/>
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
            </div>
          </Card>
        
          <Card title="Employee List" style={{ marginBottom: '24px' }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li>kiran</li>
              
            </ul>
          </Card>
          


          <Card title="Manager List">
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li>kiran</li>
             
            </ul>
            </Card>

        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;

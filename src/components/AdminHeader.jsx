import React from 'react';
import { Layout, Typography, Button } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

function AdminHeader() {
  return (
    <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Title level={3} style={{ margin: 0 }}>Admin Dashboard</Title>
      <Button 
        type='primary' 
    
      >
        Logout
      </Button>
    </Header>
  );
}

export default AdminHeader;

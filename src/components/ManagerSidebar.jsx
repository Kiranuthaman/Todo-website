import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, FileDoneOutlined, BarChartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Sider } = Layout;

function ManagerSidebar() {
      const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
         collapsible
         collapsed={collapsed}
         onCollapse={setCollapsed}
         breakpoint="md"
         style={{ background: '#001529' }}
       >
         <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
           <Link to={'/manager'}>
           <Menu.Item key="1" icon={<UserOutlined />}>
             Menu
           </Menu.Item>
           </Link>
           <Link to={'/manager/status'}>
           <Menu.Item key="2" icon={<FileDoneOutlined />}>
             Task Status
           </Menu.Item>
           </Link>
         </Menu>
       </Sider>
  )
}

export default ManagerSidebar
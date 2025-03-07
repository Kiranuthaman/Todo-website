import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, FileDoneOutlined, BarChartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

function SideBar() {
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
        <Link to={'/admin'}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          Manage Users
        </Menu.Item>
        </Link>
        <Menu.Item key="2" icon={<FileDoneOutlined />}>
          Task Status
        </Menu.Item>
        <Menu.Item key="3" icon={<BarChartOutlined />}>
          Assign Task
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SideBar;

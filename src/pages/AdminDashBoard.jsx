import React, { useEffect, useState } from 'react';
import { Layout, Card, Typography, Button } from 'antd';
import AddEmploye from '../components/AddEmploye';
import SideBar from '../components/SideBar';
import AdminHeader from '../components/AdminHeader';
import { getAllUsersAPI } from '../service/allApi';


const { Header, Content } = Layout;
const { Title, Text } = Typography;

const AdminDashboard = () => {
 

  const [employees,setEmployees]=useState([])
  const [manager,setManager]=useState([])
  const getAllUsers = async () => {
    const token = sessionStorage.getItem("token");
  
    if (!token) {
      console.error("No token found, authentication required.");
      return;
    }
    const reqHeader={
      
    "content-Type":"application/json",
    "authorization":`Bearer ${token}`
    }
  
    try {
      const result = await getAllUsersAPI(reqHeader); // Call API function
  
      if (result.status === 200 && Array.isArray(result.data)) {
        const users = result.data; // Ensure this is an array
  
        // Filter users based on roles
        const employees = users.filter((user) => user.role === "Employee");
        const managers = users.filter((user) => user.role === "Manager");
  
        setEmployees(employees); // Store employee list
        setManager(managers); // Store manager list
        console.log("Employees:", employees);
        console.log("Managers:", managers);
      } else {
        console.error("Unexpected response:", result);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };
  
  useEffect(() => {
    getAllUsers();
  }, []); // Runs only once
  


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

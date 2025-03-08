import React, { useEffect, useState } from 'react';
import { Layout, Card, Typography, Button } from 'antd';
import AddEmploye from '../components/AddEmploye';
import SideBar from '../components/SideBar';
import AdminHeader from '../components/AdminHeader';
import { getAllEmployeesAndManagersAPI } from '../service/allApi';
import AddManger from '../components/AddManger';


const { Header, Content } = Layout;
const { Title, Text } = Typography;

const AdminDashboard = () => {


  const [employee, setEmployee] = useState([])
  const [manager, setManager] = useState([])
  const [employeeCount, setEmployeeCount] = useState(0);
  const [managerCount, setManagerCount] = useState(0);

  const getAllEmployeesAndManagers = async () => {
    try {
      const result = await getAllEmployeesAndManagersAPI(); // Call API function

      if (result.status === 200) {
        // Ensure result.data is an array before filtering
        const employees = result.data.filter(emp => emp.role === "Employee");
        const managers = result.data.filter(emp => emp.role === "Manager");
        setEmployee(employees);
        setManager(managers)
        setEmployeeCount(employees.length)
        setManagerCount(managers.length)

      } else {
        console.error("Unexpected response:", result);
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  useEffect(() => {
    getAllEmployeesAndManagers();
  }, []);



  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideBar />
      <Layout>

        <AdminHeader />
        <Content style={{ margin: '24px', padding: '24px', background: '#fff', borderRadius: '8px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '24px' }}>
            <Card hoverable>
              <Title level={4} style={{ marginBottom: 0 }}>Total Employees</Title>
              <Text>{employeeCount}</Text>
            </Card>
            <Card hoverable>
              <Title level={4} style={{ marginBottom: 0 }}>Total Managers</Title>
              <Text>{managerCount}</Text>
            </Card>
            <Card hoverable>
              <Title level={4} style={{ marginBottom: 0 }}>Completed Tasks</Title>
              <Text>3</Text>
            </Card>
          </div>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <AddEmploye />
              <AddManger/>
            </div>
          </Card>
          <Card title="Employee List" style={{ marginBottom: '24px' }}>
            {employee?.length > 0 ? employee.map((employee, index) => (
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li>{employee.name}</li>

              </ul>
            )) : <p>not found</p>}</Card>

          <Card title="Manager List">
            {manager?.length > 0 ? manager.map((manager, index) => (

              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li>{manager.name}</li>

              </ul>
            )) : <p>not found</p>}  </Card>

        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;

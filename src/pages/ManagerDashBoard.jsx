import React, { useEffect, useState } from "react";
import { Layout, Card, Typography, Spin } from "antd";
import AdminHeader from "../components/AdminHeader";
import ManagerSidebar from "../components/ManagerSidebar";
import { getManagersEmployeesAPI } from "../service/allApi";

const { Content } = Layout;
const { Title, Text } = Typography;

function ManagerDashboard() {
 const [employee,setEmployee]=useState({})
 const [employeeCount,setEmployeeCount]=useState(0)
 
 
 const getEmployees = async () => {
 
 
   const token = sessionStorage.getItem("token");
   console.log("Retrieved Token:", token); // Debugging Token Retrieval
 
   if (!token) {
     openNotification("error", "Unauthorized", "No token found.");
   
     return;
   }
 
   const reqHeader = {
     "Content-Type": "application/json", // Corrected Content-Type
     Authorization: `Bearer ${token}`,
   };
 
   try {
     console.log("Making API Request..."); // Debugging API Request
     const result = await getManagersEmployeesAPI(reqHeader);
     console.log("API Response:", result); // Debugging API Response
 
     if (result.status === 200) {
       setEmployee(result.data || []);
       setEmployeeCount(result.data.length || 0);
       openNotification("success", "Data Loaded", "Employee details fetched successfully.");
     } else {
       openNotification("error", "Fetch Error", "Unexpected response from the server.");
     }
   } catch (err) {
     openNotification("error", "API Error", "Failed to fetch employee details.");
     console.error("Error fetching employees:", err);
   } finally {
     setLoading(false);
   }
 };
 
 // ✅ Use `useEffect` with an empty dependency array to prevent multiple calls
 useEffect(() => {
   getEmployees();
 }, []); 
 


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

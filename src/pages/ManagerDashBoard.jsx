import React, { useEffect, useState } from "react";
import { Layout, Card, Typography, Spin } from "antd";
import AdminHeader from "../components/AdminHeader";
import ManagerSidebar from "../components/ManagerSidebar";
import { getAllTaskToAdminAPI, getEmployeesAPI } from "../service/allApi";

const { Content } = Layout;
const { Title, Text } = Typography;

function ManagerDashboard() {
 const [employee,setEmployee]=useState({})
 const [employeeCount,setEmployeeCount]=useState(0)
 
 const[taskCompletedCount,setTaskCompletedCount]=useState(0)
 const[taskPendingCount,setTaskPendingCount]=useState(0)
 const getEmployees = async () => {
  try {
    console.log("Making API Request..."); // Debugging API Request

    const result = await getEmployeesAPI();
    console.log("API Response:", result); // Debugging API Response
console.log(result.data);

    if (result.status === 200) {
      const userId = sessionStorage.getItem("userId");
      if (!userId) {
        openNotification("error", "User Error", "User ID not found in session.");
        return;
      }

      // Filter employees based on assignedEmployees === userId
      const filteredEmployees = result.data.filter(emp => emp.assignedEmployees == userId);

      setEmployee(filteredEmployees);
      setEmployeeCount(filteredEmployees.length);
      
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

const getAllTasks = async () => {
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  if (token && userId) {
    const reqHeader = {
      "Content-Type": "multipart/form-data",
      "authorization": `Bearer ${token}`
    };

    try {
      const result = await getAllTaskToAdminAPI(reqHeader);

      if (result.status == 200) {
        console.log(result.data);
        
        // Filter tasks where assignedBy matches userId
        const assignedTasks = result.data.filter(task => task.assignedBy == userId);
        
        // Count tasks with status 'Completed'
        const completedTasks = assignedTasks.filter(task => task.status === "Completed").length;
        const pendingTasks = assignedTasks.filter(task => task.status === "Pending").length;

        setTaskCompletedCount(completedTasks);
        setTaskPendingCount(pendingTasks)
        console.log(completedTasks);
      } else {
        console.error("Unexpected response:", result);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  } else {
    console.error("Token or User ID missing in session storage");
  }
};



 useEffect(() => {
   getEmployees();
   getAllTasks()
 }, []); 
 console.log(employee);
 


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
              <Text>{employeeCount}</Text>
            </Card>
            <Card hoverable>
              <Title level={4}>Tasks Pending</Title>
              <Text>{taskPendingCount}</Text>
            </Card>
            <Card hoverable>
              <Title level={4}>Completed Tasks</Title>
              <Text>{taskCompletedCount}</Text>
            </Card>
          </div>
           {employee?.length>0?employee.map((emp)=>( <Card title="Employee List">
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li>
                  <Text>{emp.name}</Text>
                </li>
              </ul>
            </Card>)):<p>not found</p>}
         
        </Content>
      </Layout>
    </Layout>
  );
}

export default ManagerDashboard;

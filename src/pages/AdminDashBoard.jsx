import React, { useEffect, useState } from "react";
import { Layout, Card, Typography, notification, Spin, Button } from "antd";
import AddEmploye from "../components/AddEmploye";
import SideBar from "../components/SideBar";
import AdminHeader from "../components/AdminHeader";
import {  deleteAPI, getAllEmployeesAndManagersAPI, getAllTaskToAdminAPI, } from "../service/allApi";
import AddManager from "../components/AddManger";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const AdminDashboard = () => {
  const [employee, setEmployee] = useState([]);
  const [manager, setManager] = useState([]);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [managerCount, setManagerCount] = useState(0);
  const [loading, setLoading] = useState(true);
const [taskCompletedCount,setTaskCompletedCount]=useState(0)

  // Ant Design notification function
  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      placement: "topRight",
    });
  };

  // Fetch Employees & Managers
  const getAllEmployeesAndManagers = async () => {
    setLoading(true);
    try {
      const result = await getAllEmployeesAndManagersAPI();
      if (result.status === 200) {
        const employees = result.data.filter((emp) => emp.role === "Employee");
        const managers = result.data.filter((emp) => emp.role === "Manager");

        setEmployee(employees);
        setManager(managers);
        setEmployeeCount(employees.length);
        setManagerCount(managers.length);

        openNotification("success", "Data Loaded", "Employee and Manager details fetched successfully.");
      } else {
        openNotification("error", "Fetch Error", "Unexpected response from the server.");
      }
    } catch (err) {
      openNotification("error", "API Error", "Failed to fetch employee and manager details.");
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  };

  
const handleDelete= async(id)=>{

  const token = sessionStorage.getItem("token")
  if(token){

//api call
try{
const result =await deleteAPI(id)
if(result.status==200){
  getAllEmployeesAndManagers();
}else{
  console.log(result.response.data);
  
}
}catch(err){
console.log(err);

}
  }

}

const getAllTasks = async () => {
  const token = sessionStorage.getItem('token');
  if (token) {
    const reqHeader = {
      "Content-Type": "multipart/form-data",
      "authorization": `Bearer ${token}`
    };
    try {
      const result = await getAllTaskToAdminAPI(reqHeader);
      if (result.status === 200) {
       
        
        // Count tasks with status 'Completed'
        const completedTasks = result.data.filter(task => task.status === "Completed").length;
        setTaskCompletedCount(completedTasks);
        console.log(taskCompletedCount);
        
      } else {
        console.error("Unexpected response:", result);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  }
};


  useEffect(() => {
    getAllEmployeesAndManagers();
    getAllTasks();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar />
      <Layout>
        <AdminHeader />
        <Content style={{ margin: "24px", padding: "24px", background: "#fff", borderRadius: "8px" }}>
          {/* Statistics Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px", marginBottom: "24px" }}>
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
              <Text>{taskCompletedCount}</Text>
            </Card>
          </div>

          {/* Add Employee Section */}
          <Card style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
              <AddEmploye />
              <AddManager />
            </div>
          </Card>

          {/* Loading Indicator */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <Spin size="large" />
              <Text style={{ display: "block", marginTop: "10px" }}>Loading Data...</Text>
            </div>
          ) : (
            <>
              {/* Employee List */}
              {employee.length > 0 ? (
                <Card title="Employee List" style={{ marginBottom: "24px" }}>
                  <ul style={{ listStyleType: "none", padding: 0 }}>
                    {employee.map((emp) => (
                      <li key={emp._id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
                        <Text>{emp.name}</Text>
                        <Button type="link" danger onClick={() => handleDelete(emp._id, "Employee")}>
                          Delete
                        </Button>
                      </li>
                    ))}
                  </ul>
                </Card>
              ) : (
                <p>No employees found</p>
              )}

              {/* Manager List */}
              {manager.length > 0 ? (
                <Card title="Manager List">
                  <ul style={{ listStyleType: "none", padding: 0 }}>
                    {manager.map((mgr) => (
                      <li key={mgr._id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
                        <Text>{mgr.name}</Text>
                        <Button type="link" danger onClick={() => handleDelete(mgr._id, "Manager")}>
                          Delete
                        </Button>
                      </li>
                    ))}
                  </ul>
                </Card>
              ) : (
                <p>No managers found</p>
              )}
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;

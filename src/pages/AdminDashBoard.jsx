import React, { useEffect, useState } from "react";
import { Layout, Card, Typography, notification, Spin } from "antd";
import AddEmploye from "../components/AddEmploye";
import SideBar from "../components/SideBar";
import AdminHeader from "../components/AdminHeader";
import { getAllEmployeesAndManagersAPI } from "../service/allApi";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const AdminDashboard = () => {
  const [employee, setEmployee] = useState([]);
  const [manager, setManager] = useState([]);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [managerCount, setManagerCount] = useState(0);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    getAllEmployeesAndManagers();
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
              <Text>3</Text>
            </Card>
          </div>

          {/* Add Employee Section */}
          <Card style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
              <AddEmploye />
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
                    {employee.map((emp, index) => (
                      <li key={index}>{emp.name}</li>
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
                    {manager.map((mgr, index) => (
                      <li key={index}>{mgr.name}</li>
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

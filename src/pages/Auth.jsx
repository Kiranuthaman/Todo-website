import React from "react";
import { Layout, Row, Col, Typography, Button, Card, Form, Input } from "antd";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

function Auth() {




  return (
    <Layout
      style={{
        minHeight: "100vh",
        paddingBottom: "65px",
        paddingTop: "65px",
        paddingRight: "100px",
        paddingLeft: "100px",
      }}
    >
      <Content
        style={{
          background: "white",
          padding: "9px",
          borderRadius: "0px",
        }}
      >
        <Row style={{ height: "80vh" }} gutter={[16, 16]}>
          {/* Left Column for Login Form */}
          <Col
            xs={24}
            sm={24}
            md={12}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Card
              style={{
                padding: "30px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                width: "80%",
                textAlign: "center",
              }}
            >
              <Title level={2} >WELCOME BACK</Title>
              <Paragraph>Sign In to Your Team Workspace</Paragraph>

              {/* Login Form */}
              <Form layout="vertical" style={{ width: "100%" }}>
                {/* Email Input */}
                <Form.Item
                  label="Email ID"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                    { type: "email", message: "Enter a valid email!" },
                  ]}
                >
                  <Input placeholder="Enter your email" />
                </Form.Item>

                {/* Password Input */}
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please enter your password!"  },
                  ]}
                >
                  <Input.Password placeholder="Enter your password"  />
                </Form.Item>

                {/* Login Button */}
                <Form.Item>
                  <Button type="primary" size="large" block>
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          {/* Right Column with Full-Cover Image */}
          <Col
            xs={24}
            sm={24}
            md={12}
            style={{
              height: "100%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <img
                src="https://media.istockphoto.com/id/1434742171/photo/laptop-ppt-presentation-business-meeting-and-team-working-on-review-for-new-digital-website.jpg?s=612x612&w=0&k=20&c=MA7DEVo4nFIJPXgERQQx-W5srlaMThr_aFtDRaHeB00="
                alt="Cover"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default Auth;

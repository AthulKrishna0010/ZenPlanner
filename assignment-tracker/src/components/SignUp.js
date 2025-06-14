import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  PageWrapper,
  Card,
  Heading,
  Form,
  Input,
  Button,
  LinkText,
} from "./AuthStyles";

const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", // default role
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("https://zenplanner-de8a.onrender.com/api/auth/signup", user);
      if (response.status === 201 || response.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <PageWrapper>
      <Card>
        <Heading>Create Account</Heading>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <label style={{ marginTop: "10px", fontWeight: "bold" }}>
            Register As:
          </label>
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            required
            style={{
              padding: "0.6rem",
              marginTop: "0.5rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          >
            <option value="student">Student</option>
            <option value="mentor">Mentor</option>
          </select>

          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button type="submit">Sign Up</Button>
        </Form>
        <LinkText>
          Already have an account? <Link to="/login">Sign In</Link>
        </LinkText>
      </Card>
    </PageWrapper>
  );
};

export default SignUp;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
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

const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
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
      const response = await api.post("https://zenplanner-de8a.onrender.com/api/auth/login", user);

      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/dashboard");

      }
    } catch (err) {
      console.error(err);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <PageWrapper>
      <Card>
        <Heading>Sign In</Heading>
        <Form onSubmit={handleSubmit}>
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
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button type="submit">Sign In</Button>
        </Form>
        <LinkText>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </LinkText>
      </Card>
    </PageWrapper>
  );
};

export default SignIn;

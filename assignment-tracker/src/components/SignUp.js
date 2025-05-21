import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
      const response = await axios.post("http://localhost:8080/api/auth/signup", user);

      if (response.status === 201 || response.status === 200) {
        navigate("/signin");
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
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button type="submit">Sign Up</Button>
        </Form>
        <LinkText>
          Already have an account? <a href="/signin">Sign In</a>
        </LinkText>
      </Card>
    </PageWrapper>
  );
};

export default SignUp;

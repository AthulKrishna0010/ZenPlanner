// src/pages/Unauthorized.js
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 120px); // adjust for header/footer height
  background-color: rgb(192, 236, 213);
  padding: 2rem;
`;

const Card = styled.div`
  background-color: #fff;
  padding: 2.5rem 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 450px;
  width: 100%;
  text-align: center;
  border-left: 8px solid rgb(47, 72, 59);
`;

const Heading = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: rgb(47, 72, 59);
  margin-bottom: 1rem;
  text-transform: uppercase;
`;

const Message = styled.p`
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  background-color: rgb(219, 46, 46);
  color: white;
  padding: 0.6rem 1.2rem;
  font-size: 0.95rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Card>
        <Heading>Access Denied</Heading>
        <Message>You do not have permission to view this page.</Message>
        <Button onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
      </Card>
    </Container>
  );
};

export default Unauthorized;

// src/components/AuthStyles.js
import styled from "styled-components";

export const PageWrapper = styled.div`
  min-height: 80vh;
  width: auto;
  background-color: rgb(192, 236, 213);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

export const Card = styled.div`
  background-color: white;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 450px;
`;

export const Heading = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
  color: rgb(47, 72, 59);
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

export const Button = styled.button`
  background-color: rgb(47, 72, 59);
  color: white;
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 0.5rem;

  &:hover {
    background-color: #2c4c3d;
  }
`;

export const LinkText = styled.p`
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;

  a {
    color: rgb(47, 72, 59);
    font-weight: bold;
    text-decoration: none;
  }
`;

import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

// Full screen background
const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: rgb(192, 236, 213);
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 3rem;
  overflow-x: hidden;

`;

// Form container
const FormContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  box-sizing: border-box;

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 100%;
  margin-right: 90px;
`;

// Heading
const FormHeading = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: rgb(47, 72, 59);
  margin-bottom: 1.5rem;
`;

// Styled form and inputs
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const StyledInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

const StyledSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  background-color: rgb(47, 72, 59);
  color: white;
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2c4c3d;
  }
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 0.25rem;
  display: block;
  color: rgb(47, 72, 59);
`;


const AddAssignment = ({ onAdd }) => {
  const [assignment, setAssignment] = useState({
    title: "",
    subject: "",
    deadline: "",
    status: "Not Started",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/assignments", assignment)
      .then((response) => {
        alert("Assignment added!");
        onAdd(response.data);
        setAssignment({
          title: "",
          subject: "",
          deadline: "",
          status: "Not Started",
        });
      })
      .catch((error) => {
        console.error("Error submitting", error);
        alert("Failed to add assignment.");
      });
  };

  return (
    <PageWrapper>
      <FormContainer>
        <FormHeading>Add New Assignment</FormHeading>
        <StyledForm onSubmit={handleSubmit}>
          <Label htmlFor="title">Assignment Title</Label>
          <StyledInput
            type="text"
            name="title"
            value={assignment.title}
            onChange={handleChange}
            placeholder="Assignment Title"
            required
          />

          <Label htmlFor="subject">Subject</Label>
          <StyledInput
            type="text"
            name="subject"
            value={assignment.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
          />

          <Label htmlFor="deadline">Deadline</Label>
          <StyledInput
            type="date"
            name="deadline"
            value={assignment.deadline}
            onChange={handleChange}
            required
          />

          <Label htmlFor="status">Current Status</Label>
          <StyledSelect
            name="status"
            value={assignment.status}
            onChange={handleChange}
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </StyledSelect>

          <SubmitButton type="submit">Add Assignment</SubmitButton>
        </StyledForm>
      </FormContainer>
    </PageWrapper>
  );
};

export default AddAssignment;

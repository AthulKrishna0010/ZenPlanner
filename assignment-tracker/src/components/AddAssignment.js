import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

// Wrapper
const PageWrapper = styled.div`
  min-height: 100vh;
  width: auto;
  background-color: rgb(192, 236, 213);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 3rem;
  gap: 2rem;
`;

// Shared Card Style
const CardContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  box-sizing: border-box;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 1100px;
`;

const FormHeading = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: rgb(47, 72, 59);
  margin-bottom: 1.5rem;
`;

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

const DeleteButton = styled.button`
  background-color: rgb(187, 56, 56);
  color: white;
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 300px;
  &:hover {
    background-color: rgb(146, 42, 42);
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

  const [assignments, setAssignments] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = () => {
    axios
      .get("https://zenplanner-de8a.onrender.com/api/assignments/duplicate")
      .then((res) => setAssignments(res.data))
      .catch((err) => console.error("Fetch failed", err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://zenplanner-de8a.onrender.com/api/assignments/duplicate", assignment)
      .then((res) => {
        alert("Assignment added!");
        onAdd(res.data);
        setAssignment({
          title: "",
          subject: "",
          deadline: "",
          status: "Not Started",
        });
        fetchAssignments(); // Refresh list
      })
      .catch((err) => {
        console.error("Submit failed", err);
        // alert("Failed to add assignment.");
      });
  };

const handleDelete = () => {
  if (!selectedId) return;
  if (!window.confirm("Are you sure you want to delete this assignment?")) return;

  axios
    .delete(`https://zenplanner-de8a.onrender.com/api/assignments/${selectedId}`)
    .then(() => {
      alert("Assignment deleted!");
      fetchAssignments(); // Refresh list
      setSelectedId("");
    })
    .catch((error) => {
      console.error("Delete error:", error);
      alert("Failed to delete assignment.");
    });
};

  
  return (
    
    <PageWrapper>
      {/* Add Form Card */}
      <CardContainer>
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
      </CardContainer>

      
{/* Delete Card */}
<CardContainer>
  <FormHeading>Delete Assignment</FormHeading>
  <Label>Select Title to Delete</Label>
  <StyledSelect
    value={selectedId}
    onChange={(e) => setSelectedId(e.target.value)}
  >
    <option value="">-- Select Assignment --</option>
    {assignments.map((a) => (
      <option key={a.id} value={a.id}>
        {a.title}
      </option>
    ))}
  </StyledSelect>

  <DeleteButton onClick={handleDelete} disabled={!selectedId}>
    Delete Assignment
  </DeleteButton>
</CardContainer>

{/* Edit Assignment Card */}
<CardContainer>
  <FormHeading>Edit Assignment</FormHeading>
  <StyledForm onSubmit={(e) => {
    e.preventDefault();
    if (!selectedId) return;

    axios.put(`https://zenplanner-de8a.onrender.com/api/assignments/${selectedId}`, {
      title: assignment.title,
      subject: assignment.subject,
      deadline: assignment.deadline,
      status: assignment.status,
    })
    .then(() => {
      alert("Assignment updated!");
      fetchAssignments();
      setAssignment({
        title: "",
        subject: "",
        deadline: "",
        status: "Not Started",
      });
      setSelectedId("");
    })
    .catch((err) => {
      console.error("Update error:", err);
      alert("Failed to update assignment.");
    });
  }}>
    <Label>Select Title to Edit</Label>
    <StyledSelect
      value={selectedId}
      onChange={(e) => {
        const id = e.target.value;
        setSelectedId(id);
        const selected = assignments.find((a) => a.id === id);
        if (selected) {
          setAssignment({
            title: selected.title,
            subject: selected.subject,
            deadline: selected.deadline,
            status: selected.status,
          });
        }
      }}
    >
      <option value="">-- Select Assignment --</option>
      {assignments.map((a) => (
        <option key={a.id} value={a.id}>
          {a.title}
        </option>
      ))}
    </StyledSelect>

    <Label>Subject</Label>
    <StyledInput
      type="text"
      name="subject"
      value={assignment.subject}
      onChange={handleChange}
      placeholder="Subject"
      required
      disabled={!selectedId}
    />

    <Label>Deadline</Label>
    <StyledInput
      type="date"
      name="deadline"
      value={assignment.deadline}
      onChange={handleChange}
      required
      disabled={!selectedId}
    />

    <Label>Status</Label>
    <StyledSelect
      name="status"
      value={assignment.status}
      onChange={handleChange}
      disabled={!selectedId}
    >
      <option value="Not Started">Not Started</option>
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
    </StyledSelect>

    <SubmitButton type="submit" disabled={!selectedId}>
      Update Assignment
    </SubmitButton>
  </StyledForm>
</CardContainer>

    </PageWrapper>
  );
};

export default AddAssignment;

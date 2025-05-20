import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import styled from "styled-components";


// Styled container for the main content
const Container = styled.div`
  padding: 2rem;
  background-color:rgb(192, 236, 213);
  padding-bottom: 160px;
`;

// Styled heading for the dashboard title
const Heading = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color:rgb(47, 72, 59);
  margin-bottom: 3rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

// Styled card for each assignment
const AssignmentCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 35px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-bottom: ${(props) => `8px solid ${props.statusColor}`}; /* Dynamic bottom border color based on status */

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

// Styled text for assignment title
const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

// Styled text for the assignment details (subject, deadline, status)
const Details = styled.p`
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
`;

// Styled button for interaction or additional details
const Button = styled.button`
  background-color: rgb(219, 46, 46);
  color: white;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;

  &:hover {
    background-color: #2980b9;
  }
`;

const statusColors = {
  Completed: "green",
  "In Progress": "yellow",
  "Not Started": "red",
};

const InlineForm = styled.form`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const InlineInput = styled.input`
  padding: 0.4rem 0.6rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
`;

const InlineSelect = styled.select`
  padding: 0.4rem 0.6rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
`;

const InlineButton = styled.button`
  padding: 0.4rem 0.8rem;
  background-color: rgb(47, 72, 59);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;


const Dashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [assignment, setAssignment] = useState({
    title: "",
    subject: "",
    deadline: "",
    status: "Not Started",
  });

  // Fetch assignments on mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/assignments")
      .then((response) => setAssignments(response.data))
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  // Add new assignment to the list
  const handleAddAssignment = (newAssignment) => {
    setAssignments((prev) => [...prev, newAssignment]);
  };

  // Form handlers
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
        handleAddAssignment(response.data);
        setAssignment({
          title: "",
          deadline: "",
          status: "Not Started",
        });
      })
      .catch((error) => {
        console.error("Error submitting", error);
        alert("Failed to add assignment.");
      });
  };

  const handleStatusChange = (assignmentId, newStatus, title) => {
    const currentAssignment = assignments.find((a) => a.id === assignmentId);
    if (!currentAssignment) return;

    axios
      .put(`http://localhost:8080/api/assignments/${title}`, {
        ...assignment,
        title: title,
        subject: currentAssignment.subject,
        deadline: currentAssignment.deadline,
        status: newStatus,
      })
      .then(() => {
        setAssignments((prevAssignments) =>
          prevAssignments.map((a) =>
            a.id === assignmentId ? { ...a, status: newStatus } : a
          )
        );
      })
      .catch((err) => {
        console.error("Status update failed:", err);
        alert("Failed to update status.");
      });
  };

  const handleDelete = (id) => {
  if (!window.confirm("Are you sure you want to delete this assignment?")) return;

  axios.delete(`http://localhost:8080/api/assignments/${id}`)
    .then(() => {
      alert("Assignment deleted!");
      // Remove the deleted assignment from state to update UI instantly
      setAssignments(prev => prev.filter(a => a.id !== id));
    })
    .catch((error) => {
      console.error("Delete error:", error);
      alert("Failed to delete assignment.");
    });
};






  return (
    <Container>
      <Heading>Assignment Hub</Heading>



      {assignments.length === 0 ? (
        <p>No assignments available</p>
      ) : (
        <div className="grid gap-4">
          {[...assignments]
            .sort((a, b) => {
              // Push Completed to the bottom
              if (a.status === "Completed" && b.status !== "Completed") return 1;
              if (a.status !== "Completed" && b.status === "Completed") return -1;

              // Sort by nearest deadline
              return new Date(a.deadline) - new Date(b.deadline);
            })
            .map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                statusColor={statusColors[assignment.status]}
              >
                <Title>{assignment.title}</Title>
                <Details><strong>Subject:</strong> {assignment.subject}</Details>
                <Details>
                  <strong>Deadline:</strong>{" "}
                  {dayjs(assignment.deadline).format("DD MMM YYYY")}
                </Details>
                <Details>
                  <strong>Current Status:</strong>{" "}
                  <select
                    value={assignment.status}
                    onChange={(e) =>
                      handleStatusChange(assignment.id, e.target.value, assignment.title)
                    }
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </Details>

                <Button onClick={() => handleDelete(assignment.id)}>Delete</Button>

              </AssignmentCard>
            ))}
        </div>

      )}

      <InlineForm onSubmit={handleSubmit}>
        <InlineInput
          type="text"
          name="title"
          placeholder="Title"
          value={assignment.title}
          onChange={handleChange}
          required
        />

        <InlineInput
          type="text"
          name="subject"
          placeholder="Subject"      // ✅ New field
          value={assignment.subject}
          onChange={handleChange}
          required
        />
        <InlineInput
          type="date"
          name="deadline"
          value={assignment.deadline}
          onChange={handleChange}
          required
        />
        <InlineSelect
          name="status"
          value={assignment.status}
          onChange={handleChange}
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </InlineSelect>
        <InlineButton type="submit">Add</InlineButton>
      </InlineForm>

    </Container>
  );
};

export default Dashboard;


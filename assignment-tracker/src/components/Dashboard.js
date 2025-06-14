import React, { useEffect, useState } from "react";
import api from "../api";
import dayjs from "dayjs";
import styled from "styled-components";
// import { useEffect, useState } from "react";
// import dayjs from "dayjs";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


// Styled Components
const Container = styled.div`
  padding: 2rem;
  background-color: rgb(192, 236, 213);
  padding-bottom: 160px;
`;

const Heading = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: rgb(47, 72, 59);
  margin-bottom: 3rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const AssignmentCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-bottom: ${(props) => `8px solid ${props.statusColor}`};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const Details = styled.p`
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
`;

const StyledSelect = styled.select`
  margin-left: 0.5rem;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
`;

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
    background-color: #c0392b;
  }
`;

const InlineForm = styled.form`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 3rem;
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

const SubjectFilterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SubjectLabel = styled.label`
  font-size: 1.05rem;
  font-weight: 600;
  color: #2f483b;
`;

const StyleSelect = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #2f483b;
  font-size: 0.95rem;
  background-color: #fff;
  color: #2f483b;
  cursor: pointer;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover,
  &:focus {
    border-color: #1d3024;
    box-shadow: 0 0 0 3px rgba(47, 72, 59, 0.2);
    outline: none;
  }
`;

const StatusFilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
`;

const StatusTab = styled.button`
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1.05rem;
  font-weight: ${({ active }) => (active ? '700' : '500')};
  color: ${({ active }) => (active ? '#2f483b' : '#7f8c8d')};
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    color: #2f483b;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    height: 3px;
    width: ${({ active }) => (active ? '60%' : '0')};
    background: linear-gradient(to right, transparent, #2f483b, transparent);
    border-radius: 2px;
    transition: width 0.3s ease;
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 500;
  color: #34495e;
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  margin-top: 2rem;
  margin-bottom: 2rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

const statusColors = {
  Completed: "green",
  "In Progress": "yellow",
  "Not Started": "red",
};

// Main Component
const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [assignments, setAssignments] = useState([]);
  const [assignment, setAssignment] = useState({
    title: "",
    subject: "",
    deadline: "",
    status: "Not Started",
    studentId: user.id, // <- newly added
    studentName: user.name,
    
  });
  const [subjectFilter, setSubjectFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const role = user?.role || "student"; // fallback if user is null

  useEffect(() => {
  if (role === "mentor" || role === "admin") {
    // Fetch all assignments using /duplicate endpoint
    api
      .get("https://zenplanner-de8a.onrender.com/api/assignments/duplicate")
      .then((response) => setAssignments(response.data))
      .catch((error) => console.error("Error fetching assignments", error));
  } else {
    // Fetch assignments only for this student
    api
      .get(`https://zenplanner-de8a.onrender.com/api/assignments/duplicate/${user.id}`)
      .then((response) => setAssignments(response.data))
      .catch((error) => console.error("Error fetching student assignments", error));
  }
}, [role, user.id]);

useEffect(() => {
  if (role === "student") {
    const today = dayjs();
    const upcomingAssignments = assignments.filter((a) => {
      const dueDate = dayjs(a.deadline);
      const daysLeft = dueDate.diff(today, "day");
      return daysLeft >= 0 && daysLeft <= 3;
    });

    const shownSubjects = new Set();

    upcomingAssignments.forEach((a) => {
      if (!shownSubjects.has(a.subject)) {
        const dueDate = dayjs(a.deadline);
        const daysLeft = dueDate.diff(today, "day");
        toast.info(
          `Your assignment for ${a.subject} is due in ${daysLeft} day(s).`,
          {
            position: "top-right",
            autoClose: 5000,
            closeOnClick: true,
          }
        );
        shownSubjects.add(a.subject);
      }
    });
  }
}, [assignments, role]);

  const handleAddAssignment = (newAssignment) => {
    setAssignments((prev) => [...prev, newAssignment]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("https://zenplanner-de8a.onrender.com/api/assignments/duplicate", assignment)
      .then((response) => {
        alert("Assignment added!");
        handleAddAssignment(response.data);
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

  const handleStatusChange = (assignmentId, newStatus) => {
    const currentAssignment = assignments.find((a) => a.id === assignmentId);
    if (!currentAssignment) return;

    api
      .put(`https://zenplanner-de8a.onrender.com/api/assignments/${assignmentId}`, {
        ...currentAssignment,
        status: newStatus,
      })
      .then(() => {
        setAssignments((prev) =>
          prev.map((a) =>
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

    api
      .delete(`https://zenplanner-de8a.onrender.com/api/assignments/${id}`)
      .then(() => {
        alert("Assignment deleted!");
        setAssignments((prev) => prev.filter((a) => a.id !== id));
      })
      .catch((error) => {
        console.error("Delete error:", error);
        alert("Failed to delete assignment.");
      });
  };

  const allSubjects = Array.from(new Set(assignments.map((a) => a.subject)));

  const filteredAssignments = assignments.filter((a) => {
    const subjectMatch = subjectFilter ? a.subject === subjectFilter : true;
    const statusMatch = statusFilter ? a.status === statusFilter : true;
    
    const hideOwnAssignments = !(user.role === "mentor" && a.studentId === user.id);

    return subjectMatch && statusMatch && hideOwnAssignments;
  });

  return (
    <Container>
      <Heading>Assignment Hub</Heading>

      <SubjectFilterContainer>
        <SubjectLabel>Filter by Subject:</SubjectLabel>
        <StyleSelect
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
        >
          <option value="">All</option>
          {allSubjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))}
        </StyleSelect>
      </SubjectFilterContainer>

      <StatusFilterContainer>
        {["Not Started", "In Progress", "Completed"].map((status) => (
          <StatusTab
            key={status}
            active={statusFilter === status}
            onClick={() => setStatusFilter(statusFilter === status ? "" : status)}
          >
            {status}
          </StatusTab>
        ))}
      </StatusFilterContainer>

      {filteredAssignments.length === 0 ? (
        <EmptyMessage>No assignments found.</EmptyMessage>
      ) : (
        <Grid>
          {filteredAssignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              statusColor={statusColors[assignment.status] || "gray"}
            >
              {role === "mentor" && (
              <Title>Student: {assignment.studentName || "Unknown"}</Title>)}
              <Title>{assignment.title}</Title>
              <Details>
                Subject: <strong>{assignment.subject}</strong>
              </Details>
              <Details>
                Deadline: {dayjs(assignment.deadline).format("MMMM D, YYYY")}
              </Details>
              <Details>
                Status:
                <StyledSelect
                  value={assignment.status}
                  onChange={(e) =>
                    handleStatusChange(assignment.id, e.target.value)
                  }
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </StyledSelect>
              </Details>
              
              {(role === "mentor" || role === "admin") && (
                <Button onClick={() => handleDelete(assignment.id)}>Delete</Button>
              )}
            </AssignmentCard>
          ))}
        </Grid>
      )}

      {(role === "mentor" || role === "admin") && (
        <InlineForm onSubmit={handleSubmit}>
          <InlineInput
            name="title"
            type="text"
            placeholder="Assignment Title"
            value={assignment.title}
            onChange={handleChange}
            required
          />
         <InlineInput
  name="subject"
  type="text"
  placeholder="Enter Subject"
  value={assignment.subject}
  onChange={handleChange}
  required
/>

          <InlineInput
            name="deadline"
            type="date"
            value={assignment.deadline}
            onChange={handleChange}
            required
          />
          <InlineSelect
            name="status"
            value={assignment.status}
            onChange={handleChange}
            required
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </InlineSelect>
          <InlineButton type="submit">Add Assignment</InlineButton>
        </InlineForm>
      )}
      <ToastContainer />

    </Container>
  );
};

export default Dashboard;

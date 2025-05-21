import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import styled from "styled-components";
import './calendarStyles.css';


// Styled wrapper container
const Container = styled.div`
  padding: 2rem;
  background-color: rgb(192, 236, 213);
  min-height: 100vh;
`;

// Heading for the calendar
const Heading = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: rgb(47, 72, 59);
  margin-bottom: 2rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

// Section heading
const SubHeading = styled.h2`
  font-size: 1.25rem;
  color: #2c3e50;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

// Assignment item
const AssignmentItem = styled.li`
  font-size: 1rem;
  color: #34495e;
  margin-bottom: 0.5rem;
`;

// Card-like wrapper for assignments list
const AssignmentBox = styled.ul`
  background-color: white;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  list-style-type: disc;
  margin-left: 1rem;
`;

const CalendarView = () => {
  const [value, setValue] = useState(new Date());
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
  const fetchAssignments = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/assignments"); // update port if needed
      const data = await response.json();
      setAssignments(data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  fetchAssignments();
}, []);

  const getUpcomingAssignments = (selectedDate) => {
    const selected = dayjs(selectedDate);
   return assignments
  .filter((a) =>
    dayjs(a.deadline).isSame(selected, "day") ||
    dayjs(a.deadline).isAfter(selected)
  )
  .sort((a, b) => dayjs(a.deadline).diff(dayjs(b.deadline)));

  };

  return (
    <Container>
      <Heading>Assignment Calendar</Heading>

      <Calendar
  onChange={setValue}
  value={value}
  tileClassName={({ date, view }) => {
    const formatted = dayjs(date).format("YYYY-MM-DD");
    return assignments.some(a => a.deadline === formatted) ? "highlight" : null;
  }}
/>


      <SubHeading>
        Assignments due on or after {dayjs(value).format("DD MMM YYYY")}:
      </SubHeading>

      <AssignmentBox>
        {getUpcomingAssignments(value).length === 0 ? (
          <AssignmentItem>No assignments</AssignmentItem>
        ) : (
          getUpcomingAssignments(value).map((assignment) => (
            <AssignmentItem key={assignment.id}>
              📌 {assignment.title} — <strong>{dayjs(assignment.deadline).format("DD MMM YYYY")}</strong>
            </AssignmentItem>
          ))
        )}
      </AssignmentBox>
    </Container>
  );
};

export default CalendarView;

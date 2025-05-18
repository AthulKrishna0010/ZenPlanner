import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";

const CalendarView = () => {
  const [value, setValue] = useState(new Date());
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    // Later replace this with backend API call
    const dummyAssignments = [
      {
        id: 1,
        title: "DBMS Project Report",
        deadline: "2025-05-10",
      },
      {
        id: 2,
        title: "OS Assignment 3",
        deadline: "2025-04-28",
      },
      {
        id: 3,
        title: "Java Mini Project",
        deadline: "2025-05-10",
      },
    ];
    setAssignments(dummyAssignments);
  }, []);

  const getAssignmentsForDate = (date) => {
    const formatted = dayjs(date).format("YYYY-MM-DD");
    return assignments.filter(
      (assignment) => assignment.deadline === formatted
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Assignment Calendar</h1>
      <Calendar onChange={setValue} value={value} />
      
      <div className="mt-4">
        <h2 className="text-xl font-semibold">
          Assignments on {dayjs(value).format("DD MMM YYYY")}:
        </h2>
        <ul className="mt-2 list-disc ml-5">
          {getAssignmentsForDate(value).length === 0 ? (
            <li>No assignments</li>
          ) : (
            getAssignmentsForDate(value).map((assignment) => (
              <li key={assignment.id}>{assignment.title}</li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default CalendarView;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddAssignment from "./components/AddAssignment";
import CalendarView from "./components/CalendarView";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddAssignment />} />
        <Route path="/calendar" element={<CalendarView />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;

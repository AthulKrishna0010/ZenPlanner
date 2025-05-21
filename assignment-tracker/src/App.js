import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddAssignment from "./components/AddAssignment";
import CalendarView from "./components/CalendarView";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

// Create a wrapper component to use useLocation inside Router context
function AppContent() {
  const location = useLocation();
  const isAuthPage = ["/signin", "/signup"].includes(location.pathname);

  return (
    <>
      <Header isAuthPage={isAuthPage} />
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddAssignment />} />
        <Route path="/calendar" element={<CalendarView />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

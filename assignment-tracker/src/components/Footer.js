import React from "react";
import styled from "styled-components";

// Wrapper for the entire footer section
const FooterWrapper = styled.footer`
  background-color: #333; /* Dark background for contrast */
  color: #fff; /* Light text for readability */
  padding: 1.5rem 0; /* Spacing around the footer content */
  text-align: center; /* Center-align the content */
`;

// Container to organize footer content
const FooterContainer = styled.div`
  max-width: 960px; /* Restricts the width for clean design */
  margin: 0 auto; /* Centers the container within the page */
  display: flex; /* Flexbox for layout */
  flex-wrap: wrap; /* Allows content to wrap on smaller screens */
  gap: 1rem; /* Space between elements */
  justify-content: space-between; /* Distributes items across the width */
  align-items: center; /* Vertically aligns items */
`;

// Section for footer navigation links
const FooterLinks = styled.div`
  display: flex; /* Horizontal arrangement of links */
  gap: 1.5rem; /* Space between each link */

  a {
    color: #007bff; /* Blue color for links */
    text-decoration: none; /* Removes underline from links */

    &:hover {
      text-decoration: underline; /* Adds underline on hover */
    }
  }
`;

// Text for copyright information
const CopyrightText = styled.p`
  font-size: 0.85rem; /* Smaller text size for copyright info */
  margin: 0; /* No extra spacing */
`;

// Footer component definition
const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        {/* Links for navigation within the site */}
        <FooterLinks>
          <a href="/">Home</a>
          <a href="/add">Add Tasks</a>
          <a href="/calendar">Calendar</a>
          
        </FooterLinks>

        {/* Copyright information */}
        <CopyrightText>© 2025 ZenPlanner. All Rights Reserved.</CopyrightText>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;

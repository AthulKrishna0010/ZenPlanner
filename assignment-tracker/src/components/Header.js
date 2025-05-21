import React from 'react';
import styled from 'styled-components';
import logo from '../media/logo-2.png';

// Styled container for the header section
const HeaderContainer = styled.header`
  background-color: #f4f8fb; /* Light blue pastel background */
  padding: 20px; /* Adds spacing inside the header */
  display: flex; /* Flexbox layout for positioning */
  justify-content: space-between; /* Space between logo and navigation */
  align-items: center; /* Aligns items vertically in the center */
  border-bottom: 1px solid #e0e0e0; /* Subtle border at the bottom */
  
`;

// Wrapper for the logo section
const Logo = styled.div`
  display: flex; /* Displays logo image and text side by side */
  align-items: center; /* Vertically centers logo image and text */
  
`;

// Styling for the logo image
const LogoImage = styled.img`
  height: 90px; /* Sets the height of the logo image */
  margin-right: 20px; /* Adds space between the image and logo text */
  border-radius: 8px; /* Rounded corners for the logo */
`;

// Styling for the logo text
const LogoText = styled.h1`
  font-size: 1.5rem; /* Sets font size for the logo text */
  font-weight: 600; /* Stronger emphasis on the logo text */
  color: #2c3e50; /* Darker shade for readability */
  margin: 0; /* Removes default margin for cleaner layout */
`;

// Styling for the navigation section
const Nav = styled.nav`
  ul {
    list-style: none; /* Removes default list styles */
    padding: 0; /* Removes default padding */
    margin: 0; /* Removes default margin */
    display: flex;
    margin-right: 20px; /* Horizontal layout for navigation items */
  }

  li {
    margin-left: 30px; /* Space between navigation items */
    font-size: 18px;
  }

  a {
    text-decoration: none; /* Removes default underline on links */
    color: #3498db; /* Soft, friendly blue color for text */
    font-weight: 500; /* Boldens the link text for better visibility */

    &:hover {
      color: #1abc9c; /* Calming green for hover effect */
      transition: color 0.3s ease-in-out; /* Smooth transition for hover */
    }
  }
`;

// Functional component for the header
function Header({isAuthPage}) {
  if(isAuthPage){
    return (
    <HeaderContainer style={{ justifyContent: 'center' }}>
      {/* Logo section with image and text */}
      <Logo>
      
        <LogoImage src={logo} alt="ZenPlanner Logo" />    
        <LogoText>ZenPlanner</LogoText>
      </Logo>
      
      
    </HeaderContainer>
  );
  }
  return (
    <HeaderContainer>
      {/* Logo section with image and text */}
      <Logo>
      
        <LogoImage src={logo} alt="ZenPlanner Logo" />    
        <LogoText>ZenPlanner</LogoText>
      </Logo>
      {/* Navigation section */}
      <Nav>
        <ul>
          <li><a href="/">Home</a></li> {/* Link to Home page */}
          <li><a href="/add">Manage</a></li> {/* Link to Add Assignment page */}
          <li><a href="/calendar">Calendar</a></li> {/* Link to Calendar page */}
        </ul>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;

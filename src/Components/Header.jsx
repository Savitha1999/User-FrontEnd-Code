
import React, { useState } from 'react';
import { Container, Row, Col, Navbar, Nav, Button } from 'react-bootstrap';
import { FaPhoneAlt, FaGlobe } from 'react-icons/fa';
import ppclogo from "../Assets/ppc logo.jpg";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './Header.css'
const Header = () => {
  const [expand, updateExpanded] = useState(false);
  const navigate = useNavigate();
  const handleLoginPage = () => {
    navigate('/login');
  };
  const [hovered, setHovered] = useState(false);
  const [hovered2, setHovered2] = useState(false);

  const [hoveredLink, setHoveredLink] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  const buttonStyle = (id) => ({
    backgroundColor: hoveredButton === id ? "#FF8E2B" : "#ffc631",
    color: hoveredButton === id ? "white" : "#001f3f", // Text color change
    marginRight: "5px",
    border: "none",
    transition: "background-color 0.3s ease",
  });
const linkStyle = (id) => ({
  color: hoveredLink === id ? "#F9754B" : "white",
  transition: "color 0.3s ease",
});
  return (
    <header>
     
    <div className="container-fluid" style={{backgroundColor: "#ffc631"}}>
  <div className="row">
    <div className="col-12 col-sm-12 col-md-12 d-flex justify-content-between align-items-center pt-2 pb-2">
   
<div className="row p-2 align-items-center">
  {/* First phone block */}
  <div className="col-auto d-flex align-items-center">
    <p className="m-0 d-flex align-items-center" style={{ fontSize: "14px" }}>
      <span className="need-help-text mr-1">Need Help?</span>
      <FaPhoneAlt
        className={`mx-1 ${hovered ? "phone-animate" : ""}`}
        style={{
          color: "#001f3f",
          transition: "transform 0.3s ease-in-out"
        }}
      />
      <a
        href="tel:+9104132914409"
        style={{
          textDecoration: "none",
          color: "#001f3f",
          cursor: "pointer",
          fontWeight: hovered ? "bold" : "normal",
          transition: "font-weight 0.2s ease-in-out",
          fontSize: "14px"
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        +91 0413-2914409
      </a>
    </p>
  </div>

  {/* Second phone block */}
  <div className="col-auto d-flex align-items-center">
    <p
      className="m-0 d-flex align-items-center"
      style={{ fontSize: "14px" }}
      onMouseEnter={() => setHovered2(true)}
      onMouseLeave={() => setHovered2(false)}
    >
      <FaPhoneAlt
        className={`mx-1 ${hovered2 ? "phone-shake phone-pulse" : ""}`}
        style={{
          color: "#001f3f",
          transition: "transform 0.3s ease-in-out"
        }}
      />
      <a
        href="tel:+919150524409"
        style={{
          textDecoration: "none",
          color: "#001f3f",
          cursor: "pointer",
          fontWeight: hovered2 ? "bold" : "normal",
          transition: "font-weight 0.2s ease-in-out",
          fontSize: "14px"
        }}
      >
        +91 9150524409
      </a>
    </p>
  </div>

  <style>
    {`
      .phone-animate {
        animation: shake 0.3s ease-in-out infinite alternate;
      }
      .phone-pulse {
        animation: pulse 0.3s ease-in-out infinite alternate;
      }

      @keyframes shake {
        0% { transform: rotate(0); }
        25% { transform: rotate(-10deg); }
        50% { transform: rotate(10deg); }
        75% { transform: rotate(-5deg); }
        100% { transform: rotate(5deg); }
      }

      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }

      @media (max-width: 576px) {
        .text-left p {
          font-size: 12px;
        }
        .need-help-text {
          display: none;
        }
      }
    `}
  </style>
</div>


      <div className="text-right">
        <Button size="sm" className="me-2 weblogin" onClick={handleLoginPage}>Login</Button>
      </div>
    </div>
  </div>
</div>

    
  <Navbar style={{ backgroundColor: "#001f3f" }} expand="lg">
  <Container fluid className="ps-3 pe-1">
    {/* Logo and Title on the left */}
    <div className="d-flex align-items-center">
      <Navbar.Brand href="/" className="text-danger">
        <img
          src={ppclogo}
          alt="Logo"
          style={{ height: '40px' }}
          className="rounded-3"
        />
      </Navbar.Brand>
      <h3 className="m-0 fs-3 fs-sm-4 fs-md-5 fs-lg-6" style={{ color: "#ffffff" }}>PONDY PROPERTY</h3>
    </div>

    {/* Navbar.Toggle on the right side */}
    <Navbar.Toggle
      aria-controls="responsive-navbar-nav"
      className="ms-auto" // This moves it to the right
      onClick={() => {
        updateExpanded(expand ? false : "expanded");
      }}
    >
      <span></span>
      <span></span>
      <span></span>
    </Navbar.Toggle>

    <Navbar.Collapse id="basic-navbar-nav">
      <div className="ms-auto d-flex align-items-center">
        <Nav className="me-3 d-flex flex-column flex-lg-row w-100">
          {[{ id: 1, name: "HOME", href: "/" },
            { id: 2, name: "My Account", href: "/login" },
            { id: 3, name: "All Property", href: "/login" },
            { id: 4, name: "Search", href: "/login" },
            { id: 5, name: "Download", href: "https://play.google.com/store/apps/details?id=com.apps.ppcpondy&hl=en_IN" },
            { id: 6, name: "Pondy App", href: "https://play.google.com/store/apps/dev?id=5743868169001839900&hl=en_IN" }].map((item) => (
              <Nav.Link
                key={item.id}
                href={item.href}
                style={linkStyle(item.id)}
                target={item.href.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"

                onMouseEnter={() => setHoveredLink(item.id)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {item.name}
              </Nav.Link>
            ))}
          <div className="d-flex flex-column flex-lg-row">
            <Link
              to="/login"
              className="mb-2 mb-lg-0"
              onMouseEnter={() => setHoveredButton(1)}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <Button style={buttonStyle(1)}>Add Property</Button>
            </Link>

            <Link
              to="/login"
              onMouseEnter={() => setHoveredButton(2)}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <Button style={buttonStyle(2)}>Buyer Assistance</Button>
            </Link>
          </div>
        </Nav>
      </div>
    </Navbar.Collapse>
  </Container>
</Navbar>


    </header>
  );
};

export default Header;
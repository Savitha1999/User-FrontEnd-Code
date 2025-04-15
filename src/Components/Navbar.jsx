


import React, { useState, useEffect, useRef } from 'react';
import { FaHome, FaBuilding, FaLightbulb, FaUserCircle, FaRocket, FaCogs, FaInfoCircle, FaRegAddressCard, FaShare, FaStar, FaShieldAlt, FaUsers, FaEnvelope, FaRegBell, FaShippingFast } from 'react-icons/fa';
import logo from "../Assets/ppc logo.jpg";
import { useNavigate, useLocation } from 'react-router-dom';
import { MdClose, MdPolicy } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { RiApps2AiFill } from 'react-icons/ri';
import { HiDocumentText } from 'react-icons/hi2';
import { BiSolidLogIn } from 'react-icons/bi';
import axios from 'axios';





const SidebarApp = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [notifications, setNotifications] = useState([]);

    const [hasUnread, setHasUnread] = useState(false);
    const [hasClickedBell, setHasClickedBell] = useState(false);
  

  const handleMouseEnter = (linkId) => setHoveredLink(linkId);
  const handleMouseLeave = () => setHoveredLink(null);

  // Function to apply bold styling only to the hovered link
  const getLinkStyle = (linkId) => ({
    color: 'black',
    fontWeight: hoveredLink === linkId ? 'bold' : 'normal',
    transition: 'all 0.3s ease-in-out',
    transform: hoveredLink === linkId ? 'scale(1.1)' : 'scale(1)', // Slightly enlarge the link on hover

  });

  const { phoneNumber: statePhoneNumber, countryCode: stateCountryCode } = location.state || {};
  const storedPhoneNumber = localStorage.getItem('phoneNumber');
  const storedCountryCode = localStorage.getItem('countryCode');

  const phoneNumber = statePhoneNumber || storedPhoneNumber;
  const countryCode = stateCountryCode || storedCountryCode;

  const fullPhoneNumber = `${phoneNumber}`;

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);





  const fetchUnreadNotifications = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/get-unread-notifications`, {
        params: { phoneNumber },
      });
      const unread = res.data.notifications || [];

      setNotifications(unread);
      setHasUnread(unread.length > 0);

    } catch (error) {
      console.error("Error fetching unread notifications", error);
    }
  };

  useEffect(() => {
    if (phoneNumber) {
      fetchUnreadNotifications();
    }
  }, [phoneNumber]);

  const handleBellClick = () => {
    setHasClickedBell(true);
    navigate('/notification');

    // You can show the notifications dropdown or modal here
  };


  useEffect(() => {
    if (phoneNumber ) {
      localStorage.setItem('phoneNumber', phoneNumber);
      // localStorage.setItem('countryCode', countryCode);
    } else {
    }
  }, [phoneNumber]);

  const handleLinkClick = (path) => {
    navigate(path, { state: { phoneNumber: fullPhoneNumber } });
    closeSidebar();
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSidebarOpen]);







  return (
<div className="d-flex" style={{ fontFamily: "Inter, sans-serif" }}>
  {/* Sidebar */}
  <div
    ref={sidebarRef}
    className={`position-fixed bg-light border-end ${isSidebarOpen ? "d-block" : "d-none"}`}
    style={{
      width: "300px",
      height: "auto", 
      transition: "left 0.3s ease",
      zIndex: 2000,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden", // Prevents children from exceeding
    }}
  >
    <button
      className="btn position-absolute top-0 end-0 m-0"
      onClick={toggleSidebar}
      aria-label="Close Sidebar"
    >
      <MdClose />
    </button>

    {/* Fixed Header */}
    <div
      style={{
        background: "#30747F",
        flexShrink: 0, // Prevents header from shrinking
        padding: "10px",
      }}
      className="d-flex align-items-center w-100"
    >
      <img
        src={logo}
        alt="Logo"
        style={{ height: "80px", width: "80px" }}
        className="mb-2 mb-md-0 rounded-4"
      />
      <div className="ms-md-3 ms-2">
        <h6 style={{ color: "white" }}>Pondy Property</h6>
        <p style={{ color: "white", fontSize: "13px" }}>
          Buy and sell your Property in Pondicherry
        </p>
      </div>
    </div>
    <div className="row g-2 mt-1"
     style={{background:"#ffffff", overflowY: "scroll", scrollbarWidth: "none" , width:"300px", height: "75vh", }}>
    <ul className="nav flex-column pb-5 w-100 ">


      {/* Phone number in sidebar */}
      {phoneNumber && (
        <li className="nav-item">
          <a
            className="nav-link"
            style={getLinkStyle('phone')}
            onMouseEnter={() => handleMouseEnter('phone')}
            onMouseLeave={handleMouseLeave}
            href="/mobileviews"
            onClick={() => handleLinkClick("/mobileviews")}
          >
            <FaPhone className="me-2" style={{ color: '#30747F' }} />
            {fullPhoneNumber}
          </a>
        </li>
      )}

      {/* Sidebar links with hover effect */}
      <li className="nav-item">
        <a
          className="nav-link"
          style={getLinkStyle('home')}
          onMouseEnter={() => handleMouseEnter('home')}
          onMouseLeave={handleMouseLeave}
          href="/mobileviews"
          onClick={() => handleLinkClick("/mobileviews")}
        >
          <FaHome className="me-2" style={{ color: '#30747F' }} /> Home
        </a>
      </li>

      <li className="nav-item">
        <a
          className="nav-link"
          style={getLinkStyle('my-property')}
          onMouseEnter={() => handleMouseEnter('my-property')}
          onMouseLeave={handleMouseLeave}
          href="/my-property"
          onClick={() => handleLinkClick("/my-property")}
        >
          <FaBuilding className="me-2" style={{ color: '#30747F' }} /> My Property
        </a>
      </li>

      <li className="nav-item">
        <a
          className="nav-link"
          style={getLinkStyle('my-plan')}
          onMouseEnter={() => handleMouseEnter('my-plan')}
          onMouseLeave={handleMouseLeave}
          href={`/my-plan`}
          onClick={() => handleLinkClick(`/my-plan`)}
        >
          <FaLightbulb className="me-2" style={{ color: '#30747F' }} /> My Plan
        </a>
      </li>

      <li className="nav-item">
        <a
          className="nav-link"
          style={getLinkStyle('my-profile')}
          onMouseEnter={() => handleMouseEnter('my-profile')}
          onMouseLeave={handleMouseLeave}
          href={`/my-profile/${phoneNumber}`}
          onClick={() => handleLinkClick(`/my-profile/${phoneNumber}`)}
        >
          <FaUserCircle className="me-2" style={{ color: '#30747F' }} /> My Profile
        </a>
      </li>

      <li className="nav-item">
        <a
          className="nav-link"
          style={getLinkStyle('plans')}
          onMouseEnter={() => handleMouseEnter('plans')}
          onMouseLeave={handleMouseLeave}
          href="/add-plan"
          onClick={() => handleLinkClick("/add-plan")}
        >
          <FaRocket className="me-2" style={{ color: '#30747F' }} /> Upgrade Membership
        </a>
      </li>


      <li className="nav-item">
        <a
          className="nav-link"
          style={getLinkStyle('more')}
          onMouseEnter={() => handleMouseEnter('more')}
          onMouseLeave={handleMouseLeave}
          href="/mobileviews"
          onClick={() => handleLinkClick("/mobileviews")}
        >
          <FaCogs className="me-2" style={{ color: '#30747F' }} /> More
        </a>
      </li>

      <li className="nav-item">
        <a
          className="nav-link"
          style={getLinkStyle('contactus')}
          onMouseEnter={() => handleMouseEnter('contactus')}
          onMouseLeave={handleMouseLeave}
          href="/contactus"
          onClick={() => handleLinkClick("/contactus")}
        >
          <FaPhone className="me-2" style={{ color: '#30747F' }} /> Contact Us
        </a>
      </li>

      <li className="nav-item">
        <a
          className="nav-link"
          style={getLinkStyle('about-us')}
          onMouseEnter={() => handleMouseEnter('about-us')}
          onMouseLeave={handleMouseLeave}
          href="/about-mobile"
          onClick={() => handleLinkClick("/about-mobile")}
        >
          <FaInfoCircle className="me-2" style={{ color: '#30747F' }} /> About Us
        </a>
      </li>

      <li className="nav-item">
        <a
          className="nav-link"
          style={getLinkStyle('refund-policy')}
          onMouseEnter={() => handleMouseEnter('refund-policy')}
          onMouseLeave={handleMouseLeave}
          href="/refund-mobile"
          onClick={() => handleLinkClick("/refund-mobile")}
        >
          <MdPolicy className="me-2" style={{ color: '#30747F' }} /> Refund Policy
        </a>
      </li>

      <li className="nav-item">
        <a
          className="nav-link"
          style={getLinkStyle('terms-conditions')}
          onMouseEnter={() => handleMouseEnter('terms-conditions')}
          onMouseLeave={handleMouseLeave}
          href="/terms-conditions"
          onClick={() => handleLinkClick("terms-conditions")}
        >
          <HiDocumentText  className="me-2" style={{ color: '#30747F' }} /> Terms And Conditions
        </a>
      </li>

      <li className="nav-item">
        <a
          className="nav-link"
          style={getLinkStyle('shiping-delivery')}
          onMouseEnter={() => handleMouseEnter('shiping-delivery')}
          onMouseLeave={handleMouseLeave}
          href="/shiping-delivery-app"
          onClick={() => handleLinkClick("shiping-delivery")}
        >
          <FaShippingFast  className="me-2" style={{ color: '#30747F' }} />Shipping & Delivery
        </a>
      </li>

      <li className="nav-item">
        <a
          className="nav-link"
          style={getLinkStyle('more-app')}
          onMouseEnter={() => handleMouseEnter('more-app')}
          onMouseLeave={handleMouseLeave}
          href="/mobileviews"
          onClick={() => handleLinkClick("/mobileviews")}
        >
          <RiApps2AiFill className="me-2" style={{ color: '#30747F' }} /> More App
        </a>
      </li>

      <li className="nav-item">
        <a
          className="nav-link"
          style={getLinkStyle('share-app')}
          onMouseEnter={() => handleMouseEnter('share-app')}
          onMouseLeave={handleMouseLeave}
          href="/mobileviews"
          onClick={() => handleLinkClick("/mobileviews")}
        >
          <FaShare className="me-2" style={{ color: '#30747F' }} /> Share App
        </a>
      </li>

      <li className="nav-item">
        <a
          className="nav-link"
          style={getLinkStyle('rate-app')}
          onMouseEnter={() => handleMouseEnter('rate-app')}
          onMouseLeave={handleMouseLeave}
          href="/mobileviews"
          onClick={() => handleLinkClick("/mobileviews")}
        >
          <FaStar className="me-2" style={{ color: '#30747F' }} /> Rate App
        </a>
      </li>

      <li className="nav-item">
        <a
          className="nav-link"
          style={getLinkStyle('business')}
          onMouseEnter={() => handleMouseEnter('business')}
          onMouseLeave={handleMouseLeave}
          href="/business"
          onClick={() => handleLinkClick("/business")}
        >
          <FaShieldAlt className="me-2" style={{ color: '#30747F' }} /> Business Opportunity
        </a>
      </li>

      <li className="nav-item">
        <a
          className="nav-link"
          style={getLinkStyle('our-support')}
          onMouseEnter={() => handleMouseEnter('our-support')}
          onMouseLeave={handleMouseLeave}
          href="/our-support"
          onClick={() => handleLinkClick("/our-support")}
        >
          <FaUsers className="me-2" style={{ color: '#30747F' }} /> Our Support
        </a>
      </li>

      <li className="nav-item">
        <a
          className="nav-link"
          style={getLinkStyle('login')}
          onMouseEnter={() => handleMouseEnter('login')}
          onMouseLeave={handleMouseLeave}
          href="/mobileviews"
          onClick={() => handleLinkClick("/mobileviews")}
        >
          <BiSolidLogIn  className="me-2" style={{ color: '#30747F' }} /> Login
        </a>
      </li>
    </ul>
    </div>

      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Navbar */}
        <nav
          className="navbar navbar-light bg-light d-flex align-items-center justify-content-between px-3"
          style={{ width: '100%', height: '60px' }}
        >
          <button className="btn" onClick={toggleSidebar}>
            ☰
          </button>
          <span className="navbar-brand mb-0 text-center mx-auto">Pondy Property</span>
          {/* <button className="btn border-0" style={{ fontWeight: 'bold' }}>
            <FaRegBell color="#30747F" size={24} />
          </button> */}

{/* <div style={{ position: "relative" }}>
  <button className="btn border-0" style={{ fontWeight: 'bold' }}>
    <FaRegBell color="#30747F" size={24} />
  </button>

  {notifications && (
    <span
      style={{
        position: "absolute",
        top: "4px",
        right: "4px",
        width: "10px",
        height: "10px",
        backgroundColor: "red",
        borderRadius: "50%",
        zIndex: 1,
      }}
    ></span>
  )}
</div> */}

<div style={{ position: "relative" }}>
      <button className="btn border-0" style={{ fontWeight: "bold" }} onClick={handleBellClick}>
        <FaRegBell color="#30747F" size={24} />
      </button>

      {/* Show red badge only if there are unread notifications AND user hasn’t clicked yet */}
      {hasUnread && !hasClickedBell && (
        <span
          style={{
            position: "absolute",
            top: "4px",
            right: "4px",
            width: "10px",
            height: "10px",
            backgroundColor: "red",
            borderRadius: "50%",
            zIndex: 1,
          }}
        ></span>
      )}
    </div>


        </nav>
      </div>
    </div>
  );
};

export default SidebarApp;









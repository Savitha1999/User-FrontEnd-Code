




import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./Main";
import {  useLocation, useNavigate } from "react-router-dom";

const MoblieView = () => {
  
  const navigate = useNavigate();
  
  useEffect(() => {
    // Function to check if the device is mobile
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    const handlePopState = (e) => {
      // Prevent back navigation on desktop
      if (!isMobile) {
        window.history.pushState(null, document.title, window.location.href);
      } else {
        // Exit or perform an exit action on mobile
        // Here we redirect to a default exit page or close the app
        alert('Back button pressed on mobile, exiting app!');
        // For mobile: You can also redirect to a specific route, close the app, or use window.close()
        // navigate('/exit'); // This is an example of redirecting to an exit page
      }
    };

    // Push a new state to prevent going back
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', handlePopState);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);




  return (
    <>
<div className="d-flex justify-content-center align-items-center vh-100" style={{ minHeight: "100vh", background: '#E5E5E5' }}>
  <div style={{ maxWidth: '470px', width: "100%", background: 'white', display: "flex", flexDirection: "column", overflow: "hidden" , height: "100%"}}>
    <Main />
  </div>
</div>
    </>
  );
};

export default MoblieView;









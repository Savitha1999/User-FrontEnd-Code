









import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./Main";
import {  useLocation, useNavigate } from "react-router-dom";

const MoblieView = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleBackNavigation = (event) => {
      event.preventDefault();
      const confirmLeave = window.confirm("Are you sure you want to leave this page?");
      
      if (!confirmLeave) {
        window.history.pushState(null, "", location.pathname); // Stay on page
      } else {
        navigate(-1); // Allow navigation
      }
    };

    // Prevent the first back press from allowing navigation
    window.history.pushState(null, "", location.pathname);

    // Listen for back/forward button clicks
    window.addEventListener("popstate", handleBackNavigation);

    return () => {
      window.removeEventListener("popstate", handleBackNavigation);
    };
  }, [navigate, location.pathname]);
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




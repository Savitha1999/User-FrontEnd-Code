import React, { useState, useEffect } from "react";
import { FaRulerCombined, FaBed, FaCalendarAlt, FaUserAlt, FaRupeeSign, FaArrowLeft } from "react-icons/fa";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import axios from "axios";
import "./MyProperty.css";
import { useNavigate } from "react-router-dom";

const RemovedProperty = () => {
  const phoneNumber = localStorage.getItem("phoneNumber"); // Get phone number from localStorage
  const [removedUsers, setRemovedUsers] = useState([]); // Store deleted properties
    const [message, setMessage] = useState("");
      const [propertyUsers, setPropertyUsers] = useState([]);
    
  
    useEffect(() => {
      if (message) {
        const timer = setTimeout(() => setMessage(""), 3000); // Auto-close after 3 seconds
        return () => clearTimeout(timer); // Cleanup timer
      }
    }, [message]);
    

  // Fetch removed properties when component loads
  useEffect(() => {
    if (phoneNumber) {
      fetchDeletedProperties(phoneNumber);
    }
  }, [phoneNumber]);

  // API call to get deleted properties
  const fetchDeletedProperties = async (phoneNumber) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-delete-status`, {
        params: { phoneNumber },
      });

      if (response.status === 200) {
        setRemovedUsers(response.data.users);
      }
    } catch (error) {
      console.error("Error fetching deleted properties:", error);
    }
  };

  
  const handleUndo = async (ppcId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/undo-delete`, {
        ppcId,
        phoneNumber,
      });

      if (response.status === 200) {
        setMessage("Property status reverted successfully!");
        setRemovedUsers((prev) => prev.filter((user) => user.ppcId !== ppcId));
        setPropertyUsers((prev) => [...prev, { ...response.data.user }]);
      }
    } catch (error) {
      setMessage("Error undoing property status.");
    }
  };

  const navigate = useNavigate();


  const handlePageNavigation = () => {
    navigate('/mobileviews'); // Redirect to the desired path
  };

  return (
    <div className="container d-flex align-items-center justify-content-center p-0" style={{fontFamily:"Inter, sans-serif",}}>
     
     <div className="d-flex flex-column align-items-center justify-content-center m-0" style={{ maxWidth: '500px', margin: 'auto', width: '100%' }}>
     
     
      <Helmet>
        <title>Pondy Property | Removed Properties</title>
      </Helmet>

          <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
            <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
          </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>Removed Properties </h3> </div>

          <div className="fw-bold">
      {message && <div className="alert text-success text-bold">{message}</div>}
      {/* Your existing component structure goes here */}
    </div>
    
          <div className="row g-2 w-100">

      {removedUsers.length > 0 ? (
        removedUsers.map((user) => (
          <div
            key={user._id}
            className="card mb-2 mt-3 shadow p-1"
            style={{ width: "100%", minWidth: "400px", background: "#F9F9F9" }}
          >
            <div className="row g-0">
              <div className="col-4 d-flex flex-column align-items-center">
                <div className="text-white py-1 px-2 text-center" style={{ width: "100%", background: "#2F747F" }}>
                  PUC- {user.ppcId}
                </div>
                <div className="img-container" style={{ width: "100%", height: "150px", overflow: "hidden" }}>
                  <img
                    src={
                      user.photos && user.photos.length > 0
                        ? `http://localhost:5006/${user.photos[0]}`
                        : "https://d17r9yv50dox9q.cloudfront.net/car_gallery/default.jpg"
                    }
                    alt="Property"
                    className="img-fluid"
                    style={{ width: "100%", height: "150px", objectFit: "cover" }}
                  />
                </div>
                <div className="py-1 px-1 text-center" style={{ width: "100%", background: "#FF4500", color: "#fff" }}>
                  {user.status || "N/A"}
                </div>
              </div>

              <div className="col-md-8 col-8 ps-2">
                <p className="fw-bold m-0" style={{ color: "#000000" }}>{user.propertyType || "N/A"}</p>
                <p className="m-0" style={{ color: "#5E5E5E", fontWeight: 500 }}>
                  {user.city || "N/A"}, {user.district || "N/A"}
                </p>

                <div className="card-body p-2">
                  <div className="row">
                    <div className="col-6 d-flex align-items-center mt-1 mb-1">
                      <FaRulerCombined className="me-2" color="#2F747F" />
                      <span style={{ fontSize: "14px", color: "#555555" }}>{user.areaUnit || "N/A"}</span>
                    </div>
                    <div className="col-6 d-flex align-items-center mt-1 mb-1">
                      <FaBed className="me-2" color="#2F747F" />
                      <span style={{ fontSize: "14px", color: "#555555" }}>{user.bedrooms || "N/A"}</span>
                    </div>
                    <div className="col-6 d-flex align-items-center mt-1 mb-1">
                      <FaUserAlt className="me-2" color="#2F747F" />
                      <span style={{ fontSize: "14px", color: "#555555" }}>{user.ownership || "N/A"}</span>
                    </div>
                    <div className="col-6 d-flex align-items-center mt-1 mb-1">
                      <FaCalendarAlt className="me-2" color="#2F747F" />
                      <span style={{ fontSize: "14px", color: "#555555" }}>{user.bestTimeToCall || "N/A"}</span>
                    </div>
                    <div className="col-6 d-flex align-items-center mt-1 mb-1">
                      <FaRupeeSign className="me-2" color="#2F747F" />
                      <span style={{ fontSize: "14px", color: "#555555" }}>{user.price || "N/A"}</span>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center mt-2">
                    <button
                      className="btn btn-sm"
                      style={{ background: "#2F747F", color: "#fff", width: "50%" }}
                      onClick={() => handleUndo(user.ppcId)}
                    >
                      Undo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">
          <p>No Removed Property Data Found.</p>
        </div>
      )}
       </div> 

 </div> 
 </div> );
};

export default RemovedProperty;

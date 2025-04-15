




import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { MdCall } from 'react-icons/md';
import profil from '../../Assets/xd_profile.png'
import {  FaCalendarAlt } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

const ReportProperty = () => {
  const { phoneNumber } = useParams();
  const [properties, setProperties] = useState([]);
  const [removedProperties, setRemovedProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [activeTab, setActiveTab] = useState("all"); // "all" | "removed"
  const [showFullNumber, setShowFullNumber] = useState(false);
 const [showPopup, setShowPopup] = useState(false);
  const [popupAction, setPopupAction] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");

  const confirmAction = (message, action) => {
    setPopupMessage(message);
    setPopupAction(() => action);
    setShowPopup(true);
  };
  useEffect(() => {
    const storedProperties = JSON.parse(localStorage.getItem("reportProperties")) || [];
    const storedRemovedProperties = JSON.parse(localStorage.getItem("removedReportProperties")) || [];

    setProperties(storedProperties);
    setRemovedProperties(storedRemovedProperties);
  }, []);

  useEffect(() => {
    localStorage.setItem("reportProperties", JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem("removedReportProperties", JSON.stringify(removedProperties));
  }, [removedProperties]);

  useEffect(() => {
    if (!phoneNumber) {
      setLoading(false);
      return;
    }

    const fetchReportedProperties = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-reportproperty-buyer`, {
          params: { postedPhoneNumber: phoneNumber },
        });

        if (response.status === 200) {
          const transformedProperties = response.data.reportPropertyRequestsData.map((property) => ({
            ...property,
            reportRequesters: property.reportPropertyRequestersPhoneNumbers.filter(
              (user) => user && user !== "undefined"
            ),
          }));

          setProperties(transformedProperties);
          localStorage.setItem("reportProperties", JSON.stringify(transformedProperties));
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchReportedProperties();
  }, [phoneNumber]);

  const handleRemoveReport = async (ppcId, reportUser) => {
    // if (!window.confirm("Are you sure you want to remove this report request?")) return;
    confirmAction("Are you sure you want to remove this report request?", async () => {

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/reportproperty/delete/${ppcId}/${reportUser}`);

      const updatedProperties = properties.map((property) =>
        property.ppcId === ppcId
          ? {
              ...property,
              reportRequesters: property.reportRequesters.filter((user) => user !== reportUser),
            }
          : property
      );

      const removedItem = {
        ppcId,
        reportUser,
      };

      setProperties(updatedProperties);
      setRemovedProperties([...removedProperties, removedItem]);
    } catch (error) {
      setMessage({ text: "Error deleting report request.", type: "error" });
    }
    setShowPopup(false);
    });
  };

  const handleUndoRemove = async (ppcId, reportUser) => {
    // if (!window.confirm("Do you want to restore this report request?")) return;
    confirmAction("Do you want to restore this report request?", async () => {

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/reportproperty/undo/${ppcId}/${reportUser}`);

      const restoredProperty = response.data.property;

      setRemovedProperties(removedProperties.filter((item) => item.reportUser !== reportUser));

      setProperties((prev) =>
        prev.map((property) =>
          property.ppcId === ppcId
            ? { ...property, reportRequesters: restoredProperty.reportProperty.map(req => req.phoneNumber) }
            : property
        )
      );

      setMessage({ text: "Report request restored successfully!", type: "success" });
    } catch (error) {
      setMessage({ text: error.response?.data?.message || "Error restoring report request.", type: "error" });
    }
    setShowPopup(false);
  });
  };
useEffect(() => {
  if (message) {
    const timer = setTimeout(() => setMessage(""), 5000); // Auto-close after 3 seconds
    return () => clearTimeout(timer); // Cleanup timer
  }
}, [message]);
const navigate = useNavigate();

const handlePageNavigation = () => {
  navigate('/mobileviews'); // Redirect to the desired path
};
  return (
    <div className="container d-flex align-items-center justify-content-center p-0">
    <div className="d-flex flex-column align-items-center justify-content-center m-0" style={{ maxWidth: '500px', margin: 'auto', width: '100%', background:"#F7F7F7" , fontFamily: 'Inter, sans-serif'}}>
    <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
          <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
        </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>REPORT PROPERTY BUYER </h3> </div>
<div className="row g-2 w-100">

<div className="col-6 p-0">

        <button style={{ backgroundColor: '#30747F', color: 'white' , width:"100%" }} onClick={() => setActiveTab("all")} className={activeTab === "all" ? "active" : ""}>
          All 
        </button>
        </div>

        <div className="col-6 p-0">

        <button style={{ backgroundColor: '#FFFFFF', color: 'grey' , width:"100%" }} onClick={() => setActiveTab("removed")} className={activeTab === "removed" ? "active" : ""}>
          Removed 
        </button>
      </div>
      <div>
      {message && <p style={{ color: message.type === "success" ? "green" : "red" }}>{message.text}</p>}
      <Modal show={showPopup} onHide={() => setShowPopup(false)}>
        <Modal.Body>
          <p>{popupMessage}</p>
          <Button style={{ background:  "#2F747F", width: "80px", fontSize: "13px", border:"none" }} onClick={popupAction}>Yes</Button>
          <Button className="ms-3" style={{ background:  "#FF0000", width: "80px", fontSize: "13px" , border:"none"}} onClick={() => setShowPopup(false)}>No</Button>
        </Modal.Body>
      </Modal>
    </div>

      {loading ? (
        <p>Loading...</p>
      ) : activeTab === "all" ? (
        properties.length > 0 ? (
          properties.map((property) => (
            <div key={property.ppcId} className="property-card">
            
      
              <div className="buyers-list">
  {Array.isArray(property.reportRequesters) && property.reportRequesters.length > 0 ? (
    property.reportRequesters.map((user, index) => (
      <div
        key={index}
        className="card p-2 w-100 m-0 w-md-50 w-lg-33"
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          overflow: "hidden",
          marginBottom: "5px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div className="row d-flex align-items-center">
          <div className="col-3 d-flex align-items-center justify-content-center mb-1">
            <img
              src={profil}
              alt="Placeholder"
              className="rounded-circle mt-2"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
          </div>
          <div className="p-0" style={{ background: "#707070", width: "2px", height: "80px" }}></div>
          <div className="col-7 p-0 ms-4">
            <div className="text-center rounded-1 w-100 mb-1" 
                 style={{ border: "2px solid #30747F", color: "#30747F", fontSize: "13px" }}>
              REPORT REQUESTED
            </div>
            <div className="d-flex">
              <p className="mb-1" style={{ color: "#474747", fontWeight: "500", fontSize: "12px" }}>
                PUC- {property.ppcId}
              </p>
            </div>
            <h5 className="mb-1" style={{ color: "#474747", fontWeight: "500", fontSize: "16px" }}>
              {property.propertyType || "N/A"} | {property.city || "N/A"}
            </h5>
          </div>
        </div>

        <div className="p-1">
          <div className="d-flex align-items-center mb-2">
            <div className="d-flex flex-row align-items-start justify-content-between ps-3">
              <div className="d-flex align-items-center">
                <MdCall color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                <div>
                  <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
                    Buyer Phone
                  </h6>
                  {/* <span className="card-text" style={{ fontWeight: "500" }}>
                    <a href={`tel:${user}`} style={{ textDecoration: "none", color: "#1D1D1D" }}>
                      {showFullNumber ? user : user?.slice(0, 5) + "*****"}
                    </a>
                  </span> */}

<span className="card-text" style={{ fontWeight: "500" }}>
  <a
    href={`tel:${user}`}
    style={{ textDecoration: "none", color: "#1D1D1D" }}
    onClick={async (e) => {
      e.preventDefault();  // Prevent the default behavior of the link
      try {
        // Make API call before dialing
        await axios.post(`${process.env.REACT_APP_API_URL}/contact`, {
          ppcId: property.ppcId,  // Replace with actual PPC ID if needed
          phoneNumber: user,
        });
        setMessage({ text: "Contact saved successfully", type: "success" });
      } catch (error) {
        setMessage({ text: "Something went wrong", type: "error" });
      } finally {
        // Open dialer after API call
        window.location.href = `tel:${user}`;
      }
    }}
  >
    {showFullNumber ? user : user?.slice(0, 5) + "*****"}
  </a>
</span>

                </div>
              </div>
              <div className="d-flex align-items-center ms-3">
                <FaCalendarAlt color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                <div>
                  <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
                    Interest Received Date
                  </h6>
                  <span className="card-text" style={{ color: "#1D1D1D", fontWeight: "500" }}>
                    {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {!showFullNumber && (
            <button
              className="w-100 m-0 p-1"
              onClick={() => setShowFullNumber(true)}
              style={{
                background: "#2F747F",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              View
            </button>
          )}

          {showFullNumber && (
            <div className="d-flex justify-content-between align-items-center ps-2 pe-2 mt-1">
              {/* <button
                className="btn text-white px-3 py-1 flex-grow-1 mx-1"
                style={{ background: "#2F747F", width: "80px", fontSize: "13px" }}
                onClick={() => (window.location.href = `tel:${user}`)}
              >
                Call
              </button> */}

              
<button
  className="btn text-white px-3 py-1 flex-grow-1 mx-1"
  style={{ background: "#2F747F", width: "80px", fontSize: "13px" }}
  onClick={async () => {
    try {
      // Make API call before dialing
      await axios.post(`${process.env.REACT_APP_API_URL}/contact`, {
        ppcId: property.ppcId,  // Replace with actual PPC ID if needed
        phoneNumber: user,
      });
      setMessage({ text: "Contact saved successfully", type: "success" });
    } catch (error) {
      setMessage({ text: "Something went wrong", type: "error" });
    } finally {
      // Open dialer after API call
      window.location.href = `tel:${user}`;
    }
  }}
>
  Call
</button>
              <button
                className="btn text-white px-3 py-1 flex-grow-1 mx-1"
                style={{ background: "#FF0000", width: "80px", fontSize: "13px" }}
                onClick={() => handleRemoveReport(property.ppcId, user)}
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    ))
  ) : null}
</div>

            </div>
          ))
        ) : (
          <p>No properties found.</p>
        )
      ) : (
        removedProperties.length > 0 ? (
          removedProperties.map((property, index) => (
            

            <div
            key={index}
            className="card p-2 w-100 w-md-50 w-lg-33"
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              overflow: "hidden",
              marginBottom: "15px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <div className="row d-flex align-items-center">
              <div className="col-3 d-flex align-items-center justify-content-center mb-1">
                <img
                  src={profil}
                  alt="Placeholder"
                  className="rounded-circle mt-2"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
      
              </div>
              <div className='p-0' style={{background:"#707070", width:"2px", height:"80px"}}></div>
              <div className="col-7 p-0 ms-4">
                <div className='text-center rounded-1 w-100 mb-1' style={{border:"2px solid #30747F", color:"#30747F", fontSize:"14px"}}>REPORT REQUESTED</div>
                <div className="d-flex">
                  <p className="mb-1" style={{ color: "#474747", fontWeight: "500",fontSize:"12px" }}>
                  PUC- {property.ppcId}
                  </p>
                </div>    
      
                <h5 className="mb-1" style={{ color: "#474747", fontWeight: "500",fontSize:"16px" }}>
                  {property.propertyType || "N/A"} |{property.city || "N/A"}
                </h5>
             
              </div>
            </div>
      
            <div className="p-1 mt-1">
      
              <div className="d-flex align-items-center mb-2">
              <div className="d-flex  flex-row align-items-start justify-content-between ps-3">
      
              
                <div className="d-flex align-items-center">
                  <MdCall color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                  <div>
                    <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
                       Buyer Phone
                    </h6>
                    <span className="card-text" style={{  fontWeight:"500"}}>
                    <a href={`tel:${property.reportUser}`} style={{ textDecoration: "none", color: "#1D1D1D" }}>
          {showFullNumber
            ? property.reportUser
            : property.reportUser?.slice(0, 5) + "*****"}
        </a>
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center  ms-3">
                  <FaCalendarAlt color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                  <div>
                    <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
                      Reported Received Date
                    </h6>
                    <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500"}}>
                    {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>
                </div>
                          </div>
              {!showFullNumber && (
          <button className='w-100 m-0 p-1'
            onClick={() => setShowFullNumber(true)}
            style={{
              background: "#2F747F", 
              color: "white", 
              border: "none", 
             
              marginLeft: "10px", 
              cursor: "pointer",
              borderRadius: "5px"
            }}>
            View
          </button>
        )}
          {showFullNumber
            ?  <div className="d-flex justify-content-between align-items-center ps-2 pe-2 mt-1">
         
                  <button className="btn text-white px-3 py-1 flex-grow-1 mx-1"
                    style={{ background:  "green", width: "80px", fontSize: "13px" }}
                    onClick={() => handleUndoRemove(property.ppcId, property.reportUser)}> Undo</button>

            </div>
            : ''}
            </div>
          </div>
          ))
        ) : (
          <p>No removed requests.</p>
        )
      )}
          </div>
          </div>

    </div>
  );
};

export default ReportProperty;

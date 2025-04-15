




import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import myImage from '../../Assets/Rectangle 146.png'; // Correct path
import myImage1 from '../../Assets/Rectangle 145.png'; // Correct path
import pic from '../../Assets/Default image_PP-01.png'; // Correct path
import { toast } from "react-toastify";
import { MdCall } from 'react-icons/md';
import profil from '../../Assets/xd_profile.png'
import {  FaCalendarAlt } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";



const PropertyCard = ({ property, onRemove, onUndo }) => {
  const [showFullNumber, setShowFullNumber] = useState(false);

  const [message, setMessage] = useState({ text: "", type: "" });


  const handleContactLog = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/contact`, {
        ppcId: property.ppcId,
        viewerPhoneNumber: property.viewerPhoneNumber,
        uniqueId: property.uniqueId,
      });
      console.log('Contact logged successfully');
    } catch (error) {
      console.error('Error logging contact:', error);
    }
  };

  const handleCallClick = () => {
    handleContactLog();
    window.location.href = `tel:${property.viewerPhoneNumber}`;
  };

  return (
    <>
      <div
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
          <div className='p-0' style={{ background: "#707070", width: "2px", height: "80px" }}></div>
          <div className="col-7 p-0 ms-4">
            <div className='text-center rounded-1 w-100 mb-1' style={{ border: "2px solid #30747F", color: "#30747F", fontSize: "13px" }}>
              INTERESTED BUYER
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
                    <a
                      href={`tel:${property.viewerPhoneNumber}`}
                      onClick={handleContactLog}
                      style={{ textDecoration: "none", color: "#1D1D1D" }}
                    >
                      {showFullNumber
                        ? property.viewerPhoneNumber
                        : property.viewerPhoneNumber?.slice(0, 5) + "*****"}
                    </a>
                  </span> */}

<span className="card-text" style={{ fontWeight: "500" }}>
  <a
    href={`tel:${property.viewerPhoneNumber}`}
    onClick={handleContactLog}
    style={{ textDecoration: "none", color: "#1D1D1D" }}
  >
    {showFullNumber
      ? property.viewerPhoneNumber
      : property.viewerPhoneNumber?.slice(0, 5) + "*****"}
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
                    {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {!showFullNumber && (
            <button
              className='w-100 m-0 p-1'
              onClick={() => setShowFullNumber(true)}
              style={{
                background: "#2F747F",
                color: "white",
                border: "none",
                marginLeft: "10px",
                cursor: "pointer",
                borderRadius: "5px"
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
              >
                Call
              </button> */}

<button
  className="btn text-white px-3 py-1 flex-grow-1 mx-1"
  style={{ background: "#2F747F", width: "80px", fontSize: "13px" }}
  onClick={async () => {
    try {
      // Make API call to save contact
      await axios.post(`${process.env.REACT_APP_API_URL}/contact`, {
        ppcId: property.ppcId,  // Replace with actual PPC ID if needed
        phoneNumber: property.viewerPhoneNumber,
      });
      setMessage({ text: "Contact logged successfully", type: "success" });

      // Open dialer after logging contact
      window.location.href = `tel:${property.viewerPhoneNumber}`;
    } catch (error) {
      setMessage({ text: "Error logging contact", type: "error" });
    }
  }}
>
  Call
</button>

              {onRemove && (
                <button
                  className="btn text-white px-3 py-1 flex-grow-1 mx-1"
                  style={{ background: "#FF0000", color: "white", cursor: "pointer" }}
                  onClick={() => onRemove(property.ppcId, property.viewerPhoneNumber, property.uniqueId)}
                >
                  Remove
                </button>
              )}
              {onUndo && (
                <button
                  className="btn text-white px-3 py-1 flex-grow-1 mx-1"
                  style={{ background: "green", color: "white", cursor: "pointer" }}
                  onClick={() => onUndo(property.ppcId, property.viewerPhoneNumber, property.uniqueId)}
                >
                  Undo
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};



const PropertyList = ({ properties, onRemove, onUndo }) => {
  return properties.length === 0 ? (
    <p>No properties found.</p>
  ) : (
    <div className="row mt-4 w-100">
      {properties.map((property) => (
        <PropertyCard 
          key={property.ppcId} 
          property={property} 
          onRemove={onRemove} 
          onUndo={onUndo} 
        />
      ))}
    </div>
  );
};


const App = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const { phoneNumber } = useParams(); // Get phone number from URL
  const [activeKey, setActiveKey] = useState("All");

  const [showPopup, setShowPopup] = useState(false);
  const [popupAction, setPopupAction] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");

  const confirmAction = (message, action) => {
    setPopupMessage(message);
    setPopupAction(() => action);
    setShowPopup(true);
  };

  // Auto-clear message after 3 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: "", type: "" }), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);


  // Load properties from localStorage on mount
  useEffect(() => {
    const storedProperties = localStorage.getItem("viewedProperties");
    if (storedProperties) {
      setProperties(JSON.parse(storedProperties));
    }
  }, []);

  // Save properties to localStorage when they change
  useEffect(() => {
    if (properties.length > 0) {
      localStorage.setItem("viewedProperties", JSON.stringify(properties));
    }
  }, [properties]);


useEffect(() => {
  if (!phoneNumber) return;

  const fetchViewedProperties = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/property-buyer-viewed`, { params: { phoneNumber } });
      const viewedUsers = response.data.viewedUsers || [];

      const apiProperties = viewedUsers.flatMap((user, index) =>
        user.viewedProperties.map((property, propIndex) => ({
          ...property,
          viewerPhoneNumber: user.viewerPhoneNumber,
          uniqueId: `${index}-${propIndex}`, // Unique identifier
          status: "active" // Default status from API
        }))
      );

      // Merge LocalStorage and API data
      const storedProperties = JSON.parse(localStorage.getItem("viewedProperties")) || [];
      const mergedProperties = apiProperties.map((apiProp) => {
        const storedProp = storedProperties.find((sp) => sp.uniqueId === apiProp.uniqueId);
        return storedProp || apiProp; // Use local data if available
      });

      setProperties(mergedProperties);
      localStorage.setItem("viewedProperties", JSON.stringify(mergedProperties));

    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  fetchViewedProperties();
}, [phoneNumber]);

const handleRemoveProperty = async (ppcId, phoneNumber, uniqueId) => {
  confirmAction("Are you sure you want to remove this viewd buyer ?", async () => {

  try {
    await axios.put(`${process.env.REACT_APP_API_URL}/delete-view-property`, { ppcId, phoneNumber });

    // Update the state
    const updatedProperties = properties.map((property) =>
      property.uniqueId === uniqueId
        ? { ...property, status: "delete" } // Soft delete
        : property
    );

    setProperties(updatedProperties);
    localStorage.setItem("viewedProperties", JSON.stringify(updatedProperties));

    setMessage({ text: "Interest removed successfully.", type: "success" });
  } catch (error) {
    setMessage({ text: "Error removing interest.", type: "error" });
  }
  setShowPopup(false);
});
};



const handleUndoRemove = async (ppcId, phoneNumber, uniqueId) => {
  confirmAction("Do you want to restore this viewed buyer?", async () => {

  try {
    await axios.put(`${process.env.REACT_APP_API_URL}/undo-delete-view`, { ppcId, phoneNumber });

    // Restore only the selected property
    const updatedProperties = properties.map((property) =>
      property.uniqueId === uniqueId
        ? { ...property, status: "active" } // Restore it
        : property
    );

    setProperties(updatedProperties);
    localStorage.setItem("viewedProperties", JSON.stringify(updatedProperties));

    setMessage({ text: "Interest restored successfully!", type: "success" });
  } catch (error) {
    setMessage({ text: "Error restoring interest.", type: "error" });
  }
  setShowPopup(false);
});
};


  // Update property status in state and localStorage
  const updatePropertyStatus = (ppcId, status) => {
    const updatedProperties = properties.map((property) =>
      property.ppcId === ppcId ? { ...property, status } : property
    );
    setProperties(updatedProperties);
    localStorage.setItem("viewedProperties", JSON.stringify(updatedProperties)); // Save to localStorage
  };

  // Filter properties
  const activeProperties = properties.filter((property) => property.status !== "delete");
  const removedProperties = properties.filter((property) => property.status === "delete");
  

  const navigate = useNavigate();

  const handlePageNavigation = () => {
    navigate('/mobileviews'); // Redirect to the desired path
  };
  return (
    <div className="container d-flex align-items-center justify-content-center p-0">
      <div className="d-flex flex-column align-items-center justify-content-center m-0" 
        style={{ maxWidth: '500px', margin: 'auto', width: '100%', background:"#F7F7F7", fontFamily: 'Inter, sans-serif' }}>
                <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
          <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
        </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>VIEWED BUYER </h3> </div>
        {/* Filter Buttons */}
        <div className="row g-2 w-100">
          <div className="col-6 p-0">
            <button className="w-100" style={{ backgroundColor: '#30747F', color: 'white' }} 
              onClick={() => setActiveKey("All")}>
              All Properties
            </button>
          </div>
          <div className="col-6 p-0">
            <button className="w-100" style={{ backgroundColor: '#FFFFFF', color: 'grey' }} 
              onClick={() => setActiveKey("Removed")}>
              Removed Properties
            </button>
          </div>

          {/* Message Alert */}
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


{/* Property List */}
<div className="col-12">
  <div className="w-100 d-flex align-items-center justify-content-center" style={{ maxWidth: '500px' }}>
    {loading ? (
      <p>Loading properties...</p>
    ) : activeKey === "All" ? (
      <PropertyList 
        key="activeProperties" 
        properties={activeProperties} 
        onRemove={handleRemoveProperty} 
      />
    ) : (
      <PropertyList 
        key="removedProperties" 
        properties={removedProperties} 
        onUndo={handleUndoRemove} 
      />
    )}
  </div>
</div>


        </div>

      </div>
    </div>
  );
};

export default App;








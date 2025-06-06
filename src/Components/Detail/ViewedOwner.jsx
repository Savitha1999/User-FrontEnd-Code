










import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {FaCamera, FaEye , FaRulerCombined, FaBed, FaUserAlt, FaCalendarAlt, FaRupeeSign } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import myImage from '../../Assets/Rectangle 146.png'; // Correct path
import myImage1 from '../../Assets/Rectangle 145.png'; // Correct path
import pic from '../../Assets/Default image_PP-01.png'; // Correct path
import { FaArrowLeft } from "react-icons/fa";
import NoData from "../../Assets/OOOPS-No-Data-Found.png";

const ConfirmationModal = ({ show, onClose, onConfirm, message }) => {
  if (!show) return null;

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    },
    modal: {
      background: '#fff',
      padding: '20px 30px',
      borderRadius: '10px',
      textAlign: 'center',
      minWidth: '300px'
    },
    buttons: {
      display: 'flex',
      // justifyContent: 'space-around',
      marginTop: '20px'
    },
    yes: {
      background: '#2F747F',
      color: '#fff',
      padding: '8px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    },
    no: {
      background: '#FF4500',
      color: '#fff',
      padding: '8px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginLeft:'10px'
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h5>Confirmation</h5>
        <p>{message}</p>
        <div style={styles.buttons}>
        <button style={styles.yes} onClick={onConfirm}   onMouseOver={(e) => {
          e.target.style.background = "#029bb3"; // Brighter neon on hover
          e.target.style.fontWeight = 600; // Brighter neon on hover
          e.target.style.transition = "background 0.3s ease"; // Brighter neon on hover

        }}
        onMouseOut={(e) => {
          e.target.style.background = "#2F747F"; // Original orange
          e.target.style.fontWeight = 400; // Brighter neon on hover

        }}>Yes</button>
          <button style={styles.no} onClick={onClose}    onMouseOver={(e) => {
          e.target.style.background = "#FF6700"; // Brighter neon on hover
          e.target.style.fontWeight = 600; // Brighter neon on hover
          e.target.style.transition = "background 0.3s ease"; // Brighter neon on hover
        }}
        onMouseOut={(e) => {
          e.target.style.background = "#FF4500"; // Original orange
          e.target.style.fontWeight = 400; // Brighter neon on hover

        }}>No</button>
        </div>
      </div>
    </div>
  );
};

const PropertyCard = ({ property, onRemoveClick, onUndoClick }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleCardClick = () => {
    if (property?.ppcId) {
      navigate(`/detail/${property.ppcId}`);
    }
  };

  
  const handleContactClick = async (e) => {
    e.stopPropagation(); // Prevent card click from firing
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/contact`, {
        ppcId: property.ppcId,
        phoneNumber: property.postedUserPhoneNumber,
      });
      if (response.data.success) {
        setMessage && setMessage("Contact saved successfully");
      } else {
        setMessage && setMessage("Contact failed");
      }
    } catch (error) {
      console.error("Contact API error:", error);
      setMessage && setMessage("An error occurred");
    }
  };
  

  return (
    <div>
    {message && <p style={{ color: message.type === "success" ? "green" : "red" }}>{message.text}</p>}

    <div className="row g-0 rounded-4 mb-2" style={{ border: '1px solid #ddd', overflow: "hidden", background: "#EFEFEF" }}
      onClick={handleCardClick}
    >
      <div className="col-md-4 col-4 d-flex flex-column justify-content-between align-items-center">
        <div className="text-white py-1 px-2 text-center" style={{ width: '100%', background: "#2F747F" }}>
          PUC- {property.ppcId}
        </div>
        <div style={{ position: "relative", width: "100%", height: '170px' }}>
          <img
            src={property.photos?.length ? `http://localhost:5006/${property.photos[0]}` : pic}
            alt="Property"
            className="img-fluid"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className="d-flex justify-content-between w-100" style={{ position: "absolute", bottom: "0px" }}>
            <span className="d-flex justify-content-center align-items-center"
              style={{ color: '#fff', background: `url(${myImage}) no-repeat center center`, backgroundSize: "cover", fontSize: '12px', width: '50px' }}>
              <FaCamera className="me-1" /> 1
            </span>
            <span className="d-flex justify-content-center align-items-center"
              style={{ color: '#fff', background: `url(${myImage1}) no-repeat center center`, backgroundSize: "cover", fontSize: '12px', width: '50px' }}>
              <FaEye className="me-1" /> 1
            </span>
          </div>
        </div>
      </div>

      <div className="col-md-8 col-8" style={{paddingLeft:"10px", background:"#F5F5F5"}}>
      <div className="d-flex justify-content-between">
          <p className="m-0" style={{ color: '#5E5E5E' , fontSize:"13px"}}>{property.propertyMode || 'N/A'}</p>

          {onRemoveClick && (
            <p className="m-0 ps-3 pe-3"
            style={{
              fontSize: "12px",
  
              background: "#FF4F00", // Neon orange
              color: "white",
              cursor: "pointer",
              borderRadius: "0px 0px 0px 15px",
              transition: "all 0.2s ease-in-out",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#ff7300"; // Brighter neon on hover
            }}
            onMouseOut={(e) => {
              e.target.style.background = "#FF4F00"; // Original orange
            }}              onClick={(e) => {
                e.stopPropagation();
                onRemoveClick(property);
              }}
            >Remove</p>
          )}

          {onUndoClick && (
            <p className="m-0 ps-3 pe-3"
            style={{
              background: "green", // Vibrant green
              color: "white",
              cursor: "pointer",
              borderRadius: "0px 0px 0px 15px",
              transition: "all 0.2s ease-in-out",
              fontSize: "12px",
  
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#32cd32"; // Neon green on hover
            }}
            onMouseOut={(e) => {
              e.target.style.background = "green"; // Original green
            }}              onClick={(e) => {
                e.stopPropagation();
                onUndoClick(property);
              }}
            >Undo</p>
          )}
        </div>

        <p className="fw-bold m-0" style={{ color: '#000000', fontSize:"15px" }}>{property.propertyType || 'N/A'}</p>
        <p className=" m-0" style={{ color: '#5E5E5E', fontSize:"13px" }}>{property.city || 'N/A'}</p>

        <div className="card-body ps-2 m-0 pt-0 pe-2 d-flex flex-column justify-content-center">
          <div className="row">
          <div className="col-6 d-flex align-items-center p-1">
          <FaRulerCombined className="me-2" color="#2F747F" /> <span style={{ fontSize: '13px', color: '#5E5E5E' }}>{property.totalArea || 'N/A'}</span>
            </div>
                      <div className="col-6 d-flex align-items-center p-1">
              <FaBed className="me-2" color="#2F747F" /> <span style={{ fontSize: '13px', color: '#5E5E5E' }}>{property.bedrooms || 'N/A'}BHK</span>
            </div>
            <div className="col-6 d-flex align-items-center p-1">
            <FaUserAlt className="me-2" color="#2F747F" /> <span style={{ fontSize: '13px', color: '#5E5E5E' }}>{property.postedBy || 'N/A'}</span>
            </div>
                      <div className="col-6 d-flex align-items-center p-1">
              <FaCalendarAlt className="me-2" color="#2F747F" />
              <span style={{ fontSize: '13px', color: '#5E5E5E', fontWeight: 500 }}>
                {property.createdAt ? new Date(property.createdAt).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                }) : 'N/A'}
              </span>
            </div>
            <div className="col-12 d-flex flex-col align-items-center p-1">
            <h6 className="m-0 ">
                <span style={{ fontSize: '15px', color: '#2F747F', fontWeight: 'bold', letterSpacing: "1px" }}>
                  <FaRupeeSign className="me-2" color="#2F747F" />{property.price ? property.price.toLocaleString('en-IN') : 'N/A'}
                </span>
                <span style={{ color: '#2F747F', fontSize: '11px', marginLeft: "5px" }}>
                  Negotiable
                </span>
              </h6>
            </div>
             <p className="p-1" style={{ color: "#2E7480", margin: "0px" }}>
                          <a
                            href={`tel:${property.postedUserPhoneNumber}`}
                            onClick={handleContactClick}
                            style={{ textDecoration: "none", color: "#2E7480" }}
                          >
                            <MdCall className="me-2" color="#2F747F" />{" "}
                            {property.postedUserPhoneNumber || "N/A"}
                          </a>
                        </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

const PropertyList = ({ properties, onRemoveClick, onUndoClick }) => {
  return properties.length === 0 ? (
<div className="text-center my-4 "
    style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',

    }}>
<img src={NoData} alt="" width={100}/>      
<p>No properties found.</p>
</div>  ) : (
    <div className="row mt-4 w-100">
      {properties.map((property) => (
        <PropertyCard key={property.ppcId} property={property} onRemoveClick={onRemoveClick} onUndoClick={onUndoClick} />
      ))}
    </div>
  );
};

const App = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeKey, setActiveKey] = useState("All");
  const { phoneNumber } = useParams();
  const [message, setMessage] = useState({ text: "", type: "" });
  const [modal, setModal] = useState({ show: false, type: "", property: null });

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  
  const fetchViewedProperties = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/property-owner-viewed-users`, {
        params: { phoneNumber }
      });
      if (response.status === 200) {
        setProperties(response.data.properties);
      } else {
        setMessage("No properties found with your interest.");
      }
    } catch (error) {
      setMessage("Error fetching properties.");
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
    const recordDashboardView = async () => {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/record-views`, {
          phoneNumber: phoneNumber,
          viewedFile: "Viewed Owner",
          viewTime: new Date().toISOString(),
        });
        console.log("Dashboard view recorded");
      } catch (err) {
        console.error("Failed to record dashboard view:", err);
      }
    };
  
    if (phoneNumber) {
      recordDashboardView();
    }
  }, [phoneNumber]);
  useEffect(() => {
    fetchViewedProperties();
  },[phoneNumber, setProperties] );

  const updatePropertyStatus = (ppcId, status) => {
    const updated = properties.map(p => p.ppcId === ppcId ? { ...p, status } : p);
    setProperties(updated);
  };

  const handleRemoveConfirm = async () => {
    const { ppcId } = modal.property;
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/delete-detail-property`, { ppcId, phoneNumber });
      updatePropertyStatus(ppcId, "delete");
      setMessage({ text: "Property removed successfully.", type: "success" });
    } catch {
      setMessage({ text: "Error removing property.", type: "error" });
    } finally {
      setModal({ show: false, type: "", property: null });
    }
  };

  const handleUndoConfirm = async () => {
    const { ppcId } = modal.property;
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/undo-delete-detail`, { ppcId, phoneNumber });
      updatePropertyStatus(ppcId, "active");
      setMessage({ text: "Property status reverted!", type: "success" });
    } catch {
      setMessage({ text: "Error undoing property.", type: "error" });
    } finally {
      setModal({ show: false, type: "", property: null });
    }
  };

  const activeProperties = properties.filter(p => p.status !== "delete");
  const removedProperties = properties.filter(p => p.status === "delete");
  const navigate = useNavigate();

  return (
    <div className="container d-flex align-items-center justify-content-center p-0">
      <div className="d-flex flex-column align-items-center justify-content-center m-0" style={{ maxWidth: '500px', margin: 'auto', width: '100%' , background:"#F7F7F7",fontFamily: 'Inter, sans-serif'}}>
        <div className="d-flex align-items-center justify-content-start w-100" style={{ background: "#EFEFEF" }}>
<button
      onClick={() => navigate(-1)}
      className="pe-5"
      style={{
        backgroundColor: '#f0f0f0',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        display: 'flex',
        alignItems: 'center',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f0f4f5'; // Change background
        e.currentTarget.querySelector('svg').style.color = '#ffffff'; // Change icon color
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#f0f0f0';
        e.currentTarget.querySelector('svg').style.color = '#30747F';
      }}
    >
      <FaArrowLeft style={{ color: '#30747F', transition: 'color 0.3s ease-in-out' , background:"transparent"}} />
    </button>           <h3 className="m-0 ms-3" style={{ fontSize: "20px" }}>INTEREST OWNER</h3>
        </div>

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

          {message.text && (
            <div className="col-12">
              <div className={`alert alert-${message.type} w-100`}>{message.text}</div>
            </div>
          )}

          <div className="col-12">
          <div className="w-100 d-flex align-items-center justify-content-center" style={{ maxWidth: '500px' }}>

            {loading ? (
      <div className="text-center my-4 "
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',

      }}>
        <span className="spinner-border text-primary" role="status" />
        <p className="mt-2">Loading properties...</p>
      </div>            ) : activeKey === "All" ? (
              <PropertyList
                properties={activeProperties}
                onRemoveClick={(property) => setModal({ show: true, type: "remove", property })}
              />
            ) : (
              <PropertyList
                properties={removedProperties}
                onUndoClick={(property) => setModal({ show: true, type: "undo", property })}
              />
            )}
             </div>
          </div>
        </div>

        <ConfirmationModal
          show={modal.show}
          onClose={() => setModal({ show: false, type: "", property: null })}
          onConfirm={modal.type === "remove" ? handleRemoveConfirm : handleUndoConfirm}
          message={modal.type === "remove" ? "Are you sure you want to remove this property?" : "Do you want to undo the removal of this property?"}
        />
      </div>
    </div>
  );
};



export default App;

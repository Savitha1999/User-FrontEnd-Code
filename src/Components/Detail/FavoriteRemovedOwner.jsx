


import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {FaCamera, FaEye , FaRulerCombined, FaBed, FaUserAlt, FaCalendarAlt, FaRupeeSign } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import myImage from '../../Assets/Rectangle 146.png'; // Correct path
import myImage1 from '../../Assets/Rectangle 145.png'; // Correct path
import pic from '../../Assets/Default image_PP-01.png'; // Correct path
import { FaArrowLeft } from "react-icons/fa";




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
        <button style={styles.yes} onClick={onConfirm}>Yes</button>
          <button style={styles.no} onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

const PropertyCard = ({ property, onRemove, onUndo }) => {


   const navigate = useNavigate();
  
    const handleCardClick = () => {
      if (property?.ppcId) {
        navigate(`/detail/${property.ppcId}`);
      }
    };

  return (
    

    <div className="row g-0 rounded-4 mb-2" style={{ border: '1px solid #ddd', overflow: "hidden", background:"#EFEFEF"}}
    onClick={handleCardClick}
    >
                  <div className="col-md-4 col-4 d-flex flex-column justify-content-between align-items-center">
                  <div className="text-white py-1 px-2 text-center" style={{ width: '100%', background: "#2F747F" }}>
 PUC- {property.ppcId}
 </div>


 <div style={{ position: "relative", width: "100%", height:'160px'}}>
            <img
                                        src={property.photos?.length ? `http://localhost:5006/${property.photos[0]}` : pic}
                                        alt="Property"
                                        className="img-fluid"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                      />
          
          <div >
          <div className="d-flex justify-content-between w-100" style={{ position: "absolute",
          bottom: "0px"}}>
          <span className="d-flex justify-content-center align-items-center" style={{ color:'#fff', background:`url(${myImage}) no-repeat center center`, backgroundSize:"cover" ,fontSize:'12px', width:'50px' }}>
          <FaCamera className="me-1"/> 1
          </span>
          <span className="d-flex justify-content-center align-items-center" style={{ color:'#fff', background:`url(${myImage1}) no-repeat center center`, backgroundSize:"cover" ,fontSize:'12px', width:'50px' }}>
          <FaEye className="me-1" />1
          </span>
          </div>
          </div>
          </div>


                 </div>
                 <div className="col-md-8 col-8" style={{paddingLeft:"10px", background:"#F5F5F5"}}>
                  <div className="d-flex justify-content-between"><p className="m-0 fw-bold" style={{ color:'#5E5E5E' }}>{property.propertyMode || 'N/A'}</p>
                 
                  {/* <p className="m-0 ps-3 pe-3" style={{background:"green", color:"white", cursor:"pointer", borderRadius: '0px 0px 0px 15px'}} onClick={() => onUndo(property.ppcId, property.postedUserPhoneNumber)}>UNDO</p> */}
                  {/* {onRemove && (
            <p className="m-0 ps-3 pe-3" style={{background:"#FF0000", color:"white", cursor:"pointer", borderRadius: '0px 0px 0px 15px'}} onClick={() => onRemove(property.ppcId, property.postedUserPhoneNumber)}>Remove</p>
          )}
          {onUndo && (
            <p className="m-0 ps-3 pe-3" style={{background:"green", color:"white", cursor:"pointer", borderRadius: '0px 0px 0px 15px'}} onClick={() => onUndo(property.ppcId, property.postedUserPhoneNumber)}>Undo</p>
          )} */}


{onRemove && (
            <p className="m-0 ps-3 pe-3" style={{ background: "#FF0000", color: "white", cursor: "pointer", borderRadius: '0px 0px 0px 15px' }}
              onClick={(e) => {
                e.stopPropagation();
                onRemove(property);
              }}
            >Remove</p>
          )}

          {onUndo && (
            <p className="m-0 ps-3 pe-3" style={{ background: "green", color: "white", cursor: "pointer", borderRadius: '0px 0px 0px 15px' }}
              onClick={(e) => {
                e.stopPropagation();
                onUndo(property);
              }}
            >Undo</p>
          )}

                  </div>
                   <p className="fw-bold m-0" style={{ color:'#000000' }}>{property.propertyType || 'N/A'}</p>
                   <p className=" fw-bold m-0" style={{ color:'#5E5E5E'}}>{property.city || 'N/A'}</p>
                   <div className="card-body ps-2 m-0 pt-0 pe-2 d-flex flex-column justify-content-center">
                     <div className="row">
                      <div className="col-6 d-flex align-items-center p-1">
                         <FaRulerCombined className="me-2" color="#2F747F" /> <span style={{ fontSize:'13px', color:'#5E5E5E' }}>{property.totalArea || 'N/A'}</span>
                       </div>
                      <div className="col-6 d-flex align-items-center p-1">
                         <FaBed className="me-2" color="#2F747F"/> <span style={{ fontSize:'13px', color:'#5E5E5E' }}>{property.bedrooms || 'N/A'}BHK</span>
                       </div>
                      <div className="col-6 d-flex align-items-center p-1">
                         <FaUserAlt className="me-2" color="#2F747F"/> <span style={{ fontSize:'13px', color:'#5E5E5E' }}>{property.postedBy || 'N/A'}</span>
                       </div>
                       {/* <div className="col-6 d-flex align-items-center mt-1 mb-1">
                         <FaCalendarAlt className="me-2" color="#2F747F"/> <span style={{ fontSize:'13px', color:'#5E5E5E' }}>{property.bestTimeToCall || 'N/A'}</span>
                       </div> */}
                       <div className="col-6 d-flex align-items-center p-1">
                                                                                       <FaCalendarAlt className="me-2" color="#2F747F"/> 
                                              <span style={{ fontSize:'13px', color:'#5E5E5E', fontWeight: 500 }}>
                                                {property.createdAt ? new Date(property.createdAt).toLocaleDateString('en-IN', {
                                                  year: 'numeric',
                                                  month: 'short',
                                                  day: 'numeric'
                                                }) : 'N/A'}
                                              </span>     
                                              </div>              
                       {/* <div className="col-6 d-flex align-items-center mt-1 mb-1">
                         <FaRupeeSign className="me-2" color="#2F747F"/> <span style={{ fontSize:'13px', color:'#2E7480' }}>{property.price || 'N/A'}</span>
                       </div>
                      <div className="col-6 d-flex align-items-center p-1">
                         <p className="m-0" style={{ color:'#2F747F', fontSize:'13px',fontWeight:"bold"}}> Negotiation: <span style={{ color:'#5E5E5E' }}>{property.negotiation || 'N/A'}</span></p>
                       </div> */}
                        <div className="col-12 d-flex flex-col align-items-center p-1">
                        <h6 className="m-0">
                                   <span style={{ fontSize:'15px', color:'#2F747F', fontWeight:'bold', letterSpacing:"1px" }}> <FaRupeeSign className="me-2" color="#2F747F"/>{property.price ? property.price.toLocaleString('en-IN') : 'N/A'}
                                   </span> 
                                   <span style={{ color:'#2F747F', fontSize:'13px', marginLeft:"5px",fontSize:'11px',}}> 
                                   Negotiable                </span> 
                                     </h6>
                                  </div>
                                  <p className="p-1" style={{ color: "#2E7480", margin: "0px" }}>
                                  <a
                      href={`tel:${property.interestedUser}`}
                      style={{
                        textDecoration: "none",
                        color: "#2E7480",
                      }}
                    >
                      <MdCall className="me-2" color="#2F747F" />{" "}
                      {property.postedUserPhoneNumber || 'N/A'}
                    </a>
                  </p>
                      </div>
                    </div>
                  </div>
               </div>
  );
};

const PropertyList = ({ properties, onRemove, onUndo }) => {
  return properties.length === 0 ? (
    <p>No properties found.</p>
  ) : (
    <div className="row mt-4 w-100">
      {properties.map((property) => (
        <PropertyCard key={property.ppcId} property={property} onRemove={onRemove} onUndo={onUndo} />
      ))}
    </div>
  );
};


const App = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeKey, setActiveKey] = useState("All");
  const { phoneNumber } = useParams(); // Getting phoneNumber from URL params
  const [message, setMessage] = useState({ text: "", type: "" });
  const [modal, setModal] = useState({ show: false, type: "", property: null });

  const navigate = useNavigate();


  const handlePageNavigation = () => {
    navigate('/mobileviews'); // Redirect to the desired path
  };
  // Auto-clear message after 3 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);


  const fetchRemovedFavoritesOwner = useCallback(async () => {
    if (!phoneNumber) {
      return;
    }
  
    try {
      setLoading(true);
      const apiUrl = `${process.env.REACT_APP_API_URL}/remove-favorite-owner`;
  
      const { data } = await axios.get(apiUrl, { params: { phoneNumber } });
  
      setProperties(data.favoriteRemovedData);
      localStorage.setItem("removedFavoriteProperties", JSON.stringify(data.favoriteRemovedData));
    } catch (error) {
      setMessage({ text: "Failed to fetch removed favorite properties.", type: "error" });
      console.error("Error fetching removed favorites for owner:", error);
    } finally {
      setLoading(false);
    }
  }, [phoneNumber]);
  
  // Ensure API is called when component loads
  useEffect(() => {
    fetchRemovedFavoritesOwner();
  }, [fetchRemovedFavoritesOwner]);
  


  const handleRemoveConfirm = async () => {
    const { ppcId } = modal.property;
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/delete-detail-property`, { ppcId, phoneNumber });
      updatePropertyStatus(ppcId, "delete");
      setMessage({ text: "RemovedFavorite removed successfully.", type: "success" });
    } catch {
      setMessage({ text: "Error removing favorite.", type: "error" });
    } finally {
      setModal({ show: false, type: "", property: null });
    }
  };
  
  const handleUndoConfirm = async () => {
    const { ppcId } = modal.property;
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/undo-delete-detail`, { ppcId, phoneNumber });
      updatePropertyStatus(ppcId, "active");
      setMessage({ text: "RemovedFavorite restored successfully.", type: "success" });
    } catch {
      setMessage({ text: "Error restoring favorite.", type: "error" });
    } finally {
      setModal({ show: false, type: "", property: null });
    }
  };
  


  // Update property status in local state and storage
  const updatePropertyStatus = (ppcId, status) => {
    const updatedProperties = properties.map((property) =>
      property.ppcId === ppcId ? { ...property, status } : property
    );
    setProperties(updatedProperties);
    localStorage.setItem("favoriteProperties", JSON.stringify(updatedProperties));
  };

  // Filter properties
  const activeProperties = properties.filter((property) => property.status !== "delete");
  const removedProperties = properties.filter((property) => property.status === "delete");

  return (
    <div className="container d-flex align-items-center justify-content-center p-0">
      <div className="d-flex flex-column align-items-center justify-content-center m-0" 
        style={{ maxWidth: '500px', margin: 'auto', width: '100%' , background:"#F7F7F7", fontFamily: 'Inter, sans-serif'}}>
        <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
          <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
        </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>FAVORIT OWNER</h3> </div>
        
        {/* Buttons for filtering */}
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
          {message.text && (
            <div className="col-12">
              <div className={`alert alert-${message.type} w-100`}>{message.text}</div>
            </div>
          )}


           
<div className="col-12">
<div className="w-100 d-flex align-items-center justify-content-center" style={{ maxWidth: '500px' }}>

            {loading ? (
              <p>Loading properties...</p>
            ) : activeKey === "All" ? (
              <PropertyList
                properties={activeProperties}
                onRemove={(property) => setModal({ show: true, type: "remove", property })}
              />
            ) : (
              <PropertyList
                properties={removedProperties}
                onUndo={(property) => setModal({ show: true, type: "undo", property })}
              />
            )}
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
    </div>
    
  );
};

export default App;

















import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import pic from '../Assets/Default image_PP-01.png';
import myImage from '../Assets/Rectangle 146.png'; // Correct path
import myImage1 from '../Assets/Rectangle 145.png'; // Correct path
import indianprice from '../Assets/Indian Rupee-01.png'
import {FaCamera, FaEye , FaRulerCombined, FaBed, FaUserAlt, FaCalendarAlt, FaRupeeSign } from "react-icons/fa";
import { MdCall } from "react-icons/md";

const LastViewedProperty = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const phoneNumber = location.state?.phoneNumber || localStorage.getItem("phoneNumber") || "";

  const [properties, setProperties] = useState([]);
  const [removedPpcIds, setRemovedPpcIds] = useState(() => {
    const stored = localStorage.getItem(`viewed_removed_${phoneNumber}`);
    return stored ? JSON.parse(stored) : [];
  });
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ show: false, type: "", property: null });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer); // Cleanup on unmount or message change
    }
  }, [message]);
  

  const [imageCounts, setImageCounts] = useState({}); // Store image count for each property

      const fetchImageCount = async (ppcId) => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/uploads-count`, {
            params: { ppcId },
          });
          return response.data.uploadedImagesCount || 0;
        } catch (error) {
          console.error(`Error fetching image count for property ${ppcId}:`, error);
          return 0;
        }
      };
    
      // Fetch image counts for all properties
      useEffect(() => {
        const fetchAllImageCounts = async () => {
          const counts = {};
          await Promise.all(
            properties.map(async (property) => {
              const count = await fetchImageCount(property.ppcId);
              counts[property.ppcId] = count;
            })
          );
          setImageCounts(counts);
        };
    
        if (properties.length > 0) {
          fetchAllImageCounts();
        }
      }, [properties]);

  const saveToLocalStorage = (ppcIds) => {
    localStorage.setItem(`viewed_removed_${phoneNumber}`, JSON.stringify(ppcIds));
  };

  const handleRemove = (property) => {
    setModal({ show: true, type: "remove", property });
  };

  const handleUndo = (property) => {
    setModal({ show: true, type: "undo", property });
  };

  const updateRemovedList = (ppcId, type) => {
    let updated = [...removedPpcIds];
    if (type === "remove") updated.push(ppcId);
    else if (type === "undo") updated = updated.filter(id => id !== ppcId);
    setRemovedPpcIds(updated);
    saveToLocalStorage(updated);
  };

  const handleRemoveConfirm = async () => {
    const { ppcId } = modal.property;
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/delete-detail-property`, { ppcId, phoneNumber });
      updateRemovedList(ppcId, "remove");
      setMessage("Property removed successfully.");
    } catch {
      setMessage("Error removing property.");
    } finally {
      setModal({ show: false, type: "", property: null });
    }
  };

  const handleUndoConfirm = async () => {
    const { ppcId } = modal.property;
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/undo-delete-detail`, { ppcId, phoneNumber });
      updateRemovedList(ppcId, "undo");
      setMessage("Property status reverted!");
    } catch {
      setMessage("Error undoing property.");
    } finally {
      setModal({ show: false, type: "", property: null });
    }
  };

  const fetchLastViewed = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user-last-10-days-views/${phoneNumber}`);
      const allProperties = response.data.properties || [];

      const uniqueProperties = [];
      const seenPpcIds = new Set();
      for (let property of allProperties) {
        const id = property.ppcId || property._id;
        if (!seenPpcIds.has(id)) {
          seenPpcIds.add(id);
          uniqueProperties.push(property);
        }
      }

      setProperties(uniqueProperties);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (phoneNumber) fetchLastViewed();
  }, [phoneNumber]);



  

  const handlePageNavigation = () => navigate("/mobileviews");

  const allViews = properties.filter(prop => !removedPpcIds.includes(prop.ppcId));
  const removedViews = properties.filter(prop => removedPpcIds.includes(prop.ppcId));

  const handleContactClick = async (e, property) => {
    e.stopPropagation(); // Prevent card click from firing
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/contact`, {
        ppcId: property.ppcId,
        phoneNumber: property.postedUserPhoneNumber,
      });
      if (response.data.success) {
        setMessage("Contact saved successfully");
      } else {
     setMessage("Contact failed");
      }
    } catch (error) {
    setMessage("An error occurred");
    }
  };

  
  

  return (
    <div className="container d-flex align-items-center justify-content-center p-0">
      <div className="d-flex flex-column align-items-center justify-content-center w-100" style={{ maxWidth: "500px", margin: "auto" }}>
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
    </button>          <h3 className="m-0 ms-3" style={{ fontSize: "20px" }}>My Last Viewed Property</h3>
        </div>
        <div className="row g-2 w-100">

        {/* Tabs */}
        <div className="col-6 p-0">
        <button 
                       style={{ backgroundColor: '#30747F', color: 'white' }} 

          className={`w-100 btn border-0 ${activeTab === "all" ? "btn-primary" : "btn-light"}`} onClick={() => setActiveTab("all")}>ALL</button>
                            </div>

                    <div className="col-6 p-0">

          <button
                      style={{ backgroundColor: '#FFFFFF', color: 'grey' }} 

          className={`w-100 btn border-0 ${activeTab === "removed" ? "btn-primary" : "btn-light"}`} onClick={() => setActiveTab("removed")}>REMOVED</button>
        </div>

        {message && <div className="alert alert-info mt-2">{message}</div>}


        {/* Properties */}
        <div className="col-12 mb-1 p-1">
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
      </div>          ) : (
            <>
              {activeTab === "all" && allViews.length === 0 && <p>No viewed properties found.</p>}
              {activeTab === "removed" && removedViews.length === 0 && <p>No removed properties found.</p>}
              {(activeTab === "all" ? allViews : removedViews).map((property, index) => (
                <div key={index}
                className="row g-0 rounded-4 mb-2" style={{ border: '1px solid #ddd', overflow: "hidden", background:"#EFEFEF"}}                onClick={() => navigate(`/detail/${property.ppcId}`)}>
                  <div className="row g-0">
                  <div className="col-md-4 col-4 d-flex flex-column justify-content-between align-items-center">
                  <div className="text-white py-1 px-2 text-center" style={{ width: '100%', background: "#2F747F" }}>
 PUC- {property.ppcId}
 </div>


 <div style={{ position: "relative", width: "100%", height:'180px'}}>
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
          <FaCamera className="me-1"/> {imageCounts[property.ppcId] || 0}
          </span>
          <span className="d-flex justify-content-center align-items-center" style={{ color:'#fff', background:`url(${myImage1}) no-repeat center center`, backgroundSize:"cover" ,fontSize:'12px', width:'50px' }}>
          <FaEye className="me-1" />{property.views || 0}
          </span>
          </div>
          </div>
          </div>
                 </div>
              
                     <div className="col-md-8 col-8" style={{paddingLeft:"10px", background:"#F5F5F5"}}>
                                      <div className="d-flex justify-content-between"><p className="m-0" style={{ color:'#5E5E5E' , fontWeight:500}}>{property.propertyMode || 'N/A'}</p>
{activeTab === "all" ? (
                                <p className="m-0 ps-3 pe-3" style={{ background: "#FF0000", color: "white", cursor: "pointer", borderRadius: '0px 0px 0px 15px' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(property);
                          }}
                        >
                          Remove
                        </p>
                        
                        ) : (
                          <p className="m-0 ps-3 pe-3" style={{ background: "green", color: "white", cursor: "pointer", borderRadius: '0px 0px 0px 15px' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUndo(property);
                          }}
                        >
                          Undo
                        </p>
                        
                       )}
                                      </div>
                                       <p className="fw-bold m-0" style={{ color:'#000000' }}>{property.propertyType || 'N/A'}</p>
                                       <p className=" m-0" style={{ color:'#5E5E5E' , fontWeight:500}}>{property.city || 'N/A'} , {property.area || "N/A"}</p>
                                       <div className="card-body ps-2 m-0 pt-0 pe-2 d-flex flex-column justify-content-center">
                                         <div className="row">
                                           <div className="col-6 d-flex align-items-center  p-1">
                                             <FaRulerCombined className="me-2" color="#2F747F" /> <span style={{ fontSize:'13px', color:'#5E5E5E' }}>{property.totalArea || 'N/A'} {property.areaUnit || 'N/A'}  </span>
                                           </div>
                                           <div className="col-6 d-flex align-items-center p-1">
                                             <FaBed className="me-2" color="#2F747F"/> <span style={{ fontSize:'13px', color:'#5E5E5E' }}>{property.bedrooms || 'N/A'} BHK</span>
                                           </div>
                                           <div className="col-6 d-flex align-items-center  p-1">
                                             <FaUserAlt className="me-2" color="#2F747F"/> <span style={{ fontSize:'13px', color:'#5E5E5E' }}>{property.postedBy || 'N/A'}</span>
                                           </div>
                                          <div className="col-6 d-flex align-items-center p-1">
                                                                <FaCalendarAlt className="me-2" color="#2F747F"/> 
                                                                <span style={{ fontSize:'13px', color:'#5E5E5E', fontWeight: 500 }}>
                                                                {new Date(property.viewedAt).toLocaleString()}
                                                                </span>     
                                                                </div>    
                                            <div className="col-12 d-flex flex-col align-items-center p-1">
                                                       <h6 className="m-0">
                                                       <span style={{ fontSize:'15px', color:'#2F747F', fontWeight:'bold', letterSpacing:"1px" }}>
                                                       <img src={
                                        indianprice
                                      } alt="" width={8}  className="me-1"/>                                     {property.price ? property.price.toLocaleString('en-IN') : 'N/A'}
                                                       </span> 
                                                       <span style={{ color:'#2F747F', fontSize:'13px', marginLeft:"5px",fontSize:'11px',}}> 
                                                       Negotiable</span> 
                                                         </h6>
                                                      </div>
                                           {/* <p className="p-1" style={{ color: "#2E7480", margin: "0px" }}>
                                        <a
                                          href={`tel:${property.phoneNumber}`}
                                          onClick={handleContactClick}
                                          style={{
                                            textDecoration: "none",
                                            color: "#2E7480",
                                          }}
                                        >
                                          <MdCall className="me-1" color="#2F747F" />{" "}
                                          {property.phoneNumber || 'N/A'}
                                        </a>
                                        </p> */}

<p className="p-1" style={{ color: "#2E7480", margin: "0px" }}>
  <a
    href={`tel:${property.phoneNumber}`}
    onClick={(e) => handleContactClick(e, property)}
    style={{
      textDecoration: "none",
      color: "#2E7480",
    }}
  >
    <MdCall className="me-1" color="#2F747F" />{" "}
    {property.phoneNumber || 'N/A'}
  </a>
</p>

                                   </div>
                                          </div>
                                        </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Modal */}

        {modal.show && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 1050,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
    tabIndex="-1"
  >
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "8px",
        width: "90%",
        maxWidth: "500px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid #dee2e6",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h5 style={{ margin: 0 }}>
          {modal.type === "remove" ? "Confirm Removal" : "Undo Removal"}
        </h5>
        <button
          onClick={() =>
            setModal({ show: false, type: "", property: null })
          }
          style={{
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            lineHeight: "1",
            cursor: "pointer",
          }}
        >
          &times;
        </button>
      </div>
      <div style={{ padding: "16px" }}>
        <p>
          Are you sure you want to{" "}
          {modal.type === "remove" ? "remove" : "undo"} this property?
        </p>
      </div>
      <div
        style={{
          padding: "16px",
          borderTop: "1px solid #dee2e6",
          display: "flex",
          justifyContent: "flex-end",
          gap: "8px",
        }}
      >
        <button
          onClick={() => setModal({ show: false, type: "", property: null })}
          style={{
            padding: "6px 12px",
            backgroundColor: "#6c757d",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
        <button
          onClick={
            modal.type === "remove"
              ? handleRemoveConfirm
              : handleUndoConfirm
          }
          style={{
            padding: "6px 12px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {modal.type === "remove" ? "Remove" : "Undo"}
        </button>
      </div>
    </div>
  </div>
)}

      

      </div>
    </div>
    </div>

  );
};

export default LastViewedProperty;

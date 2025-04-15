



import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {FaCamera, FaEye , FaRulerCombined, FaBed, FaUserAlt, FaCalendarAlt, FaRupeeSign } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import myImage from '../../Assets/Rectangle 146.png'; // Correct path
import myImage1 from '../../Assets/Rectangle 145.png'; // Correct path
import pic from '../../Assets/Default image_PP-01.png'; // Correct path
import { FaArrowLeft } from "react-icons/fa";



const PropertyCard = ({ property, onRemove, onUndo, setMessage }) => {
  const navigate = useNavigate();

    // const [message, setMessage] = useState({ text: "", type: "" });
  
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
      useEffect(() => {
        const fetchImageCountForProperty = async () => {
          if (property?.ppcId) {
            const count = await fetchImageCount(property.ppcId);
            setImageCounts((prev) => ({
              ...prev,
              [property.ppcId]: count,
            }));
          }
        };
      
        fetchImageCountForProperty();
      }, [property]);
      

  return (
    <div>

    <div
      className="row g-0 rounded-4 mb-2"
      style={{ border: "1px solid #ddd", overflow: "hidden", background: "#EFEFEF" }}
      onClick={handleCardClick}
    >
      <div className="col-md-4 col-4 d-flex flex-column justify-content-between align-items-center">
        <div className="text-white py-1 px-2 text-center" style={{ width: "100%", background: "#2F747F" }}>
          PUC- {property.ppcId}
        </div>

        <div style={{ position: "relative", width: "100%", height: "160px" }}>
          <img
            src={property.photos?.length ? `http://localhost:5006/${property.photos[0]}` : pic}
            alt="Property"
            className="img-fluid"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />

          <div>
            <div
              className="d-flex justify-content-between w-100"
              style={{ position: "absolute", bottom: "0px" }}
            >
             

<span className="d-flex justify-content-center align-items-center" style={{ color:'#fff', background:`url(${myImage}) no-repeat center center`, backgroundSize:"cover" ,fontSize:'12px', width:'50px' }}>
          <FaCamera className="me-1"/> {imageCounts[property.ppcId] || 0}
          </span>
          <span className="d-flex justify-content-center align-items-center" style={{ color:'#fff', background:`url(${myImage1}) no-repeat center center`, backgroundSize:"cover" ,fontSize:'12px', width:'50px' }}>
          <FaEye className="me-1" />{property.views}
          </span>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-8 col-8" style={{ paddingLeft: "10px", background: "#F5F5F5" }}>
        <div className="d-flex justify-content-between">
          <p className="m-0 fw-bold" style={{ color: "#5E5E5E" }}>
            {property.propertyMode || "N/A"}
          </p>

          {onRemove && (
            <p
              className="m-0 ps-3 pe-3"
              style={{
                background: "#FF0000",
                color: "white",
                cursor: "pointer",
                borderRadius: "0px 0px 0px 15px",
              }}
              onClick={(e) => {
                e.stopPropagation();
                onRemove(property.ppcId, property.postedUserPhoneNumber);
              }}
            >
              Remove
            </p>
          )}
          {onUndo && (
            <p
              className="m-0 ps-3 pe-3"
              style={{
                background: "green",
                color: "white",
                cursor: "pointer",
                borderRadius: "0px 0px 0px 15px",
              }}
              onClick={(e) => {
                e.stopPropagation();
                onUndo(property.ppcId, property.postedUserPhoneNumber);
              }}
            >
              Undo
            </p>
          )}
        </div>
        <p className="fw-bold m-0" style={{ color: "#000000" }}>
          {property.propertyType || "N/A"}
        </p>
        <p className="fw-bold m-0" style={{ color: "#5E5E5E" }}>
          {property.city || "N/A"}
        </p>
        <div className="card-body ps-2 m-0 pt-0 pe-2 d-flex flex-column justify-content-center">
          <div className="row">
            <div className="col-6 d-flex align-items-center p-1">
              <FaRulerCombined className="me-2" color="#2F747F" />{" "}
              <span style={{ fontSize: "13px", color: "#5E5E5E" }}>
                {property.totalArea || "N/A"}
                {property.areaUnit || "N/A"}
              </span>
            </div>
            <div className="col-6 d-flex align-items-center p-1">
              <FaBed className="me-2" color="#2F747F" />{" "}
              <span style={{ fontSize: "13px", color: "#5E5E5E" }}>
                {property.bedrooms || "N/A"} BHK
              </span>
            </div>
            <div className="col-6 d-flex align-items-center p-1">
              <FaUserAlt className="me-2" color="#2F747F" />{" "}
              <span style={{ fontSize: "13px", color: "#5E5E5E" }}>
                {property.postedBy || "N/A"}
              </span>
            </div>
            <div className="col-6 d-flex align-items-center p-1">
              <FaCalendarAlt className="me-2" color="#2F747F" />{" "}
              <span style={{ fontSize: "13px", color: "#5E5E5E", fontWeight: 500 }}>
                {property.createdAt
                  ? new Date(property.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "N/A"}
              </span>
            </div>

            <div className="col-12 d-flex flex-col align-items-center p-1">
              <h6 className="m-0">
                <span
                  style={{
                    fontSize: "15px",
                    color: "#2F747F",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                  }}
                >
                  <FaRupeeSign className="me-2" color="#2F747F" />
                  {property.price ? property.price.toLocaleString("en-IN") : "N/A"}
                </span>
                <span
                  style={{
                    color: "#2F747F",
                    fontSize: "11px",
                    marginLeft: "5px",
                  }}
                >
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


  // Auto-clear message after 3 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Fetch interested properties
  const fetchInterestedProperties = useCallback(async () => {
    if (!phoneNumber) {
      return;
    }
    
    try {
      setLoading(true);
      const apiUrl = `${process.env.REACT_APP_API_URL}/get-contact-owner`;

      const { data } = await axios.get(apiUrl, { params: { phoneNumber } });


      setProperties(data.contactRequestsData);
      localStorage.setItem("contactProperties", JSON.stringify(data.contactRequestsData));
    } catch (error) {
      setMessage({ text: "Failed to fetch properties.", type: "error" });
    } finally {
      setLoading(false);
    }
  }, [phoneNumber]);

  // 🔥 Ensure API is called when component loads
  useEffect(() => {
    fetchInterestedProperties();
  }, [fetchInterestedProperties]);

  // Remove property
  const handleRemoveProperty = async (ppcId) => {
    if (!window.confirm("Are you sure you want to remove this property?")) return;
    
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/delete-detail-property`, { ppcId, phoneNumber });
      updatePropertyStatus(ppcId, "delete");
      setMessage({ text: "Property removed successfully.", type: "success" });
    } catch (error) {
      setMessage({ text: "Error removing property.", type: "error" });
    }
  };

  // Undo property removal
  const handleUndoRemove = async (ppcId) => {
    if (!window.confirm("Do you want to undo the removal of this property?")) return;
    
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/undo-delete-detail`, { ppcId, phoneNumber });
      updatePropertyStatus(ppcId, "active");
      setMessage({ text: "Property status reverted successfully!", type: "success" });
    } catch (error) {
      setMessage({ text: "Error undoing property status.", type: "error" });
    }
  };

  // Update property status in local state and storage
  const updatePropertyStatus = (ppcId, status) => {
    const updatedProperties = properties.map((property) =>
      property.ppcId === ppcId ? { ...property, status } : property
    );
    setProperties(updatedProperties);
    localStorage.setItem("contactProperties", JSON.stringify(updatedProperties));
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
        style={{ maxWidth: '500px', margin: 'auto', width: '100%' , background:"#F7F7F7",fontFamily: 'Inter, sans-serif'}}>
        <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
          <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
        </button> <h3 className="m-0 ms-3" style={{fontSize:"15px"}}>CONTACT OWNER </h3> </div>
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

          {/* Property List */}
          <div className="col-12">
            <div className="w-100 d-flex align-items-center justify-content-center" style={{ maxWidth: '500px' }}>
              {loading ? (
                <p>Loading properties...</p>
              ) : activeKey === "All" ? (
                <PropertyList properties={activeProperties} onRemove={handleRemoveProperty} />
              ) : (
                <PropertyList properties={removedProperties} onUndo={handleUndoRemove} />
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;


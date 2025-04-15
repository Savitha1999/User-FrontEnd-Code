



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {FaCamera, FaEye , FaRulerCombined, FaBed, FaUserAlt, FaCalendarAlt, FaRupeeSign } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import myImage from '../../Assets/Rectangle 766.png'; // Correct path
import myImage1 from '../../Assets/Rectangle 145.png'; // Correct path
import pic from '../../Assets/Default image_PP-01.png'; // Correct path
import { FaArrowLeft } from "react-icons/fa";


const App = () => {
  const [offers, setOffers] = useState([]); // Active properties
  const [removedOffers, setRemovedOffers] = useState([]); // Removed properties
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [activeKey, setActiveKey] = useState("All");
  const { phoneNumber } = useParams();
  const [localProperties, setLocalProperties] = useState([]);
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 3000);
  
      return () => clearTimeout(timer); // Cleanup timeout when component re-renders
    }
  }, [message]);
  // Load offers and removedOffers from localStorage on page load
  useEffect(() => {
    const storedOffers = JSON.parse(localStorage.getItem("offers")) || [];
    const storedRemovedOffers = JSON.parse(localStorage.getItem("removedOffers")) || [];

    setOffers(storedOffers);
    setRemovedOffers(storedRemovedOffers);
  }, []);

  // Persist changes to localStorage whenever offers or removedOffers change
  useEffect(() => {
    localStorage.setItem("offers", JSON.stringify(offers));
    localStorage.setItem("removedOffers", JSON.stringify(removedOffers));
  }, [offers, removedOffers]);

  // Fetch offers based on phoneNumber
  useEffect(() => {
    const fetchOffers = async () => {
      if (!phoneNumber) return;

      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/offers/owner/${phoneNumber}`);
        if (response.status === 200) {
          // const fetchedOffers = response.data.offers || [];
          // setOffers(fetchedOffers);
          const updatedOffers = await axios.get(`${process.env.REACT_APP_API_URL}/offers/owner/${phoneNumber}`);
          setOffers(updatedOffers.data.offers);
        } else {
          setMessage({ text: "No owners found for this offer user.", type: "danger" });
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [phoneNumber]);

  
  const handleRemoveProperty = async (ppcId, buyerPhoneNumber) => {
       if (!window.confirm("Are you sure you want to remove this offer?")) return;

    try {
      // API call to delete the offer
      await axios.put(`${process.env.REACT_APP_API_URL}/offers/delete/${ppcId}/${buyerPhoneNumber}`);
      
      // After deletion, update the state and localStorage
      const updatedOffers = offers.filter(
        (property) => property.ppcId !== ppcId || property.buyerPhoneNumber !== buyerPhoneNumber
      );
      
      // Find the property being removed to preserve its offeredPrice
      const propertyToRemove = offers.find(
        (property) => property.ppcId === ppcId && property.buyerPhoneNumber === buyerPhoneNumber
      );
  
      // If found, add it to removedOffers with the offeredPrice
      if (propertyToRemove) {
        const updatedRemovedOffers = [...removedOffers, propertyToRemove];
        setRemovedOffers(updatedRemovedOffers);
        localStorage.setItem("removedOffers", JSON.stringify(updatedRemovedOffers));
      }
      
      setOffers(updatedOffers);
      localStorage.setItem("offers", JSON.stringify(updatedOffers));
  
      // Optionally, show a success message to the user
      setMessage({ text: "Property removed successfully", type: "success" });
    } catch (error) {
      setMessage({ text: "Error removing property", type: "danger" });
    }
  };
  

  const handleUndoRemove = async (ppcId, buyerPhoneNumber) => {
      if (!window.confirm("Do you want to restore this offer?")) return;

    try {
      // API call to undo the removal of the offer
      await axios.put(`${process.env.REACT_APP_API_URL}/offers/undo/${ppcId}/${buyerPhoneNumber}`);
  
      // Find the property to undo from removedOffers
      const propertyToUndo = removedOffers.find(
        (property) => property.ppcId === ppcId && property.buyerPhoneNumber === buyerPhoneNumber
      );
  
      if (propertyToUndo) {
        // Example of how you might want to update the offeredPrice on undo
        const updatedProperty = {
          ...propertyToUndo,
          offeredPrice: propertyToUndo.offeredPrice, // Ensure this is the price you want
        };
  
        // Update the offers state to include the restored property with the updated price
        setOffers((prevOffers) => {
          const updatedOffers = [...prevOffers, updatedProperty];
  
          // Update localStorage with updated offers
          localStorage.setItem("offers", JSON.stringify(updatedOffers));
          return updatedOffers;
        });
  
        // Remove the property from removedOffers state
        setRemovedOffers((prevRemovedOffers) => {
          const updatedRemovedOffers = prevRemovedOffers.filter(
            (property) => property.ppcId !== ppcId || property.buyerPhoneNumber !== buyerPhoneNumber
          );
  
          // Update localStorage with updated removedOffers
          localStorage.setItem("removedOffers", JSON.stringify(updatedRemovedOffers));
  
          return updatedRemovedOffers;
        });
  
        // Optionally, show a success message to the user
        setMessage({ text: "Property restored successfully", type: "success" });
      }
    } catch (error) {
      setMessage({ text: "Error restoring property", type: "danger" });
    }
  };
  useEffect(() => {
    setProperties([...properties]); // Trigger re-render
  }, [properties]);
  useEffect(() => {
    setProperties((prev) => [...prev]); // This ensures React detects a change
  }, [localProperties]);
  
  
      
  // Filter active and removed properties
  const activeProperties = offers.filter((property) => property.status !== "delete");
  const removedProperties = removedOffers;
  const navigate = useNavigate();

  const handlePageNavigation = () => {
    navigate('/mobileviews'); // Redirect to the desired path
  };
  return (
    <div className="container d-flex align-items-center justify-content-center p-0">
      <div className="d-flex flex-column align-items-center justify-content-center m-0" style={{ maxWidth: '500px', margin: 'auto', width: '100%' }}>
        {/* Buttons for filtering */}
        <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
          <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
        </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>  OFFER OWNER</h3> </div>
        <div className="row g-2 w-100">
          <div className="col-6 p-0">
            <button className="w-100" style={{ backgroundColor: '#4F4B7E', color: 'white' }} onClick={() => setActiveKey("All")}>
              All Properties
            </button>
          </div>
          <div className="col-6 p-0">
            <button className="w-100" style={{ backgroundColor: '#FF0000', color: 'white' }} onClick={() => setActiveKey("Removed")}>
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
                <PropertyList properties={activeProperties} onRemove={handleRemoveProperty} 
                    />
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

const PropertyList = ({ properties, onRemove, onUndo, onAccept, onReject }) => {
  return properties.length === 0 ? (
    <p>No properties found.</p>
  ) : (
    <div className="row mt-4 w-100">
      {properties.map((property) => (
        <div className="col-12 mb-1 p-0" key={property.ppcId}>
          <PropertyCard
            property={property}
            onRemove={onRemove}
            onUndo={onUndo}
            onAccept={onAccept}
            onReject={onReject}
          />
        </div>
      ))}
    </div>
  );
};


const PropertyCard = ({ property, onRemove, onUndo, onAccept, onReject }) => {
  const [activeButton, setActiveButton] = useState(property.status || null);

  
  const [message, setMessage] = useState({ text: "", type: "" });
         
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
    <div className="row g-0 mb-2 w-100" style={{ border: "1px solid #ddd", overflow: "hidden", background: "#EFEFEF" ,  borderRadius:"25px" , fontFamily:"Inter, sans-serif",}}>
      {/* Left Column - Image & PUC ID */}
      <div className="col-md-4 col-4 d-flex flex-column align-items-center">
        <div className="text-white py-1 px-2 text-center" style={{ width: "100%", background: "#2F747F" }}>
          PUC- {property.ppcId || "N/A"}
        </div>

      
 <div style={{ position: "relative", width: "100%", height:'190px'}}>
            <img
                                        src={property.photos?.length ? `http://localhost:5006/${property.photos[0]}` : pic}
                                        alt="Property"
                                        className="img-fluid"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover',  backgroundSize: "cover",
                                          backgroundPosition: "center",
                                          backgroundRepeat: "no-repeat", }}
                                      />
          
          <div >
          <div className="d-flex justify-content-between w-100" style={{ position: "absolute",
          bottom: "0px"}}>
                         
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

      {/* Right Column - Property Details */}
      <div className="col-md-8 col-8" style={{paddingLeft:"10px", background:"#F5F5F5"}}>
      <div className="d-flex justify-content-between">
          <p className="mb-1 fw-bold" style={{ color: "#5E5E5E" }}>{property.propertyMode || "N/A"}</p>

          {onRemove && (
            <p className="m-0 ps-3 pe-3" style={{background:"#FF0000", color:"white", cursor:"pointer", borderRadius: '0px 0px 0px 15px'}} onClick={() => onRemove(property.ppcId, property.buyerPhoneNumber)}>Remove</p>
          )}
          {onUndo && (
            <p className="m-0 ps-3 pe-3" style={{background:"green", color:"white", cursor:"pointer", borderRadius: '0px 0px 0px 15px'}} onClick={() => onUndo(property.ppcId, property.buyerPhoneNumber)}>Undo</p>
          )}
        </div>

        <p className="fw-bold m-0" style={{ color: "#000000" }}>{property.propertyType || "N/A"}</p>
        <p className="fw-bold m-0" style={{ color: "#5E5E5E" }}>{property.city || "N/A"}</p>

        {/* Icons and Details */}
        <div className="card-body ps-2 m-0 pt-0 pe-2 d-flex flex-column justify-content-center">
          <div className="row">
        <div className="col-6 d-flex align-items-center  p-1">
              <FaRulerCombined className="me-2" color="#2F747F" /> <span style={{ fontSize: "13px", color: "#5E5E5E" }}>{property.totalArea || "N/A"}</span>
            </div>
        <div className="col-6 d-flex align-items-center  p-1">
              <FaBed className="me-2" color="#2F747F" /> <span style={{ fontSize: "13px", color: "#5E5E5E" }}>{property.bedrooms || "N/A"}</span>
            </div>
        <div className="col-6 d-flex align-items-center  p-1">
              <FaUserAlt className="me-2" color="#2F747F" /> <span style={{ fontSize: "13px", color: "#5E5E5E" }}>{property.ownership || "N/A"}</span>
            </div>
        <div className="col-6 d-flex align-items-center  p-1">
              <FaCalendarAlt className="me-2" color="#2F747F" /> <span style={{ fontSize: "13px", color: "#5E5E5E" }}>{property.bestTimeToCall || "N/A"}</span>
            </div>

            {/* Display Property Price */}
            <div className="col-12 d-flex flex-col align-items-center p-1">
            <h6 className="m-0">
                <span style={{ fontSize: "17px", color: "#2F747F", fontWeight: "bold", letterSpacing: "1px" }}>
                  <FaRupeeSign className="me-2" color="#2F747F" />{property.price ? property.price.toLocaleString('en-IN') : "N/A"}
                </span>
                <span style={{ color: "#2F747F", fontSize: "11px", marginLeft: "5px" }}>Negotiable</span>
              </h6>
            </div>
            {/* <p className="ps-1" style={{ color: "#2E7480", margin: "0px" }}>
          <a href={`tel:${property.postedUserPhoneNumber}`} style={{ textDecoration: "none", color: "#2E7480" }}>
              <MdCall className="me-2" color="#2F747F" /> {property.postedUserPhoneNumber || "N/A"}
            </a>
          </p> */}

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

          {/* Buyer Phone Number */}
          {/* <p className="p-0" style={{ color: "#2E7480", margin: "0px" }}>
          <a href={`tel:${property.postedUserPhoneNumber}`} style={{ textDecoration: "none", color: "#2E7480" }}>
              <MdCall className="me-2" color="#2F747F" /> {property.postedUserPhoneNumber || "N/A"}
            </a>
          </p> */}

          {/* Accept/Reject Buttons */}

 <div className="d-flex justify-content-between align-items-center ps-2 pe-2 mt-1">
         {/* <button className="btn text-white px-3 py-1 flex-grow-1 mx-1" style={{ background: activeButton === "accept" ? "#4CAF50" : "#2F747F", width: "80px", fontSize: "11px" }} onClick={() => { setActiveButton("accept"); onAccept(property.ppcId, property.buyerPhoneNumber, "accept"); }}>YES</button>
         <button className="btn text-white px-3 py-1 flex-grow-1 mx-1" style={{ background: activeButton === "reject" ? "#FF5733" : "#2F747F", width: "80px", fontSize: "11px" }} onClick={() => { setActiveButton("reject"); onReject(property.ppcId, property.buyerPhoneNumber, "reject"); }}>NO</button> */}
         <span style={{ color: property.status === "accept" ? "green" : "red" }}>{property.status}</span>
       </div>
        </div>
      </div>
      <div className="col-12 " style={{ border:"2px solid #2F747F", borderRadius:"0px 0px 50px 50px", overflow:'hidden'}}>   {property.offeredPrice ? (
  <div className="w-100 d-flex flex-col align-items-center justify-content-center">
    <h6 className="m-0">
      <span
        style={{
          fontSize: "17px",
          color: "#2F747F",
          fontWeight: "bold",
          letterSpacing: "1px",
        }}
      >
        <FaRupeeSign className="me-2" color="#2F747F" />
        {property.offeredPrice.toLocaleString("en-IN")}
      </span>
      <span style={{ color: "#2F747F", fontSize: "11px", marginLeft: "5px" }}>
        Offered Price
      </span>
    </h6>
  </div>
) : (
  <div className="w-100 d-flex flex-col align-items-center justify-content-center">
    <h6 className="m-0" style={{ color: "#FF0000" }}>
      Offered Price Not Available
    </h6>
  </div>
)}
</div>
    </div>
  );
};

export default App;







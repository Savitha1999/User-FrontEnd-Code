

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {FaCamera, FaEye , FaRulerCombined, FaBed, FaUserAlt, FaCalendarAlt, FaRupeeSign } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import myImage from '../../Assets/Rectangle 766.png'; // Correct path
import myImage1 from '../../Assets/Rectangle 145.png'; // Correct path
import pic from '../../Assets/Default image_PP-01.png'; // Correct path
import { toast } from "react-toastify";
import profil from '../../Assets/xd_profile.png'
import { Button, Modal } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2"; // Import SweetAlert2 for better popup messages


const App = () => {
  const [offers, setOffers] = useState([]); // Active properties
  const [removedOffers, setRemovedOffers] = useState([]); // Removed properties
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [activeKey, setActiveKey] = useState("All");
  const { phoneNumber } = useParams();
  const [localProperties, setLocalProperties] = useState([]);
  const [properties, setProperties] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupAction, setPopupAction] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");

  const confirmAction = (message, action) => {
    setPopupMessage(message);
    setPopupAction(() => action);
    setShowPopup(true);
  };

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
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/offers/buyer/${phoneNumber}`);
        if (response.status === 200) {
          const fetchedOffers = response.data.offers || [];
          setOffers(fetchedOffers);
          const updatedOffers = await axios.get(`${process.env.REACT_APP_API_URL}/offers/buyer/${phoneNumber}`);
          setOffers(updatedOffers.data.offers);
        } else {
          setMessage({ text: "No buyers found for this offer user.", type: "danger" });
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [phoneNumber]);


  const handleRemoveProperty = async (ppcId, buyerPhoneNumber) => {
     confirmAction("Are you sure you want to remove this offer?", async () => {

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
    setShowPopup(false);
  });
  };
  

  const handleUndoRemove = async (ppcId, buyerPhoneNumber) => {
       confirmAction("Do you want to restore this offer?", async () => {

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
    setShowPopup(false);
  });
  };
  // useEffect(() => {
  //   setProperties([...properties]); // Trigger re-render
  // }, [properties]);
  useEffect(() => {
    setProperties((prev) => {
        if (prev !== properties) return [...properties]; 
        return prev; // No update if it's the same
    });
}, [properties]);

  useEffect(() => {
    setProperties((prev) => [...prev]); // This ensures React detects a change
  }, [localProperties]);
     
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000); // Auto-close after 3 seconds
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [message]);



const handleAcceptOffer = async (ppcId, buyerPhoneNumber) => {
  try {
    let formattedPhoneNumber = buyerPhoneNumber.replace(/\D/g, "");
    if (formattedPhoneNumber.startsWith("91") && formattedPhoneNumber.length === 12) {
      formattedPhoneNumber = formattedPhoneNumber.slice(2);
    }

    const response = await axios.put(`${process.env.REACT_APP_API_URL}/accept-offer`, {
      ppcId,
      buyerPhoneNumber: formattedPhoneNumber,
    });

    if (response.status === 200) {
      // Show popup confirmation
      Swal.fire({
        title: "Offer Accepted!",
        text: "The offer has been successfully accepted.",
        icon: "success",
        confirmButtonColor: "#2294B1",
      });

      // Update the state
      setOffers((prevOffers) =>
        prevOffers.map((property) =>
          property.ppcId === ppcId ? { ...property, status: "accept" } : property
        )
      );

      setProperties((prevProperties) =>
        prevProperties.map((property) =>
          property.ppcId === ppcId ? { ...property, status: "accept" } : property
        )
      );

      // Fetch updated offers from backend
      const updatedOffers = await axios.get(`${process.env.REACT_APP_API_URL}/offers/buyer/${phoneNumber}`);
      setOffers(updatedOffers.data.offers);
    }
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "There was an error accepting the offer.",
      icon: "error",
      confirmButtonColor: "#d33",
    });
  }
};

const handleRejectOffer = async (ppcId, buyerPhoneNumber) => {
  try {
    let formattedPhoneNumber = buyerPhoneNumber.replace(/\D/g, "");
    if (formattedPhoneNumber.startsWith("91") && formattedPhoneNumber.length === 12) {
      formattedPhoneNumber = formattedPhoneNumber.slice(2);
    }

    const response = await axios.put(`${process.env.REACT_APP_API_URL}/reject-offer`, {
      ppcId,
      buyerPhoneNumber: formattedPhoneNumber,
    });

    if (response.status === 200) {
      // Show popup confirmation
      Swal.fire({
        title: "Offer Rejected!",
        text: "The offer has been successfully rejected.",
        icon: "info",
        confirmButtonColor: "#2294B1",
      });

      // Update the state
      setOffers((prevOffers) =>
        prevOffers.map((property) =>
          property.ppcId === ppcId ? { ...property, status: "reject" } : property
        )
      );

      setProperties((prevProperties) =>
        prevProperties.map((property) =>
          property.ppcId === ppcId ? { ...property, status: "reject" } : property
        )
      );

      // Fetch updated offers from backend
      const updatedOffers = await axios.get(`${process.env.REACT_APP_API_URL}/offers/buyer/${phoneNumber}`);
      setOffers(updatedOffers.data.offers);
    }
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "There was an error rejecting the offer.",
      icon: "error",
      confirmButtonColor: "#d33",
    });
  }
};

      
  // Filter active and removed properties
  const activeProperties = offers.filter((property) => property.status !== "delete");
  const removedProperties = removedOffers;
  const navigate = useNavigate();


  const handlePageNavigation = () => {
    navigate('/mobileviews'); // Redirect to the desired path
  };
  return (
    <div className="container d-flex align-items-center justify-content-center p-0">
      <div className="d-flex flex-column align-items-center justify-content-center m-0" style={{ maxWidth: '500px', margin: 'auto', width: '100%', background:"#F7F7F7" , fontFamily: 'Inter, sans-serif' }}>
        {/* Buttons for filtering */}
        <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
          <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
        </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>OFFER BUYER </h3> </div>
        <div className="row g-2 w-100">
          <div className="col-6 p-0">
            <button className="w-100" style={{ backgroundColor: '#30747F', color: 'white' }} onClick={() => setActiveKey("All")}>
              All Properties
            </button>
          </div>
          <div className="col-6 p-0">
            <button className="w-100" style={{ backgroundColor: '#FFFFFF', color: 'grey' }} onClick={() => setActiveKey("Removed")}>
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
                <PropertyList properties={activeProperties} onRemove={handleRemoveProperty}  onAccept={handleAcceptOffer} 
                   onReject={handleRejectOffer}  />
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
      {properties.map((property, index) => (
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
    const [showFullNumber, setShowFullNumber] = useState(false);

      const [message, setMessage] = useState({ text: "", type: "" });
    

    // 1. Create a handler function to log contact and initiate call
const handleContactBuyer = async (buyerPhoneNumber, ppcId) => {
  try {
    // Call the /contact API
    await axios.post(`${process.env.REACT_APP_API_URL}/contact`, {
      ppcId: ppcId,
      phoneNumber: buyerPhoneNumber,
    });
    setMessage({ text: "Contact logged successfully", type: "success" });

    // Open dialer
    window.location.href = `tel:${buyerPhoneNumber}`;
  } catch (error) {
    setMessage({ text: "Failed to log contact", type: "error" });
  }
};

  
  return (

<div
// key={index}
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
    <div className='text-center rounded-1 w-100 mb-1' style={{border:"2px solid #30747F", color:"#30747F", fontSize:"13px"}}>INTERESTED BUYER</div>
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

<div className="p-1">
<div className="d-flex align-items-center mb-2">
  <div className="d-flex  flex-row align-items-start justify-content-between">

   
  <div className="d-flex align-items-center ms-3">
      <FaRupeeSign color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
      <div>
        <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
        Your Price
        </h6>
        <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500"}}>
        {property.price ? property.price.toLocaleString('en-IN') : "N/A"}       
        </span>
      </div>
    </div>
    <div className="d-flex align-items-center ms-3">
      <FaRupeeSign color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
      <div>
        <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
         Offered Price
        </h6>
        <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500"}}>
        {property.offeredPrice.toLocaleString("en-IN")}     </span>  </div>
    </div>
    </div>
              </div>
  <div className="d-flex align-items-center mb-2">
  <div className="d-flex  flex-row align-items-start justify-content-between ps-3">

   
    <div className="d-flex align-items-center ">
      <MdCall color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
      <div>
        <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
           Buyer Phone
        </h6>
        {/* <span className="card-text" style={{  fontWeight:"500"}}>
        <a href={`tel:${property.buyerPhoneNumber}`} style={{ textDecoration: "none", color: "#1D1D1D" }}>
{showFullNumber
? property.buyerPhoneNumber
: property.buyerPhoneNumber?.slice(0, 5) + "*****"}
</a>
        </span> */}

<span className="card-text" style={{ fontWeight: "500" }}>
  <span
    onClick={() => {
      if (showFullNumber) {
        handleContactBuyer(property.buyerPhoneNumber, property.ppcId);
      }
    }}
    style={{ textDecoration: "none", color: "#1D1D1D", cursor: "pointer" }}
  >
    {showFullNumber
      ? property.buyerPhoneNumber
      : property.buyerPhoneNumber?.slice(0, 5) + "*****"}
  </span>
</span>
      </div>
    </div>
    <div className="d-flex align-items-center ms-3">
      <FaCalendarAlt color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
      <div>
        <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
        Buyer Offered Date
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
{/* <button
        className="btn text-white px-3 py-1 flex-grow-1 mx-1"
        style={{ background:  "#2F747F", width: "80px", fontSize: "13px" }}

     >
        Call
      </button>    */}

      
<button
  className="btn text-white px-3 py-1 flex-grow-1 mx-1"
  style={{ background: "#2F747F", width: "80px", fontSize: "13px" }}
  onClick={() => handleContactBuyer(property.buyerPhoneNumber, property.ppcId)}
>
  Call
</button>

      <button className="btn text-white px-3 py-1 flex-grow-1 mx-1" style={{ background: activeButton === "accept" ? "#4CAF50" : "#2F747F", width: "80px", fontSize: "11px" }} onClick={() => { setActiveButton("accept"); onAccept(property.ppcId, property.buyerPhoneNumber, "accept"); }}>YES</button>
         <button className="btn text-white px-3 py-1 flex-grow-1 mx-1" style={{ background: activeButton === "reject" ? "#FF5733" : "#2F747F", width: "80px", fontSize: "11px" }} onClick={() => { setActiveButton("reject"); onReject(property.ppcId, property.buyerPhoneNumber, "reject"); }}>NO</button>
     
           {onRemove && (
            <button className="btn text-white px-3 py-1 flex-grow-1 mx-1" style={{ background:  "#FF0000", width: "80px", fontSize: "13px" }}
            onClick={() => onRemove(property.ppcId, property.buyerPhoneNumber)}>Remove</button>
          )}
          {onUndo && (
            <button cclassName="btn text-white px-3 py-1 flex-grow-1 mx-1" style={{ background:  "green", width: "80px", fontSize: "13px" }}
             onClick={() => onUndo(property.ppcId, property.buyerPhoneNumber)}>Undo</button>
          )}
</div>
: ''}

</div>
</div>

  );
};

export default App;

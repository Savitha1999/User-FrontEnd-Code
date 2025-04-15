



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FaRupeeSign, FaBed,  
  FaCalendarAlt, FaUserAlt, FaRulerCombined,
  FaCamera,
  FaEye,
  FaPhoneAlt
} from "react-icons/fa";
import myImage from '../../Assets/Rectangle 146.png'; // Correct path
import myImage1 from '../../Assets/Rectangle 145.png'; // Correct path
import pic from '../../Assets/Default image_PP-01.png'; // Correct path
import { MdCall } from 'react-icons/md';
import profil from '../../Assets/xd_profile.png'
import { TbCameraPlus } from "react-icons/tb";
import { Button, Modal } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

const App = () => {
  const [activeKey, setActiveKey] = useState("All");
  const [removedProperties, setRemovedProperties] = useState(() => {
    // Load removed properties from localStorage on initial load
    const storedRemovedProperties = localStorage.getItem("removedProperties");
    return storedRemovedProperties ? JSON.parse(storedRemovedProperties) : [];
  });
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
   const [showPopup, setShowPopup] = useState(false);
   const [popupAction, setPopupAction] = useState(null);
   const [popupMessage, setPopupMessage] = useState("");
   const navigate = useNavigate();

   const confirmAction = (message, action) => {
     setPopupMessage(message);
     setPopupAction(() => action);
     setShowPopup(true);
   };
  const handleRemoveProperty = async (ppcId, requesterPhoneNumber) => {
    // if (!ppcId || !requesterPhoneNumber) {
    //   return;
    // }
    confirmAction("Are you sure you want to remove this Photo request?", async () => {

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/photo-requests/delete/${ppcId}/${requesterPhoneNumber}`
      );
  
      if (response.status === 200) {
        setMessage("Photo request marked as deleted.");
  
        const deletedRequest = response.data.request; // Get deleted request details
  
        // Remove only the deleted property while keeping others with same ppcId
        setProperties((prev) => 
          prev.filter((prop) => !(prop.ppcId === ppcId && prop.requesterPhoneNumber === requesterPhoneNumber))
        );
  
        // Add deleted property to removedProperties
        setRemovedProperties((prev) => {
          const updatedRemovedProperties = [...prev, deletedRequest];
          localStorage.setItem("removedProperties", JSON.stringify(updatedRemovedProperties));
          return updatedRemovedProperties;
        });
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error deleting photo request.");
    }
    setShowPopup(false);
  });
  };
  
  const handleUndoRemove = async (ppcId, requesterPhoneNumber) => {
   
    confirmAction("Do you want to restore this Photo request buyer?", async () => {

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/photo-requests/undo/${ppcId}/${requesterPhoneNumber}`
      );

      if (response.status === 200) {
        setMessage("Photo request restored.");

        // Ensure status is correctly updated
        const restoredProperty = response.data.request;
        restoredProperty.status = 'photo request pending'; // Ensure it's set to an appropriate status


        // Remove from 'removedProperties' and add back to 'properties'
        setRemovedProperties((prev) => {
          const updatedRemovedProperties = prev.filter(
            (prop) => prop.ppcId !== ppcId
          );
          localStorage.setItem(
            "removedProperties",
            JSON.stringify(updatedRemovedProperties)
          );
          return updatedRemovedProperties;
        });

        setProperties((prev) => {
          // Log properties before and after updating to verify change
          const updatedProperties = [...prev, restoredProperty];
          return updatedProperties;
        });
      }
    } catch (error) {
      setMessage("Error restoring photo request.");
    }
    setShowPopup(false);
  });
  };

  const { phoneNumber } = useParams();

  useEffect(() => {
    if (!phoneNumber) {
      setMessage("Phone number is missing.");
      setLoading(false);
      return;
    }

    const fetchViewedProperties = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/photo-requests/buyer/${phoneNumber}`
        );
        if (response.status === 200) {
          console.log("Fetched Properties:", response.data);
          setProperties(response.data);
        } else {
          setMessage("No photo requests found.");
        }
      } catch (error) {
        setMessage("Error fetching photo requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchViewedProperties();
  }, [phoneNumber]); // Removed setProperties from dependencies
   
useEffect(() => {
  if (message) {
    const timer = setTimeout(() => setMessage(""), 5000); // Auto-close after 3 seconds
    return () => clearTimeout(timer); // Cleanup timer
  }
}, [message]);

  // Save removed properties to localStorage whenever removedProperties changes
  useEffect(() => {
    localStorage.setItem("removedProperties", JSON.stringify(removedProperties));
  }, [removedProperties]);

  // Filter out removed properties from the properties list
  const availableProperties = properties.filter(
    (property) =>
      !removedProperties.some((removed) => removed.ppcId === property.ppcId)
  );

  if (loading) return <p>Loading properties...</p>;


  const activeProperties = properties.filter(
    (property) =>
      ["photo request pending", "photo send", "photo request rejected"].includes(property.status) &&
      !removedProperties.some(
        (removed) => removed.ppcId === property.ppcId && removed.requesterPhoneNumber === property.requesterPhoneNumber
      )
  );

     

  const handlePageNavigation = () => {
    navigate('/mobileviews'); // Redirect to the desired path
  };
  
  return (
    <div className="container d-flex align-items-center justify-content-center p-0">
      <div className="d-flex flex-column align-items-center justify-content-center m-0" style={{ maxWidth: '500px', margin: 'auto', width: '100%', background:"#F7F7F7" , fontFamily: 'Inter, sans-serif'}}>
        {/* Buttons for filtering */}
        <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
          <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
        </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>PHOTO REQUEST BUYER </h3> </div>
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
      <PropertyList
        properties={activeProperties}  // ✅ Show only required statuses
        onRemove={handleRemoveProperty}
        setProperties={setProperties}
        setRemovedProperties={setRemovedProperties}
      />
    ) : (
      <PropertyList
        properties={removedProperties.filter(property => property.status === "deleted")} // ✅ Show only "deleted" properties
        onUndo={handleUndoRemove}
      />
    )}
  </div>
</div>


          {/* </div> */}
        </div>
      </div>
    </div>
  );
};


const PropertyList = ({ properties, onRemove, onUndo, setProperties , setRemovedProperties , removedProperties}) => {

  
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
            setProperties={setProperties}
            setRemovedProperties={setRemovedProperties}
            removedProperties={removedProperties}
          />
        </div>
      ))}
    </div>
  );
};


const PropertyCard = ({ property, onRemove, onUndo, setProperties }) => {

  const [showFullNumber, setShowFullNumber] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

 
  const handleUploadPhoto = async (ppcId, requesterPhoneNumber, file) => {
    try {
      const formData = new FormData();
      formData.append("photo", file);
  
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/photos/send/${ppcId}/${requesterPhoneNumber}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      if (response.status === 200) {
        setMessage("Photo uploaded successfully.");
  
      
        setProperties((prevProperties) =>
          prevProperties.map((prop) =>
            prop.ppcId === ppcId && prop.requesterPhoneNumber === requesterPhoneNumber
              ? { 
                  ...prop, 
                  status: "photo send",  // ✅ Ensure status is updated
                  photos: [...(prop.photos || []), response.data.request.photoPath] 
                }
              : prop
          )
        );
  
      }
    } catch (error) {
      setMessage("Error uploading photo.");
    }
  };


  const handleAcceptPhotoRequest = (ppcId, requesterPhoneNumber) => {
    // Your logic to handle accepting the photo request
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        handleUploadPhoto(ppcId, requesterPhoneNumber, file); // Ensure you have handleUploadPhoto defined
      }
    };
    fileInput.click();
  };

  const handleRejectPhotoRequest = async (ppcId, requesterPhoneNumber) => {
    // Your logic to handle rejecting the photo request
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/photo-requests/reject/${ppcId}`,
        { requesterPhoneNumber } // Send requesterPhoneNumber in the request body
      );

      if (response.status === 200) {
        setMessage("Photo request rejected.");

        setProperties((prevProperties) =>
          prevProperties.map((prop) =>
            prop.ppcId === ppcId && prop.requesterPhoneNumber === requesterPhoneNumber
              ? { ...prop, status: "photo request rejected" }
              : prop
          )
        );
      }
    } catch (error) {
      setMessage("Error rejecting photo request.");
    }
  };

  return (
    <>

<div
      key={property.ppcId}
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
          <div className='text-center rounded-1 w-100 mb-1' style={{border:"2px solid #30747F", color:"#30747F", fontSize:"14px"}}>PHOTO REQUEST</div>
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

        {/* <div className="mb-0">
          <p className="mb-0">
            <FaCalendarAlt size={16} className="me-2" color="#30747F" />
            {property.totalArea || "N/A"}
          </p>
        </div> */}

        <div className="d-flex align-items-center mb-2">

          <div               onClick={() => handleAcceptPhotoRequest(property.ppcId, property.requesterPhoneNumber)}

          className='d-flex col-4 flex-column justify-content-between align-items-center p-3 rounded-3' style={{border:"2px solid #30747F", color:"#30747F", cursor:"pointer"}}>
         <span className='rounded-circle p-1 d-flex justify-content-center align-items-center' style={{background:"#30747F",height:'30px', width:"30px"}}><TbCameraPlus color='white'/></span> 
<p className='m-0'style={{ fontSize: "14px" }}>Add Property</p>
<p className='m-0'style={{ fontSize: "14px" }}>Image</p>
          </div>
        <div className="d-flex  flex-column align-items-start justify-content-between ps-3">

          <div className="d-flex align-items-center mb-4">
            <FaCalendarAlt color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
            <div>
              <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
                Photo Requested Date
              </h6>
              <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500"}}>
              {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
          <div className="d-flex align-items-center mb-1">
            <MdCall color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
            <div>
              <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
                 Buyer Phone
              </h6>
              {/* <span className="card-text" style={{  fontWeight:"500"}}>
              <a href={`tel:${property.requesterPhoneNumber}`} style={{ textDecoration: "none", color: "#1D1D1D" }}>
    {showFullNumber
      ? property.requesterPhoneNumber
      : property.requesterPhoneNumber?.slice(0, 5) + "*****"}
  </a>
              </span> */}

<span className="card-text" style={{ fontWeight: "500" }}>
  <a
    href={`tel:${property.requesterPhoneNumber}`}
    style={{ textDecoration: "none", color: "#1D1D1D" }}
    onClick={async (e) => {
      e.preventDefault();  // Prevent the default behavior of the link
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/contact`, {
          ppcId: property.ppcId,
          phoneNumber: property.requesterPhoneNumber,
        });
        setMessage({ text: "Contact saved successfully", type: "success" });
      } catch (error) {
        setMessage({ text: "Something went wrong", type: "error" });
      } finally {
        window.location.href = `tel:${property.requesterPhoneNumber}`; // Open dialer after logging
      }
    }}
  >
    {showFullNumber
      ? property.requesterPhoneNumber
      : property.requesterPhoneNumber?.slice(0, 5) + "*****"}
  </a>
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
          {property.status !== "photo request rejected" && (
            <button
              className="btn text-white px-3 py-1 flex-grow-1 mx-1"
              onClick={() => handleRejectPhotoRequest(property.ppcId, property.requesterPhoneNumber)}
              style={{ background:  "#FF0000", width: "80px", fontSize: "11px" }}

           >
              Reject
            </button>
          )}
     {/* <button
              className="btn text-white px-3 py-1 flex-grow-1 mx-1"
              style={{ background:  "#2F747F", width: "80px", fontSize: "13px" }}
              onClick={() => (window.location.href = `tel:${ property.requesterPhoneNumber}`)}

           >
              Call
            </button>    */}

<button
  className="btn text-white px-3 py-1 flex-grow-1 mx-1"
  style={{ background: "#2F747F", width: "80px", fontSize: "13px" }}
  onClick={async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/contact`, {
        ppcId: property.ppcId,
        phoneNumber: property.requesterPhoneNumber,
      });
      setMessage({ text: "Contact saved successfully", type: "success" });
    } catch (error) {
      setMessage({ text: "Something went wrong", type: "error" });
    } finally {
      window.location.href = `tel:${property.requesterPhoneNumber}`; // Open dialer after logging
    }
  }}
>
  Call
</button>
                 {onRemove && (
        <button
        className="btn text-white px-3 py-1 flex-grow-1 mx-1"
        style={{ background: "#FF0000", color: "white", cursor: "pointer",  fontSize: "13px"}}
          onClick={() => onRemove(property.ppcId, property.requesterPhoneNumber)}
        >
          Remove
        </button>
      )}
      {onUndo && (
        <button
        className="btn text-white px-3 py-1 flex-grow-1 mx-1"
          style={{ background: "green", color: "white", cursor: "pointer" ,  fontSize: "13px"}}
          onClick={() => onUndo(property.ppcId, property.requesterPhoneNumber)}
        >
          Undo
        </button>
      )}
      </div>
      : ''}
       
      {/* <p>{property.status || "N/A"}</p> */}
      </div>
    </div>
    </>
  );
};


export default App;

































































































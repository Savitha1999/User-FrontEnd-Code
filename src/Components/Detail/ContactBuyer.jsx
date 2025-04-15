

















































// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { MdCall } from 'react-icons/md';
// import profil from '../../Assets/xd_profile.png'
// import {  FaCalendarAlt } from "react-icons/fa";
// import { Button, Modal } from "react-bootstrap";
// import { FaArrowLeft } from "react-icons/fa";

// const ContactBuyer = () => {
//   const { phoneNumber } = useParams();
//   const [properties, setProperties] = useState([]);
//   const [removedContacts, setRemovedContacts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [activeTab, setActiveTab] = useState("all"); // "all" | "removed"
//   const [showFullNumber, setShowFullNumber] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupAction, setPopupAction] = useState(null);
//   const [popupMessage, setPopupMessage] = useState("");
//   const navigate = useNavigate();

//   const handlePageNavigation = () => {
//     navigate('/mobileviews'); // Redirect to the desired path
//   };
//   const confirmAction = (message, action) => {
//     setPopupMessage(message);
//     setPopupAction(() => action);
//     setShowPopup(true);
//   };
//   useEffect(() => {
//     const storedProperties = JSON.parse(localStorage.getItem("contactProperties")) || [];
//     const storedRemovedContacts = JSON.parse(localStorage.getItem("removedContactProperties")) || [];

//     setProperties(storedProperties);
//     setRemovedContacts(storedRemovedContacts);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("contactProperties", JSON.stringify(properties));
//   }, [properties]);

//   useEffect(() => {
//     localStorage.setItem("removedContactProperties", JSON.stringify(removedContacts));
//   }, [removedContacts]);

//   useEffect(() => {
//     if (!phoneNumber) {
//       setLoading(false);
//       return;
//     }

//     const fetchContactRequests = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-contact-buyer`, {
//           params: { postedPhoneNumber: phoneNumber },
//         });

//         if (response.status === 200) {
//           const transformedProperties = response.data.contactRequestsData.map((property) => ({
//             ...property,
//             contactRequesters: property.contactRequestersPhoneNumbers.filter(
//               (user) => user && user !== "undefined"
//             ),
//           }));

//           setProperties(transformedProperties);
//           localStorage.setItem("contactProperties", JSON.stringify(transformedProperties));
//         }
//       } catch (error) {
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContactRequests();
//   }, [phoneNumber]);

//   const handleRemoveContact = async (ppcId, contactUser) => {
//     // if (!window.confirm("Are you sure you want to remove this contact request?")) return;
//     confirmAction("Are you sure you want to remove this contact request?", async () => {

//     try {
//       await axios.put(`${process.env.REACT_APP_API_URL}/contact/delete/${ppcId}/${contactUser}`);

//       const updatedProperties = properties.map((property) =>
//         property.ppcId === ppcId
//           ? {
//               ...property,
//               contactRequesters: property.contactRequesters.filter((user) => user !== contactUser),
//             }
//           : property
//       );

//       const removedItem = {
//         ppcId,
//         contactUser,
//       };

//       setProperties(updatedProperties);
//       setRemovedContacts([...removedContacts, removedItem]);
//     } catch (error) {
//       setMessage({ text: "Error deleting contact request.", type: "error" });
//     }
//     setShowPopup(false);
//   });
//   };

//   const handleUndoRemove = async (ppcId, contactUser) => {
//     if (!window.confirm("Do you want to restore this contact request?")) return;
//     confirmAction("Do you want to restore this contact request?", async () => {

//     try {
//       const response = await axios.put(`${process.env.REACT_APP_API_URL}/contact/undo/${ppcId}/${contactUser}`);

//       const restoredProperty = response.data.property;

//       setRemovedContacts(removedContacts.filter((item) => item.contactUser !== contactUser));

//       setProperties((prev) =>
//         prev.map((property) =>
//           property.ppcId === ppcId
//             ? { ...property, contactRequesters: restoredProperty.contactRequests.map(req => req.phoneNumber) }
//             : property
//         )
//       );

//       setMessage({ text: "Contact request restored successfully!", type: "success" });
//     } catch (error) {
//       setMessage({ text: error.response?.data?.message || "Error restoring contact request.", type: "error" });
//     }
//     setShowPopup(false);
//   });
//   };
// useEffect(() => {
//   if (message) {
//     const timer = setTimeout(() => setMessage(""), 5000); // Auto-close after 3 seconds
//     return () => clearTimeout(timer); // Cleanup timer
//   }
// }, [message]);



// const handleContact = (ppcId, userPhone) => {
//   confirmAction("Do you want to call this user?", async () => {
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/contact`, {
//         ppcId,
//         phoneNumber: userPhone,
//       });

//       if (response.data.success) {
//         setMessage({ text: "Contact saved successfully", type: "success" });
//         window.location.href = `tel:${userPhone}`;
//       } else {
//         setMessage({ text: "Contact failed", type: "error" });
//       }
//     } catch (error) {
//       console.error("Contact API error:", error);
//       setMessage({ text: "An error occurred", type: "error" });
//     }
//     setShowPopup(false);
//   });
// };



//   return (
//     <div className="container d-flex align-items-center justify-content-center p-0">
//           <div className="d-flex flex-column align-items-center justify-content-center m-0" style={{ maxWidth: '500px', margin: 'auto', width: '100%', background:"#F7F7F7" ,fontFamily: 'Inter, sans-serif'}}>

//       <div className="row g-2 w-100">
// <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
//   <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
// </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>CONTACT BUYER </h3> </div>
//       <div className="col-6 p-0">

//         <button style={{ backgroundColor: '#30747F', color: 'white' , width:"100%" }} onClick={() => setActiveTab("all")} className={activeTab === "all" ? "active" : ""}>
//           All Contacts
//         </button>
//         </div>

//         <div className="col-6 p-0">

//         <button style={{ backgroundColor: '#FFFFFF', color: 'grey' , width:"100%" }} onClick={() => setActiveTab("removed")} className={activeTab === "removed" ? "active" : ""}>
//           Removed Requests
//         </button>
//         </div>
//   <div>
//       {message && <p style={{ color: message.type === "success" ? "green" : "red" }}>{message.text}</p>}
//       <Modal show={showPopup} onHide={() => setShowPopup(false)}>
//         <Modal.Body>
//           <p>{popupMessage}</p>
//           <Button style={{ background:  "#2F747F", width: "80px", fontSize: "13px", border:"none" }} onClick={popupAction}>Yes</Button>
//           <Button className="ms-3" style={{ background:  "#FF0000", width: "80px", fontSize: "13px" , border:"none"}} onClick={() => setShowPopup(false)}>No</Button>
//         </Modal.Body>
//       </Modal>
//     </div>


//   {loading ? (
//   <p>Loading...</p>
// ) : activeTab === "all" ? (
//   properties.some(property => 
//     Array.isArray(property.contactRequestersPhoneNumbers) && property.contactRequestersPhoneNumbers.length > 0
//   ) ? (
//     properties.filter(property => 
//       Array.isArray(property.contactRequestersPhoneNumbers) && property.contactRequestersPhoneNumbers.length > 0
//     ).map((property) => (
//       <div key={property.ppcId} className="property-card">
//         <div className="buyers-list">
//           {property.contactRequestersPhoneNumbers.map((user, index) => (
//             <div
//               key={index}
//               className="card p-2 w-100 w-md-50 w-lg-33"
//               style={{
//                 border: "1px solid #ddd",
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 marginBottom: "15px",
//                 fontFamily: "Inter, sans-serif",
//               }}
//             >
//               <div className="row d-flex align-items-center">
//                 <div className="col-3 d-flex align-items-center justify-content-center mb-1">
//                   <img
//                     src={profil}
//                     alt="Placeholder"
//                     className="rounded-circle mt-2"
//                     style={{ width: "80px", height: "80px", objectFit: "cover" }}
//                   />
//                 </div>
//                 <div className='p-0' style={{background:"#707070", width:"2px", height:"80px"}}></div>
//                 <div className="col-7 p-0 ms-4">
//                   <div className='text-center rounded-1 w-100 mb-1' style={{border:"2px solid #30747F", color:"#30747F", fontSize:"13px"}}>BUYER CONTACTED</div>
//                   <p className="mb-1" style={{ color: "#474747", fontWeight: "500", fontSize:"12px" }}>
//                     PUC- {property.ppcId}
//                   </p>    
//                   <h5 className="mb-1" style={{ color: "#474747", fontWeight: "500", fontSize:"16px" }}>
//                     {property.propertyType || "N/A"} | {property.city || "N/A"}
//                   </h5>
//                 </div>
//               </div>
//               <div className="p-1">
//                 <div className="d-flex align-items-center mb-2">
//                   <div className="d-flex flex-row align-items-start justify-content-between ps-3">
//                     <div className="d-flex align-items-center">
//                       <MdCall color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
//                       <div>
//                         <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>Buyer Phone</h6>
//                         {/* <span className="card-text" style={{ fontWeight:"500"}}>
//                           <a href={`tel:${user}`} style={{ textDecoration: "none", color: "#1D1D1D" }}>
//                             {showFullNumber[index] ? user : user?.slice(0, 5) + "*****"}
//                           </a>
//                         </span> */}

// <span
//   style={{ textDecoration: "none", color: "#1D1D1D", cursor: "pointer" }}
//   onClick={async () => {
//     if (!showFullNumber[index]) return;
//     await handleContact(property.ppcId, user);
//     window.location.href = `tel:${user}`;
//   }}
// >
//   {showFullNumber[index] ? user : user?.slice(0, 5) + "*****"}
// </span>


//                       </div>
//                     </div>
//                     <div className="d-flex align-items-center ms-3">
//                       <FaCalendarAlt color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
//                       <div>
//                         <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>BUYER CONTACTED DATE</h6>
//                         <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500"}}>
//                           {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'N/A'}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {!showFullNumber[index] && (
//                   <button className='w-100 m-0 p-1'
//                     onClick={() => setShowFullNumber(prev => ({ ...prev, [index]: true }))}
//                     style={{ background: "#2F747F", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}>
//                     View
//                   </button>
//                 )}
//                 {showFullNumber[index] && (
//                   <div className="d-flex justify-content-between align-items-center ps-2 pe-2 mt-1">
//                     {/* <button className="btn text-white px-3 py-1 flex-grow-1 mx-1"
//                       style={{ background:  "#2F747F", width: "80px", fontSize: "13px" }}
//                       onClick={() => window.location.href = `tel:${user}`}
//                     >
//                       Call
//                     </button>    */}

// <button
//   className="btn text-white px-3 py-1 flex-grow-1 mx-1"
//   style={{ background: "#2F747F", width: "80px", fontSize: "13px" }}
//   onClick={async () => {
//     await handleContact(property.ppcId, user);
//     window.location.href = `tel:${user}`;
//   }}
// >
//   Call
// </button>

//                     <button className="btn text-white px-3 py-1 flex-grow-1 mx-1"
//                       style={{ background:  "#FF0000", width: "80px", fontSize: "13px" }}
//                       onClick={() => handleRemoveContact(property.ppcId, user)}>
//                       Remove
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div> 
//       </div>
//     ))
//   ) : (
//     <p>No properties found.</p>
//   )
// ) : (
//   removedContacts.length > 0 ? (
//     removedContacts.map((property, index) => (
//       <div
//         key={property.ppcId}
//         className="card p-2 w-100 w-md-50 w-lg-33"
//         style={{
//           border: "1px solid #ddd",
//           borderRadius: "10px",
//           overflow: "hidden",
//           marginBottom: "15px",
//           fontFamily: "Inter, sans-serif",
//         }}
//       >
//         <div className="row d-flex align-items-center">
//           <div className="col-3 d-flex align-items-center justify-content-center mb-1">
//             <img
//               src={profil}
//               alt="Placeholder"
//               className="rounded-circle mt-2"
//               style={{ width: "80px", height: "80px", objectFit: "cover" }}
//             />
//           </div>
//           <div
//             className='p-0'
//             style={{ background: "#707070", width: "2px", height: "80px" }}
//           ></div>
//           <div className="col-7 p-0 ms-4">
//             <div className='text-center rounded-1 w-100 mb-1'
//               style={{ border: "2px solid #30747F", color: "#30747F", fontSize: "14px" }}
//             >BUYER CONTACTED</div>
//             <p className="mb-1" style={{ color: "#474747", fontWeight: "500", fontSize: "12px" }}>
//               PUC- {property.ppcId}
//             </p>
//             <h5 className="mb-1" style={{ color: "#474747", fontWeight: "500", fontSize: "16px" }}>
//               {property.propertyType || "N/A"} | {property.city || "N/A"}
//             </h5>
//           </div>
//         </div>

//         <div className="p-1 mt-1">
//           <div className="d-flex align-items-center mb-2">
//             <div className="d-flex flex-row align-items-start justify-content-between ps-3">
//               <div className="d-flex align-items-center">
//                 <MdCall color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
//                 <div>
//                   <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>Buyer Phone</h6>
//                   <span className="card-text" style={{ fontWeight: "500" }}>
//                     <a href={`tel:${property.contactUser}`} style={{ textDecoration: "none", color: "#1D1D1D" }}>
//                       {showFullNumber ? property.contactUser : property.contactUser?.slice(0, 5) + "*****"}
//                     </a>
//                   </span>
//                 </div>
//               </div>
//               <div className="d-flex align-items-center ms-3">
//                 <FaCalendarAlt color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
//                 <div>
//                   <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>CONTACTED Received Date</h6>
//                   <span className="card-text" style={{ color: "#1D1D1D", fontWeight: "500" }}>
//                     {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'N/A'}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {!showFullNumber && (
//             <button
//               className='w-100 m-0 p-1'
//               onClick={() => setShowFullNumber(true)}
//               style={{
//                 background: "#2F747F", 
//                 color: "white", 
//                 border: "none", 
//                 cursor: "pointer",
//                 borderRadius: "5px"
//               }}
//             >View</button>
//           )}
//           {showFullNumber && (
//             <div className="d-flex justify-content-between align-items-center ps-2 pe-2 mt-1">
             
//               <button
//                 className="btn text-white px-3 py-1 flex-grow-1 mx-1"
//                 style={{ background: "green", width: "80px", fontSize: "13px" }}
//                 onClick={() => handleUndoRemove(property.ppcId, property.contactUser)}
//               >Undo</button>
//             </div>
//           )}
//         </div>
//       </div>
//     ))
//   ) : (
//     <p>No removed requests.</p>
//   )
// )
// }
//          </div>

// </div>
//     </div>
//   );
// };

// export default ContactBuyer;


























































import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { MdCall } from 'react-icons/md';
import profil from '../../Assets/xd_profile.png'
import {  FaCalendarAlt } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

const ContactBuyer = () => {
  const { phoneNumber } = useParams();
  const [properties, setProperties] = useState([]);
  const [removedContacts, setRemovedContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [activeTab, setActiveTab] = useState("all"); // "all" | "removed"
  const [showFullNumber, setShowFullNumber] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupAction, setPopupAction] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  const handlePageNavigation = () => {
    navigate('/mobileviews'); // Redirect to the desired path
  };
  const confirmAction = (message, action) => {
    setPopupMessage(message);
    setPopupAction(() => action);
    setShowPopup(true);
  };
  useEffect(() => {
    const storedProperties = JSON.parse(localStorage.getItem("contactProperties")) || [];
    const storedRemovedContacts = JSON.parse(localStorage.getItem("removedContactProperties")) || [];

    setProperties(storedProperties);
    setRemovedContacts(storedRemovedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem("contactProperties", JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem("removedContactProperties", JSON.stringify(removedContacts));
  }, [removedContacts]);

  useEffect(() => {
    if (!phoneNumber) {
      setLoading(false);
      return;
    }

    const fetchContactRequests = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-contact-buyer`, {
          params: { postedPhoneNumber: phoneNumber },
        });

        if (response.status === 200) {
          const transformedProperties = response.data.contactRequestsData.map((property) => ({
            ...property,
            contactRequesters: property.contactRequestersPhoneNumbers.filter(
              (user) => user && user !== "undefined"
            ),
          }));

          setProperties(transformedProperties);
          localStorage.setItem("contactProperties", JSON.stringify(transformedProperties));
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchContactRequests();
  }, [phoneNumber]);

  const handleRemoveContact = async (ppcId, contactUser) => {
    // if (!window.confirm("Are you sure you want to remove this contact request?")) return;
    confirmAction("Are you sure you want to remove this contact request?", async () => {

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/contact/delete/${ppcId}/${contactUser}`);

      const updatedProperties = properties.map((property) =>
        property.ppcId === ppcId
          ? {
              ...property,
              contactRequesters: property.contactRequesters.filter((user) => user !== contactUser),
            }
          : property
      );

      const removedItem = {
        ppcId,
        contactUser,
      };

      setProperties(updatedProperties);
      setRemovedContacts([...removedContacts, removedItem]);
    } catch (error) {
      setMessage({ text: "Error deleting contact request.", type: "error" });
    }
    setShowPopup(false);
  });
  };

  const handleUndoRemove = async (ppcId, contactUser) => {
    if (!window.confirm("Do you want to restore this contact request?")) return;
    confirmAction("Do you want to restore this contact request?", async () => {

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/contact/undo/${ppcId}/${contactUser}`);

      const restoredProperty = response.data.property;

      setRemovedContacts(removedContacts.filter((item) => item.contactUser !== contactUser));

      setProperties((prev) =>
        prev.map((property) =>
          property.ppcId === ppcId
            ? { ...property, contactRequesters: restoredProperty.contactRequests.map(req => req.phoneNumber) }
            : property
        )
      );

      setMessage({ text: "Contact request restored successfully!", type: "success" });
    } catch (error) {
      setMessage({ text: error.response?.data?.message || "Error restoring contact request.", type: "error" });
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



const handleContact = (ppcId, userPhone) => {
  confirmAction("Do you want to call this user?", async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/contact`, {
        ppcId,
        phoneNumber: userPhone,
      });

      if (response.data.success) {
        setMessage({ text: "Contact saved successfully", type: "success" });
        window.location.href = `tel:${userPhone}`;
      } else {
        setMessage({ text: "Contact failed", type: "error" });
      }
    } catch (error) {
      console.error("Contact API error:", error);
      setMessage({ text: "An error occurred", type: "error" });
    }
    setShowPopup(false);
  });
};



  return (
    <div className="container d-flex align-items-center justify-content-center p-0">
          <div className="d-flex flex-column align-items-center justify-content-center m-0" style={{ maxWidth: '500px', margin: 'auto', width: '100%', background:"#F7F7F7" ,fontFamily: 'Inter, sans-serif'}}>

      <div className="row g-2 w-100">
<div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
  <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
</button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>CONTACT BUYER </h3> </div>
      <div className="col-6 p-0">

        <button style={{ backgroundColor: '#30747F', color: 'white' , width:"100%" }} onClick={() => setActiveTab("all")} className={activeTab === "all" ? "active" : ""}>
          All Contacts
        </button>
        </div>

        <div className="col-6 p-0">

        <button style={{ backgroundColor: '#FFFFFF', color: 'grey' , width:"100%" }} onClick={() => setActiveTab("removed")} className={activeTab === "removed" ? "active" : ""}>
          Removed Requests
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
  properties.some(property => 
    Array.isArray(property.contactRequestersPhoneNumbers) && property.contactRequestersPhoneNumbers.length > 0
  ) ? (
    properties.filter(property => 
      Array.isArray(property.contactRequestersPhoneNumbers) && property.contactRequestersPhoneNumbers.length > 0
    ).map((property) => (
      <div key={property.ppcId} className="property-card">
        <div className="buyers-list">
          {property.contactRequestersPhoneNumbers.map((user, index) => (
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
                  <div className='text-center rounded-1 w-100 mb-1' style={{border:"2px solid #30747F", color:"#30747F", fontSize:"13px"}}>BUYER CONTACTED</div>
                  <p className="mb-1" style={{ color: "#474747", fontWeight: "500", fontSize:"12px" }}>
                    PUC- {property.ppcId}
                  </p>    
                  <h5 className="mb-1" style={{ color: "#474747", fontWeight: "500", fontSize:"16px" }}>
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
                        <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>Buyer Phone</h6>
                        {/* <span className="card-text" style={{ fontWeight:"500"}}>
                          <a href={`tel:${user}`} style={{ textDecoration: "none", color: "#1D1D1D" }}>
                            {showFullNumber[index] ? user : user?.slice(0, 5) + "*****"}
                          </a>
                        </span> */}

<span
  style={{ textDecoration: "none", color: "#1D1D1D", cursor: "pointer" }}
  onClick={async () => {
    if (!showFullNumber[index]) return;
    await handleContact(property.ppcId, user);
    window.location.href = `tel:${user}`;
  }}
>
  {showFullNumber[index] ? user : user?.slice(0, 5) + "*****"}
</span>


                      </div>
                    </div>
                    <div className="d-flex align-items-center ms-3">
                      <FaCalendarAlt color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                      <div>
                        <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>BUYER CONTACTED DATE</h6>
                        <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500"}}>
                          {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {!showFullNumber[index] && (
                  <button className='w-100 m-0 p-1'
                    onClick={() => setShowFullNumber(prev => ({ ...prev, [index]: true }))}
                    style={{ background: "#2F747F", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}>
                    View
                  </button>
                )}
                {showFullNumber[index] && (
                  <div className="d-flex justify-content-between align-items-center ps-2 pe-2 mt-1">
                    {/* <button className="btn text-white px-3 py-1 flex-grow-1 mx-1"
                      style={{ background:  "#2F747F", width: "80px", fontSize: "13px" }}
                      onClick={() => window.location.href = `tel:${user}`}
                    >
                      Call
                    </button>    */}

<button
  className="btn text-white px-3 py-1 flex-grow-1 mx-1"
  style={{ background: "#2F747F", width: "80px", fontSize: "13px" }}
  onClick={async () => {
    await handleContact(property.ppcId, user);
    window.location.href = `tel:${user}`;
  }}
>
  Call
</button>

                    <button className="btn text-white px-3 py-1 flex-grow-1 mx-1"
                      style={{ background:  "#FF0000", width: "80px", fontSize: "13px" }}
                      onClick={() => handleRemoveContact(property.ppcId, user)}>
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div> 
      </div>
    ))
  ) : (
    <p>No properties found.</p>
  )
) : (
  removedContacts.length > 0 ? (
    removedContacts.map((property, index) => (
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
          <div
            className='p-0'
            style={{ background: "#707070", width: "2px", height: "80px" }}
          ></div>
          <div className="col-7 p-0 ms-4">
            <div className='text-center rounded-1 w-100 mb-1'
              style={{ border: "2px solid #30747F", color: "#30747F", fontSize: "14px" }}
            >BUYER CONTACTED</div>
            <p className="mb-1" style={{ color: "#474747", fontWeight: "500", fontSize: "12px" }}>
              PUC- {property.ppcId}
            </p>
            <h5 className="mb-1" style={{ color: "#474747", fontWeight: "500", fontSize: "16px" }}>
              {property.propertyType || "N/A"} | {property.city || "N/A"}
            </h5>
          </div>
        </div>

        <div className="p-1 mt-1">
          <div className="d-flex align-items-center mb-2">
            <div className="d-flex flex-row align-items-start justify-content-between ps-3">
              <div className="d-flex align-items-center">
                <MdCall color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                <div>
                  <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>Buyer Phone</h6>
                  <span className="card-text" style={{ fontWeight: "500" }}>
                    <a href={`tel:${property.contactUser}`} style={{ textDecoration: "none", color: "#1D1D1D" }}>
                      {showFullNumber ? property.contactUser : property.contactUser?.slice(0, 5) + "*****"}
                    </a>
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center ms-3">
                <FaCalendarAlt color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                <div>
                  <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>CONTACTED Received Date</h6>
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
                cursor: "pointer",
                borderRadius: "5px"
              }}
            >View</button>
          )}
          {showFullNumber && (
            <div className="d-flex justify-content-between align-items-center ps-2 pe-2 mt-1">
              <button
                className="btn text-white px-3 py-1 flex-grow-1 mx-1"
                style={{ background: "#2F747F", width: "80px", fontSize: "13px" }}
                onClick={() => (window.location.href = `tel:${property.contactUser}`)}
              >Call</button>
              <button
                className="btn text-white px-3 py-1 flex-grow-1 mx-1"
                style={{ background: "green", width: "80px", fontSize: "13px" }}
                onClick={() => handleUndoRemove(property.ppcId, property.contactUser)}
              >Undo</button>
            </div>
          )}
        </div>
      </div>
    ))
  ) : (
    <p>No removed requests.</p>
  )
)
}
         </div>

</div>
    </div>
  );
};

export default ContactBuyer;

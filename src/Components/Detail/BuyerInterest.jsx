










































// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { MdCall } from 'react-icons/md';
// import profil from '../../Assets/xd_profile.png'
// import {  FaCalendarAlt } from "react-icons/fa";
// import { Button, Modal } from "react-bootstrap";
// import { FaArrowLeft } from "react-icons/fa";


// const App = () => {
//   const { phoneNumber } = useParams();
//   const [properties, setProperties] = useState([]);
//   const [removedProperties, setRemovedProperties] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [activeTab, setActiveTab] = useState("all"); // "all" | "removed"
//   const [showFullNumber, setShowFullNumber] = useState(false);
//    const [showPopup, setShowPopup] = useState(false);
//    const [popupAction, setPopupAction] = useState(null);
//    const [popupMessage, setPopupMessage] = useState("");
//   // Load properties from localStorage on page load

//   const [interestBuyersCount, setInterestBuyersCount] = useState(0);
//   const [callList, setCallList] = useState([]);

//   const [hover, setHover] = useState(false);
//     const [hoverDelete, setHoverDelete] = useState(false);
//     const [hoverEdit, setHoverEdit] = useState(false);
  
//   useEffect(() => {
//     if (!phoneNumber) {
//       setLoading(false);
//       return;
//     }

//     const fetchInterestBuyersCount = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_URL}/interest-buyers-count/${phoneNumber}`
//         );

//         if (response.status === 200) {
//           setInterestBuyersCount(response.data.interestBuyersCount);
//         }
//       } catch (error) {
//         console.error("Error fetching interest buyers count:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInterestBuyersCount();
//   }, [phoneNumber]);



  
// useEffect(() => {
//   if (message) {
//     const timer = setTimeout(() => setMessage(""), 5000); // Auto-close after 3 seconds
//     return () => clearTimeout(timer); // Cleanup timer
//   }
// }, [message]);

//   useEffect(() => {
//     const storedProperties = JSON.parse(localStorage.getItem("interestProperties")) || [];
//     const storedRemovedProperties = JSON.parse(localStorage.getItem("removedProperties")) || [];

//     setProperties(storedProperties);
//     setRemovedProperties(storedRemovedProperties);
//   }, []);
//   const confirmAction = (message, action) => {
//     setPopupMessage(message);
//     setPopupAction(() => action);
//     setShowPopup(true);
//   };
//   // Sync properties with localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem("interestProperties", JSON.stringify(properties));
//   }, [properties]);

//   useEffect(() => {
//     localStorage.setItem("removedProperties", JSON.stringify(removedProperties));
//   }, [removedProperties]);

//   // Fetch interested properties from API
//   useEffect(() => {
//     if (!phoneNumber) {
//       setLoading(false);
//       return;
//     }

//     const fetchInterestedProperties = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-interest-buyers`, {
//           params: { postedPhoneNumber: phoneNumber },
//         });

//         if (response.status === 200) {
//           const transformedProperties = response.data.propertiesData.map((property) => ({
//             ...property,
//             interestedUsers: property.interestedUsers.filter(
//               (user) => user && user !== "undefined"
//             ),
//           }));

//           setProperties(transformedProperties);
//           localStorage.setItem("interestProperties", JSON.stringify(transformedProperties)); // Save to localStorage
//         }
//       } catch (error) {
//         // console.error("Error fetching properties:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInterestedProperties();
//   }, [phoneNumber]);

//   // ✅ Remove Interest & Move to Removed List
//   const handleRemoveProperty = async (ppcId, interestedUser) => {
//     // if (!window.confirm("Are you sure you want to remove this interest?")) return;
//     confirmAction("Are you sure you want to remove this interest?", async () => {

//     try {
//       await axios.put(`${process.env.REACT_APP_API_URL}/interest/delete/${ppcId}/${interestedUser}`);

//       const updatedProperties = properties.map((property) =>
//         property.ppcId === ppcId
//           ? {
//               ...property,
//               interestedUsers: property.interestedUsers.filter((user) => user !== interestedUser),
//             }
//           : property
//       );

//       const removedItem = {
//         ppcId,
//         interestedUser,
//       };

//       setProperties(updatedProperties);
//       setMessage({ text: "Interest Deleted successfully!", type: "success" });

//       setRemovedProperties([...removedProperties, removedItem]);
//     } catch (error) {
//       setMessage({ text: "Error deleting interest.", type: "error" });
//     }
//     setShowPopup(false);

//   });
//   };


//   const handleUndoRemove = async (ppcId, interestedUser) => {
//     // if (!window.confirm("Do you want to restore this interest?")) return;
//     confirmAction("Do you want to restore this interest?", async () => {

//     try {
//       const response = await axios.put(`${process.env.REACT_APP_API_URL}/interest/undo/${ppcId}/${interestedUser}`);

//       const restoredProperty = response.data.property;

//       setRemovedProperties(removedProperties.filter((item) => item.interestedUser !== interestedUser));

//       setProperties((prev) =>
//         prev.map((property) =>
//           property.ppcId === ppcId
//             ? { ...property, interestedUsers: restoredProperty.interestRequests.map(req => req.phoneNumber) }
//             : property
//         )
//       );

//       setMessage({ text: "Interest restored successfully!", type: "success" });

//     } catch (error) {
//       setMessage({ text: error.response?.data?.message || "Error restoring interest.", type: "error" });
//     }
//     setShowPopup(false);

//   });
// };


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

// const navigate = useNavigate();

// const handlePageNavigation = () => {
//   navigate('/mobileviews'); // Redirect to the desired path
// };


//   return (
//     <div className="container d-flex align-items-center justify-content-center p-0" style={{fontFamily:"Inter, sans-serif",}}>
     
//      <div className="d-flex flex-column align-items-center justify-content-center m-0" style={{ maxWidth: '500px', margin: 'auto', width: '100%', background:"#F7F7F7" }}>
// <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
//   <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
// </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>BUYER INTEREST</h3> </div>

//       {/* Tabs */}
//       <div className="row g-2 w-100">
//       <div className="col-6 p-0">

//         <button style={{ backgroundColor: '#30747F', color: 'white' , width:"100%" }} onClick={() => setActiveTab("all")} className={activeTab === "all" ? "active" : ""}>
//           All Properties
//         </button>
//         </div>

//         <div className="col-6 p-0">

//         <button style={{ backgroundColor: '#FFFFFF', color: 'grey' , width:"100%"  }} onClick={() => setActiveTab("removed")} className={activeTab === "removed" ? "active" : ""}>
//           Removed Properties
//         </button>
//         </div>

      

//       {/* Display Messages */}
//       <div>
//       {message && <p style={{ color: message.type === "success" ? "green" : "red" }}>{message.text}</p>}
//       <Modal show={showPopup} onHide={() => setShowPopup(false)}>
//         <Modal.Body>
//           <p>{popupMessage}</p>
//           <Button style={{ background:  "#2F747F", width: "80px", fontSize: "13px", border:"none" }} onClick={popupAction}>Yes</Button>
//           <Button className="ms-3" style={{ background:  "#FF0000", width: "80px", fontSize: "13px" , border:"none"}} onClick={() => setShowPopup(false)}>No</Button>
//         </Modal.Body>
//       </Modal>
//     </div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : activeTab === "all" ? (
//         // Show all properties with interested users
//         properties.length > 0 ? (
//           properties.map((property , index) => (
//             <div key={property.ppcId} className="property-card">
//               <div className="buyers-list">
//                 {Array.isArray(property.interestedUsers) && property.interestedUsers.length > 0 ? (
//                   property.interestedUsers.map((user, index) => (
//                     <div
//             key={index}
//             className="card p-2 w-100 w-md-50 w-lg-33"
//             style={{
//               border: "1px solid #ddd",
//               borderRadius: "10px",
//               overflow: "hidden",
//               marginBottom: "15px",
//               fontFamily: "Inter, sans-serif",
//             }}
//           >
//             <div className="row d-flex align-items-center">
//               <div className="col-3 d-flex align-items-center justify-content-center mb-1">
//                 <img
//                   src={profil}
//                   alt="Placeholder"
//                   className="rounded-circle mt-2"
//                   style={{ width: "80px", height: "80px", objectFit: "cover" }}
//                 />
      
//               </div>
//               <div className='p-0' style={{background:"#707070", width:"2px", height:"80px"}}></div>
//               <div className="col-7 p-0 ms-4">
//                 <div className='text-center rounded-1 w-100 mb-1' style={{border:"2px solid #30747F", color:"#30747F", fontSize:"13px"}}>INTERESTED BUYER</div>
//                 <div className="d-flex">
//                   <p className="mb-1" style={{ color: "#474747", fontWeight: "500",fontSize:"12px" }}>
//                   PUC- {property.ppcId}
//                   </p>
//                 </div>    
      
//                 <h5 className="mb-1" style={{ color: "#474747", fontWeight: "500",fontSize:"16px" }}>
//                   {property.propertyType || "N/A"} |{property.city || "N/A"}
//                 </h5>
             
//               </div>
//             </div>
      
//             <div className="p-1">
      
//               <div className="d-flex align-items-center mb-2">
//               <div className="d-flex  flex-row align-items-start justify-content-between ps-3">
      
               
//                 <div className="d-flex align-items-center ">
//                   <MdCall color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
//                   <div>
//                     <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
//                        Buyer Phone
//                     </h6>
//                     <span className="card-text" style={{  fontWeight:"500"}}>
//                     <a href={`tel:${user}`} style={{ textDecoration: "none", color: "#1D1D1D" }}>
//           {showFullNumber
//             ? user
//             : user?.slice(0, 5) + "*****"}
//         </a>
//                     </span>
//                   </div>
//                 </div>
//                 <div className="d-flex align-items-center ms-3">
//                   <FaCalendarAlt color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
//                   <div>
//                     <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
//                     Interest Received Date
//                     </h6>
//                     <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500"}}>
//                     {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'N/A'}
//                     </span>
//                   </div>
//                 </div>
//                 </div>
//                           </div>
//               {!showFullNumber && (
//           <button className='w-100 m-0 p-1'
//           onClick={() => setShowFullNumber(true)}
//           style={{
//               background: "#2F747F", 
//               color: "white", 
//               border: "none", 
             
//               marginLeft: "10px", 
//               cursor: "pointer",
//               borderRadius: "5px"
//             }}>
//             View
//           </button>
//         )}
//           {showFullNumber
//             ?  <div className="d-flex justify-content-between align-items-center ps-2 pe-2 mt-1">
// <div className="d-flex justify-content-between mt-2">
//                       <button
//                         className="btn btn-sm text-white"
//                         style={{ background: "#2F747F", width: "48%" }}
//                         onClick={() => handleContact(property.ppcId, user)}
//                       >
//                         Call
//                       </button>
//                       </div>


// {/* 
//                   <button className="btn text-white px-3 py-1 flex-grow-1 mx-1"
//                     style={{ background:  "#FF0000", width: "80px", fontSize: "13px" }}
//                     onClick={() => handleRemoveProperty(property.ppcId, user)}
//                     > Remove</button>
//             */}
           
// <button
//         className="btn text-white px-3 py-1 flex-grow-1 mx-1"
//         style={{
//           background: hoverDelete ? 'red' : '#FF4500',
//           color: '#fff',
//           width: "80px", fontSize: "13px",
//           transition: 'all 0.3s ease'
//         }}
//         onMouseEnter={() => setHoverDelete(true)}
//         onMouseLeave={() => setHoverDelete(false)}
//         onClick={() => handleRemoveProperty(property.ppcId, user)}
//         >
//         Remove
//       </button>
           
//             </div>
//             : ''}
           
//             </div>
//           </div>
//                   ))
//                 ) : (
//                   <p></p>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No properties found.</p>
//         )
//       ) : (
//         // Show removed properties with Undo button
//         removedProperties.length > 0 ? (
//           removedProperties.map((property, index) => (
//             <div
//             key={property.ppcId}
//             className="card p-2 w-100 w-md-50 w-lg-33"
//             style={{
//               border: "1px solid #ddd",
//               borderRadius: "10px",
//               overflow: "hidden",
//               marginBottom: "15px",
//               fontFamily: "Inter, sans-serif",
//             }}
//           >
//             <div className="row d-flex align-items-center">
//               <div className="col-3 d-flex align-items-center justify-content-center mb-1">
//                 <img
//                   src={profil}
//                   alt="Placeholder"
//                   className="rounded-circle mt-2"
//                   style={{ width: "80px", height: "80px", objectFit: "cover" }}
//                 />
      
//               </div>
//               <div className='p-0' style={{background:"#707070", width:"2px", height:"80px"}}></div>
//               <div className="col-7 p-0 ms-4">
//                 <div className='text-center rounded-1 w-100 mb-1' style={{border:"2px solid #30747F", color:"#30747F", fontSize:"14px"}}>PHOTO REQUEST</div>
//                 <div className="d-flex">
//                   <p className="mb-1" style={{ color: "#474747", fontWeight: "500",fontSize:"12px" }}>
//                   PUC- {property.ppcId}
//                   </p>
//                 </div>    
      
//                 <h5 className="mb-1" style={{ color: "#474747", fontWeight: "500",fontSize:"16px" }}>
//                   {property.propertyType || "N/A"} |{property.city || "N/A"}
//                 </h5>
             
//               </div>
//             </div>
      
//             <div className="p-1 mt-1">
      
//               <div className="d-flex align-items-center mb-2">
//               <div className="d-flex  flex-row align-items-start justify-content-between ps-3">
      
              
//                 <div className="d-flex align-items-center">
//                   <MdCall color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
//                   <div>
//                     <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
//                        Buyer Phone
//                     </h6>
//                     <span className="card-text" style={{  fontWeight:"500"}}>
//                     <a href={`tel:${property.interestedUser}`} style={{ textDecoration: "none", color: "#1D1D1D" }}>
//           {showFullNumber
//             ? property.interestedUser
//             : property.interestedUser?.slice(0, 5) + "*****"}
//         </a>
//                     </span>
//                   </div>
//                 </div>
//                 <div className="d-flex align-items-center  ms-3">
//                   <FaCalendarAlt color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
//                   <div>
//                     <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
//                       Interest Received Date
//                     </h6>
//                     <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500"}}>
//                     {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'N/A'}
//                     </span>
//                   </div>
//                 </div>
//                 </div>
//                           </div>
//               {!showFullNumber && (
//           <button className='w-100 m-0 p-1'
//             onClick={() => setShowFullNumber(true)}
//             style={{
//               background: "#2F747F", 
//               color: "white", 
//               border: "none", 
             
//               marginLeft: "10px", 
//               cursor: "pointer",
//               borderRadius: "5px"
//             }}>
//             View
//           </button>
//         )}
//           {showFullNumber
//             ?  <div className="d-flex justify-content-between align-items-center ps-2 pe-2 mt-1">
          
                
//                   {/* <button className="btn text-white px-3 py-1 flex-grow-1 mx-1"
//                     style={{ background:  "green", width: "80px", fontSize: "13px" }}
//                    onClick={() => handleUndoRemove(property.ppcId, property.interestedUser)}
//                    > Undo</button> */}


// <button
//       className="btn text-white px-3 py-1 flex-grow-1 mx-1"
//       style={{
//         background: hover ?  'green':'#19575f' , // hover vs default
//         color: hover ? '#e0f7fa' : '#fff',         // text color on hover
//         width: "80px", fontSize: "13px",
//         transition: 'all 0.3s ease'
//       }}
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//       onClick={() => handleUndoRemove(property.ppcId, property.interestedUser)}
//       >
//       Undo
//     </button>

//             </div>
//             : ''}
           
//             </div>
//           </div>
//           ))
//         ) : (
//           <p>No removed properties.</p>
//         )
//       )}
//             </div>

//           </div>

//     </div>
//   );
// };

// export default App;


























































































import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { MdCall } from 'react-icons/md';
import profil from '../../Assets/xd_profile.png'
import {  FaCalendarAlt } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";


const App = () => {
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
  // Load properties from localStorage on page load

  const [interestBuyersCount, setInterestBuyersCount] = useState(0);
  const [callList, setCallList] = useState([]);

  const [hover, setHover] = useState(false);
    const [hoverDelete, setHoverDelete] = useState(false);
    const [hoverEdit, setHoverEdit] = useState(false);
  
  useEffect(() => {
    if (!phoneNumber) {
      setLoading(false);
      return;
    }

    const fetchInterestBuyersCount = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/interest-buyers-count/${phoneNumber}`
        );

        if (response.status === 200) {
          setInterestBuyersCount(response.data.interestBuyersCount);
        }
      } catch (error) {
        console.error("Error fetching interest buyers count:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterestBuyersCount();
  }, [phoneNumber]);



  
useEffect(() => {
  if (message) {
    const timer = setTimeout(() => setMessage(""), 5000); // Auto-close after 3 seconds
    return () => clearTimeout(timer); // Cleanup timer
  }
}, [message]);

  useEffect(() => {
    const storedProperties = JSON.parse(localStorage.getItem("interestProperties")) || [];
    const storedRemovedProperties = JSON.parse(localStorage.getItem("removedProperties")) || [];

    setProperties(storedProperties);
    setRemovedProperties(storedRemovedProperties);
  }, []);
  const confirmAction = (message, action) => {
    setPopupMessage(message);
    setPopupAction(() => action);
    setShowPopup(true);
  };
  // Sync properties with localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("interestProperties", JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem("removedProperties", JSON.stringify(removedProperties));
  }, [removedProperties]);

  // Fetch interested properties from API
  useEffect(() => {
    if (!phoneNumber) {
      setLoading(false);
      return;
    }

    const fetchInterestedProperties = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-interest-buyers`, {
          params: { postedPhoneNumber: phoneNumber },
        });

        if (response.status === 200) {
          const transformedProperties = response.data.propertiesData.map((property) => ({
            ...property,
            interestedUsers: property.interestedUsers.filter(
              (user) => user && user !== "undefined"
            ),
          }));

          setProperties(transformedProperties);
          localStorage.setItem("interestProperties", JSON.stringify(transformedProperties)); // Save to localStorage
        }
      } catch (error) {
        // console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterestedProperties();
  }, [phoneNumber]);

  // ✅ Remove Interest & Move to Removed List
  const handleRemoveProperty = async (ppcId, interestedUser) => {
    // if (!window.confirm("Are you sure you want to remove this interest?")) return;
    confirmAction("Are you sure you want to remove this interest?", async () => {

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/interest/delete/${ppcId}/${interestedUser}`);

      const updatedProperties = properties.map((property) =>
        property.ppcId === ppcId
          ? {
              ...property,
              interestedUsers: property.interestedUsers.filter((user) => user !== interestedUser),
            }
          : property
      );

      const removedItem = {
        ppcId,
        interestedUser,
      };

      setProperties(updatedProperties);
      setMessage({ text: "Interest Deleted successfully!", type: "success" });

      setRemovedProperties([...removedProperties, removedItem]);
    } catch (error) {
      setMessage({ text: "Error deleting interest.", type: "error" });
    }
    setShowPopup(false);

  });
  };


  const handleUndoRemove = async (ppcId, interestedUser) => {
    // if (!window.confirm("Do you want to restore this interest?")) return;
    confirmAction("Do you want to restore this interest?", async () => {

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/interest/undo/${ppcId}/${interestedUser}`);

      const restoredProperty = response.data.property;

      setRemovedProperties(removedProperties.filter((item) => item.interestedUser !== interestedUser));

      setProperties((prev) =>
        prev.map((property) =>
          property.ppcId === ppcId
            ? { ...property, interestedUsers: restoredProperty.interestRequests.map(req => req.phoneNumber) }
            : property
        )
      );

      setMessage({ text: "Interest restored successfully!", type: "success" });

    } catch (error) {
      setMessage({ text: error.response?.data?.message || "Error restoring interest.", type: "error" });
    }
    setShowPopup(false);

  });
};

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

const navigate = useNavigate();

const handlePageNavigation = () => {
  navigate('/mobileviews'); // Redirect to the desired path
};


  return (
    <div className="container d-flex align-items-center justify-content-center p-0" style={{fontFamily:"Inter, sans-serif",}}>
     
     <div className="d-flex flex-column align-items-center justify-content-center m-0" style={{ maxWidth: '500px', margin: 'auto', width: '100%', background:"#F7F7F7" }}>
<div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
  <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
</button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>BUYER INTEREST</h3> </div>

      {/* Tabs */}
      <div className="row g-2 w-100">
      <div className="col-6 p-0">

        <button style={{ backgroundColor: '#30747F', color: 'white' , width:"100%" }} onClick={() => setActiveTab("all")} className={activeTab === "all" ? "active" : ""}>
          All Properties
        </button>
        </div>

        <div className="col-6 p-0">

        <button style={{ backgroundColor: '#FFFFFF', color: 'grey' , width:"100%"  }} onClick={() => setActiveTab("removed")} className={activeTab === "removed" ? "active" : ""}>
          Removed Properties
        </button>
        </div>

      

      {/* Display Messages */}
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
        // Show all properties with interested users
        properties.length > 0 ? (
          properties.map((property , index) => (
            <div key={property.ppcId} className="property-card">
              <div className="buyers-list">
                {Array.isArray(property.interestedUsers) && property.interestedUsers.length > 0 ? (
                  property.interestedUsers.map((user, index) => (
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
              <div className="d-flex  flex-row align-items-start justify-content-between ps-3">
      
               
                <div className="d-flex align-items-center ">
                  <MdCall color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                  <div>
                    <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
                       Buyer Phone
                    </h6>
                    <span className="card-text" style={{  fontWeight:"500"}}>
                    <a href={`tel:${user}`} style={{ textDecoration: "none", color: "#1D1D1D" }}>
          {showFullNumber
            ? user
            : user?.slice(0, 5) + "*****"}
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
<div className="d-flex justify-content-between mt-2">
                      <button
                        className="btn btn-sm text-white"
                        style={{ background: "#2F747F", width: "48%" }}
                        onClick={() => handleContact(property.ppcId, user)}
                      >
                        Call
                      </button>
                      </div>


{/* 
                  <button className="btn text-white px-3 py-1 flex-grow-1 mx-1"
                    style={{ background:  "#FF0000", width: "80px", fontSize: "13px" }}
                    onClick={() => handleRemoveProperty(property.ppcId, user)}
                    > Remove</button>
            */}
           
<button
        className="btn text-white px-3 py-1 flex-grow-1 mx-1"
        style={{
          background: hoverDelete ? 'red' : '#FF4500',
          color: '#fff',
          width: "80px", fontSize: "13px",
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={() => setHoverDelete(true)}
        onMouseLeave={() => setHoverDelete(false)}
        onClick={() => handleRemoveProperty(property.ppcId, user)}
        >
        Remove
      </button>
           
            </div>
            : ''}
           
            </div>
          </div>
                  ))
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No properties found.</p>
        )
      ) : (
        // Show removed properties with Undo button
        removedProperties.length > 0 ? (
          removedProperties.map((property, index) => (
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
                    <a href={`tel:${property.interestedUser}`} style={{ textDecoration: "none", color: "#1D1D1D" }}>
          {showFullNumber
            ? property.interestedUser
            : property.interestedUser?.slice(0, 5) + "*****"}
        </a>
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center  ms-3">
                  <FaCalendarAlt color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                  <div>
                    <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
                      Interest Received Date
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
          
                  <button
              className="btn text-white px-3 py-1 flex-grow-1 mx-1"
              style={{ background:  "#2F747F", width: "80px", fontSize: "13px" }}
              onClick={() => (window.location.href = `tel:${ property.interestedUser}`)}

           >
              Call
            </button>   
                  {/* <button className="btn text-white px-3 py-1 flex-grow-1 mx-1"
                    style={{ background:  "green", width: "80px", fontSize: "13px" }}
                   onClick={() => handleUndoRemove(property.ppcId, property.interestedUser)}
                   > Undo</button> */}


<button
      className="btn text-white px-3 py-1 flex-grow-1 mx-1"
      style={{
        background: hover ?  'green':'#19575f' , // hover vs default
        color: hover ? '#e0f7fa' : '#fff',         // text color on hover
        width: "80px", fontSize: "13px",
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => handleUndoRemove(property.ppcId, property.interestedUser)}
      >
      Undo
    </button>

            </div>
            : ''}
           
            </div>
          </div>
          ))
        ) : (
          <p>No removed properties.</p>
        )
      )}
            </div>

          </div>

    </div>
  );
};

export default App;
















































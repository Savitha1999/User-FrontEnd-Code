
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";
// import { MdCalendarMonth, MdOutlineMapsHomeWork, MdOutlineBed, MdOutlineCall } from "react-icons/md";
// import { GoHome } from "react-icons/go";
// import { RiStairsLine } from "react-icons/ri";
// import { TfiLocationPin } from "react-icons/tfi";
// import profil from "../Assets/xd_profile.png";
// import NoData from "../Assets/OOOPS-No-Data-Found.png";
// // import {
// //   MdOutlineCall,
// //   MdOutlineMapsHomeWork,
// //   MdCalendarMonth,
// //   MdOutlineBed,
// // } from "react-icons/md";
// // import { RiStairsLine } from "react-icons/ri";
// // import { GoHome } from "react-icons/go";
// // import { TfiLocationPin } from "react-icons/tfi";
// import maxrupe from "../Assets/Price maxi-01.png";
// import minrupe from "../Assets/Price Mini-01.png";
// // import { useLocation, useNavigate } from "react-router-dom";
// const BuyerLists = () => {
//   // State management
//   const [assistanceData, setAssistanceData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState("");
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedPhone, setSelectedPhone] = useState("");
//   const [selectedPpcId, setSelectedPpcId] = useState("");
//   const [interestData, setInterestData] = useState([]);
//   const [selectedType, setSelectedType] = useState(null);
//   const [hovered, setHovered] = useState(false);
//   const [planData, setPlanData] = useState(null);
//   const [loadingPlan, setLoadingPlan] = useState(false);
//   const [planError, setPlanError] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");

//   // Refs and navigation
//   const navigate = useNavigate();
//   const scrollContainerRef = useRef(null);
//   const iconContainerRef = useRef(null);
//   const location = useLocation();

//   // Set phone number on mount
//   useEffect(() => {
//     const stored = location.state?.phoneNumber || localStorage.getItem("phoneNumber");
//     if (stored) {
//       setPhoneNumber(stored);
//     } else {
//       console.warn("No phone number found in location or localStorage");
//     }
//   }, [location.state]);

//   // Fetch plan when phoneNumber is set
//   useEffect(() => {
//     if (!phoneNumber) {
//       console.warn("No phone number available to fetch plan.");
//       return;
//     }

//     const fetchPlan = async () => {
//       setLoadingPlan(true);
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_URL}/fetch-plan-by-phone?phoneNumber=${phoneNumber}`
//         );
//         console.log("Fetched plan data:", response.data);
//         setPlanData(response.data);
//       } catch (error) {
//         console.error("Failed to fetch plan:", error);
//         setPlanError("Could not fetch plan. Please try again later.");
//       } finally {
//         setLoadingPlan(false);
//       }
//     };

//     fetchPlan();
//   }, [phoneNumber]);

//   // Button styles
//   const baseStyle = {
//     backgroundColor: "#019988",
//     color: "#fff",
//     border: "none",
//     padding: "8px 16px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     transition: "background-color 0.3s ease",
//   };

//   const hoverStyle = {
//     backgroundColor: "#017a6e",
//   };


  



//   // Fetch buyer assistance data
//   useEffect(() => {
//     const fetchAllAssistanceData = async () => {
//       try {
//         // Fetch buyer assistance
//         const assistanceResponse = await axios.get(`${process.env.REACT_APP_API_URL}/get-buyerAssistances`);
//         const sortedAssistanceData = assistanceResponse.data.data.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
  
//         // Fetch buyer-assistance-interest entries
//         const interestResponse = await axios.get(`${process.env.REACT_APP_API_URL}/buyer-assistance-interests`);
//         const sortedInterestData = interestResponse.data.data.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
  
//         setAssistanceData(sortedAssistanceData);
//         setInterestData(sortedInterestData);
  
//       } catch (err) {
//         setError("");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchAllAssistanceData();
//   }, []);

//   // Handle call confirmation
//   const handleConfirmCall = (type, phone, ba_id) => {
//     setSelectedType(type);
//     setSelectedPhone(phone);
//     setSelectedPpcId(ba_id);
//     setShowPopup(true);
//   };

//   // Handle sending interest
//   const handleSendInterest = async (ba_id) => {
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/send-interest`, {
//         ba_id,
//         buyerPhone: phoneNumber
//       });

//       if (response.data.success) {
//         setMessage(response.data.message);
        
//         // Update the local state to reflect the new status
//         setAssistanceData(prevData => 
//           prevData.map(item => 
//             item.ba_id === ba_id 
//               ? { 
//                   ...item, 
//                   ba_status: response.data.data.ba_status,
//                   interestedUserPhone: response.data.data.interestedUserPhone
//                 } 
//               : item
//           )
//         );
//       } else {
//         setMessage(response.data.message || "Failed to send interest");
//       }
//     } catch (error) {
//       setMessage(error.response?.data?.message || "An error occurred. Please try again.");
//     }
//   };

//   // Handle popup response
//   const handlePopupResponse = async (confirmed) => {
//     setShowPopup(false);

//     if (!confirmed || !selectedPhone || !selectedType) return;

//     try {
//       if (selectedType === "buyer") {
//         await axios.post(`${process.env.REACT_APP_API_URL}/contact-buyer-send`, {
//           phoneNumber: selectedPhone,
//           ba_id: selectedPpcId,
//         });
//       } else {
//         await axios.post(`${process.env.REACT_APP_API_URL}/contact-send`, {
//           phoneNumber: selectedPhone,
//         });
//       }

//       setMessage("Contact request sent successfully!");
//       window.location.href = `tel:${selectedPhone}`;
//     } catch (error) {
//       setMessage("Failed to send contact request.");
//     }
//   };

//   // Auto-dismiss messages
//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => setMessage(""), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [message]);

//   // Scroll handlers
//   const handleWheelScroll = (e) => {
//     if (scrollContainerRef.current) {
//       e.preventDefault();
//       scrollContainerRef.current.scrollTop += e.deltaY;
//     }
//   };

//   const handleIconScroll = (e) => {
//     if (iconContainerRef.current) {
//       e.preventDefault();
//       const scrollAmount = e.deltaX || e.deltaY;
//       iconContainerRef.current.scrollLeft += scrollAmount;
//     }
//   };

//   return (
//     <div className="container d-flex align-items-center justify-content-center p-0">
//       <div className="d-flex flex-column align-items-center justify-content-center m-0" style={{ maxWidth: '500px', margin: 'auto', width: '100%', fontFamily: 'Inter, sans-serif' }}>
//         {/* Header with back button */}
//         <div className="row g-2 w-100">
//           <div className="d-flex align-items-center justify-content-start w-100" style={{ background: "#EFEFEF" }}>
//             <button
//               onClick={() => navigate(-1)}
//               className="pe-5"
//               style={{
//                 backgroundColor: '#f0f0f0',
//                 border: 'none',
//                 padding: '10px 20px',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s ease-in-out',
//                 display: 'flex',
//                 alignItems: 'center',
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = '#f0f4f5';
//                 e.currentTarget.querySelector('svg').style.color = '#ffffff';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = '#f0f0f0';
//                 e.currentTarget.querySelector('svg').style.color = '#30747F';
//               }}
//             >
//               <FaArrowLeft style={{ color: '#30747F', transition: 'color 0.3s ease-in-out', background: "transparent" }} />
//             </button>
//             <h3 className="m-0" style={{ fontSize: "20px" }}>Buyer List</h3>
//           </div>

//           {/* Plan Information */}
//           {planData && (
//             <div className="w-100 p-3 mb-2" style={{ background: "#f8f9fa", borderRadius: "8px" }}>
//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <h6 className="mb-1" style={{ fontSize: "16px", fontWeight: "600" }}>
//                     {planData.planName}
//                   </h6>
//                   <p className="mb-0 text-muted" style={{ fontSize: "12px" }}>
//                     Expires: {planData.expiryDate}
//                   </p>
//                 </div>
//                 <span 
//                   className="badge" 
//                   style={{ 
//                     backgroundColor: planData.planName.toLowerCase() === "free" ? "#6c757d" : "#019988",
//                     color: "white",
//                     fontSize: "12px"
//                   }}
//                 >
//                   {planData.planName}
//                 </span>
//               </div>
//             </div>
//           )}

//           {/* Main content */}
//           <div
//             className="d-flex flex-column justify-content-center align-items-center w-100"
//             style={{ padding: "10px", gap: "15px", borderRadius: "10px", overflowY: "auto" }}
//             onWheel={handleWheelScroll}
//             ref={scrollContainerRef}
//           >
//             {/* Action buttons */}
//             <div className="w-100 d-flex justify-content-around align-items-center mt-3">
//               <button style={{
//                 ...baseStyle,
//                 opacity: 0.6,
//                 cursor: "not-allowed",
//               }} disabled>
//                 Add Buyer Assistant
//               </button>
//               <button
//                 style={{
//                   ...baseStyle,
//                   ...(hovered ? hoverStyle : {}),
//                 }}
//                 onMouseEnter={() => setHovered(true)}
//                 onMouseLeave={() => setHovered(false)}
//                 onClick={() => navigate(`/Buyer-List-Filter`)}
//               >
//                 View Buyer List
//               </button>
//             </div>

//             {/* Messages */}
//             {message && (
//               <div className={`alert ${message.includes("success") ? "text-success" : "text-danger"} fw-bold`}>
//                 {message}
//               </div>
//             )}

//             {/* Loading state */}
//             {loading ? (
//               <div className="text-center my-4"
//                 style={{
//                   position: 'fixed',
//                   top: '50%',
//                   left: '50%',
//                   transform: 'translate(-50%, -50%)',
//                   zIndex: 1000
//                 }}>
//                 <span className="spinner-border text-primary" role="status" />
//                 <p className="mt-2">Loading properties...</p>
//               </div>
//             ) : assistanceData.length > 0 ? (
//               /* Buyer assistance cards */
//               assistanceData.map((card) => (
//                 <div
//                   key={card._id}
//                   className="card p-1"
//                   style={{ width: '100%', height: 'auto', background: '#F9F9F9', overflow: 'hidden' }}
//                 >
//                   <div className="row d-flex align-items-center">
//                     <div className="col-3 d-flex align-items-center justify-content-center mb-1">
//                       <img
//                         src={profil}
//                         alt="Profile"
//                         className="rounded-circle mt-2"
//                         style={{ width: "60px", height: "60px", objectFit: "cover" }}
//                       />
//                     </div>
//                     <div className="p-0" style={{ background: "#707070", width: "1px", height: "80px" }}></div>
//                     <div className="col-7 p-0 ms-4">
//                       <div className="d-flex justify-content-between">
//                         <p className="m-0 text-muted" style={{ fontSize: "12px", fontWeight: "500" }}>
//                           BA ID: {card.ba_id}
//                         </p>
//                         <p className="m-0 text-muted" style={{ fontSize: "12px", fontWeight: "500" }}>
//                           <MdCalendarMonth size={12} className="me-2" color="#019988" />
//                           {card.createdAt.slice(0, 10)}
//                         </p>
//                       </div>
//                       <h5 className="mb-1" style={{ fontSize: "16px", color: "#000", fontWeight: "500" }}>
//                         {card.baName || "N/A"}{" "}
//                         <span className="text-muted" style={{ fontSize: "12px" }}>
//                           | Buyer
//                         </span>
//                       </h5>
//                       <div className="d-flex align-items-center justify-content-between col-8">
//                         <p className="mb-0 me-3 d-flex align-items-center" style={{ fontSize: "12px", fontWeight: 500 }}>
//                           <img src={minrupe} alt="min" width={13} className="me-2" />
//                           {card.minPrice}
//                         </p>
//                         <p className="mb-0 d-flex align-items-center" style={{ fontSize: "12px", fontWeight: 500 }}>
//                           <img src={maxrupe} alt="max" width={13} className="me-2" />
//                           {card.maxPrice}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="p-1">
//                     <div
//                       className="d-flex align-items-center overflow-auto mb-0 p-1 rounded-1"
//                       style={{
//                         whiteSpace: "nowrap",
//                         minWidth: "100%",
//                         overflowX: "auto",
//                         scrollbarWidth: "none",
//                         msOverflowStyle: "none",
//                         border: "1px solid #019988",
//                       }}
//                       onWheel={handleIconScroll}
//                       ref={iconContainerRef}
//                     >
//                       <div className="d-flex align-items-center me-3">
//                         <GoHome size={12} className="me-2" color="#019988" />
//                         <p className="mb-0" style={{ fontSize: "12px" }}>{card.propertyMode}</p>
//                       </div>
//                       <div className="d-flex align-items-center me-3">
//                         <MdOutlineMapsHomeWork size={12} className="me-2" color="#019988" />
//                         <p className="mb-0" style={{ fontSize: "12px" }}>{card.propertyType}</p>
//                       </div>
//                       <div className="d-flex align-items-center me-3">
//                         <MdCalendarMonth size={12} className="me-2" color="#019988" />
//                         <p className="mb-0" style={{ fontSize: "12px" }}>{card.paymentType}</p>
//                       </div>
//                       <div className="d-flex align-items-center me-3">
//                         <MdOutlineBed size={12} className="me-2" color="#019988" />
//                         <p className="mb-0" style={{ fontSize: "12px" }}>{card.bedrooms} BHK</p>
//                       </div>
//                       <div className="d-flex align-items-center me-3">
//                         <RiStairsLine size={12} className="me-2" color="#019988" />
//                         <p className="mb-0" style={{ fontSize: "12px" }}>{card.propertyAge}</p>
//                       </div>
//                     </div>

//                     <div className="mb-0 mt-1">
//                       <p className="mb-0 fw-semibold" style={{ fontSize: "12px" }}>
//                         <TfiLocationPin size={16} className="me-2" color="#019988" />
//                         {card.area}, {card.city}
//                       </p>
//                     </div>

//                     <div className="d-flex justify-content-between align-items-center mt-2">
//                       <div className="d-flex align-items-center">
//                         <MdOutlineCall color="#019988" style={{ fontSize: "12px", marginRight: "8px" }} />
//                         <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
//                           {card.phoneNumber
//                             ? `Buyer Phone: ${card.phoneNumber.slice(0, -5)}*****`
//                             : "Phone: N/A"}
//                         </h6>
//                       </div>
//                     </div>

//                     <div className="d-flex justify-content-end align-items-center m-0">
//                       <button
//                         className="btn text-white px-3 py-1 mx-1"
//                         style={{ 
//                           background: "#3660FF", 
//                           fontSize: "13px",
//                           opacity: card.ba_status === "buyer-assistance-interest" ? 0.6 : 1,
//                           cursor: card.ba_status === "buyer-assistance-interest" ? "not-allowed" : "pointer"
//                         }}
//                         disabled={card.ba_status === "buyer-assistance-interest"}
//                         onMouseOver={(e) => {
//                           if (card.ba_status !== "buyer-assistance-interest") {
//                             e.target.style.background = "#0739f5";
//                             e.target.style.fontWeight = 500;
//                             e.target.style.transition = "background 0.3s ease";
//                           }
//                         }}
//                         onMouseOut={(e) => {
//                           if (card.ba_status !== "buyer-assistance-interest") {
//                             e.target.style.background = "#3660FF";
//                             e.target.style.fontWeight = 400;
//                           }
//                         }}
//                         onClick={() => handleSendInterest(card.ba_id)}
//                       >
//                         {card.ba_status === "buyer-assistance-interest" ? "Interest Sent" : "Send Interest"}
//                       </button>

//                       <button
//                         className="btn text-white px-3 py-1 mx-1"
//                         style={{ background: "#2F747F", fontSize: "13px" }}
//                         onMouseOver={(e) => {
//                           e.target.style.background = "#029bb3";
//                           e.target.style.fontWeight = 600;
//                           e.target.style.transition = "background 0.3s ease";
//                         }}
//                         onMouseOut={(e) => {
//                           e.target.style.background = "#2F747F";
//                           e.target.style.fontWeight = 400;
//                         }}
//                         onClick={() => navigate(`/detail-buyer-assistance/${card.ba_id}`)}
//                       >
//                         More
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               /* No data state */
//               <div className="text-center my-4"
//                 style={{
//                   position: 'fixed',
//                   top: '50%',
//                   left: '50%',
//                   transform: 'translate(-50%, -50%)',
//                 }}>
//                 <img src={NoData} alt="" />
//                 <p>No buyer assistance interests found.</p>
//               </div>
//             )}

//             {/* Call confirmation popup */}
//             {showPopup && (
//               <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
//                 <div className="bg-white p-4 rounded" style={{ minWidth: "300px" }}>
//                   <h6 className="mb-3">Are you sure you want to call this buyer?</h6>
//                   <div className="d-flex justify-content-between">
//                     <button className="btn btn-success" onClick={() => handlePopupResponse(true)}>Yes</button>
//                     <button className="btn btn-danger" onClick={() => handlePopupResponse(false)}>No</button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BuyerLists;




































import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import profil from "../Assets/xd_profile.png";
import NoData from "../Assets/OOOPS-No-Data-Found.png";
import {
  MdOutlineCall,
  MdOutlineMapsHomeWork,
  MdCalendarMonth,
  MdOutlineBed,
} from "react-icons/md";
import { RiStairsLine } from "react-icons/ri";
import { GoHome } from "react-icons/go";
import { TfiLocationPin } from "react-icons/tfi";
import maxrupe from "../Assets/Price maxi-01.png";
import minrupe from "../Assets/Price Mini-01.png";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";



const BuyerLists = () => {
  const [assistanceData, setAssistanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState("");
  const [selectedPpcId, setSelectedPpcId] = useState("");
  const [interestData, setInterestData] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
    const [hovered, setHovered] = useState(false);
  
    const baseStyle = {
      backgroundColor: "#019988",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    };
  
    const hoverStyle = {
      backgroundColor: "#017a6e",
    };
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const iconContainerRef = useRef(null);
  const location = useLocation();
  const storedPhoneNumber = location.state?.phoneNumber || localStorage.getItem("phoneNumber") || "";
  const [phoneNumber] = useState(storedPhoneNumber);

  const handleConfirmCall = (type, phone, ba_id) => {
    setSelectedType(type);
    setSelectedPhone(phone);
    setSelectedPpcId(ba_id);
    setShowPopup(true);
  };

  const handleSendInterest = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/update-status-buyers-assistance/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ba_status: "buyer-assistance-interest",
            userPhoneNumber: phoneNumber,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("Interest sent successfully!");
      } else {
        setMessage(`Failed to send interest: ${data.message}`);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  const handlePopupResponse = async (confirmed) => {
    setShowPopup(false);

    if (!confirmed || !selectedPhone || !selectedType) return;

    try {
      if (selectedType === "buyer") {
        await axios.post(`${process.env.REACT_APP_API_URL}/contact-buyer-send`, {
          phoneNumber: selectedPhone,
          ba_id: selectedPpcId,
        });
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/contact-send`, {
          phoneNumber: selectedPhone,
        });
      }

      setMessage("Contact request sent successfully!");
      window.location.href = `tel:${selectedPhone}`;
    } catch (error) {
      setMessage("Failed to send contact request.");
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);


  useEffect(() => {
    const fetchAllAssistanceData = async () => {
      try {
        // Fetch buyer assistance
        const assistanceResponse = await axios.get(`${process.env.REACT_APP_API_URL}/get-buyerAssistances`);
        const sortedAssistanceData = assistanceResponse.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
  
        // Fetch buyer-assistance-interest entries
        const interestResponse = await axios.get(`${process.env.REACT_APP_API_URL}/buyer-assistance-interests`);
        const sortedInterestData = interestResponse.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
  
        // You can either:
        // 1. Show both separately (recommended for clarity), or
        // 2. Combine them into one if needed.
  
        setAssistanceData(sortedAssistanceData); // regular assistance requests
        setInterestData(sortedInterestData); // buyer-assistance-interest entries
  
      } catch (err) {
        setError("");
      } finally {
        setLoading(false);
      }
    };
  
    fetchAllAssistanceData();
},[]);

  const handleWheelScroll = (e) => {
    if (scrollContainerRef.current) {
      e.preventDefault();
      scrollContainerRef.current.scrollTop += e.deltaY;
    }
  };
  useEffect(() => {
    const recordDashboardView = async () => {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/record-views`, {
          phoneNumber: phoneNumber,
          viewedFile: "Buyer List",
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
  const handleIconScroll = (e) => {
    if (iconContainerRef.current) {
      e.preventDefault();
      const scrollAmount = e.deltaX || e.deltaY;
      iconContainerRef.current.scrollLeft += scrollAmount;
    }
  };

  // if (loading) return <p>Loading...</p>;

  return (
    <div className="container d-flex align-items-center justify-content-center p-0">
    <div className="d-flex flex-column align-items-center justify-content-center m-0" style={{ maxWidth: '500px', margin: 'auto', width: '100%',fontFamily: 'Inter, sans-serif'}}>
    <div className="row g-2 w-100">
<div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
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
    </button> <h3 className="m-0 " style={{fontSize:"20px"}}>Buyer List </h3> </div>
     
    <div
      className="d-flex flex-column justify-content-center align-items-center w-100"
      style={{ padding: "10px", gap: "15px", borderRadius: "10px", overflowY: "auto" }}
      onWheel={handleWheelScroll}
      ref={scrollContainerRef}
    >
      {/* <h5>Buyer List Datas</h5> */}
      <div className="w-100 d-flex justify-content-around align-items-center mt-3">
        <button style={{
          ...baseStyle,
          opacity: 0.6,
          cursor: "not-allowed",
        }}
        disabled
        >Add Buyer Assistant</button>
        <button   style={{
          ...baseStyle,
          ...(hovered ? hoverStyle : {}),
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => navigate(`/Buyer-List-Filter`)}

   >view Buyer List</button>

      </div>
      {message && <div className="alert text-success fw-bold">{message}</div>}

      {loading ? (
  <div className="text-center my-4"
    style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1000
    }}>
    <span className="spinner-border text-primary" role="status" />
    <p className="mt-2">Loading properties...</p>
  </div>
) :assistanceData.length > 0 ? (
        assistanceData.map((card) => (
  
          <div
  key={card._id}
  className="card p-1"
  style={{ width: '100%', height: 'auto', background: '#F9F9F9', overflow:'hidden' }}
>
  

            <div className="row d-flex align-items-center">
              <div className="col-3 d-flex align-items-center justify-content-center mb-1">
                <img
                  src={profil}
                  alt="Profile"
                  className="rounded-circle mt-2"
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                />
              </div>
              <div className="p-0" style={{ background: "#707070", width: "1px", height: "80px" }}></div>
              <div className="col-7 p-0 ms-4">
                <div className="d-flex justify-content-between">
                  <p className="m-0 text-muted" style={{ fontSize: "12px", fontWeight: "500" }}>
                    BA ID: {card.ba_id}
                  </p>
                  <p className="m-0 text-muted" style={{ fontSize: "12px", fontWeight: "500" }}>
                    <MdCalendarMonth size={12} className="me-2" color="#019988" />
                    {card.createdAt.slice(0, 10)}
                  </p>
                </div>
                <h5 className="mb-1" style={{ fontSize: "16px", color: "#000", fontWeight: "500" }}>
                  {card.baName || "N/A"}{" "}
                  <span className="text-muted" style={{ fontSize: "12px" }}>
                    | Buyer
                  </span>
                </h5>
                <div className="d-flex align-items-center justify-content-between col-8">
                  <p className="mb-0 me-3 d-flex align-items-center" style={{ fontSize: "12px", fontWeight: 500 }}>
                    <img src={minrupe} alt="min" width={13} className="me-2" />
                    {card.minPrice}
                  </p>
                  <p className="mb-0 d-flex align-items-center" style={{ fontSize: "12px", fontWeight: 500 }}>
                    <img src={maxrupe} alt="max" width={13} className="me-2" />
                    {card.maxPrice}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-1">
            <div
                className="d-flex align-items-center overflow-auto mb-0 p-1 rounded-1"
                style={{
                  whiteSpace: "nowrap",
                  minWidth: "100%",
                  overflowX: "auto",
                  scrollbarWidth: "none", 
                  msOverflowStyle: "none",
                  border: "1px solid #019988",
                }}
                onWheel={handleIconScroll}
                ref={iconContainerRef}
                >                <div className="d-flex align-items-center me-3">
                  <GoHome size={12} className="me-2" color="#019988" />
                  <p className="mb-0" style={{ fontSize: "12px" }}>{card.propertyMode}</p>
                </div>
                <div className="d-flex align-items-center me-3">
                  <MdOutlineMapsHomeWork size={12} className="me-2" color="#019988" />
                  <p className="mb-0" style={{ fontSize: "12px" }}>{card.propertyType}</p>
                </div>
                <div className="d-flex align-items-center me-3">
                  <MdCalendarMonth size={12} className="me-2" color="#019988" />
                  <p className="mb-0" style={{ fontSize: "12px" }}>{card.paymentType}</p>
                </div>
                <div className="d-flex align-items-center me-3">
                  <MdOutlineBed size={12} className="me-2" color="#019988" />
                  <p className="mb-0" style={{ fontSize: "12px" }}>{card.bedrooms} BHK</p>
                </div>
                <div className="d-flex align-items-center me-3">
                  <RiStairsLine size={12} className="me-2" color="#019988" />
                  <p className="mb-0" style={{ fontSize: "12px" }}>{card.propertyAge}</p>
                </div>
              </div>

              <div className="mb-0 mt-1">
                <p className="mb-0 fw-semibold" style={{ fontSize: "12px" }}>
                  <TfiLocationPin size={16} className="me-2" color="#019988" />
                  {card.area}, {card.city}
                </p>
              </div>

              {/* <div className="d-flex justify-content-between align-items-center mt-2">
                <div className="d-flex align-items-center">
                  <MdOutlineCall color="#019988" style={{ fontSize: "12px", marginRight: "8px" }} />
                  <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
                    {card.interestedUserPhone
                      ? `Interested Owner: ${card.interestedUserPhone.slice(0, -5)}*****`
                      : card.phoneNumber
                      ? `Buyer Phone: ${card.phoneNumber.slice(0, -5)}*****`
                      : "Phone: N/A"}
                  </h6>
                </div>
              </div> */}

<div className="d-flex justify-content-between align-items-center mt-2">
  <div className="d-flex align-items-center">
    <MdOutlineCall color="#019988" style={{ fontSize: "12px", marginRight: "8px" }} />
    <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
      {card.phoneNumber
        ? `Buyer Phone: ${card.phoneNumber.slice(0, -5)}*****`
        : "Phone: N/A"}
    </h6>
  </div>
</div>


              <div className="d-flex justify-content-end align-items-center m-0">

<button
  className="btn text-white px-3 py-1 mx-1"
  style={{ background: "#3660FF", fontSize: "13px" }}
  onMouseOver={(e) => {
    e.target.style.background = "#0739f5"; // Brighter neon on hover
    e.target.style.fontWeight = 500; // Brighter neon on hover
    e.target.style.transition = "background 0.3s ease"; // Brighter neon on hover

  }}
  onMouseOut={(e) => {
    e.target.style.background = "#3660FF"; // Original orange
    e.target.style.fontWeight = 400; // Brighter neon on hover

  }}  onClick={() => handleSendInterest(card._id)}
>
  Send Interest
</button>

<button
  className="btn text-white px-3 py-1 mx-1"
  style={{ background: "#2F747F", fontSize: "13px" }}
  onMouseOver={(e) => {
    e.target.style.background = "#029bb3"; // Brighter neon on hover
    e.target.style.fontWeight = 600; // Brighter neon on hover
    e.target.style.transition = "background 0.3s ease"; // Brighter neon on hover

  }}
  onMouseOut={(e) => {
    e.target.style.background = "#2F747F"; // Original orange
    e.target.style.fontWeight = 400; // Brighter neon on hover

  }}
  onClick={() => navigate(`/detail-buyer-assistance/${card.ba_id}`)}

>
  More
</button>
</div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center my-4 "
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
  
        }}>
<img src={NoData} alt="" />          <p>No buyer assistance interests found.</p>
          </div>        )}

      {showPopup && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
          <div className="bg-white p-4 rounded" style={{ minWidth: "300px" }}>
            <h6 className="mb-3">Are you sure you want to call this buyer?</h6>
            <div className="d-flex justify-content-between">
              <button className="btn btn-success" onClick={() => handlePopupResponse(true)}>Yes</button>
              <button className="btn btn-danger" onClick={() => handlePopupResponse(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
    </div>
  );
};

export default BuyerLists;























// // import React, { useEffect, useState, useRef } from "react";
// // import axios from "axios";
// // import profil from "../Assets/xd_profile.png";
// // import NoData from "../Assets/OOOPS-No-Data-Found.png";
// // import {
// //   MdOutlineCall,
// //   MdOutlineMapsHomeWork,
// //   MdCalendarMonth,
// //   MdOutlineBed,
// // } from "react-icons/md";
// // import { RiStairsLine } from "react-icons/ri";
// // import { GoHome } from "react-icons/go";
// // import { TfiLocationPin } from "react-icons/tfi";
// // import maxrupe from "../Assets/Price maxi-01.png";
// // import minrupe from "../Assets/Price Mini-01.png";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import { FaArrowLeft } from "react-icons/fa";



// // const BuyerLists = () => {
// //   const [assistanceData, setAssistanceData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [message, setMessage] = useState("");
// //   const [showPopup, setShowPopup] = useState(false);
// //   const [selectedPhone, setSelectedPhone] = useState("");
// //   const [selectedPpcId, setSelectedPpcId] = useState("");
// //   const [interestData, setInterestData] = useState([]);
// //   const [selectedType, setSelectedType] = useState(null);
//     // const [hovered, setHovered] = useState(false);
  
//     // const baseStyle = {
//     //   backgroundColor: "#019988",
//     //   color: "#fff",
//     //   border: "none",
//     //   padding: "8px 16px",
//     //   borderRadius: "5px",
//     //   cursor: "pointer",
//     //   transition: "background-color 0.3s ease",
//     // };
  
//     // const hoverStyle = {
//     //   backgroundColor: "#017a6e",
//     // };
// //   const navigate = useNavigate();
// //   const scrollContainerRef = useRef(null);
// //   const iconContainerRef = useRef(null);
// //   const location = useLocation();
// //   const storedPhoneNumber = location.state?.phoneNumber || localStorage.getItem("phoneNumber") || "";
// //   const [phoneNumber] = useState(storedPhoneNumber);

// //   const handleConfirmCall = (type, phone, ba_id) => {
// //     setSelectedType(type);
// //     setSelectedPhone(phone);
// //     setSelectedPpcId(ba_id);
// //     setShowPopup(true);
// //   };

// //   const handleSendInterest = async (id) => {
// //     try {
// //       const response = await fetch(
// //         `${process.env.REACT_APP_API_URL}/update-status-buyers-assistance/${id}`,
// //         {
// //           method: "PUT",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({
// //             ba_status: "buyer-assistance-interest",
// //             userPhoneNumber: phoneNumber,
// //           }),
// //         }
// //       );

// //       const data = await response.json();
// //       if (response.ok) {
// //         setMessage("Interest sent successfully!");
// //       } else {
// //         setMessage(`Failed to send interest: ${data.message}`);
// //       }
// //     } catch (error) {
// //       setMessage("An error occurred. Please try again.");
// //     }
// //   };




// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import profil from "../Assets/xd_profile.png";
// import NoData from "../Assets/OOOPS-No-Data-Found.png";
// import {
//   MdOutlineCall,
//   MdOutlineMapsHomeWork,
//   MdCalendarMonth,
//   MdOutlineBed,
// } from "react-icons/md";
// import { RiStairsLine } from "react-icons/ri";
// import { GoHome } from "react-icons/go";
// import { TfiLocationPin } from "react-icons/tfi";
// import maxrupe from "../Assets/Price maxi-01.png";
// import minrupe from "../Assets/Price Mini-01.png";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";

// const BuyerLists = () => {
//   const [assistanceData, setAssistanceData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedPhone, setSelectedPhone] = useState("");
//   const [selectedPpcId, setSelectedPpcId] = useState("");
//   const [interestData, setInterestData] = useState([]);
//   const [selectedType, setSelectedType] = useState(null);
//   const [isSendingInterest, setIsSendingInterest] = useState(false);
//   const [hovered, setHovered] = useState(false);


//   const baseStyle = {
//     backgroundColor: "#019988",
//     color: "#fff",
//     border: "none",
//     padding: "8px 16px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     transition: "background-color 0.3s ease",
//   };

//   const hoverStyle = {
//     backgroundColor: "#017a6e",
//   };

//   const navigate = useNavigate();
//   const scrollContainerRef = useRef(null);
//   const iconContainerRef = useRef(null);
//   const location = useLocation();
//   const storedPhoneNumber = location.state?.phoneNumber || localStorage.getItem("phoneNumber") || "";
//   const [phoneNumber] = useState(storedPhoneNumber);

//   const handleConfirmCall = (type, phone, ba_id) => {
//     setSelectedType(type);
//     setSelectedPhone(phone);
//     setSelectedPpcId(ba_id);
//     setShowPopup(true);
//   };

//   const handleSendInterest = async (id) => {
//     if (!phoneNumber) {
//       setMessage({ text: "Please login with a valid phone number", type: "error" });
//       return;
//     }

//     setIsSendingInterest(true);
//     setMessage({ text: "", type: "" });

//     try {
//       const response = await axios.put(
//         `${process.env.REACT_APP_API_URL}/update-status-buyers-assistance/${id}`,
//         {
//           ba_status: "buyer-assistance-interest",
//           userPhoneNumber: phoneNumber,
//         }
//       );

//       const data = response.data;

//       if (data.success) {
//         if (data.status === "buyer-interest-tried") {
//           setMessage({
//             text: data.message || "Only paid users can send interest",
//             type: "warning"
//           });
//         } else {
//           setMessage({
//             text: data.message || "Interest sent successfully!",
//             type: "success"
//           });
//           // Update local state
//           setAssistanceData(prev => prev.map(item => 
//             item._id === id ? { ...item, ba_status: "buyer-assistance-interest" } : item
//           ));
//         }
//       } else {
//         throw new Error(data.message || "Failed to send interest");
//       }
//     } catch (error) {
//       setMessage({
//         text: error.response?.data?.message || error.message || "An error occurred",
//         type: "error"
//       });
//     } finally {
//       setIsSendingInterest(false);
//     }
//   };


//   const handlePopupResponse = async (confirmed) => {
//     setShowPopup(false);

//     if (!confirmed || !selectedPhone || !selectedType) return;

//     try {
//       if (selectedType === "buyer") {
//         await axios.post(`${process.env.REACT_APP_API_URL}/contact-buyer-send`, {
//           phoneNumber: selectedPhone,
//           ba_id: selectedPpcId,
//         });
//       } else {
//         await axios.post(`${process.env.REACT_APP_API_URL}/contact-send`, {
//           phoneNumber: selectedPhone,
//         });
//       }

//       setMessage("Contact request sent successfully!");
//       window.location.href = `tel:${selectedPhone}`;
//     } catch (error) {
//       setMessage("Failed to send contact request.");
//     }
//   };

//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => setMessage(""), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [message]);


//   useEffect(() => {
//     const fetchAllAssistanceData = async () => {
//       try {
//         // Fetch buyer assistance
//         const assistanceResponse = await axios.get(`${process.env.REACT_APP_API_URL}/get-buyerAssistances`);
//         const sortedAssistanceData = assistanceResponse.data.data.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
  
//         // Fetch buyer-assistance-interest entries
//         const interestResponse = await axios.get(`${process.env.REACT_APP_API_URL}/buyer-assistance-interests`);
//         const sortedInterestData = interestResponse.data.data.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
  
//         // You can either:
//         // 1. Show both separately (recommended for clarity), or
//         // 2. Combine them into one if needed.
  
//         setAssistanceData(sortedAssistanceData); // regular assistance requests
//         setInterestData(sortedInterestData); // buyer-assistance-interest entries
  
//       } catch (err) {
//         setError("");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchAllAssistanceData();
// },[]);

//   const handleWheelScroll = (e) => {
//     if (scrollContainerRef.current) {
//       e.preventDefault();
//       scrollContainerRef.current.scrollTop += e.deltaY;
//     }
//   };

//   const handleIconScroll = (e) => {
//     if (iconContainerRef.current) {
//       e.preventDefault();
//       const scrollAmount = e.deltaX || e.deltaY;
//       iconContainerRef.current.scrollLeft += scrollAmount;
//     }
//   };

//   // if (loading) return <p>Loading...</p>;

//   return (
//     <div className="container d-flex align-items-center justify-content-center p-0">
//     <div className="d-flex flex-column align-items-center justify-content-center m-0" style={{ maxWidth: '500px', margin: 'auto', width: '100%',fontFamily: 'Inter, sans-serif'}}>
//     <div className="row g-2 w-100">
// <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
// <button
//       onClick={() => navigate(-1)}
//       className="pe-5"
//       style={{
//         backgroundColor: '#f0f0f0',
//         border: 'none',
//         padding: '10px 20px',
//         cursor: 'pointer',
//         transition: 'all 0.3s ease-in-out',
//         display: 'flex',
//         alignItems: 'center',
//       }}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.backgroundColor = '#f0f4f5'; // Change background
//         e.currentTarget.querySelector('svg').style.color = '#ffffff'; // Change icon color
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.backgroundColor = '#f0f0f0';
//         e.currentTarget.querySelector('svg').style.color = '#30747F';
//       }}
//     >
//       <FaArrowLeft style={{ color: '#30747F', transition: 'color 0.3s ease-in-out' , background:"transparent"}} />
//     </button> <h3 className="m-0 " style={{fontSize:"20px"}}>Buyer List </h3> </div>
     
//     <div
//       className="d-flex flex-column justify-content-center align-items-center w-100"
//       style={{ padding: "10px", gap: "15px", borderRadius: "10px", overflowY: "auto" }}
//       onWheel={handleWheelScroll}
//       ref={scrollContainerRef}
//     >
//       {/* <h5>Buyer List Datas</h5> */}
//       <div className="w-100 d-flex justify-content-around align-items-center mt-3">
//         <button style={{
//           ...baseStyle,
//           opacity: 0.6,
//           cursor: "not-allowed",
//         }}
//         disabled
//         >Add Buyer Assistant</button>
//         <button   style={{
//           ...baseStyle,
//           ...(hovered ? hoverStyle : {}),
//         }}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//         onClick={() => navigate(`/Buyer-List-Filter`)}

//    >view Buyer List</button>

//       </div>
//       {message && <div className="alert text-success fw-bold">{message}</div>}

//       {loading ? (
//   <div className="text-center my-4"
//     style={{
//       position: 'fixed',
//       top: '50%',
//       left: '50%',
//       transform: 'translate(-50%, -50%)',
//       zIndex: 1000
//     }}>
//     <span className="spinner-border text-primary" role="status" />
//     <p className="mt-2">Loading properties...</p>
//   </div>
// ) :assistanceData.length > 0 ? (
//         assistanceData.map((card) => (
  
//           <div
//   key={card._id}
//   className="card p-1"
//   style={{ width: '100%', height: 'auto', background: '#F9F9F9', overflow:'hidden' }}
// >
  

//             <div className="row d-flex align-items-center">
//               <div className="col-3 d-flex align-items-center justify-content-center mb-1">
//                 <img
//                   src={profil}
//                   alt="Profile"
//                   className="rounded-circle mt-2"
//                   style={{ width: "60px", height: "60px", objectFit: "cover" }}
//                 />
//               </div>
//               <div className="p-0" style={{ background: "#707070", width: "1px", height: "80px" }}></div>
//               <div className="col-7 p-0 ms-4">
//                 <div className="d-flex justify-content-between">
//                   <p className="m-0 text-muted" style={{ fontSize: "12px", fontWeight: "500" }}>
//                     BA ID: {card.ba_id}
//                   </p>
//                   <p className="m-0 text-muted" style={{ fontSize: "12px", fontWeight: "500" }}>
//                     <MdCalendarMonth size={12} className="me-2" color="#019988" />
//                     {card.createdAt.slice(0, 10)}
//                   </p>
//                 </div>
//                 <h5 className="mb-1" style={{ fontSize: "16px", color: "#000", fontWeight: "500" }}>
//                   {card.baName || "N/A"}{" "}
//                   <span className="text-muted" style={{ fontSize: "12px" }}>
//                     | Buyer
//                   </span>
//                 </h5>
//                 <div className="d-flex align-items-center justify-content-between col-8">
//                   <p className="mb-0 me-3 d-flex align-items-center" style={{ fontSize: "12px", fontWeight: 500 }}>
//                     <img src={minrupe} alt="min" width={13} className="me-2" />
//                     {card.minPrice}
//                   </p>
//                   <p className="mb-0 d-flex align-items-center" style={{ fontSize: "12px", fontWeight: 500 }}>
//                     <img src={maxrupe} alt="max" width={13} className="me-2" />
//                     {card.maxPrice}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="p-1">
//             <div
//                 className="d-flex align-items-center overflow-auto mb-0 p-1 rounded-1"
//                 style={{
//                   whiteSpace: "nowrap",
//                   minWidth: "100%",
//                   overflowX: "auto",
//                   scrollbarWidth: "none", 
//                   msOverflowStyle: "none",
//                   border: "1px solid #019988",
//                 }}
//                 onWheel={handleIconScroll}
//                 ref={iconContainerRef}
//                 >                <div className="d-flex align-items-center me-3">
//                   <GoHome size={12} className="me-2" color="#019988" />
//                   <p className="mb-0" style={{ fontSize: "12px" }}>{card.propertyMode}</p>
//                 </div>
//                 <div className="d-flex align-items-center me-3">
//                   <MdOutlineMapsHomeWork size={12} className="me-2" color="#019988" />
//                   <p className="mb-0" style={{ fontSize: "12px" }}>{card.propertyType}</p>
//                 </div>
//                 <div className="d-flex align-items-center me-3">
//                   <MdCalendarMonth size={12} className="me-2" color="#019988" />
//                   <p className="mb-0" style={{ fontSize: "12px" }}>{card.paymentType}</p>
//                 </div>
//                 <div className="d-flex align-items-center me-3">
//                   <MdOutlineBed size={12} className="me-2" color="#019988" />
//                   <p className="mb-0" style={{ fontSize: "12px" }}>{card.bedrooms} BHK</p>
//                 </div>
//                 <div className="d-flex align-items-center me-3">
//                   <RiStairsLine size={12} className="me-2" color="#019988" />
//                   <p className="mb-0" style={{ fontSize: "12px" }}>{card.propertyAge}</p>
//                 </div>
//               </div>

//               <div className="mb-0 mt-1">
//                 <p className="mb-0 fw-semibold" style={{ fontSize: "12px" }}>
//                   <TfiLocationPin size={16} className="me-2" color="#019988" />
//                   {card.area}, {card.city}
//                 </p>
//               </div>

//               {/* <div className="d-flex justify-content-between align-items-center mt-2">
//                 <div className="d-flex align-items-center">
//                   <MdOutlineCall color="#019988" style={{ fontSize: "12px", marginRight: "8px" }} />
//                   <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
//                     {card.interestedUserPhone
//                       ? `Interested Owner: ${card.interestedUserPhone.slice(0, -5)}*****`
//                       : card.phoneNumber
//                       ? `Buyer Phone: ${card.phoneNumber.slice(0, -5)}*****`
//                       : "Phone: N/A"}
//                   </h6>
//                 </div>
//               </div> */}

// <div className="d-flex justify-content-between align-items-center mt-2">
//   <div className="d-flex align-items-center">
//     <MdOutlineCall color="#019988" style={{ fontSize: "12px", marginRight: "8px" }} />
//     <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
//       {card.phoneNumber
//         ? `Buyer Phone: ${card.phoneNumber.slice(0, -5)}*****`
//         : "Phone: N/A"}
//     </h6>
//   </div>
// </div>


//               <div className="d-flex justify-content-end align-items-center m-0">

// {/* <button
//   className="btn text-white px-3 py-1 mx-1"
//   style={{ background: "#3660FF", fontSize: "13px" }}
//   onMouseOver={(e) => {
//     e.target.style.background = "#0739f5"; // Brighter neon on hover
//     e.target.style.fontWeight = 500; // Brighter neon on hover
//     e.target.style.transition = "background 0.3s ease"; // Brighter neon on hover

//   }}
//   onMouseOut={(e) => {
//     e.target.style.background = "#3660FF"; // Original orange
//     e.target.style.fontWeight = 400; // Brighter neon on hover

//   }}  onClick={() => handleSendInterest(card._id)}
// >
//   Send Interest
// </button> */}

// <button
//               className="btn text-white px-3 py-1 mx-1"
//               style={{ 
//                 background: "#3660FF", 
//                 fontSize: "13px",
//                 fontWeight: 400,
//                 transition: "background 0.3s ease, font-weight 0.3s ease"
//               }}
//               onMouseOver={(e) => {
//                 e.target.style.background = "#0739f5";
//                 e.target.style.fontWeight = 500;
//               }}
//               onMouseOut={(e) => {
//                 e.target.style.background = "#3660FF";
//                 e.target.style.fontWeight = 400;
//               }}
//               onClick={() => handleSendInterest(card._id)}
//               disabled={isSendingInterest || card.ba_status === "buyer-assistance-interest"}
//             >
//               {isSendingInterest ? "Sending..." : "Send Interest"}
//             </button>

// <button
//   className="btn text-white px-3 py-1 mx-1"
//   style={{ background: "#2F747F", fontSize: "13px" }}
//   onMouseOver={(e) => {
//     e.target.style.background = "#029bb3"; // Brighter neon on hover
//     e.target.style.fontWeight = 600; // Brighter neon on hover
//     e.target.style.transition = "background 0.3s ease"; // Brighter neon on hover

//   }}
//   onMouseOut={(e) => {
//     e.target.style.background = "#2F747F"; // Original orange
//     e.target.style.fontWeight = 400; // Brighter neon on hover

//   }}
//   onClick={() => navigate(`/detail-buyer-assistance/${card.ba_id}`)}

// >
//   More
// </button>
// </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div className="text-center my-4 "
//         style={{
//           position: 'fixed',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
  
//         }}>
// <img src={NoData} alt="" />          <p>No buyer assistance interests found.</p>
//           </div>        )}

//       {showPopup && (
//         <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
//           <div className="bg-white p-4 rounded" style={{ minWidth: "300px" }}>
//             <h6 className="mb-3">Are you sure you want to call this buyer?</h6>
//             <div className="d-flex justify-content-between">
//               <button className="btn btn-success" onClick={() => handlePopupResponse(true)}>Yes</button>
//               <button className="btn btn-danger" onClick={() => handlePopupResponse(false)}>No</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//     </div>
//     </div>
//     </div>
//   );
// };

// export default BuyerLists;






// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import profil from "../Assets/xd_profile.png";
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

// const BuyerList = () => {
//   const [assistanceData, setAssistanceData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState('');
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedPhone, setSelectedPhone] = useState('');
//   const [selectedPpcId, setSelectedPpcId] = useState('');
//   const [interestData, setInterestData] = useState([]);
//   const [selectedType, setSelectedType] = useState(null);


//   const navigate = useNavigate();
//   const scrollContainerRef = useRef(null);
//   const iconContainerRef = useRef(null);


//    const location = useLocation();
//     const storedPhoneNumber = location.state?.phoneNumber || localStorage.getItem("phoneNumber") || "";
  
//     const [phoneNumber, setPhoneNumber] = useState(storedPhoneNumber);
  

//   const handleConfirmCall = (type, phoneNumber, ba_id) => {
//     setSelectedType(type);
//     setSelectedPhone(phoneNumber);
//     setSelectedPpcId(ba_id);
//     setShowPopup(true);
//   };
  
//   const handlePopupResponse = async (confirmed) => {
//     setShowPopup(false);
  
//     if (!confirmed || !selectedPhone || !selectedType) return;
  
//     try {
//       if (selectedType === 'buyer') {
//         // Call /contact-buyer-send
//         await axios.post(`${process.env.REACT_APP_API_URL}/contact-buyer-send`, {
//           phoneNumber: selectedPhone,
//           ba_id: selectedPpcId,
//         });
//       } else {
//         // Call /contact-send
//         await axios.post(`${process.env.REACT_APP_API_URL}/contact-send`, {
//           phoneNumber: selectedPhone,
//         });
//       }
  
//       setMessage('Contact request sent successfully!');
//       window.location.href = `tel:${selectedPhone}`;
//     } catch (error) {
//       console.error("API Error:", error);
//       setMessage('Failed to send contact request.');
//     }
//   };
  


//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => {
//         setMessage('');
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [message]);

//   // useEffect(() => {
//   //   const fetchAllAssistanceData = async () => {
//   //     try {
//   //       const assistanceResponse = await axios.get(`${process.env.REACT_APP_API_URL}/get-buyerAssistance`);
//   //       const sortedAssistanceData = assistanceResponse.data.data.sort(
//   //         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//   //       );

//   //       const interestResponse = await axios.get(`${process.env.REACT_APP_API_URL}/buyer-assistance-interests`);
//   //       const sortedInterestData = interestResponse.data.data.sort(
//   //         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//   //       );

//   //       setAssistanceData(sortedAssistanceData);
//   //       setInterestData(sortedInterestData);

//   //     } catch (err) {
//   //       setError("Error fetching assistance or interest data");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchAllAssistanceData();
//   // }, []);

//   useEffect(() => {
//     const fetchAllAssistanceData = async () => {
//       try {
//         // 👇 Updated: Fetch only assistance data for the specific phone number
//         const assistanceResponse = await axios.get(`${process.env.REACT_APP_API_URL}/get-buyerAssistance/${phoneNumber}`);
//         const sortedAssistanceData = assistanceResponse.data.data.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
  
//         const interestResponse = await axios.get(`${process.env.REACT_APP_API_URL}/buyer-assistance-interests`);
//         const sortedInterestData = interestResponse.data.data.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
  
//         setAssistanceData(sortedAssistanceData);
//         setInterestData(sortedInterestData);
  
//       } catch (err) {
//         setError("Error fetching assistance or interest data");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchAllAssistanceData();
//   }, [phoneNumber]);
  

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

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

  
//   const handlePageNavigation = () => {
//     navigate('/mobileviews'); // Redirect to the desired path
//   };

//   return (
//     <div className="d-flex flex-column mx-auto custom-scrollbar"
//     style={{
//       maxWidth: '450px',
//       height: '100vh',
//       overflow: 'auto',
//       scrollbarWidth: 'none', 
//       msOverflowStyle: 'none', 
//       fontFamily: 'Inter, sans-serif'
//     }}>
//     <div
//       className="d-flex flex-column justify-content-center align-items-center"
//       style={{ padding: "10px", gap: "15px", borderRadius: "10px", overflowY: "auto", scrollbarWidth: "none",     // Firefox
//         msOverflowStyle: "none", }}
//       onWheel={handleWheelScroll}
//       ref={scrollContainerRef}
//     >
//       <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
//                     <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
//                   </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>BuyerList</h3> </div>

//       <h5>Buyer List Datas</h5>
//       {message && <div className="alert text-success text-bold">{message}</div>}

//       {assistanceData.length > 0 ? (
//         assistanceData.map((card) => (
//           <div
//             key={card._id}
//             className="card p-1"
//             style={{ width: "450px", border: "1px solid #ddd", borderRadius: "10px", marginBottom: "15px", fontFamily: "Inter, sans-serif" }}
//           >
//             <div className="row d-flex align-items-center">
//               <div className="col-3 d-flex align-items-center justify-content-center mb-1">
//                 <img
//                   src={profil}
//                   alt="Profile"
//                   className="rounded-circle mt-2"
//                   style={{ width: "60px", height: "60px", objectFit: "cover" }}
//                 />
//               </div>
//               <div className='p-0' style={{ background: "#707070", width: "1px", height: "80px" }}></div>
//               <div className="col-7 p-0 ms-4">
//                 <div className="d-flex justify-content-between">
//                   <p className="m-0" style={{ fontSize: "12px", color: "#5E5E5E", fontWeight: "500" }}>
//                     BA ID: {card.ba_id}
//                   </p>
//                   <p className="m-0" style={{ fontSize: "12px", color: "#5E5E5E", fontWeight: "500" }}>
//                     <MdCalendarMonth size={12} className="me-2" color="#019988" />
//                     {card.createdAt.slice(0, 10)}
//                   </p>
//                 </div>
//                 <h5 className="mb-1" style={{ fontSize: "16px", color: "#000", fontWeight: "500" }}>
//                   {card.baName || "Unknown Buyer"} <span className="text-muted" style={{ fontSize: "12px" }}>| Buyer</span>
//                 </h5>
//                 <div className="d-flex align-items-center col-8">
//                   <p className="mb-0 d-flex align-items-center me-3" style={{ fontSize: "12px", fontWeight: 500 }}>
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
//               {/* <div
//                 className="d-flex align-items-center overflow-auto mb-0 p-1 rounded-1"
//                 style={{ whiteSpace: "nowrap", overflowX: "hidden", border: "1px solid #019988" }}
//                 onWheel={handleIconScroll}
//                 ref={iconContainerRef}
//               > */}

// <div
//   className="d-flex align-items-center overflow-auto mb-0 p-1 rounded-1 hide-scrollbar"
//   style={{
//     whiteSpace: "nowrap",
//     overflowX: "auto",          // enable horizontal scroll
//     scrollbarWidth: "none",     // Firefox
//     msOverflowStyle: "none",    // IE/Edge
//     border: "1px solid #019988"
//   }}
//   onWheel={handleIconScroll}
//   ref={iconContainerRef}
// >

//                 <div className="d-flex align-items-center me-3">
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
//                 <p className="mb-0" style={{ fontWeight: 600, fontSize: "12px" }}>
//                   <TfiLocationPin size={16} className="me-2" color="#019988" />
//                   {card.area}, {card.city}
//                 </p>
//               </div>

//               <div className="d-flex justify-content-between align-items-center mt-2">
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

//                 <button
//                   className="btn ms-5 text-white px-3 py-1"
//                   style={{ background: "orangered", fontSize: "13px" }}
//                   onClick={() => navigate(`/detail-buyer-assistance/${card._id}`)}
//                 >
//                   Send Interest
//                 </button>

//                 {/* <button
//                   className="btn text-white px-3 py-1 flex-grow-1 mx-1"
//                   style={{ background: "#2F747F", width: "80px", fontSize: "13px" }}
//                   // onClick={() =>
//                   //   handleConfirmCall(
//                   //     card.interestedUserPhone || card.phoneNumber,
//                   //     card.ba_id
//                   //   )
//                   // }
//                   onClick={() =>
//                     handleConfirmCall(
//                       card.interestedUserPhone ? card.interestedUserPhone : card.phoneNumber,
//                       card.ba_id
//                     )
//                   }
                  
//                 >
//                   Call
//                 </button> */}

// <button
//   className="btn text-white px-3 py-1 flex-grow-1 mx-1"
//   style={{ background: "#2F747F", width: "80px", fontSize: "13px" }}
//   onClick={() =>
//     handleConfirmCall(
//       card.interestedUserPhone ? 'buyer' : 'owner',
//       card.interestedUserPhone || card.phoneNumber,
//       card.ba_id
//     )
//   }
// >
//   Call
// </button>




//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No buyer assistance interests found.</p>
//       )}

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
//   );
// };

// export default BuyerList;



















// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import profil from '../Assets/xd_profile.png';
// import { MdOutlineCall, MdOutlineMapsHomeWork, MdCalendarMonth, MdOutlineBed, MdOutlineTimer } from "react-icons/md";
// import { RiStairsLine } from "react-icons/ri"; // Corrected import
// import { LuIndianRupee } from "react-icons/lu";
// import { GoHome } from "react-icons/go";
// import { TfiLocationPin } from "react-icons/tfi";
// import { FaArrowDown, FaArrowUp } from "react-icons/fa";

// const BuyerLists = () => {
//   const [assistanceData, setAssistanceData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const scrollContainerRef = useRef(null);
//   const iconContainerRef = useRef(null);

//   // Fetch data on component mount
//   useEffect(() => {
//     const fetchAssistanceData = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/buyer-assistance-interests`);
//         setAssistanceData(response.data.data);
//       } catch (err) {
//         setError("Error fetching data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAssistanceData();
//   }, []);

//   // Handle scroll events for container and icons
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

//   // Handle loading and error states
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div
//       className="d-flex flex-column justify-content-center align-items-center"
//       style={{
//         height: "auto",
//         padding: "10px",
//         gap: "15px",
//         borderRadius: "10px",
//         overflowY: "auto", 
//       }}
//       onWheel={handleWheelScroll}
//       ref={scrollContainerRef}
//     >
//       <h5>Buyer List Datas</h5>
//       {assistanceData.length > 0 ? (
//         assistanceData.map((card) => (
//           <div
//             key={card._id}
//             className="card p-1"
//             style={{
//               width: "450px", 
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
//               <div className="col-9 p-0">
//                 <div className="d-flex justify-content-between">
//                   <p className="m-0" style={{ color: "#5E5E5E", fontWeight: "normal" }}>
//                     BA ID: {card.ba_id}
//                   </p>
//                   {/* <p
//                     className="mb-0 ps-3 pe-3 text-center pt-1 pb-1 position-absolute top-0 end-0"
//                     style={{
//                       background: "#FF0000", 
//                       color: "white", 
//                       cursor: "pointer", 
//                       borderRadius: '0px 0px 0px 15px', 
//                       fontSize: "12px"
//                     }}
//                   >
//                     UNDO
//                   </p> */}
//                 </div>
//                 <h5 className="mb-1">
//                   {card.phoneNumber || "Unknown Buyer"} |{" "}
//                   <span className="text-muted" style={{ fontSize: "12px" }}>
//                     Buyer
//                   </span>
//                 </h5>
//                 <div className="d-flex justify-content-between align-items-center col-8">
//                 <div className="d-flex justify-content-between align-items-center col-8">
 
//   <div className="d-flex">
//     <p className="mb-0 d-flex align-items-center me-3">
//       <span className="text-muted"><FaArrowDown /> Price: </span>
//       <LuIndianRupee color="#019988" className="me-2" />
//       {card.minPrice}
//     </p>
//     <p className="mb-0 d-flex align-items-center">
//       <span className="text-muted"><FaArrowUp /> Price: </span>
//       <LuIndianRupee color="#019988" className="me-2" />
//       {card.maxPrice}
//     </p>
//   </div>
// </div>

// </div>

//               </div>
//             </div>

//             <div className="p-1">
//               <div
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
//               >
//                 <div className="d-flex align-items-center me-3">
//                   <GoHome size={20} className="me-2" color="#019988" />
//                   <p className="mb-0 small">{card.propertyMode}</p>
//                 </div>
//                 <div className="d-flex align-items-center me-3">
//                   <MdOutlineMapsHomeWork size={20} className="me-2" color="#019988" />
//                   <p className="mb-0 small">{card.propertyType}</p>
//                 </div>
//                 <div className="d-flex align-items-center me-3">
//                   <MdCalendarMonth size={20} className="me-2" color="#019988" />
//                   <p className="mb-0 small">{card.paymentType}</p>
//                 </div>
//                 <div className="d-flex align-items-center me-3">
//                   <MdOutlineBed size={20} className="me-2" color="#019988" />
//                   <p className="mb-0 small">{card.noOfBHK} BHK</p>
//                 </div>
//                 <div className="d-flex align-items-center me-3">
//                   <RiStairsLine size={20} className="me-2" color="#019988" />
//                   <p className="mb-0 small">{card.propertyAge}</p>
//                 </div>
//                 <div className="d-flex align-items-center me-3">
//                   <MdOutlineTimer size={20} className="me-2" color="#019988" />
//                   <p className="mb-0 small">{card.updatedAt.slice(0, 10)}</p>
//                 </div>
//               </div>

//               <div className="mb-0">
//                 <p className="mb-0">
//                   <TfiLocationPin size={16} className="me-2" color="#019988" />
//                   {card.area}, {card.city}
//                 </p>
//               </div>

//               <div className="d-flex justify-content-between align-items-center">
//                 <div className="d-flex align-items-center">
//                   <MdOutlineCall color="#019988" style={{ fontSize: "20px", marginRight: "8px" }} />
//                   <div>
//                     <h6 className="m-0 text-muted mt-1 fw-bold" style={{ fontSize: "11px" }}>Interested Owner Phone</h6>
//                     {/* <span className="card-text" style={{ color: "grey" }}>
//                       {card.interestedUserPhone ? `${card.interestedUserPhone.slice(0, -5)}*****` : "N/A"}
//                     </span> */}
//                     <span>{card.interestedUserPhone}</span>
                  
//                   </div>
//                 </div>
//                 <div>
//                   {/* <button className="btn btn-sm me-2" style={{ background: "#019988", color: "#fff" }}>
//                     SEND INTEREST
//                   </button>
//                   <button className="btn btn-primary btn-sm">MORE</button>
//                    */}
//                   <button
//               className="btn text-white px-3 py-1 flex-grow-1 mx-1"
//               style={{ background:  "#2F747F", width: "80px", fontSize: "13px" }}
//               onClick={() => (window.location.href = `tel:${ card.interestedUserPhone}`)}

//            >
//               Call
//             </button>   
                  
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No buyer assistance interests found.</p>
//       )}
//     </div>
//   );
// };

// export default BuyerLists;






// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import profil from '../Assets/xd_profile.png';
// import { MdOutlineCall, MdOutlineMapsHomeWork, MdCalendarMonth, MdOutlineBed, MdOutlineTimer } from "react-icons/md";
// import { RiStairsLine } from "react-icons/ri"; // Corrected import
// import { LuIndianRupee } from "react-icons/lu";
// import { GoHome } from "react-icons/go";
// import { TfiLocationPin } from "react-icons/tfi";
// import { FaArrowDown, FaArrowUp } from "react-icons/fa";
// import maxrupe from '../Assets/Price maxi-01.png';
// import minrupe from '../Assets/Price Mini-01.png';
// const BuyerLists = () => {
//   const [assistanceData, setAssistanceData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const scrollContainerRef = useRef(null);
//   const iconContainerRef = useRef(null);

//   const [showConfirmation, setShowConfirmation] = useState(false);
// const [selectedPhone, setSelectedPhone] = useState('');
// const [selectedPpcId, setSelectedPpcId] = useState('');
// const [message, setMessage] = useState('');
// const [showPopup, setShowPopup] = useState(false);



// // Handle confirmed call
// const handleCallAndContact = async (phoneNumber,ba_id) => {
//   try {
//     // Call the API
//     await axios.post(`${process.env.REACT_APP_API_URL}/contact`, {
//       phoneNumber,
// ba_id,
//     });

//     setMessage('Contact request sent successfully!');
  
//     // Trigger phone dialer
//     window.location.href = `tel:${phoneNumber}`;
//   } catch (error) {
//     setMessage('Failed to send contact request.');
//   } 
// };


//    // Fetch data on component mount
//    useEffect(() => {
//     const fetchAssistanceData = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-buyerAssistance`);
//         const sortedData = response.data.data.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setAssistanceData(sortedData);
//         // setAssistanceData(response.data.data);
//       } catch (err) {
//         setError("Error fetching data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAssistanceData();
//   }, []);

//   // Handle scroll events for container and icons
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

//   // Handle loading and error states
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div
//       className="d-flex flex-column justify-content-center align-items-center"
//       style={{
//         height: "auto",
//         padding: "10px",
//         gap: "15px",
//         borderRadius: "10px",
//         overflowY: "auto", 
//       }}
//       onWheel={handleWheelScroll}
//       ref={scrollContainerRef}
//     >
//       <h5>Buyer List Datas</h5>

//       <div>
//       {message && <div className="alert text-success text-bold">{message}</div>}
//       {/* Your existing component structure goes here */}
//     </div>
//       {assistanceData.length > 0 ? (
//         assistanceData.map((card) => (
//           <div
//             key={card._id}
//             className="card p-1"
//             style={{
//               width: "450px", 
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
//             style={{ width: "60px", height: "60px", objectFit: "cover" }}
// />
//               </div>
//                  <div className='p-0' style={{background:"#707070", width:"1px", height:"80px"}}></div>

//                   <div className="col-7 p-0 ms-4">
//               <div className="d-flex justify-content-between">
//                      <p className="m-0" style={{ color: "#5E5E5E",fontWeight: "500",fontSize:"12px"}}>
//               BA ID: {card.ba_id}
//                   </p>
//                   <p className="m-0" style={{ color: "#5E5E5E",fontWeight: "500",fontSize:"12px"}}>
//             <MdCalendarMonth size={12} className="me-2" color="#019988" />
// <span style={{fontSize:"12px" ,color:"#474747" , fontWeight:600}}>{card.createdAt.slice(0, 10)}</span>
//             </p>
//                               </div>
              
//                 <h5 className="mb-1" style={{ color: "#000000", fontWeight: "500",fontSize:"16px" }}>
//                 {card.baName || "Unknown Buyer"} | {" "}  <span className="text-muted" style={{ fontSize: "12px" }}>| Buyer</span>
//           </h5>
//           <div className="d-flex align-items-center col-8">
 
//           <p className="mb-0 d-flex align-items-center me-3" style={{fontSize:"12px", fontWeight:500, color:"#474747"}}>
//           <img src={minrupe} alt="" width={13}className="me-2"/>
//           {card.minPrice}
//     </p>
//     <p className="mb-0 d-flex align-items-center" style={{fontSize:"12px", fontWeight:500, color:"#474747"}}>
//     <img src={maxrupe} alt="" width={13}className="me-2"/>
//     {card.maxPrice}
//     </p>
// </div>
//               </div>
//             </div>

//             <div className="p-1">
//               <div
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
//               >
//                 <div className="d-flex align-items-center me-3">
//                   <GoHome size={12} className="me-2" color="#019988" />
//                   <p className="mb-0 " style={{fontSize:"12px", color:"#474747"}}>{card.propertyMode}</p>
//                 </div>
//                 <div className="d-flex align-items-center me-3">
//                   <MdOutlineMapsHomeWork size={12} className="me-2" color="#019988" />
//                   <p className="mb-0 " style={{fontSize:"12px", color:"#474747"}}>{card.propertyType}</p>
//                 </div>
//                 <div className="d-flex align-items-center me-3">
//                   <MdCalendarMonth size={12} className="me-2" color="#019988" />
//                   <p className="mb-0 "style={{fontSize:"12px", color:"#474747"}}>{card.paymentType}</p>
//                 </div>
//                 <div className="d-flex align-items-center me-3">
//                   <MdOutlineBed size={12} className="me-2" color="#019988" />
//                   <p className="mb-0 "style={{fontSize:"12px", color:"#474747"}}>{card.bedrooms} BHK</p>
//                 </div>
//                 <div className="d-flex align-items-center me-3">
//                   <RiStairsLine size={12} className="me-2" color="#019988" />
//                   <p className="mb-0 "style={{fontSize:"12px", color:"#474747"}}>{card.propertyAge}</p>
//                 </div>
             
//               </div>

//               <div className="mb-0 mt-1">
//               <p className="mb-0" style={{fontWeight:600 , fontSize:"12px", color:"#474747"}}>
//               <TfiLocationPin size={16} className="me-2" color="#019988" />
//                   {card.area}, {card.city}
//                 </p>
//               </div>

//               <div className="d-flex justify-content-between align-items-center mt-2">
//                 <div className="d-flex align-items-center">
//                 <MdOutlineCall color="#019988" style={{ fontSize: "12px", marginRight: "8px" }} />
//                 <div>
                // <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>Buyer Phone:
                // {/* {card.interestedUserPhone ? `${card.interestedUserPhone.slice(0, -5)}*****` : "N/A"} */}

                // {card.phoneNumber ? `${card.phoneNumber.slice(0, -5)}*****` : "N/A"}


                // </h6>                 
                  
//                   </div>
//                 </div>
//                 <div>
//                 <div className="d-flex justify-content-end align-items-center m-0">

//                   {/* <button
//               className="btn text-white px-3 py-1 flex-grow-1 mx-1"
//               style={{ background:  "#2F747F", width: "80px", fontSize: "13px" }}
//               onClick={() => (window.location.href = `tel:${ card.interestedUserPhone}`)}

//            >
//               Call
//             </button>    */}

// <button
//   className="btn text-white px-3 py-1 flex-grow-1 mx-1"
//   style={{ background: "#2F747F", width: "80px", fontSize: "13px" }}
//   onClick={() => handleCallAndContact(card.phoneNumber, card.ba_id)}
// >
//   Call
// </button>




//             </div>

//                 </div>
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No buyer assistance interests found.</p>
//       )}
//     </div>
//   );
// };

// export default BuyerLists;



























// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import profil from "../Assets/xd_profile.png";
// import { MdOutlineCall, MdOutlineMapsHomeWork, MdCalendarMonth, MdOutlineBed, MdOutlineTimer } from "react-icons/md";
// import { RiStairsLine } from "react-icons/ri";
// import { LuIndianRupee } from "react-icons/lu";
// import { GoHome } from "react-icons/go";
// import { TfiLocationPin } from "react-icons/tfi";
// import maxrupe from "../Assets/Price maxi-01.png";
// import minrupe from "../Assets/Price Mini-01.png";
// import { Navigate, useNavigate } from "react-router-dom";

// const BuyerLists = () => {
//   const [assistanceData, setAssistanceData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState('');
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedPhone, setSelectedPhone] = useState('');
//   const [selectedPpcId, setSelectedPpcId] = useState('');
//   const [interestData, setInterestData] = useState([]); // new for interest

//   const navigate = useNavigate(); // Initialize navigate

//   const scrollContainerRef = useRef(null);
//   const iconContainerRef = useRef(null);


  
//   const handleConfirmCall = (phoneNumber, ba_id) => {
//     setSelectedPhone(phoneNumber);
//     setSelectedPpcId(ba_id);
//     setShowPopup(true);
//   };
  
//   const handlePopupResponse = async (confirmed) => {
//     setShowPopup(false);
//     if (confirmed && selectedPhone) {
//       try {
//         await axios.post(`${process.env.REACT_APP_API_URL}/contact-send`, {
//           phoneNumber: selectedPhone,
//         });
//         setMessage('Contact request sent successfully!');
//         window.location.href = `tel:${selectedPhone}`;
//       } catch (error) {
//         console.error("API Error:", error);
//         setMessage('Failed to send contact request.');
//       }
//     }
//   };
  

  
//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => {
//         setMessage('');
//       }, 3000); // 3000ms = 3 seconds

//       return () => clearTimeout(timer); // Cleanup on unmount or message change
//     }
//   }, [message]);


//   // useEffect(() => {
//   //   const fetchAssistanceData = async () => {
//   //     try {
//   //       const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-buyerAssistance`);
//   //       const sortedData = response.data.data.sort(
//   //         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//   //       );
//   //       setAssistanceData(sortedData);
//   //     } catch (err) {
//   //       setError("Error fetching data");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchAssistanceData();
//   // }, []);


//   useEffect(() => {
//     const fetchAllAssistanceData = async () => {
//       try {
//         // Fetch buyer assistance
//         const assistanceResponse = await axios.get(`${process.env.REACT_APP_API_URL}/get-buyerAssistance`);
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
//         setError("Error fetching assistance or interest data");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchAllAssistanceData();
//   }, []);
  

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

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div
//       className="d-flex flex-column justify-content-center align-items-center"
//       style={{
//         padding: "10px",
//         gap: "15px",
//         borderRadius: "10px",
//         overflowY: "auto",
//       }}
//       onWheel={handleWheelScroll}
//       ref={scrollContainerRef}
//     >
//       <h5>Buyer List Datas</h5>

//       {message && <div className="alert text-success text-bold">{message}</div>}

//       {assistanceData.length > 0 ? (
//         assistanceData.map((card) => (
//           <div
//             key={card._id}
//             className="card p-1"
//             style={{
//               width: "450px",
//               border: "1px solid #ddd",
//               borderRadius: "10px",
//               marginBottom: "15px",
//               fontFamily: "Inter, sans-serif",
//             }}
//           >
//             <div className="row d-flex align-items-center">
//               <div className="col-3 d-flex align-items-center justify-content-center mb-1">
//                 <img
//                   src={profil}
//                   alt="Profile"
//                   className="rounded-circle mt-2"
//                   style={{ width: "60px", height: "60px", objectFit: "cover" }}
//                 />
//               </div>
//               <div className='p-0' style={{ background: "#707070", width: "1px", height: "80px" }}></div>
//               <div className="col-7 p-0 ms-4">
//                 <div className="d-flex justify-content-between">
//                   <p className="m-0" style={{ fontSize: "12px", color: "#5E5E5E", fontWeight: "500" }}>
//                     BA ID: {card.ba_id}
//                   </p>
//                   <p className="m-0" style={{ fontSize: "12px", color: "#5E5E5E", fontWeight: "500" }}>
//                     <MdCalendarMonth size={12} className="me-2" color="#019988" />
//                     {card.createdAt.slice(0, 10)}
//                   </p>
//                 </div>
//                 <h5 className="mb-1" style={{ fontSize: "16px", color: "#000", fontWeight: "500" }}>
//                   {card.baName || "Unknown Buyer"} <span className="text-muted" style={{ fontSize: "12px" }}>| Buyer</span>
//                 </h5>
//                 <div className="d-flex align-items-center col-8">
//                   <p className="mb-0 d-flex align-items-center me-3" style={{ fontSize: "12px", fontWeight: 500 }}>
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
//               <div
//                 className="d-flex align-items-center overflow-auto mb-0 p-1 rounded-1"
//                 style={{
//                   whiteSpace: "nowrap",
//                   overflowX: "auto",
//                   border: "1px solid #019988",
//                 }}
//                 onWheel={handleIconScroll}
//                 ref={iconContainerRef}
//               >
//                 <div className="d-flex align-items-center me-3">
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
//                 <p className="mb-0" style={{ fontWeight: 600, fontSize: "12px" }}>
//                   <TfiLocationPin size={16} className="me-2" color="#019988" />
//                   {card.area}, {card.city}
//                 </p>
//               </div>

//               <div className="d-flex justify-content-between align-items-center mt-2">
               
//                 <div className="d-flex align-items-center">
//                   <MdOutlineCall color="#019988" style={{ fontSize: "12px", marginRight: "8px" }} />
//                   {/* <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
//                     Buyer Phone: {card.phoneNumber ? `${card.phoneNumber.slice(0, -5)}*****` : "N/A"}
//                   </h6> */}

// <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
//   {card.interestedUserPhone
//     ? `Interested Owner: ${card.interestedUserPhone.slice(0, -5)}*****`
//     : card.phoneNumber
//     ? `Buyer Phone: ${card.phoneNumber.slice(0, -5)}*****`
//     : "Phone: N/A"}
// </h6>


//                 </div>


//                 {/* <button
//                  className="btn ms-5  text-white px-3 py-1"
//                  style={{ background: "orangered", fontSize: "13px" }}>
//                   More
//                 </button> */}

// <button
//       className="btn ms-5 text-white px-3 py-1"
//       style={{ background: "orangered", fontSize: "13px" }}
//       onClick={() => navigate(`/detail-buyer-assistance/${card._id}`)}
//     >
//       More
//     </button>
//                 {/* <button
//                   className="btn text-white px-3 py-1"
//                   style={{ background: "#2F747F", fontSize: "13px" }}
//                   onClick={() => handleConfirmCall(card.phoneNumber)}
//                 >
//                   Call
//                 </button> */}

// <button
//   className="btn text-white px-3 py-1 flex-grow-1 mx-1"
//   style={{ background: "#2F747F", width: "80px", fontSize: "13px" }}
//   onClick={() =>
//     handleConfirmCall(
//       card.interestedUserPhone ? card.interestedUserPhone : card.phoneNumber,
//       card.ba_id
//     )
//   }
// >
//   Call
// </button>
// {/* 
// <button
//   className="btn text-white px-3 py-1 flex-grow-1 mx-1"
//   style={{ background: "#2F747F", width: "80px", fontSize: "13px" }}
//   onClick={() =>
//     handleConfirmCall(
//       card.interestedUserPhone || card.phoneNumber,
//       card.ba_id
//     )
//   }
// >
//   Call
// </button> */}


//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No buyer assistance interests found.</p>
//       )}

//       {/* Confirmation Popup */}
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
//   );
// };

// export default BuyerLists;











import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import profil from "../Assets/xd_profile.png";
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
        `${process.env.REACT_APP_API_URL}/update-status-buyer-assistance/${id}`,
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
        const assistanceResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/get-buyerAssistance/${phoneNumber}`
        );
        const sortedAssistanceData = assistanceResponse.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        const interestResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/buyer-assistance-interests`
        );
        const sortedInterestData = interestResponse.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setAssistanceData(sortedAssistanceData);
        setInterestData(sortedInterestData);
      } catch (err) {
        setError("Error fetching assistance or interest data");
      } finally {
        setLoading(false);
      }
    };

    fetchAllAssistanceData();
  }, [phoneNumber]);

  const handleWheelScroll = (e) => {
    if (scrollContainerRef.current) {
      e.preventDefault();
      scrollContainerRef.current.scrollTop += e.deltaY;
    }
  };

  const handleIconScroll = (e) => {
    if (iconContainerRef.current) {
      e.preventDefault();
      const scrollAmount = e.deltaX || e.deltaY;
      iconContainerRef.current.scrollLeft += scrollAmount;
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


   
 

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ padding: "10px", gap: "15px", borderRadius: "10px", overflowY: "auto" }}
      onWheel={handleWheelScroll}
      ref={scrollContainerRef}
    >
         <div className='d-flex flex-column ' style={{maxWidth:"500px", width:"100%"}}>
    <div className="d-flex align-items-center justify-content-start w-100 pt-2 pb-2" style={{background:"#EFEFEF" }}>
              <button className="pe-5"
               onClick={() => navigate('/mobileviews')}
               ><FaArrowLeft color="#30747F"/> 
            </button> <h3 className="m-0 ms-3" style={{fontSize:"15px", fontWeight:"bold"}}> BUYER LIST</h3> </div>

      <h5 className="text-center mt-2">Buyer List Datas</h5>
      {message && <div className="alert text-success fw-bold">{message}</div>}

      {assistanceData.length > 0 ? (
        assistanceData.map((card) => (
         
          <div
  key={card._id}
  className="card p-1"
  style={{
    width: "450px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    marginBottom: "15px",
    fontFamily: "Inter, sans-serif",
    cursor: "pointer", // make it look clickable
  }}
  onClick={() => navigate(`/detail-buyer-assistance/${card._id}`)}
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
                  {card.baName || "Unknown Buyer"}{" "}
                  <span className="text-muted" style={{ fontSize: "12px" }}>
                    | Buyer
                  </span>
                </h5>
                <div className="d-flex align-items-center col-8">
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
                style={{ whiteSpace: "nowrap", overflowX: "auto", border: "1px solid #019988" }}
                onWheel={handleIconScroll}
                ref={iconContainerRef}
              >
                <div className="d-flex align-items-center me-3">
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

              <div className="d-flex justify-content-between align-items-center mt-2">
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

                <button
                  className="btn text-white px-3 py-1 mx-1"
                  style={{ background: "orangered", fontSize: "13px" }}
                  onClick={() => handleSendInterest(card._id)}
                >
                  Send Interest
                </button>

                <button
                  className="btn text-white px-3 py-1 mx-1"
                  style={{ background: "#2F747F", fontSize: "13px" }}
                  onClick={() =>
                    handleConfirmCall(
                      card.interestedUserPhone ? "buyer" : "owner",
                      card.interestedUserPhone || card.phoneNumber,
                      card.ba_id
                    )
                  }
                >
                  Call
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No buyer assistance interests found.</p>
      )}

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
  );
};

export default BuyerLists;


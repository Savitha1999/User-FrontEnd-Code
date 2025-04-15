




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { Tab, Nav, Row, Col } from 'react-bootstrap';
// import { useNavigate, useParams } from 'react-router-dom';
// import { 
//   FaRupeeSign, FaBed,  
//   FaCalendarAlt, FaUserAlt, FaRulerCombined,
//   FaCamera,
//   FaEye,
//   FaPhoneAlt
// } from "react-icons/fa";
// import myImage from '../../Assets/Rectangle 146.png'; // Correct path
// import myImage1 from '../../Assets/Rectangle 145.png'; // Correct path
// import pic from '../../Assets/Default image_PP-01.png'; // Correct path
// import { MdCall } from 'react-icons/md';
// import ConfirmationModal from "../ConfirmationModal";
// import { FaArrowLeft } from "react-icons/fa";

// const App = () => {
//   const [activeKey, setActiveKey] = useState('All');
//   const [removedProperties, setRemovedProperties] = useState(() => {
//     // Load removed properties from localStorage on initial load
//     const storedRemovedProperties = localStorage.getItem('removedProperties');
//     return storedRemovedProperties ? JSON.parse(storedRemovedProperties) : [];
//   });
//   const [properties, setProperties] = useState([]);

//   const handleRemoveProperty = async (ppcId, phoneNumber) => {
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/delete-detail-property`, {
//         ppcId,
//         phoneNumber
//       });
//       if (response.status === 200) {
//         toast.success('Property removed successfully.');
//         // Remove the property from "All" tab
//         setProperties(properties.filter(property => property.ppcId !== ppcId));

//         // Add the property to "Removed" tab
//         const updatedRemovedProperties = [...removedProperties, response.data.property];
//         setRemovedProperties(updatedRemovedProperties);

//         // Save to localStorage
//         localStorage.setItem('removedProperties', JSON.stringify(updatedRemovedProperties));
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Error removing property.');
//     }
//   };

//   const handleUndoRemove = async (ppcId, phoneNumber) => {
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/undo-delete-detail`, {
//         ppcId,
//         phoneNumber,
//       });
//       if (response.status === 200) {
//         toast.success("Property status reverted successfully!");

//         const updatedProperty = response.data.property;

//         // Move property from removedProperties to properties
//         const updatedRemovedProperties = removedProperties.filter(property => property.ppcId !== ppcId);
//         setRemovedProperties(updatedRemovedProperties);
//         setProperties(prev => [...prev, updatedProperty]);

//         // Save updated state to localStorage
//         localStorage.setItem('removedProperties', JSON.stringify(updatedRemovedProperties));

//         // Switch back to "All" tab after undo
//         setActiveKey('All');
//       }
//     } catch (error) {
//       toast.error("Error undoing property status.");
//     }
//   };
//   const navigate = useNavigate();

//   const handlePageNavigation = () => {
//     navigate('/mobileviews'); // Redirect to the desired path
//   };
//   return (
//     <div style={{ maxWidth: '500px', margin: 'auto' , background:"#F7F7F7"}}>
//       <Tab.Container activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
//         <Row className="g-3">
//           <Col lg={12} className="d-flex flex-column align-items-center">
//           <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" , fontFamily: 'Inter, sans-serif' }}>
//           <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
//         </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>  VIEWED OWNER </h3> </div>
//             <Nav variant="tabs" className="mb-3" style={{ width: '100%' }}>
//               <Nav.Item style={{ flex: '1' }}>
//                 <Nav.Link eventKey="All" style={{ backgroundColor: '#30747F', color: 'white', textAlign: 'center' }}>All</Nav.Link>
//               </Nav.Item>
//               <Nav.Item style={{ flex: '1' }}>
//                 <Nav.Link eventKey="removed" style={{ backgroundColor: '#FFFFFF', color: 'grey', textAlign: 'center' }}>Removed</Nav.Link>
//               </Nav.Item>
//             </Nav>
//             <Tab.Content>
//               <Tab.Pane eventKey="All">
//                 <ViewedOwner properties={properties} onRemove={handleRemoveProperty} setProperties={setProperties} setRemovedProperties={setRemovedProperties} />
//               </Tab.Pane>
//               <Tab.Pane eventKey="removed">
//                 <RemovedProperties removedProperties={removedProperties} onUndo={handleUndoRemove} />
//               </Tab.Pane>
//             </Tab.Content>
//           </Col>
//         </Row>
//       </Tab.Container>
//     </div>
//   );
// };


// const ViewedOwner = ({ property, properties, onRemove, setProperties, setRemovedProperties }) => {
//   const { phoneNumber } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [removedProperties, setRemovedPropertiesLocal] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [actionType, setActionType] = useState(""); // "remove" or "call"
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleConfirm = async () => {
//     if (!selectedProperty) return;

//     if (actionType === "remove") {
//       handleRemove(selectedProperty.ppcId, selectedProperty.postedUserPhoneNumber);
//     } else if (actionType === "call") {
//       try {
//         const response = await axios.post(`${process.env.REACT_APP_API_URL}/contact`, {
//           phoneNumber,
//           ppcId: selectedProperty.ppcId
//         });

//         if (response.data.success) {
//           setMessage("Contact request sent successfully!");
//         } else {
//           setMessage(response.data.message || "Failed to send contact request.");
//         }
//       } catch (error) {
//         setMessage("Error sending contact request.");
//       }
//     }

//     setShowPopup(false);
//     setSelectedProperty(null);
//   };

//   const openPopup = (type, property) => {
//     setActionType(type);
//     setSelectedProperty(property);
//     setShowPopup(true);
//   };

//   useEffect(() => {
//     const storedRemovedProperties = localStorage.getItem("removedProperties");
//     if (storedRemovedProperties) {
//       setRemovedPropertiesLocal(JSON.parse(storedRemovedProperties));
//     }

//     if (!phoneNumber) {
//       setMessage("Phone number is missing.");
//       setLoading(false);
//       return;
//     }

//     const fetchViewedProperties = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/property-owner-viewed-users`, {
//           params: { phoneNumber }
//         });
//         if (response.status === 200) {
//           setProperties(response.data.properties);
//         } else {
//           setMessage("No properties found with your interest.");
//         }
//       } catch (error) {
//         setMessage("Error fetching properties.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchViewedProperties();
//   }, [phoneNumber, setProperties]);

//   useEffect(() => {
//     if (removedProperties.length > 0) {
//       localStorage.setItem("removedProperties", JSON.stringify(removedProperties));
//     }
//   }, [removedProperties]);

//   const availableProperties = properties.filter(
//     (property) => !removedProperties.some((removed) => removed.ppcId === property.ppcId)
//   );

//   const handleRemove = (ppcId, phoneNumber) => {
//     const updatedRemovedProperties = [...removedProperties, { ppcId, phoneNumber }];
//     setRemovedPropertiesLocal(updatedRemovedProperties);
//     setRemovedProperties(updatedRemovedProperties);
//     onRemove(ppcId, phoneNumber);
//   };

//   return (
//     <div className="container" style={{ fontFamily: "Inter, sans-serif" }}>
//       {message && (
//         <div style={{ background: "#e6f4f1", color: "#2F747F", padding: "10px", borderRadius: "5px", margin: "10px 0" }}>
//           {message}
//         </div>
//       )}

//       <div className="row mt-4 rounded-4">
//         {availableProperties.map((property) => (
//           <div
//             key={property.ppcId}
//             className="row g-0 rounded-4 mb-2"
//             style={{ border: "1px solid #ddd", background: "#EFEFEF", overflow: "hidden" }}
//           >
//             <div className="col-md-4 col-4 d-flex flex-column justify-content-between align-items-center">
//               <div className="text-white py-1 px-2 text-center" style={{ width: "100%", background: "#2F747F" }}>
//                 PUC- {property.ppcId}
//               </div>
//               <div style={{ position: "relative", width: "100%", height: "160px" }}>
//                 <img
//                   src={property.photos?.length ? `http://localhost:5006/${property.photos[0]}` : pic}
//                   alt="Property"
//                   className="img-fluid"
//                   style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                 />
//                 <div className="d-flex justify-content-between w-100" style={{ position: "absolute", bottom: "0px" }}>
//                   <span
//                     className="d-flex justify-content-center align-items-center"
//                     style={{
//                       color: "#fff",
//                       background: `url(${myImage}) no-repeat center center`,
//                       backgroundSize: "cover",
//                       fontSize: "12px",
//                       width: "50px"
//                     }}
//                   >
//                     <FaCamera className="me-1" /> {property.propertyDetails?.photos?.length || 0}
//                   </span>
//                   <span
//                     className="d-flex justify-content-center align-items-center"
//                     style={{
//                       color: "#fff",
//                       background: `url(${myImage1}) no-repeat center center`,
//                       backgroundSize: "cover",
//                       fontSize: "12px",
//                       width: "50px"
//                     }}
//                   >
//                     <FaEye className="me-1" /> {property.propertyDetails?.views || 0}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-8 col-8 ps-2">
//               <div className="d-flex justify-content-between">
//                 <p className="m-0" style={{ color: "#5E5E5E" }}>{property.propertyMode || "N/A"}</p>
//                 <p
//                   className="mb-0 ps-3 pe-3 text-center pt-1"
//                   style={{
//                     background: "#FF0000",
//                     color: "white",
//                     cursor: "pointer",
//                     borderRadius: "0px 0px 0px 15px",
//                     fontSize: "12px"
//                   }}
//                   onClick={() => openPopup("remove", property)}
//                 >
//                   REMOVED
//                 </p>
//               </div>

//               <p className="fw-bold m-0" style={{ color: "#000000" }}>{property.propertyType || "N/A"}</p>
//               <p className="m-0" style={{ color: "#5E5E5E" }}>{property.city || "N/A"}</p>

//               <div className="row p-2">
//                 <div className="col-6 d-flex align-items-center p-1">
//                   <FaRulerCombined className="me-2" color="#2F747F" />
//                   <span style={{ fontSize: "13px", color: "#5E5E5E" }}>
//                     {property.totalArea || "N/A"} {property.areaUnit || "N/A"}
//                   </span>
//                 </div>
//                 <div className="col-6 d-flex align-items-center p-1">
//                   <FaBed className="me-2" color="#2F747F" />
//                   <span style={{ fontSize: "13px", color: "#5E5E5E" }}>
//                     {property.bedrooms || "N/A"} BHK
//                   </span>
//                 </div>
//                 <div className="col-6 d-flex align-items-center p-1">
//                   <FaUserAlt className="me-2" color="#2F747F" />
//                   <span style={{ fontSize: "13px", color: "#5E5E5E" }}>{property.postedBy || "N/A"}</span>
//                 </div>
//                 <div className="col-6 d-flex align-items-center p-1">
//                   <FaCalendarAlt className="me-2" color="#2F747F" />
//                   <span style={{ fontSize: "13px", color: "#5E5E5E" }}>
//                     {property.createdAt
//                       ? new Date(property.createdAt).toLocaleDateString("en-IN", {
//                           year: "numeric",
//                           month: "short",
//                           day: "numeric"
//                         })
//                       : "N/A"}
//                   </span>
//                 </div>
//                 <div className="col-12 p-1">
//                   <h6 className="m-0">
//                     <span style={{ fontSize: "15px", color: "#2F747F", fontWeight: "bold" }}>
//                       <FaRupeeSign className="me-2" /> {property.price?.toLocaleString("en-IN") || "N/A"}
//                     </span>
//                     <span style={{ fontSize: "11px", marginLeft: "5px", color: "#2F747F" }}>
//                       Negotiable
//                     </span>
//                   </h6>
//                 </div>
//                 <p className="p-1 mb-2">
//                   <span
//                     onClick={() => openPopup("call", property)}
//                     style={{ textDecoration: "none", color: "#2E7480", cursor: "pointer" }}
//                   >
//                     <MdCall className="me-2" color="#2F747F" /> {property.phoneNumber || "N/A"}
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <ConfirmationModal
//         show={showPopup}
//         message={`Are you sure you want to ${actionType === "remove" ? "remove this property" : "call this owner"}?`}
//         onConfirm={handleConfirm}
//         onCancel={() => setShowPopup(false)}
//       />
//     </div>
//   );
// };

// const RemovedProperties = ({ property, removedProperties, onUndo }) => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [actionType, setActionType] = useState(""); // "remove" or "undo"

//   const handleConfirm = () => {
//     if (actionType === "undo") {
//       onUndo(property.ppcId, property.postedUserPhoneNumber);
//     } 
//     setShowPopup(false);
//   };

//   const openPopup = (type) => {
//     setActionType(type);
//     setShowPopup(true);
//   };
//   return (

// <div className="container mt-5">
// <h3 className="text-center mb-4">Removed Properties</h3>
// <div className="row">
//   {removedProperties.length > 0 ? (
//     removedProperties.map((property) => (
// <div className="row g-0 rounded-4 mb-2" style={{ border: '1px solid #ddd', overflow: "hidden", background: "#EFEFEF" }}>
//   <div className="col-md-4 col-4 d-flex flex-column justify-content-between align-items-center">
//     <div className="text-white py-1 px-2 text-center" style={{ width: '100%', background: "#2F747F" }}>
//       PUC- {property.ppcId}
//     </div>
//     <div style={{ position: "relative", width: "100%", height: '160px' }}>
//       <img
//         src={property.photos?.length ? `http://localhost:5006/${property.photos[0]}` : pic}
//         alt="Property"
//         className="img-fluid"
//         style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//       />
//       <div>
//         <div className="d-flex justify-content-between w-100" style={{ position: "absolute", bottom: "0px" }}>
//           <span
//             className="d-flex justify-content-center align-items-center"
//             style={{
//               color: '#fff',
//               background: `url(${myImage}) no-repeat center center`,
//               backgroundSize: "cover",
//               fontSize: '12px',
//               width: '50px'
//             }}
//           >
//             <FaCamera className="me-1" /> {property.propertyDetails?.photos?.length || 0}
//           </span>
//           <span
//             className="d-flex justify-content-center align-items-center"
//             style={{
//               color: '#fff',
//               background: `url(${myImage1}) no-repeat center center`,
//               backgroundSize: "cover",
//               fontSize: '12px',
//               width: '50px'
//             }}
//           >
//             <FaEye className="me-1" /> {property.propertyDetails?.views || 0}
//           </span>
//         </div>
//       </div>
//     </div>
//   </div>

//   <div className="col-md-8 col-8" style={{paddingLeft:"10px", background:"#F5F5F5"}}>
//   <div className="d-flex justify-content-between">
//       <p className="m-0" style={{ color: '#5E5E5E', fontWeight: 'normal' }}>
//         {property.propertyMode || 'N/A'}
//       </p>
//       {/* <p
//         className="m-0 ps-3 pe-3"
//         style={{
//           background: "green",
//           color: "white",
//           cursor: "pointer",
//           borderRadius: '0px 0px 0px 15px'
//         }}
//         onClick={() => onUndo(property.ppcId, property.postedUserPhoneNumber)}
//       >
//         UNDO
//       </p> */}
//          <p
//           className="m-0 ps-3 pe-3"
//           style={{
//             background: "green",
//             color: "white",
//             cursor: "pointer",
//             borderRadius: '0px 0px 0px 15px'
//           }}
//           onClick={() => openPopup("undo")}
//         >
//           UNDO
//         </p>
//           {showPopup && (
//         <div
//         style={{
//           position: "fixed",
//           background: "white",
//           border: "1px solid #ccc",
//           padding: "10px",
//           borderRadius: "5px",
//           boxShadow: "0 0 10px rgba(0,0,0,0.2)",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           zIndex: 1000,
//           width: "260px",
//           textAlign: "center",
//         }}         >
//             <p className="mb-1" style={{
//             color:"#007C7C", fontSize:"12px"
//           }}>
//               Are you sure you want to <strong>{actionType === "undo" ? "Recovery this property" : "Recovery this property"}</strong>?
//             </p>
//             <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
//             <button className='p-1' style={{ background:  "#2F747F", width: "80px", fontSize: "13px", border:"none" }}  onClick={handleConfirm}>Yes</button>
//               <button className="ms-3 p-1" style={{ background:  "#FF0000", width: "80px", fontSize: "13px" , border:"none"}}onClick={() => setShowPopup(false)}>No</button>
//             </div>
//         </div>
//       )}
//     </div>
//     <p className="fw-bold m-0" style={{ color: '#000000' }}>{property.propertyType || 'N/A'}</p>
//     <p className='m-0' style={{ color: '#5E5E5E' }}>{property.city || 'N/A'}</p>
//     <div className="card-body ps-2 m-0 pt-0 pe-2 d-flex flex-column justify-content-center">
//       <div className="row">
//                       <div className="col-6 d-flex align-items-center p-1">
//           <FaRulerCombined className="me-2" color="#2F747F" /> <span style={{ fontSize: '13px', color: '#5E5E5E', fontWeight: 'medium' }}>{property.totalArea || 'N/A'}</span>
//         </div>
//                       <div className="col-6 d-flex align-items-center p-1">
//           <FaBed className="me-2" color="#2F747F" /> <span style={{ fontSize: '13px', color: '#5E5E5E' }}>{property.bedrooms || 'N/A'}</span>
//         </div>
//                       <div className="col-6 d-flex align-items-center p-1">
//           <FaUserAlt className="me-2" color="#2F747F" /> <span style={{ fontSize: '13px', color: '#5E5E5E' }}>{property.ownership || 'N/A'}</span>
//         </div>
//                       <div className="col-6 d-flex align-items-center p-1">
//           <FaCalendarAlt className="me-2" color="#2F747F" /> <span style={{ fontSize: '13px', color: '#5E5E5E' }}>{property.bestTimeToCall || 'N/A'}</span>
//         </div>
//         <div className="col-12 d-flex flex-col align-items-center p-1">
//         <h6 className="m-0">
//             <span style={{ fontSize: '15px', color: '#2F747F', fontWeight: 'bold', letterSpacing: "1px" }}>
//               <FaRupeeSign className="me-2" color="#2F747F" />{property.price ? property.price.toLocaleString('en-IN') : 'N/A'}
//             </span>
//             <span style={{ color: '#2F747F', fontSize: '13px', marginLeft: "5px", fontSize: '11px' }}>
//               Negotiable
//             </span>
//           </h6>
//         </div>
//         <p className="p-1" style={{ color: "#2E7480", margin: "0px" }}>
//         <a href={`tel:${property.interestedUser}`} style={{ textDecoration: 'none', color: '#2E7480' }}>
//             <MdCall className="me-2" color="#2F747F" /> {property.phoneNumber || 'N/A'}
//           </a>
//         </p>
//       </div>
//     </div>
//   </div>
// </div>
//     ))
//   ) : (
//     <div className="col-12 text-center">
//       <p>No removed properties found.</p>
//     </div>
//   )}
// </div>
// </div>
//   );
// };

// export default App;

















// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import {FaCamera, FaEye , FaRulerCombined, FaBed, FaUserAlt, FaCalendarAlt, FaRupeeSign } from "react-icons/fa";
// import { MdCall } from "react-icons/md";
// import myImage from '../../Assets/Rectangle 146.png'; // Correct path
// import myImage1 from '../../Assets/Rectangle 145.png'; // Correct path
// import pic from '../../Assets/Default image_PP-01.png'; // Correct path
// import { FaArrowLeft } from "react-icons/fa";

// const PropertyCard = ({ property, onRemove, onUndo }) => {

//   const navigate = useNavigate();

//   const handleCardClick = () => {
//     if (property?.ppcId) {
//       navigate(`/details/${property.ppcId}`);
//     }
//   };

//   return (
    

//     <div className="row g-0 rounded-4 mb-2" style={{ border: '1px solid #ddd', overflow: "hidden", background:"#EFEFEF"}}       
//     onClick={handleCardClick}
// >
//                   <div className="col-md-4 col-4 d-flex flex-column justify-content-between align-items-center">
//                   <div className="text-white py-1 px-2 text-center" style={{ width: '100%', background: "#2F747F" }}>
//  PUC- {property.ppcId}
//  </div>


//  <div style={{ position: "relative", width: "100%", height:'150px'}}>
//             <img
//                                         src={property.photos?.length ? `http://localhost:5000/${property.photos[0]}` : pic}
//                                         alt="Property"
//                                         className="img-fluid"
//                                         style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                                       />
          
//           <div >
//           <div className="d-flex justify-content-between w-100" style={{ position: "absolute",
//           bottom: "0px"}}>
//           <span className="d-flex justify-content-center align-items-center" style={{ color:'#fff', background:`url(${myImage}) no-repeat center center`, backgroundSize:"cover" ,fontSize:'12px', width:'50px' }}>
//           <FaCamera className="me-1"/> 1
//           </span>
//           <span className="d-flex justify-content-center align-items-center" style={{ color:'#fff', background:`url(${myImage1}) no-repeat center center`, backgroundSize:"cover" ,fontSize:'12px', width:'50px' }}>
//           <FaEye className="me-1" />1
//           </span>
//           </div>
//           </div>
//           </div>


//                  </div>
//                  <div className="col-md-8 col-8 ps-2">
//                   <div className="d-flex justify-content-between"><p className="mb-1 fw-bold" style={{ color:'#5E5E5E' }}>{property.propertyMode || 'N/A'}</p>
                 
//                   {/* <p className="m-0 ps-3 pe-3" style={{background:"green", color:"white", cursor:"pointer", borderRadius: '0px 0px 0px 15px'}} onClick={() => onUndo(property.ppcId, property.postedUserPhoneNumber)}>UNDO</p> */}
//                   {onRemove && (
//             <p className="m-0 ps-3 pe-3" style={{background:"#FF0000", color:"white", cursor:"pointer", borderRadius: '0px 0px 0px 15px'}}
//             //  onClick={() => onRemove(property.ppcId, property.postedUserPhoneNumber)}
//             onClick={(e) => {
//               e.stopPropagation();
//               onRemove(property.ppcId, property.postedUserPhoneNumber);
//             }}
//              >Remove</p>
//           )}
//           {onUndo && (
//             <p className="m-0 ps-3 pe-3" style={{background:"green", color:"white", cursor:"pointer", borderRadius: '0px 0px 0px 15px'}} 
//             // onClick={() => onUndo(property.ppcId, property.postedUserPhoneNumber)}
//             onClick={(e) => {
//               e.stopPropagation();
//               onUndo(property.ppcId, property.postedUserPhoneNumber);
//             }}
//             >Undo</p>
//           )}
//                   </div>
//                    <p className="fw-bold m-0" style={{ color:'#000000' }}>{property.propertyType || 'N/A'}</p>
//                    <p className=" fw-bold m-0" style={{ color:'#5E5E5E'}}>{property.city || 'N/A'}</p>
//                    <div className="card-body ps-2 m-0 pt-0 pe-2 d-flex flex-column justify-content-center">
//                      <div className="row">
//                                  <div className="col-6 d-flex align-items-center p-1">
//                          <FaRulerCombined className="me-2" color="#2F747F" /> <span style={{ fontSize:'13px', color:'#5E5E5E' }}>{property.totalArea || 'N/A'}</span>
//                        </div>
//                                  <div className="col-6 d-flex align-items-center p-1">
//                          <FaBed className="me-2" color="#2F747F"/> <span style={{ fontSize:'13px', color:'#5E5E5E' }}>{property.bedrooms || 'N/A'}BHK</span>
//                        </div>
//                                  <div className="col-6 d-flex align-items-center p-1">
//                          <FaUserAlt className="me-2" color="#2F747F"/> <span style={{ fontSize:'13px', color:'#5E5E5E' }}>{property.postedBy || 'N/A'}</span>
//                        </div>
//                        {/* <div className="col-6 d-flex align-items-center mt-1 mb-1">
//                          <FaCalendarAlt className="me-2" color="#2F747F"/> <span style={{ fontSize:'13px', color:'#5E5E5E' }}>{property.bestTimeToCall || 'N/A'}</span>
//                        </div> */}

//                                   <div className="col-6 d-flex align-items-center p-1">
//                                                                 <FaCalendarAlt className="me-2" color="#2F747F"/> 
//                        <span style={{ fontSize:'13px', color:'#5E5E5E', fontWeight: 500 }}>
//                          {property.createdAt ? new Date(property.createdAt).toLocaleDateString('en-IN', {
//                            year: 'numeric',
//                            month: 'short',
//                            day: 'numeric'
//                          }) : 'N/A'}
//                        </span>     
//                        </div>             
//                        {/* <div className="col-6 d-flex align-items-center mt-1 mb-1">
//                          <FaRupeeSign className="me-2" color="#2F747F"/> <span style={{ fontSize:'13px', color:'#2E7480' }}>{property.price || 'N/A'}</span>
//                        </div>
//                                  <div className="col-6 d-flex align-items-center p-1">
//                          <p className="m-0" style={{ color:'#2F747F', fontSize:'13px',fontWeight:"bold"}}> Negotiation: <span style={{ color:'#5E5E5E' }}>{property.negotiation || 'N/A'}</span></p>
//                        </div> */}
//                         <div className="col-12 d-flex flex-col align-items-center mt-1 mb-1">
//                                    <h6 className="m-0">
//                                    <span style={{ fontSize:'17px', color:'#2F747F', fontWeight:'bold', letterSpacing:"1px" }}> <FaRupeeSign className="me-2" color="#2F747F"/>{property.price ? property.price.toLocaleString('en-IN') : 'N/A'}
//                                    </span> 
//                                    <span style={{ color:'#2F747F', fontSize:'13px', marginLeft:"5px",fontSize:'11px',}}> 
//                                    Negotiable                </span> 
//                                      </h6>
//                                   </div>
//                        <p style={{ color: "#2E7480", margin: "0px" }}>
//                     <a
//                       href={`tel:${property.interestedUser}`}
//                       style={{
//                         textDecoration: "none",
//                         color: "#2E7480",
//                       }}
//                     >
//                       <MdCall className="me-2" color="#2F747F" />{" "}
//                       {property.postedUserPhoneNumber || 'N/A'}
//                     </a>
//                   </p>
//                       </div>
//                     </div>
//                   </div>
//                </div>
//   );
// };

// const PropertyList = ({ properties, onRemove, onUndo }) => {
//   return properties.length === 0 ? (
//     <p>No properties found.</p>
//   ) : (
//     <div className="row mt-4 w-100">
//       {properties.map((property) => (
//         <PropertyCard key={property.ppcId} property={property} onRemove={onRemove} onUndo={onUndo} />
//       ))}
//     </div>
//   );
// };


// const App = () => {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [activeKey, setActiveKey] = useState("All");
//   const { phoneNumber } = useParams(); // Getting phoneNumber from URL params
//   const [message, setMessage] = useState({ text: "", type: "" });

  

//   // Auto-clear message after 3 seconds
//   useEffect(() => {
//     if (message.text) {
//       const timer = setTimeout(() => {
//         setMessage({ text: "", type: "" });
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [message]);

//   // Fetch interested properties
//   const fetchInterestedProperties = useCallback(async () => {
//     if (!phoneNumber) {
//       return;
//     }
    
//     try {
//       setLoading(true);
//       const apiUrl = `${process.env.REACT_APP_API_URL}/get-interest-owner`;

//       const { data } = await axios.get(apiUrl, { params: { phoneNumber } });

//       setProperties(data.interestRequestsData);
//       localStorage.setItem("interestProperties", JSON.stringify(data.interestRequestsData));
//     } catch (error) {
//       setMessage({ text: "Failed to fetch properties.", type: "error" });
//     } finally {
//       setLoading(false);
//     }
//   }, [phoneNumber]);


//   useEffect(() => {
//     fetchInterestedProperties();
//   }, [fetchInterestedProperties]);



//   // Remove property
//   const handleRemoveProperty = async (ppcId) => {
//     if (!window.confirm("Are you sure you want to remove this property?")) return;
    
//     try {
//       await axios.post(`${process.env.REACT_APP_API_URL}/delete-detail-property`, { ppcId, phoneNumber });
//       updatePropertyStatus(ppcId, "delete");
//       setMessage({ text: "Property removed successfully.", type: "success" });
//     } catch (error) {
//       setMessage({ text: "Error removing property.", type: "error" });
//     }
//   };


//   // Undo property removal
//   const handleUndoRemove = async (ppcId) => {
//     if (!window.confirm("Do you want to undo the removal of this property?")) return;
    
//     try {
//       await axios.post(`${process.env.REACT_APP_API_URL}/undo-delete-detail`, { ppcId, phoneNumber });
//       updatePropertyStatus(ppcId, "active");
//       setMessage({ text: "Property status reverted successfully!", type: "success" });
//     } catch (error) {
//       setMessage({ text: "Error undoing property status.", type: "error" });
//     }
//   };

//   // Update property status in local state and storage
//   const updatePropertyStatus = (ppcId, status) => {
//     const updatedProperties = properties.map((property) =>
//       property.ppcId === ppcId ? { ...property, status } : property
//     );
//     setProperties(updatedProperties);
//     localStorage.setItem("interestProperties", JSON.stringify(updatedProperties));
//   };

//   // Filter properties
//   const activeProperties = properties.filter((property) => property.status !== "delete");
//   const removedProperties = properties.filter((property) => property.status === "delete");
//   const navigate = useNavigate();

//   const handlePageNavigation = () => {
//     navigate('/mobileviews'); // Redirect to the desired path
//   };
//   return (
//     <div className="container d-flex align-items-center justify-content-center p-0">
//       <div className="d-flex flex-column align-items-center justify-content-center m-0" 
//         style={{ maxWidth: '500px', margin: 'auto', width: '100%' }}>
//         <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
//           <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
//         </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}> INTEREST OWNER</h3> </div>
        
//         {/* Buttons for filtering */}
//         <div className="row g-2 w-100">
//           <div className="col-6 p-0">
//             <button className="w-100" style={{ backgroundColor: '#4F4B7E', color: 'white' }} 
//               onClick={() => setActiveKey("All")}>
//               All Properties
//             </button>
//           </div>
//           <div className="col-6 p-0">
//             <button className="w-100" style={{ backgroundColor: '#FF0000', color: 'white' }} 
//               onClick={() => setActiveKey("Removed")}>
//               Removed Properties
//             </button>
//           </div>

//           {/* Message Alert */}
//           {message.text && (
//             <div className="col-12">
//               <div className={`alert alert-${message.type} w-100`}>{message.text}</div>
//             </div>
//           )}

//           {/* Property List */}
//           <div className="col-12">
//             <div className="w-100 d-flex align-items-center justify-content-center" style={{ maxWidth: '500px' }}>
//               {loading ? (
//                 <p>Loading properties...</p>
//               ) : activeKey === "All" ? (
//                 <PropertyList properties={activeProperties} onRemove={handleRemoveProperty} />
//               ) : (
//                 <PropertyList properties={removedProperties} onUndo={handleUndoRemove} />
//               )}
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default App;








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

const PropertyCard = ({ property, onRemoveClick, onUndoClick }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState({ text: "", type: "" });

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
  

  return (
    <div>
    {message && <p style={{ color: message.type === "success" ? "green" : "red" }}>{message.text}</p>}

    <div className="row g-0 rounded-4 mb-2" style={{ border: '1px solid #ddd', overflow: "hidden", background: "#EFEFEF" }}
      onClick={handleCardClick}
    >
      <div className="col-md-4 col-4 d-flex flex-column justify-content-between align-items-center">
        <div className="text-white py-1 px-2 text-center" style={{ width: '100%', background: "#2F747F" }}>
          PUC- {property.ppcId}
        </div>
        <div style={{ position: "relative", width: "100%", height: '170px' }}>
          <img
            src={property.photos?.length ? `http://localhost:5006/${property.photos[0]}` : pic}
            alt="Property"
            className="img-fluid"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className="d-flex justify-content-between w-100" style={{ position: "absolute", bottom: "0px" }}>
            <span className="d-flex justify-content-center align-items-center"
              style={{ color: '#fff', background: `url(${myImage}) no-repeat center center`, backgroundSize: "cover", fontSize: '12px', width: '50px' }}>
              <FaCamera className="me-1" /> 1
            </span>
            <span className="d-flex justify-content-center align-items-center"
              style={{ color: '#fff', background: `url(${myImage1}) no-repeat center center`, backgroundSize: "cover", fontSize: '12px', width: '50px' }}>
              <FaEye className="me-1" /> 1
            </span>
          </div>
        </div>
      </div>

      <div className="col-md-8 col-8" style={{paddingLeft:"10px", background:"#F5F5F5"}}>
      <div className="d-flex justify-content-between">
          <p className="mb-1 fw-bold " style={{ color: '#5E5E5E' }}>{property.propertyMode || 'N/A'}</p>

          {onRemoveClick && (
            <p className="m-0 ps-3 pe-3" style={{ background: "#FF0000", color: "white", cursor: "pointer", borderRadius: '0px 0px 0px 15px' }}
              onClick={(e) => {
                e.stopPropagation();
                onRemoveClick(property);
              }}
            >Remove</p>
          )}

          {onUndoClick && (
            <p className="m-0 ps-3 pe-3" style={{ background: "green", color: "white", cursor: "pointer", borderRadius: '0px 0px 0px 15px' }}
              onClick={(e) => {
                e.stopPropagation();
                onUndoClick(property);
              }}
            >Undo</p>
          )}
        </div>

        <p className="fw-bold m-0" style={{ color: '#000000' }}>{property.propertyType || 'N/A'}</p>
        <p className=" fw-bold m-0" style={{ color: '#5E5E5E' }}>{property.city || 'N/A'}</p>

        <div className="card-body ps-2 m-0 pt-0 pe-2 d-flex flex-column justify-content-center">
          <div className="row">
          <div className="col-6 d-flex align-items-center p-1">
          <FaRulerCombined className="me-2" color="#2F747F" /> <span style={{ fontSize: '13px', color: '#5E5E5E' }}>{property.totalArea || 'N/A'}</span>
            </div>
                      <div className="col-6 d-flex align-items-center p-1">
              <FaBed className="me-2" color="#2F747F" /> <span style={{ fontSize: '13px', color: '#5E5E5E' }}>{property.bedrooms || 'N/A'}BHK</span>
            </div>
            <div className="col-6 d-flex align-items-center p-1">
            <FaUserAlt className="me-2" color="#2F747F" /> <span style={{ fontSize: '13px', color: '#5E5E5E' }}>{property.postedBy || 'N/A'}</span>
            </div>
                      <div className="col-6 d-flex align-items-center p-1">
              <FaCalendarAlt className="me-2" color="#2F747F" />
              <span style={{ fontSize: '13px', color: '#5E5E5E', fontWeight: 500 }}>
                {property.createdAt ? new Date(property.createdAt).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                }) : 'N/A'}
              </span>
            </div>
            <div className="col-12 d-flex flex-col align-items-center p-1">
            <h6 className="m-0 ">
                <span style={{ fontSize: '15px', color: '#2F747F', fontWeight: 'bold', letterSpacing: "1px" }}>
                  <FaRupeeSign className="me-2" color="#2F747F" />{property.price ? property.price.toLocaleString('en-IN') : 'N/A'}
                </span>
                <span style={{ color: '#2F747F', fontSize: '11px', marginLeft: "5px" }}>
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

const PropertyList = ({ properties, onRemoveClick, onUndoClick }) => {
  return properties.length === 0 ? (
    <p>No properties found.</p>
  ) : (
    <div className="row mt-4 w-100">
      {properties.map((property) => (
        <PropertyCard key={property.ppcId} property={property} onRemoveClick={onRemoveClick} onUndoClick={onUndoClick} />
      ))}
    </div>
  );
};

const App = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeKey, setActiveKey] = useState("All");
  const { phoneNumber } = useParams();
  const [message, setMessage] = useState({ text: "", type: "" });
  const [modal, setModal] = useState({ show: false, type: "", property: null });

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  
  const fetchViewedProperties = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/property-owner-viewed-users`, {
        params: { phoneNumber }
      });
      if (response.status === 200) {
        setProperties(response.data.properties);
      } else {
        setMessage("No properties found with your interest.");
      }
    } catch (error) {
      setMessage("Error fetching properties.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchViewedProperties();
  },[phoneNumber, setProperties] );

  const updatePropertyStatus = (ppcId, status) => {
    const updated = properties.map(p => p.ppcId === ppcId ? { ...p, status } : p);
    setProperties(updated);
  };

  const handleRemoveConfirm = async () => {
    const { ppcId } = modal.property;
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/delete-detail-property`, { ppcId, phoneNumber });
      updatePropertyStatus(ppcId, "delete");
      setMessage({ text: "Property removed successfully.", type: "success" });
    } catch {
      setMessage({ text: "Error removing property.", type: "error" });
    } finally {
      setModal({ show: false, type: "", property: null });
    }
  };

  const handleUndoConfirm = async () => {
    const { ppcId } = modal.property;
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/undo-delete-detail`, { ppcId, phoneNumber });
      updatePropertyStatus(ppcId, "active");
      setMessage({ text: "Property status reverted!", type: "success" });
    } catch {
      setMessage({ text: "Error undoing property.", type: "error" });
    } finally {
      setModal({ show: false, type: "", property: null });
    }
  };

  const activeProperties = properties.filter(p => p.status !== "delete");
  const removedProperties = properties.filter(p => p.status === "delete");
  const navigate = useNavigate();

  return (
    <div className="container d-flex align-items-center justify-content-center p-0">
      <div className="d-flex flex-column align-items-center justify-content-center m-0" style={{ maxWidth: '500px', margin: 'auto', width: '100%' , background:"#F7F7F7",fontFamily: 'Inter, sans-serif'}}>
        <div className="d-flex align-items-center justify-content-start w-100" style={{ background: "#EFEFEF" }}>
          <button className="pe-5" onClick={() => navigate('/mobileviews')}><FaArrowLeft color="#30747F" /></button>
          <h3 className="m-0 ms-3" style={{ fontSize: "20px" }}>INTEREST OWNER</h3>
        </div>

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
                onRemoveClick={(property) => setModal({ show: true, type: "remove", property })}
              />
            ) : (
              <PropertyList
                properties={removedProperties}
                onUndoClick={(property) => setModal({ show: true, type: "undo", property })}
              />
            )}
             </div>
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
  );
};



export default App;

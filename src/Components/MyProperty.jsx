










import React, { useState, useEffect } from "react";
import { FaRulerCombined, FaBed, FaCalendarAlt, FaUserAlt, FaRupeeSign } from "react-icons/fa";
import { Button, Nav, Tab, Row, Col, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import './MyProperty.css';
import EditForm from "./EditForm"; 
import AddProps from "./AddProps"; 
import ConfirmationModal from "./ConfirmationModal";
import calendar from '../Assets/Calender-01.png'
import bed from '../Assets/BHK-01.png'
import totalarea from '../Assets/Total Area-01.png'
import postedby from '../Assets/Posted By-01.png'
import indianprice from '../Assets/Indian Rupee-01.png'


const MyProperty = () => {
  const location = useLocation();
  const { phoneNumber: statePhoneNumber} = location.state || {};
  const storedPhoneNumber = localStorage.getItem('phoneNumber');
  const [loading, setLoading] = useState(true);

  const phoneNumber = statePhoneNumber || storedPhoneNumber;

  const [activeKey, setActiveKey] = useState("property");
  const [propertyUsers, setPropertyUsers] = useState([]);
  const [removedUsers, setRemovedUsers] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [ppcId, setPpcId] = useState(null);
  const [message, setMessage] = useState("");
  const [modalData, setModalData] = useState({ show: false, action: null, payload: null, message: "" });
  const [hover, setHover] = useState(false);
  const [hoverDelete, setHoverDelete] = useState(false);
  const [hoverEdit, setHoverEdit] = useState(false);
  const [properties,setProperties]= useState('');



  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000); // Auto-close after 3 seconds
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [message]);

  const handleModalConfirm = () => {
    const { action, payload } = modalData;
  
    if (action === "delete") handleDelete(payload);
    else if (action === "undo") handleUndo(payload);
    else if (action === "edit") handleEdit(payload);
  
    setModalData({ show: false, action: null, payload: null, message: "" });
  };
  
  const handleModalCancel = () => {
    setModalData({ show: false, action: null, payload: null, message: "" });
  };
  
  const confirmDelete = (ppcId) => {
    setModalData({
      show: true,
      action: "delete",
      payload: ppcId,
      message: "Are you sure you want to delete this property?"
    });
  };
  
  const confirmUndo = (ppcId) => {
    setModalData({
      show: true,
      action: "undo",
      payload: ppcId,
      message: "Are you sure you want to undo the deletion?"
    });
  };
  
  const confirmEdit = (user) => {
    setModalData({
      show: true,
      action: "edit",
      payload: user,
      message: "Do you want to edit this property?"
    });
  };
  

  useEffect(() => {
    if (activeKey === "property" && phoneNumber) {
      fetchPropertyData(phoneNumber);
      fetchDeletedProperties(phoneNumber);
    }
  }, [activeKey, phoneNumber]);

  const fetchDeletedProperties = async (phoneNumber) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-delete-status`, {
        params: { phoneNumber },
      });

      if (response.status === 200) {
        setRemovedUsers(response.data.users);
      }
    } catch (error) {
      // setMessage("Error fetching deleted properties.");
    } finally {
      setLoading(false);
    }
  };

  // const fetchPropertyData = async (phoneNumber) => {
  //   try {
  //     const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-status`, {
  //       params: { phoneNumber },
  //     });

  //     if (response.status === 200) {
  //       setPropertyUsers(response.data.users);
  //     }
  //   } catch (error) {
  //     // setMessage("Error fetching property data.");
  //   }
  // };

  const fetchPropertyData = async (phoneNumber) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-status`, {
        params: { phoneNumber },
      });
  
      if (response.status === 200) {
        const sortedUsers = response.data.users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPropertyUsers(sortedUsers);
      }
    } catch (error) {
      // setMessage("Error fetching property data.");
    } finally {
      setLoading(false);
    }
  };


     
 useEffect(() => {
  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-active-users`);
      const allProperties = response.data.users;

      // Sort by createdAt in descending order (newest first)
      const sortedProperties = allProperties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setProperties(sortedProperties);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProperties();
}, []);

  const handleDelete = async (ppcId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/delete-property`, {
        ppcId,
        phoneNumber,
      });

      if (response.status === 200) {
        setMessage("Property deleted successfully!");
        setPropertyUsers((prev) => prev.filter((user) => user.ppcId !== ppcId));
        setRemovedUsers((prev) => [...prev, { ...response.data.user }]);
      }
    } catch (error) {
      setMessage("Error deleting property.");
    }
  };

  const handleUndo = async (ppcId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/undo-delete`, {
        ppcId,
        phoneNumber,
      });

      if (response.status === 200) {
        setMessage("Property status reverted successfully!");
        setRemovedUsers((prev) => prev.filter((user) => user.ppcId !== ppcId));
        setPropertyUsers((prev) => [...prev, { ...response.data.user }]);
      }
    } catch (error) {
      setMessage("Error undoing property status.");
    }
  };

  const handleEdit = (user) => {
    setEditData({ 
      ppcId: user.ppcId || "",  
      phoneNumber: user.phoneNumber || ""  
    }); 
  };

  const handleCloseEditForm = () => {
    setEditData(null); 
  };

  const handleAddProperty = async () => {
    if (!phoneNumber ) {
      setMessage('Missing phone number or country code.');
      return;
    }
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/store-data`, {
        phoneNumber: `${phoneNumber}`,
      });
  
      if (response.status === 201) {
        setPpcId(response.data.ppcId);
        setMessage(`User added successfully! PPC-ID: ${response.data.ppcId}`);
        setShowAddForm(true);
      }
    } catch (error) {
      setMessage('Error adding user. Please try again.');
    }
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };


  return (
    <Container fluid className="p-0 my-3 d-flex align-items-center justify-content-center" style={{ width: "100%", overflowY: 'auto'}}>
      <Helmet>
        <title>Pondy Property | Properties</title>
      </Helmet>

      {editData ? (
        <EditForm  ppcId={editData.ppcId} phoneNumber={editData.phoneNumber}  onClose={handleCloseEditForm} />
      ) : showAddForm ? (
<AddProps ppcId={ppcId} phoneNumber={`${phoneNumber}`} onClose={handleCloseAddForm} />
      ) : (
        <Tab.Container activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
         
          <Row className="g-3 w-100">
          
            <Col lg={12} className="p-1 d-flex flex-column align-items-center">
            
            <Nav variant="tabs" className="mb-1 d-flex flex-row flex-nowrap justify-content-between w-100">
                <Nav.Item>
                  <Nav.Link className="nav-link ps-2 pe-2" eventKey="property">Property</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="nav-link ps-2 pe-2" eventKey="removed">Removed</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="nav-link ps-2 pe-2" eventKey="expired">Expired</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="nav-link ps-2 pe-2" eventKey="add-prop" onClick={handleAddProperty}>Add Property</Nav.Link>
                </Nav.Item>
              </Nav>


              <div>
      {message && <div className="alert text-success text-bold">{message}</div>}
      {/* Your existing component structure goes here */}
    </div>


    <ConfirmationModal
  show={modalData.show}
  message={modalData.message}
  onConfirm={handleModalConfirm}
  onCancel={handleModalCancel}
/>



              <Tab.Content className="pt-3">
                <Tab.Pane eventKey="property">
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
) : propertyUsers.length > 0 ? (
                    propertyUsers.map((user) => (
//                       <div key={user._id} className="card mb-3 shadow p-1" style={{ width: '100%', background: '#F9F9F9' }}>
//                         <div className="row g-0">
//                           <div className="col-4 d-flex flex-column align-items-center">
//                             <div className="text-white py-1 px-2 text-center" style={{ width: '100%', background: "#2F747F" }}>
//                               PUC- {user.ppcId}
//                             </div>
//                             <img
//                               src={user.photos?.length ? `http://localhost:5006/${user.photos[0]}` : "https://d17r9yv50dox9q.cloudfront.net/car_gallery/default.jpg"}
//                               alt="Property"
//                               className="img-fluid"
//                               style={{ width: '100%', height: '160px', objectFit: 'cover' }}
//                             />
//                             <div className="py-1 text-center" style={{ width: '100%', background: '#3F8D99', color: '#fff' }}>
//                               {user.status}
//                             </div>
//                           </div>
                          

//                           <div className="col-md-8 col-8 " style={{paddingLeft:"10px", paddingTop:"7px"}}>
//           <div className="d-flex justify-content-start"><p className="m-0" style={{ color:'#5E5E5E' , fontWeight:500 }}>{user.propertyMode
//   ? user.propertyMode.charAt(0).toUpperCase() + user.propertyMode.slice(1)
//   : 'N/A'}
// </p> 
//           </div>
//            <p className="fw-bold m-0 " style={{ color:'#000000' }}>{user.propertyType 
//   ? user.propertyType.charAt(0).toUpperCase() + user.propertyType.slice(1) 
//   : 'N/A'}
// </p>
//            <p className="m-0" style={{ color:'#5E5E5E' , fontWeight:500}}>{user.city
//   ? user.city.charAt(0).toUpperCase() + user.city.slice(1)
//   : 'N/A'} , {user.district
//   ? user.district.charAt(0).toUpperCase() + user.district.slice(1)
//   : 'N/A'}</p>
//            <div className="card-body ps-2 m-0 pt-0 pe-2 pb-0 d-flex flex-column justify-content-center" style={{background:"#FAFAFA"}}>
//              <div className="row">
//                <div className="col-6 d-flex align-items-center mt-1 mb-1 ps-1">
//                  {/* <FaRulerCombined className="me-2" color="#2F747F" /> */}
//                  <img src={totalarea} alt="" width={12} className="me-2"/>
//                  <span style={{ fontSize:'13px', color:'#5E5E5E' , fontWeight:500 }}>{user.totalArea || 'N/A'} {user.areaUnit
//   ? user.areaUnit.charAt(0).toUpperCase() + user.areaUnit.slice(1)
//   : 'N/A'}

                  
//                  </span>
//                </div>
//                <div className="col-6 d-flex align-items-center mt-1 mb-1">
//                  {/* <FaBed className="me-2" color="#2F747F"/> */}
//                  <img src={bed} alt="" width={12} className="me-2"/>
//                  <span style={{ fontSize:'13px', color:'#5E5E5E' ,fontWeight: 500 }}>{user.bedrooms || 'N/A'}</span>
//                </div>
//                <div className="col-6 d-flex align-items-center mt-1 mb-1 ps-1 pe-1">
//                  {/* <FaUserAlt className="me-2" color="#2F747F"/> */}
//                  <img src={postedby} alt="" width={12} className="me-2"/>
//                  <span style={{ fontSize:'13px', color:'#5E5E5E' ,fontWeight: 500 }}>
//                  {user.ownership
//   ? user.ownership.charAt(0).toUpperCase() + user.ownership.slice(1)
//   : 'N/A'}
//                  </span>
//                </div>
//                <div className="col-6 d-flex align-items-center mt-1 mb-1">
//                  <img src={calendar} alt="" width={12} className="me-2"/>
//                   <span style={{ fontSize:'13px', color:'#5E5E5E' ,fontWeight: 500 }}>
//                   {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', {
//                                                      year: 'numeric',
//                                                      month: 'short',
//                                                      day: 'numeric'
//                                                    }) : 'N/A'}
//                   </span>
//                </div>
//                <div className="col-12 d-flex flex-col align-items-center mt-1 mb-1 ps-1">
//                 <h6 className="m-0">
//                 <span style={{ fontSize:'15px', color:'#2F747F', fontWeight:600, letterSpacing:"1px" }}> 
//                   {/* <FaRupeeSign className="me-2" color="#2F747F"/> */}
//                   <img src={
//                     indianprice
//                   } alt="" width={8}  className="me-2"/>
//                   {user.price ? user.price.toLocaleString('en-IN') : 'N/A'}
//                 </span> 
//                 <span style={{ color:'#2F747F', marginLeft:"5px",fontSize:'11px',}}> 
//                 Negotiable                </span> 
//                   </h6>
//                </div>
//                <span style={{color:"grey", fontSize:"11px"}}>Edit and Submit Ad to complete</span>
//                                          <div className="d-flex justify-content-around mt-2">
// <button
//         className="btn btn-sm"
//         style={{
//           // background: hoverDelete ? 'red' : '#FF4500',
//           background: '#FF4500',

//           color: '#fff',
//           width: '40%',
//           transition: 'all 0.3s ease'
//         }}
//         // onMouseEnter={() => setHoverDelete(true)}
//         // onMouseLeave={() => setHoverDelete(false)}
//         onClick={() => confirmDelete(user.ppcId)}
//         onMouseOver={(e) => {
//           e.target.style.background = "#FF6700"; // Brighter neon on hover
//           e.target.style.fontWeight = 600; // Brighter neon on hover
//           e.target.style.transition = "background 0.3s ease"; // Brighter neon on hover
//         }}
//         onMouseOut={(e) => {
//           e.target.style.background = "#FF4500"; // Original orange
//           e.target.style.fontWeight = 400; // Brighter neon on hover

//         }}
//       >
//         Remove
//       </button>

//       <button
//         className="btn btn-sm"
//         style={{
//           background: '#2F747F',
//           color: '#fff',
//           width: '40%',
//           marginLeft: '8px',
//           transition: 'all 0.3s ease'
//         }}
//         onMouseOver={(e) => {
//           e.target.style.background = "#4ba0ad"; // Brighter neon on hover
//           e.target.style.fontWeight = 600; // Brighter neon on hover
//           e.target.style.transition = "background 0.3s ease"; // Brighter neon on hover
//         }}
//         onMouseOut={(e) => {
//           e.target.style.background = "#2F747F"; // Original orange
//           e.target.style.fontWeight = 400; // Brighter neon on hover

//         }}
//         onClick={() => confirmEdit(user)}
//       >
//         Edit
//       </button>


//                               </div>
//               </div>
//             </div>
// </div>

//                           {/* <div className="col-md-8 col-8 ps-2">
//                                     <div className="d-flex justify-content-start"><p className="mb-1" style={{ color:'#5E5E5E' , fontWeight:500 }}>{user.propertyMode || 'N/A'}</p>
//                                     </div>
//                                      <p className="fw-bold m-0" style={{ color:'#000000' }}>{user.propertyType || 'N/A'}</p>
//                                      <p className="m-0" style={{ color:'#5E5E5E' , fontWeight:500}}>{user.area || 'N/A'} , {user.city || 'N/A'}</p>
//                                      <div className="card-body ps-2 m-0 pt-0 pe-2 pb-0 d-flex flex-column justify-content-center">
//                                        <div className="row">
//                                          <div className="col-6 d-flex align-items-center mt-1 mb-1">
//                                            <FaRulerCombined className="me-2" color="#2F747F" /> <span style={{ fontSize:'13px', color:'#5E5E5E' , fontWeight:500 }}>{user.totalArea || 'N/A'} {user.areaUnit || 'N/A'}</span>
//                                          </div>
//                                          <div className="col-6 d-flex align-items-center mt-1 mb-1">
//                                            <FaBed className="me-2" color="#2F747F"/> <span style={{ fontSize:'13px', color:'#5E5E5E' ,fontWeight: 500 }}>{user.bedrooms || 'N/A'} BHK </span>
//                                          </div>
//                                          <div className="col-6 d-flex align-items-center mt-1 mb-1">
//                                            <FaUserAlt className="me-2" color="#2F747F"/> <span style={{ fontSize:'13px', color:'#5E5E5E' ,fontWeight: 500 }}>{user.postedBy || 'N/A'}</span>
//                                          </div>
//                                          <div className="col-6 d-flex align-items-center mt-1 mb-1">
//                                          <FaCalendarAlt className="me-2" color="#2F747F"/> 
// <span style={{ fontSize:'13px', color:'#5E5E5E', fontWeight: 500 }}>
//   {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric'
//   }) : 'N/A'}
// </span>     
// </div>             
//                                          <div className="col-12 d-flex flex-col align-items-center mt-1 mb-1">
//                                           <h6 className="m-0">
//                                           <span style={{ fontSize:'17px', color:'#2F747F', fontWeight:'bold', letterSpacing:"1px" }}> <FaRupeeSign className="me-2" color="#2F747F"/>
//                                       {user.price || 'N/A'}
//                                           </span>                                             </h6>
//                                          </div>
//                                          <span style={{color:"grey", fontSize:"11px"}}>Edit and Submit Ad to complete</span>
//                                          <div className="d-flex justify-content-around mt-2">
                                      

// <button
//         className="btn btn-sm"
//         style={{
//           background: hoverDelete ? 'red' : '#FF4500',
//           color: '#fff',
//           width: '40%',
//           transition: 'all 0.3s ease'
//         }}
//         onMouseEnter={() => setHoverDelete(true)}
//         onMouseLeave={() => setHoverDelete(false)}
//         onClick={() => confirmDelete(user.ppcId)}
//       >
//         Remove
//       </button>

//       <button
//         className="btn btn-sm"
//         style={{
//           background: hoverEdit ? '#4ba0ad' : '#2F747F',
//           color: '#fff',
//           width: '40%',
//           marginLeft: '8px',
//           transition: 'all 0.3s ease'
//         }}
//         onMouseEnter={() => setHoverEdit(true)}
//         onMouseLeave={() => setHoverEdit(false)}
//         onClick={() => confirmEdit(user)}
//       >
//         Edit
//       </button>

//                               </div>
//                                         </div>
//                                       </div>
//                                     </div> */}
//                         </div>
//                       </div>
<div 
className="row g-0 rounded-4 mb-2"
style={{
  border: "1px solid #ddd",
  overflow: "hidden",
  background: "#EFEFEF",
}}
>
<div className="col-md-4 col-4 d-flex flex-column justify-content-between align-items-center">
  <div
    className="text-white py-1 px-2 text-center"
    style={{ width: "100%", background: "#2F747F" }}
  >
    PUC- {user.ppcId}
  </div>

  <div style={{ position: "relative", width: "100%", height: "200px" }}>
    <img
                                src={user.photos?.length ? `http://localhost:5006/${user.photos[0]}` : "https://d17r9yv50dox9q.cloudfront.net/car_gallery/default.jpg"}

      alt="Property"
      className="img-fluid"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />

    <div>
    <div className="d-flex justify-content-between w-100 text-center" style={{ position: "absolute",
          bottom: "0px" , background: '#3F8D99', color: '#fff'}}>
        
            <span className="w-100 text-center"> {user.status}  </span>

      </div>
    </div>
  </div>
</div>

<div className="col-md-8 col-8 " style={{paddingLeft:"10px", paddingTop:"7px" ,background:"#FAFAFA"}}>
          <div className="d-flex justify-content-start"><p className="m-0" style={{ color:'#5E5E5E' , fontWeight:500 }}>{user.propertyMode
  ? user.propertyMode.charAt(0).toUpperCase() + user.propertyMode.slice(1)
  : 'N/A'}
</p> 
          </div>
           <p className="fw-bold m-0 " style={{ color:'#000000' }}>{user.propertyType 
  ? user.propertyType.charAt(0).toUpperCase() + user.propertyType.slice(1) 
  : 'N/A'}
</p>
           <p className="m-0" style={{ color:'#5E5E5E' , fontWeight:500}}>{user.city
  ? user.city.charAt(0).toUpperCase() + user.city.slice(1)
  : 'N/A'} , {user.area
  ? user.area.charAt(0).toUpperCase() + user.area.slice(1)
  : 'N/A'}</p>
           <div className="card-body ps-2 m-0 pt-0 pe-2 pb-0 d-flex flex-column justify-content-center" >
             <div className="row">
               <div className="col-6 d-flex align-items-center mt-1 mb-1 ps-1">
                 {/* <FaRulerCombined className="me-2" color="#2F747F" /> */}
                 <img src={totalarea} alt="" width={12} className="me-2"/>
                 <span style={{ fontSize:'13px', color:'#5E5E5E' , fontWeight:500 }}>{user.totalArea || 'N/A'} {user.areaUnit
  ? user.areaUnit.charAt(0).toUpperCase() + user.areaUnit.slice(1)
  : 'N/A'}

                  
                 </span>
               </div>
               <div className="col-6 d-flex align-items-center mt-1 mb-1">
                 {/* <FaBed className="me-2" color="#2F747F"/> */}
                 <img src={bed} alt="" width={12} className="me-2"/>
                 <span style={{ fontSize:'13px', color:'#5E5E5E' ,fontWeight: 500 }}>{user.bedrooms || 'N/A'}</span>
               </div>
               <div className="col-6 d-flex align-items-center mt-1 mb-1 ps-1 pe-1">
                 {/* <FaUserAlt className="me-2" color="#2F747F"/> */}
                 <img src={postedby} alt="" width={12} className="me-2"/>
                 <span style={{ fontSize:'13px', color:'#5E5E5E' ,fontWeight: 500 }}>
                 {user.ownership
  ? user.ownership.charAt(0).toUpperCase() + user.ownership.slice(1)
  : 'N/A'}
                 </span>
               </div>
               <div className="col-6 d-flex align-items-center mt-1 mb-1">
                 <img src={calendar} alt="" width={12} className="me-2"/>
                  <span style={{ fontSize:'13px', color:'#5E5E5E' ,fontWeight: 500 }}>
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', {
                                                     year: 'numeric',
                                                     month: 'short',
                                                     day: 'numeric'
                                                   }) : 'N/A'}
                  </span>
               </div>
               <div className="col-12 d-flex flex-col align-items-center mt-1 mb-1 ps-1">
                <h6 className="m-0">
                <span style={{ fontSize:'15px', color:'#2F747F', fontWeight:600, letterSpacing:"1px" }}> 
                  {/* <FaRupeeSign className="me-2" color="#2F747F"/> */}
                  <img src={
                    indianprice
                  } alt="" width={8}  className="me-2"/>
                  {user.price ? user.price.toLocaleString('en-IN') : 'N/A'}
                </span> 
                <span style={{ color:'#2F747F', marginLeft:"5px",fontSize:'11px',}}> 
                Negotiable                </span> 
                  </h6>
               </div>
               <span style={{color:"grey", fontSize:"11px"}}>Edit and Submit Ad to complete</span>
                                         <div className="d-flex justify-content-around mt-2">
<button
        className="btn btn-sm"
        style={{
          // background: hoverDelete ? 'red' : '#FF4500',
          background: '#FF4500',

          color: '#fff',
          width: '40%',
          transition: 'all 0.3s ease'
        }}
        // onMouseEnter={() => setHoverDelete(true)}
        // onMouseLeave={() => setHoverDelete(false)}
        onClick={() => confirmDelete(user.ppcId)}
        onMouseOver={(e) => {
          e.target.style.background = "#FF6700"; // Brighter neon on hover
          e.target.style.fontWeight = 600; // Brighter neon on hover
          e.target.style.transition = "background 0.3s ease"; // Brighter neon on hover
        }}
        onMouseOut={(e) => {
          e.target.style.background = "#FF4500"; // Original orange
          e.target.style.fontWeight = 400; // Brighter neon on hover

        }}
      >
        Remove
      </button>

      <button
        className="btn btn-sm"
        style={{
          background: '#2F747F',
          color: '#fff',
          width: '40%',
          marginLeft: '8px',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.background = "#4ba0ad"; // Brighter neon on hover
          e.target.style.fontWeight = 600; // Brighter neon on hover
          e.target.style.transition = "background 0.3s ease"; // Brighter neon on hover
        }}
        onMouseOut={(e) => {
          e.target.style.background = "#2F747F"; // Original orange
          e.target.style.fontWeight = 400; // Brighter neon on hover

        }}
        onClick={() => confirmEdit(user)}
      >
        Edit
      </button>


                              </div>
              </div>
            </div>
</div>
</div>
                    ))
                  ) : (
                    <div className="text-center">
                      <p>No Property Data Found.</p>
                    </div>
                  )}
                </Tab.Pane>


            
<Tab.Pane eventKey="removed">
                {removedUsers.length > 0 ? (
                  removedUsers.map((user) => (
//                     <div key={user._id} className="card mb-3 shadow p-1" style={{ width: '100%', background: '#F9F9F9' }}>
//                       <div className="row g-0">
//                         <div className="col-4 d-flex flex-column align-items-center">
//                           <div className="text-white py-1 px-2 text-center" style={{ width: '100%', background: "#2F747F" }}>
//                             PUC- {user.ppcId}
//                           </div>
//                           <div className="img-container" style={{ width: '100%', height: '150px', overflow: 'hidden' }}>
//                             <img
//                               src={user.photos && user.photos.length > 0 ? `http://localhost:5006/${user.photos[0]}` : "https://d17r9yv50dox9q.cloudfront.net/car_gallery/default.jpg"}
//                               alt={`Property`}
//                               className="img-fluid"
//                               style={{ width: '100%', height: '150px', objectFit: 'cover' }}
//                             />
//                           </div>
//                           <div className="py-1 px-1 text-center" style={{ width: '100%', background: '#FF4500', color: '#fff' }}>
//                             {user.status || 'N/A'}
//                           </div>
//                         </div>
//                         <div className="col-md-8 col-8 " style={{paddingLeft:"10px", paddingTop:"7px"}}>
//           <div className="d-flex justify-content-start"><p className="m-0" style={{ color:'#5E5E5E' , fontWeight:500 }}>{user.propertyMode
//   ? user.propertyMode.charAt(0).toUpperCase() + user.propertyMode.slice(1)
//   : 'N/A'}
// </p> 
//           </div>
//            <p className="fw-bold m-0 " style={{ color:'#000000' }}>{user.propertyType 
//   ? user.propertyType.charAt(0).toUpperCase() + user.propertyType.slice(1) 
//   : 'N/A'}
// </p>
//            <p className="m-0" style={{ color:'#5E5E5E' , fontWeight:500}}>{user.city
//   ? user.city.charAt(0).toUpperCase() + user.city.slice(1)
//   : 'N/A'} , {user.district
//   ? user.district.charAt(0).toUpperCase() + user.district.slice(1)
//   : 'N/A'}</p>
//            <div className="card-body ps-2 m-0 pt-0 pe-2 pb-0 d-flex flex-column justify-content-center" style={{background:"#FAFAFA"}}>
//              <div className="row">
//                <div className="col-6 d-flex align-items-center mt-1 mb-1 ps-1">
//                  {/* <FaRulerCombined className="me-2" color="#2F747F" /> */}
//                  <img src={totalarea} alt="" width={12} className="me-2"/>
//                  <span style={{ fontSize:'13px', color:'#5E5E5E' , fontWeight:500 }}>{user.totalArea || 'N/A'} {user.areaUnit
//   ? user.areaUnit.charAt(0).toUpperCase() + user.areaUnit.slice(1)
//   : 'N/A'}

                  
//                  </span>
//                </div>
//                <div className="col-6 d-flex align-items-center mt-1 mb-1">
//                  {/* <FaBed className="me-2" color="#2F747F"/> */}
//                  <img src={bed} alt="" width={12} className="me-2"/>
//                  <span style={{ fontSize:'13px', color:'#5E5E5E' ,fontWeight: 500 }}>{user.bedrooms || 'N/A'}</span>
//                </div>
//                <div className="col-6 d-flex align-items-center mt-1 mb-1 ps-1 pe-1">
//                  {/* <FaUserAlt className="me-2" color="#2F747F"/> */}
//                  <img src={postedby} alt="" width={12} className="me-2"/>
//                  <span style={{ fontSize:'13px', color:'#5E5E5E' ,fontWeight: 500 }}>
//                  {user.ownership
//   ? user.ownership.charAt(0).toUpperCase() + user.ownership.slice(1)
//   : 'N/A'}
//                  </span>
//                </div>
//                <div className="col-6 d-flex align-items-center mt-1 mb-1">
//                  <img src={calendar} alt="" width={12} className="me-2"/>
//                   <span style={{ fontSize:'13px', color:'#5E5E5E' ,fontWeight: 500 }}>
//                   {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', {
//                                                      year: 'numeric',
//                                                      month: 'short',
//                                                      day: 'numeric'
//                                                    }) : 'N/A'}
//                   </span>
//                </div>
//                <div className="col-12 d-flex flex-col align-items-center mt-1 mb-1 ps-1">
//                 <h6 className="m-0">
//                 <span style={{ fontSize:'15px', color:'#2F747F', fontWeight:600, letterSpacing:"1px" }}> 
//                   {/* <FaRupeeSign className="me-2" color="#2F747F"/> */}
//                   <img src={
//                     indianprice
//                   } alt="" width={8}  className="me-2"/>
//                   {user.price ? user.price.toLocaleString('en-IN') : 'N/A'}
//                 </span> 
//                 <span style={{ color:'#2F747F', marginLeft:"5px",fontSize:'11px',}}> 
//                 Negotiable                </span> 
//                   </h6>
//                </div>
//                <div className="d-flex justify-content-center mt-2">
// <button
//       className="btn btn-sm"
//       style={{
//         background: hover ?  'green':'#19575f' , // hover vs default
//         color: hover ? '#e0f7fa' : '#fff',         // text color on hover
//         width: '50%',
//         transition: 'all 0.3s ease'
//       }}
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//       onClick={() => confirmUndo(user.ppcId)}
//     >
//       Undo
//     </button>
//                             </div>
//               </div>
//             </div>
//           </div>

//                       </div>
//                     </div>
<div 
className="row g-0 rounded-4 mb-2"
style={{
  border: "1px solid #ddd",
  overflow: "hidden",
  background: "#EFEFEF",
}}
>
<div className="col-md-4 col-4 d-flex flex-column justify-content-between align-items-center">
  <div
    className="text-white py-1 px-2 text-center"
    style={{ width: "100%", background: "#2F747F" }}
  >
    PUC- {user.ppcId}
  </div>

  <div style={{ position: "relative", width: "100%", height: "180px" }}>
    <img
                                src={user.photos?.length ? `http://localhost:5006/${user.photos[0]}` : "https://d17r9yv50dox9q.cloudfront.net/car_gallery/default.jpg"}

      alt="Property"
      className="img-fluid"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />

    <div>
    <div className="d-flex justify-content-between w-100 text-center" style={{ position: "absolute",
          bottom: "0px" , background: '#3F8D99', color: '#fff'}}>
        
            <span className="w-100 text-center"> {user.status}  </span>

      </div>
    </div>
  </div>
</div>

<div className="col-md-8 col-8 " style={{paddingLeft:"10px", paddingTop:"7px" ,background:"#FAFAFA"}}>
          <div className="d-flex justify-content-start"><p className="m-0" style={{ color:'#5E5E5E' , fontWeight:500 }}>{user.propertyMode
  ? user.propertyMode.charAt(0).toUpperCase() + user.propertyMode.slice(1)
  : 'N/A'}
</p> 
          </div>
           <p className="fw-bold m-0 " style={{ color:'#000000' }}>{user.propertyType 
  ? user.propertyType.charAt(0).toUpperCase() + user.propertyType.slice(1) 
  : 'N/A'}
</p>
           <p className="m-0" style={{ color:'#5E5E5E' , fontWeight:500}}>{user.city
  ? user.city.charAt(0).toUpperCase() + user.city.slice(1)
  : 'N/A'} , {user.district
  ? user.district.charAt(0).toUpperCase() + user.district.slice(1)
  : 'N/A'}</p>
           <div className="card-body ps-2 m-0 pt-0 pe-2 pb-0 d-flex flex-column justify-content-center" >
             <div className="row">
               <div className="col-6 d-flex align-items-center mt-1 mb-1 ps-1">
                 {/* <FaRulerCombined className="me-2" color="#2F747F" /> */}
                 <img src={totalarea} alt="" width={12} className="me-2"/>
                 <span style={{ fontSize:'13px', color:'#5E5E5E' , fontWeight:500 }}>{user.totalArea || 'N/A'} {user.areaUnit
  ? user.areaUnit.charAt(0).toUpperCase() + user.areaUnit.slice(1)
  : 'N/A'}

                  
                 </span>
               </div>
               <div className="col-6 d-flex align-items-center mt-1 mb-1">
                 {/* <FaBed className="me-2" color="#2F747F"/> */}
                 <img src={bed} alt="" width={12} className="me-2"/>
                 <span style={{ fontSize:'13px', color:'#5E5E5E' ,fontWeight: 500 }}>{user.bedrooms || 'N/A'}</span>
               </div>
               <div className="col-6 d-flex align-items-center mt-1 mb-1 ps-1 pe-1">
                 {/* <FaUserAlt className="me-2" color="#2F747F"/> */}
                 <img src={postedby} alt="" width={12} className="me-2"/>
                 <span style={{ fontSize:'13px', color:'#5E5E5E' ,fontWeight: 500 }}>
                 {user.ownership
  ? user.ownership.charAt(0).toUpperCase() + user.ownership.slice(1)
  : 'N/A'}
                 </span>
               </div>
               <div className="col-6 d-flex align-items-center mt-1 mb-1">
                 <img src={calendar} alt="" width={12} className="me-2"/>
                  <span style={{ fontSize:'13px', color:'#5E5E5E' ,fontWeight: 500 }}>
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', {
                                                     year: 'numeric',
                                                     month: 'short',
                                                     day: 'numeric'
                                                   }) : 'N/A'}
                  </span>
               </div>
               <div className="col-12 d-flex flex-col align-items-center mt-1 mb-1 ps-1">
                <h6 className="m-0">
                <span style={{ fontSize:'15px', color:'#2F747F', fontWeight:600, letterSpacing:"1px" }}> 
                  {/* <FaRupeeSign className="me-2" color="#2F747F"/> */}
                  <img src={
                    indianprice
                  } alt="" width={8}  className="me-2"/>
                  {user.price ? user.price.toLocaleString('en-IN') : 'N/A'}
                </span> 
                <span style={{ color:'#2F747F', marginLeft:"5px",fontSize:'11px',}}> 
                Negotiable                </span> 
                  </h6>
               </div>
                                         <div className="d-flex justify-content-center mt-2">

      <button
        className="btn btn-sm"
        style={{
          background: '#2F747F',
          color: '#fff',
          width: '40%',
          marginLeft: '8px',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.background = "#4ba0ad"; // Brighter neon on hover
          e.target.style.fontWeight = 600; // Brighter neon on hover
          e.target.style.transition = "background 0.3s ease"; // Brighter neon on hover
        }}
        onMouseOut={(e) => {
          e.target.style.background = "#2F747F"; // Original orange
          e.target.style.fontWeight = 400; // Brighter neon on hover

        }}
        onClick={() => confirmUndo(user.ppcId)}
      >
        Undo
      </button>


                              </div>
              </div>
            </div>
</div>
</div>
                  ))
                ) : (
                  <div className="text-center">
                    <p>No Removed Property Data Found.</p>
                  </div>
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="expired">
                <div className="text-center">
                  <p>No Expired Property Data Found.</p>
                </div>
              </Tab.Pane>

              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      )}
    </Container>
  );
};

export default MyProperty;






























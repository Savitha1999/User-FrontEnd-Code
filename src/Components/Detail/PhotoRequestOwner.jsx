

import React, { useState, useEffect } from 'react'; 
import { Tab, Nav, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import pic from '../../Assets/Default image_PP-01.png'; // Correct path
import myImage from '../../Assets/Rectangle 766.png'; // Correct path
import myImage1 from '../../Assets/Rectangle 145.png'; 
import {FaCamera, FaEye , FaRulerCombined, FaBed, FaUserAlt, FaCalendarAlt, FaRupeeSign } from 'react-icons/fa';
import { MdCall } from 'react-icons/md';
const PropertyCard = ({ property , onRemove , onUndo }) => {

  const [message, setMessage] = useState({ text: "", type: "" });


  const navigate = useNavigate();
 
   const handleCardClick = () => {
     if (property?.ppcId) {
       navigate(`/detail/${property.ppcId}`);
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

  const [properties, setProperties] = useState([]);

 
  const [confirmAction, setConfirmAction] = useState(null); // 'remove' or 'undo'

  const handleClick = (action) => {
    setConfirmAction(action); // 'remove' or 'undo'
  };

  const handleConfirmYes = () => {
    if (confirmAction === 'remove') {
      onRemove(property.ppcId);
    } else if (confirmAction === 'undo') {
      onUndo(property.ppcId);
    }
    setConfirmAction(null);
  };

  const handleConfirmNo = () => {
    setConfirmAction(null);
  };
  return (
    <div className="row g-0 rounded-4 mb-2" style={{ border: '1px solid #ddd', overflow: "hidden", background: "#EFEFEF" }}
    onClick={handleCardClick}
>
    <div className="col-md-4 col-4 d-flex flex-column justify-content-between align-items-center">
      <div className="text-white py-1 px-2 text-center" style={{ width: '100%', background: "#2F747F" }}>
        PUC- {property.ppcId}
      </div>
   

<div style={{ position: "relative", width: "100%", height:'160px'}}>
            <img
                                        src={property.photos?.length ? `http://localhost:5006/${property.photos[0]}` : pic}
                                        alt="Property"
                                        className="img-fluid"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
    <div className="col-md-8 col-8" style={{paddingLeft:"10px", background:"#F5F5F5"}}>
    <div className="d-flex justify-content-between">
        <p className="m-0" style={{ color: '#5E5E5E', fontWeight: 'normal' }}>
          {property.propertyMode || 'N/A'}
        </p>
        {/* {onRemove ? (
          <p className="mb-0 ps-3 pe-3 text-center pt-1" 
             style={{ background: "#FF0000", color: "white", cursor: "pointer", borderRadius: '0px 0px 0px 15px', fontSize: "12px" }}
             onClick={() => onRemove(property.ppcId)}>
            REMOVE
          </p>
        ) : (
          <p className="mb-0 ps-3 pe-3 text-center pt-1" 
             style={{ background: "#2F747F", color: "white", cursor: "pointer", borderRadius: '0px 0px 0px 15px', fontSize: "12px" }}
             onClick={() => onUndo(property.ppcId)}>
            UNDO
          </p>
        )} */}

{onRemove ? (
        <p
          className="mb-0 ps-3 pe-3 text-center pt-1"
          style={{
            background: "#FF0000",
            color: "white",
            cursor: "pointer",
            borderRadius: "0px 0px 0px 15px",
            fontSize: "12px",
          }}
          onClick={() => handleClick('remove')}
        >
          REMOVE
        </p>
      ) : (
        <p
          className="mb-0 ps-3 pe-3 text-center pt-1"
          style={{
            background: "green",
            color: "white",
            cursor: "pointer",
            borderRadius: "0px 0px 0px 15px",
            fontSize: "12px",
          }}
          onClick={() => handleClick('undo')}
        >
          UNDO
        </p>
      )}
      {confirmAction && (
        <div
          style={{
            position: "fixed",
            background: "white",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            width: "250px",
            textAlign: "center"
          }}
        >
          <p style={{
            color:"#007C7C", fontSize:"12px"
          }}>Are you sure you want to {confirmAction} this Property?</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <button className='p-1' style={{ background:  "#2F747F", width: "80px", fontSize: "13px", border:"none" }} onClick={handleConfirmYes}>Yes</button>
            <button className="ms-3 p-1" style={{ background:  "#FF0000", width: "80px", fontSize: "13px" , border:"none"}} onClick={handleConfirmNo}>No</button>
          </div>
        </div>
      )}
      </div>
      <p className="fw-bold m-0" style={{ color: '#000000' }}>{property.propertyType || 'N/A'}</p>
      <p className='m-0' style={{ color: '#5E5E5E' }}>{property.city || 'N/A'}</p>
      <div className="card-body ps-2 m-0 pt-0 pe-2 d-flex flex-column justify-content-center">
      <div className="row">
                       <div className="col-6 d-flex align-items-center  p-1">
          <FaRulerCombined className="me-2" color="#2F747F" />
          <span style={{ fontSize: '13px', color: '#5E5E5E', fontWeight: 'medium' }}>
            {property.totalArea || 'N/A'}
          </span>
        </div>
                       <div className="col-6 d-flex align-items-center  p-1">
          <FaBed className="me-2" color="#2F747F" />
          <span style={{ fontSize: '13px', color: '#5E5E5E' }}>
            {property.bedrooms || 'N/A'}BHK
          </span>
        </div>
                       <div className="col-6 d-flex align-items-center  p-1">
          <FaUserAlt className="me-2" color="#2F747F" />
          <span style={{ fontSize: '13px', color: '#5E5E5E' }}>
            {property.postedBy || 'N/A'}
          </span>
        </div>
        <div className="col-6 d-flex align-items-center  p-1">
        <FaCalendarAlt className="me-2" color="#2F747F"/> 
                            <span style={{ fontSize:'13px', color:'#5E5E5E', fontWeight: 500 }}>
                              {property.createdAt ? new Date(property.createdAt).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              }) : 'N/A'}
                            </span>     
                            </div>    

                            <div className="col-12 d-flex flex-col align-items-center p-1">
                            <h6 className="m-0">
            <span style={{ fontSize: '17px', color: '#2F747F', fontWeight: 'bold', letterSpacing: "1px" }}>
              <FaRupeeSign className="me-2" color="#2F747F" />
              {property.price ? property.price.toLocaleString('en-IN') : 'N/A'}
            </span>
            <span style={{ color: '#2F747F', fontSize: '13px', marginLeft: "5px", fontSize: '11px' }}>
              Negotiable
            </span>
          </h6>
        </div>

        {/* <p className="p-1" style={{ color: "#2E7480", margin: "0px" }}>
        <a href={`tel:${property.postedUserPhoneNumber}`} style={{ textDecoration: 'none', color: '#2E7480' }}>
            <MdCall className="me-2" color="#2F747F" /> {property.postedUserPhoneNumber || 'N/A'}
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
    </div>
    </div>
<div className='text-center' style={{border:"2px solid #2F747F", borderRadius:"0px 0px 15px 15px",  overflow: "hidden", fontSize:"14px", color:"grey"}}>{property.status || 'N/A'} : <span>  {property.createdAt ? new Date(property.createdAt).toLocaleDateString('en-IN') : 'N/A'} </span></div>
  </div>
  
  );
};

const PhotoRequestOwner = ({ properties, onRemove }) => {
  const filteredProperties = properties.filter((property) => property.status !== 'deleted');
  
  return (
    <div className="container">
      <div className="row rounded-4 p-1">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.ppcId} property={property} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
};

const RemovedProperties = ({ removedProperties, onUndo }) => {

  return (
    <div className="container">
      <div className="row rounded-4 p-1">
      {removedProperties.map((property) => (
          <PropertyCard key={property.ppcId} property={property} onUndo={onUndo} />
        ))}
      </div>
    </div>
  );
};


const App = () => {
  const { phoneNumber } = useParams();
  const [message, setMessage] = useState({ text: "", type: "" });

  const [activeKey, setActiveKey] = useState('All');
  const [removedProperties, setRemovedProperties] = useState(() => {
    const storedRemovedProperties = localStorage.getItem('removedProperties');
    return storedRemovedProperties ? JSON.parse(storedRemovedProperties) : [];
  });
  const [properties, setProperties] = useState([]);

  // Fetch properties data from backend API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/photo-requests/owner/${phoneNumber}`);
        setProperties(response.data);  // Assuming the data is in the response body
      } catch (error) {
        setMessage("Error fetching properties.");
      }
    };

    fetchProperties();
  }, []);



  const handleRemoveProperty = async (ppcId) => {
    if (!ppcId) {
      setMessage("Invalid property ID.");
      return;
    }
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/photo-requests/delete/${ppcId}`);
      if (response.status === 200) {
        setMessage('Photo request marked as deleted.');
  
        // Update the property status to "deleted"
        setProperties((prevProperties) => {
          const updatedProperties = prevProperties.map((property) =>
            property.ppcId === ppcId ? { ...property, status: 'deleted' } : property
          );
          localStorage.setItem('properties', JSON.stringify(updatedProperties)); // Update localStorage
          return updatedProperties;
        });
  
        // Move the property to removedProperties
        const removedProperty = properties.find((property) => property.ppcId === ppcId);
        if (removedProperty) {
          setRemovedProperties((prevRemovedProperties) => {
            const updatedRemovedProperties = [...prevRemovedProperties, removedProperty];
            localStorage.setItem('removedProperties', JSON.stringify(updatedRemovedProperties));
            return updatedRemovedProperties;
          });
        }
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error deleting photo request.');
    }
  };
  
  const handleUndoRemove = async (ppcId) => {
    if (!ppcId) {
      setMessage("Invalid property ID.");
      return;
    }
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/photo-requests/undo/${ppcId}`);
      if (response.status === 200) {
        setMessage("Photo request restored.");
  
        const restoredProperty = removedProperties.find((property) => property.ppcId === ppcId);
        if (restoredProperty) {
          // Restore the property status to its original value (remove the 'deleted' status)
          setProperties((prevProperties) => {
            const updatedProperties = prevProperties.map((property) =>
              property.ppcId === ppcId
                ? { ...property, status: restoredProperty.originalStatus || 'N/A' }
                : property
            );
            localStorage.setItem('properties', JSON.stringify(updatedProperties)); // Update localStorage
            return updatedProperties;
          });
  
          setRemovedProperties((prevRemovedProperties) =>
            prevRemovedProperties.filter((property) => property.ppcId !== ppcId)
          );
  
          localStorage.setItem(
            'removedProperties',
            JSON.stringify(removedProperties.filter((property) => property.ppcId !== ppcId))
          );
        }
      }
    } catch (error) {
      setMessage("Error restoring photo request.");
    }
  };
  const navigate = useNavigate();

const handlePageNavigation = () => {
  navigate('/mobileviews'); // Redirect to the desired path
};
  return (
    <div style={{ maxWidth: '500px', margin: 'auto', background:"#F7F7F7" , fontFamily: 'Inter, sans-serif' }}>
      <Tab.Container activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
        <Row className="g-3">
          <Col lg={12} className="d-flex flex-column align-items-center">
          <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
          <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
        </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>PHOTO REQUEST OWNER </h3> </div>


            <Nav variant="tabs" className="mb-3" style={{ width: '100%' }}>
              <Nav.Item style={{ flex: '1' }}>
                <Nav.Link eventKey="All" style={{ backgroundColor: '#30747F', color: 'white', textAlign: 'center' }}>
                  All
                </Nav.Link>
              </Nav.Item>
              <Nav.Item style={{ flex: '1' }}>
                <Nav.Link eventKey="removed" style={{ backgroundColor: '#FFFFFF', color: 'grey', textAlign: 'center' }}>
                  Removed
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="All">
                {/* Only show properties with status other than "deleted" */}
                <PhotoRequestOwner properties={properties} onRemove={handleRemoveProperty} />
              </Tab.Pane>
              <Tab.Pane eventKey="removed">
                {/* Display removed properties */}
                <RemovedProperties removedProperties={removedProperties} onUndo={handleUndoRemove} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

         {/* Message Alert */}
         {message.text && (
            <div className="col-12">
              <div className={`alert alert-${message.type} w-100`}>{message.text}</div>
            </div>
          )}

    </div>
  );
};

export default App;













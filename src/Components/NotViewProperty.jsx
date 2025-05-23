

import React, { useState, useEffect } from "react";
import { FaRulerCombined, FaBed, FaUserAlt, FaCalendarAlt, FaEye, FaCamera, FaRupeeSign, FaArrowLeft } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios"; // Import axios for API requests
import myImage from '../Assets/Rectangle 146.png'; // Correct path
import myImage1 from '../Assets/Rectangle 145.png'; // Correct path
import pic from '../Assets/Mask Group 3@2x.png'; //
import calendar from '../Assets/Calender-01.png'
import bed from '../Assets/BHK-01.png'
import totalarea from '../Assets/Total Area-01.png'
import postedby from '../Assets/Posted By-01.png'
import indianprice from '../Assets/Indian Rupee-01.png'
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import NoData from "../Assets/OOOPS-No-Data-Found.png";

const NotViewProperty = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // ✅ use hook only inside component body
  const location = useLocation();
  const storedPhoneNumber = location.state?.phoneNumber || localStorage.getItem("phoneNumber") || "";

  const [phoneNumber, setPhoneNumber] = useState(storedPhoneNumber);

  // Fetch properties with zero views
  useEffect(() => {
    const fetchZeroViewProperties = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/zero-view-properties`);
        setProperties(response.data.properties);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };
    fetchZeroViewProperties();
  }, []);
  useEffect(() => {
    const recordDashboardView = async () => {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/record-views`, {
          phoneNumber: phoneNumber,
          viewedFile: "Not view Property",
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
  
  return (
     <div className="container d-flex align-items-center justify-content-center p-0">
           <div className="d-flex flex-column align-items-center justify-content-center m-0" style={{ maxWidth: '500px', margin: 'auto', width: '100%' ,fontFamily: 'Inter, sans-serif'}}>
 
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
             </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>Not Viewed Property</h3> </div>
            
           <div className="w-100">
              {loading ? (
                <p>Loading properties...</p>
              ) : error ? (
                <p>{error}</p>
              ) : properties.length > 0 ? (
                properties.map((property) => (
                  <div key={property._id} className="card mb-3 shadow rounded-4" style={{ width: "100%", minWidth: "400px", background: "#F9F9F9" , overflow:'hidden'}}>
               
                                       <div className="row g-0 ">
         <div className="col-md-4 col-4 d-flex flex-column align-items-center">
         <div className="text-white py-1 px-2 text-center" style={{ width: "100%", background: "#2F747F", fontSize:"10px" }}>
                          PUC- {property.ppcId}
                        </div>
 <div style={{ position: "relative", width: "100%", height: "150px" }}>
    {/* Image */}
    <img
 src={
  property.photos && property.photos.length > 0
    ? `http://localhost:5006/${property.photos[0]}`
    : pic // Use the imported local image if no photos are available
  }      alt="Property"
      style={{
        objectFit: "cover",
        objectPosition: "center",
        width: "100%",
        height: "100%",
      }}
    />

    {/* Icons */}
    <div
      style={{
        position: "absolute",
        bottom: "0px",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span
        className="d-flex justify-content-center align-items-center"
        style={{
          color: "#fff",
          backgroundImage: `url(${myImage})`,
          backgroundSize: "cover",
          width: "45px",
          height: "20px",
          fontSize:"8px"
        }}
      >
        <FaCamera className="me-1" size={10}/>  <span style={{fontSize:"11px"}}>{property.photos.length}</span>
      </span>
      <span
        className="d-flex justify-content-center align-items-center"
        style={{
          color: "#fff",
          backgroundImage: `url(${myImage1})`,
          backgroundSize: "cover",
          width: "45px",
          height: "20px",
          fontSize:"8px"

        }}
      >
        <FaEye className="me-1" size={10} /> <span style={{fontSize:"11px"}}>  {property.views}</span>
      </span>
    </div>
  </div>
         </div>
         <div className="col-md-8 col-8 " style={{paddingLeft:"10px", paddingTop:"7px"}}>
          <div className="d-flex justify-content-start"><p className="m-0" style={{ color:'#5E5E5E' , fontWeight:500 }}>{property.propertyMode || 'N/A'}</p> 
          </div>
          <p className="fw-bold m-0 " style={{ color:'#000000' }}>{property.propertyType 
  ? property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1) 
  : 'N/A'}
</p>
           <p className="m-0" style={{ color:'#5E5E5E' , fontWeight:500}}>{property.city
  ? property.city.charAt(0).toUpperCase() + property.city.slice(1)
  : 'N/A'} , {property.area
  ? property.area.charAt(0).toUpperCase() + property.area.slice(1)
  : 'N/A'}</p>
           <div className="card-body ps-2 m-0 pt-0 pe-2 pb-0 d-flex flex-column justify-content-center">
           <div className="row">
               <div className="col-6 d-flex align-items-center mt-1 mb-1 ps-1">
                 {/* <FaRulerCombined className="me-2" color="#2F747F" /> */}
                 <img src={totalarea} alt="" width={12} className="me-2"/>
                 <span style={{ fontSize:'13px', color:'#5E5E5E' , fontWeight:500 }}>{property.totalArea || 'N/A'} {property.areaUnit
  ? property.areaUnit.charAt(0).toUpperCase() + property.areaUnit.slice(1)
  : 'N/A'}

                  
                 </span>
               </div>
               <div className="col-6 d-flex align-items-center mt-1 mb-1">
                 {/* <FaBed className="me-2" color="#2F747F"/> */}
                 <img src={bed} alt="" width={12} className="me-2"/>
                 <span style={{ fontSize:'13px', color:'#5E5E5E' ,fontWeight: 500 }}>{property.bedrooms || 'N/A'}</span>
               </div>
               <div className="col-6 d-flex align-items-center mt-1 mb-1 ps-1 pe-1">
                 {/* <FaUserAlt className="me-2" color="#2F747F"/> */}
                 <img src={postedby} alt="" width={12} className="me-2"/>
                 <span style={{ fontSize:'13px', color:'#5E5E5E' ,fontWeight: 500 }}>
                 {property.ownership
  ? property.ownership.charAt(0).toUpperCase() + property.ownership.slice(1)
  : 'N/A'}
                 </span>
               </div>
               <div className="col-6 d-flex align-items-center mt-1 mb-1">
                 <img src={calendar} alt="" width={12} className="me-2"/>
                 <span style={{ fontSize:'13px', color:'#5E5E5E' ,fontWeight: 500 }}>
                  {property.createdAt ? new Date(property.createdAt).toLocaleDateString('en-IN', {
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
                  {property.price ? property.price.toLocaleString('en-IN') : 'N/A'}
                </span> 
                <span style={{ color:'#2F747F', marginLeft:"5px",fontSize:'11px',}}> 
                Negotiable                </span> 
                  </h6>
               </div>
              </div>
            </div>
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
                                <img src={NoData} alt="" width={100}/>      
                                <p>No properties with zero views found.</p>
                                </div> 
              )}
            </div>
          </div>
          </div>
          </div>

  );
};

export default NotViewProperty;


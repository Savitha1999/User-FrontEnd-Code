

import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { 
  FaFilter, FaHome, FaCity, FaRupeeSign, FaBed, FaCheck, FaTimes, 
  FaTools, FaIdCard, FaCalendarAlt, FaUserAlt, FaRulerCombined, FaBath, 
   FaCar, FaHandshake, FaToilet, 
  FaCamera,
  FaEye,
  FaArrowLeft
} from "react-icons/fa";
import { TbArrowLeftRight } from "react-icons/tb";
import { AiOutlineColumnWidth, AiOutlineColumnHeight } from "react-icons/ai";
import { BsBank } from "react-icons/bs";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaKitchenSet } from "react-icons/fa6";
import myImage from '../Assets/Rectangle 146.png'; // Correct path
import myImage1 from '../Assets/Rectangle 145.png'; // Correct path
import pic from '../Assets/Mask Group 3@2x.png'; // Correct path
import {FaChartArea, FaMapPin, FaDoorClosed , FaRoad ,FaRegAddressCard } from 'react-icons/fa6';
import { MdLocationOn, MdOutlineMeetingRoom, MdOutlineOtherHouses, MdSchedule , MdApproval, MdLocationCity } from "react-icons/md";
import { BsBuildingsFill, BsFillHouseCheckFill } from "react-icons/bs";
import { GiKitchenScale,  GiResize , GiGears} from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi";
import { BiSearchAlt,  BiWorld} from "react-icons/bi";
import {  MdElevator   } from "react-icons/md";
import calendar from '../Assets/Calender-01.png'
import bed from '../Assets/BHK-01.png'
import totalarea from '../Assets/Total Area-01.png'
import postedby from '../Assets/Posted By-01.png'
import indianprice from '../Assets/Indian Rupee-01.png'

const PhotosWith = ({phoneNumber}) => {
  const [properties, setProperties] = useState([]);
  const [imageCounts, setImageCounts] = useState({}); // Store image count for each property



  const navigate = useNavigate();


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
  
    // Fetch image counts for all properties
    useEffect(() => {
      const fetchAllImageCounts = async () => {
        const counts = {};
        await Promise.all(
          properties.map(async (property) => {
            const count = await fetchImageCount(property.ppcId);
            counts[property.ppcId] = count;
          })
        );
        setImageCounts(counts);
      };
  
      if (properties.length > 0) {
        fetchAllImageCounts();
      }
    }, [properties]);
  



    useEffect(() => {
      const fetchProperties = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-active-users`);
          const allProperties = response.data.users;
    
          // Sort by createdAt in descending order (newest first)
          const sortedProperties = allProperties.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));

              
          setProperties(sortedProperties);
        } catch (error) {
          console.error("Error fetching properties:", error);
        }
      };
    
      fetchProperties();
    }, []);
    
  const handleCardClick = (ppcId, phoneNumber) => {
    navigate(`/detail/${ppcId}`, { state: { phoneNumber } });
  };

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
               </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>Photos With</h3> </div>
            
           <div className="w-100">
             <div style={{ overflowY: 'auto', fontFamily:"Inter, sans-serif" }}>
               {properties.length > 0 ? (
                 properties.filter((property) => imageCounts[property.ppcId] > 0)
                 .map((property) => (
                   <div 
                     key={property._id}
                     className="card mb-3 shadow rounded-4"
                     style={{ width: '100%', height: 'auto', background: '#F9F9F9', overflow:'hidden' }}
                     onClick={() => handleCardClick(property.ppcId, phoneNumber)}
                   >
                      <div className="row g-0 ">
          <div className="col-md-4 col-4 d-flex flex-column align-items-center">
       
  <div style={{ position: "relative", width: "100%",height: window.innerWidth <= 640 ? "180px" : "170px",  }}>
     {/* Image */}
     <img
  src={
   property.photos && property.photos.length > 0
   ? `http://localhost:5006/${property.photos[0].replace(/\\/g, "/")}`
   : pic // Use the imported local image if no photos are available
   }      
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
         }}
       >
         <FaCamera className="me-1" size={13}/>  <span style={{fontSize:"11px"}}>{imageCounts[property.ppcId] || 0}</span>
       </span>
       <span
         className="d-flex justify-content-center align-items-center"
         style={{
           color: "#fff",
           backgroundImage: `url(${myImage1})`,
           backgroundSize: "cover",
           width: "45px",
           height: "20px",
         }}
       >
         <FaEye className="me-1" size={15} /> <span style={{fontSize:"11px"}}> {property.views}  </span>
       </span>
     </div>
   </div>
          </div>
          <div className="col-md-8 col-8 " style={{paddingLeft:"10px", paddingTop:"7px"}}>
           <div className="d-flex justify-content-start"><p className="m-0" style={{ color:'#5E5E5E' , fontWeight:500 }}>{property.propertyMode
   ? property.propertyMode.charAt(0).toUpperCase() + property.propertyMode.slice(1)
   : 'N/A'}
 </p> 
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
            <div className="card-body ps-2 m-0 pt-0 pe-2 pb-0 d-flex flex-column justify-content-center" style={{background:"#FAFAFA"}}>
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
                  <span style={{ fontSize:'13px', color:'#5E5E5E' ,fontWeight: 500 }}>{property.bedrooms || 'N/A'} BHK</span>
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
                 <p>No properties found.</p>
               )}
             </div>
           </div>
           </div>
           </div>
           </div>
  );
};

export default PhotosWith;



































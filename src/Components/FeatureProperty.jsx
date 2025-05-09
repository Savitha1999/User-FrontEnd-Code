




import React, { useEffect, useState } from "react";
import axios from "axios";
import myImage from '../Assets/Rectangle 146.png'; // Correct path
import myImage1 from '../Assets/Rectangle 145.png'; // Correct path
import pic from '../Assets/Mask Group 3@2x.png'; // Correct path
import { MdOutlineStarOutline } from "react-icons/md";
import calendar from '../Assets/Calender-01.png'
import bed from '../Assets/BHK-01.png'
import totalarea from '../Assets/Total Area-01.png'
import postedby from '../Assets/Posted By-01.png'
import indianprice from '../Assets/Indian Rupee-01.png'
import { FaBed, FaCalendarAlt, FaCamera, FaEye, FaRegCalendarAlt, FaRulerCombined, FaRupeeSign, FaUserAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const FeaturedProperty = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const storedPhoneNumber = location.state?.phoneNumber || localStorage.getItem("phoneNumber") || "";
  
    const [phoneNumber, setPhoneNumber] = useState(storedPhoneNumber);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-featured-properties`); // Update with your API URL
        setProperties(response.data.properties);
      } catch (err) {
        setError("Failed to fetch featured properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);


  useEffect(() => {
    const recordDashboardView = async () => {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/record-views`, {
          phoneNumber: phoneNumber,
          viewedFile: "Feature Property",
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
  // if (loading) return <p className="text-center fs-4">Loading featured properties...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;
  if (properties.length === 0) return <p className="text-center">No featured properties available.</p>;

  return (
    <div className="container mb-4">
      {/* <h2 className="text-center mb-4">Featured Properties</h2> */}
      <div className="row p-1">
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
) : (
  properties.map((property) => (
    <div
    key={property._id}
    className="card mb-3 shadow rounded-4 p-0"
    style={{ width: '100%', height: 'auto', background: '#F9F9F9', overflow:'hidden' }}

    onClick={() => navigate(`/details/${property.ppcId}`)}
  >
    <div className="row g-0">
      <div className="col-md-4 col-4 d-flex flex-column align-items-center">
        {/* <div className="text-white py-1 px-2 text-center" style={{ width: "100%", background: "#2F747F", fontSize: "10px" }}>
          PUC- {property.ppcId}
        </div> */}
        <div style={{ position: "relative", width: "100%", height: window.innerWidth <= 640 ? "160px" : "150px", }}>
        <img
            src={
              property.photos && property.photos.length > 0
                ? `http://localhost:5006/${property.photos[0].replace(/\\/g, "/")}`
                : "https://d17r9yv50dox9q.cloudfront.net/car_gallery/default.jpg"
            }
            style={{
              objectFit: "cover",
              objectPosition: "center",
              width: "100%",
              height: "100%",
            }}
          />
            <span   className="m-0 ps-1 pe-2" style={{    position: "absolute",
              top: "0px",
              right:"0px",
             fontSize:"12px",background:" linear-gradient(to right,rgba(255, 200, 0, 0.91),rgb(251, 182, 6))", color:"black", cursor:"pointer", borderRadius: '0px 0px 0px 15px'}}><MdOutlineStarOutline />Featured</span>

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
                fontSize: "8px"
              }}
            >
              <FaCamera className="me-1" size={10} />
              <span style={{ fontSize: "11px" }}>{property.photos.length}</span>
            </span>
            <span
              className="d-flex justify-content-center align-items-center"
              style={{
                color: "#fff",
                backgroundImage: `url(${myImage1})`,
                backgroundSize: "cover",
                width: "45px",
                height: "20px",
                fontSize: "8px"
              }}
            >
              <FaEye className="me-1" size={10} />
              <span style={{ fontSize: "11px" }}>{property.views}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="col-md-8 col-8 " style={{paddingLeft:"10px", paddingTop:"7px"}}>
<div className="d-flex justify-content-start"><p className="m-0" style={{ color:'#5E5E5E' , fontWeight:500 , fontSize:"13px"}}>{property.propertyMode
? property.propertyMode.charAt(0).toUpperCase() + property.propertyMode.slice(1)
: 'N/A'}
</p> 
</div>
<p className="fw-bold m-0 " style={{ color:'#000000', fontSize:"15px" }}>{property.propertyType 
? property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1) 
: 'N/A'}
</p>
<p className="m-0" style={{ color:'#5E5E5E' , fontWeight:500 , fontSize:"13px"}}>{property.city
? property.city.charAt(0).toUpperCase() + property.city.slice(1)
: 'N/A'} , {property.district
? property.district.charAt(0).toUpperCase() + property.district.slice(1)
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
 <div className="col-6 d-flex align-items-center mt-1 mb-1 ps-1 pe-1">
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
 <div className="col-6 d-flex align-items-center mt-1 mb-1 ps-1 pe-1">
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
  </div> ))
)}
      </div>
    </div>
  );
};

export default FeaturedProperty;














// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaCamera, FaEye, FaRupeeSign, FaRulerCombined, FaBed, FaUserAlt } from 'react-icons/fa';
// import { MdOutlineStarOutline } from 'react-icons/md';
// import { useNavigate } from 'react-router-dom';

// // Import your images (replace with actual imports)
// import myImage from '../Assets/Rectangle 146.png'; // Correct path
// import myImage1 from '../Assets/Rectangle 145.png'; // Correct path
// import pic from '../Assets/Mask Group 3@2x.png'; // Correct path
// // import { MdOutlineStarOutline } from "react-icons/md";
// import calendar from '../Assets/Calender-01.png'
// import bed from '../Assets/BHK-01.png'
// import totalarea from '../Assets/Total Area-01.png'
// import postedby from '../Assets/Posted By-01.png'
// import indianprice from '../Assets/Indian Rupee-01.png'

// const PropertyList = () => {
//   const [activeProperties, setActiveProperties] = useState([]);
//   const [featuredProperties, setFeaturedProperties] = useState([]);
//   const [loadingActive, setLoadingActive] = useState(true);
//   const [loadingFeatured, setLoadingFeatured] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//       useEffect(() => {
//       const fetchProperties = async () => {
//         try {
//           const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-active-users`);
//           const allProperties = response.data.users;
    
//           // Sort by createdAt in descending order (newest first)
//           const sortedProperties = allProperties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
//           setActiveProperties(sortedProperties);
//         } catch (error) {
//           console.error("Error fetching properties:", error);
//         } finally {
//           setLoading(false); // Stop loading after fetch (success or error)
//         }
//       };
    
//       fetchProperties();
//     }, []);

//   // Fetch featured properties
//   useEffect(() => {
//     const fetchFeaturedProperties = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-featured-properties`);
//         setFeaturedProperties(response.data.properties);
//       } catch (err) {
//         console.error("Error fetching featured properties:", err);
//         setError("Failed to fetch featured properties.");
//       } finally {
//         setLoadingFeatured(false);
//       }
//     };

//     fetchFeaturedProperties();
//   }, []);

//   const handleCardClick = (ppcId, phoneNumber) => {
//     // Handle click for active properties
//     navigate(`/details/${ppcId}`);
//   };

//   if (loadingActive && loadingFeatured) {
//     return (
//       <div className="text-center my-4"
//         style={{
//           position: 'fixed',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           zIndex: 1000
//         }}>
//         <span className="spinner-border text-primary" role="status" />
//         <p className="mt-2">Loading properties...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="alert alert-danger">{error}</div>;
//   }

//   return (
//     <div className="container-fluid">
//       {/* Featured Properties Section */}
//       <div className="row mt-3">
//         <div className="col-12">
//           <h5>Featured Properties</h5>
//           <div className="row p-1">
//             {loadingFeatured ? (
//               <div className="text-center my-4">
//                 <span className="spinner-border text-primary" role="status" />
//                 <p className="mt-2">Loading featured properties...</p>
//               </div>
//             ) : featuredProperties.length > 0 ? (
//               featuredProperties.map((property) => (
//                 <div
//                   key={property._id}
//                   className="card mb-3 shadow rounded-4 p-0"
//                   style={{ width: '100%', height: 'auto', background: '#F9F9F9', overflow: 'hidden' }}
//                   onClick={() => navigate(`/details/${property.ppcId}`)}
//                 >
//                   <div className="row g-0">
//                     <div className="col-md-4 col-4 d-flex flex-column align-items-center">
//                       <div style={{ position: "relative", width: "100%", height: window.innerWidth <= 640 ? "160px" : "150px" }}>
//                         <img
//                           src={
//                             property.photos && property.photos.length > 0
//                               ? `http://localhost:5006/${property.photos[0].replace(/\\/g, "/")}`
//                               : "https://d17r9yv50dox9q.cloudfront.net/car_gallery/default.jpg"
//                           }
//                           style={{
//                             objectFit: "cover",
//                             objectPosition: "center",
//                             width: "100%",
//                             height: "100%",
//                           }}
//                         />
//                         <span className="m-0 ps-1 pe-2" style={{
//                           position: "absolute",
//                           top: "0px",
//                           right: "0px",
//                           fontSize: "12px",
//                           background: "linear-gradient(to right,rgba(255, 200, 0, 0.91),rgb(251, 182, 6))",
//                           color: "black",
//                           cursor: "pointer",
//                           borderRadius: '0px 0px 0px 15px'
//                         }}>
//                           <MdOutlineStarOutline />Featured
//                         </span>

//                         <div style={{
//                           position: "absolute",
//                           bottom: "0px",
//                           width: "100%",
//                           display: "flex",
//                           justifyContent: "space-between",
//                         }}>
//                           <span className="d-flex justify-content-center align-items-center"
//                             style={{
//                               color: "#fff",
//                               backgroundImage: `url(${myImage})`,
//                               backgroundSize: "cover",
//                               width: "45px",
//                               height: "20px",
//                               fontSize: "8px"
//                             }}>
//                             <FaCamera className="me-1" size={10} />
//                             <span style={{ fontSize: "11px" }}>{property.photos.length}</span>
//                           </span>
//                           <span className="d-flex justify-content-center align-items-center"
//                             style={{
//                               color: "#fff",
//                               backgroundImage: `url(${myImage1})`,
//                               backgroundSize: "cover",
//                               width: "45px",
//                               height: "20px",
//                               fontSize: "8px"
//                             }}>
//                             <FaEye className="me-1" size={10} />
//                             <span style={{ fontSize: "11px" }}>{property.views}</span>
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-8 col-8" style={{ paddingLeft: "10px", paddingTop: "7px" }}>
//                       <div className="d-flex justify-content-start">
//                         <p className="m-0" style={{ color: '#5E5E5E', fontWeight: 500, fontSize: "13px" }}>
//                           {property.propertyMode ? property.propertyMode.charAt(0).toUpperCase() + property.propertyMode.slice(1) : 'N/A'}
//                         </p>
//                       </div>
//                       <p className="fw-bold m-0" style={{ color: '#000000', fontSize: "15px" }}>
//                         {property.propertyType ? property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1) : 'N/A'}
//                       </p>
//                       <p className="m-0" style={{ color: '#5E5E5E', fontWeight: 500, fontSize: "13px" }}>
//                         {property.city ? property.city.charAt(0).toUpperCase() + property.city.slice(1) : 'N/A'}, {property.district ? property.district.charAt(0).toUpperCase() + property.district.slice(1) : 'N/A'}
//                       </p>
//                       <div className="card-body ps-2 m-0 pt-0 pe-2 pb-0 d-flex flex-column justify-content-center" style={{ background: "#FAFAFA" }}>
//                         <div className="row">
//                           <div className="col-6 d-flex align-items-center mt-1 mb-1 ps-1">
//                             <img src={totalarea} alt="" width={12} className="me-2" />
//                             <span style={{ fontSize: '13px', color: '#5E5E5E', fontWeight: 500 }}>
//                               {property.totalArea || 'N/A'} {property.areaUnit ? property.areaUnit.charAt(0).toUpperCase() + property.areaUnit.slice(1) : 'N/A'}
//                             </span>
//                           </div>
//                           <div className="col-6 d-flex align-items-center mt-1 mb-1 ps-1 pe-1">
//                             <img src={bed} alt="" width={12} className="me-2" />
//                             <span style={{ fontSize: '13px', color: '#5E5E5E', fontWeight: 500 }}>{property.bedrooms || 'N/A'} BHK</span>
//                           </div>
//                           <div className="col-6 d-flex align-items-center mt-1 mb-1 ps-1 pe-1">
//                             <img src={postedby} alt="" width={12} className="me-2" />
//                             <span style={{ fontSize: '13px', color: '#5E5E5E', fontWeight: 500 }}>
//                               {property.ownership ? property.ownership.charAt(0).toUpperCase() + property.ownership.slice(1) : 'N/A'}
//                             </span>
//                           </div>
//                           <div className="col-6 d-flex align-items-center mt-1 mb-1 ps-1 pe-1">
//                             <img src={calendar} alt="" width={12} className="me-2" />
//                             <span style={{ fontSize: '13px', color: '#5E5E5E', fontWeight: 500 }}>
//                               {property.createdAt ? new Date(property.createdAt).toLocaleDateString('en-IN', {
//                                 year: 'numeric',
//                                 month: 'short',
//                                 day: 'numeric'
//                               }) : 'N/A'}
//                             </span>
//                           </div>
//                           <div className="col-12 d-flex flex-col align-items-center mt-1 mb-1 ps-1">
//                             <h6 className="m-0">
//                               <span style={{ fontSize: '15px', color: '#2F747F', fontWeight: 600, letterSpacing: "1px" }}>
//                                 <img src={indianprice} alt="" width={8} className="me-2" />
//                                 {property.price ? property.price.toLocaleString('en-IN') : 'N/A'}
//                               </span>
//                               <span style={{ color: '#2F747F', marginLeft: "5px", fontSize: '11px' }}>
//                                 Negotiable
//                               </span>
//                             </h6>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center my-4">No featured properties found</div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Active Properties Section */}
//       <div className="row mt-4">
//         <div className="col-12">
//           <h5>Active Properties</h5>
//           <div className="row p-1">
//             {loadingActive ? (
//               <div className="text-center my-4">
//                 <span className="spinner-border text-primary" role="status" />
//                 <p className="mt-2">Loading active properties...</p>
//               </div>
//             ) : activeProperties.length > 0 ? (
//               activeProperties.map((property) => (
//                 <div
//                   key={property._id}
//                   className="card mb-3 shadow rounded-4"
//                   style={{ width: '100%', height: 'auto', background: '#F9F9F9', overflow: 'hidden' }}
//                   onClick={() => handleCardClick(property.ppcId, property.phoneNumber)}
//                 >
//                   <div className="row g-0">
//                     <div className="col-md-4 col-4 d-flex flex-column align-items-center">
//                       <div style={{ position: "relative", width: "100%", height: window.innerWidth <= 640 ? "170px" : "160px" }}>
//                         <img
//                           src={
//                             property.photos && property.photos.length > 0
//                               ? `http://localhost:5006/${property.photos[0].replace(/\\/g, "/")}`
//                               : "https://d17r9yv50dox9q.cloudfront.net/car_gallery/default.jpg"
//                           }
//                           style={{
//                             objectFit: "cover",
//                             objectPosition: "center",
//                             width: "100%",
//                             height: "100%",
//                           }}
//                         />
//                         <div style={{
//                           position: "absolute",
//                           bottom: "0px",
//                           width: "100%",
//                           display: "flex",
//                           justifyContent: "space-between",
//                         }}>
//                           <span className="d-flex justify-content-center align-items-center" style={{ color: '#fff', background: `url(${myImage}) no-repeat center center`, backgroundSize: "cover", fontSize: '12px', width: '50px' }}>
//                             <FaCamera className="me-1" /> {property.photos?.length || 0}
//                           </span>
//                           <span className="d-flex justify-content-center align-items-center" style={{ color: '#fff', background: `url(${myImage1}) no-repeat center center`, backgroundSize: "cover", fontSize: '12px', width: '50px' }}>
//                             <FaEye className="me-1" />{property.views}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-8 col-8" style={{ paddingLeft: "10px", paddingTop: "7px" }}>
//                       <div className="d-flex justify-content-start">
//                         <p className="m-0" style={{ color: '#5E5E5E', fontWeight: 500, fontSize: "13px" }}>
//                           {property.propertyMode ? property.propertyMode.charAt(0).toUpperCase() + property.propertyMode.slice(1) : 'N/A'}
//                         </p>
//                       </div>
//                       <p className="fw-bold m-0" style={{ color: '#000000', fontSize: "15px" }}>
//                         {property.propertyType ? property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1) : 'N/A'}
//                       </p>
//                       <p className="m-0" style={{ color: '#5E5E5E', fontWeight: 500, fontSize: "13px" }}>
//                         {property.city ? property.city.charAt(0).toUpperCase() + property.city.slice(1) : 'N/A'}, {property.district ? property.district.charAt(0).toUpperCase() + property.district.slice(1) : 'N/A'}
//                       </p>
//                       <div className="card-body ps-2 m-0 pt-0 pe-2 pb-0 d-flex flex-column justify-content-center" style={{ background: "#FAFAFA" }}>
//                         <div className="row">
//                           <div className="col-6 d-flex align-items-center mt-1 mb-1 ps-1">
//                             <img src={totalarea} alt="" width={12} className="me-2" />
//                             <span style={{ fontSize: '13px', color: '#5E5E5E', fontWeight: 500 }}>
//                               {property.totalArea || 'N/A'} {property.areaUnit ? property.areaUnit.charAt(0).toUpperCase() + property.areaUnit.slice(1) : 'N/A'}
//                             </span>
//                           </div>
//                           <div className="col-6 d-flex align-items-center mt-1 mb-1 ps-1 pe-1">
//                             <img src={bed} alt="" width={12} className="me-2" />
//                             <span style={{ fontSize: '13px', color: '#5E5E5E', fontWeight: 500 }}>{property.bedrooms || 'N/A'} BHK</span>
//                           </div>
//                           <div className="col-6 d-flex align-items-center mt-1 mb-1 ps-1 pe-1">
//                             <img src={postedby} alt="" width={12} className="me-2" />
//                             <span style={{ fontSize: '13px', color: '#5E5E5E', fontWeight: 500 }}>
//                               {property.ownership ? property.ownership.charAt(0).toUpperCase() + property.ownership.slice(1) : 'N/A'}
//                             </span>
//                           </div>
//                           <div className="col-6 d-flex align-items-center mt-1 mb-1 ps-1 pe-1">
//                             <img src={calendar} alt="" width={12} className="me-2" />
//                             <span style={{ fontSize: '13px', color: '#5E5E5E', fontWeight: 500 }}>
//                               {property.createdAt ? new Date(property.createdAt).toLocaleDateString('en-IN', {
//                                 year: 'numeric',
//                                 month: 'short',
//                                 day: 'numeric'
//                               }) : 'N/A'}
//                             </span>
//                           </div>
//                           <div className="col-12 d-flex flex-col align-items-center mt-1 mb-1 ps-1">
//                             <h6 className="m-0">
//                               <span style={{ fontSize: '15px', color: '#2F747F', fontWeight: 600, letterSpacing: "1px" }}>
//                                 <img src={indianprice} alt="" width={8} className="me-2" />
//                                 {property.price ? property.price.toLocaleString('en-IN') : 'N/A'}
//                               </span>
//                               <span style={{ color: '#2F747F', marginLeft: "5px", fontSize: '11px' }}>
//                                 Negotiable
//                               </span>
//                             </h6>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center my-4">No active properties found</div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyList;
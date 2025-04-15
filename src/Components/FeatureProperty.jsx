




import React, { useEffect, useState } from "react";
import axios from "axios";
import myImage from '../Assets/Rectangle 146.png'; // Correct path
import myImage1 from '../Assets/Rectangle 145.png'; // Correct path
import pic from '../Assets/Mask Group 3@2x.png'; // Correct path
import { MdOutlineStarOutline } from "react-icons/md";

import { FaBed, FaCalendarAlt, FaCamera, FaEye, FaRegCalendarAlt, FaRulerCombined, FaRupeeSign, FaUserAlt } from "react-icons/fa";

const FeaturedProperty = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) return <p className="text-center fs-4">Loading featured properties...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;
  if (properties.length === 0) return <p className="text-center">No featured properties available.</p>;

  return (
    <div className="container mb-4">
      <h2 className="text-center mb-4">Featured Properties</h2>
      <div className="row p-1">
        {properties.map((property) => (
         
          <div 
          key={property._id}
          className="card mb-3 shadow rounded-4 p-0"
          style={{ width: '100%', height: 'auto', background: '#F9F9F9', overflow:'hidden' }}
        >
           <div className="row g-0 ">
<div className="col-md-4 col-4 d-flex flex-column align-items-center">

<div style={{ position: "relative", width: "100%", height: "170px" }}>
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
<div className="d-flex justify-content-end" style={{
position: "absolute",
top: "0px",
width: "100%",
display: "flex",
}}><span className="m-0 ps-1 pe-2" style={{fontSize:"12px",background:" linear-gradient(to right,rgba(255, 200, 0, 0.91),rgb(251, 182, 6))", color:"black", cursor:"pointer", borderRadius: '0px 0px 0px 15px'}}><MdOutlineStarOutline />Featured</span></div>

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
<FaCamera className="me-1" size={13}/>  <span style={{fontSize:"11px"}}>0</span>
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
<div className="col-md-8 col-8 ps-2">
<div className="d-flex justify-content-start"><p className="mb-1" style={{ color:'#5E5E5E' , fontWeight:500 }}>{property.propertyMode || 'N/A'}</p> 
</div>
 <p className="fw-bold m-0" style={{ color:'#000000' }}>{property.propertyType || 'N/A'}</p>
 <p className="m-0" style={{ color:'#5E5E5E' , fontWeight:500}}>{property.city || 'N/A'} , {property.city || 'N/A'}</p>
 <div className="card-body ps-2 m-0 pt-0 pe-2 pb-0 d-flex flex-column justify-content-center">
   <div className="row">
     <div className="col-6 d-flex align-items-center mt-1 mb-1">
       <FaRulerCombined className="me-2" color="#2F747F" /> <span style={{ fontSize:'13px', color:'#5E5E5E' , fontWeight:500 }}>{property.totalArea || 'N/A'}</span>
     </div>
     <div className="col-6 d-flex align-items-center mt-1 mb-1">
       <FaBed className="me-2" color="#2F747F"/> <span style={{ fontSize:'13px', color:'#5E5E5E' ,fontWeight: 500 }}>{property.bedrooms || 'N/A'}</span>
     </div>
     <div className="col-6 d-flex align-items-center mt-1 mb-1">
       <FaUserAlt className="me-2" color="#2F747F"/> <span style={{ fontSize:'13px', color:'#5E5E5E' ,fontWeight: 500 }}>{property.ownership || 'N/A'}</span>
     </div>
     <div className="col-6 d-flex align-items-center mt-1 mb-1">
       <FaRegCalendarAlt className="me-2" color="#2F747F"/> <span style={{ fontSize:'13px', color:'#5E5E5E' ,fontWeight: 500 }}>{property.bestTimeToCall || 'N/A'}</span>
     </div>
     <div className="col-12 d-flex flex-col align-items-center mt-1 mb-1">
      <h6 className="m-0">
      <span style={{ fontSize:'17px', color:'#2F747F', fontWeight:'bold', letterSpacing:"1px" }}> <FaRupeeSign className="me-2" color="#2F747F"/>{property.price ? property.price.toLocaleString('en-IN') : 'N/A'}
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
        ))}
      </div>
    </div>
  );
};

export default FeaturedProperty;

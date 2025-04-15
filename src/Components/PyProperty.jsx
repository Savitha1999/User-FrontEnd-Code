




import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import myImage from '../Assets/Rectangle 146.png'; // Correct path
import myImage1 from '../Assets/Rectangle 145.png'; // Correct path
import pic from '../Assets/Mask Group 3@2x.png'; // Correct path
import { 
  FaRupeeSign, FaBed, FaCalendarAlt, FaUserAlt, FaRulerCombined,
  FaCamera,
  FaEye
} from "react-icons/fa";
const PyProperty = () => {
    const [imageCounts, setImageCounts] = useState({}); // Store image count for each property
  
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch Puducherry properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-Pudhucherry-properties`);
        setProperties(response.data.data);
        setError("");
      } catch (error) {
        setError("Pondy properties Not Found");
      }
    };
    fetchProperties();
  }, []);

  const handleCardClick = (ppcId, phoneNumber) => {
    // navigate("/detail", { state: { ppcId, phoneNumber } });
    navigate(`/detail/${ppcId}`, { state: {phoneNumber } });

  };


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
    
  


  return (
    <Container fluid className="p-0 w-100 d-flex align-items-center justify-content-center ">
      <Row className="g-3 w-100 ">
        <Col lg={12} className="d-flex align-items-center justify-content-center">
      
 
      <div className="w-100">
      <h2>Puducherry Properties</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
   
      <div style={{ overflowY: 'auto', fontFamily:"Inter, sans-serif" }}>
      {properties.map((property) => (
          // <div 
          //   key={property._id} 
          //   onClick={() => handleCardClick(property.ppcId, property.phoneNumber)}
          //   style={{ cursor: "pointer", border: "1px solid #ddd", borderRadius: "10px", padding: "15px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" }}
          // >
          //   <h3>{property.title}</h3>
          //   <p><strong>State:</strong> {property.state}</p>
          //   <p><strong>City:</strong> {property.city}</p>
          //   <p><strong>Price:</strong> ₹{property.price}</p>
          //   <p><strong>Owner:</strong> {property.ownerName}</p>
          //   <p><strong>Contact:</strong> {property.phoneNumber}</p>
          //   <p>{property.ppcId}</p>
          // </div>
          <div 
          key={property._id}
          className="card mb-3 shadow rounded-4"
          style={{ width: '100%', height: 'auto', background: '#F9F9F9', overflow:'hidden' }}
          onClick={() => handleCardClick(property.ppcId, property.phoneNumber)}
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
                             
<span className="d-flex justify-content-center align-items-center" style={{ color:'#fff', background:`url(${myImage}) no-repeat center center`, backgroundSize:"cover" ,fontSize:'12px', width:'50px' }}>
          <FaCamera className="me-1"/> {imageCounts[property.ppcId] || 0}
          </span>
          <span className="d-flex justify-content-center align-items-center" style={{ color:'#fff', background:`url(${myImage1}) no-repeat center center`, backgroundSize:"cover" ,fontSize:'12px', width:'50px' }}>
          <FaEye className="me-1" />{property.views}
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
                         <FaRulerCombined className="me-2" color="#2F747F" /> <span style={{ fontSize: '13px', color: '#5E5E5E', fontWeight: 'medium' }}>{property.totalArea || 'N/A'}{property.areaUnit || 'N/A'}</span>
                       </div>
                     <div className="col-6 d-flex align-items-center mt-1 mb-1">
                               <FaBed className="me-2" color="#2F747F" />
                               <span style={{ fontSize: '13px', color: '#5E5E5E' }}>
                                 {property.bedrooms || 'N/A'}BHK
                               </span>
                             </div>
                             <div className="col-6 d-flex align-items-center mt-1 mb-1">
                               <FaUserAlt className="me-2" color="#2F747F" />
                               <span style={{ fontSize: '13px', color: '#5E5E5E' }}>
                                 {property.postedBy || 'N/A'}
                               </span>
                             </div>
                           <div className="col-6 d-flex align-items-center mt-1 mb-1">
                                                                                          <FaCalendarAlt className="me-2" color="#2F747F"/> 
                                                 <span style={{ fontSize:'13px', color:'#5E5E5E', fontWeight: 500 }}>
                                                   {property.createdAt ? new Date(property.createdAt).toLocaleDateString('en-IN', {
                                                     year: 'numeric',
                                                     month: 'short',
                                                     day: 'numeric'
                                                   }) : 'N/A'}
                                                 </span>     
                                                 </div> 
     <div className="col-12 d-flex flex-col align-items-center mt-1 mb-1">
      <h6 className="m-0">
      <span style={{ fontSize:'17px', color:'#2F747F', fontWeight:'bold', letterSpacing:"1px" }}> <FaRupeeSign className="me-2" color="#2F747F"/>{property.price ? property.price.toLocaleString('en-IN') : 'N/A'}
      </span> 
      <span style={{ color:'#2F747F', marginLeft:"5px",fontSize:'11px',}}> 
      Negotiable                </span> 
        </h6>
     </div>
     {/* <div className="col-6 d-flex align-items-center mt-1 mb-1">
       <h4 className="m-0" style={{ color:'#2F747F', fontSize:'13px'}}> Negotiable: <span style={{ color:'#555555' }}>{property.negotiation || 'N/A'}</span></h4>
     </div> */}
    </div>
  </div>
</div>
</div>

        </div>
        ))}
      </div>
      </div>
      </Col>
      </Row>
      </Container>
  );
};

export default PyProperty;

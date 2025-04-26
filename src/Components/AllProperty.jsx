





import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import myImage from '../Assets/Rectangle 146.png'; // Correct path
import myImage1 from '../Assets/Rectangle 145.png'; // Correct path
import pic from '../Assets/Mask Group 3@2x.png'; // Correct path
import calendar from '../Assets/Calender-01.png'
import bed from '../Assets/BHK-01.png'
import totalarea from '../Assets/Total Area-01.png'
import postedby from '../Assets/Posted By-01.png'
import indianprice from '../Assets/Indian Rupee-01.png'
import { 
  FaRupeeSign, FaBed, FaCalendarAlt, FaUserAlt, FaRulerCombined,
  FaCamera,
  FaEye
} from "react-icons/fa";
const AllProperty = () => {
    const [imageCounts, setImageCounts] = useState({}); // Store image count for each property
    const [loading, setLoading] = useState(true);

  const [properties, setProperties] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
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
          setLoading(false); // Stop loading after fetch (success or error)
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
      {/* <h2>Puducherry Property Listings</h2> */}
      {error && <p style={{ color: "red" }}>{error}</p>}
   
      <div style={{ overflowY: 'auto', fontFamily:"Inter, sans-serif" }}>
      {/* {properties.map((property) => (
          <div 
          key={property._id}
          className="card mb-3 shadow rounded-4"
          style={{ width: '100%', height: 'auto', background: '#F9F9F9', overflow:'hidden' }}
          onClick={() => handleCardClick(property.ppcId, property.phoneNumber)}
        >
           <div className="row g-0 ">
<div className="col-md-4 col-4 d-flex flex-column align-items-center">

<div style={{ position: "relative", width: "100%", height: window.innerWidth <= 640 ? "170px" : "160px", }}>
<img
 src={
  property.photos && property.photos.length > 0
  ? `http://localhost:5006/${property.photos[0].replace(/\\/g, "/")}`
  : "https://d17r9yv50dox9q.cloudfront.net/car_gallery/default.jpg" // Use the imported local image if no photos are available
  }      
      style={{
        objectFit: "cover",
        objectPosition: "center",
        width: "100%",
        height: "100%",
      }}
    />



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
                 <img src={totalarea} alt="" width={12} className="me-2"/>
                 <span style={{ fontSize:'13px', color:'#5E5E5E' , fontWeight:500 }}>{property.totalArea || 'N/A'} {property.areaUnit
  ? property.areaUnit.charAt(0).toUpperCase() + property.areaUnit.slice(1)
  : 'N/A'}

                  
                 </span>
               </div>
               <div className="col-6 d-flex align-items-center mt-1 mb-1 ps-1 pe-1">
                 <img src={bed} alt="" width={12} className="me-2"/>
                 <span style={{ fontSize:'13px', color:'#5E5E5E' ,fontWeight: 500 }}>{property.bedrooms || 'N/A'} BHK</span>
               </div>
               <div className="col-6 d-flex align-items-center mt-1 mb-1 ps-1 pe-1">
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
        ))} */}


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
          className="card mb-3 shadow rounded-4"
          style={{ width: '100%', height: 'auto', background: '#F9F9F9', overflow:'hidden' }}
          onClick={() => handleCardClick(property.ppcId, property.phoneNumber)}
        >
           <div className="row g-0 ">
<div className="col-md-4 col-4 d-flex flex-column align-items-center">

<div style={{ position: "relative", width: "100%", height: window.innerWidth <= 640 ? "170px" : "160px", }}>
{/* Image */}
<img
 src={
  property.photos && property.photos.length > 0
  ? `http://localhost:5006/${property.photos[0].replace(/\\/g, "/")}`
  : "https://d17r9yv50dox9q.cloudfront.net/car_gallery/default.jpg" // Use the imported local image if no photos are available
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

        </div>  ))
)}

      </div>
      </div>
      </Col>
      </Row>
      </Container>
  );
};

export default AllProperty;















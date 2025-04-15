








// import React from "react";
// import { FaRulerCombined, FaBed, FaUser, FaCalendarAlt,  FaEye, FaCamera } from "react-icons/fa";
// import "./PropertyCard.css";
// import { GoSearch } from "react-icons/go";
// import { Helmet } from "react-helmet";
// import { Container, Row, Col } from "react-bootstrap";

// const properties = [
//   {
//     id: 1,
//     type: "Commercial",
//     category: "Independent House",
//     location: "Pondicherry Town, Pondicherry City",
//     size: "1685 Sq.ft",
//     bhk: "3BHK",
//     owner: "Owner",
//     time: "Month Ago",
//     price: "₹ 2.10 Crore",
//     negotiable: "Negotiable",
//   },
//   {
//     id: 2,
//     type: "Residential",
//     category: "Plot",
//     location: "Kalapet, Pondicherry City",
//     size: "6800 Sq.ft",
//     bhk: "0BHK",
//     owner: "Owner",
//     time: "Month Ago",
//     price: "₹ 2200",
//     negotiable: "Negotiable",
//   },
//   {
//     id: 3,
//     type: "Residential",
//     category: "Apartment",
//     location: "Pondicherry City, Thattanchavady",
//     size: "1400 Sq.ft",
//     bhk: "0BHK",
//     owner: "Owner",
//     time: "Month Ago",
//     price: "₹ 85 Lakhs",
//     negotiable: "Negotiable",
//   },
//   {
//     id: 4,
//     type: "Residential",
//     category: "Independent House",
//     location: "Pondicherry Town, Pondicherry City",
//     size: "1200 Sq.ft",
//     bhk: "0BHK",
//     owner: "Owner",
//     time: "Month Ago",
//     price: "₹ 1.70 Crore",
//     negotiable: "Negotiable",
//   },
//   {
//     id: 5,
//     type: "Commercial",
//     category: "Independent House",
//     location: "Pondicherry Town, Pondicherry City",
//     size: "1685 Sq.ft",
//     bhk: "3BHK",
//     owner: "Owner",
//     time: "Month Ago",
//     price: "₹ 2.10 Crore",
//     negotiable: "Negotiable",
//   },
//   {
//     id: 6,
//     type: "Residential",
//     category: "Plot",
//     location: "Kalapet, Pondicherry City",
//     size: "6800 Sq.ft",
//     bhk: "0BHK",
//     owner: "Owner",
//     time: "Month Ago",
//     price: "₹ 2200",
//     negotiable: "Negotiable",
//   },
//   {
//     id: 7,
//     type: "Residential",
//     category: "Apartment",
//     location: "Pondicherry City, Thattanchavady",
//     size: "1400 Sq.ft",
//     bhk: "0BHK",
//     owner: "Owner",
//     time: "Month Ago",
//     price: "₹ 85 Lakhs",
//     negotiable: "Negotiable",
//   },
//   {
//     id: 8,
//     type: "Residential",
//     category: "Independent House",
//     location: "Pondicherry Town, Pondicherry City",
//     size: "1200 Sq.ft",
//     bhk: "0BHK",
//     owner: "Owner",
//     time: "Month Ago",
//     price: "₹ 1.70 Crore",
//     negotiable: "Negotiable",
//   },];

// const PropertyCard = () => {
//   return (
//     <Container fluid className="p-3">
//       <Helmet>
//         <title>Pondy Property | Properties</title>
//       </Helmet>
//       <Row className="g-3">
//         <Col lg={12} className="d-flex align-items-center justify-content-center">
//           <div className="d-flex mt-3 justify-content-center align-items-center">
//             <div className="search-icon">
//             <GoSearch  />
//             </div>
//             <div
//               style={{
//                 width: "100%",
//                 maxWidth: "500px",
//                 minWidth: "300px",
//                 padding: "2rem",
//                 borderRadius: "8px",
//                 margin: "0 20px",
//                 backgroundRepeat: "no-repeat",
//                 color: "white",
//               }}
//             >
//               {properties.map((property) => (
//                 <div className="property-card">
//                   <div className="property-image">
//                     <img 
//                       src="https://d17r9yv50dox9q.cloudfront.net/car_gallery/default.jpg"
//                       alt="Property"
//                     />

//                     <span>
//                     <div className="property-badge " style={{position:"absolute"}}>
//                     <FaCamera className="badge-icon" />
//                     </div>
//                     <div className="property-badges" style={{position:"absolute"}} >
//                     <FaEye className="badge-icons" />
//                   </div>
//                   </span>

//                     {/* <img className="sml-img" src="https://cdn-sharing.adobecc.com/content/storage/id/urn:aaid:sc:US:9e465a61-76e9-46df-a1de-1f4b717eb54a;revision=0?component_id=50cdc94e-dd8b-4244-8805-0021aca5da4b&api_key=CometServer1&access_token=1734890144_urn%3Aaaid%3Asc%3AUS%3A9e465a61-76e9-46df-a1de-1f4b717eb54a%3Bpublic_f04e04caf1dbd9605cdcb6c9fb969742dfb3ba5b" />
//                     <img
//                       className="ms-5 ps-4"
//                       src="https://cdn-sharing.adobecc.com/content/storage/id/urn:aaid:sc:US:9e465a61-76e9-46df-a1de-1f4b717eb54a;revision=0?component_id=5a332331-dee4-48eb-965d-00a9e6ef0c1c&api_key=CometServer1&access_token=1734890144_urn%3Aaaid%3Asc%3AUS%3A9e465a61-76e9-46df-a1de-1f4b717eb54a%3Bpublic_f04e04caf1dbd9605cdcb6c9fb969742dfb3ba5b"
//                     /> */}
//                   </div>
//                   <div className="property-details">
//                     <div className="details-header">
//                       <p className="mt-3">{property.type}</p>
//                       <p className="category">{property.category}</p>
//                       <p className="loc">{property.location}</p>
//                     </div>

//                     <div className="info-row mt-1">
//                       <p>
//                         <FaRulerCombined className="icon" /> {property.size}
//                         <br />
//                         <FaUser className="icon" /> {property.owner}
//                       </p>
//                       <p>
//                         <FaBed className="icon " /> {property.bhk}
//                         <br />
//                         <FaCalendarAlt className="icon" /> {property.time}
//                       </p>
//                     </div>

//                     <div className="price-row mb-1">
//                       <p className="price">{property.price}</p>
//                       <p className="negotiable">{property.negotiable}</p>
//                     </div>
//                   </div>

//                   {/* Badge with eye and camera icons */}
//                   {/* <div className="property-badge">
//                     <FaEye className="badge-icon" />
//                     <FaCamera className="badge-icon" />
//                   </div> */}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default PropertyCard;





import React, { useState, useEffect } from "react";
import { FaRulerCombined, FaBed, FaUser, FaCalendarAlt, FaEye, FaCamera } from "react-icons/fa";
import "./PropertyCard.css";
import { GoSearch } from "react-icons/go";
import { Helmet } from "react-helmet";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios"; // Import axios for API calls

const PropertyCard = () => {
  // State to store fetched properties
  const [properties, setProperties] = useState([]);

  // Fetch properties data from the API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-all-data`); // API call
        setProperties(response.data.users); // Set fetched properties into state
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    
    fetchProperties();
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <Container fluid className="p-3">
      <Helmet>
        <title>Pondy Property | Properties</title>
      </Helmet>
      <Row className="g-3">
        <Col lg={12} className="d-flex align-items-center justify-content-center">
          <div className="d-flex mt-3 justify-content-center align-items-center">
            <div className="search-icon">
              <GoSearch />
            </div>
            <div
              style={{
                width: "100%",
                maxWidth: "500px",
                minWidth: "300px",
                padding: "2rem",
                borderRadius: "8px",
                margin: "0 20px",
                backgroundRepeat: "no-repeat",
                color: "white",
              }}
            >
              {properties.length > 0 ? (
                properties.map((property) => (
                  <div className="property-card" key={property._id}>
                    <div className="property-images">
                    <img className=""
                        src={
                          property.photos && property.photos.length > 0
                            ? `http://localhost:5000/${property.photos[0]}`
                            : "https://d17r9yv50dox9q.cloudfront.net/car_gallery/default.jpg"
                        }
                        // alt={`Property ${index + 1}`}
                      />
                      {/* <img
                        src={property.photos || "https://d17r9yv50dox9q.cloudfront.net/car_gallery/default.jpg"} // Assuming there might be an image field
                        alt="Property"
                      /> */}
                      <span>
                        <div className="property-badge" style={{ position: "absolute" }}>
                          <span><FaCamera className="badge-icon" /> 1 </span>
                        </div>
                        <div className="property-badges" style={{ position: "absolute" }}>
                          <FaEye className="badge-icons" /> 9
                        </div>
                      </span>
                    </div>
                    <div className="property-details">
                      <div className="details-header mt-1">
                        <p className="  fw-bold"
                        style={{color:"rgb(47,116,127)"}}
                        >
                         PPC_ID : {property.ppcId} 
                        </p>
                        <p className="mt-1">{property.propertyMode}</p>
                        <p className="category">{property.propertyType}</p>
                        <p className="loc">{property.city}</p>
                      </div>

                      <div className="info-row mt-1">
                        <p>
                          <FaRulerCombined className="icon" /> {property.totalArea}{property.areaUnit}
                          <br />
                          <FaUser className="icon" /> {property.ownership}
                        </p>
                        <p>
                          <FaBed className="icon " /> {property.bedrooms}
                          <br />
                          <FaCalendarAlt className="icon" /> {property.bestTimeToCall}
                        </p>
                      </div>

                      <div className="price-row mb-1">
                        <p className="price">{property.price}</p>
                        <p className="negotiable fw-bold"> Negotiation : <span className="text-dark"> {property.negotiation}</span></p>
                      </div>
                      </div>
                  </div>
                ))
              ) : (
                <p>Loading properties...</p> // Show a loading message until data is fetched
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyCard;

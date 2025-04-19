

import React, { useState, useEffect } from "react";
import { FaEye, FaCamera } from "react-icons/fa";
import axios from "axios";
import myImage from '../Assets/Rectangle 146.png';
import myImage1 from '../Assets/Rectangle 145.png';
import calendar from '../Assets/Calender-01.png';
import bed from '../Assets/BHK-01.png';
import totalarea from '../Assets/Total Area-01.png';
import postedby from '../Assets/Posted By-01.png';
import indianprice from '../Assets/Indian Rupee-01.png';
import { useLocation, useNavigate } from "react-router-dom";

const ZeroView = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();
  const storedPhoneNumber = location.state?.phoneNumber || localStorage.getItem("phoneNumber") || "";
  const [phoneNumber, setPhoneNumber] = useState(storedPhoneNumber);

  useEffect(() => {
    const fetchZeroViewProperties = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/zero-view-properties`);
        const allProperties = response.data.properties || [];
  
        // Sort properties by createdAt in descending order (newest first)
        const sortedProperties = allProperties.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
  
        setProperties(sortedProperties);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };
  
    fetchZeroViewProperties();
  }, []);
  

  return (
    <div className="container d-flex align-items-center justify-content-center p-0">
      <div className="d-flex flex-column align-items-center justify-content-center m-0" style={{ maxWidth: '500px', margin: 'auto', width: '100%', fontFamily: 'Inter, sans-serif' }}>
        <div className="row g-2 w-100">
          <div className="w-100">
            {loading ? (
              <p>Loading properties...</p>
            ) : error ? (
              <p>{error}</p>
            ) : properties.length > 0 ? (
              properties.map((property) => (
                <div
                  key={property._id}
                  className="card mb-3 shadow rounded-4"
                  style={{
                    width: "100%",
                    minWidth: "400px",
                    background: "#F9F9F9",
                    overflow: 'hidden',
                    cursor: 'pointer'
                  }}
                  onClick={() => navigate(`/details/${property.ppcId}`)}
                >
                  <div className="row g-0">
                    <div className="col-md-4 col-4 d-flex flex-column align-items-center">
                      <div className="text-white py-1 px-2 text-center" style={{ width: "100%", background: "#2F747F", fontSize: "10px" }}>
                        PUC- {property.ppcId}
                      </div>
                      <div style={{ position: "relative", width: "100%", height: "150px" }}>
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
                    <div className="col-md-8 col-8" style={{ paddingLeft: "10px", paddingTop: "7px" }}>
                      <div className="d-flex justify-content-start">
                        <p className="m-0" style={{ color: '#5E5E5E', fontWeight: 500 }}>{property.propertyMode || 'N/A'}</p>
                      </div>
                      <p className="fw-bold m-0" style={{ color: '#000000' }}>
                        {property.propertyType
                          ? property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)
                          : 'N/A'}
                      </p>
                      <p className="m-0" style={{ color: '#5E5E5E', fontWeight: 500 }}>
                        {property.city ? property.city.charAt(0).toUpperCase() + property.city.slice(1) : 'N/A'},{" "}
                        {property.area ? property.area.charAt(0).toUpperCase() + property.area.slice(1) : 'N/A'}
                      </p>
                      <div className="card-body ps-2 m-0 pt-0 pe-2 pb-0 d-flex flex-column justify-content-center">
                        <div className="row">
                          <div className="col-6 d-flex align-items-center mt-1 mb-1 ps-1">
                            <img src={totalarea} alt="" width={12} className="me-2" />
                            <span style={{ fontSize: '13px', color: '#5E5E5E', fontWeight: 500 }}>
                              {property.totalArea || 'N/A'} {property.areaUnit ? property.areaUnit.charAt(0).toUpperCase() + property.areaUnit.slice(1) : 'N/A'}
                            </span>
                          </div>
                          <div className="col-6 d-flex align-items-center mt-1 mb-1">
                            <img src={bed} alt="" width={12} className="me-2" />
                            <span style={{ fontSize: '13px', color: '#5E5E5E', fontWeight: 500 }}>{property.bedrooms || 'N/A'}</span>
                          </div>
                          <div className="col-6 d-flex align-items-center mt-1 mb-1 ps-1 pe-1">
                            <img src={postedby} alt="" width={12} className="me-2" />
                            <span style={{ fontSize: '13px', color: '#5E5E5E', fontWeight: 500 }}>
                              {property.ownership ? property.ownership.charAt(0).toUpperCase() + property.ownership.slice(1) : 'N/A'}
                            </span>
                          </div>
                          <div className="col-6 d-flex align-items-center mt-1 mb-1">
                            <img src={calendar} alt="" width={12} className="me-2" />
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
                              <span style={{ fontSize: '15px', color: '#2F747F', fontWeight: 600, letterSpacing: "1px" }}>
                                <img src={indianprice} alt="" width={8} className="me-2" />
                                {property.price ? property.price.toLocaleString('en-IN') : 'N/A'}
                              </span>
                              <span style={{ color: '#2F747F', marginLeft: "5px", fontSize: '11px' }}>
                                Negotiable
                              </span>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No properties with zero views found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZeroView;



import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaRulerCombined, FaBed, FaUserAlt, FaCalendarAlt, FaRupeeSign } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const NewProperty = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);


  const handleClick = () => {
    navigate("/login"); // Navigate to the "About" page
  };
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-all-datas`);
        const fetchedProperties = response.data.users;

        const tenDaysAgo = new Date();
        tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

        const recentProperties = fetchedProperties.filter((property) => {
          const propertyDate = new Date(property.createdAt);
          return propertyDate >= tenDaysAgo;
        });

        setFilteredProperties(recentProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);



  const nextSlide = () => {
    setIsAnimating(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredProperties.length);
    setTimeout(() => {
      setIsAnimating(true);
    }, 3000);
  };

  const prevSlide = () => {
    setIsAnimating(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredProperties.length) % filteredProperties.length);
    setTimeout(() => {
      setIsAnimating(true);
    }, 3000);
  };

  useEffect(() => {
    const track = carouselRef.current;
    if (track) {
      track.style.animation = isAnimating ? "scroll 20s linear infinite" : "none";
    }
  }, [isAnimating]);

  return (
    <>
    <div
      className="p-1 mt-5"
      style={{
        background: "linear-gradient(to right, #2193b0 , #6dd5ed)", 
              backgroundSize: "cover", // Ensures the image covers the entire div
      backgroundPosition: "center", // Centers the image
      height: "auto", // Example height
      width: "100%", // Example width
    }}>
      <h3 className="m-2" style={{color:'#ffffff '}}>RECENT PROPERTY</h3>
      <div style={{ overflow: "hidden", width: "100%", position: "relative", fontFamily: "Inter, sans-serif" }}>
                        <Link to={'/login'} style={{textDecoration:"none"}} >
        
        <div
          className="carousel-track"
          ref={carouselRef}
          style={{
            display: "flex",
            flexWrap: "nowrap",
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property, index) => (
             
              <div
              className="col-lg-4 col-md-6 col-sm-12 mb-4"
              key={property._id}
              style={{ flex: "0 0 auto", marginRight: "10px" }}
            >
              <div
                className="card w-100 h-100"
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <img
                  src={
                    property.photos && property.photos.length > 0
                      ? `http://localhost:5006/${property.photos[0]}`
                      : "https://d17r9yv50dox9q.cloudfront.net/car_gallery/default.jpg"
                  }
                  className="card-img-top"
                  alt="Property"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "250px",
                    objectPosition: "center",
                  }}
                />
                <div
                  className="card-body d-flex flex-column"
                  style={{
                    flex: "1", // Ensures consistent height for card body
                    justifyContent: "space-between", // Space out the content
                  }}
                >
                  {/* Display default placeholders when data is missing */}
                  <p className="card-title m-0">{property.propertyMode || "N/A"}</p>
                  <p className="card-text text-muted m-0">
                    <MdLocationOn color="#2F747F" /> {property.city || "N/A"}
                  </p>
                  <p className="card-text">
                    <span style={{color:"#06AAD4"}}>
                      <FaRupeeSign color="#06AAD4" /> {property.price || "0"}
                    </span>
                  </p>
                  <div className="container p-0">
                    <div className="row">
                      <div className="col-md-6 col-6">
                        <p className="m-0">
                          <FaRulerCombined className="icon" />{" "}
                          {property.totalArea ? `${property.totalArea}${property.areaUnit}` : "N/A"}
                        </p>
                      </div>
                      <div className="col-md-6 col-6">
                        <p className="m-0">
                          <FaBed className="icon ms-3" /> {property.bedrooms || "N/A"} Bhk
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-6">
                        <p className="m-0">
                          <FaUserAlt className="icon" /> {property.ownership || "N/A"}
                        </p>
                      </div>
                      <div className="col-md-6 col-6">
                        <p className="m-0">
                          <FaCalendarAlt className="icon ms-3" /> {property.bestTimeToCall || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn mt-auto"
                    style={{
                      width: "100%",
                      background: "#2294B1",
                      color: "#FFC631",
                      border: "none",
                      height: "50px",
                    }}
                    onClick={() => console.log(`Card clicked: ${property.ppcId}`)}
                  >
                    VIEW DETAILS
                  </button>
                </div>
              </div>
            </div>
            
            ))
          ) : (
            <p className="m-0">No properties found.</p>
          )}
        </div>
        </Link>

        <div style={{ textAlign: "center", marginTop: "10px", position: "absolute", top: "10px", right: "10px", zIndex: 1 }}>
          <button
            onClick={prevSlide}
            className="btn btn-secondary"
            style={{
              background: "#31DEF1",
              color: "#ffffff",
              border: "none",
              height: "50px",
              width: "100px",
            }}
          >
            Prev
          </button>
          <button
            onClick={nextSlide}
            className="btn btn-secondary"
            style={{
              background: "#63CCE4",
              color: "#ffffff",
              border: "none",
              height: "50px",
              width: "100px",
              marginLeft: "10px",
            }}
          >
            Next
          </button>
        </div>

        <style>
          {`
            .carousel-track {
              display: flex;
              flex-wrap: nowrap;
              transition: transform 1s ease-in-out;
            }

            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-100%); }
            }
          `}
        </style>
        <button onClick={handleClick} style={{float:'right',    marginRight: "10px",marginBottom:"10px",
            backgroundColor: "#2294B1", // Light blue-gray button
            color: "#fff",
            fontSize: "16px",
            fontWeight:"500",
            border: "none",
            borderRadius: "30px",
            boxShadow: `
            8px 8px 20px rgba(194, 122, 139, 0.3),
            -8px -8px 20px rgba(255, 255, 255, 0.6)
          `,
            cursor: "pointer",}}> view more</button>
      </div>
      </div>
    </>
  );
};

export default NewProperty;










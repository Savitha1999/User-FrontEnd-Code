


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
  FaEye
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

const PropertyCards = ({phoneNumber}) => {
  const [properties, setProperties] = useState([]);
  // const [filters, setFilters] = useState({ id: '', price: '', propertyMode: '', city: '' });
  const [filters, setFilters] = useState({ 
    id: '', 
    minPrice: '', 
    maxPrice: '', 
    propertyMode: '', 
    city: '' 
  });
    
  const [imageCounts, setImageCounts] = useState({}); // Store image count for each property


  const [advancedFilters, setAdvancedFilters] = useState({
    propertyMode: '', propertyType: '', minPrice: '', maxPrice: '', propertyAge: '', bankLoan: '',
    negotiation: '', length: '', breadth: '', totalArea: '', ownership: '', bedrooms: '',
    kitchen: '', kitchenType: '', balconies: '', floorNo: '', areaUnit: '', propertyApproved: '',
    facing: '', salesMode: '', salesType: '', furnished: '', lift: '', attachedBathrooms: '',
    western: '', numberOfFloors: '', carParking: '', city: ''
  });
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [isAdvancedPopupOpen, setIsAdvancedPopupOpen] = useState(false);
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
  



    // useEffect(() => {
    //   const fetchProperties = async () => {
    //     try {
    //       const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-active-users`);
    //       const allProperties = response.data.users;
    
    //       setProperties(allProperties); // Directly setting the fetched data
    //     } catch (error) {
    //       console.error("Error fetching properties:", error);
    //     }
    //   };
    
    //   fetchProperties();
    // }, []);

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
        }
      };
    
      fetchProperties();
    }, []);
    
    
    const [dropdownState, setDropdownState] = useState({
      activeDropdown: null,
      filterText: "",
      position: { top: 0, left: 0 },
    });
  const toggleDropdown = (field) => {
    setDropdownState((prevState) => ({
      activeDropdown: prevState.activeDropdown === field ? null : field,
      filterText: "",
    }));
  };


  
    const [dataList, setDataList] = useState({});
    const fetchDropdownData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch`);
        const groupedData = response.data.data.reduce((acc, item) => {
          if (!acc[item.field]) acc[item.field] = [];
          acc[item.field].push(item.value);
          return acc;
        }, {});
        setDataList(groupedData);
      } catch (error) {
        // console.error("Error fetching dropdown data:", error);
      }
    };
  
    useEffect(() => {
      fetchDropdownData();
    }, []);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevState) => ({ ...prevState, [name]: value }));

    // setFilters({ ...filters, [name]: value });
    setDropdownState((prevState) => ({ ...prevState, filterText: e.target.value }));

  };

  const handleAdvancedFilterChange = (e) => {
    const { name, value } = e.target;
    setAdvancedFilters((prevState) => ({ ...prevState, [name]: value }));
    setDropdownState((prevState) => ({ ...prevState, filterText: value }));
  };

    const renderDropdown = (field) => {
      const options = dataList[field] || [];
      const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(dropdownState.filterText.toLowerCase())
      );
  
      return (
        dropdownState.activeDropdown === field && (
          <div
            className="dropdown-popup"
            style={{
          
              backgroundColor: '#fff',
              width: '100%',
              maxWidth: '400px',
              padding: '10px',
              zIndex: 10,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              overflowY: 'auto',
              maxHeight: '50vh',
              animation: 'popupOpen 0.3s ease-in-out',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <input
                type="text"
                placeholder="Filter options..."
                value={dropdownState.filterText}
                onChange={handleFilterChange}
                style={{
                  width: '80%',
                  padding: '5px',
                  marginBottom: '10px',
                }}
              />
              <button
                type="button"
                onClick={() => toggleDropdown(field)}
                style={{
                  cursor: 'pointer',
                  border: 'none',
                  background: 'none',
                }}
              >
                <FaTimes size={18} color="red" />
              </button>
            </div>
            <ul
              style={{
                listStyleType: 'none',
                padding: 0,
                margin: 0,
              }}
            >
            
{filteredOptions.map((option, index) => (
  <li
    key={index}
    onClick={() => {
      // Update advanced filters
      setAdvancedFilters((prevState) => ({
        ...prevState,
        [field]: option,
      }));
      
      // Update the filters state
      setFilters((prevState) => ({
        ...prevState,
        [field]: option,
      }));
      
      // Toggle dropdown visibility
      toggleDropdown(field);
    }}
    style={{
      padding: '5px',
      cursor: 'pointer',
      backgroundColor: '#f9f9f9',
      marginBottom: '5px',
    }}
  >
    {option}
  </li>
))}

            </ul>
          </div>
        )
      );
    };

 

  const filteredProperties = properties.filter((property) => { 
    const basicFilterMatch = 
      (filters.id ? property.ppcId?.toString().includes(filters.id) : true) &&
      (filters.propertyMode ? property.propertyMode?.toLowerCase().includes(filters.propertyMode.toLowerCase()) : true) &&
      (filters.city ? property.city?.toLowerCase().includes(filters.city.toLowerCase()) : true);
  
    const priceMatch = 
      (filters.minPrice ? property.price >= Number(filters.minPrice) : true) &&
      (filters.maxPrice ? property.price <= Number(filters.maxPrice) : true);
  
    const advancedFilterMatch = Object.keys(advancedFilters).every((key) => {
      if (!advancedFilters[key]) return true;
  
      if (key === "minPrice") {
        return property.price >= Number(advancedFilters[key]);
      }
      if (key === "maxPrice") {
        return property.price <= Number(advancedFilters[key]);
      }
  
      return property[key]?.toString()?.toLowerCase()?.includes(advancedFilters[key]?.toLowerCase());
    });
  
    return basicFilterMatch && priceMatch && advancedFilterMatch;
  });
  

  const handleCardClick = (ppcId, phoneNumber) => {
    navigate(`/detail/${ppcId}`, { state: { phoneNumber } });
  };

    // navigate("/detail", { state: { phoneNumber } });
  // const formattedPrice = new Intl.NumberFormat('en-IN').format(property.price); // Indian-style number format
  return (
    <Container fluid className="p-0 w-100 d-flex align-items-center justify-content-center ">
      <Helmet>
        <title>Pondy Property | Properties</title>
      </Helmet>
      <Row className="g-3 w-100 ">
        <Col lg={12} className="d-flex align-items-center justify-content-center pt-2 m-0">
          <div
            className="d-flex flex-column justify-content-center align-items-center "
            style={{
              height: '50px', width: '50px', background: '#2F747F', borderRadius: '50%',
              position: 'fixed',
              right: 'calc(50% - 187.5px + 10px)', // Center - half of 375px + some offset
              bottom: '15%', 
              zIndex: '1',
            }}
            onClick={() => setIsFilterPopupOpen(true)}
          >
            <BiSearchAlt fontSize={24} color="#fff" />
          </div>

          <div className="w-100">
            <div style={{ overflowY: 'auto', fontFamily:"Inter, sans-serif" }}>
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
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
                  {property.bestTimeToCall
  ? property.bestTimeToCall.charAt(0).toUpperCase() + property.bestTimeToCall.slice(1)
  : 'N/A'}
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
        </Col>
      </Row>

      {/* Basic Filters Popup */}
     {isFilterPopupOpen && (
  <div 
  style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%', // Responsive width
    maxWidth: '400px', // Prevents stretching on larger screens
    maxHeight: '60vh',
    overflowY: 'auto',
    background: '#fff',
    padding: '20px',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
    zIndex: 2,
    borderRadius: '8px',
  }}
  >
    <style>
      {`
        ::-webkit-scrollbar {
          display: none;
        }
      `}
    </style>

    <h4>
      <FaFilter className="me-2" /> Filter Properties
    </h4>
    <div>
   
  <div className="form-group">
  <label>ID</label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <FaIdCard className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="text"
      name="id"
      value={filters.id}
      onChange={handleFilterChange}
      className="form-input m-0"
      placeholder="ID"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
  </div>
  
  <div className="form-group">
  <label>Min Price  </label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <FaRupeeSign className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="tel"
      name="minPrice"
      value={filters.minPrice}
      onChange={handleFilterChange}
      className="form-input m-0"
      placeholder="Min Price"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
  </div>

  <div className="form-group">
  <label>maxPrice  </label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <FaRupeeSign className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="tel"
      name="maxPrice"
      value={filters.maxPrice}
      onChange={handleFilterChange}
      className="form-input m-0"
      placeholder="Max Price"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
  </div>
     
  <div className="form-group">
  <label style={{ width: "100%" }}>
    <label>Property Mode</label>
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ flex: "1" }}>
        {/* Hidden select dropdown */}
        <select
          name="propertyMode"
          value={filters.propertyMode || ""}
          onChange={handleFilterChange}
          className="form-control"
          style={{ display: "none" }} 
        >
          <option value="">Select Property Mode</option>
          {dataList.propertyMode?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Custom button to act as a dropdown */}
        <button
          className="m-0"
          type="button"
          onClick={() => toggleDropdown("propertyMode")}
          style={{
            cursor: "pointer",
            border: "1px solid #2F747F",
            padding: "10px",
            background: "#fff",
            borderRadius: "5px",
            width: "100%",
            textAlign: "left",
            color: "#2F747F",
          }}
        >
          <span style={{ marginRight: "10px" }}>
            <MdApproval />
          </span>
          {filters.propertyMode || "Select Property Mode"}
        </button>

        {/* Render dropdown list */}
        {renderDropdown("propertyMode")}
      </div>
    </div>
  </label>
</div>

    
        <div className="form-group">
        <label>city </label>
        <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
          <FaRupeeSign className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
          <input
            type="tel"
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            className="form-input m-0"
            placeholder="city"
            style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
          />
        </div>
        </div>
      <button
      style={{background:"#F01963", color:'#fff', border:'0'}}
        className="btn me-2 rounded-0 w-30"
        onClick={() => setIsFilterPopupOpen(false)}
      >
        <FaCheck className="me-1" /> Apply Filters
      </button>
      <button
        className="btn rounded-0 w-30" style={{background:"#FF9D3C", color:'#fff', border:'0'}}
        onClick={() => {
          setIsFilterPopupOpen(false);
          setIsAdvancedPopupOpen(true);
        }}
      >
        <FaTools className="me-1" /> Advanced Filters
      </button>
      <button
        className="btn rounded-0 mt-1 ms-1 w-30" style={{background:"black", color:"#ffffff"}}
        onClick={() => setIsFilterPopupOpen(false)}
      >
        <FaTimes className="me-1" /> Cancel
      </button>
      
    </div>
  </div>
)}


      {/* Advanced Filters Popup */}
      {isAdvancedPopupOpen && (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90%', // Responsive width
      maxWidth: '400px',
      maxHeight: '60vh',
      overflowY: 'scroll',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      background: '#fff',
      padding: '20px',
      boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
      zIndex: 2,
    }}
  >
    <style>
      {`
        ::-webkit-scrollbar {
          display: none;
        }
      `}
    </style>

    {/* Close Button */}
    <button
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'transparent',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
      }}
      onClick={() => setIsAdvancedPopupOpen(false)}
    >
      &times;
    </button>

    <h4>
      <FaTools className="me-2" /> Advanced Filters
    </h4>
    <div>
     
      
        <div>
        {/* Property Mode */}
        <div className="form-group">
          <label style={{ width: '100%'}}>
          <label>Property Mode  </label>
      
            <div style={{ display: "flex", alignItems: "center", width:"100%" }}>
              <div style={{ flex: "1" }}>
                <select
                  name="propertyMode"
                  value={advancedFilters.propertyMode || ""}
                  onChange={handleAdvancedFilterChange}
                  className="form-control"
                  style={{ display: "none" }} // Hide the default <select> dropdown
                >
                  <option value="">Select Property Mode</option>
                  {dataList.propertyMode?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
      
                <button
                  className="m-0"
                  type="button"
                  onClick={() => toggleDropdown("propertyMode")}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #2F747F",
                    padding: "10px",
                    background: "#fff",
                    borderRadius: "5px",
                    width: "100%",
                    textAlign: "left",
                    color: "#2F747F",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
            <MdApproval />
                  </span>
                  {advancedFilters.propertyMode || "Select Property Mode"}
                </button>
      
                {renderDropdown("propertyMode")}
              </div>
            </div>
          </label>
        </div>
      
      
        <div className="form-group">
          <label style={{ width: '100%'}}>
      <label>Property Type  </label>
            <div style={{ display: "flex", alignItems: "center"}}>
              <div style={{ flex: "1" }}>
                <select
                  name="propertyType"
                  value={advancedFilters.propertyType || ""}
                  onChange={handleAdvancedFilterChange}
                  className="form-control"
                  style={{ display: "none" }} // Hide the default <select> dropdown
                >
                  <option value="">Select property Type</option>
                  {dataList.propertyType?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
      
                <button
                  className="m-0"
                  type="button"
                  onClick={() => toggleDropdown("propertyType")}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #2F747F",
                    padding: "10px",
                    background: "#fff",
                    borderRadius: "5px",
                    width: "100%",
                    textAlign: "left",
                    color: "#2F747F",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
         <MdOutlineOtherHouses />
                  </span>
                  {advancedFilters.propertyType || "Select Property Type"}
                </button>
      
                {renderDropdown("propertyType")}
              </div>
            </div>
          </label>
        </div>
        {/* Price */}
       
        <div className="form-group">
        <label>Price  </label>
        <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
          <FaRupeeSign className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
          <input
            type="tel"
            name="price"
            value={advancedFilters.price}
            onChange={handleAdvancedFilterChange}
            className="form-input m-0"
            placeholder="price"
            style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
          />
        </div>
        </div>
        {/* Property Age */}
        <div className="form-group">
          <label style={{ width: '100%'}}>
          <label>Property Age </label>
      
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: "1" }}>
                <select
                  name="propertyAge"
                  value={advancedFilters.propertyAge || ""}
                  onChange={handleAdvancedFilterChange}
                  className="form-control"
                  style={{ display: "none" }} // Hide the default <select> dropdown
                >
                  <option value="">Select Property Age</option>
                  {dataList.propertyAge?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
      
                <button
                  className="m-0"
                  type="button"
                  onClick={() => toggleDropdown("propertyAge")}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #2F747F",
                    padding: "10px",
                    background: "#fff",
                    borderRadius: "5px",
                    width: "100%",
                    textAlign: "left",
                    color: "#2F747F",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
            <MdSchedule />
                  </span>
                  {advancedFilters.propertyAge || "Select Property Age"}
                </button>
      
                {renderDropdown("propertyAge")}
              </div>
            </div>
          </label>
        </div>
      
        {/* Bank Loan */}
      
        <div className="form-group">
          <label style={{ width: '100%'}}>
          <label>Bank Loan </label>
      
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: "1" }}>
                <select
                  name="bankLoan"
                  value={advancedFilters.bankLoan || ""}
                  onChange={handleAdvancedFilterChange}
                  className="form-control"
                  style={{ display: "none" }} // Hide the default <select> dropdown
                >
                  <option value="">Select Bank Loan</option>
                  {dataList.bankLoan?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
      
                <button
                  className="m-0"
                  type="button"
                  onClick={() => toggleDropdown("bankLoan")}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #2F747F",
                    padding: "10px",
                    background: "#fff",
                    borderRadius: "5px",
                    width: "100%",
                    textAlign: "left",
                    color: "#2F747F",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
             <BsBank />
                  </span>
                  {advancedFilters.bankLoan || "Select Bank Loan"}
                </button>
      
                {renderDropdown("bankLoan")}
              </div>
            </div>
          </label>
        </div>
      
        </div>
      {/* // )} */}
      
      
      {/* {currentStep >= 2 && ( */}
                      <div>
        {/* Negotiation */}
      
        <div className="form-group">
          <label style={{ width: '100%'}}>
          <label>Negotiation </label>
      
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: "1" }}>
                <select
                  name="negotiation"
                  value={advancedFilters.negotiation || ""}
                  onChange={handleAdvancedFilterChange}
                  className="form-control"
                  style={{ display: "none" }} // Hide the default <select> dropdown
                >
                  <option value="">Select negotiation</option>
                  {dataList.negotiation?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
      
                <button
                  className="m-0"
                  type="button"
                  onClick={() => toggleDropdown("negotiation")}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #2F747F",
                    padding: "10px",
                    background: "#fff",
                    borderRadius: "5px",
                    width: "100%",
                    textAlign: "left",
                    color: "#2F747F",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
           <FaHandshake />
                  </span>
                  {advancedFilters.negotiation || "Selectnegotiation"}
                </button>
      
                {renderDropdown("negotiation")}
              </div>
            </div>
          </label>
        </div>
      
        {/* Length */} 
        <div className="form-group">
        <label>length:</label>
        <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
          <AiOutlineColumnHeight className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
          <input
            type="text"
            name="length"
            value={advancedFilters.length}
            onChange={handleAdvancedFilterChange}
            className="form-input m-0"
            placeholder="length"
            style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
          />
        </div>
      </div>
        {/* Breadth */}
        <div className="form-group">
        <label>breadth:</label>
        <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
          <AiOutlineColumnWidth className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
          <input
            type="text"
            name="breadth"
            value={advancedFilters.breadth}
            onChange={handleAdvancedFilterChange}
            className="form-input m-0"
            placeholder="breadth"
            style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
          />
        </div>
        </div>
        {/* Total Area */}
        <div className="form-group">
        <label>Total Area:  </label>
        <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
          <GiResize className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
          <input
            type="text"
            name="totalArea"
            value={advancedFilters.totalArea}
            onChange={handleAdvancedFilterChange}
            className="form-input m-0"
            placeholder="totalArea"
            style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
          />
        </div>
        </div>
      
          {/* areaUnit */}
          <div className="form-group">
          <label style={{ width: '100%'}}>
          <label>Area Unit  </label>
      
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: "1" }}>
                <select
                  name="areaUnit"
                  value={advancedFilters.areaUnit || ""}
                  onChange={handleAdvancedFilterChange}
                  className="form-control"
                  style={{ display: "none" }} // Hide the default <select> dropdown
                >
                  <option value="">Select areaUnit</option>
                  {dataList.areaUnit?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
      
                <button
                  className="m-0"
                  type="button"
                  onClick={() => toggleDropdown("areaUnit")}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #2F747F",
                    padding: "10px",
                    background: "#fff",
                    borderRadius: "5px",
                    width: "100%",
                    textAlign: "left",
                    color: "#2F747F",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
                   <FaChartArea />
                  </span>
                  {advancedFilters.areaUnit || "Select areaUnit"}
                </button>
      
                {renderDropdown("areaUnit")}
              </div>
            </div>
          </label>
        </div>
      
        {/* Ownership */}
        <div className="form-group">
          <label style={{ width: '100%'}}>
          <label>Ownership </label>
      
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: "1" }}>
                <select
                  name="ownership"
                  value={advancedFilters.ownership || ""}
                  onChange={handleAdvancedFilterChange}
                  className="form-control"
                  style={{ display: "none" }} // Hide the default <select> dropdown
                >
                  <option value="">Select ownership</option>
                  {dataList.ownership?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
      
                <button
                  className="m-0"
                  type="button"
                  onClick={() => toggleDropdown("ownership")}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #2F747F",
                    padding: "10px",
                    background: "#fff",
                    borderRadius: "5px",
                    width: "100%",
                    textAlign: "left",
                    color: "#2F747F",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
             <HiUserGroup />
                  </span>
                  {advancedFilters.ownership || "Select ownership"}
                </button>
      
                {renderDropdown("ownership")}
              </div>
            </div>
          </label>
        </div>
      
        </div>
      
      
                      <div>
        {/* Bedrooms */}
      
      <div className="form-group">
          <label style={{ width: '100%'}}>
          <label>bedrooms </label>
      
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: "1" }}>
                <select
                  name="bedrooms"
                  value={advancedFilters.bedrooms || ""}
                  onChange={handleAdvancedFilterChange}
                  className="form-control"
                  style={{ display: "none" }} // Hide the default <select> dropdown
                >
                  <option value="">Select bedrooms</option>
                  {dataList.bedrooms?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
      
                <button
                  className="m-0"
                  type="button"
                  onClick={() => toggleDropdown("bedrooms")}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #2F747F",
                    padding: "10px",
                    background: "#fff",
                    borderRadius: "5px",
                    width: "100%",
                    textAlign: "left",
                    color: "#2F747F",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
          <FaBed />
                  </span>
                  {advancedFilters.bedrooms || "Select bedrooms"}
                </button>
      
                {renderDropdown("bedrooms")}
              </div>
            </div>
          </label>
        </div>
        {/* kitchen */}
        <div className="form-group">
          <label style={{ width: '100%'}}>
          <label>kitchen </label>
      
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: "1" }}>
                <select
                  name="kitchen"
                  value={advancedFilters.kitchen || ""}
                  onChange={handleAdvancedFilterChange}
                  className="form-control"
                  style={{ display: "none" }} // Hide the default <select> dropdown
                >
                  <option value="">Select kitchen</option>
                  {dataList.kitchen?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
      
                <button
                  className="m-0"
                  type="button"
                  onClick={() => toggleDropdown("kitchen")}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #2F747F",
                    padding: "10px",
                    background: "#fff",
                    borderRadius: "5px",
                    width: "100%",
                    textAlign: "left",
                    color: "#2F747F",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
               <GiKitchenScale />
                  </span>
                  {advancedFilters.kitchen || "Select kitchen"}
                </button>
      
                {renderDropdown("kitchen")}
              </div>
            </div>
          </label>
        </div>
          {/* kitchenType */}
          <div className="form-group">
          <label style={{ width: '100%'}}>
          <label>kitchenType </label>
      
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: "1" }}>
                <select
                  name="kitchenType"
                  value={advancedFilters.kitchenType || ""}
                  onChange={handleAdvancedFilterChange}
                  className="form-control"
                  style={{ display: "none" }} // Hide the default <select> dropdown
                >
                  <option value="">Select kitchenType</option>
                  {dataList.kitchenType?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
      
                <button
                  className="m-0"
                  type="button"
                  onClick={() => toggleDropdown("kitchenType")}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #2F747F",
                    padding: "10px",
                    background: "#fff",
                    borderRadius: "5px",
                    width: "100%",
                    textAlign: "left",
                    color: "#2F747F",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
                 <FaKitchenSet />
                  </span>
                  {advancedFilters.kitchenType || "Select kitchenType"}
                </button>
      
                {renderDropdown("kitchenType")}
              </div>
            </div>
          </label>
        </div>
          {/* balconies */}
          <div className="form-group">
          <label style={{ width: '100%'}}>
          <label>balconies </label>
      
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: "1" }}>
                <select
                  name="balconies"
                  value={advancedFilters.balconies || ""}
                  onChange={handleAdvancedFilterChange}
                  className="form-control"
                  style={{ display: "none" }} // Hide the default <select> dropdown
                >
                  <option value="">Select balconies</option>
                  {dataList.balconies?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
      
                <button
                  className="m-0"
                  type="button"
                  onClick={() => toggleDropdown("balconies")}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #2F747F",
                    padding: "10px",
                    background: "#fff",
                    borderRadius: "5px",
                    width: "100%",
                    textAlign: "left",
                    color: "#2F747F",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
              <MdOutlineMeetingRoom />
                  </span>
                  {advancedFilters.balconies || "Select balconies"}
                </button>
      
                {renderDropdown("balconies")}
              </div>
            </div>
          </label>
        </div>
          {/* floorNo */}
          <div className="form-group">
          <label style={{ width: '100%'}}>
          <label>floorNo </label>
      
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: "1" }}>
                <select
                  name="floorNo"
                  value={advancedFilters.floorNo || ""}
                  onChange={handleAdvancedFilterChange}
                  className="form-control"
                  style={{ display: "none" }} // Hide the default <select> dropdown
                >
                  <option value="">Select floorNo</option>
                  {dataList.floorNo?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
      
                <button
                  className="m-0"
                  type="button"
                  onClick={() => toggleDropdown("floorNo")}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #2F747F",
                    padding: "10px",
                    background: "#fff",
                    borderRadius: "5px",
                    width: "100%",
                    textAlign: "left",
                    color: "#2F747F",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
              <BsBuildingsFill />
                  </span>
                  {advancedFilters.floorNo || "Select floorNo"}
                </button>
      
                {renderDropdown("floorNo")}
              </div>
            </div>
          </label>
        </div>
        </div>
        
      
                      <div>
          {/* propertyApproved */}
      
          <div className="form-group">
          <label style={{ width: '100%'}}>
          <label>property Approved</label>
      
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: "1" }}>
                <select
                  name="propertyApproved"
                  value={advancedFilters.propertyApproved || ""}
                  onChange={handleAdvancedFilterChange}
                  className="form-control"
                  style={{ display: "none" }} // Hide the default <select> dropdown
                >
                  <option value="">Select propertyApproved</option>
                  {dataList.propertyApproved?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
      
                <button
                  className="m-0"
                  type="button"
                  onClick={() => toggleDropdown("propertyApproved")}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #2F747F",
                    padding: "10px",
                    background: "#fff",
                    borderRadius: "5px",
                    width: "100%",
                    textAlign: "left",
                    color: "#2F747F",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
                    <BsFillHouseCheckFill />
                  </span>
                  {advancedFilters.propertyApproved || "Select propertyApproved"}
                </button>
      
                {renderDropdown("propertyApproved")}
              </div>
            </div>
          </label>
        </div>
      
          {/* postedBy */}
          <div className="form-group">
          <label style={{ width: '100%'}}>
          <label>postedBy  </label>
      
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: "1" }}>
                <select
                  name="postedBy"
                  value={advancedFilters.postedBy || ""}
                  onChange={handleAdvancedFilterChange}
                  className="form-control"
                  style={{ display: "none" }} // Hide the default <select> dropdown
                >
                  <option value="">Select postedBy</option>
                  {dataList.postedBy?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
      
                <button
                  className="m-0"
                  type="button"
                  onClick={() => toggleDropdown("postedBy")}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #2F747F",
                    padding: "10px",
                    background: "#fff",
                    borderRadius: "5px",
                    width: "100%",
                    textAlign: "left",
                    color: "#2F747F",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
              <FaUserAlt />
                  </span>
                  {advancedFilters.postedBy || "Select postedBy"}
                </button>
      
                {renderDropdown("postedBy")}
              </div>
            </div>
          </label>
        </div>
          {/* facing */}
          <div className="form-group">
      
          <label style={{ width: '100%'}}>
          <label>facing</label>
      
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: "1" }}>
                <select
                  name="facing"
                  value={advancedFilters.facing || ""}
                  onChange={handleAdvancedFilterChange}
                  className="form-control"
                  style={{ display: "none" }} // Hide the default <select> dropdown
                >
                  <option value="">Select facing</option>
                  {dataList.facing?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
      
                <button
                  className="m-0"
                  type="button"
                  onClick={() => toggleDropdown("facing")}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #2F747F",
                    padding: "10px",
                    background: "#fff",
                    borderRadius: "5px",
                    width: "100%",
                    textAlign: "left",
                    color: "#2F747F",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
               <TbArrowLeftRight />
                  </span>
                  {advancedFilters.facing || "Select facing"}
                </button>
      
                {renderDropdown("facing")}
              </div>
            </div>
          </label>
        </div>
          {/* salesMode */}
      
          <div className="form-group">
          <label style={{ width: '100%'}}>
          <label>sales Mode</label>
      
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: "1" }}>
                <select
                  name="salesMode"
                  value={advancedFilters.salesMode || ""}
                  onChange={handleAdvancedFilterChange}
                  className="form-control"
                  style={{ display: "none" }} // Hide the default <select> dropdown
                >
                  <option value="">Select salesMode</option>
                  {dataList.salesMode?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
      
                <button
                  className="m-0"
                  type="button"
                  onClick={() => toggleDropdown("salesMode")}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #2F747F",
                    padding: "10px",
                    background: "#fff",
                    borderRadius: "5px",
                    width: "100%",
                    textAlign: "left",
                    color: "#2F747F",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
                  <GiGears />
                  </span>
                  {advancedFilters.salesMode || "Select salesMode"}
                </button>
      
                {renderDropdown("salesMode")}
              </div>
            </div>
          </label>
        </div>
          {/* salesType */}
          <div className="form-group">
          <label style={{ width: '100%'}}>
            <label>Sale Type  </label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: "1" }}>
                <select
                  name="salesType"
                  value={advancedFilters.salesType || ""}
                  onChange={handleAdvancedFilterChange}
                  className="form-control"
                  style={{ display: "none" }} // Hide the default <select> dropdown
                >
                  <option value="">Select salesType</option>
                  {dataList.salesType?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
      
                <button
                  className="m-0"
                  type="button"
                  onClick={() => toggleDropdown("salesType")}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #2F747F",
                    padding: "10px",
                    background: "#fff",
                    borderRadius: "5px",
                    width: "100%",
                    textAlign: "left",
                    color: "#2F747F",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
              <MdOutlineOtherHouses />
                  </span>
                  {advancedFilters.salesType || "Select salesType"}
                </button>
      
                {renderDropdown("salesType")}
              </div>
            </div>
          </label>
        </div>
        </div>
      
      
     
      
                      <div>
        {/* furnished */}
        <div className="form-group">
          <label style={{width:"100%"}}>
          <label>furnished</label>
      
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: "1" }}>
                <select
                  name="furnished"
                  value={advancedFilters.furnished || ""}
                  onChange={handleAdvancedFilterChange}
                  className="form-control"
                  style={{ display: "none" }} // Hide the default <select> dropdown
                >
                  <option value="">Select furnished</option>
                  {dataList.furnished?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
      
                <button
                  className="m-0"
                  type="button"
                  onClick={() => toggleDropdown("furnished")}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #2F747F",
                    padding: "10px",
                    background: "#fff",
                    borderRadius: "5px",
                    width: "100%",
                    textAlign: "left",
                    color: "#2F747F",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
                     <FaHome />
                  </span>
                  {advancedFilters.furnished || "Select furnished"}
                </button>
      
                {renderDropdown("furnished")}
              </div>
            </div>
          </label>
        </div>
          {/*lift */}
          <div className="form-group">
          <label style={{ width: '100%'}}>
            <label>lift</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: "1" }}>
                <select
                  name="lift"
                  value={advancedFilters.lift || ""}
                  onChange={handleAdvancedFilterChange}
                  className="form-control"
                  style={{ display: "none" }} // Hide the default <select> dropdown
                >
                  <option value="">Select lift</option>
                  {dataList.lift?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
      
                <button
                  className="m-0"
                  type="button"
                  onClick={() => toggleDropdown("lift")}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #2F747F",
                    padding: "10px",
                    background: "#fff",
                    borderRadius: "5px",
                    width: "100%",
                    textAlign: "left",
                    color: "#2F747F",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
                    <MdElevator />
                  </span>
                  {advancedFilters.lift || "Select lift"}
                </button>
      
                {renderDropdown("lift")}
              </div>
            </div>
          </label>
        </div>
      
            {/*attachedBathrooms */}
            <div className="form-group">
          <label style={{ width: '100%'}}>
          <label>attached Bathrooms</label>
      
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: "1" }}>
                <select
                  name="attachedBathrooms"
                  value={advancedFilters.attachedBathrooms || ""}
                  onChange={handleAdvancedFilterChange}
                  className="form-control"
                  style={{ display: "none" }} // Hide the default <select> dropdown
                >
                  <option value="">Select attachedBathrooms</option>
                  {dataList.attachedBathrooms?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
      
                <button
                  className="m-0"
                  type="button"
                  onClick={() => toggleDropdown("attachedBathrooms")}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #2F747F",
                    padding: "10px",
                    background: "#fff",
                    borderRadius: "5px",
                    width: "100%",
                    textAlign: "left",
                    color: "#2F747F",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
                   <FaBath />
                  </span>
                  {advancedFilters.attachedBathrooms || "Select attachedBathrooms"}
                </button>
      
                {renderDropdown("attachedBathrooms")}
              </div>
            </div>
          </label>
        </div>
          {/* western */}
          <div className="form-group">
      
          <label style={{ width: '100%'}}>
          <label>western</label>
      
            <div style={{ display: "flex", alignItems: "center"}}>
              <div style={{ flex: "1" }}>
                <select
                  name="western"
                  value={advancedFilters.western || ""}
                  onChange={handleAdvancedFilterChange}
                  className="form-control"
                  style={{ display: "none" }} // Hide the default <select> dropdown
                >
                  <option value="">Select western</option>
                  {dataList.western?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
      
                <button
                  className="m-0"
                  type="button"
                  onClick={() => toggleDropdown("western")}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #2F747F",
                    padding: "10px",
                    background: "#fff",
                    borderRadius: "5px",
                    width: "100%",
                    textAlign: "left",
                    color: "#2F747F",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
                     <FaToilet />
                  </span>
                  {advancedFilters.western || "Select western"}
                </button>
      
                {renderDropdown("western")}
              </div>
            </div>
          </label>
        </div>
          {/* numberOfFloors */}
          <div className="form-group">
      
          <label style={{ width: '100%'}}>
          <label>number Of Floors</label>
      
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: "1" }}>
                <select
                  name="numberOfFloors"
                  value={advancedFilters.numberOfFloors || ""}
                  onChange={handleAdvancedFilterChange}
                  className="form-control"
                  style={{ display: "none" }} // Hide the default <select> dropdown
                >
                  <option value="">Select numberOfFloors</option>
                  {dataList.numberOfFloors?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
      
                <button
                  className="m-0"
                  type="button"
                  onClick={() => toggleDropdown("numberOfFloors")}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #2F747F",
                    padding: "10px",
                    background: "#fff",
                    borderRadius: "5px",
                    width: "100%",
                    textAlign: "left",
                    color: "#2F747F",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
                     <BsBuildingsFill />
                  </span>
                  {advancedFilters.numberOfFloors || "Select numberOfFloors"}
                </button>
      
                {renderDropdown("numberOfFloors")}
              </div>
            </div>
          </label>
        </div>
          {/* carParking */}
      
          <div className="form-group">
          <label style={{ width: '100%'}}>
          <label>car Parking</label>
      
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: "1" }}>
                <select
                  name="carParking"
                  value={advancedFilters.carParking || ""}
                  onChange={handleAdvancedFilterChange}
                  className="form-control"
                  style={{ display: "none" }} // Hide the default <select> dropdown
                >
                  <option value="">Select carParking</option>
                  {dataList.carParking?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
      
                <button
                  className="m-0"
                  type="button"
                  onClick={() => toggleDropdown("carParking")}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #2F747F",
                    padding: "10px",
                    background: "#fff",
                    borderRadius: "5px",
                    width: "100%",
                    textAlign: "left",
                    color: "#2F747F",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
                    <FaCar />
                  </span>
                  {advancedFilters.carParking || "Select carParking"}
                </button>
      
                {renderDropdown("carParking")}
              </div>
            </div>
          </label>
        </div>
        </div>
      
      
        {/*   rentalPropertyAddress */}
      <div>
        <div className="form-group">
      <label>rental Property Address:</label>
      
      <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px solid #2F747F', background:"#fff"}}>
          <MdLocationCity className="input-icon" 
          style={{color: '#2F747F', marginLeft:"10px"}} />
          <input
            type="text"
            name="rentalPropertyAddress"
            value={advancedFilters.rentalPropertyAddress}
            onChange={handleAdvancedFilterChange}
            className="form-input m-0"
            placeholder="Rental Property Address"
            style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
          />
        </div>
      </div>
      
      
        {/* country */}
      
        <div className="form-group">
        <label>country:</label>
        <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
          <BiWorld className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
          <input
            type="text"
            name="country"
            value={advancedFilters.country}
            onChange={handleAdvancedFilterChange}
            className="form-input m-0"
            placeholder="country"
            style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
          />
        </div>
        </div>
        
        {/* State */}
      
      <div className="form-group">
        <label>State:</label>
        <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
          <MdLocationCity className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
          <input
            type="text"
            name="state"
            value={advancedFilters.state}
            onChange={handleAdvancedFilterChange}
            className="form-input m-0"
            placeholder="State"
            style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
          />
        </div>
      </div>
        {/* City */}
      
      <div className="form-group">
        <label>City:</label>
        <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
          <FaCity className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
          <input
            type="text"
            name="city"
            value={advancedFilters.city}
            onChange={handleAdvancedFilterChange}
            className="form-input m-0"
            placeholder="City"
            style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
          />
        </div>
      </div>
      
        {/* district */}
        <div className="form-group">
        <label>District:</label>
        <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
          <FaRegAddressCard className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
          <input
            type="text"
            name="district"
            value={advancedFilters.district}
            onChange={handleAdvancedFilterChange}
            className="form-input m-0"
            placeholder="District"
            style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
          />
        </div>
      </div>
        {/* area */}
        <div className="form-group">
        <label>Area:</label>
        <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
          <MdLocationOn className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
          <input
            type="text"
            name="area"
            value={advancedFilters.area}
            onChange={handleAdvancedFilterChange}
            className="form-input m-0"
            placeholder="Area"
            style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
          />
        </div>
      </div>
        {/* streetName */}
        <div className="form-group">
        <label>Street Name:</label>
        <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
          <FaRoad className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
          <input
            type="text"
            name="streetName"
            value={advancedFilters.streetName}
            onChange={handleAdvancedFilterChange}
            className="form-input m-0"
            placeholder="Street Name"
            style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
          />
        </div>
      </div>
        {/* doorNumber */}
        <div className="form-group">
        <label>Door Number:</label>
        <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
          <FaDoorClosed className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
          <input
            type="text"
            name="doorNumber"
            value={advancedFilters.doorNumber}
            onChange={handleAdvancedFilterChange}
            className="form-input m-0"
            placeholder="Door Number"
            style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
          />
        </div>
        </div>
      
        {/* Nagar */}
        <div className="form-group">
        <label>Nagar:</label>
        <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
          <FaMapPin className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
          <input
            type="text"
            name="nagar"
            value={advancedFilters.nagar}
            onChange={handleAdvancedFilterChange}
            className="form-input m-0"
            placeholder="Nagar"
            style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
          />
        </div>
      </div>
      
        
    

        {/* Best Time to Call */}
        <div className="form-group" >
          <label style={{width:'100%'}}>
          <label>best Time To Call</label>
      
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: "1" }}>
                <select
                  name="bestTimeToCall"
                  value={advancedFilters.bestTimeToCall || ""}
                  onChange={handleAdvancedFilterChange}
                  className="form-control"
                  style={{ display: "none" }} // Hide the default <select> dropdown
                >
                  <option value="">Select bestTimeToCall</option>
                  {dataList.bestTimeToCall?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
      
                <button
                  className="m-0"
                  type="button"
                  onClick={() => toggleDropdown("bestTimeToCall")}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #2F747F",
                    padding: "10px",
                    background: "#fff",
                    borderRadius: "5px",
                    width: "100%",
                    textAlign: "left",
                    color: "#2F747F",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
                    <FaHome />
                  </span>
                  {advancedFilters.bestTimeToCall || "Select bestTimeToCall"}
                </button>
      
                {renderDropdown("bestTimeToCall")}
              </div>
            </div>
          </label>
        </div>
        </div>
      
      
      <button
            style={{background:"#F01963", color:'#fff', border:'0'}}

        className="btn btn-primary mb-2 w-100"
        onClick={() => setIsAdvancedPopupOpen(false)}
      >
        <FaCheck className="me-1" /> Apply Filters
      </button>
      <button
        className="btn w-100" style={{background:"black", color:'#ffffff'}}
        onClick={() => setIsAdvancedPopupOpen(false)}
      >
        <FaTimes className="me-1" /> Cancel
      </button>
    </div>
  </div>
)}

    </Container>
  );
};

export default PropertyCards;



































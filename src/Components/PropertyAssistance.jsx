



import React, { useState, useEffect } from "react";
import axios from "axios";
// import { FaChevronDown, FaPhone } from "react-icons/fa";
import imge from "../Assets/ppbuyer.png";
import {
  FaCity, FaMapMarkerAlt, FaLandmark, FaMoneyBillWave, FaHome, FaRegBuilding, FaCalendarAlt, FaRupeeSign ,
  FaUniversity, FaCheckCircle, FaCompass, FaFileAlt, FaBuilding, FaRuler, FaBed, FaCreditCard, FaChevronDown , FaPhone , FaClock
, FaComment,
FaRulerCombined,
FaUserAlt,
FaPhoneAlt,
FaTimes} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import minprice from "../Assets/Price Mini-01.png";
import maxprice from "../Assets/Price maxi-01.png";



const PropertyForm = ({ phoneNumber, existingData }) => {
    const [hovered, setHovered] = useState(false);
  
    const baseStyle = {
      backgroundColor: "#019988",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    };
  
    const hoverStyle = {
      backgroundColor: "#017a6e",
    };
   
  // Function to handle price selection
  const handlePriceSelect = (priceType, price) => {
    setFormData((prevState) => ({
      ...prevState,
      [priceType]: price,
    }));
    toggleDropdown(null); // Close the dropdown after selecting an option
  };

  const [formData, setFormData] = useState({
    phoneNumber: phoneNumber || "",
    altPhoneNumber: "",
    city: "",
    area: "",
    loanInput: "",
    minPrice: "",
    maxPrice: "",
    totalArea:"",
    areaUnit: "",
    bedrooms: "",
    propertyMode: "",
    propertyType: "",
    propertyAge: "",
    bankLoan: "",
    propertyApproved: "",
    facing: "",
    state: "",
    paymentType: "",
    description: "",
    baName:"",
    alternatePhone:""
  });

useEffect(() => {
    const recordDashboardView = async () => {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/record-views`, {
          phoneNumber: phoneNumber,
          viewedFile: " Property Assistance" ,
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

    useEffect(() => {
      const recordDashboardView = async () => {
        try {
          await axios.post(`${process.env.REACT_APP_API_URL}/record-views`, {
            phoneNumber: phoneNumber,
            viewedFile: "Add Buyer Assistance",
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
  

  const [paymentTypes, setPaymentTypes] = useState([]);


  useEffect(() => {
    fetchPaymentTypes();
  }, []);
  
  const fetchPaymentTypes = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/payment-all`);
      setPaymentTypes(res.data); // Expected format: [{ paymentType: "Online" }, { paymentType: "Cash" }, ...]
    } catch (error) {
      console.error('Error fetching payment types:', error);
    }
  };
const navigate = useNavigate();
  
  const [dataList, setDataList] = useState({});
  const [dropdownState, setDropdownState] = useState({ activeDropdown: null, filterText: "" });

  const [message, setMessage] = useState("");
const [showPopup, setShowPopup] = useState(false);
const [showConfirmPopup, setShowConfirmPopup] = useState(false);

const handleSubmit = (e) => {
  e.preventDefault();
  setShowConfirmPopup(true); // just show the confirmation
};



  useEffect(() => {
    fetchDropdownData();
    if (existingData) {
      setFormData(existingData);
    }
  }, [existingData]);

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
    }
  };

  const toggleDropdown = (field) => {
    setDropdownState((prevState) => ({ activeDropdown: prevState.activeDropdown === field ? null : field, filterText: "" }));
  };

  const handleDropdownSelect = (field, value) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
    setDropdownState({ activeDropdown: null, filterText: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmPopup(false); // hide the confirm popup
  
    try {
      let response;
  
      if (formData._id) {
        // Update existing request
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}/update-buyerAssistance/${formData._id}`,
          formData
        );
        setMessage("Buyer Assistance request updated successfully!");
      } else {
        // Create new request
        response = await axios.post(`${process.env.REACT_APP_API_URL}/add-buyerAssistance`, formData);
        setFormData(response.data.data); // Save returned formData with _id
        setMessage("Buyer Assistance request added successfully!");
      }
  
      setShowPopup(true);
  
      // ⏳ Wait 10 seconds before navigating
      setTimeout(() => {
        setShowPopup(false);
        setMessage("Buyer Assistance View Within Seconds");
  
        const buyerId = response?.data?.data?._id || formData._id;
        if (buyerId) {
          // navigate(`/detail-buyer-assistance/${buyerId}`);
          navigate(`/buyer-list`);


        }
      }, 3000); // 10 seconds
  
    } catch (error) {
      setMessage("Please fill all required fields correctly.");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        setMessage("");
      }, 3000);
    }
  };

const minPriceEnum = [
  "0", "50001", "100001", "200001", "300001", "800001", "1000001", "1200001",
  "1500001", "2000001", "2500001", "3000001", "4000001", "5000001", "7000001",
  "8000001", "10000001", "20000001", "50000001", "70000001", "100000001",
  "150000001"
];

const maxPriceEnum = [
  "50000", "100000", "200000", "300000", "800000", "1000000", "1200000", "1500000",
  "2000000", "2500000", "3000000", "4000000", "5000000", "7000000", "8000000",
  "10000000", "20000000", "50000000", "70000000", "100000000", "150000000",
  "15 cr+"
];

  return (
    <div className="property-form-container p-1" style={{  overflowY: "auto",  position: "relative", scrollbarWidth: "none" ,  fontFamily: "Inter, sans-serif",}}>
      <img src={imge} alt="" className="header-image"  style={{width:'100%'}}/>
      <div className="w-100 d-flex justify-content-around align-items-center mt-3">
        <button style={{
          ...baseStyle,
          opacity: 0.6,
          cursor: "not-allowed",
        }}
        disabled
        >Add Buyer Assistant</button>
        <button   style={{
          ...baseStyle,
          ...(hovered ? hoverStyle : {}),
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => navigate(`/Buyer-List-Filter`)}

   >view Buyer List</button>

      </div>
      <h4 className="form-title mt-3" style={{color: '#2F747F', fontSize:"15px", fontWeight:"bold"}}>Buyer Assistance</h4>


      <div>
      {message && <div className="alert text-success text-bold">{message}</div>}
      {/* Your existing component structure goes here */}
    </div>

      {showConfirmPopup && (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999,
    }}
  >
    <div
      style={{
        background: 'white',
        padding: '24px',
        borderRadius: '8px',
        width: '320px',
        textAlign: 'center',
      }}
    >
      <h5>Do you want to create this Buyer Assistance request?</h5>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around' }}>
        <button
          onClick={handleConfirmSubmit}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6CBAAF',
            border: 'none',
            color: '#fff',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Yes
        </button>
        <button
          onClick={() => setShowConfirmPopup(false)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#ccc',
            border: 'none',
            color: '#333',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          No
        </button>
      </div>
    </div>
  </div>
)}



      <form onSubmit={handleSubmit} className="p-3">
  
      {/* <div className="row mb-3 justify-content-around">
<div className="col-5 p-0">
    <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%', border: '1px solid #2F747F', background: "#fff" }}>
      <FaRupeeSign className="input-icon" style={{ color: '#2F747F', marginLeft: "10px", marginRight: '10px' }} />
      <input
        type="number"
        name="minPrice"
        value={formData.minPrice}
        onChange={handleInputChange}
        className="form-input m-0"
        placeholder="Enter Min Price"
        style={{ width: '100%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
      />
    </div>
  </div>

  <div className="col-5 p-0">
    <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px solid #2F747F', background: "#fff" }}>
      <FaRupeeSign className="input-icon" style={{ color: '#2F747F', marginLeft: "10px" }} />
      <input
        type="number"
        name="maxPrice"
        value={formData.maxPrice}
        onChange={handleInputChange}
        className="form-input m-0"
        placeholder="Enter Max Price"
        style={{  width: '100%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
      />
    </div>
  </div>
</div> */}
{/* <div className="row mb-3 justify-content-around">

  <div className="col-10 mb-2 p-0">
    <input
      type="text"
      className="form-control"
      placeholder="Filter price options..."
      value={filterText}
      onChange={(e) => setFilterText(e.target.value)}
      style={{ border: "1px solid #2F747F", background: "#E8F5F2", color: "#2F747F" }}
    />
  </div>

  <div className="col-5 p-0">
    <select
      className="form-select"
      name="minPrice"
      value={formData.minPrice}
      onChange={handleInputChange}
      style={{ border: "1px solid #2F747F", background: "#fff", color: "#2F747F" }}
    >
      <option value="">Select Min Price</option>
      {filteredMinPrices.map((price, index) => (
        <option key={index} value={price}>{price}</option>
      ))}
    </select>
  </div>

  <div className="col-5 p-0">
    <select
      className="form-select"
      name="maxPrice"
      value={formData.maxPrice}
      onChange={handleInputChange}
      style={{ border: "1px solid #2F747F", background: "#fff", color: "#2F747F" }}
    >
      <option value="">Select Max Price</option>
      {filteredMaxPrices.map((price, index) => (
        <option key={index} value={price}>{price}</option>
      ))}
    </select>
  </div>

</div> */}



 <div className="row mb-3 justify-content-around">
      {/* Min Price Dropdown */}
      {/* <div className="col-5 p-0">
        <div
          className="dropdown-popup"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#E9F7F2',
            width: '100%',
            maxWidth: '350px',
            padding: '10px',
            zIndex: 10,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            overflowY: 'auto',
            maxHeight: '50vh',
            animation: 'popupOpen 0.3s ease-in-out',
            display: dropdownState.activeDropdown === 'minPrice' ? 'block' : 'none',
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
              className="form-control mt-2"
              style={{
                width: '80%',
                padding: '5px',
                background: '#C0DFDA',
                border: 'none',
                outline: 'none',
              }}
              placeholder="Filter Min Price..."
              value={dropdownState.minPriceFilterText}
              onChange={(e) =>
                setDropdownState((prev) => ({
                  ...prev,
                  minPriceFilterText: e.target.value,
                }))
              }
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // prevents bubbling
                toggleDropdown('minPrice');
              }}
              style={{
                cursor: 'pointer',
                border: 'none',
                background: 'none',
              }}
            >
              <FaTimes size={18} color="red" />
            </button>
          </div>
          <ul className="list-group mt-2 w-100">
            {minPriceEnum
              .filter((price) =>
                price.toLowerCase().includes((dropdownState.minPriceFilterText || '').toLowerCase())
              )
              .map((price, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action d-flex align-items-center"
                  style={{
                    padding: '5px',
                    cursor: 'pointer',
                    color: '#26794A',
                    marginBottom: '5px',
                  }}
                  onClick={() => handlePriceSelect('minPrice', price)} // Update formData minPrice
                >
                  {price}
                </li>
              ))}
          </ul>
        </div>

        <button
  onClick={(e) => {
    e.stopPropagation(); // prevents bubbling
    toggleDropdown('minPrice');
  }}          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#fff',
            border: '1px solid #2F747F',
            color: '#2F747F',
            cursor: 'pointer',
            textAlign: 'center',
          }}
        >
       <img src={minprice} alt="" />    ({formData.minPrice || 'Select MinPrice'})
        </button>
      </div> */}
  <div className="col-5 p-0">
    <div className="input-group">
      <button type="button" style={{border: "1px solid #2F747F",}} className="btn w-100 d-flex justify-content-between align-items-center m-0 text-muted" onClick={() => toggleDropdown("minPrice")}>
        <img src={minprice} alt="" />  {formData.minPrice || "Select minPrice"}
        <FaChevronDown color="#2F747F"/>
      </button>
    </div>

    {dropdownState.activeDropdown === "minPrice" && (
 <div
 className="dropdown-popup"
 style={{
   position: 'fixed',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   // backgroundColor: '#fff',
   backgroundColor: '#E9F7F2',

   width: '100%',
   // maxWidth: '400px',
   maxWidth: '350px',

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
          className="form-control m-0 mt-2"
          placeholder="Filter options..." 
          value={dropdownState.filterText} 
          onChange={(e) => setDropdownState((prevState) => ({ ...prevState, filterText: e.target.value }))} 
          style={{
            width: '80%',
            padding: '5px',
            // marginBottom: '10px',
            background:"#C0DFDA",
            border:"none",
            outline:"none"
}}
        />
         <button
                        type="button"
                        onClick={() => toggleDropdown()}
                        style={{
                          cursor: 'pointer',
                          border: 'none',
                          background: 'none',
                        }}
                      >
                        <FaTimes size={18} color="red" />
                      </button>
                      </div>

        <ul className="list-group mt-2 w-100">
          {(dataList.minPrice || [])
            .filter(option => option.toLowerCase().includes(dropdownState.filterText.toLowerCase()))
            .map((option, index) => (
              <li 
                key={index} 
                className="list-group-item list-group-item-action d-flex align-items-center" 
                onClick={() => handleDropdownSelect("minPrice", option)}
                style={{
                  padding: '5px',
                  cursor: 'pointer',
                  // backgroundColor: '#f9f9f9',
                  color:"#26794A",

                  marginBottom: '5px',
}}
              >
                 {option}
              </li>
          ))}
        </ul>
      </div>
    )}
  </div>

  <div className="col-5 p-0">
    <div className="input-group">
      <button type="button" style={{border: "1px solid #2F747F",}}
       className="btn w-100 d-flex justify-content-between align-items-center m-0 text-muted" onClick={() => toggleDropdown("maxPrice")}>
        <img src={maxprice} alt="" />  {formData.maxPrice || "Select maxPrice"}
        <FaChevronDown color="#2F747F"/>
      </button>
    </div>
    {dropdownState.activeDropdown === "maxPrice" && (
 <div
 className="dropdown-popup"
 style={{
   position: 'fixed',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   // backgroundColor: '#fff',
   backgroundColor: '#E9F7F2',

   width: '100%',
   // maxWidth: '400px',
   maxWidth: '350px',

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
 <input type="text" 
  style={{
    width: '80%',
    padding: '5px',
    // marginBottom: '10px',
    background:"#C0DFDA",
    border:"none",
    outline:"none"
}} className="form-control mt-2" placeholder="Filter options..." value={dropdownState.filterText} onChange={(e) => setDropdownState(prev => ({ ...prev, filterText: e.target.value }))} />
      <button
                        type="button"
                        onClick={() => toggleDropdown()}
                        style={{
                          cursor: 'pointer',
                          border: 'none',
                          background: 'none',
                        }}
                      >
                        <FaTimes size={18} color="red" />
                      </button> 
   </div>    
        <ul className="list-group mt-2 w-100">
          {(dataList.maxPrice || []).filter(option => option.toLowerCase().includes(dropdownState.filterText.toLowerCase())).map((option, index) => (
            <li key={index}
            style={{
              padding: '5px',
              cursor: 'pointer',
              // backgroundColor: '#f9f9f9',
              color:"#26794A",
              marginBottom: '5px',
              }} 
className="list-group-item list-group-item-action d-flex align-items-center" onClick={() => handleDropdownSelect("maxPrice", option)}>
             {option}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
      {/* Max Price Dropdown */}
      {/* <div className="col-5 p-0">
        <div
          className="dropdown-popup"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#E9F7F2',
            width: '100%',
            maxWidth: '350px',
            padding: '10px',
            zIndex: 10,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            overflowY: 'auto',
            maxHeight: '50vh',
            animation: 'popupOpen 0.3s ease-in-out',
            display: dropdownState.activeDropdown === 'maxPrice' ? 'block' : 'none',
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
              className="form-control mt-2"
              style={{
                width: '80%',
                padding: '5px',
                background: '#C0DFDA',
                border: 'none',
                outline: 'none',
              }}
              placeholder="Filter Max Price..."
              value={dropdownState.maxPriceFilterText}
              onChange={(e) =>
                setDropdownState((prev) => ({
                  ...prev,
                  maxPriceFilterText: e.target.value,
                }))
              }
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // prevents bubbling
                toggleDropdown('maxPrice');
              }}
              // onClick={() => toggleDropdown('maxPrice')}
              style={{
                cursor: 'pointer',
                border: 'none',
                background: 'none',
              }}
            >
              <FaTimes size={18} color="red" />
            </button>
          </div>
          <ul className="list-group mt-2 w-100">
            {maxPriceEnum
              .filter((price) =>
                price.toLowerCase().includes((dropdownState.maxPriceFilterText || '').toLowerCase())
              )
              .map((price, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action d-flex align-items-center"
                  style={{
                    padding: '5px',
                    cursor: 'pointer',
                    color: '#26794A',
                    marginBottom: '5px',
                  }}
                  onClick={() => handlePriceSelect('maxPrice', price)} // Update formData maxPrice
                >
                  {price}
                </li>
              ))}
          </ul>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation(); // prevents bubbling
            toggleDropdown('maxPrice');
          }}
          // onClick={() => toggleDropdown('maxPrice')}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#fff',
            border: '1px solid #2F747F',
            color: '#2F747F',
            cursor: 'pointer',
            textAlign: 'center',
          }}
        >
          <img src={maxprice} alt="" /> ({formData.maxPrice || 'select MaxPrice'})
        </button>
      </div> */}
    </div>

      <div className="col-12 mb-3">
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px solid #2F747F', background: "#fff" }}>
    <FaPhoneAlt className="input-icon" style={{ color: '#2F747F', marginLeft: "10px" }} />
    <input
      type="tel"
      name="phoneNumber"
      value={formData.phoneNumber}
      onChange={handleInputChange}
      className="form-input m-0"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
      readOnly 
      />
  </div>
</div>
<div className="col-12 mb-3">
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px solid #2F747F', background: "#fff" }}>
    <FaPhoneAlt className="input-icon" style={{ color: '#2F747F', marginLeft: "10px" }} />
    <input
      type="number"
      name="alternatePhone"
      value={formData.alternatePhone}
      onChange={handleInputChange}
      className="form-input m-0"
      placeholder="Enter Your alternatePhone"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
      />
  </div>
</div>

<div className="row justify-content-center">
  <div className="col-12 mb-3">
    <div className="input-group">
      <button type="button" style={{border: "1px solid #2F747F",}} className="btn w-100 d-flex justify-content-between align-items-center m-0 text-muted" onClick={() => toggleDropdown("propertyMode")}>
        <span><FaBuilding className="me-2" color="#2F747F"/> {formData.propertyMode || "Select Property Mode"}</span> 
        <FaChevronDown color="#2F747F"/>
      </button>
    </div>

    {dropdownState.activeDropdown === "propertyMode" && (
 <div
 className="dropdown-popup"
 style={{
   position: 'fixed',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   // backgroundColor: '#fff',
   backgroundColor: '#E9F7F2',

   width: '100%',
   // maxWidth: '400px',
   maxWidth: '350px',

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
          className="form-control m-0 mt-2"
          placeholder="Filter options..." 
          value={dropdownState.filterText} 
          onChange={(e) => setDropdownState((prevState) => ({ ...prevState, filterText: e.target.value }))} 
          style={{
            width: '80%',
            padding: '5px',
            // marginBottom: '10px',
            background:"#C0DFDA",
            border:"none",
            outline:"none"
}}
        />
         <button
                        type="button"
                        onClick={() => toggleDropdown()}
                        style={{
                          cursor: 'pointer',
                          border: 'none',
                          background: 'none',
                        }}
                      >
                        <FaTimes size={18} color="red" />
                      </button>
                      </div>

        <ul className="list-group mt-2 w-100">
          {(dataList.propertyMode || [])
            .filter(option => option.toLowerCase().includes(dropdownState.filterText.toLowerCase()))
            .map((option, index) => (
              <li 
                key={index} 
                className="list-group-item list-group-item-action d-flex align-items-center" 
                onClick={() => handleDropdownSelect("propertyMode", option)}
                style={{
                  padding: '5px',
                  cursor: 'pointer',
                  // backgroundColor: '#f9f9f9',
                  color:"#26794A",

                  marginBottom: '5px',
}}
              >
                 {option}
              </li>
          ))}
        </ul>
      </div>
    )}
  </div>
</div>

<div className="row">
  {/* Property Type */}
  <div className="col-12 mb-3">
    <div className="input-group">
      <button type="button" style={{border: "1px solid #2F747F",}} className="btn w-100 d-flex justify-content-between align-items-center m-0 text-muted" onClick={() => toggleDropdown("propertyType")}>
        <span><FaHome className="me-2" color="#2F747F" /> {formData.propertyType || "Select Property Type"}</span> 
        <FaChevronDown color="#2F747F"/>
      </button>
    </div>
    {dropdownState.activeDropdown === "propertyType" && (
 <div
 className="dropdown-popup"
 style={{
   position: 'fixed',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   // backgroundColor: '#fff',
   backgroundColor: '#E9F7F2',

   width: '100%',
   // maxWidth: '400px',
   maxWidth: '350px',

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
     <input type="text" className="form-control mt-2"
       style={{
        width: '80%',
        padding: '5px',
        // marginBottom: '10px',
        background:"#C0DFDA",
        border:"none",
        outline:"none"
}} placeholder="Filter options..." value={dropdownState.filterText} onChange={(e) => setDropdownState(prev => ({ ...prev, filterText: e.target.value }))} />
     
     <button
                        type="button"
                        onClick={() => toggleDropdown()}
                        style={{
                          cursor: 'pointer',
                          border: 'none',
                          background: 'none',
                        }}
                      >
                        <FaTimes size={18} color="red" />
                      </button>
     </div>
        <ul className="list-group mt-2 w-100">
          {(dataList.propertyType || []).filter(option => option.toLowerCase().includes(dropdownState.filterText.toLowerCase())).map((option, index) => (
            <li key={index}
             className="list-group-item list-group-item-action d-flex align-items-center" 
             style={{
              padding: '5px',
              cursor: 'pointer',
              // backgroundColor: '#f9f9f9',
              color:"#26794A",

              marginBottom: '5px',
}}
             onClick={() => handleDropdownSelect("propertyType", option)}>
               {option}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>


   {/* Bed */}
   <div className="col-12 mb-3">
    <div className="input-group">
      <button type="button" style={{border: "1px solid #2F747F",}} className="btn w-100 d-flex justify-content-between align-items-center m-0 text-muted" onClick={() => toggleDropdown("bedrooms")}>
        <span><FaBed className="me-2" color="#2F747F" /> {formData.bedrooms || "Select NoBHK"}</span> 
        <FaChevronDown color="#2F747F"/>
      </button>
    </div>
    {dropdownState.activeDropdown === "bedrooms" && (
 <div
 className="dropdown-popup"
 style={{
   position: 'fixed',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   // backgroundColor: '#fff',
   backgroundColor: '#E9F7F2',

   width: '100%',
   // maxWidth: '400px',
   maxWidth: '350px',

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
     <input type="text"
      style={{
        width: '80%',
        padding: '5px',
        // marginBottom: '10px',
        background:"#C0DFDA",
        border:"none",
        outline:"none"
}} className="form-control mt-2" placeholder="Filter options..." value={dropdownState.filterText} onChange={(e) => setDropdownState(prev => ({ ...prev, filterText: e.target.value }))} />

<button
                        type="button"
                        onClick={() => toggleDropdown()}
                        style={{
                          cursor: 'pointer',
                          border: 'none',
                          background: 'none',
                        }}
                      >
                        <FaTimes size={18} color="red" />
                      </button>
     </div>
        <ul className="list-group mt-2 w-100">
          {(dataList.bedrooms || []).filter(option => option.toLowerCase().includes(dropdownState.filterText.toLowerCase())).map((option, index) => (
            <li key={index}  style={{
              padding: '5px',
              cursor: 'pointer',
              // backgroundColor: '#f9f9f9',
              color:"#26794A",

              marginBottom: '5px',
}} className="list-group-item list-group-item-action d-flex align-items-center" onClick={() => handleDropdownSelect("bedrooms", option)}>
               {option}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
  {/* <div className="col-12 mb-3">
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px solid #2F747F', background: "#fff" }}>
    <FaBed className="input-icon" style={{ color: '#2F747F', marginLeft: "10px" }} />
    <input
      type="text"
      name="bedrooms"
      value={formData.bedrooms}
      onChange={handleInputChange}
      className="form-input m-0"
      placeholder="Enter No Of BHK"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div> */}



 {/* Facing */}
 <div className="col-12 mb-3">
    <div className="input-group">
      <button type="button" style={{border: "1px solid #2F747F",}} className="btn w-100 d-flex justify-content-between align-items-center m-0 text-muted" onClick={() => toggleDropdown("facing")}>
        <span><FaCompass className="me-2" color="#2F747F" /> {formData.facing || "Select Facing"}</span> 
        <FaChevronDown color="#2F747F"/>
      </button>
    </div>
    {dropdownState.activeDropdown === "facing" && (
      <div
 className="dropdown-popup"
 style={{
   position: 'fixed',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   // backgroundColor: '#fff',
   backgroundColor: '#E9F7F2',

   width: '100%',
   // maxWidth: '400px',
   maxWidth: '350px',

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
        <input type="text"
          style={{
            width: '80%',
            padding: '5px',
            // marginBottom: '10px',
            background:"#C0DFDA",
            border:"none",
            outline:"none"
    }} className="form-control mt-2" placeholder="Filter options..." value={dropdownState.filterText} onChange={(e) => setDropdownState(prev => ({ ...prev, filterText: e.target.value }))} />

      <button
                        type="button"
                        onClick={() => toggleDropdown()}
                        style={{
                          cursor: 'pointer',
                          border: 'none',
                          background: 'none',
                        }}
                      >
                        <FaTimes size={18} color="red" />
                      </button> 
       </div>
        <ul className="list-group mt-2 w-100">
          {(dataList.facing || []).filter(option => option.toLowerCase().includes(dropdownState.filterText.toLowerCase())).map((option, index) => (
            <li key={index} 
            style={{
              padding: '5px',
              cursor: 'pointer',
              // backgroundColor: '#f9f9f9',
              color:"#26794A",

              marginBottom: '5px',
}} className="list-group-item list-group-item-action d-flex align-items-center" onClick={() => handleDropdownSelect("facing", option)}>
              {option}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>



    {/* Property Approved */}
    <div className="col-12 mb-3">
    <div className="input-group">
      <button type="button" style={{border: "1px solid #2F747F",}}
       className="btn w-100 d-flex justify-content-between align-items-center m-0 text-muted" onClick={() => toggleDropdown("propertyApproved")}>
        <span><FaCheckCircle className="me-2" color="#2F747F" /> {formData.propertyApproved || "Select Property Approved"}</span> 
        <FaChevronDown color="#2F747F"/>
      </button>
    </div>
    {dropdownState.activeDropdown === "propertyApproved" && (
 <div
 className="dropdown-popup"
 style={{
   position: 'fixed',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   // backgroundColor: '#fff',
   backgroundColor: '#E9F7F2',

   width: '100%',
   // maxWidth: '400px',
   maxWidth: '350px',

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
 <input type="text" 
  style={{
    width: '80%',
    padding: '5px',
    // marginBottom: '10px',
    background:"#C0DFDA",
    border:"none",
    outline:"none"
}} className="form-control mt-2" placeholder="Filter options..." value={dropdownState.filterText} onChange={(e) => setDropdownState(prev => ({ ...prev, filterText: e.target.value }))} />
      <button
                        type="button"
                        onClick={() => toggleDropdown()}
                        style={{
                          cursor: 'pointer',
                          border: 'none',
                          background: 'none',
                        }}
                      >
                        <FaTimes size={18} color="red" />
                      </button> 
   </div>    
        <ul className="list-group mt-2 w-100">
          {(dataList.propertyApproved || []).filter(option => option.toLowerCase().includes(dropdownState.filterText.toLowerCase())).map((option, index) => (
            <li key={index}
            style={{
              padding: '5px',
              cursor: 'pointer',
              // backgroundColor: '#f9f9f9',
              color:"#26794A",
              marginBottom: '5px',
              }} 
className="list-group-item list-group-item-action d-flex align-items-center" onClick={() => handleDropdownSelect("propertyApproved", option)}>
             {option}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>

{/* Property Age */}
<div className="col-12 mb-3">
  <div className="input-group">
    <button
      type="button"
      style={{ border: "1px solid #2F747F" }}
      className="btn w-100 d-flex justify-content-between align-items-center m-0 text-muted"
      onClick={() => toggleDropdown("propertyAge")}
    >
      <span >
        <FaCheckCircle className="me-2" color="#2F747F" /> {formData.propertyAge || "Select Property Age"}
      </span>
      <FaChevronDown color="#2F747F" />
    </button>
  </div>

  {dropdownState.activeDropdown === "propertyAge" && (
 <div
 className="dropdown-popup"
 style={{
   position: 'fixed',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   // backgroundColor: '#fff',
   backgroundColor: '#E9F7F2',

   width: '100%',
   // maxWidth: '400px',
   maxWidth: '350px',

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
        className="form-control mt-2"
        placeholder="Filter options..."
        value={dropdownState.filterText}
        onChange={(e) =>
          setDropdownState((prev) => ({ ...prev, filterText: e.target.value }))
        }
      />

<button
                        type="button"
                        onClick={() => toggleDropdown()}
                        style={{
                          cursor: 'pointer',
                          border: 'none',
                          background: 'none',
                        }}
                      >
                        <FaTimes size={18} color="red" />
                      </button>
                      </div>

      <ul className="list-group mt-2 w-100">
        {(dataList.propertyAge || []).filter((option) =>
          option.toLowerCase().includes(dropdownState.filterText.toLowerCase())
        ).map((option, index) => (
          <li
            key={index}
            className="list-group-item list-group-item-action d-flex align-items-center"
            onClick={() => handleDropdownSelect("propertyAge", option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  )}
</div>

  
  {/* Bank Loan */}
  <div className="col-12 mb-3">
    <div className="input-group">
      <button type="button" style={{border: "1px solid #2F747F",}} className="btn w-100 d-flex justify-content-between align-items-center m-0 text-muted" onClick={() => toggleDropdown("bankLoan")}>
        <span><FaUniversity className="me-2" color="#2F747F" /> {formData.bankLoan || "Select Bank Loan"}</span> 
        <FaChevronDown color="#2F747F"/>
      </button>
    </div>
    {dropdownState.activeDropdown === "bankLoan" && (
 <div
 className="dropdown-popup"
 style={{
   position: 'fixed',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   // backgroundColor: '#fff',
   backgroundColor: '#E9F7F2',

   width: '100%',
   // maxWidth: '400px',
   maxWidth: '350px',

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

<input type="text" style={{
                  width: '80%',
                  padding: '5px',
                  // marginBottom: '10px',
                  background:"#C0DFDA",
                  border:"none",
                  outline:"none"
                }} className="form-control mt-2" placeholder="Filter options..." value={dropdownState.filterText} onChange={(e) => setDropdownState(prev => ({ ...prev, filterText: e.target.value }))} />
      
<button
                        type="button"
                        onClick={() => toggleDropdown()}
                        style={{
                          cursor: 'pointer',
                          border: 'none',
                          background: 'none',
                        }}
                      >
                        <FaTimes size={18} color="red" />
                      </button>
                      </div>
      
        <ul className="list-group mt-2 w-100">
          {(dataList.bankLoan || []).filter(option => option.toLowerCase().includes(dropdownState.filterText.toLowerCase())).map((option, index) => (
            <li key={index} style={{
              padding: '5px',
              cursor: 'pointer',
              // backgroundColor: '#f9f9f9',
              color:"#26794A",

              marginBottom: '5px',
              }} className="list-group-item list-group-item-action d-flex align-items-center" onClick={() => handleDropdownSelect("bankLoan", option)}>
               {option}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>


{/* {Total Area} */}
<div className="col-12 mb-3">
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px solid #2F747F', background: "#fff" }}>
    <FaRulerCombined className="input-icon" style={{ color: '#2F747F', marginLeft: "10px" }} />
    <input
      type="text"
      name="totalArea"
      value={formData.totalArea}
      onChange={handleInputChange}
      className="form-input m-0"
      placeholder="Enter Total Area"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>



{/* Area Unit Dropdown */}
<div className="col-12 mb-3">
  <div className="input-group">
    <button type="button" style={{ border: "1px solid #2F747F" }} className="btn w-100 d-flex justify-content-between align-items-center m-0 text-muted" onClick={() => toggleDropdown("areaUnit")}>
      <span><FaRuler className="me-2" color="#2F747F" /> {formData.areaUnit || "Select Area Unit"}</span> 
      <FaChevronDown color="#2F747F" />
    </button>
  </div>
  {dropdownState.activeDropdown === "areaUnit" && (
 <div
 className="dropdown-popup"
 style={{
   position: 'fixed',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   // backgroundColor: '#fff',
   backgroundColor: '#E9F7F2',

   width: '100%',
   // maxWidth: '400px',
   maxWidth: '350px',

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
 <input type="text"
style={{
  width: '80%',
  padding: '5px',
  // marginBottom: '10px',
  background:"#C0DFDA",
  border:"none",
  outline:"none"
              }} className="form-control mt-2" placeholder="Filter options..." value={dropdownState.filterText} onChange={(e) => setDropdownState(prev => ({ ...prev, filterText: e.target.value }))} />
    
<button
                        type="button"
                        onClick={() => toggleDropdown()}
                        style={{
                          cursor: 'pointer',
                          border: 'none',
                          background: 'none',
                        }}
                      >
                        <FaTimes size={18} color="red" />
                      </button>
                      </div>
    
      <ul className="list-group mt-2 w-100">
        {(dataList.areaUnit || []).filter(option => option.toLowerCase().includes(dropdownState.filterText.toLowerCase())).map((option, index) => (
          <li key={index} style={{
            padding: '5px',
            cursor: 'pointer',
            // backgroundColor: '#f9f9f9',
            color:"#26794A",

            marginBottom: '5px',
              }} className="list-group-item list-group-item-action d-flex align-items-center" onClick={() => handleDropdownSelect("areaUnit", option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  )}
</div>



{/* <div className="col-12 mb-3">
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px solid #2F747F', background: "#fff" }}>
    <FaCreditCard className="input-icon" style={{ color: '#2F747F', marginLeft: "10px" }} />
    <input
      type="text"
      name="paymentType"
      value={formData.paymentType}
      onChange={handleInputChange}
      className="form-input m-0"
      placeholder="Enter Payment Type"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div> */}
{/* <div className="col-12 mb-3">
  <div
    className="input-card p-0 rounded-1"
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      border: '1px solid #2F747F',
      background: '#fff',
      position: 'relative',
    }}
  >
    <div
      className="d-flex align-items-center"
      onClick={() => toggleDropdown("paymentType")}
      style={{ cursor: 'pointer', padding: '8px 10px' }}
    >
      <FaCreditCard style={{ color: '#2F747F', marginRight: '10px' }} />
      <span style={{ flex: 1, color: formData.paymentType ? '#000' : '#6c757d' }}>
        {formData.paymentType || "Select Payment Type"}
      </span>
      <FaChevronDown style={{ color: '#2F747F' }} />
    </div>

    {dropdownState.activeDropdown === "paymentType" && (
      <div
        className="dropdown-popup w-100"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#E9F7F2',
          width: '100%',
          maxWidth: '350px',
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
          className="form-control"
          placeholder="Filter options..."
          value={dropdownState.filterText}
          onChange={(e) =>
            setDropdownState((prev) => ({ ...prev, filterText: e.target.value }))
          }
        />
             <button
              type="button"
              onClick={() => toggleDropdown('paymentType')}
              style={{
                cursor: 'pointer',
                border: 'none',
                background: 'none',
              }}
            >
              <FaTimes size={18} color="red" />
            </button>
          </div>
        <ul className="list-group mt-2">
          {(paymentTypes || [])
            .filter((type) =>
              type.paymentType.toLowerCase().includes(dropdownState.filterText.toLowerCase())
            )
            .map((type, index) => (
              <li
                key={index}
                className="list-group-item list-group-item-action"
                style={{
                  padding: '5px',
                  cursor: 'pointer',
                  color: '#26794A',
                  marginBottom: '5px',
                }}
                onClick={() => {
                  handleDropdownSelect("paymentType", type.paymentType);
                  setDropdownState((prev) => ({ ...prev, filterText: "" }));
                }}
              >
                {type.paymentType}
              </li>
            ))}
        </ul>
      </div>
    )}
  </div>
</div> */}
<div className="col-12 mb-3">
  <div
    className="input-card p-0 rounded-1"
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      border: '1px solid #2F747F',
      background: '#fff',
      position: 'relative',
    }}
  >
    <div
      className="d-flex align-items-center"
      onClick={() => toggleDropdown("paymentType")}
      style={{ cursor: 'pointer', padding: '8px 10px' }}
    >
      <FaCreditCard style={{ color: '#2F747F', marginRight: '10px' }} />
      <span style={{ flex: 1, color: formData.paymentType ? '#000' : '#6c757d' }}>
        {formData.paymentType || "Select Payment Type"}
      </span>
      <FaChevronDown style={{ color: '#2F747F' }} />
    </div>

    {dropdownState.activeDropdown === "paymentType" && (
      <div
        className="dropdown-popup w-100"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#E9F7F2',
          width: '100%',
          maxWidth: '350px',
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
          className="form-control"
          placeholder="Filter options..."
          value={dropdownState.filterText}
          onChange={(e) =>
            setDropdownState((prev) => ({ ...prev, filterText: e.target.value }))
          }
        />
             <button
              type="button"
              onClick={() => toggleDropdown('paymentType')}
              style={{
                cursor: 'pointer',
                border: 'none',
                background: 'none',
              }}
            >
              <FaTimes size={18} color="red" />
            </button>
          </div>
        <ul className="list-group mt-2">
          {(paymentTypes || [])
            .filter((type) =>
              type.paymentType.toLowerCase().includes(dropdownState.filterText.toLowerCase())
            )
            .map((type, index) => (
              <li
                key={index}
                className="list-group-item list-group-item-action"
                style={{
                  padding: '5px',
                  cursor: 'pointer',
                  color: '#26794A',
                  marginBottom: '5px',
                }}
                onClick={() => {
                  handleDropdownSelect("paymentType", type.paymentType);
                  setDropdownState((prev) => ({ ...prev, filterText: "" }));
                }}
              >
                {type.paymentType}
              </li>
            ))}
        </ul>
      </div>
    )}
  </div>
</div>
</div>
<div className="col-12 mb-3">
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px solid #2F747F', background: "#fff" }}>
    <FaUserAlt className="input-icon" style={{ color: '#2F747F', marginLeft: "10px" }} />
    <input
      type="text"
      name="baName"
      value={formData.baName}
      onChange={handleInputChange}
      className="form-input m-0"
      placeholder="Enter Your Name"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>
<div className="col-12 mb-3">
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px solid #2F747F', background: "#fff" }}>
    <FaMapMarkerAlt className="input-icon" style={{ color: '#2F747F', marginLeft: "10px" }} />
    <input
      type="text"
      name="state"
      value={formData.state}
      onChange={handleInputChange}
      className="form-input m-0"
      placeholder="Enter State"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>
<div className="col-12 mb-3">
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px solid #2F747F', background: "#fff" }}>
    <FaCity className="input-icon" style={{ color: '#2F747F', marginLeft: "10px" }} />
    <input
      type="text"
      name="city"
      value={formData.city}
      onChange={handleInputChange}
      className="form-input m-0"
      placeholder="Enter City"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>



<div className="col-12 mb-3">
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px solid #2F747F', background: "#fff" }}>
    <FaLandmark className="input-icon" style={{ color: '#2F747F', marginLeft: "10px" }} />
    <input
      type="text"
      name="area"
      value={formData.area}
      onChange={handleInputChange}
      className="form-input m-0"
      placeholder="Enter Area"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>


<div className="col-12 mb-3">
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px solid #2F747F', background: "#fff" }}>
    {/* <FaComment className="input-icon" style={{ color: '#2F747F', marginLeft: "10px" }} /> */}
    <textarea
      name="description"
      value={formData.description}
      onChange={handleInputChange}
      className="form-input m-0"
      placeholder="Enter Description"
      style={{
        flex: '1 0 80%',
        padding: '8px',
        fontSize: '14px',
        border: 'none',
        outline: 'none',
        resize: 'none',  // Optional: Prevent resizing of the textarea
        minHeight: '100px' // Optional: Set a minimum height
      }}
    />
  </div>
</div>

     
  

        <button type="submit" className="submit-button" style={{ padding: "10px 20px", cursor: "pointer", background:"#6CBAAF", border:'none', color:'#ffffff'}}
        
        onMouseOver={(e) => {
          e.target.style.background = "#017a6e"; // Brighter neon on hover
          e.target.style.fontWeight = 500; // Brighter neon on hover
          e.target.style.transition = "background 0.3s ease"; // Brighter neon on hover

        }}
        onMouseOut={(e) => {
          e.target.style.background = "#6CBAAF"; // Original orange
          e.target.style.fontWeight = 400; // Brighter neon on hover

        }}>
          {formData._id ? "UPDATE PROPERTY ASSISTANCE" : "ADD PROPERTY ASSISTANCE"}
        </button>
      </form>
    </div>
  );
};





export default PropertyForm;


















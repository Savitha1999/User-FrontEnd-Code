



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
FaArrowLeft} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";


const BuyerAssistance = ({  existingData }) => {
  const {phoneNumber} = useParams();

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
  
  const [dataList, setDataList] = useState({});
  const [dropdownState, setDropdownState] = useState({ activeDropdown: null, filterText: "" });

  const [message, setMessage] = useState("");
const [showPopup, setShowPopup] = useState(false);
const [showConfirmPopup, setShowConfirmPopup] = useState(false);

const handleSubmit = (e) => {
  e.preventDefault();
  setShowConfirmPopup(true); // just show the confirmation
};

// const handleConfirmSubmit = async () => {
//   setShowConfirmPopup(false); // hide the confirm popup

//   try {
//     let response;

//     if (formData._id) {
//       response = await axios.put(
//         `${process.env.REACT_APP_API_URL}/update-buyerAssistance/${formData._id}`,
//         formData
//       );
//       setMessage(" Buyer Assistance request updated successfully!");
//     } else {
//       response = await axios.post(`${process.env.REACT_APP_API_URL}/add-buyerAssistance`, formData);
//       setFormData(response.data.data);
//       setMessage(" Buyer Assistance request added successfully!");
//     }

//     setShowPopup(true);
//     setTimeout(() => {
//       setShowPopup(false);
//       setMessage("");
//     }, 3000);
//   } catch (error) {
//     setMessage(" Please Fill The All Fields Datas");
//     setShowPopup(true);
//     setTimeout(() => {
//       setShowPopup(false);
//       setMessage("");
//     }, 3000);
//   }
// };


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
    }, 5000); // 10 seconds

  } catch (error) {
    setMessage("Please fill all required fields correctly.");
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      setMessage("");
    }, 3000);
  }
};

const navigate = useNavigate();


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
      console.error("Error fetching dropdown data:", error);
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


  
  const handlePageNavigation = () => {
    navigate('/mobileviews'); // Redirect to the desired path
  };


  return (
    // <div className="property-form-container p-1" style={{  overflowY: "auto",  position: "relative", scrollbarWidth: "none" ,  fontFamily: "Inter, sans-serif",}}>
    
    <div className="d-flex flex-column mx-auto custom-scrollbar"
    style={{
      maxWidth: '450px',
      height: '100vh',
      overflow: 'auto',
      scrollbarWidth: 'none', 
      msOverflowStyle: 'none', 
      fontFamily: 'Inter, sans-serif'
    }}>

      <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
                    <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
                  </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>Buyer Assistance</h3> </div>

    <img src={imge} alt="" className="header-image"  style={{width:'100%'}}/>
      <h4 className="form-title mt-2" style={{color: '#2F747F', fontSize:"15px", fontWeight:"bold"}}>Buyer Assistance</h4>

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



      <form onSubmit={handleSubmit} className="mt-3 p-3">
  
<div className="row mb-3 justify-content-around">
<div className="col-5 p-0">
    <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%', border: '1px solid #2F747F', background: "#fff" }}>
      <FaRupeeSign className="input-icon" style={{ color: '#2F747F', marginLeft: "10px", marginRight: '10px' }} />
      <input
        type="text"
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
        type="text"
        name="maxPrice"
        value={formData.maxPrice}
        onChange={handleInputChange}
        className="form-input m-0"
        placeholder="Enter Max Price"
        style={{  width: '100%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
      />
    </div>
  </div>
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
      <div className="dropdown-popup w-100">
        <input 
          type="text" 
          className="form-control m-0 mt-2"
          placeholder="Filter options..." 
          value={dropdownState.filterText} 
          onChange={(e) => setDropdownState((prevState) => ({ ...prevState, filterText: e.target.value }))} 
        />
        <ul className="list-group mt-2 w-100">
          {(dataList.propertyMode || [])
            .filter(option => option.toLowerCase().includes(dropdownState.filterText.toLowerCase()))
            .map((option, index) => (
              <li 
                key={index} 
                className="list-group-item list-group-item-action d-flex align-items-center" 
                onClick={() => handleDropdownSelect("propertyMode", option)}
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
      <div className="dropdown-popup w-100">
        <input type="text" className="form-control mt-2" placeholder="Filter options..." value={dropdownState.filterText} onChange={(e) => setDropdownState(prev => ({ ...prev, filterText: e.target.value }))} />
        <ul className="list-group mt-2 w-100">
          {(dataList.propertyType || []).filter(option => option.toLowerCase().includes(dropdownState.filterText.toLowerCase())).map((option, index) => (
            <li key={index} className="list-group-item list-group-item-action d-flex align-items-center" onClick={() => handleDropdownSelect("propertyType", option)}>
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
      <div className="dropdown-popup w-100">
        <input type="text" className="form-control mt-2" placeholder="Filter options..." value={dropdownState.filterText} onChange={(e) => setDropdownState(prev => ({ ...prev, filterText: e.target.value }))} />
        <ul className="list-group mt-2 w-100">
          {(dataList.bedrooms || []).filter(option => option.toLowerCase().includes(dropdownState.filterText.toLowerCase())).map((option, index) => (
            <li key={index} className="list-group-item list-group-item-action d-flex align-items-center" onClick={() => handleDropdownSelect("bedrooms", option)}>
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
      <div className="dropdown-popup w-100">
        <input type="text" className="form-control mt-2" placeholder="Filter options..." value={dropdownState.filterText} onChange={(e) => setDropdownState(prev => ({ ...prev, filterText: e.target.value }))} />
        <ul className="list-group mt-2 w-100">
          {(dataList.facing || []).filter(option => option.toLowerCase().includes(dropdownState.filterText.toLowerCase())).map((option, index) => (
            <li key={index} className="list-group-item list-group-item-action d-flex align-items-center" onClick={() => handleDropdownSelect("facing", option)}>
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
      <button type="button" style={{border: "1px solid #2F747F",}} className="btn w-100 d-flex justify-content-between align-items-center m-0 text-muted" onClick={() => toggleDropdown("propertyApproved")}>
        <span><FaCheckCircle className="me-2" color="#2F747F" /> {formData.propertyApproved || "Select Property Approved"}</span> 
        <FaChevronDown color="#2F747F"/>
      </button>
    </div>
    {dropdownState.activeDropdown === "propertyApproved" && (
      <div className="dropdown-popup w-100">
        <input type="text" className="form-control mt-2" placeholder="Filter options..." value={dropdownState.filterText} onChange={(e) => setDropdownState(prev => ({ ...prev, filterText: e.target.value }))} />
        <ul className="list-group mt-2 w-100">
          {(dataList.propertyApproved || []).filter(option => option.toLowerCase().includes(dropdownState.filterText.toLowerCase())).map((option, index) => (
            <li key={index} className="list-group-item list-group-item-action d-flex align-items-center" onClick={() => handleDropdownSelect("propertyApproved", option)}>
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
    <div className="dropdown-popup w-100">
      <input
        type="text"
        className="form-control mt-2"
        placeholder="Filter options..."
        value={dropdownState.filterText}
        onChange={(e) =>
          setDropdownState((prev) => ({ ...prev, filterText: e.target.value }))
        }
      />
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
      <div className="dropdown-popup w-100">
        <input type="text" className="form-control mt-2" placeholder="Filter options..." value={dropdownState.filterText} onChange={(e) => setDropdownState(prev => ({ ...prev, filterText: e.target.value }))} />
        <ul className="list-group mt-2 w-100">
          {(dataList.bankLoan || []).filter(option => option.toLowerCase().includes(dropdownState.filterText.toLowerCase())).map((option, index) => (
            <li key={index} className="list-group-item list-group-item-action d-flex align-items-center" onClick={() => handleDropdownSelect("bankLoan", option)}>
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
    <div className="dropdown-popup w-100">
      <input type="text" className="form-control mt-2" placeholder="Filter options..." value={dropdownState.filterText} onChange={(e) => setDropdownState(prev => ({ ...prev, filterText: e.target.value }))} />
      <ul className="list-group mt-2 w-100">
        {(dataList.areaUnit || []).filter(option => option.toLowerCase().includes(dropdownState.filterText.toLowerCase())).map((option, index) => (
          <li key={index} className="list-group-item list-group-item-action d-flex align-items-center" onClick={() => handleDropdownSelect("areaUnit", option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  )}
</div>



<div className="col-12 mb-3">
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

     
  

        <button type="submit" className="submit-button" style={{ padding: "10px 20px", cursor: "pointer", background:"#6CBAAF", border:'none', color:'#ffffff'}}>
          {formData._id ? "UPDATE PROPERTY ASSISTANCE" : "ADD PROPERTY ASSISTANCE"}
        </button>
      </form>
    </div>
  );
};





export default BuyerAssistance;












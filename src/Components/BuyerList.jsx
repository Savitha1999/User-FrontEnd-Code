






import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import profil from "../Assets/xd_profile.png";
import {
  MdOutlineCall,
  MdOutlineMapsHomeWork,
  MdCalendarMonth,
  MdOutlineBed,
} from "react-icons/md";
import { RiStairsLine } from "react-icons/ri";
import { GoHome } from "react-icons/go";
import { TfiLocationPin } from "react-icons/tfi";
import maxrupe from "../Assets/Price maxi-01.png";
import minrupe from "../Assets/Price Mini-01.png";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";



const BuyerLists = () => {
  const [assistanceData, setAssistanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState("");
  const [selectedPpcId, setSelectedPpcId] = useState("");
  const [interestData, setInterestData] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const iconContainerRef = useRef(null);
  const location = useLocation();
  const storedPhoneNumber = location.state?.phoneNumber || localStorage.getItem("phoneNumber") || "";
  const [phoneNumber] = useState(storedPhoneNumber);

  const handleConfirmCall = (type, phone, ba_id) => {
    setSelectedType(type);
    setSelectedPhone(phone);
    setSelectedPpcId(ba_id);
    setShowPopup(true);
  };

  const handleSendInterest = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/update-status-buyer-assistance/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ba_status: "buyer-assistance-interest",
            userPhoneNumber: phoneNumber,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("Interest sent successfully!");
      } else {
        setMessage(`Failed to send interest: ${data.message}`);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  const handlePopupResponse = async (confirmed) => {
    setShowPopup(false);

    if (!confirmed || !selectedPhone || !selectedType) return;

    try {
      if (selectedType === "buyer") {
        await axios.post(`${process.env.REACT_APP_API_URL}/contact-buyer-send`, {
          phoneNumber: selectedPhone,
          ba_id: selectedPpcId,
        });
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/contact-send`, {
          phoneNumber: selectedPhone,
        });
      }

      setMessage("Contact request sent successfully!");
      window.location.href = `tel:${selectedPhone}`;
    } catch (error) {
      setMessage("Failed to send contact request.");
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  


//   useEffect(() => {
//     const fetchAllAssistanceData = async () => {
//       try {
//         // Fetch buyer assistance
//         const assistanceResponse = await axios.get(`${process.env.REACT_APP_API_URL}/get-buyerAssistance`);
//         const sortedAssistanceData = assistanceResponse.data.data.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
  
//         // Fetch buyer-assistance-interest entries
//         const interestResponse = await axios.get(`${process.env.REACT_APP_API_URL}/buyer-assistance-interests`);
//         const sortedInterestData = interestResponse.data.data.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );

  
//         setAssistanceData(sortedAssistanceData); // regular assistance requests
//         setInterestData(sortedInterestData); // buyer-assistance-interest entries
  
//       } catch (err) {
//         setError("Error fetching assistance or interest data");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchAllAssistanceData();
// },[]);


useEffect(() => {
  const fetchAllAssistanceData = async () => {
    try {
      const assistanceResponse = await axios.get(`${process.env.REACT_APP_API_URL}/get-buyerAssistance`);
      const sortedAssistanceData = assistanceResponse.data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      const interestResponse = await axios.get(`${process.env.REACT_APP_API_URL}/buyer-assistance-interests`);
      const sortedInterestData = interestResponse.data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setAssistanceData(sortedAssistanceData);
      setInterestData(sortedInterestData);
    } catch (err) {
      setError("");
    } finally {
      setLoading(false);
    }
  };

  fetchAllAssistanceData();
}, []);

  const handleWheelScroll = (e) => {
    if (scrollContainerRef.current) {
      e.preventDefault();
      scrollContainerRef.current.scrollTop += e.deltaY;
    }
  };

  const handleIconScroll = (e) => {
    if (iconContainerRef.current) {
      e.preventDefault();
      const scrollAmount = e.deltaX || e.deltaY;
      iconContainerRef.current.scrollLeft += scrollAmount;
    }
  };

  if (loading) return <p>Loading...</p>;


   
 

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ padding: "10px", gap: "15px", borderRadius: "10px", overflowY: "auto" }}
      onWheel={handleWheelScroll}
      ref={scrollContainerRef}
    >
         <div className='d-flex flex-column ' style={{maxWidth:"500px", width:"100%"}}>
    <div className="d-flex align-items-center justify-content-start w-100 pt-2 pb-2" style={{background:"#EFEFEF" }}>
    <button
      onClick={() => navigate(-1)}
      className="pe-5"
      style={{
        backgroundColor: '#f0f0f0',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        display: 'flex',
        alignItems: 'center',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f0f4f5'; // Change background
        e.currentTarget.querySelector('svg').style.color = '#ffffff'; // Change icon color
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#f0f0f0';
        e.currentTarget.querySelector('svg').style.color = '#30747F';
      }}
    >
      <FaArrowLeft style={{ color: '#30747F', transition: 'color 0.3s ease-in-out' , background:"transparent"}} />
  </button>
            
               <h3 className="m-0 ms-3" style={{fontSize:"15px", fontWeight:"bold"}}> BUYER LIST</h3> </div>

      {/* <h5 className="text-center mt-2">Buyer List Datas</h5> */}
      {message && <div className="alert text-success fw-bold">{message}</div>}
{/* 
      {assistanceData.length > 0 ? (
        assistanceData.map((card) => (
         
          <div
  key={card._id}
  className="card p-1"
  style={{
    width: "450px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    marginBottom: "15px",
    fontFamily: "Inter, sans-serif",
    cursor: "pointer", // make it look clickable
  }}
  onClick={() => navigate(`/detail-buyer-assistance/${card._id}`)}
>
  

            <div className="row d-flex align-items-center">
              <div className="col-3 d-flex align-items-center justify-content-center mb-1">
                <img
                  src={profil}
                  alt="Profile"
                  className="rounded-circle mt-2"
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                />
              </div>
              <div className="p-0" style={{ background: "#707070", width: "1px", height: "80px" }}></div>
              <div className="col-7 p-0 ms-4">
                <div className="d-flex justify-content-between">
                  <p className="m-0 text-muted" style={{ fontSize: "12px", fontWeight: "500" }}>
                    BA ID: {card.ba_id}
                  </p>
                  <p className="m-0 text-muted" style={{ fontSize: "12px", fontWeight: "500" }}>
                    <MdCalendarMonth size={12} className="me-2" color="#019988" />
                    {card.createdAt.slice(0, 10)}
                  </p>
                </div>
                <h5 className="mb-1" style={{ fontSize: "16px", color: "#000", fontWeight: "500" }}>
                  {card.baName || "Unknown Buyer"}{" "}
                  <span className="text-muted" style={{ fontSize: "12px" }}>
                    | Buyer
                  </span>
                </h5>
                <div className="d-flex align-items-center col-8">
                  <p className="mb-0 me-3 d-flex align-items-center" style={{ fontSize: "12px", fontWeight: 500 }}>
                    <img src={minrupe} alt="min" width={13} className="me-2" />
                    {card.minPrice}
                  </p>
                  <p className="mb-0 d-flex align-items-center" style={{ fontSize: "12px", fontWeight: 500 }}>
                    <img src={maxrupe} alt="max" width={13} className="me-2" />
                    {card.maxPrice}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-1">
              <div
                className="d-flex align-items-center overflow-auto mb-0 p-1 rounded-1"
                style={{ whiteSpace: "nowrap", overflowX: "auto", border: "1px solid #019988" }}
                onWheel={handleIconScroll}
                ref={iconContainerRef}
              >
                <div className="d-flex align-items-center me-3">
                  <GoHome size={12} className="me-2" color="#019988" />
                  <p className="mb-0" style={{ fontSize: "12px" }}>{card.propertyMode}</p>
                </div>
                <div className="d-flex align-items-center me-3">
                  <MdOutlineMapsHomeWork size={12} className="me-2" color="#019988" />
                  <p className="mb-0" style={{ fontSize: "12px" }}>{card.propertyType}</p>
                </div>
                <div className="d-flex align-items-center me-3">
                  <MdCalendarMonth size={12} className="me-2" color="#019988" />
                  <p className="mb-0" style={{ fontSize: "12px" }}>{card.paymentType}</p>
                </div>
                <div className="d-flex align-items-center me-3">
                  <MdOutlineBed size={12} className="me-2" color="#019988" />
                  <p className="mb-0" style={{ fontSize: "12px" }}>{card.bedrooms} BHK</p>
                </div>
                <div className="d-flex align-items-center me-3">
                  <RiStairsLine size={12} className="me-2" color="#019988" />
                  <p className="mb-0" style={{ fontSize: "12px" }}>{card.propertyAge}</p>
                </div>
              </div>

              <div className="mb-0 mt-1">
                <p className="mb-0 fw-semibold" style={{ fontSize: "12px" }}>
                  <TfiLocationPin size={16} className="me-2" color="#019988" />
                  {card.area}, {card.city}
                </p>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-2">
                <div className="d-flex align-items-center">
                  <MdOutlineCall color="#019988" style={{ fontSize: "12px", marginRight: "8px" }} />
                  <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
                    {card.interestedUserPhone
                      ? `Interested Owner: ${card.interestedUserPhone.slice(0, -5)}*****`
                      : card.phoneNumber
                      ? `Buyer Phone: ${card.phoneNumber.slice(0, -5)}*****`
                      : "Phone: N/A"}
                  </h6>
                </div>

                <button
                  className="btn text-white px-3 py-1 mx-1"
                  style={{ background: "orangered", fontSize: "13px" }}
                  onClick={() => handleSendInterest(card._id)}
                >
                  Send Interest
                </button>

                <button
                  className="btn text-white px-3 py-1 mx-1"
                  style={{ background: "#2F747F", fontSize: "13px" }}
                  onClick={() =>
                    handleConfirmCall(
                      card.interestedUserPhone ? "buyer" : "owner",
                      card.interestedUserPhone || card.phoneNumber,
                      card.ba_id
                    )
                  }
                >
                  Call
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No buyer assistance interests found.</p>
      )} */}


      
{loading ? (
        <p>Loading buyer assistance data...</p>
      ) : assistanceData.length > 0 ? (
        assistanceData.map((card) => (
          <div
            key={card._id}
            className="card p-1 mb-3"
            style={{ width: '100%', background: '#F9F9F9', overflow: 'hidden' }}
            onClick={() => navigate(`/detail-buyer-assistance/${card._id}`)}
          >
            <div className="row d-flex align-items-center">
              <div className="col-3 d-flex align-items-center justify-content-center mb-1">
                <img
                  src={profil}
                  alt="Profile"
                  className="rounded-circle mt-2"
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                />
              </div>
              <div className="p-0" style={{ background: "#707070", width: "1px", height: "80px" }}></div>
              <div className="col-7 p-0 ms-4">
                <div className="d-flex justify-content-between">
                  <p className="m-0 text-muted" style={{ fontSize: "12px", fontWeight: "500" }}>
                    BA ID: {card.ba_id}
                  </p>
                  <p className="m-0 text-muted" style={{ fontSize: "12px", fontWeight: "500" }}>
                    <MdCalendarMonth size={12} className="me-2" color="#019988" />
                    {card.createdAt.slice(0, 10)}
                  </p>
                </div>
                <h5 className="mb-1" style={{ fontSize: "16px", color: "#000", fontWeight: "500" }}>
                  {card.baName || "N/A"}{" "}
                  <span className="text-muted" style={{ fontSize: "12px" }}>| Buyer</span>
                </h5>
                <div className="d-flex align-items-center justify-content-between col-8">
                  <p className="mb-0 me-3 d-flex align-items-center" style={{ fontSize: "12px", fontWeight: 500 }}>
                    <img src={minrupe} alt="min" width={13} className="me-2" />
                    {card.minPrice}
                  </p>
                  <p className="mb-0 d-flex align-items-center" style={{ fontSize: "12px", fontWeight: 500 }}>
                    <img src={maxrupe} alt="max" width={13} className="me-2" />
                    {card.maxPrice}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-1">
              <div
                className="d-flex align-items-center overflow-auto mb-0 p-1 rounded-1"
                style={{
                  whiteSpace: "nowrap",
                  minWidth: "100%",
                  overflowX: "auto",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  border: "1px solid #019988",
                }}
                onWheel={handleIconScroll}
                ref={iconContainerRef}
              >
                <div className="d-flex align-items-center me-3">
                  <GoHome size={12} className="me-2" color="#019988" />
                  <p className="mb-0" style={{ fontSize: "12px" }}>{card.propertyMode}</p>
                </div>
                <div className="d-flex align-items-center me-3">
                  <MdOutlineMapsHomeWork size={12} className="me-2" color="#019988" />
                  <p className="mb-0" style={{ fontSize: "12px" }}>{card.propertyType}</p>
                </div>
                <div className="d-flex align-items-center me-3">
                  <MdCalendarMonth size={12} className="me-2" color="#019988" />
                  <p className="mb-0" style={{ fontSize: "12px" }}>{card.paymentType}</p>
                </div>
                <div className="d-flex align-items-center me-3">
                  <MdOutlineBed size={12} className="me-2" color="#019988" />
                  <p className="mb-0" style={{ fontSize: "12px" }}>{card.bedrooms} BHK</p>
                </div>
                <div className="d-flex align-items-center me-3">
                  <RiStairsLine size={12} className="me-2" color="#019988" />
                  <p className="mb-0" style={{ fontSize: "12px" }}>{card.propertyAge}</p>
                </div>
              </div>

              <div className="mb-0 mt-1">
                <p className="mb-0 fw-semibold" style={{ fontSize: "12px" }}>
                  <TfiLocationPin size={16} className="me-2" color="#019988" />
                  {card.area}, {card.city}
                </p>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-2">
                <div className="d-flex align-items-center">
                  <MdOutlineCall color="#019988" style={{ fontSize: "12px", marginRight: "8px" }} />
                  <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
                    {card.interestedUserPhone
                      ? `Interested Owner: ${card.interestedUserPhone.slice(0, -5)}*****`
                      : card.phoneNumber
                      ? `Buyer Phone: ${card.phoneNumber.slice(0, -5)}*****`
                      : "Phone: N/A"}
                  </h6>
                </div>

                <div className="d-flex">
                <button
                  className="btn text-white px-3 py-1 mx-1"
                  style={{ background: "#3660FF", fontSize: "13px" }}
                  onMouseOver={(e) => {
                    e.target.style.background = "#0739f5"; // Brighter neon on hover
                    e.target.style.fontWeight = 500; // Brighter neon on hover
                    e.target.style.transition = "background 0.3s ease"; // Brighter neon on hover
                
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = "#3660FF"; // Original orange
                    e.target.style.fontWeight = 400; // Brighter neon on hover
                
                  }} 
                  onClick={() => handleSendInterest(card._id)}
                >
                  Send Interest
                </button>

                <button
                  className="btn text-white px-3 py-1 mx-1"
                  style={{ background: "#2F747F", fontSize: "13px" }}
                  onMouseOver={(e) => {
                    e.target.style.background = "#029bb3"; // Brighter neon on hover
                    e.target.style.fontWeight = 600; // Brighter neon on hover
                    e.target.style.transition = "background 0.3s ease"; // Brighter neon on hover
                
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = "#2F747F"; // Original orange
                    e.target.style.fontWeight = 400; // Brighter neon on hover
                
                  }}                  onClick={() =>
                    handleConfirmCall(
                      card.interestedUserPhone ? "buyer" : "owner",
                      card.interestedUserPhone || card.phoneNumber,
                      card.ba_id
                    )
                  }
                >
                  Call
                </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No buyer assistance interests found.</p>
      )}

      {showPopup && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
          <div className="bg-white p-4 rounded" style={{ minWidth: "300px" }}>
            <h6 className="mb-3">Are you sure you want to call this buyer?</h6>
            <div className="d-flex justify-content-between">
              <button className="btn btn-success" onClick={() => handlePopupResponse(true)}>Yes</button>
              <button className="btn btn-danger" onClick={() => handlePopupResponse(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default BuyerLists;


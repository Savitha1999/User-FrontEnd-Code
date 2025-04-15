import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

import profil from "../Assets/xd_profile.png";
import minrupe from "../Assets/Price Mini-01.png";
import maxrupe from "../Assets/Price maxi-01.png";

import { MdOutlineCall, MdOutlineMapsHomeWork, MdCalendarMonth, MdOutlineBed } from "react-icons/md";
import { RiStairsLine } from "react-icons/ri";
import { GoHome } from "react-icons/go";
import { TfiLocationPin } from "react-icons/tfi";
import { FaArrowLeft } from "react-icons/fa";

const MyInterestSend = () => {
  const location = useLocation();
  const storedPhoneNumber = location.state?.phoneNumber || localStorage.getItem("phoneNumber") || "";
  const [phoneNumber] = useState(storedPhoneNumber);

  const [assistanceData, setAssistanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState('');
  const [selectedPpcId, setSelectedPpcId] = useState('');

  const scrollContainerRef = useRef(null);
  const iconContainerRef = useRef(null);

  const navigate = useNavigate();

  const handleConfirmCall = (phone, id) => {
    setSelectedPhone(phone);
    setSelectedPpcId(id);
    setShowPopup(true);
  };

  const handlePopupResponse = async (confirmed) => {
    setShowPopup(false);
    if (confirmed && selectedPhone) {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/contact-send`, {
          phoneNumber: selectedPhone,
        });
        setMessage("Contact request sent successfully!");
        window.location.href = `tel:${selectedPhone}`;
      } catch (error) {
        console.error("API Error:", error);
        setMessage("Failed to send contact request.");
      }
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    const fetchAssistanceData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/buyer-assistance-interests-phone`, {
          params: { phone: phoneNumber }
        });
        const sorted = response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setAssistanceData(sorted);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Error fetching buyer assistance interests.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssistanceData();
  }, [phoneNumber]);

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
  if (error) return <p>Error: {error}</p>;

  
  const handlePageNavigation = () => {
    navigate('/mobileviews'); // Redirect to the desired path
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ padding: "10px", gap: "15px", borderRadius: "10px", overflowY: "auto" }}
      onWheel={handleWheelScroll}
      ref={scrollContainerRef}
    >
        
      <h5>Buyer Assistance Interest List</h5>


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
            }}
          >

<div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
                      <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
                    </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>My Plan</h3> </div>

               {message && <div className="alert text-success text-bold">{message}</div>}
          
          <div>

            <div className="row d-flex align-items-center">
              <div className="col-3 d-flex align-items-center justify-content-center mb-1">
                <img
                  src={profil}
                  alt="Profile"
                  className="rounded-circle mt-2"
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                />
              </div>
              <div className='p-0' style={{ background: "#707070", width: "1px", height: "80px" }}></div>
              <div className="col-7 p-0 ms-4">
                <div className="d-flex justify-content-between">
                  <p className="m-0" style={{ fontSize: "12px", color: "#5E5E5E", fontWeight: "500" }}>
                    BA ID: {card.ba_id}
                  </p>
                  <p className="m-0" style={{ fontSize: "12px", color: "#5E5E5E", fontWeight: "500" }}>
                    <MdCalendarMonth size={12} className="me-2" color="#019988" />
                    {card.createdAt.slice(0, 10)}
                  </p>
                </div>
                <h5 className="mb-1" style={{ fontSize: "16px", color: "#000", fontWeight: "500" }}>
                  {card.baName || "Unknown Buyer"} <span className="text-muted" style={{ fontSize: "12px" }}>| Buyer</span>
                </h5>
                <div className="d-flex align-items-center col-8">
                  <p className="mb-0 d-flex align-items-center me-3" style={{ fontSize: "12px", fontWeight: 500 }}>
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
                <p className="mb-0" style={{ fontWeight: 600, fontSize: "12px" }}>
                  <TfiLocationPin size={16} className="me-2" color="#019988" />
                  {card.area}, {card.city}
                </p>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-2">
                <div className="d-flex align-items-center">
                  <MdOutlineCall color="#019988" style={{ fontSize: "12px", marginRight: "8px" }} />
                  <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
                    Buyer Phone: {card.phoneNumber ? `${card.phoneNumber.slice(0, -5)}*****` : "N/A"}
                  </h6>
                </div>
                <button
                  className="btn ms-5 text-white px-3 py-1"
                  style={{ background: "orangered", fontSize: "13px" }}
                  onClick={() => navigate(`/detail-buyer-assistances/${card._id}`)}
                >
                  More
                </button>
                <button
                  className="btn text-white px-3 py-1"
                  style={{ background: "#2F747F", fontSize: "13px" }}
                  onClick={() => handleConfirmCall(card.phoneNumber, card.ba_id)}
                >
                  Call
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No buyer assistance interests found.</p>
      )}

      {/* Confirmation Modal */}
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

  );
};

export default MyInterestSend;

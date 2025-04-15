



































import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
// React Icons (Md, Lu, Ri, Go, etc.)
import { MdCalendarMonth, MdOutlineBed, MdOutlineMapsHomeWork, MdOutlineTimer, MdFamilyRestroom, MdOutlineCall } from 'react-icons/md';
import { GoHome } from 'react-icons/go';
import { LuIndianRupee, LuBriefcaseBusiness } from 'react-icons/lu';
import { RiStairsLine } from 'react-icons/ri';
import { IoFastFoodOutline } from 'react-icons/io5';
import { GiSittingDog } from 'react-icons/gi';
import { GrMapLocation } from 'react-icons/gr';
import profil from '../../Assets/xd_profile.png'
import { FaArrowLeft, FaRupeeSign } from "react-icons/fa";
import { TfiLocationPin } from "react-icons/tfi";
import pricemini from '../../Assets/Price Mini-01.png'
import pricemax from '../../Assets/Price maxi-01.png'
import { setPhoneNumber } from "../../red/userSlice";



const MatchedBuyer = () => {
  const [buyerRequests, setBuyerRequests] = useState([]);
  const [removedBuyerRequests, setRemovedBuyerRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { phoneNumber } = useParams();
  const [activeIndex, setActiveIndex] = useState(null);



  useEffect(() => {
    const fetchBuyerRequests = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/fetch-matched-buyers-for-owner`,
          { params: { phoneNumber } }
        );
  
        const fetchedData = response.data.matchedBuyerRequests;
        setBuyerRequests(fetchedData.filter((req) => !req.isDeleted));
        setRemovedBuyerRequests(fetchedData.filter((req) => req.isDeleted));
  
        // Sync with Local Storage
        localStorage.setItem("buyerRequests", JSON.stringify(fetchedData.filter((req) => !req.isDeleted)));
        localStorage.setItem("removedBuyerRequests", JSON.stringify(fetchedData.filter((req) => req.isDeleted)));
  
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching data");
        setBuyerRequests([]);
        setRemovedBuyerRequests([]);
      } finally {
        setLoading(false);
      }
    };
  
    if (phoneNumber) {
      fetchBuyerRequests();
    }
  }, [phoneNumber]);
  

  // ✅ Handle Delete Request (Soft Delete)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/delete-buyer-assistance/${id}`);

      // Move item from "All Properties" to "Removed Properties"
      const deletedRequest = buyerRequests.find((req) => req._id === id);
      setBuyerRequests((prev) => prev.filter((req) => req._id !== id));
      setRemovedBuyerRequests((prev) => [...prev, { ...deletedRequest, isDeleted: true }]);

      // Sync with Local Storage
      localStorage.setItem("buyerRequests", JSON.stringify(buyerRequests.filter((req) => req._id !== id)));
      localStorage.setItem("removedBuyerRequests", JSON.stringify([...removedBuyerRequests, { ...deletedRequest, isDeleted: true }]));
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting request");
    }
  };

  // ✅ Handle Undo Delete (Restore)
  const handleUndoDelete = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/undo-delete-buyer-assistance/${id}`);

      // Move item from "Removed Properties" to "All Properties"
      const restoredRequest = removedBuyerRequests.find((req) => req._id === id);
      setRemovedBuyerRequests((prev) => prev.filter((req) => req._id !== id));
      setBuyerRequests((prev) => [...prev, { ...restoredRequest, isDeleted: false }]);

      // Sync with Local Storage
      localStorage.setItem("buyerRequests", JSON.stringify([...buyerRequests, { ...restoredRequest, isDeleted: false }]));
      localStorage.setItem("removedBuyerRequests", JSON.stringify(removedBuyerRequests.filter((req) => req._id !== id)));
    } catch (err) {
      setError(err.response?.data?.message || "Error restoring request");
    }
  };

  // Filter requests based on active tab
 
  const displayedRequests = activeTab === "all" ? buyerRequests : removedBuyerRequests;
 
 
  const iconContainerRef = useRef(null);


  const handleIconScroll = (e) => {
    if (iconContainerRef.current) {
      e.preventDefault();
      const scrollAmount = e.deltaX || e.deltaY;
      iconContainerRef.current.scrollLeft += scrollAmount;
    }
  };



  const handleSendInterest = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/update-status-buyer-assistance/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ba_status: "buyer-assistance-interest",userPhoneNumber: phoneNumber })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Interest Sent Successfully!");
        // Optionally refresh data
      } else {
        alert(`Failed to send interest: ${data.message}`);
      }
    } catch (error) {
      console.error("Error sending interest:", error);
      alert("An error occurred. Please try again.");
    }
  };
  


  const handleRemoveInterest = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/update-status-buyer-assistance/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ba_status: "remove-assistance-interest" , userPhoneNumber: phoneNumber })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Interest Removed Successfully!");
        // Optionally refresh data
      } else {
        alert(`Failed to remove interest: ${data.message}`);
      }
    } catch (error) {
      console.error("Error removing interest:", error);
      alert("An error occurred. Please try again.");
    }
  };
  
 
  const navigate = useNavigate();

  const handlePageNavigation = () => {
    navigate('/mobileviews'); // Redirect to the desired path
  };

  return (
    <div className="container d-flex align-items-center justify-content-center p-0">
    <div className="d-flex flex-column align-items-center justify-content-center m-0" style={{ maxWidth: '500px', margin: 'auto', width: '100%',  fontFamily: "Inter, sans-serif", background:"#F7F7F7"}}>
       <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
          <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
        </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}> MATCHED BUYER</h3> </div>
      {/* Tabs */}
      <div className="row g-2 w-100 mb-4">
        <div className="col-6 p-0">
          <button
            style={{ backgroundColor: "#4F4B7E", color: "white", width: "100%" }}
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "active" : ""}
          >
            All Properties
          </button>
        </div>
        <div className="col-6 p-0">
          <button
            style={{ backgroundColor: "#FF0000", color: "white", width: "100%" }}
            onClick={() => setActiveTab("removed")}
            className={activeTab === "removed" ? "active" : ""}
          >
            Removed Properties
          </button>
        </div>

      {/* Content Display */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
       ) : error ? ( 
       <p className="text-red-500">{error}</p> 

     ) :  
      displayedRequests.length > 0 ? ( 
      displayedRequests.map((request, index) => (
    <div
      className="d-flex flex-column w-100 p-1"
    >
      <div
      
            key={request._id}
        className="card w-100"
        style={{
          maxWidth: "100%",
          border: "1px solid #ddd",
          borderRadius: "10px",
          overflow: "hidden",
          padding: "15px",
          marginBottom: "15px",
        }}
      >
        <div className="row d-flex align-items-center">
          <div className="col-md-3 col-4 d-flex flex-column align-items-center justify-content-center mb-1">
            <img
              src={profil}
              alt="Placeholder"
              className="rounded-circle img-fluid"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
            {/* <span className="p-1 rounded-1 mt-1" style={{background:"#30747F", color:"#fff", fontSize:"11px"}}> ba_id</span> */}
          </div>
          <div className="p-0" style={{ background: "#707070", width: "2px", height: "80px" }}></div>
          <div className="col-md-7 col-6 p-0 ms-4">
            <div className="text-center rounded-1 w-100 mb-1" style={{ border: "2px solid #30747F", color: "#30747F", fontSize: "14px" }}>
              HELP REQUESTED
            </div>
            <div className="d-flex">
              <p className="mb-1 ps-2 px-2 rounded-1" style={{ color: "#30747F", fontWeight: "500", fontSize: "12px" ,border:"1px solid #30747F" }}>
                BA_ID: {request. ba_id}
              </p>
            </div>
            <h5 className="mb-1" style={{ color: "#5E5E5E", fontWeight: "500", fontSize: "16px" }}>
              {request.propertyType || "N/A"} 
            </h5>
            <h5 className="mb-1" style={{ color: "#000000", fontWeight: "bold", fontSize: "16px" }}>
              {request.propertyMode || "N/A"} 
            </h5>
          </div>
        </div>

        <div
          className="d-flex align-items-center overflow-auto mb-1 p-1 rounded-1 w-100"
          style={{
            whiteSpace: "nowrap",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            border: "1px solid #30747F",
          }}
          onWheel={handleIconScroll}
          ref={iconContainerRef}
        >
          <div className="d-flex align-items-center me-3">
            <img src={pricemini} alt="" />
            {/* <FaRupeeSign size={20} className="me-2" color="#30747F" /> */}
            <p className="mb-0 ms-1 small">{request.minPrice}</p>
          </div>
          <div className="d-flex align-items-center me-3">
          <img src={pricemax} alt="" />

            {/* <FaRupeeSign size={20} className="me-2" color="#30747F" /> */}
            <p className="mb-0 ms-1 small">{request.maxPrice}</p>
          </div>
          <div className="d-flex align-items-center me-3">
            <GoHome size={20} className="me-2" color="#30747F" />
            <p className="mb-0 small">{request.propertyMode}</p>
          </div>
          <div className="d-flex align-items-center me-3">
            <MdOutlineMapsHomeWork size={20} className="me-2" color="#30747F" />
            <p className="mb-0 small">{request.propertyType}</p>
          </div>
        </div>

          <p className="mb-0">
            <TfiLocationPin  size={16} className="me-2" color="#30747F" />
            <span style={{  color: "#1D1D1D" , fontSize:"12px", fontWeight:"500"}}>{request.area || "N/A"}, {request.city || "N/A"}
            </span>
          </p>

        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-0">
            <MdOutlineCall size={16} className="me-2" color="#30747F" />
          <span style={{  color: "#1D1D1D" , fontSize:"12px", fontWeight:"500"}}>Buyer Number :  {activeIndex === index ? request.phoneNumber : request.phoneNumber.slice(0, -5) + "*****"}</span> 
          </p>
        </div>
    <button className='w-100 m-0 p-1'
      onClick={() => setActiveIndex(activeIndex === index ? null : index)}

      style={{
        background: "#2F747F", 
        color: "white", 
        border: "none", 
       
        marginLeft: "10px", 
        cursor: "pointer",
        borderRadius: "5px"
      }}>
              {activeIndex === index ? "HIDE BUYER NUMBER" : "VIEW BUYER NUMBER"}
              </button>
  {activeIndex === index && (

  <div className="d-flex justify-content-between align-items-center ps-2 pe-2 mt-1">
   {activeTab === "all" ? (
                <button
                className="btn text-white px-3 py-1 flex-grow-1 mx-1"
                style={{ background: "#FF0000", color: "white", cursor: "pointer",  fontSize: "13px"}}
                             onClick={() => handleDelete(request._id)}
                >
                  Remove
                </button>
               ) : ( 
                <button
                className="btn text-white px-3 py-1 flex-grow-1 mx-1"
                style={{ background: "green", color: "white", cursor: "pointer" ,  fontSize: "13px"}}
                              onClick={() => handleUndoDelete(request._id)}
                >
                  Undo 
                </button>
               )} 
         
            <button
  className="btn text-white px-3 py-1 flex-grow-1 mx-1"
  style={{ background: "#2F747F", width: "80px", fontSize: "13px" }}
  onClick={() => handleSendInterest(request._id)}
>
  Send Interest
</button>

<button
  className="btn text-white px-3 py-1 flex-grow-1 mx-1"
  style={{ background: "red", width: "80px", fontSize: "13px" }}
  onClick={() => handleRemoveInterest(request._id)}
>
  Remove Interest
</button>
<button
  className="btn text-white px-3 py-1 flex-grow-1 mx-1"
  style={{ background: "red", width: "80px", fontSize: "13px" }}
  onClick={() =>
    navigate(`/detail-buyer-assistances/${request._id}`, {
      state: {
        id: request._id,
        ba_id: request.ba_id,
        phoneNumber: request.phoneNumber,
        ppcId: request.ppcId, // Include other details if needed
      },
    })
  }
>
  More
</button>





              </div>
            )}

      </div>
    </div>
  ))
      ) : ( 
        <p className="text-gray-500">No matching buyer assistance requests found.</p>
      )} 
      </div>

      </div>

    </div>
  );
};

export default MatchedBuyer;









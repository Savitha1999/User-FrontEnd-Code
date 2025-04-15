

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaPhone, FaPhoneAlt, FaRegIdCard, FaRupeeSign } from "react-icons/fa";
import { BsBuildings, BsBank } from "react-icons/bs";
import { HiOutlineBuildingOffice2, HiOutlineNewspaper } from "react-icons/hi2";
import { LiaBedSolid, LiaMoneyCheckSolid } from "react-icons/lia";
import { RiCompass3Line } from "react-icons/ri";
import { AiOutlineFileDone } from "react-icons/ai";
import { RxDimensions } from "react-icons/rx";
import { IoLocationOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import imge from "../Assets/xd_profile1.png"
import axios from "axios";
import { CgProfile } from "react-icons/cg";

export default function DetailBuyerAssistance() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [buyerData, setBuyerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestData, setRequestData] = useState(null);
const [matchedProperties, setMatchedProperties] = useState([]);
  const [message, setMessage] = useState("");


const location = useLocation();
  const storedPhoneNumber = location.state?.phoneNumber || localStorage.getItem("phoneNumber") || "";

  const [phoneNumber, setPhoneNumber] = useState(storedPhoneNumber);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-buyerAssistance/${id}`);
        const data = response.data.data;
        setRequestData(data);
  
       
        if (data?.interestedUserPhone) {
          const matchedResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/fetch-owner-matched-properties?phoneNumber=${data.buyerPhoneNumber}`
          );
          setMatchedProperties(matchedResponse.data.properties);
        }
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
  
    if (id) fetchRequest();
  }, [id]);

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
        alert("Interest Sent Successfully!");
        // Optionally refetch data here
      } else {
        alert(`Failed to send interest: ${data.message}`);
      }
    } catch (error) {
      console.error("Error sending interest:", error);
      alert("An error occurred. Please try again.");
    }
  };
  
  

  
  const handleRemoveAssistance = async (id) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API_URL}/delete-buyerAssistance/${id}`);
      setMessage("Buyer Assistance request removed successfully!");
      navigate("/buyer-list"); // optional: redirect or refresh data
    } catch (error) {
      setMessage("Failed to delete Buyer Assistance request.");
    }
  };

  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!requestData) return <p>No data found.</p>;
  
    const handleViewMore = (phoneNumber, ppcId) => {
      // navigate("/detail", { state: { ppcId, phoneNumber } });
      navigate(`/detail/${ppcId}`, { state: {phoneNumber } });

    };


  return (
    <div className='d-flex justify-content-center algin-item-center w-100'>
    
    <div className='d-flex flex-column ' style={{maxWidth:"500px", width:"100%"}}>
    <div className="d-flex align-items-center justify-content-start w-100 pt-2 pb-2" style={{background:"#EFEFEF" }}>
              <button className="pe-5"
               onClick={() => navigate('/mobileviews')}
               ><FaArrowLeft color="#30747F"/> 
            </button> <h3 className="m-0 ms-3" style={{fontSize:"15px", fontWeight:"bold"}}>DETAILED BUYER ASSISTANT</h3> </div>

            {message && <div className="alert text-success text-bold">{message}</div>}

       <div className='d-flex algin-item-center justify-content-center w-100' style={{height:"200px"}}>

        <img src={imge} alt="" style={{width:"200px"}}/></div>
        <div className='d-flex algin-item-center justify-content-center w-100 mt-2'>    
              <div style={{background:"#C5C5C5", height:"2px", width:"90%"}}></div>
        </div>
        <div className="d-flex justify-content-center w-100">

        <div className='row w-100 mt-3 p-0'>
        <h5 className='ps-3 ms-3' style={{ color: "#30747F", fontWeight: "bold", marginBottom: "10px", fontSize:"15px" }}>Buyer Profile</h5>   
            <div className="d-flex align-items-center mb-3">
                      <div className="d-flex  flex-row align-items-start w-100 ps-3">
                      <div className="d-flex align-items-center col-6">
                          <FaRegIdCard color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                          <div>
                            <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
                            BA ID                         </h6>
                            <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500", fontSize:"14px"}}>
                            {requestData.ba_id || "N/A"}
                            </span>
                          </div>
                        </div>  
                     
      <div className="d-flex align-items-center col-6">
                          <CgProfile color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                          <div>
                            <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
                            NAME                         </h6>
                            <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500", fontSize:"14px"}}>
                            {requestData.baName || "N/A"}
                            </span>
                          </div>
                        </div>  
                        </div>
                        </div>

        <h5 className='ps-3 ms-3' style={{ color: "#30747F", fontWeight: "bold", marginBottom: "10px", fontSize:"15px" }}> Budget</h5>   
            <div className="d-flex align-items-center mb-3">
                      <div className="d-flex  flex-row align-items-start w-100 ps-3">
                      <div className="d-flex align-items-center col-6">
                          <FaRupeeSign color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                          <div>
                            <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
                            Minimum Amount                           </h6>
                            <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500", fontSize:"14px"}}>
                            {requestData.minPrice || "N/A"}
                            </span>
                          </div>
                        </div>  
                     
      <div className="d-flex align-items-center col-6">
                          <FaRupeeSign color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                          <div>
                            <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
                            Maximum Amount                           </h6>
                            <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500", fontSize:"14px"}}>
                            {requestData.maxPrice || "N/A"}
                            </span>
                          </div>
                        </div>  
                        </div>
                        </div>
           {/* Lookin for */}
           <h5 className='ps-3 ms-3' style={{ color: "#30747F", fontWeight: "bold", marginBottom: "10px", fontSize:"15px" }}> Looking for</h5>   
            <div className="d-flex align-items-center mb-3">
                      <div className="d-flex  flex-row align-items-start w-100 ps-3">
                      <div className="d-flex align-items-center col-6">
                          <BsBuildings   color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                          <div>
                            <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
                            Property Mode                           </h6>
                            <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500", fontSize:"14px"}}>
                            {requestData.propertyMode || "N/A"}
                            </span>
                          </div>
                        </div>  
                     
      <div className="d-flex align-items-center col-6">
                          <HiOutlineBuildingOffice2 color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                          <div>
                            <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
                           Property Type                           </h6>
                            <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500", fontSize:"14px"}}>
                            {requestData.propertyType || "N/A"}
                            </span>
                          </div>
                        </div>  
                        </div>
                        </div>
                        
             
            <div className="d-flex align-items-center mb-3">
                      <div className="d-flex  flex-row align-items-start w-100 ps-3">
                      <div className="d-flex align-items-center col-6">
                          <LiaBedSolid color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                          <div>
                            <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
                            Min.Bedroom                           </h6>
                            <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500", fontSize:"14px"}}>
                            {requestData.bedrooms || "N/A"} BHK
                            </span>
                          </div>
                        </div>  
                     
 

                        <div className="d-flex align-items-center col-6">
                          <RxDimensions color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                          <div>
                            <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
                            Minimum Area                             </h6>
                            <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500", fontSize:"14px"}}>
                            {requestData.totalArea || "N/A" }{requestData.areaUnit || "N/A"}
                            </span>
                          </div>
                        </div>  
                        </div>
                        </div>
                        
            <div className="d-flex align-items-center mb-3">
                      <div className="d-flex  flex-row align-items-start w-100 ps-3">
                      <div className="d-flex align-items-center col-6">
                          <AiOutlineFileDone   color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                          <div>
                            <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
                            Approved                         </h6>
                            <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500", fontSize:"14px"}}>
                            {requestData.propertyApproved || "N/A"}
                            </span>
                          </div>
                        </div>  
                     
      <div className="d-flex align-items-center col-6">
                          <BsBank color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                          <div>
                            <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
                            Bank Loan                         </h6>
                            <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500", fontSize:"14px"}}>
                            {requestData.bankLoan || "N/A"}
                            </span>
                          </div>
                        </div>  
                        </div>
                        </div>
                        
                        
            <div className="d-flex align-items-center mb-3">
                      <div className="d-flex  flex-row align-items-start w-100 ps-3">
                      <div className="d-flex align-items-center col-6">
                          <RiCompass3Line color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                          <div>
                            <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
                            Select Facing                          </h6>
                            <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500", fontSize:"14px"}}>
                            {requestData.facing || "N/A"}
                            </span>
                          </div>
                        </div>  
                        </div>
                        </div> 
                        
<div className="d-flex align-items-center mb-3">
  <div className="d-flex flex-row align-items-start w-100 ps-3">

    {/* Buyer Phone Number */}
    <div className="d-flex align-items-center col-6 mt-2" >
      <FaPhoneAlt color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
      <div>
        <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
          Buyer Phone Number
        </h6>
        <span className="card-text" style={{ color: "#1D1D1D", fontWeight: "500" }}>
          {requestData?.phoneNumber || "N/A"}
        </span>
      </div>
    </div>

    {/* Interested User Phone Number */}
    <div className="d-flex align-items-center col-6 mt-2">
      <FaPhoneAlt color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
      <div>
        <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
          Interested User Phone
        </h6>
        <span className="card-text" style={{ color: "#1D1D1D", fontWeight: "500" }}>
          {requestData?.interestedUserPhone || "N/A"}
        </span>
      </div>
    </div>

  </div>
</div>

                        <h5 className='ps-3 ms-3' style={{ color: "#30747F", fontWeight: "bold", marginBottom: "10px", fontSize:"15px" }}> Location Preffered</h5>   
                        <div className='ps-3 ms-3 mb-2' style={{ display: 'flex', alignItems: 'center' }}>
  <IoLocationOutline color='#30747F' style={{ fontSize: '24px', flexShrink: 0, marginRight: '8px' }} />
  <p style={{ margin: 0, flex: 1 }}>{requestData.city || "N/A"}</p>

</div>


                        <h5 className='ps-3 ms-3' style={{ color: "#30747F", fontWeight: "bold", marginBottom: "10px", fontSize:"15px" }}>Description</h5>   

<div className=' ms-3 mb-3' style={{ display: 'flex', alignItems: 'center' }}>
  <HiOutlineNewspaper color='#30747F' style={{ fontSize: '24px', flexShrink: 0, marginRight: '8px' }} />
  <p style={{ margin: 0, flex: 1 }}>{requestData.description || "No Description Available"}</p>
</div>

            <div className="d-flex align-items-center mb-3">
                      <div className="d-flex  flex-row align-items-start w-100 ps-3">
                      <div className="d-flex align-items-center col-6">
                          <LiaMoneyCheckSolid color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                          <div>
                            <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
                           Plan Name                      </h6>
                            <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500", fontSize:"14px"}}>
                            {requestData.paymentType || "N/A"}
                            </span>
                          </div>
                        </div>  
                     
      <div className="d-flex align-items-center col-6">
                          <LuCalendarDays color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                          <div>
                            <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
                           Expire Date                          </h6>
                            <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500", fontSize:"14px"}}>
                            {new Date(requestData.updatedAt).toLocaleString() || "N/A"}
                            </span>
                          </div>
                        </div>  
                        </div>
                        </div> 


                        <div className="d-flex justify-content-between align-items-center ps-2 pe-2 mt-5 mb-5 col-12">
  <button className="btn text-white px-3 py-1 mx-1" style={{ background: "#FF0000", width: "80px", fontSize: "13px" }}
        onClick={() => handleRemoveAssistance(requestData._id)}
>
    REMOVE
  </button>

  <div className="d-flex flex-column align-items-center justify-content-center">
  {matchedProperties.length > 0 ? (
    <button
      onClick={() =>
        handleViewMore(matchedProperties[0].phoneNumber, matchedProperties[0].ppcId)
      }
      className="btn text-white px-3 py-1 mx-1"
      style={{ background: "#2F747F", width: "auto", fontSize: "13px" }}
    >
      Match Prop
    </button>
  ) : null}
</div>


  <button
  className="btn text-white px-3 py-1 mx-1"
  style={{ background: "#0F9F2C", width: "80px", fontSize: "13px" }}
  onClick={() => handleSendInterest(id)}
>
  Send Interest
</button>

  <button className="btn text-white px-3 py-1 mx-1" style={{ background: "#0F9F2C", width: "80px", fontSize: "13px" }}>
    PAY
  </button>
</div>

       </div>
       </div>

    </div>
</div>
  );
}













// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { FaArrowLeft, FaPhone, FaPhoneAlt, FaRegIdCard, FaRupeeSign } from "react-icons/fa";
// import { BsBuildings, BsBank } from "react-icons/bs";
// import { HiOutlineBuildingOffice2, HiOutlineNewspaper } from "react-icons/hi2";
// import { LiaBedSolid, LiaMoneyCheckSolid } from "react-icons/lia";
// import { RiCompass3Line } from "react-icons/ri";
// import { AiOutlineFileDone } from "react-icons/ai";
// import { RxDimensions } from "react-icons/rx";
// import { IoLocationOutline } from "react-icons/io5";
// import { LuCalendarDays } from "react-icons/lu";
// import imge from "../Assets/xd_profile1.png"
// import axios from "axios";
// import { CgProfile } from "react-icons/cg";
// import ConfirmationModal from "./ConfirmationModal";

// export default function DetailBuyerAssistance() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [buyerData, setBuyerData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [requestData, setRequestData] = useState(null);
// const [matchedProperties, setMatchedProperties] = useState([]);

// const [message, setMessage] = useState("");
// const [showModal, setShowModal] = useState(false);
// const [modalAction, setModalAction] = useState(null);
// const [selectedId, setSelectedId] = useState(null);


// const location = useLocation();
//   const storedPhoneNumber = location.state?.phoneNumber || localStorage.getItem("phoneNumber") || "";

//   const [phoneNumber, setPhoneNumber] = useState(storedPhoneNumber);

//   useEffect(() => {
//     const fetchRequest = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-buyerAssistance/${id}`);
//         const data = response.data.data;
//         setRequestData(data);
  
       
//         if (data?.interestedUserPhone) {
//           const matchedResponse = await axios.get(
//             `${process.env.REACT_APP_API_URL}/fetch-owner-matched-properties?phoneNumber=${data.buyerPhoneNumber}`
//           );
//           setMatchedProperties(matchedResponse.data.properties);
//         }
//       } catch (error) {
//         setError("Error fetching data");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     if (id) fetchRequest();
//   }, [id]);

//   const handleSendInterest = async (id) => {
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_API_URL}/update-status-buyer-assistance/${id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             ba_status: "buyer-assistance-interest",
//             userPhoneNumber: phoneNumber,
//           }),
//         }
//       );
  
//       const data = await response.json();
  
//       if (response.ok) {
//         alert("Interest Sent Successfully!");
//         // Optionally refetch data here
//       } else {
//         alert(`Failed to send interest: ${data.message}`);
//       }
//     } catch (error) {
//       console.error("Error sending interest:", error);
//       alert("An error occurred. Please try again.");
//     }
//   };
  
//   const handleRemoveAssistance = async (id) => {
//     try {
//       const res = await axios.delete(`${process.env.REACT_APP_API_URL}/delete-buyerAssistance/${id}`);
//       setMessage("Buyer Assistance request removed successfully!");
//       navigate("/buyer-lists"); // optional: redirect or refresh data
//     } catch (error) {
//       setMessage("Failed to delete Buyer Assistance request.");
//     }
//   };

  
  
  
//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error}</p>;
//     if (!requestData) return <p>No data found.</p>;
  
//     const handleViewMore = (phoneNumber, ppcId) => {
//       // navigate("/detail", { state: { ppcId, phoneNumber } });
//       navigate(`/detail/${ppcId}`, { state: {phoneNumber } });

//     };


// // export default function DetailBuyerAssistance() {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const [buyerData, setBuyerData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [requestData, setRequestData] = useState(null);
// //   const [matchedProperties, setMatchedProperties] = useState([]);
//   // const [message, setMessage] = useState("");
//   // const [showModal, setShowModal] = useState(false);
//   // const [modalAction, setModalAction] = useState(null);
//   // const [selectedId, setSelectedId] = useState(null);

// //   const location = useLocation();
// //   const storedPhoneNumber = location.state?.phoneNumber || localStorage.getItem("phoneNumber") || "";
// //   const [phoneNumber, setPhoneNumber] = useState(storedPhoneNumber);

// //   useEffect(() => {
// //     const fetchRequest = async () => {
// //       try {
// //         const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-buyerAssistance/${id}`);
// //         const data = response.data.data;
// //         setRequestData(data);

// //         if (data?.interestedUserPhone) {
// //           const matchedResponse = await axios.get(
// //             `${process.env.REACT_APP_API_URL}/fetch-owner-matched-properties?phoneNumber=${data.buyerPhoneNumber}`
// //           );
// //           setMatchedProperties(matchedResponse.data.properties);
// //         }
// //       } catch (error) {
// //         setError("Error fetching data");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (id) fetchRequest();
// //   }, [id]);

// //   const confirmAction = (action, id) => {
// //     setSelectedId(id);
// //     setModalAction(() => () => action(id));
// //     setShowModal(true);
// //   };

// //   const handleSendInterest = async (id) => {
// //     try {
// //       const response = await fetch(
// //         `${process.env.REACT_APP_API_URL}/update-status-buyer-assistance/${id}`,
// //         {
// //           method: "PUT",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({
// //             ba_status: "buyer-assistance-interest",
// //             userPhoneNumber: phoneNumber,
// //           }),
// //         }
// //       );
// //       const data = await response.json();

// //       if (response.ok) {
// //         setMessage("Interest Sent Successfully!");
// //       } else {
// //         setMessage(`Failed to send interest: ${data.message}`);
// //       }
// //     } catch (error) {
// //       setMessage("An error occurred. Please try again.");
// //     }
// //   };

//   // const handleRemoveAssistance = async (id) => {
//   //   try {
//   //     const res = await axios.delete(`${process.env.REACT_APP_API_URL}/delete-buyerAssistance/${id}`);
//   //     setMessage("Buyer Assistance request removed successfully!");
//   //     navigate("/buyer-lists"); // optional: redirect or refresh data
//   //   } catch (error) {
//   //     setMessage("Failed to delete Buyer Assistance request.");
//   //   }
//   // };

// //   const handleViewMore = (phoneNumber, ppcId) => {
// //     navigate(`/detail/${ppcId}`, { state: { phoneNumber } });
// //   };

//   return (
//     <div className='d-flex justify-content-center algin-item-center w-100'>
    
//     <div className='d-flex flex-column ' style={{maxWidth:"500px", width:"100%"}}>
//     <div className="d-flex align-items-center justify-content-start w-100 pt-2 pb-2" style={{background:"#EFEFEF" }}>
//               <button className="pe-5"
//                onClick={() => navigate('/mobileviews')}
//                ><FaArrowLeft color="#30747F"/> 
//             </button> <h3 className="m-0 ms-3" style={{fontSize:"15px", fontWeight:"bold"}}>DETAILED BUYER ASSISTANT</h3> </div>
//        <div className='d-flex algin-item-center justify-content-center w-100' style={{height:"200px"}}>

// <p> {message}</p>

//         <img src={imge} alt="" style={{width:"200px"}}/></div>
//         <div className='d-flex algin-item-center justify-content-center w-100 mt-2'>    
//               <div style={{background:"#C5C5C5", height:"2px", width:"90%"}}></div>
//         </div>
//         <div className="d-flex justify-content-center w-100">

//         <div className='row w-100 mt-3 p-0'>
//         <h5 className='ps-3 ms-3' style={{ color: "#30747F", fontWeight: "bold", marginBottom: "10px", fontSize:"15px" }}>Buyer Profile</h5>   
//             <div className="d-flex align-items-center mb-3">
//                       <div className="d-flex  flex-row align-items-start w-100 ps-3">
//                       <div className="d-flex align-items-center col-6">
//                           <FaRegIdCard color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
//                           <div>
//                             <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
//                             BA ID                         </h6>
//                             <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500", fontSize:"14px"}}>
//                             {requestData.ba_id || "N/A"}
//                             </span>
//                           </div>
//                         </div>  
                     
//       <div className="d-flex align-items-center col-6">
//                           <CgProfile color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
//                           <div>
//                             <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
//                             NAME                         </h6>
//                             <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500", fontSize:"14px"}}>
//                             {requestData.baName || "N/A"}
//                             </span>
//                           </div>
//                         </div>  
//                         </div>
//                         </div>

//         <h5 className='ps-3 ms-3' style={{ color: "#30747F", fontWeight: "bold", marginBottom: "10px", fontSize:"15px" }}> Budget</h5>   
//             <div className="d-flex align-items-center mb-3">
//                       <div className="d-flex  flex-row align-items-start w-100 ps-3">
//                       <div className="d-flex align-items-center col-6">
//                           <FaRupeeSign color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
//                           <div>
//                             <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
//                             Minimum Amount                           </h6>
//                             <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500", fontSize:"14px"}}>
//                             {requestData.minPrice || "N/A"}
//                             </span>
//                           </div>
//                         </div>  
                     
//       <div className="d-flex align-items-center col-6">
//                           <FaRupeeSign color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
//                           <div>
//                             <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
//                             Maximum Amount                           </h6>
//                             <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500", fontSize:"14px"}}>
//                             {requestData.maxPrice || "N/A"}
//                             </span>
//                           </div>
//                         </div>  
//                         </div>
//                         </div>
//            {/* Lookin for */}
//            <h5 className='ps-3 ms-3' style={{ color: "#30747F", fontWeight: "bold", marginBottom: "10px", fontSize:"15px" }}> Looking for</h5>   
//             <div className="d-flex align-items-center mb-3">
//                       <div className="d-flex  flex-row align-items-start w-100 ps-3">
//                       <div className="d-flex align-items-center col-6">
//                           <BsBuildings   color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
//                           <div>
//                             <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
//                             Property Mode                           </h6>
//                             <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500", fontSize:"14px"}}>
//                             {requestData.propertyMode || "N/A"}
//                             </span>
//                           </div>
//                         </div>  
                     
//       <div className="d-flex align-items-center col-6">
//                           <HiOutlineBuildingOffice2 color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
//                           <div>
//                             <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
//                            Property Type                           </h6>
//                             <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500", fontSize:"14px"}}>
//                             {requestData.propertyType || "N/A"}
//                             </span>
//                           </div>
//                         </div>  
//                         </div>
//                         </div>
                        
             
//             <div className="d-flex align-items-center mb-3">
//                       <div className="d-flex  flex-row align-items-start w-100 ps-3">
//                       <div className="d-flex align-items-center col-6">
//                           <LiaBedSolid color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
//                           <div>
//                             <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
//                             Min.Bedroom                           </h6>
//                             <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500", fontSize:"14px"}}>
//                             {requestData.bedrooms || "N/A"} BHK
//                             </span>
//                           </div>
//                         </div>  
                     
 

//                         <div className="d-flex align-items-center col-6">
//                           <RxDimensions color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
//                           <div>
//                             <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
//                             Minimum Area                             </h6>
//                             <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500", fontSize:"14px"}}>
//                             {requestData.totalArea || "N/A" }{requestData.areaUnit || "N/A"}
//                             </span>
//                           </div>
//                         </div>  
//                         </div>
//                         </div>
                        
//             <div className="d-flex align-items-center mb-3">
//                       <div className="d-flex  flex-row align-items-start w-100 ps-3">
//                       <div className="d-flex align-items-center col-6">
//                           <AiOutlineFileDone   color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
//                           <div>
//                             <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
//                             Approved                         </h6>
//                             <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500", fontSize:"14px"}}>
//                             {requestData.propertyApproved || "N/A"}
//                             </span>
//                           </div>
//                         </div>  
                     
//       <div className="d-flex align-items-center col-6">
//                           <BsBank color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
//                           <div>
//                             <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
//                             Bank Loan                         </h6>
//                             <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500", fontSize:"14px"}}>
//                             {requestData.bankLoan || "N/A"}
//                             </span>
//                           </div>
//                         </div>  
//                         </div>
//                         </div>
                        
                        
//             <div className="d-flex align-items-center mb-3">
//                       <div className="d-flex  flex-row align-items-start w-100 ps-3">
//                       <div className="d-flex align-items-center col-6">
//                           <RiCompass3Line color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
//                           <div>
//                             <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
//                             Select Facing                          </h6>
//                             <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500", fontSize:"14px"}}>
//                             {requestData.facing || "N/A"}
//                             </span>
//                           </div>
//                         </div>  
//                         </div>
//                         </div> 
                        
// <div className="d-flex align-items-center mb-3">
//   <div className="d-flex flex-row align-items-start w-100 ps-3">

//     {/* Buyer Phone Number */}
//     <div className="d-flex align-items-center col-6 mt-2" >
//       <FaPhoneAlt color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
//       <div>
//         <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
//           Buyer Phone Number
//         </h6>
//         <span className="card-text" style={{ color: "#1D1D1D", fontWeight: "500" }}>
//           {requestData?.phoneNumber || "N/A"}
//         </span>
//       </div>
//     </div>

//     {/* Interested User Phone Number */}
//     <div className="d-flex align-items-center col-6 mt-2">
//       <FaPhoneAlt color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
//       <div>
//         <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
//           Interested User Phone
//         </h6>
//         <span className="card-text" style={{ color: "#1D1D1D", fontWeight: "500" }}>
//           {requestData?.interestedUserPhone || "N/A"}
//         </span>
//       </div>
//     </div>

//   </div>
// </div>

//                         <h5 className='ps-3 ms-3' style={{ color: "#30747F", fontWeight: "bold", marginBottom: "10px", fontSize:"15px" }}> Location Preffered</h5>   
//                         <div className='ps-3 ms-3 mb-2' style={{ display: 'flex', alignItems: 'center' }}>
//   <IoLocationOutline color='#30747F' style={{ fontSize: '24px', flexShrink: 0, marginRight: '8px' }} />
//   <p style={{ margin: 0, flex: 1 }}>{requestData.city || "N/A"}</p>

// </div>


//                         <h5 className='ps-3 ms-3' style={{ color: "#30747F", fontWeight: "bold", marginBottom: "10px", fontSize:"15px" }}>Description</h5>   

// <div className=' ms-3 mb-3' style={{ display: 'flex', alignItems: 'center' }}>
//   <HiOutlineNewspaper color='#30747F' style={{ fontSize: '24px', flexShrink: 0, marginRight: '8px' }} />
//   <p style={{ margin: 0, flex: 1 }}>{requestData.description || "No Description Available"}</p>
// </div>

//             <div className="d-flex align-items-center mb-3">
//                       <div className="d-flex  flex-row align-items-start w-100 ps-3">
//                       <div className="d-flex align-items-center col-6">
//                           <LiaMoneyCheckSolid color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
//                           <div>
//                             <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
//                            Plan Name                      </h6>
//                             <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500", fontSize:"14px"}}>
//                             {requestData.paymentType || "N/A"}
//                             </span>
//                           </div>
//                         </div>  
                     
//       <div className="d-flex align-items-center col-6">
//                           <LuCalendarDays color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
//                           <div>
//                             <h6 className="m-0 text-muted" style={{ fontSize: "12px" }}>
//                            Expire Date                          </h6>
//                             <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500", fontSize:"14px"}}>
//                             {new Date(requestData.updatedAt).toLocaleString() || "N/A"}
//                             </span>
//                           </div>
//                         </div>  
//                         </div>
//                         </div> 


//                         <div className="d-flex justify-content-between align-items-center ps-2 pe-2 mt-5 mb-5 col-12">
//   <button className="btn text-white px-3 py-1 mx-1" style={{ background: "#FF0000", width: "80px", fontSize: "13px" }}
//     onClick={() => handleRemoveAssistance(id)}
//     // onClick={() => confirmAction(handleRemoveAssistance, requestData._id)}

// >
//     REMOVE
//   </button>


//   <div className="d-flex flex-column align-items-center justify-content-center">
//      {matchedProperties.length > 0 ? (
//       <button
//         onClick={() => handleViewMore(matchedProperties[0].phoneNumber, matchedProperties[0].ppcId)}
//         className="btn text-white px-3 py-1 mx-1"
//         style={{ background: "#2F747F", width: "auto", fontSize: "13px" }}
//       >
//         Match Prop
//       </button>
//      ) : ( 
//    <p></p>
//  )} 
//   </div>

//   <button
//   className="btn text-white px-3 py-1 mx-1"
//   style={{ background: "#0F9F2C", width: "80px", fontSize: "13px" }}
//   onClick={() => handleSendInterest(id)}
//   // onClick={() => confirmAction(handleSendInterest, requestData._id)}

// >
//   Send Interest
// </button>

//   <button className="btn text-white px-3 py-1 mx-1" style={{ background: "#0F9F2C", width: "80px", fontSize: "13px" }}>
//     PAY
//   </button>
// </div>

//        </div>
//        </div>


//        <ConfirmationModal
//         show={showModal}
//         message="Are you sure you want to proceed?"
//         onConfirm={() => {
//           modalAction();
//           setShowModal(false);
//         }}
//         onCancel={() => setShowModal(false)}
//       />
//     </div>
// </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation, Link } from 'react-router-dom';

// const data = {
//   tab1: ['Apple', 'Banana', 'Orange'],
//   tab2: ['Car', 'Bus', 'Bike'],
//   tab3: ['Paris', 'London', 'New York']
// };

// const TabsPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const getInitialTab = () => {
//     const savedTab = new URLSearchParams(location.search).get('tab');
//     return savedTab || 'tab1';
//   };

//   const [activeTab, setActiveTab] = useState(getInitialTab());

//   useEffect(() => {
//     navigate(`/tabs?tab=${activeTab}`, { replace: true });
//   }, [activeTab, navigate]);

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Multi-tab List Example</h2>
//       <div style={{ marginBottom: '15px' }}>
//         <button onClick={() => handleTabChange('tab1')} style={{ marginRight: 10 }}>Tab 1</button>
//         <button onClick={() => handleTabChange('tab2')} style={{ marginRight: 10 }}>Tab 2</button>
//         <button onClick={() => handleTabChange('tab3')}>Tab 3</button>
//       </div>

//       <ul>
//         {data[activeTab].map((item, idx) => (
//           <li key={idx}>
//             <Link to={`/details/${activeTab}-${idx}`}>{item}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TabsPage;


//     { 
//   handleAddProperty,
//   userCount,
//   phoneNumber,
//   planCount,
//   notificationCount,
//   notificationUserCount,
//   deleteCount,
//   totalPlansCount,
//   interestBuyersCount,
//   matchedPropertiesCount,
//   offersCount,
//   contactBuyerCount,
//   photoRequestsCount,
//   favoriteRequestsCount,
//   buyerViewedCount,
//   interestOwnersCount,
//   ownerMatchedPropertyCount,
//   ownerPhotoRequestCount,
//   contactOwnersCount,
//   ownerOfferCount,
//   favoriteOwnerCount,
//   viewCountLast10Days,
//   buyerAssistanceInterestCount
// }











import axios from 'axios';
import { useParams } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
// import MenuLink from './MenuLink'; // Assuming you already have this component
const MenuLink = ({ to, label , count }) => (
    <Link to={to} style={{ textDecoration: "none" }}>
        <li className="list-group-item d-flex justify-content-between align-items-center custom-list-item">
            <div className="d-flex align-items-center">
            <span style={{fontSize:"14px"}}>{label}</span>        
                </div>
            {count !== undefined && count !== null && ( // This moves to the right
                <span className="badge bg-success rounded-pill">{count}</span>
            )}        </li>
    </Link>
);
const TabsPage = () => {
    const location = useLocation();

    const storedPhoneNumber = location.state?.phoneNumber || localStorage.getItem("phoneNumber") || "";

    const [phoneNumber, setPhoneNumber] = useState(storedPhoneNumber);
    const query = new URLSearchParams(useLocation().search);

    const ppcId = query.get('ppcId');

    const navigate = useNavigate();
      const [loading, setLoading] = useState(false);
 
  const getInitialTab = () => {
    const tab = new URLSearchParams(location.search).get('tab');
    return tab || 'tab1';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab());

  useEffect(() => {
    navigate(`/tabs?tab=${activeTab}`, { replace: true });
  }, [activeTab, navigate]);

  const [error, setError] = useState(null);

  const [buyerViewedCount, setBuyerViewedCount] = useState(0);
    const [interestBuyersCount, setInterestBuyersCount] = useState(0);
    const [helpRequestsCount, setHelpRequestsCount] = useState(0);
    const [contactBuyerCount, setContactBuyerCount] = useState(0);

    const [reportRequestsCount, setReportRequestsCount] = useState(0);
    const [soldOutRequestsCount, setSoldOutRequestsCount] = useState(0);
    const [favoriteRequestsCount, setFavoriteRequestsCount] = useState(0);

    

    const [photoRequestsCount, setPhotoRequestsCount] = useState(0);
    const [matchedPropertiesCount, setMatchedPropertiesCount] = useState(0);
    const [offersCount, setOffersCount] = useState(0);
    const [ownerOfferCount, setOwnerOfferCount] = useState(0);
    const [ownerPhotoRequestCount, setOwnerPhotoRequestCount] = useState(0);
    const [ownerMatchedPropertyCount, setOwnerMatchedPropertyCount] = useState(0);
    const [favoriteCount, setFavoriteCount] = useState(0);
const [favoriteOwnerCount, setFavoriteOwnerCount] = useState(0);
const [favoriteRemovedOwnerCount, setFavoriteRemovedOwnerCount] = useState(0);
const [reportPropertyOwnersCount, setReportPropertyOwnersCount] = useState(0);
const [contactOwnersCount, setContactOwnersCount] = useState(0);
const [helpOwnersCount, setHelpOwnersCount] = useState(0);
const [interestOwnersCount, setInterestOwnersCount] = useState(0);
const [viewedPropertiesCount, setViewedPropertiesCount] = useState(0);

const [totalPlansCount, setTotalPlansCount] = useState(0);

const [userCount, setUserCount] = useState(0);

const [deleteCount,setDeleteCount]= useState(0);

const [notificationCount, setNotificationCount] = useState(0);
const [notificationUserCount, setNotificationUserCount] = useState(0);

const [planCount, setPlanCount] = useState(0);

const [callUserCount, setCallUserCount] = useState(0);
const [buyerAssistanceInterestCount, setBuyerAssistanceInterestCount] = useState(0);
const [viewCountLast10Days, setViewCountLast10Days] = useState(0);



const [buyerCount, setBuyerCount] = useState(0);

  
 
useEffect(() => {
  const fetchBuyerAssistance = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/get-buyerAssistance/${phoneNumber}`);
      if (res.data?.data) {
        setBuyerCount(res.data.data.length); // Count of requests
      }
    } catch (err) {
      console.error("Error fetching buyer assistance data", err);
    }
  };

  fetchBuyerAssistance();
}, [phoneNumber]);


useEffect(() => {
  const fetchViewCountLast10Days = async () => {
    if (!phoneNumber) return;

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/user-view-count/${phoneNumber}`
      );
      setViewCountLast10Days(data.viewCount);
    } catch (error) {
      console.error("Error fetching view count:", error);
      setError("Failed to fetch view count");
    }
  };

  fetchViewCountLast10Days();
}, [phoneNumber]);


useEffect(() => {
  const fetchBuyerAssistanceInterestCount = async () => {
      if (!phoneNumber) return;

      try {
          const { data } = await axios.get(
              `${process.env.REACT_APP_API_URL}/buyer-assistance-interests-phone/count`,
              {
                  params: { phone: phoneNumber },
              }
          );
          setBuyerAssistanceInterestCount(data.count);
      } catch (error) {
          console.error("Error fetching buyer assistance interest count:", error);
      }
  };

  fetchBuyerAssistanceInterestCount();
}, [phoneNumber]);



useEffect(() => {
  const fetchHelpOwnersCount = async () => {
      if (!phoneNumber) return;

      try {
          const { data } = await axios.get(
              `${process.env.REACT_APP_API_URL}/get-help-as-owner-count?phoneNumber=${phoneNumber}`
          );
          setHelpOwnersCount(data.helpPropertiesCount);  // ✅ corrected
      } catch (error) {
          console.error("Error fetching help request owners count:", error);
      }
  };

  fetchHelpOwnersCount();
}, [phoneNumber]);



useEffect(() => {
  const fetchCallUserCount = async () => {
    if (!phoneNumber) return;

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/user-call/property-owner/${phoneNumber}/count`
      );
      setCallUserCount(data.count);
    } catch (err) {
      setError('Error fetching call user count');
      console.error(err);
    }
  };

  fetchCallUserCount();
}, [phoneNumber]);


useEffect(() => {
  const fetchNotificationUserCount = async () => {
    if (!phoneNumber) return;

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/notification-user-count?phoneNumber=${phoneNumber}`
      );
      setNotificationUserCount(data.count);
    } catch (error) {
      setError("Error fetching notification count");
    }
  };

  fetchNotificationUserCount();
}, [phoneNumber]);


useEffect(() => {

  const fetchPlanCount = async () => {
    if (!phoneNumber) return;

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/plans/count/${phoneNumber}`
      );
      setPlanCount(data.count);
    } catch (error) {
      console.error("Error fetching plan count:", error);
      setError("Error fetching plan count.");
    }
  };

  fetchPlanCount();
}, [phoneNumber]);


useEffect(() => {
  const fetchNotificationCount = async () => {
    if (!phoneNumber) return; // Avoid API call if phoneNumber is missing

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/notifications/count/${phoneNumber}`
      );
      setNotificationCount(data.count);
    } catch (error) {
      console.error("Error fetching notification count:", error);
      setError("Error fetching notification count");
    }
  };

  fetchNotificationCount();
}, [phoneNumber]);

useEffect(() => {
  const fetchUserCount = async () => {
      if (!phoneNumber) return;
      try {
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-delete-status-count?phoneNumber=${phoneNumber}`);
          setDeleteCount(data.count);
      } catch (err) {
          console.error("Error fetching user count:", err);
          setError("Failed to fetch user count");
      } finally {
          setLoading(false);
      }
  };

  fetchUserCount();
}, [phoneNumber]);


useEffect(() => {
  const fetchUserCount = async () => {
      if (!phoneNumber) return;
      try {
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/property-count?phoneNumber=${phoneNumber}`);
          setUserCount(data.count);
      } catch (err) {
          console.error("Error fetching user count:", err);
          setError("Failed to fetch user count");
      } finally {
          setLoading(false);
      }
  };

  fetchUserCount();
}, [phoneNumber]);


  useEffect(() => {
      const fetchPlansCount = async () => {
          try {
              const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-all-plan-count`);
              setTotalPlansCount(data.totalPlansCount);
          } catch (error) {
              console.error("Error fetching plan count:", error);
          }
      };

      fetchPlansCount();
  }, []);


useEffect(() => {
  const fetchViewedPropertiesCount = async () => {
      if (!phoneNumber) return; // Avoid API call if phoneNumber is missing

      try {
          const { data } = await axios.get(
              `${process.env.REACT_APP_API_URL}/property-owner-viewed-users-count?phoneNumber=${phoneNumber}`
          );
          setViewedPropertiesCount(data.viewedPropertiesCount);
      } catch (error) {
          console.error("Error fetching viewed properties count:", error);
      }
  };

  fetchViewedPropertiesCount();
}, [phoneNumber]);

useEffect(() => {
  const fetchInterestOwnersCount = async () => {
      if (!phoneNumber) return;

      try {
          const { data } = await axios.get(
              `${process.env.REACT_APP_API_URL}/get-interest-sent-count?phoneNumber=${phoneNumber}`
          );

          // ✅ Use the correct key from the API response
          setInterestOwnersCount(data.interestSentCount);

      } catch (error) {
          console.error("Error fetching interest request owners count:", error);
      }
  };

  fetchInterestOwnersCount();
}, [phoneNumber]);


useEffect(() => {
  const fetchContactOwnersCount = async () => {
      if (!phoneNumber) return; // Avoid API call if phoneNumber is missing

      try {
          const { data } = await axios.get(
              `${process.env.REACT_APP_API_URL}/get-contact-owner-count?phoneNumber=${phoneNumber}`
          );
          setContactOwnersCount(data.contactOwnersCount);
      } catch (error) {
          console.error("Error fetching contact owners count:", error);
      }
  };

  fetchContactOwnersCount();
}, [phoneNumber]);

  useEffect(() => {
      const fetchReportPropertyOwnersCount = async () => {
          if (!phoneNumber) return; // Ensure phoneNumber exists before making the request

          try {
              const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-reportproperty-owner-count?phoneNumber=${phoneNumber}`);
              setReportPropertyOwnersCount(data.reportPropertyOwnersCount);
          } catch (error) {
              console.error("Error fetching report property owners count:", error);
          }
      };

      fetchReportPropertyOwnersCount();
  }, [phoneNumber]); 



const [soldOutOwnersCount, setSoldOutOwnersCount] = useState(0);

useEffect(() => {
  const fetchSoldOutOwnersCount = async () => {
      try {
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-soldout-owner-count?phoneNumber=${phoneNumber}`);
          setSoldOutOwnersCount(data.soldOutOwnersCount);
      } catch (error) {
          console.error("Error fetching sold-out owners count:", error);
      }
  };

  fetchSoldOutOwnersCount();
}, [phoneNumber]);


useEffect(() => {
  const fetchFavoriteRemovedOwnerCount = async () => {
      try {
          if (!phoneNumber) return;

          const { data } = await axios.get(
              `${process.env.REACT_APP_API_URL}/get-favorite-removed-owner-count?phoneNumber=${phoneNumber}`
          );

          setFavoriteRemovedOwnerCount(data.favoriteRemovedOwnerCount);
      } catch (error) {
          console.error("Error fetching favorite removed owner count:", error);
          setError("Failed to load data");
      } finally {
          setLoading(false);
      }
  };

  fetchFavoriteRemovedOwnerCount();
}, [phoneNumber]);


useEffect(() => {
  const fetchFavoriteOwnerCount = async () => {
      try {
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-favorite-owner-count?phoneNumber=${phoneNumber}`);
          setFavoriteOwnerCount(data.favoriteOwnerCount);
      } catch (error) {
          console.error("Error fetching favorite owner count:", error);
      }
  };

  if (phoneNumber) {
      fetchFavoriteOwnerCount();
  }
}, [phoneNumber]); // Re-run when phoneNumber changes





useEffect(() => {
  const fetchOwnerMatchedPropertyCount = async () => {
      try {
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-owner-matched-properties/count?phoneNumber=${phoneNumber}`);
          setOwnerMatchedPropertyCount(data.matchedPropertyCount);
      } catch (error) {
          console.error("Error fetching owner matched property count:", error);
      }
  };

  fetchOwnerMatchedPropertyCount();
}, [phoneNumber]);


useEffect(() => {
  const fetchOwnerPhotoRequestCount = async () => {
      try {
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/photo-requests/owner/count/${phoneNumber}`);
          setOwnerPhotoRequestCount(data.photoRequestCount);
      } catch (error) {
          console.error("Error fetching owner photo request count:", error);
      }
  };

  fetchOwnerPhotoRequestCount();
}, [phoneNumber]);


    useEffect(() => {
        const fetchOwnerOfferCount = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/offers/owner/count/${phoneNumber}`);
                setOwnerOfferCount(data.offerCount);
            } catch (error) {
                console.error("Error fetching owner offer count:", error);
            }
        };
    
        fetchOwnerOfferCount();
    }, [phoneNumber]);
    


useEffect(() => {
  const fetchOffersCount = async () => {
      try {
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/offers/buyer/count/${phoneNumber}`);
          setOffersCount(data.offersCount);
      } catch (error) {
          console.error("Error fetching offer count:", error);
      }
  };

  fetchOffersCount();
}, [phoneNumber]);


useEffect(() => {
  const fetchMatchedPropertiesCount = async () => {
      try {
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-buyer-matched-properties/count?phoneNumber=${phoneNumber}`);
          setMatchedPropertiesCount(data.matchedPropertiesCount);
      } catch (error) {
          console.error("Error fetching matched properties count:", error);
      }
  };

  fetchMatchedPropertiesCount();
}, [phoneNumber]);


    useEffect(() => {
        const fetchPhotoRequestsCount = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/photo-requests/buyer/count/${phoneNumber}`);
                setPhotoRequestsCount(data.photoRequestsCount);
            } catch (error) {
                console.error("Error fetching photo requests count:", error);
            }
        };
    
        fetchPhotoRequestsCount();
    }, [phoneNumber]);
    

useEffect(() => {
  const fetchFavoriteRequestsCount = async () => {
      try {
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-favorite-buyer-count?postedPhoneNumber=${phoneNumber}`);
          setFavoriteRequestsCount(data.favoriteRequestsCount);
      } catch (error) {
          console.error("Error fetching favorite requests count:", error);
      }
  };

  fetchFavoriteRequestsCount();
}, [phoneNumber]);


useEffect(() => {
  const fetchSoldOutRequestsCount = async () => {
      try {
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-soldout-buyer-count?postedPhoneNumber=${phoneNumber}`);
          setSoldOutRequestsCount(data.soldOutRequestsCount);
      } catch (error) {
          console.error("Error fetching sold-out requests count:", error);
      }
  };

  fetchSoldOutRequestsCount();
}, [phoneNumber]);


useEffect(() => {
  const fetchReportRequestsCount = async () => {
      try {
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-reportproperty-buyer-count?postedPhoneNumber=${phoneNumber}`);
          setReportRequestsCount(data.reportRequestsCount);
      } catch (error) {
          console.error("Error fetching reported property requests count:", error);
      }
  };

  fetchReportRequestsCount();
}, [phoneNumber]);
  
    useEffect(() => {
      if (!phoneNumber) {
        setLoading(false);
        return;
      }
  
      const fetchInterestBuyersCount = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/interest-buyers-count/${phoneNumber}`
          );
  
          if (response.status === 200) {
            setInterestBuyersCount(response.data.interestBuyersCount);
          }
        } catch (error) {
          console.error("Error fetching interest buyers count:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchInterestBuyersCount();
    }, [phoneNumber]);
  

    useEffect(() => {
      // Fetch buyer viewed count
      const fetchBuyerViewedCount = async () => {
          try {
              const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/property-buyer-viewed-count?phoneNumber=${phoneNumber}`);
              setBuyerViewedCount(data.buyerViewedCount);
          } catch (error) {
              console.error("Error fetching buyer viewed count:", error);
          }
      };
  
      fetchBuyerViewedCount();
  }, [phoneNumber]);

  useEffect(() => {
  const fetchHelpRequestsCount = async () => {
      try {
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-help-as-buyer-count?postedPhoneNumber=${phoneNumber}`);
          setHelpRequestsCount(data.helpRequestsCount);
      } catch (error) {
          console.error("Error fetching help requests count:", error);
      }
  };

  fetchHelpRequestsCount();
}, [phoneNumber]);


// Fetch contact buyer count
useEffect(() => {
const fetchContactBuyerCount = async () => {
  try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-contact-buyer-count?postedPhoneNumber=${phoneNumber}`);
      setContactBuyerCount(data.contactBuyerCount);
  } catch (error) {
      console.error("Error fetching contact buyer count:", error);
  }
};

fetchContactBuyerCount();
}, [phoneNumber]);




  
const handleAddProperty = async () => {
    if (!phoneNumber) {
        console.error("Missing phone number");
        return;
    }

    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/store-data`,
            { phoneNumber }
        );

        console.log("Response:", response); // Add a log to check the full response

        // Handle status code 200 as well (or replace with a more general check)
        if (response.status === 200 || response.status === 201) {
            const ppcId = response.data.ppcId;
            console.log("ppcId from response:", ppcId); // Add a log to check ppcId

            if (ppcId) {
                console.log(`Navigating to: /add-property/${phoneNumber}?ppcId=${ppcId}`);
                navigate(`/add-property/${phoneNumber}?ppcId=${ppcId}`);
            } else {
                console.error("Missing ppcId in the response");
            }
        } else {
            console.error("Unexpected response status:", response.status); // Log if status is not 200 or 201
        }
    } catch (error) {
        console.error("Error adding property:", error);
    }
};


  return (
    <div className="container d-flex align-items-center justify-content-center p-0">
    <div className="d-flex flex-column align-items-center justify-content-center m-0" style={{ maxWidth: '500px', margin: 'auto', width: '100%' , background:"#F7F7F7" , fontFamily: 'Inter, sans-serif'}}>
    <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
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
           </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>MORE  </h3> </div>
<div className="row g-2 w-100">
          {/* <h2>Tabbed Navigation</h2> */}
      <div className="btn-group mb-3">
        <button className={`btn btn-${activeTab === 'tab1' ? { background: '#30747F', color: '#fff', fontSize:"12px" , fontWeight:400} : 'outline-primary'}`} onClick={() => setActiveTab('tab1')}
          style={activeTab === 'tab1' ? { backgroundColor: '#30747F', color: 'white', fontSize:"12px" , fontWeight:400} : { color: 'black' , fontSize:"12px" , fontWeight:400 , border:"1px solid grey"}}
>MY ACCOUNT</button>
        <button 
                  style={activeTab === 'tab2' ? { backgroundColor: '#30747F', color: 'white', fontSize:"12px" , fontWeight:400} : { color: 'black' , fontSize:"12px" , fontWeight:400 , border:"1px solid grey"}}

        className={`btn btn-${activeTab === 'tab2' ? 'primary' : 'outline-primary'}`} onClick={() => setActiveTab('tab2')}>OWNER MENU</button>
        <button 
                  style={activeTab === 'tab3' ? { backgroundColor: '#30747F', color: 'white', fontSize:"12px" , fontWeight:400} : { color: 'black' , fontSize:"12px" , fontWeight:400 , border:"1px solid grey"}}

        className={`btn btn-${activeTab === 'tab3' ? 'primary' : 'outline-primary'}`} onClick={() => setActiveTab('tab3')}> BUYER MENU</button>
      </div>

      {activeTab === 'tab1' && (
        <ul className="list-group custom-list-group">
          <li 
            className="list-group-item d-flex justify-content-between align-items-center custom-list-item" 
            onClick={handleAddProperty} 
            style={{ cursor: "pointer" }}
          >
            <span style={{fontSize:"14px", fontWeight:400}}>ADD PROPERTY</span>
          </li>

          <MenuLink to={`/my-property`} label="My Property " count={userCount} />
          <MenuLink to={`/my-profile/${phoneNumber}`} label="My Profile " />
          <MenuLink to={`/my-plan`} label="My Plan " count={planCount} />
          <MenuLink to="/notification" label="Notifications" count={(notificationCount || 0) + (notificationUserCount || 0)} />
          <MenuLink to={`/removed-property`} label="Removed Property " count={deleteCount} />
          <MenuLink to={`/expired-plans`} label="Expried Plan " />
          <MenuLink to={`/add-plan`} label="Add Plans Owners" count={totalPlansCount} badgeClass="bg-success" />
        </ul>
      )}

      {activeTab === 'tab2' && (
        <ul className="list-group">
          <MenuLink to={`/interest-buyer/${phoneNumber}`} label="Interested Buyers" count={interestBuyersCount} badgeClass="bg-primary" />
          <MenuLink to={`/matched-buyer/${phoneNumber}`} label="Matched Buyers " count={matchedPropertiesCount} badgeClass="bg-success" />
          <MenuLink to={`/offer-buyer/${phoneNumber}`} label="Offers From Buyers" count={offersCount} badgeClass="bg-info" />
          <MenuLink to={`/contact-buyer/${phoneNumber}`} label="Contacted Buyers " count={contactBuyerCount} badgeClass="bg-warning" />
          <MenuLink to={`/photo-request-buyer/${phoneNumber}`} label="Photo Requested Buyers" count={photoRequestsCount} badgeClass="bg-info" />
          <MenuLink to={`/favorite-buyer/${phoneNumber}`} label="Shortlisted Buyers" count={favoriteRequestsCount} badgeClass="bg-primary" />
          <MenuLink to={`/view-buyer/${phoneNumber}`} label="Viewed Buyers" count={buyerViewedCount} badgeClass="bg-success" />
        </ul>
      )}

      {activeTab === 'tab3' && (
        <ul className="list-group">
          <MenuLink to={`/buyer-assistance/${phoneNumber}`} label="Add Buyer Assistance " />
          
<MenuLink 
                        to={`/buyer-assis-buyer`}
    label="Buyer Assistance"
    count={buyerCount}   

/>

          <MenuLink to={`/interest-owner/${phoneNumber}`} label="My Send Interest" count={interestOwnersCount} />
          <MenuLink to={`/matched-owner/${phoneNumber}`} label="MY Matched Properties" count={ownerMatchedPropertyCount} badgeClass="bg-success" />
          <MenuLink to={`/photo-request-owner/${phoneNumber}`} label="My Photo Requests" count={ownerPhotoRequestCount} badgeClass="bg-info" />
          <MenuLink to={`/contact-owner/${phoneNumber}`} label="My Contacted" count={contactOwnersCount} badgeClass="bg-primary" />
          <MenuLink to={`/offer-owner/${phoneNumber}`} label="My Offers" count={ownerOfferCount} badgeClass="bg-success" />
          <MenuLink to={`/favorite-owner/${phoneNumber}`} label="My Shortlist Property" count={favoriteOwnerCount} badgeClass="bg-success" />
          <MenuLink to={`/my-last-property`} label="My Last Viewed Property" count={viewCountLast10Days} />
          <MenuLink to={`/my-interest-send`} label="My Interest Send" count={buyerAssistanceInterestCount} />
        </ul>
      )}
    </div>
    </div>
    </div>

  );
};

export default TabsPage;

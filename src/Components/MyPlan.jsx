

import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { GoCheckCircleFill } from 'react-icons/go';

export default function MyPlan() {
    const location = useLocation();
    const navigate = useNavigate();
    const storedPhoneNumber = location.state?.phoneNumber || localStorage.getItem("phoneNumber") || "";
  
    const [phoneNumber, setPhoneNumber] = useState(storedPhoneNumber);
    const [plans, setPlans] = useState([]);
    const [planCount, setPlanCount] = useState(0);
    const [allPlans, setAllPlans] = useState([]);
    const [error, setError] = useState("");
    const [nextPlan, setNextPlan] = useState(null); // New state for next plan


    const handleUpgradeClick = () => {
      navigate('/add-plan');
    };
  
    useEffect(() => {
      const fetchPlans = async () => {
        if (!phoneNumber) return;
  
        try {
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/plans/${phoneNumber}`);
          setPlans(data.plans);
        } catch (error) {
          console.error("Error fetching plans:", error);
          setError("Error fetching your plans.");
        }
      };
  
      const fetchPlanCount = async () => {
        if (!phoneNumber) return;
  
        try {
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/plans/count/${phoneNumber}`);
          setPlanCount(data.count);
        } catch (error) {
          console.error("Error fetching plan count:", error);
          setError("Error fetching plan count.");
        }
      };
  
      const fetchAllPlans = async () => {
        try {
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/plans`);
          setAllPlans(data);
        } catch (error) {
          console.error("Error fetching all plans:", error);
          setError("Error fetching available plans.");
        }
      };
  
      fetchPlans();
      fetchPlanCount();
      fetchAllPlans();
    }, [phoneNumber]);
  
    useEffect(() => {
      if (plans.length > 0 && allPlans.length > 0) {
        const currentPlan = plans[0]; // Assuming the first plan is the active one
        const currentPlanIndex = allPlans.findIndex((plan) => plan.name === currentPlan.name);
        const nextPlan = allPlans[currentPlanIndex + 1]; // Find next plan
        setNextPlan(nextPlan); // Set next plan to state
      }
    }, [plans, allPlans]);

    const handleBackNavigation = () => {
      navigate('/mobileviews');
    };
  return (
 <div className="d-flex flex-column mx-auto custom-scrollbar"
      style={{
        maxWidth: '450px',
        height: '100vh',
        overflow: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      {/* Top bar with back button */}
      <div className="d-flex align-items-center justify-content-start w-100" style={{ background: "#EFEFEF" }}>
        <button
          onClick={handleBackNavigation}
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
            e.currentTarget.style.backgroundColor = '#f0f4f5';
            e.currentTarget.querySelector('svg').style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f0f0f0';
            e.currentTarget.querySelector('svg').style.color = '#30747F';
          }}
        >
          <FaArrowLeft style={{ color: '#30747F', transition: 'color 0.3s ease-in-out', background: "transparent" }} />
        </button>
        <h3 className="m-0" style={{ fontSize: "20px" }}>My Plan</h3>
      </div>

    <div style={styles.container}>
      <h2 className="text-center" style={{fontSize:"18px", fontWeight:700}}>
        {/* <span style={styles.backArrow}>&larr;</span>  */}
        Current Plan 
         {/* <span style={styles.reset}>Reset</span> */}
      </h2>
      {plans.length > 0 ? (
          plans.map((plan) => (
            // <div key={plan._id} className="col-12 d-flex justify-content-center mb-4">

      <div key={plan._id} style={styles.card}>
        <h3 style={styles.planTitle}>{plan.name ? plan.name.charAt(0).toUpperCase() + plan.name.slice(1) : ''}
        <span style={styles.checkmark}><GoCheckCircleFill /></span></h3>
        <p style={styles.planDetail}>Active Plan: {plan.durationDays} days</p>
        <p style={styles.planDetail}>Activated on  {plan.createdAt 
  ? new Date(plan.createdAt).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric' ,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }) 
  : 'N/A'}
</p>

        <div style={styles.infoRow}>
          <div style={{fontWeight:"bold"}}>Car Ads <button style={styles.viewButton}>View</button></div>
          <div style={{color:"grey"}}><strong> {plan.numOfCars}</strong> </div>
        </div>
        <div style={styles.infoRow}>
          <div style={{fontWeight:"bold"}}>Featured Ads</div>
          <div style={{color:"grey"}}><strong>{plan.featuredAds}</strong> </div>
        </div>
        <div style={styles.infoRow}>
          <div style={{fontWeight:"bold"}}>Expiry</div>
          <div style={{color:"grey" , fontSize:"13px" , fontWeight:600}}>{plan.expireDate || 'N/A'}</div>
        </div>
      </div>
      // </div>
          ))

    ) : (
      <div className="col-12 text-center p-4 bg-gray-100 rounded-md">
        No active plans found.
      </div>
    )}
      <h2 className="text-center" style={{fontSize:"18px", fontWeight:700}}>
      Extend your plan</h2>
      {nextPlan ? (

      <div style={styles.card}> 
        <div style={styles.infoRows}>
        <h3 style={styles.planTitle}>{nextPlan.name ? nextPlan.name.charAt(0).toUpperCase() + nextPlan.name.slice(1) : ''}
        </h3>
          <div>
            {/* <span style={styles.strikePrice}>₹15000</span> {' '} */}
            <span style={styles.newPrice}>₹ {nextPlan.price}</span>
          </div>
        </div>
        <div style={styles.infoRows}>
        <p style={styles.planDetail}>Validity:  {nextPlan.durationDays} days</p>
          {/* <div style={styles.discount}>save 50%</div> */}
        </div>
      </div>
    ) : (
          <div className="col-12 text-center p-4 bg-gray-100 rounded-md">
            No upcoming plan found.
          </div>
        )}
      {/* <button style={styles.upgradeButton}>UPGRADE YOUR PLAN</button> */}
      <button className="mt-5" style={styles.upgradeButton} onClick={handleUpgradeClick}>
      UPGRADE YOUR PLAN
    </button>
    </div>

    </div>

  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#F7F9FB',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  backArrow: {
    cursor: 'pointer'
  },
  reset: {
    color: '#007BFF',
    cursor: 'pointer',
    fontSize: '14px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0, 123, 255, 0.3)'
  },
  planTitle: {
    fontSize:"15px",
    fontWeight:"bold",
    color: '#007BFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  checkmark: {
    color: 'green',
    fontSize: '18px'
  },
  planDetail: {
    fontSize: '14px',
    color: 'grey',
    margin: '5px 0'
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #eee',
    padding: '10px 0',
  },
  infoRows: {
    display: 'flex',
    justifyContent: 'space-between',
    // borderBottom: '1px solid #eee',
    // padding: '10px 0',
  },
  viewButton: {
    backgroundColor: '#fff',
    color:"#007BFF",
    border: '1px solid #007BFF',
    padding: '1px 8px',
    borderRadius: '5px',
    fontSize: '12px',
    marginLeft: '10px'
  },
  extendTitle: {
    margin: '20px 0 10px'
  },
  strikePrice: {
    textDecoration: 'line-through',
    color: '#999',
    fontSize: '14px'
  },
  newPrice: {
    color: '#007BFF',
    fontWeight: 'bold',
    fontSize: '14px'
  },
  discount: {
    color: 'orange',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  upgradeButton: {
    width: '100%',
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  }
};

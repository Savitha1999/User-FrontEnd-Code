
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const MyPlan = () => {
  const location = useLocation();
  const storedPhoneNumber = location.state?.phoneNumber || localStorage.getItem("phoneNumber") || "";

  const [phoneNumber, setPhoneNumber] = useState(storedPhoneNumber);
  const [plans, setPlans] = useState([]);
  const [planCount, setPlanCount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      if (!phoneNumber) return;

      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/plans/${phoneNumber}`
        );
        setPlans(data.plans);
      } catch (error) {
        console.error("Error fetching plans:", error);
        setError("Error fetching plans.");
      }
    };

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

    fetchPlans();
    fetchPlanCount();
  }, [phoneNumber]);
  const navigate = useNavigate();

  const handlePageNavigation = () => {
    navigate('/mobileviews'); // Redirect to the desired path
  };
  return (
    <div className="d-flex flex-column mx-auto custom-scrollbar"
    style={{
      maxWidth: '450px',
      height: '100vh',
      overflow: 'auto',
      scrollbarWidth: 'none', /* For Firefox */
      msOverflowStyle: 'none', /* For Internet Explorer */
      fontFamily: 'Inter, sans-serif'
    }}>
      <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
              <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
            </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>My Plan</h3> </div>
            
            <h4 className="mt-2" style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}>  Active Plan  </h4>             

      <p className="text-lg font-semibold mb-2">Total Plans: {planCount}</p>

      {error && <p className="text-red-500">{error}</p>}

      <div className="row justify-content-center">
  {plans.length > 0 ? (
    plans.map((plan) => (
      <div key={plan._id} className="col-12 d-flex justify-content-center mb-4">
       <div 
              className="card shadow-lg rounded-3 border-0" 
              style={{
                width: '72%',
                backgroundColor:'#ADD9E6' ,
                transition: 'background-color 0.3s ease'
              }}
            >
        <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="card-title text-start" style={{color:"#ffffff"}}><strong>{plan.name}</strong></h4>
                </div>
                <p style={{fontSize:"19px", color:"#646464"}} className="card-subtitle mb-1 text-muted text-start">{plan.packageType}</p>
                <p style={{fontSize:"19px", color:"#646464"}} className="card-subtitle mb-2 text-muted text-start">UNLIMITED Property Leads</p>
                <h3 className="display-4 m-0 text-start" style={{ fontSize: '1.5rem', color:"red", fontWeight:"400" }}>₹ {plan.price}</h3>
                <p className="text-start mb-4" style={{ fontSize: '14px', color:"#fff" }}>/{plan.durationDays} Days / {plan.numOfCars} Car{plan.numOfCars > 1 ? 's' : ''}</p>
                <h3 className="mb-2 text-start" style={{ fontSize: '20px', color:"black" }}> Featured Ads</h3>
                <p className="card-subtitle mb-3 text-muted text-start">{plan.description}</p>
                <h3 className="display-4 mb-4 text-start" style={{ fontSize: '16px', color:"#fff" }}>{plan.featuredAds} FEATURED ADS</h3>

        <p className={`text-sm font-semibold ${plan.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
          <strong >Status:</strong> <span style={{color:"green"}}>{plan.status}</span>
        </p>
        </div>
        </div>

      </div>
    ))
  ) : (
    <div className="col-span-full text-center p-4 bg-gray-100 rounded-md">
      No plans found.
    </div>
  )}
</div>

    </div>
  );
};

export default MyPlan;

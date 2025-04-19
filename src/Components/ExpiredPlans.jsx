import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Card, Button, Row, Col, Container, Alert } from 'react-bootstrap';
import Plans from './PricingPlans';
import { FaArrowLeft } from 'react-icons/fa';

export default function ExpiredPlans() {
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber || localStorage.getItem("phoneNumber");

  const [message, setMessage] = useState('');
  const [fetchedPlan, setFetchedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); // Expiring or Expired message
  const [expiringPlans, setExpiringPlans] = useState([]); // Store expiring plans data
  const storedPhoneNumber = location.state?.phoneNumber || localStorage.getItem("phoneNumber") || "";

  const [plans, setPlans] = useState([]);
  const [planCount, setPlanCount] = useState(0);
  const [error, setError] = useState("");

  const navigate=useNavigate();

  useEffect(() => {
    if (!phoneNumber) {
      setMessage("Phone number is missing.");
    } else {
      updateExpiredPlans(); // Auto-update expired plans
      fetchPlan(phoneNumber);
      fetchExpiringPlans(); // Fetch expiring plans
    }
  }, [phoneNumber]);

  const fetchPlan = async (phoneNumber) => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-new-plan`, {
        params: { phoneNumber }
      });
      const plan = response.data.plan || null;
      setFetchedPlan(plan);

      if (plan) {
        checkPlanStatus(plan);
      }
    } catch (error) {
      setMessage("Failed to fetch plan.");
    } finally {
      setLoading(false);
    }
  };


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

      fetchPlans();
    }, [phoneNumber]);
  

  // Fetch Expiring Soon Plans
  const fetchExpiringPlans = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/expiring-soon`);
      setExpiringPlans(response.data.expiringPlans || []);
    } catch (error) {
      setMessage("Failed to fetch expiring plans.");
    }
  };

  // Check if the current plan is expiring soon or expired
  const checkPlanStatus = async (plan) => {
    try {
      const isExpiringSoon = expiringPlans.some(p => p._id === plan._id);
      const isExpired = expiringPlans.some(p => p._id === plan._id);

      if (isExpiringSoon) {
        setStatusMessage({ type: 'warning', text: "Your plan is expiring soon. Renew now to avoid interruption!" });
      } else if (isExpired) {
        setStatusMessage({ type: 'danger', text: "Your plan has expired. Please renew to continue using services." });
      } else {
        setStatusMessage(null);
      }
    } catch (error) {
      setMessage("Error checking plan status:", error);
    }
  };

  // Update Expired Plans on Backend
  const updateExpiredPlans = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/update-expired-plans`);
    } catch (error) {
      console.error("Error updating expired plans:", error);
    }
  };

  const handleRenew = () => {
    setMessage('Showing available plans...');
    setShowPlans(true);
  };

  if (showPlans) {
    return <Plans phoneNumber={phoneNumber} />;
  }

  return (
    <div className="container d-flex align-items-center justify-content-center p-0">
      <div className="d-flex flex-column align-items-center justify-content-center m-0" 
        style={{ maxWidth: '500px', margin: 'auto', width: '100%', fontFamily: 'Inter, sans-serif'}}>
          
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
                      </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>Expire Plan</h3> </div>
                  
                  <h4 className="mt-2 text-start" style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}>  Active Plan  </h4>             
      
            <p className="text-lg font-semibold mb-2">Total Plans: {planCount}</p>
      
            {error && <p className="text-red-500">{error}</p>}
      
            <div className="row justify-content-center w-100">
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
      
      <h2 className="text-center mb-4">Expired Plan</h2>
      {loading && <p className="text-center">Loading...</p>}

      {statusMessage && (
        <Alert variant={statusMessage.type} className="text-center">
          {statusMessage.text}
        </Alert>
      )}


      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="shadow-lg" style={{ backgroundColor: "#78c6e0", color: "white" }}>
            <Card.Body>
              {fetchedPlan ? (
                <div className="plan-details">
                  <Card.Title className="text-center mb-4">{fetchedPlan.name}</Card.Title>
                  <Card.Text><strong>Package Type:</strong> {fetchedPlan.packageType}</Card.Text>
                  <Card.Text><strong>Price:</strong> ₹{fetchedPlan.price}</Card.Text>
                  <Card.Text><strong>Duration:</strong> {fetchedPlan.durationDays} days</Card.Text>
                  <Card.Text><strong>Number of Cars:</strong> {fetchedPlan.numOfCars}</Card.Text>
                  <Card.Text><strong>Featured Ads:</strong> {fetchedPlan.featuredAds}</Card.Text>
                  <Card.Text><strong>Description:</strong> {fetchedPlan.description}</Card.Text>
                  <Card.Text><strong>Card Type:</strong> {fetchedPlan.cardType || 'Not Available'}</Card.Text>

                  <div className="text-center">
                    {statusMessage?.type === 'danger' ? (
                      <Button onClick={handleRenew} variant="danger" size="lg" className="mt-3">
                        Renew Plan
                      </Button>
                    ) : (
                      <Button onClick={handleRenew} variant="primary" size="lg" className="mt-3">
                        Renew Plan
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-center">No plan data available.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </div>
      </div>

  );
}

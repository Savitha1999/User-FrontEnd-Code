



import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import { Card, Button, Row, Col, Container, Alert } from 'react-bootstrap';
import Plans from './PricingPlans';

export default function ExpiredPlans() {
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber || localStorage.getItem("phoneNumber");

  const [message,setMessage]= useState('');
  const [fetchedPlan, setFetchedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); // Expiring or Expired message

  useEffect(() => {
    if (!phoneNumber) {
      setMessage("Phone number is missing.");
    } else {
      updateExpiredPlans(); // Auto-update expired plans
      fetchPlan(phoneNumber);
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

  // Fetch Expiring Soon & Expired Plans
  const checkPlanStatus = async (plan) => {
    try {
      const [expiringRes, expiredRes] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/expiring-soon`),
        axios.get(`${process.env.REACT_APP_API_URL}/expired-plans`)
      ]);

      const expiringPlans = expiringRes.data;
      const expiredPlans = expiredRes.data;

      // Check if the current plan is expiring soon
      const isExpiringSoon = expiringPlans.some(p => p._id === plan._id);
      const isExpired = expiredPlans.some(p => p._id === plan._id);

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
    <Container className="my-5">
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
    </Container>
  );
}







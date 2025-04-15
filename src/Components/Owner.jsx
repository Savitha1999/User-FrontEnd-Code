



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Owner = () => {
  const { ppcId } = useLocation().state || {}; // Get ppcId from the route state
  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Property Data
  const fetchPropertyData = async () => {
    if (!ppcId) {
      setError('PPC ID is required.');
      return;
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-property-data?ppcId=${ppcId}`);
      setPropertyData(response.data.propertyData);
    } catch (err) {
      setError('Failed to fetch property data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ppcId) {
      fetchPropertyData();
    }
  }, [ppcId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4 p-4">
      <h3>Property Data for PPC ID: {ppcId}</h3>

      {propertyData ? (
        <div>
          <h4>Owner Information</h4>
          <p><strong>Owner Phone Number:</strong> {propertyData.ownerPhoneNumber}</p>

          <h4>Requests and Reports</h4>
          <ul>
            <li><strong>Interest Requests:</strong> {propertyData.interestRequests.length}</li>
            <li><strong>Help Requests:</strong> {propertyData.helpRequests.length}</li>
            <li><strong>Report Property Requests:</strong> {propertyData.reportPropertyRequests.length}</li>
            <li><strong>Sold Out Reports:</strong> {propertyData.soldOutReports.length}</li>
            <li><strong>Contact Requests:</strong> {propertyData.contactRequests.length}</li>
          </ul>

          <h4>Status</h4>
          <p><strong>Property Status:</strong> {propertyData.status}</p>
        </div>
      ) : (
        <p>No data available for this property.</p>
      )}
    </div>
  );
};

export default Owner;

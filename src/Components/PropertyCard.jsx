


import React from 'react';

const PropertyCard = ({ property }) => {
  return (
    <div className="card">
      <img 
        src={property.photos || "https://d17r9yv50dox9q.cloudfront.net/car_gallery/default.jpg"} 
        alt="Property" 
        className="card-img-top" 
      />
      <div className="card-body">
        <h5 className="card-title">PPC-Id: {property.ppcId}</h5>
        <p className="card-text">Owner Phone: {property.postedUserPhoneNumber}</p>
        
        {/* Display Additional Property Details */}
        <p className="card-text"><strong>Mode:</strong> {property.propertyMode}</p>
        <p className="card-text"><strong>Type:</strong> {property.propertyType}</p>
        <p className="card-text"><strong>Price:</strong> ${property.price}</p>
        <p className="card-text"><strong>Area:</strong> {property.area} </p>
      </div>
    </div>
  );
};

export default PropertyCard;

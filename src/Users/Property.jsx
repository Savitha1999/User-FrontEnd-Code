// import React, { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
// import { toast, ToastContainer } from 'react-toastify';
// import axios from 'axios';
// import 'react-toastify/dist/ReactToastify.css';

// const Property = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { phoneNumber, countryCode } = location.state || {};

//   const handleAddProperty = async () => {
//     try {
//       const propertyName = "New Property"; // You can replace this with dynamic property name input
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/add-property`, {
//         phoneNumber: `${countryCode}${phoneNumber}`,
//         ppcId: `PPC-${Date.now()}`, // Example of generating a unique PPC ID
//         propertyName,
//       });

//       if (response.status === 200 || response.status === 201) {
//         toast.success(`Property added successfully! PPC-ID: ${response.data.user.properties.slice(-1)[0].ppcId}`);

//         // Navigate to AddPropertyForm page with PPC-ID and phone number
//         setTimeout(() => {
//           navigate('/add-form', {
//             state: {
//               ppcId: response.data.user.properties.slice(-1)[0].ppcId,
//               phoneNumber: `${countryCode}${phoneNumber}`,
//             },
//           });
//         }, 1000); // Delay for toast message display
//       }
//     } catch (error) {
//       if (error.response && error.response.data) {
//         toast.error(error.response.data.message || 'Error adding property.');
//       } else {
//         toast.error('Error adding property. Please try again.');
//       }
//       console.error('Frontend Error:', error);
//     }
//   };

//   useEffect(() => {
//     if (!phoneNumber || !countryCode) {
//       toast.error('Missing required information to add property.');
//     }
//   }, [phoneNumber, countryCode]);

//   return (
//     <div style={{ textAlign: 'center', marginTop: '50px' }}>
//       <h1>Property Page</h1>
//       <p>Welcome to the Property Page! Here, you can explore your properties.</p>

//       <Button
//         type="button"
//         className="btn-property w-100 mt-3"
//         onClick={handleAddProperty}
//       >
//         ADD PROPERTY
//       </Button>

//       <ToastContainer />
//     </div>
//   );
// };

// export default Property;










// import React from 'react';
// import { useSelector } from 'react-redux';

// const Property = () => {
//   const user = useSelector((state) => state.auth);
//   const localUserData = JSON.parse(localStorage.getItem('userPhoneNumber')) || {};

//   const phoneNumber = user.phoneNumber || localUserData.phoneNumber;
//   const countryCode = user.countryCode || localUserData.countryCode;

//   return (
//     <div className="p-5">
//       <h2>Property Page</h2>
//       <p><strong>Phone Number:</strong> {countryCode} {phoneNumber}</p>
//       <p>Here, you can manage your properties.</p>
//     </div>
//   );
// };

// export default Property;




// ************************************





// import React, { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
// import { toast, ToastContainer } from 'react-toastify';
// import axios from 'axios';
// import 'react-toastify/dist/ReactToastify.css';

// const Property = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { phoneNumber, countryCode } = location.state || {};

//   const handleAddProperty = async () => {
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/store-data`, {
//         phoneNumber: `${countryCode}${phoneNumber}`, // Correct template literal syntax
//       });

//       if (response.status === 201) {
//         // toast.success(`User added successfully! PPC-ID: ${response.data.ppcId}`);
        
//         // Navigate to AddPropertyForm page with PPC-ID and phone number
//         setTimeout(() => {
//           navigate('/add-form', {
//             state: { ppcId: response.data.ppcId, phoneNumber: `${countryCode}${phoneNumber}` }, // Correct template literal syntax
//           });
//         }, 1000); // Delay for toast message display
//       }
//     } catch (error) {
//       if (error.response && error.response.data) {
//         toast.error(error.response.data.message || 'Error adding user.');
//       } else {
//         toast.error('Error adding user. Please try again.');
//       }
//       console.error('Frontend Error:', error);
//     }
//   };

//   useEffect(() => {
//     if (!phoneNumber || !countryCode) {
//       toast.error('Missing required information to add property.');
//     }
//   }, [phoneNumber, countryCode]);

//   return (
//     <div style={{ textAlign: 'center', marginTop: '50px' }}>
//       <h1>Property Page</h1>
//       <p>Welcome to the Property Page! Here, you can explore your properties.</p>

//       <Button
//         type="button"
//         className="btn-property w-100 mt-3"
//         onClick={handleAddProperty}
//       >
//         PROPERTY
//       </Button>

//       <ToastContainer />
//     </div>
//   );
// };

// export default Property;













import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
// import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
// import 'react-toastify/dist/ReactToastify.css';

const Property = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);

  // Extract phoneNumber and countryCode from location.state or localStorage
  const { phoneNumber: statePhoneNumber, countryCode: stateCountryCode } = location.state || {};
  const storedPhoneNumber = localStorage.getItem('phoneNumber');
  const storedCountryCode = localStorage.getItem('countryCode');

  const phoneNumber = statePhoneNumber || storedPhoneNumber;
  const countryCode = stateCountryCode || storedCountryCode;

  const [message, setMessage] = useState("");


  const handleAddProperty = async () => {
    if (!phoneNumber || !countryCode) {
      setMessage('Missing phone number or country code.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/store-data`, {
        phoneNumber: `${countryCode}${phoneNumber}`,
      });

      if (response.status === 201) {
        setMessage(`User added successfully! PPC-ID: ${response.data.ppcId}`);
        
        // Navigate to AddPropertyForm page with PPC-ID and phone number
        setTimeout(() => {
          navigate('/add-form', {
            state: { ppcId: response.data.ppcId, phoneNumber: `${countryCode}${phoneNumber}` },
          });
        }, 1000);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || 'Error adding user.');
      } else {
        setMessage('Error adding user. Please try again.');
      }
    } 
  };

  useEffect(() => {
    if (phoneNumber && countryCode) {
      // Save phoneNumber and countryCode to localStorage
      localStorage.setItem('phoneNumber', phoneNumber);
      localStorage.setItem('countryCode', countryCode);
    } else {
      setMessage('Missing required information to add property.');
    }
  }, [phoneNumber, countryCode]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Property Page</h1>
      <p>Welcome to the Property Page! Here, you can explore your properties.</p>

      <Button
        type="button"
        className="btn-property w-100 mt-3"
        onClick={handleAddProperty}
        // disabled={loading}
      >
        property
      </Button>

    </div>
  );
};

export default Property;







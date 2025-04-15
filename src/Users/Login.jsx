

// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col, Form, Button, Modal, InputGroup } from 'react-bootstrap';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Flag from 'react-world-flags';
// import logo from '../images/logo.PNG';
// import './log.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';



// const Login = () => {
//   const [phoneNumber, setPhoneNumberState] = useState('');
//   const [otp, setOtp] = useState('');
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [mockOtp, setMockOtp] = useState('');
//   const [countryCode, setCountryCode] = useState('+91');
//   const [selectedCountry, setSelectedCountry] = useState('IN');
//   const [isPhoneNumberEntered, setIsPhoneNumberEntered] = useState(false);

//   const navigate = useNavigate(); // For navigation


//   const countryCodes = [
//     { code: '+1', country: 'USA', flag: 'US' },
//     { code: '+91', country: 'India', flag: 'IN' },
//     // Add more countries as needed
//   ];

//   const handleCountryChange = (e) => {
//     const selected = e.target.value;
//     const country = countryCodes.find((c) => c.flag === selected);
//     setCountryCode(country.code);
//     setSelectedCountry(selected);
//   };

//   const handlePhoneNumberChange = (e) => {
//     const phone = e.target.value;
//     setPhoneNumberState(phone);
//     setIsPhoneNumberEntered(phone.length > 0);
//   };

//   const handleSendOtp = (e) => {
//     e.preventDefault();
//     if (!phoneNumber) {
//       toast.error('Please enter a valid phone number.');
//       return;
//     }

//     const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
//     setMockOtp(generatedOtp);
//     localStorage.setItem('mockOtp', generatedOtp); // Store OTP for mock verification
//     toast.success(`OTP sent to ${countryCode}${phoneNumber}. (Mock OTP: ${generatedOtp})`);
//     setIsOtpSent(true);
//   };

//   // const handleVerifyOtp = (e) => {
//   //   e.preventDefault();
//   //   const storedOtp = localStorage.getItem('mockOtp');
//   //   if (otp === storedOtp) {
//   //     toast.success('OTP verified successfully!');

//   //     resetFields();
//   //   } else {
//   //     toast.error('Invalid OTP. Please try again.');
//   //   }
//   // };



//   const handleVerifyOtp = (e) => {
//     e.preventDefault();
//     const storedOtp = localStorage.getItem('mockOtp');
//     if (otp === storedOtp) {
//       toast.success('OTP verified successfully!');
//       navigate('/bottom-nav', { state: { phoneNumber, countryCode } }); // Pass data
//     } else {
//       toast.error('Invalid OTP. Please try again.');
//     }
//   };


//   const resetFields = () => {
//     setPhoneNumberState('');
//     setOtp('');
//     setIsOtpSent(false);
//     setMockOtp('');
//   };


  
//   return (
   
//     <Container fluid className="p-0 login">
//     <Row className="g-0">
//       <Col lg={12} className="d-flex align-items-center justify-content-center">
//         <div className="login-container">
//           <h1 className="text-center">Welcome Back</h1>
//           <p className="text-center">Login to continue</p>
//           <div className="text-center mb-4">
//             <img src={logo} alt="Logo" style={{ width: '150px' }} />
//           </div>
  
//           {!isOtpSent ? (
//             <Form onSubmit={handleSendOtp}>
//               <Form.Group className="mb-3" controlId="countryCode">
//                 <InputGroup>
//                   <InputGroup.Text>
//                     <Flag code={selectedCountry} style={{ width: '30px' }} />
//                   </InputGroup.Text>
//                   <Form.Select
//                     value={selectedCountry}
//                     onChange={handleCountryChange}
//                     className="custom-background small-input"
//                   >
//                     {countryCodes.map((country) => (
//                       <option className='small-input' key={country.code} value={country.flag}>
//                         ({country.country}) {country.code}
//                       </option>
//                     ))}
//                   </Form.Select>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter Mobile No"
//                     value={phoneNumber}
//                     onChange={handlePhoneNumberChange}
//                     required
//                     className="small-input"
//                   />
//                 </InputGroup>
//               </Form.Group>
//               <div className="d-flex justify-content-center mt-3">
//                 <Button
//                   type="button"
//                   className="btn-skip mx-2"
//                 >
//                   SKIP
//                 </Button>
//                 <Button
//                   type="submit"
//                   className="btn-login mx-2"
//                 >
//                   LOGIN
//                 </Button>
//               </div>
//             </Form>
//           ) : (
//             <Form onSubmit={handleVerifyOtp}>
//               <Form.Group className="mb-3" controlId="otp">
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   required
//                 />
//               </Form.Group>
//               <Button
//                 type="submit"
//                 className="btn-login w-100"
//               >
//                 VERIFY OTP
//               </Button>
//             </Form>
//           )}



  
//           <ToastContainer />
//         </div>
//       </Col>
//     </Row>
//   </Container>
  
//   );
// };

// export default Login;




// // *********************************************************************



// // import React, { useState, useEffect } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import { Container, Row, Col, Form, Button, Modal, InputGroup } from 'react-bootstrap';
// // import { FaRobot } from 'react-icons/fa';
// // import { toast, ToastContainer } from 'react-toastify';
// // import { useDispatch } from 'react-redux';
// // import { setPhoneNumber, setIsVerified } from '../red/userSlice';
// // import { Helmet } from 'react-helmet';
// // import ReCAPTCHA from 'react-google-recaptcha';
// // import './Login.css';
// // import Flag from 'react-world-flags';
// // import logo from '../images/logo.PNG';
// // import 'react-toastify/dist/ReactToastify.css'; 


// // const Login = () => {
// //   const [phoneNumber, setPhoneNumberState] = useState('');
// //   const [otp, setOtp] = useState('');
// //   const [isOtpSent, setIsOtpSent] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [captchaValue, setCaptchaValue] = useState(null);
// //   const [otpTimer, setOtpTimer] = useState(30);
// //   const [canResendOtp, setCanResendOtp] = useState(false);
// //   const [showModal, setShowModal] = useState(false);
// //   const [countryCode, setCountryCode] = useState('+91');
// //   const [selectedCountry, setSelectedCountry] = useState('IN');
// //   const [isPhoneNumberEntered, setIsPhoneNumberEntered] = useState(false);  // Added state for phone number entry

// //   const dispatch = useDispatch();

 
// // const countryCodes = [
// //   { code: '+1', country: 'USA', flag: 'US' },
// //   { code: '+44', country: 'UK', flag: 'GB' },
// //   { code: '+91', country: 'IN', flag: 'IN' },
// //   { code: '+61', country: 'Australia', flag: 'AU' },
// //   { code: '+81', country: 'Japan', flag: 'JP' },
// //   { code: '+49', country: 'Germany', flag: 'DE' },
// //   { code: '+33', country: 'France', flag: 'FR' },
// //   { code: '+34', country: 'Spain', flag: 'ES' },
// //   { code: '+55', country: 'Brazil', flag: 'BR' },
// //   { code: '+52', country: 'Mexico', flag: 'MX' },
// //   { code: '+86', country: 'China', flag: 'CN' },
// //   { code: '+39', country: 'Italy', flag: 'IT' },
// //   { code: '+7', country: 'Russia', flag: 'RU' },
// //   { code: '+64', country: 'New Zealand', flag: 'NZ' },
// //   { code: '+27', country: 'South Africa', flag: 'ZA' },
// //   { code: '+31', country: 'Netherlands', flag: 'NL' },
// //   { code: '+46', country: 'Sweden', flag: 'SE' },
// //   { code: '+47', country: 'Norway', flag: 'NO' },
// //   { code: '+48', country: 'Poland', flag: 'PL' },
// //   { code: '+60', country: 'Malaysia', flag: 'MY' },
// //   { code: '+62', country: 'Indonesia', flag: 'ID' },
// //   { code: '+63', country: 'Philippines', flag: 'PH' },
// //   { code: '+66', country: 'Thailand', flag: 'TH' },
// //   { code: '+92', country: 'Pakistan', flag: 'PK' },
// //   { code: '+94', country: 'Sri Lanka', flag: 'LK' },
// //   { code: '+972', country: 'Israel', flag: 'IL' },
// //   { code: '+971', country: 'UAE', flag: 'AE' },
// //   { code: '+880', country: 'Bangladesh', flag: 'BD' },
// //   { code: '+234', country: 'Nigeria', flag: 'NG' },
// //   { code: '+254', country: 'Kenya', flag: 'KE' },
// //   { code: '+503', country: 'El Salvador', flag: 'SV' },
// //   { code: '+504', country: 'Honduras', flag: 'HN' },
// //   { code: '+505', country: 'Nicaragua', flag: 'NI' },
// //   { code: '+506', country: 'Costa Rica', flag: 'CR' },
// //   { code: '+507', country: 'Panama', flag: 'PA' },
// //   { code: '+512', country: 'Peru', flag: 'PE' },
// //   { code: '+593', country: 'Ecuador', flag: 'EC' },
// //   { code: '+595', country: 'Paraguay', flag: 'PY' },
// //   { code: '+597', country: 'Suriname', flag: 'SR' },
// //   { code: '+598', country: 'Uruguay', flag: 'UY' },
// //   { code: '+1-246', country: 'Barbados', flag: 'BB' },
// //   { code: '+1-345', country: 'Cayman Islands', flag: 'KY' },
// //   { code: '+1-441', country: 'Bermuda', flag: 'BM' },
// //   { code: '+1-473', country: 'Grenada', flag: 'GD' },
// //   { code: '+1-664', country: 'Montserrat', flag: 'MS' },
// //   { code: '+1-721', country: 'Sint Maarten', flag: 'SX' },
// //   { code: '+1-758', country: 'Saint Lucia', flag: 'LC' },
// //   { code: '+1-787', country: 'Puerto Rico', flag: 'PR' },
// //   { code: '+44-20', country: 'London (UK)', flag: 'GB' },
// //   { code: '+44-121', country: 'Birmingham (UK)', flag: 'GB' },
// //   { code: '+44-161', country: 'Manchester (UK)', flag: 'GB' },
// //   { code: '+44-113', country: 'Leeds (UK)', flag: 'GB' },
// // ];


// // useEffect(() => {
// //   let timer;
// //   if (otpTimer > 0 && !canResendOtp) {
// //     timer = setInterval(() => {
// //       setOtpTimer(prev => {
// //         if (prev === 1) {
// //           setCanResendOtp(true);
// //           clearInterval(timer);
// //           return 0;
// //         }
// //         return prev - 1;
// //       });
// //     }, 5000);
// //   }
// //   return () => clearInterval(timer);
// // }, [otpTimer, canResendOtp]);



// //   useEffect(() => {
// //     const storedPhoneNumber = localStorage.getItem('userPhoneNumber');
// //     if (storedPhoneNumber) {
// //       setPhoneNumberState(storedPhoneNumber);
// //       dispatch(setPhoneNumber(storedPhoneNumber));
// //     }
// //   }, [dispatch]);

// //   const handleCountryChange = (e) => {
// //     const selected = e.target.value;
// //     const country = countryCodes.find(c => c.flag === selected);
// //     setCountryCode(country.code);
// //     setSelectedCountry(selected);
// //   };

// //   // const handlePhoneNumberChange = (e) => {
// //   //   const phone = e.target.value;
// //   //   setPhoneNumberState(phone);
// //   //   dispatch(setPhoneNumber(phone));
// //   //   localStorage.setItem('userPhoneNumber', phone);
// //   //   setIsPhoneNumberEntered(phone.length > 0);  // Set to true if phone number is entered
// //   // };


// //   const handlePhoneNumberChange = (e) => {
// //     const phone = e.target.value;
// //     setPhoneNumberState(phone);
    
// //     const fullPhoneNumber = countryCode + phone; // Combine country code and phone number
// //     dispatch(setPhoneNumber(fullPhoneNumber));
// //     localStorage.setItem('userPhoneNumber', fullPhoneNumber); // Store the full phone number
// //     setIsPhoneNumberEntered(phone.length > 0); // Update state
// //   };
  

// //   const handleCaptchaChange = (value) => {
// //     setCaptchaValue(value);
// //   };

// //   const handleSendOtp = async (e) => {
// //     e.preventDefault();

// //     if (!phoneNumber || !captchaValue) {
// //       setError('Please complete the CAPTCHA and provide a valid phone number.');
// //       toast.error("Please complete the CAPTCHA!");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       setError('');
// //       const fullPhoneNumber = countryCode + phoneNumber;


// //       const response = await fetch(`${process.env.REACT_APP_API_URL}/user/register`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           // phone: countryCode + phoneNumber,
// //           phone: fullPhoneNumber,
// //           captchaResponse: captchaValue,
// //         }),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         setIsOtpSent(true);
// //         setOtpTimer(30);
// //         setCanResendOtp(false);
// //         // toast.success('OTP sent to ' + countryCode + phoneNumber);
// //         toast.success('OTP sent to ' + fullPhoneNumber);

// //       } else {
// //         setError(data.message || 'Failed to send OTP.');
// //         toast.error('Failed to send OTP');
// //       }
// //     } catch (err) {
// //       setError('Something went wrong. Please try again.');
// //       toast.error('Something went wrong');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleVerifyOtp = async (e) => {
// //     e.preventDefault();
// //     if (!otp || !captchaValue) {
// //       setError("Please complete the CAPTCHA and enter the OTP.");
// //       toast.error("Please complete the CAPTCHA and enter OTP!");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       setError('');
// //       const fullPhoneNumber = countryCode + phoneNumber;


// //       // const response = await fetch('http://localhost:5000/PPC/user/verify-otp', {
// //       //   method: 'POST',
// //       //   headers: { 'Content-Type': 'application/json' },
// //       //   body: JSON.stringify({
// //       //     // phone: countryCode + phoneNumber,
// //       //     phone: fullPhoneNumber,
// //       //     otp: otp,
// //       //     captchaResponse: captchaValue,
// //       //   }),
// //       // });

      
// //       const response = await fetch(`${process.env.REACT_APP_API_URL}/user/verify-otp`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           phone: fullPhoneNumber, // Including the country code and phone number
// //           otp: otp,
// //           captchaResponse: captchaValue,
// //         }),
// //       });
      

// //       const data = await response.json();

// //       if (response.ok) {
// //         dispatch(setIsVerified(true));
// //         setShowModal(true);
// //         toast.success('OTP verified successfully!');
// //         resetFields();
// //       } else {
// //         setError(data.message || 'OTP verification failed.');
// //         toast.error('OTP verification failed. Please try again.');
// //       }
// //     } catch (err) {
// //       setError('Something went wrong. Please try again.');
// //       toast.error('Something went wrong. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const resetFields = () => {
// //     setPhoneNumberState('');
// //     setOtp('');
// //     setIsOtpSent(false);
// //     setOtpTimer(30);
// //     setCanResendOtp(false);
// //   };

 

// //   const siteKey = "6LdOMKEqAAAAAOBUloLhEN3sUAyIZxRtzhLSwn1F";

// //   return (
// //     <Container fluid className="p-0 login">
// //       <Helmet>
// //         <title>Pondy Property | Login</title>
// //       </Helmet>
// //       <Row className="g-0">
// //         <Col lg={12} className="d-flex align-items-center justify-content-center">
// //           <div className="d-flex mt-3 justify-content-center align-items-center">

// //             <div
// //               style={{
// //                 width: "100%",
// //                 maxWidth: "600px",
// //                 minWidth: "300px",
// //                 height: "800px",
// //                 position: "relative",
// //                 backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcuV4KOIIk3EuvX9hVPSTszzfiPqalO5Oipbfm5wXCPVFgtWiFpMEiO3K2GpjuV87G61Y&usqp=CAU')",
// //                 backgroundSize: "cover",
// //                 backgroundPosition: "center",
// //                 padding: "2rem",
// //                 borderRadius: "8px",
// //                 margin: "0 20px",
// //                 backgroundRepeat: "no-repeat",
// //                 color: "white",
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   position: "absolute",
// //                   top: 0,
// //                   left: 0,
// //                   width: "100%",
// //                   height: "100%",
// //                   backgroundColor: "rgba(49, 49, 49, 0.5)",
// //                   backdropFilter: "blur(3px)",
// //                   borderRadius: "8px",
// //                 }}
// //               />

// //               <div
// //                 style={{
// //                   position: "relative",
// //                   zIndex: 1,
// //                   color: "white",
// //                 }}
// //               >
                
// //                 <h1 className="welcome-title text-white">Welcome Back</h1>
// //                 <p className="subtitle text-white">Login to continue</p>

// //                 <div
// //                   className="logo-container"
// //                   style={{
// //                     display: "flex",
// //                     justifyContent: "center",
// //                     marginBottom: "20px",
// //                     marginTop: "100px",
// //                   }}
// //                 >
// //                   <img src={logo} alt="Logo" className="login-logo" />
// //                 </div>
// //                 <p className="description text-center mt-2 mb-5">Buy and Sell your Property in Pondicherry</p>

// //                 {!isOtpSent ? (
// //                   <Form onSubmit={handleSendOtp}>
// //                     <Form.Group className="mb-2" controlId="countryCode">
// //                       <InputGroup className="mb-3">
// //                         <InputGroup.Text className="custom-background">
// //                           <Flag code={selectedCountry} style={{ width: '30px', marginRight: '8px' }} />
// //                         </InputGroup.Text>
// //                         <Form.Select
// //                           value={selectedCountry}
// //                           onChange={handleCountryChange}
// //                           aria-label="Select Country"
// //                           className="custom-background small-input fw-normal"
// //                           style={{ width: 'auto', maxWidth: '120px' }}
// //                         >
// //                           {countryCodes.map((country) => (
// //                             <option className="text-dark" key={country.code} value={country.flag}>
// //                               ({country.country}) {country.code}
// //                             </option>
// //                           ))}
// //                         </Form.Select>
// //                         <Form.Control
// //                           type="text"
// //                           placeholder="Enter Mobile No"
// //                           value={phoneNumber}
// //                           onChange={handlePhoneNumberChange}
// //                           required
// //                           className="custom-background small-input fw-normal"
// //                           style={{ width: 'auto', maxWidth: '140px' }}
// //                         />
// //                       </InputGroup>
// //                     </Form.Group>
// //                     {isPhoneNumberEntered && (
// //                       <ReCAPTCHA
// //                         sitekey={siteKey}
// //                         onChange={handleCaptchaChange}
// //                       />
// //                     )}
// //                     <div className="d-flex justify-content-center mt-3">
// //                     <Button type="button" style={{backgroundColor:"white",border:"1px solid orangered",color:"orangered"}} className="btn-secondary w-50 btn-small mx-2">SKIP</Button>

// //                       <Button type="submit" style={{backgroundColor:"orangered", border:"2px solid orangered"}} className="btn w-50 btn-small mx-2">LOGIN</Button>
// //                     </div>
// //                   </Form>
// //                 ) : (
// //                   <Form onSubmit={handleVerifyOtp}>
// //                     <Form.Group className="mb-3" controlId="otp">
// //                       <Form.Control
// //                         type="text"
// //                         placeholder="Enter OTP"
// //                         value={otp}
// //                         onChange={(e) => setOtp(e.target.value)}
// //                         required
// //                         className="custom-background small-input fw-normal"
// //                       />
// //                     </Form.Group>

// //                     {canResendOtp && (
// //                 <Button  style={{backgroundColor:"white",border:"1px solid orangered",color:"orangered"}} onClick={handleSendOtp} className="w-100 mt-2">
// //                   RESEND OTP
// //                 </Button>
// //               )}

// //               {otpTimer > 0 && !canResendOtp && (
// //                 <p className="text-center mt-2">Resend OTP in {otpTimer} seconds</p>
// //               )}

// //                     <Button type="submit" style={{backgroundColor:"orangered", border:"2px solid orangered"}} className="btn-small w-50 mt-5">VERIFY OTP</Button>
// //                   </Form>
// //                 )}

// //                 <p  className="footer-text">
// //                   Edit or Add Your Property <span style={{color:"rgb(22, 198, 22)"}} className="highlight  fw-bold ms-2">Pondy Property</span>

// //                   <div style={{ marginLeft: "30%",  borderBottom: "2px solid orangered", width: "40%",  marginTop: "15px" }}></div>
// //                 </p>

// //                 <ToastContainer />
// //               </div>
// //             </div>
// //           </div>
// //         </Col>
// //       </Row>

// //     </Container>
// //   );
// // };

// // export default Login;








// // ---------------------------------code---------------------------------



// // -----------------------------------



// // import React, { useState, useEffect } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import { Container, Row, Col, Form, Button, Modal,InputGroup } from 'react-bootstrap';
// // import { FaRobot } from 'react-icons/fa';
// // import { toast, ToastContainer } from 'react-toastify';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { setPhoneNumber, setIsVerified } from '../red/userSlice';
// // import { Helmet } from 'react-helmet';
// // import ReCAPTCHA from 'react-google-recaptcha';
// // import './Login.css';
// // import Flag from 'react-world-flags'; // Importing the flag component


// // const Login = () => {
// //   const [phoneNumber, setPhoneNumberState] = useState('');
// //   const [otp, setOtp] = useState('');
// //   const [isOtpSent, setIsOtpSent] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [captchaValue, setCaptchaValue] = useState(null);
// //   const [otpTimer, setOtpTimer] = useState(30); // Timer for OTP resend
// //   const [canResendOtp, setCanResendOtp] = useState(false); // Control OTP resend
// //   const [showModal, setShowModal] = useState(false); // Modal to show OTP success
// //   const [countryCode, setCountryCode] = useState('+91'); // Default country code
// //   const [selectedCountry, setSelectedCountry] = useState('IN'); // Default flag (India)

// //   const dispatch = useDispatch();

// //   // On component mount, load the phone number from localStorage if it exists
// //   useEffect(() => {
// //     const storedPhoneNumber = localStorage.getItem('userPhoneNumber');
// //     if (storedPhoneNumber) {
// //       setPhoneNumberState(storedPhoneNumber);
// //       dispatch(setPhoneNumber(storedPhoneNumber));
// //     }
// //   }, [dispatch]);

// //   // Timer countdown effect
// //   useEffect(() => {
// //     let timer;
// //     if (isOtpSent && otpTimer > 0) {
// //       timer = setInterval(() => {
// //         setOtpTimer((prevTime) => {
// //           if (prevTime <= 1) {
// //             clearInterval(timer);
// //             setCanResendOtp(true);
// //           }
// //           return prevTime - 1;
// //         });
// //       }, 1000);
// //     } else if (otpTimer === 0) {
// //       setCanResendOtp(true);
// //     }

// //     return () => clearInterval(timer);
// //   }, [isOtpSent, otpTimer]);

// //   // const handleCountryCodeChange = (e) => {
// //   //   setCountryCode(e.target.value);
// //   // };

// //   const handlePhoneNumberChange = (e) => {
// //     const phone = e.target.value;
// //     setPhoneNumberState(phone);
// //     dispatch(setPhoneNumber(phone));
// //     localStorage.setItem('userPhoneNumber', phone); // Store in localStorage
// //   };

// //   const handleCountryChange = (e) => {
// //     const selected = e.target.value;
// //     const country = countryCodes.find(c => c.flag === selected);
// //     setCountryCode(country.code);
// //     setSelectedCountry(selected);
// //   };

// //   const handleCaptchaChange = (value) => {
// //     setCaptchaValue(value);
// //   };

// //   const handleSendOtp = async (e) => {
// //     e.preventDefault();

// //     if (!phoneNumber || !captchaValue) {
// //       setError('Please complete the CAPTCHA and provide a valid phone number.');
// //       toast.error("Please complete the CAPTCHA!");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       setError('');

// //       // Send OTP with captcha response
// //       const response = await fetch('http://localhost:5000/PPC/user/register', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           phone: countryCode + phoneNumber,
// //           captchaResponse: captchaValue,
// //         }),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         setIsOtpSent(true);
// //         setOtpTimer(30); // Reset timer to 30 seconds
// //         setCanResendOtp(false); // Disable resend button initially
// //         toast.success('OTP sent to ' + countryCode + phoneNumber);
// //       } else {
// //         setError(data.message || 'Failed to send OTP.');
// //         toast.error('Failed to send OTP');
// //       }
// //     } catch (err) {
// //       setError('Something went wrong. Please try again.');
// //       toast.error('Something went wrong');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleVerifyOtp = async (e) => {
// //     e.preventDefault();
// //     if (!otp || !captchaValue) {
// //       setError("Please complete the CAPTCHA and enter the OTP.");
// //       toast.error("Please complete the CAPTCHA and enter OTP!");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       setError('');

// //       // Mock API call to verify OTP
// //       const response = await fetch('http://localhost:5000/PPC/user/verify-otp', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           phone: countryCode + phoneNumber,
// //           otp: otp,
// //           captchaResponse: captchaValue,
// //         }),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         dispatch(setIsVerified(true));
// //         setShowModal(true); // Show success modal
// //         toast.success('OTP verified successfully!');
// //         resetFields(); // Reset form fields after successful login
// //       } else {
// //         setError(data.message || 'OTP verification failed.');
// //         toast.error('OTP verification failed. Please try again.');
// //       }
// //     } catch (err) {
// //       setError('Something went wrong. Please try again.');
// //       toast.error('Something went wrong. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };



// // const countryCodes = [
// //   { code: '+1', country: 'USA', flag: 'US' },
// //   { code: '+44', country: 'UK', flag: 'GB' },
// //   { code: '+91', country: 'India', flag: 'IN' },
// //   { code: '+61', country: 'Australia', flag: 'AU' },
// //   { code: '+81', country: 'Japan', flag: 'JP' },
// //   { code: '+49', country: 'Germany', flag: 'DE' },
// //   { code: '+33', country: 'France', flag: 'FR' },
// //   { code: '+34', country: 'Spain', flag: 'ES' },
// //   { code: '+55', country: 'Brazil', flag: 'BR' },
// //   { code: '+52', country: 'Mexico', flag: 'MX' },
// //   { code: '+86', country: 'China', flag: 'CN' },
// //   { code: '+39', country: 'Italy', flag: 'IT' },
// //   { code: '+7', country: 'Russia', flag: 'RU' },
// //   { code: '+64', country: 'New Zealand', flag: 'NZ' },
// //   { code: '+27', country: 'South Africa', flag: 'ZA' },
// //   { code: '+31', country: 'Netherlands', flag: 'NL' },
// //   { code: '+46', country: 'Sweden', flag: 'SE' },
// //   { code: '+47', country: 'Norway', flag: 'NO' },
// //   { code: '+48', country: 'Poland', flag: 'PL' },
// //   { code: '+60', country: 'Malaysia', flag: 'MY' },
// //   { code: '+62', country: 'Indonesia', flag: 'ID' },
// //   { code: '+63', country: 'Philippines', flag: 'PH' },
// //   { code: '+66', country: 'Thailand', flag: 'TH' },
// //   { code: '+92', country: 'Pakistan', flag: 'PK' },
// //   { code: '+94', country: 'Sri Lanka', flag: 'LK' },
// //   { code: '+972', country: 'Israel', flag: 'IL' },
// //   { code: '+971', country: 'UAE', flag: 'AE' },
// //   { code: '+880', country: 'Bangladesh', flag: 'BD' },
// //   { code: '+234', country: 'Nigeria', flag: 'NG' },
// //   { code: '+254', country: 'Kenya', flag: 'KE' },
// //   { code: '+503', country: 'El Salvador', flag: 'SV' },
// //   { code: '+504', country: 'Honduras', flag: 'HN' },
// //   { code: '+505', country: 'Nicaragua', flag: 'NI' },
// //   { code: '+506', country: 'Costa Rica', flag: 'CR' },
// //   { code: '+507', country: 'Panama', flag: 'PA' },
// //   { code: '+512', country: 'Peru', flag: 'PE' },
// //   { code: '+593', country: 'Ecuador', flag: 'EC' },
// //   { code: '+595', country: 'Paraguay', flag: 'PY' },
// //   { code: '+597', country: 'Suriname', flag: 'SR' },
// //   { code: '+598', country: 'Uruguay', flag: 'UY' },
// //   { code: '+1-246', country: 'Barbados', flag: 'BB' },
// //   { code: '+1-268', country: 'Antigua and Barbuda', flag: 'AG' },
// //   { code: '+1-345', country: 'Cayman Islands', flag: 'KY' },
// //   { code: '+1-441', country: 'Bermuda', flag: 'BM' },
// //   { code: '+1-473', country: 'Grenada', flag: 'GD' },
// //   { code: '+1-649', country: 'Turks and Caicos Islands', flag: 'TC' },
// //   { code: '+1-664', country: 'Montserrat', flag: 'MS' },
// //   { code: '+1-721', country: 'Sint Maarten', flag: 'SX' },
// //   { code: '+1-758', country: 'Saint Lucia', flag: 'LC' },
// //   { code: '+1-784', country: 'Saint Vincent and the Grenadines', flag: 'VC' },
// //   { code: '+1-787', country: 'Puerto Rico', flag: 'PR' },
// //   { code: '+1-939', country: 'Puerto Rico (alternate)', flag: 'PR' },
// //   { code: '+44-20', country: 'London (UK)', flag: 'GB' },
// //   { code: '+44-121', country: 'Birmingham (UK)', flag: 'GB' },
// //   { code: '+44-161', country: 'Manchester (UK)', flag: 'GB' },
// //   { code: '+44-113', country: 'Leeds (UK)', flag: 'GB' },
// // ];



// //   const resetFields = () => {
// //     setPhoneNumberState('');
// //     setOtp('');
// //     setIsOtpSent(false);
// //     setOtpTimer(30);
// //     setCanResendOtp(false);
// //   };

// //   const handleModalClose = () => setShowModal(false);
// //   const handleAddProperty = () => {
// //     alert('Redirecting to Add Property page...');
// //     setShowModal(false);
// //   };

// //   const siteKey = "6LdOMKEqAAAAAOBUloLhEN3sUAyIZxRtzhLSwn1F"; // Your reCAPTCHA site key

// //   return (
// // <Container fluid className="p-0 login">
// //   <Helmet>
// //     <title>Pondy Property | Login</title>
// //   </Helmet>
// //   <Row className="g-0">
// //     <Col lg={12} className="d-flex  pb-5 align-items-center justify-content-center">
// //       <div
// //         className="d-flex  justify-content-center align-items-center">
// //         <div
// //           // style={{
// //           //   width: "100%",
// //           //   maxWidth: "450px",
// //           //   // background: "white",
// //           //   padding: "2rem",
// //           //   borderRadius: "8px",
// //           //   margin: "0 20px", 
// //           // }}

// //           style={{
// //             width: "100%",
// //             maxWidth: "450px", // Fixed width for the form
// //             backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYq7yvaKi8R-tafIcVUcN1882yls6Ht0-gxg&s')", // Set your background image here
// //             backgroundSize: "cover",
// //             backgroundPosition: "center",
// //             padding: "2rem",
// //             borderRadius: "8px",
// //             margin: "0 20px", // Margin to ensure space on small screens
// //             backgroundRepeat: "no-repeat",
// //           }}
// //         >
// //           {/* <h3 className="text-start mb-4" style={{ color: "#45a29e", fontWeight: "bold" }}>
// //             Login
// //           </h3> */}
// //              <h1 className="welcome-title">Welcome Back</h1>
// //           <p className="subtitle">Login to continue</p>
// //           <div className="logo-container">
// //             <img src="key-icon.png" alt="Logo" className="login-logo" />
// //           </div>
// //           <p className="description">Buy and Sell your Property in Pondicherry</p>
// //           <Form></Form>
// //           {error && <div className="alert alert-danger">{error}</div>}

// //           {!isOtpSent ? (
// //             <Form onSubmit={handleSendOtp}>
// //               <Form.Group className="mb-3" controlId="countryCode">
// //                 <Form.Control as="select" value={countryCode} onChange={handleCountryChange}     className="custom-background text-dark" >
// //                 {countryCodes.map((item) => (
// //                 <option key={item.code} value={item.code}>
// //                   <Flag code={item.flag} style={{ width: '20px', marginRight: '8px' }} />
// //                   {item.code} ({item.country})
// //                 </option>
// //               ))}

// //                 </Form.Control>
// //               </Form.Group>

// //               <Form.Group className="mb-3 " controlId="phone">
// //                 <Form.Control
// //                   type="text"
// //                   value={phoneNumber}
// //                   onChange={handlePhoneNumberChange}
// //                   placeholder="Enter Mobile No."
// //                   required
// //                   className="custom-background"

// //                 />
// //               </Form.Group>

// //               <Form.Group controlId="captcha">
// //                 <ReCAPTCHA sitekey={siteKey} onChange={handleCaptchaChange} />
// //               </Form.Group>

// //               <Button
// //                 variant="danger"
// //                 type="submit"
// //                 style={{ background: "#45a29e", border: "none" }}
// //                 className="w-100 mt-3 mb-3"
// //                 disabled={loading}
// //               >
// //                 {loading ? "Sending..." : "Send OTP"}
// //               </Button>
// //             </Form> 

// //           ) : (
// //             <Form onSubmit={handleVerifyOtp}>
// //               <Form.Group className="mb-3" controlId="otp">
// //                 <Form.Control
// //                   type="text"
// //                   value={otp}
// //                   onChange={(e) => setOtp(e.target.value)}
// //                   placeholder="Enter OTP"
// //                   required
// //                   className='custom-background'
// //                 />
// //               </Form.Group>
// //               <Button
// //                 variant="success"
// //                 type="submit"
// //                 className="w-100 mt-3"
// //                 style={{ background: "#45a29e", border: "none" }}
// //                 disabled={loading}
// //               >
// //                 {loading ? "Verifying..." : "Verify OTP"}
// //               </Button>

//               // {canResendOtp && (
//               //   <Button variant="link" onClick={handleSendOtp} className="w-100 mt-2">
//               //     Resend OTP
//               //   </Button>
//               // )}

//               // {otpTimer > 0 && !canResendOtp && (
//               //   <p className="text-center mt-2">Resend OTP in {otpTimer} seconds</p>
//               // )}
// //             </Form>
// //           )}

// //           {/* Reset Button */}
// //           <Button variant="secondary" onClick={resetFields} className="w-100 mt-3 mb-3">
// //             Reset
// //           </Button>
// //         </div>
// //       </div>
// //     </Col>
// //   </Row>

//   // {/* Modal for OTP verification */}
//   // <Modal show={showModal} onHide={handleModalClose}>
//   //   <Modal.Header closeButton>
//   //     <Modal.Title>OTP Verified Successfully</Modal.Title>
//   //   </Modal.Header>
//   //   <Modal.Body>
//   //     <p>Your mobile number has been verified successfully.</p>
//   //     <p>Would you like to add a property now?</p>
//   //   </Modal.Body>
//   //   <Modal.Footer>
//   //     <Button variant="secondary" onClick={handleModalClose}>
//   //       View Property
//   //     </Button>
//   //     <Button variant="primary" onClick={handleAddProperty}>
//   //       Add Property
//   //     </Button>
//   //   </Modal.Footer>
//   // </Modal>

// //   <ToastContainer />
// // </Container>

    
// //   );
// // };

// // export default Login;




// // ----------------------------------------






// // import React, { useState, useEffect } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import { Container, Row, Col, Form, Button, Modal, InputGroup } from 'react-bootstrap';
// // import { FaRobot } from 'react-icons/fa';
// // import { toast, ToastContainer } from 'react-toastify';
// // import { useDispatch } from 'react-redux';
// // import { setPhoneNumber, setIsVerified } from '../red/userSlice';
// // import { Helmet } from 'react-helmet';
// // import ReCAPTCHA from 'react-google-recaptcha';
// // import './Login.css';
// // import Flag from 'react-world-flags'; // Importing the flag component

// // const Login = () => {
// //   const [phoneNumber, setPhoneNumberState] = useState('');
// //   const [otp, setOtp] = useState('');
// //   const [isOtpSent, setIsOtpSent] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [captchaValue, setCaptchaValue] = useState(null);
// //   const [otpTimer, setOtpTimer] = useState(30);
// //   const [canResendOtp, setCanResendOtp] = useState(false);
// //   const [showModal, setShowModal] = useState(false);
// //   const [countryCode, setCountryCode] = useState('+91'); // Default country code
// //   const [selectedCountry, setSelectedCountry] = useState('IN'); // Default flag (India)

// //   const dispatch = useDispatch();

// //   // Country codes data
// //   const countryCodes = [
// //     { code: '+1', country: 'USA', flag: 'US' },
// //     { code: '+44', country: 'UK', flag: 'GB' },
// //     { code: '+91', country: 'India', flag: 'IN' },
// //     { code: '+61', country: 'Australia', flag: 'AU' },
// //     { code: '+81', country: 'Japan', flag: 'JP' },
// //     // Add more countries as needed
// //   ];

// //   useEffect(() => {
// //     const storedPhoneNumber = localStorage.getItem('userPhoneNumber');
// //     if (storedPhoneNumber) {
// //       setPhoneNumberState(storedPhoneNumber);
// //       dispatch(setPhoneNumber(storedPhoneNumber));
// //     }
// //   }, [dispatch]);

// //   useEffect(() => {
// //     let timer;
// //     if (isOtpSent && otpTimer > 0) {
// //       timer = setInterval(() => {
// //         setOtpTimer((prevTime) => {
// //           if (prevTime <= 1) {
// //             clearInterval(timer);
// //             setCanResendOtp(true);
// //           }
// //           return prevTime - 1;
// //         });
// //       }, 1000);
// //     } else if (otpTimer === 0) {
// //       setCanResendOtp(true);
// //     }

// //     return () => clearInterval(timer);
// //   }, [isOtpSent, otpTimer]);

// //   const handleCountryChange = (e) => {
// //     const selected = e.target.value;
// //     const country = countryCodes.find(c => c.flag === selected);
// //     setCountryCode(country.code);
// //     setSelectedCountry(selected);
// //   };

// //   const handlePhoneNumberChange = (e) => {
// //     const phone = e.target.value;
// //     setPhoneNumberState(phone);
// //     dispatch(setPhoneNumber(phone));
// //     localStorage.setItem('userPhoneNumber', phone);
// //   };

// //   const handleCaptchaChange = (value) => {
// //     setCaptchaValue(value);
// //   };

// //   const handleSendOtp = async (e) => {
// //     e.preventDefault();

// //     if (!phoneNumber || !captchaValue) {
// //       setError('Please complete the CAPTCHA and provide a valid phone number.');
// //       toast.error("Please complete the CAPTCHA!");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       setError('');

// //       const response = await fetch('http://localhost:5000/PPC/user/register', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           phone: countryCode + phoneNumber,
// //           captchaResponse: captchaValue,
// //         }),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         setIsOtpSent(true);
// //         setOtpTimer(30);
// //         setCanResendOtp(false);
// //         toast.success('OTP sent to ' + countryCode + phoneNumber);
// //       } else {
// //         setError(data.message || 'Failed to send OTP.');
// //         toast.error('Failed to send OTP');
// //       }
// //     } catch (err) {
// //       setError('Something went wrong. Please try again.');
// //       toast.error('Something went wrong');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleVerifyOtp = async (e) => {
// //     e.preventDefault();
// //     if (!otp || !captchaValue) {
// //       setError("Please complete the CAPTCHA and enter the OTP.");
// //       toast.error("Please complete the CAPTCHA and enter OTP!");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       setError('');

// //       const response = await fetch('http://localhost:5000/PPC/user/verify-otp', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           phone: countryCode + phoneNumber,
// //           otp: otp,
// //           captchaResponse: captchaValue,
// //         }),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         dispatch(setIsVerified(true));
// //         setShowModal(true);
// //         toast.success('OTP verified successfully!');
// //         resetFields();
// //       } else {
// //         setError(data.message || 'OTP verification failed.');
// //         toast.error('OTP verification failed. Please try again.');
// //       }
// //     } catch (err) {
// //       setError('Something went wrong. Please try again.');
// //       toast.error('Something went wrong. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const resetFields = () => {
// //     setPhoneNumberState('');
// //     setOtp('');
// //     setIsOtpSent(false);
// //     setOtpTimer(30);
// //     setCanResendOtp(false);
// //   };

// //   const handleModalClose = () => setShowModal(false);
// //   const handleAddProperty = () => {
// //     alert('Redirecting to Add Property page...');
// //     setShowModal(false);
// //   };

// //   const siteKey = "6LdOMKEqAAAAAOBUloLhEN3sUAyIZxRtzhLSwn1F";

// //   return (
// //     <Container fluid className="p-0 login">
// //       <Helmet>
// //         <title>Pondy Property | Login</title>
// //       </Helmet>
// //       <Row className="g-0">
// //         <Col lg={12} className="d-flex pb-5 align-items-center justify-content-center">
// //           <div className="d-flex back justify-content-center align-items-center">
// //             {/* <h3 className="text-start mb-4" style={{ color: "#45a29e", fontWeight: "bold" }}>Login</h3> */}
// //             {error && <div className="alert alert-danger">{error}</div>}

// //             {!isOtpSent ? (
// //               <Form onSubmit={handleSendOtp}>
// //                 <Form.Group className="mb-3" style={{width:"75%"}} controlId="countryCode">
// //                   <InputGroup className="input-group-sm"> {/* Reduced size of Input Group */}
// //                     <InputGroup.Text className='custom-background'>
// //                       <Flag code={selectedCountry} style={{ width: '20px', marginRight: '8px' }} />
// //                     </InputGroup.Text>
// //                     <Form.Select
// //                       value={selectedCountry}
// //                       onChange={handleCountryChange}
// //                       aria-label="Select Country"
// //                       className='custom-background'
// //                     >
// //                       {countryCodes.map((country) => (
// //                         <option key={country.code} value={country.flag}>
// //                           {country.country} ({country.code})
// //                         </option>
// //                       ))}
// //                     </Form.Select>
// //                     <Form.Control
// //                       type="text"
// //                       placeholder="Enter phone number"
// //                       value={phoneNumber}
// //                       onChange={handlePhoneNumberChange}
// //                       required
// //                       className=" custom-background"
// //                     />
// //                   </InputGroup>
// //                 </Form.Group>
// //                 <div className="d-flex ">
// //                   <ReCAPTCHA
// //                     sitekey={siteKey}
// //                     onChange={handleCaptchaChange}
// //                   />
// //                   <Button type="submit" className="btn-primary">Send OTP</Button>
// //                   <Button type='submit' className='btn-grey'>Reset</Button>
// //                 </div>
// //               </Form>
// //             ) : (
// //               <Form onSubmit={handleVerifyOtp}>
// //                 <Form.Group className="mb-3" controlId="otp">
// //                   <Form.Control
// //                     type="text"
// //                     placeholder="Enter OTP"
// //                     value={otp}
// //                     onChange={(e) => setOtp(e.target.value)}
// //                     required
// //                     className="input-sm" 
// //                   />
// //                 </Form.Group>
               
// //                   <Button type="submit" className="btn-primary">Verify OTP</Button>
                
// //               </Form>
// //             )}

// //             <ToastContainer />
// //           </div>
// //         </Col>
// //       </Row>

// //       {/* Modal for OTP Success */}
// //       <Modal show={showModal} onHide={handleModalClose}>
// //         <Modal.Header closeButton>
// //           <Modal.Title>OTP Verified</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           <p>Your phone number is successfully verified!</p>
// //           <Button onClick={handleAddProperty}>Proceed to Add Property</Button>
// //         </Modal.Body>
// //       </Modal>
// //     </Container>
// //   );
// // };

// // export default Login;




// // import React, { useState } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
// // import Flag from 'react-world-flags';
// // import './Login.css';

// // const Login = () => {
// //   const [phoneNumber, setPhoneNumber] = useState('');
// //   const [countryCode, setCountryCode] = useState('+91');
// //   const [selectedCountry, setSelectedCountry] = useState('IN');

// //   const countryCodes = [
// //     { code: '+91', country: 'India', flag: 'IN' },
// //     { code: '+1', country: 'USA', flag: 'US' },
// //     { code: '+44', country: 'UK', flag: 'GB' },
// //   ];

// //   const handleCountryChange = (e) => {
// //     const selected = e.target.value;
// //     const country = countryCodes.find(c => c.flag === selected);
// //     setCountryCode(country.code);
// //     setSelectedCountry(selected);
// //   };

// //   const handlePhoneNumberChange = (e) => {
// //     setPhoneNumber(e.target.value);
// //   };

// //   return (
// //     <Container fluid className="login-container">
// //       <Row className="align-items-center justify-content-center min-vh-100">
// //         <Col xs={10} sm={8} md={6} lg={4} className="login-box text-center">
//           // <h1 className="welcome-title">Welcome Back</h1>
//           // <p className="subtitle">Login to continue</p>
//           // <div className="logo-container">
//           //   <img src="key-icon.png" alt="Logo" className="login-logo" />
//           // </div>
//           // <p className="description">Buy and Sell your Property in Pondicherry</p>
//           // <Form>
// //             <InputGroup className="mb-3">
// //               <InputGroup.Text>
// //                 <Flag code={selectedCountry} style={{ width: '20px', marginRight: '8px' }} />
// //                 {countryCode}
// //               </InputGroup.Text>
// //               <Form.Control
// //                 type="text"
// //                 placeholder="Enter Mobile No"
// //                 value={phoneNumber}
// //                 onChange={handlePhoneNumberChange}
// //                 className="custom-input"
// //               />
// //             </InputGroup>
// //             <div className="button-group">
// //               <Button variant="outline-danger" className="me-2">
// //                 Skip
// //               </Button>
// //               <Button variant="primary">Login</Button>
// //             </div>
// //           </Form>
//           // <p className="footer-text">
//           //   Edit or Add Your Property <a href="#" className="highlight">Pondy Property</a>
//           // </p>
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // };

// // export default Login;








// // import React, { useState, useEffect } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
// // import { FaRobot } from 'react-icons/fa';
// // import { toast, ToastContainer } from 'react-toastify';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { setPhoneNumber, setIsVerified } from '../red/userSlice';
// // import { Helmet } from 'react-helmet';
// // import ReCAPTCHA from 'react-google-recaptcha';

// // const Login = () => {
// //   const [phoneNumber, setPhoneNumberState] = useState('');
// //   const [otp, setOtp] = useState('');
// //   const [isOtpSent, setIsOtpSent] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [captchaValue, setCaptchaValue] = useState(null); // Store the reCAPTCHA response token
// //   const [isHuman, setIsHuman] = useState(false);
// //   const [showModal, setShowModal] = useState(false);

// //   const dispatch = useDispatch();

// //   // On component mount, load the phone number from localStorage if it exists
// //   useEffect(() => {
// //     const storedPhoneNumber = localStorage.getItem('userPhoneNumber');
// //     if (storedPhoneNumber) {
// //       setPhoneNumberState(storedPhoneNumber);
// //       dispatch(setPhoneNumber(storedPhoneNumber));
// //     }
// //   }, [dispatch]);

// //   // Handle phone number input
// //   const handlePhoneNumberChange = (e) => {
// //     const phone = e.target.value;
// //     setPhoneNumberState(phone);
// //     dispatch(setPhoneNumber(phone));
// //     localStorage.setItem('userPhoneNumber', phone); // Store in localStorage
// //   };

// //   // Handle captcha value change
// //   const handleCaptchaChange = (value) => {
// //     setCaptchaValue(value);
// //   };


// //   const handleSendOtp = async (e) => {
// //     e.preventDefault();
  
// //     if (!phoneNumber || !captchaValue) {
// //       setError('Please complete the CAPTCHA and provide a valid phone number.');
// //       toast.error("Please complete the CAPTCHA!");
// //       return;
// //     }
  
// //     try {
// //       setLoading(true);
// //       setError('');
  
// //       // Send OTP with captcha response
// //       const response = await fetch('http://localhost:5000/PPC/user/register', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           phone: phoneNumber,
// //           captchaResponse: captchaValue, // Sending the CAPTCHA response
// //         }),
// //       });
  
// //       const data = await response.json();
  
// //       if (response.ok) {
// //         setIsOtpSent(true);
// //         toast.success('OTP sent to ' + phoneNumber);
// //       } else {
// //         setError(data.message || 'Failed to send OTP.');
// //         toast.error('Failed to send OTP');
// //       }
// //     } catch (err) {
// //       setError('Something went wrong. Please try again.');
// //       toast.error('Something went wrong');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
  


// //   // Handle OTP verification
// //   const handleVerifyOtp = async (e) => {
// //     e.preventDefault();
// //     if (!otp || !captchaValue) {
// //       setError("Please complete the CAPTCHA and enter the OTP.");
// //       toast.error("Please complete the CAPTCHA and enter OTP!");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       setError('');

// //       // Mock API call to verify OTP
// //       const response = await fetch('http://localhost:5000/PPC/user/verify-otp', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ phone: phoneNumber, otp: otp, captchaResponse: captchaValue }),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         dispatch(setIsVerified(true));
// //         setShowModal(true); // Show success modal
// //         toast.success('OTP verified successfully!');
// //       } else {
// //         setError(data.message || 'OTP verification failed.');
// //         toast.error('OTP verification failed. Please try again.');
// //       }
// //     } catch (err) {
// //       setError('Something went wrong. Please try again.');
// //       toast.error('Something went wrong. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleModalClose = () => setShowModal(false);
// //   const handleAddProperty = () => {
// //     alert('Redirecting to Add Property page...');
// //     setShowModal(false);
// //   };

// //   const siteKey = "6LdOMKEqAAAAAOBUloLhEN3sUAyIZxRtzhLSwn1F"; // Your reCAPTCHA site key

// //   return (
//     // <Container fluid className="p-0">
//     //   <Helmet>
//     //     <title>Pondy Property | Login</title>
//     //   </Helmet>
//     //   <Row className="g-0">
//     //     <Col lg={8} className="d-flex pb-5 align-items-center justify-content-center">
//     //       <div className="shadow p-4 rounded w-100 bg-white" style={{ maxWidth: '400px', border: '1px solid grey' }}>
//     //         <h3 className="text-start mb-4" style={{ color: '#45a29e', fontWeight: 'bold' }}>Login</h3>
//     //         {error && <div className="alert alert-danger">{error}</div>}

// //             {!isOtpSent ? (
// //               <Form onSubmit={handleSendOtp}>
// //                 <Form.Group className="mb-3" controlId="phone">
// //                   <Form.Control
// //                     type="text"
// //                     value={phoneNumber}
// //                     onChange={handlePhoneNumberChange}
// //                     placeholder="Enter Mobile No."
// //                     required
// //                   />
// //                 </Form.Group>

// //                 <Form.Group controlId="captcha">
// //                   <ReCAPTCHA
// //                     sitekey={siteKey}
// //                     onChange={handleCaptchaChange}
// //                   />
// //                 </Form.Group>

// //                 <Button variant="danger" type="submit" style={{ background: '#45a29e', border: 'none' }} className="w-100 mt-3 mb-3" disabled={loading}>
// //                   {loading ? 'Sending...' : 'Send OTP'}
// //                 </Button>
// //               </Form>
// //             ) : (
// //               <Form onSubmit={handleVerifyOtp}>
// //                 <Form.Group className="mb-3" controlId="otp">
// //                   <Form.Control
// //                     type="text"
// //                     value={otp}
// //                     onChange={(e) => setOtp(e.target.value)}
// //                     placeholder="Enter OTP"
// //                     required
// //                   />
// //                 </Form.Group>
// //                 <Button variant="success" type="submit" className="w-100 mt-3" style={{ background: '#45a29e', border: 'none' }} disabled={loading}>
// //                   {loading ? 'Verifying...' : 'Verify OTP'}
// //                 </Button>
// //               </Form>
// //             )}
// //           </div>
// //         </Col>
// //       </Row>

// //       <Modal show={showModal} onHide={handleModalClose}>
// //         <Modal.Header closeButton>
// //           <Modal.Title>OTP Verified Successfully</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           <p>Your mobile number has been verified successfully.</p>
// //           <p>Would you like to add a property now?</p>
// //         </Modal.Body>
// //         <Modal.Footer>
// //           <Button variant="secondary" onClick={handleModalClose}>View Property</Button>
// //           <Button variant="primary" onClick={handleAddProperty}>Add Property</Button>
// //         </Modal.Footer>
// //       </Modal>

// //       <ToastContainer />
// //     </Container>
// //   );
// // };

// // export default Login;














// // ----------------------------------


// // import React, { useState, useEffect } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
// // import { FaRobot } from 'react-icons/fa';
// // import { toast, ToastContainer } from 'react-toastify';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { setPhoneNumber, setIsVerified } from '../red/userSlice';
// // import { Helmet } from 'react-helmet';

// // const Login = () => {
// //   const [phoneNumber, setPhoneNumberState] = useState('');
// //   const [otp, setOtp] = useState('');
// //   const [isOtpSent, setIsOtpSent] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [isHuman, setIsHuman] = useState(false);
// //   const [showModal, setShowModal] = useState(false);

// //   const dispatch = useDispatch();

// //   // On component mount, load the phone number from localStorage if it exists
// //   useEffect(() => {
// //     const storedPhoneNumber = localStorage.getItem('userPhoneNumber');
// //     if (storedPhoneNumber) {
// //       setPhoneNumberState(storedPhoneNumber);
// //       dispatch(setPhoneNumber(storedPhoneNumber));
// //     }
// //   }, [dispatch]);

// //   const handlePhoneNumberChange = (e) => {
// //     const phone = e.target.value;
// //     setPhoneNumberState(phone);
// //     dispatch(setPhoneNumber(phone));
// //     localStorage.setItem('userPhoneNumber', phone); // Store in localStorage
// //   };

// //   const handleSendOtp = async (e) => {
// //     e.preventDefault();
// //     if (!phoneNumber || !isHuman) {
// //       setError("Please enter a valid phone number and confirm you're not a robot.");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       setError('');

// //       // Mock API call to send OTP
// //       const response = await fetch('http://localhost:5000/PPC/user/register', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ phone: phoneNumber }),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         setIsOtpSent(true);
// //         toast.success('OTP sent to ' + phoneNumber);
// //       } else {
// //         setError(data.message || 'Failed to send OTP.');
// //       }
// //     } catch (err) {
// //       setError('Something went wrong. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleVerifyOtp = async (e) => {
// //     e.preventDefault();
// //     if (!otp) {
// //       setError('Please enter the OTP.');
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       setError('');

// //       // Mock API call to verify OTP
// //       const response = await fetch('http://localhost:5000/PPC/user/verify-otp', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ phone: phoneNumber, otp: otp }),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         dispatch(setIsVerified(true));
// //         setShowModal(true); // Show success modal
// //         toast.success('OTP verified successfully!');
// //       } else {
// //         setError(data.message || 'OTP verification failed.');
// //         toast.error('OTP verification failed. Please try again.');
// //       }
// //     } catch (err) {
// //       setError('Something went wrong. Please try again.');
// //       toast.error('Something went wrong. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleModalClose = () => setShowModal(false);
// //   const handleAddProperty = () => {
// //     alert('Redirecting to Add Property page...');
// //     setShowModal(false);
// //   };

// //   return (
// //     <Container fluid className="p-0">
// //       <Helmet>
// //         <title>Pondy Property | Login</title>
// //       </Helmet>
// //       <Row className="g-0">
// //         <Col lg={8} className="d-flex pb-5 align-items-center justify-content-center">
// //           <div className="shadow p-4 rounded w-100 bg-white" style={{ maxWidth: '400px', border: '1px solid grey' }}>
// //             <h3 className="text-start mb-4" style={{ color: '#45a29e', fontWeight: 'bold' }}>Login</h3>
// //             {error && <div className="alert alert-danger">{error}</div>}

// //             {!isOtpSent ? (
// //               <Form onSubmit={handleSendOtp}>
// //                 <Form.Group className="mb-3" controlId="phone">
// //                   <Form.Control
// //                     type="text"
// //                     value={phoneNumber}
// //                     onChange={handlePhoneNumberChange}
// //                     placeholder="Enter Mobile No."
// //                     required
// //                   />
// //                 </Form.Group>

// //                 <Form.Group controlId="robotCheck">
// //                   <Form.Check
// //                     type="checkbox"
// //                     label={`I'm not a robot`}
// //                     checked={isHuman}
// //                     onChange={() => setIsHuman(!isHuman)}
// //                   />
// //                 </Form.Group>

// //                 <Button variant="danger" type="submit" style={{ background: '#45a29e', border: 'none' }} className="w-100 mt-3 mb-3" disabled={loading}>
// //                   {loading ? 'Sending...' : 'Send OTP'}
// //                 </Button>
// //               </Form>
// //             ) : (
// //               <Form onSubmit={handleVerifyOtp}>
// //                 <Form.Group className="mb-3" controlId="otp">
// //                   <Form.Control
// //                     type="text"
// //                     value={otp}
// //                     onChange={(e) => setOtp(e.target.value)}
// //                     placeholder="Enter OTP"
// //                     required
// //                   />
// //                 </Form.Group>
// //                 <Button variant="success" type="submit" className="w-100 mt-3" style={{ background: '#45a29e', border: 'none' }} disabled={loading}>
// //                   {loading ? 'Verifying...' : 'Verify OTP'}
// //                 </Button>
// //               </Form>
// //             )}
// //           </div>
// //         </Col>
// //       </Row>

// //       <Modal show={showModal} onHide={handleModalClose}>
// //         <Modal.Header closeButton>
// //           <Modal.Title>OTP Verified Successfully</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           <p>Your mobile number has been verified successfully.</p>
// //           <p>Would you like to add a property now?</p>
// //         </Modal.Body>
// //         <Modal.Footer>
// //           <Button variant="secondary" onClick={handleModalClose}>View Property</Button>
// //           <Button variant="primary" onClick={handleAddProperty}>Add Property</Button>
// //         </Modal.Footer>
// //       </Modal>

// //       <ToastContainer />
// //     </Container>
// //   );
// // };

// // export default Login;




// // -----------------------------------------------------------





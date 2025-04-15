












// // import axios from 'axios';
// // import React, { useState } from 'react';
// // import { Button, Form, Dropdown, Container, Row, Col } from 'react-bootstrap';
// // // import { MdAddPhotoAlternate, MdKeyboardDoubleArrowDown } from 'react-icons/md';
// // import {  FaDollarSign,  FaFileVideo, FaRegBuilding } from 'react-icons/fa';
// // import '../Components/AddProperty.css';
// // import { useLocation } from 'react-router-dom';
// // import { FaBath,FaCity,FaBuilding, FaBed,FaCar, FaEnvelope,FaCalendarAlt,FaMapSigns, FaChartArea, FaCheckCircle, FaHandshake, FaHome, FaMapMarkerAlt, FaMoneyBill, FaPhoneAlt, FaRulerCombined, FaTools, FaUserAlt } from 'react-icons/fa';
// // import { FaKitchenSet } from "react-icons/fa6";
// // import { BsBuildingsFill } from "react-icons/bs";
// // import { GiHouse, GiGears } from "react-icons/gi";
// // import {  FaClock, FaImage, FaRegAddressCard } from 'react-icons/fa6';
// // import { MdAddPhotoAlternate, MdDescription, MdKeyboardDoubleArrowDown } from 'react-icons/md';
// // import { toast, ToastContainer } from 'react-ify';
// // import 'react-toastify/dist/ReactToastify.css';

// // const AddProps = () => {
// //   const location = useLocation();
// //   const { ppcId, phoneNumber } = location.state || {};
// //   const [currentStep, setCurrentStep] = useState(1);
// //   const [propertyDetails, setPropertyDetails] = useState({
// //     propertyMode: '',
// //     propertyType: '',
// //     price:'',
// //     propertyAge: '',
// //     bankLoan: '',
// //     negotiation: '',
// //     length: '',
// //     breadth: '',
// //     totalArea: '',
// //     ownership: '',
// //     bedrooms: '',
// //     kitchen: '',
// //     kitchenType: '',
// //     balconies: '',
// //     floorNo: '',
// //     areaUnit: '',
// //     propertyApproved: '',
// //     postedBy: '',
// //     facing: '',
// //     salesMode: '',
// //     salesType: '',
// //     description: '',
// //     furnished: '',
// //     lift: '',
// //     attachedBathrooms: '',
// //     western: '',
// //     numberOfFloors: '',
// //     carParking: '',
// //     rentalPropertyAddress: '',
// //   country: '',
// //   state: '',
// //   city: '',
// //   district: '',
// //   area: '',
// //   streetName: '',
// //   doorNumber: '',
// //   nagar: '',
// //   ownerName: '',
// //   email: '',
// //   bestTimeToCall: '',
// //   });
// //   const [photos, setPhotos] = useState([]);
// //   const [video, setVideo] = useState(null);

// //   const propertyTypes = [
// //     // Residential Property Types
// //     'Flat/ Apartment',
// //     'Residential House',
// //     'Villa',
// //     'Builder Floor Apartment',
// //     'Penthouse',
// //     'Studio Apartment',
// //     'Service Apartment',

// //     // Commercial Property Types
// //     'Commercial Office Space',
// //     'Office in IT Park/ SEZ',
// //     'Commercial Shop',
// //     'Commercial Showroom',
// //     'Commercial Land',
// //     'Warehouse/ Godown',
// //     'Industrial Land',
// //     'Industrial Building',
// //     'Industrial Shed',

// //     // Agricultural Property Types
// //     'Agricultural Land',
// //     'Farm House',
// // ];


  
// //   const [isPreview, setIsPreview] = useState(false);

// //   const handlePreview = () => {
// //     setIsPreview(!isPreview);
// //   };


// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setPropertyDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
// //   };

// //   const handlePhotoUpload = (e) => {
// //     const files = Array.from(e.target.files);
// //     const maxSize = 10 * 1024 * 1024; // 10MB file size limit
// //     for (let file of files) {
// //       if (file.size > maxSize) {
// //         alert('File size exceeds the 10MB limit');
// //         return;
// //       }
// //     }
// //     if (photos.length + files.length <= 5) {
// //       setPhotos([...photos, ...files]);
// //     } else {
// //       alert('Maximum 5 photos can be uploaded.');
// //     }
// //   };

// //   const removePhoto = (index) => {
// //     setPhotos(photos.filter((_, i) => i !== index));
// //   };

// //   const handleVideoChange = (e) => {
// //     const file = e.target.files[0];
// //     const maxSize = 50 * 1024 * 1024; // 50MB file size limit
// //     if (file.size > maxSize) {
// //       alert('File size exceeds the 50MB limit');
// //       return;
// //     }
// //     setVideo(file);
// //   };

// //   const removeVideo = () => {
// //     setVideo(null);
// //   };

//   // const handleShowMore =async (e) => {
//   //   e.preventDefault();

//   //   const formData = new FormData();

//   //   if (video) {
//   //     formData.append('video', video);
//   //   }
//   //   photos.forEach((photo) => formData.append('photos', photo));

//   //   formData.append('ppcId', ppcId);
//   //   formData.append('phoneNumber', phoneNumber);
//   //   formData.append('propertyMode', propertyDetails.propertyMode);
//   //   formData.append('price', propertyDetails.price);
//   //   formData.append('propertyAge', propertyDetails.propertyAge);
//   //   formData.append('bankLoan', propertyDetails.bankLoan);
//   //   formData.append('negotiation', propertyDetails.negotiation);
//   //   // Append other fields similarly...

//   //   try {
//   //     const response = await axios.post(`${process.env.REACT_APP_API_URL}/update-property`, formData, {
//   //       headers: {
//   //         'Content-Type': 'multipart/form-data', 
//   //       },
//   //     });

//   //     if (response.status === 200) {
//   //       // alert('Property details updated successfully!');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error updating property details:', error);
//   //     // alert('Failed to update property details. Please try again.');
//   //   }
//   //   setCurrentStep(currentStep + 1);
//   // };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const formData = new FormData();

// //     if (video) {
// //       formData.append('video', video);
// //     }
// //     photos.forEach((photo) => formData.append('photos', photo));

// //     formData.append('ppcId', ppcId);
// //     formData.append('phoneNumber', phoneNumber);
// //     formData.append('propertyMode', propertyDetails.propertyMode);
// //     formData.append('price', propertyDetails.price);
// //     formData.append('propertyAge', propertyDetails.propertyAge);
// //     formData.append('bankLoan', propertyDetails.bankLoan);
// //     formData.append('negotiation', propertyDetails.negotiation);
// //     // Append other fields similarly...

// //     try {
// //       const response = await axios.post(`${process.env.REACT_APP_API_URL}/update-property`, formData, {
// //         headers: {
// //           'Content-Type': 'multipart/form-data', 
// //         },
// //       });

// //       if (response.status === 200) {
// //         toast.success("Your Property Added SuccessFully");
// //       }
// //     } catch (error) {
// //       console.error('Error updating property details:', error);
// //       toast.error('Some Error Occur');
// //     }
// //   };

// //   return (
// //     <Container style={{ fontFamily: '"inter",sans-serif' }}>
// //       <Row className="g-03">
// //         <Col lg={12} className="d-flex align-items-center justify-content-center">
// //           <div
// //             style={{
// //               width: '100%',
// //               maxWidth: '450px',
// //               minWidth: '300px',
// //               padding: '5px',
// //               borderRadius: '8px',
// //               margin: '0 5px',
// //             }}
// //           >
// //                   {!isPreview ? (

// //             <Form onSubmit={handleSubmit}>
// //               <h2 className='text-center m-3'> Add Your Properties </h2>
// //               <p className='p-3' style={{color:"white",backgroundColor:"rgb(47,116,127)"}}>PPC-ID: {ppcId}</p>
// //               {/* <p>PPC-ID: {ppcId}</p> */}
// //               {/* <p>Phone Number: {phoneNumber}</p> */}

// //              <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}> Property Images  </h4>
// //               {/* Upload Photos */}
// //               <div className="form-group photo-upload-container mt-2">
// //                 <input
// //                   type="file"
// //                   multiple
// //                   accept="image/*"
// //                   onChange={handlePhotoUpload}
// //                   name="photos"
// //                   id="photo-upload"
// //                   className="photo-upload-input"
// //                 />
// //                 <label htmlFor="photo-upload" className="photo-upload-label fw-normal m-0">
// //                   <MdAddPhotoAlternate
// //                     style={{
// //                       color: 'white',
// //                       backgroundColor: '#2e86e4',
// //                       padding: '5px',
// //                       fontSize: '30px',
// //                       borderRadius: '50%',
// //                       marginRight: '5px',
// //                     }}
// //                   />
// //                   Upload Your Property Images
// //                 </label>
// //               </div>

// //               {photos.length > 0 && (
// //                 <div className="uploaded-photos">
// //                   <h4>Uploaded Photos</h4>
// //                   <div className="uploaded-photos-grid">
// //                     {photos.map((photo, index) => (
// //                       <div key={index} className="uploaded-photo-item">
// //                         <img
// //                           src={URL.createObjectURL(photo)}
// //                           alt="Uploaded"
// //                           className="uploaded-photo mb-3 "
// //                         />
// //                         <button
// //                           className="remove-photo-btn"
// //                           onClick={() => removePhoto(index)}
// //                         >
// //                           Remove
// //                         </button>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}















// import axios from 'axios';
// import React, { useState } from 'react';
// import { Button, Form, Dropdown, Container, Row, Col } from 'react-bootstrap';
// import {  FaDollarSign,  FaFileVideo, FaRegBuilding } from 'react-icons/fa';
// import '../Components/AddProperty.css';
// import { useLocation } from 'react-router-dom';
// import { FaBath, FaCity, FaBuilding, FaBed, FaCar, FaEnvelope, FaCalendarAlt, FaMapSigns, FaChartArea, FaCheckCircle, FaHandshake, FaHome, FaMapMarkerAlt, FaMoneyBill, FaPhoneAlt, FaRulerCombined, FaTools, FaUserAlt } from 'react-icons/fa';
// import { FaKitchenSet } from 'react-icons/fa6';
// import { BsBuildingsFill } from 'react-icons/bs';
// import { GiHouse, GiGears } from 'react-icons/gi';
// import { FaClock, FaImage, FaRegAddressCard } from 'react-icons/fa6';
// import { MdAddPhotoAlternate, MdDescription, MdKeyboardDoubleArrowDown } from 'react-icons/md';


// const AddProps = () => {
//   const location = useLocation();
//   const { ppcId, phoneNumber } = location.state || {};
//   const [currentStep, setCurrentStep] = useState(1);
//   const [propertyDetails, setPropertyDetails] = useState({
//     propertyMode: '',
//     propertyType: '',
//     price:'',
//     propertyAge: '',
//     bankLoan: '',
//     negotiation: '',
//     length: '',
//     breadth: '',
//     totalArea: '',
//     ownership: '',
//     bedrooms: '',
//     kitchen: '',
//     kitchenType: '',
//     balconies: '',
//     floorNo: '',
//     areaUnit: '',
//     propertyApproved: '',
//     postedBy: '',
//     facing: '',
//     salesMode: '',
//     salesType: '',
//     description: '',
//     furnished: '',
//     lift: '',
//     attachedBathrooms: '',
//     western: '',
//     numberOfFloors: '',
//     carParking: '',
//     rentalPropertyAddress: '',
//     country: '',
//     state: '',
//     city: '',
//     district: '',
//     area: '',
//     streetName: '',
//     doorNumber: '',
//     nagar: '',
//     ownerName: '',
//     email: '',
//     bestTimeToCall: '',
//   });
//   const [photos, setPhotos] = useState([]);
//   const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0); // Track the selected photo
//   const [video, setVideo] = useState(null);

//   const propertyTypes = [
//     'Flat/ Apartment',
//     'Residential House',
//     'Villa',
//     'Builder Floor Apartment',
//     'Penthouse',
//     'Studio Apartment',
//     'Service Apartment',
//     'Commercial Office Space',
//     'Office in IT Park/ SEZ',
//     'Commercial Shop',
//     'Commercial Showroom',
//     'Commercial Land',
//     'Warehouse/ Godown',
//     'Industrial Land',
//     'Industrial Building',
//     'Industrial Shed',
//     'Agricultural Land',
//     'Farm House',
//   ];

//   const [isPreview, setIsPreview] = useState(false);

//   const handlePreview = () => {
//     setIsPreview(!isPreview);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPropertyDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
//   };

  
//   const handleShowMore =async (e) => {
//     e.preventDefault();

//     const formData = new FormData();

//     if (video) {
//       formData.append('video', video);
//     }
//     photos.forEach((photo) => formData.append('photos', photo));

//     formData.append('ppcId', ppcId);
//     formData.append('phoneNumber', phoneNumber);
//     formData.append('propertyMode', propertyDetails.propertyMode);
//     formData.append('propertyType', propertyDetails.propertyType);
//     formData.append('price', propertyDetails.price);
//     formData.append('propertyAge', propertyDetails.propertyAge);
//     formData.append('bankLoan', propertyDetails.bankLoan);
//     formData.append('negotiation', propertyDetails.negotiation);
//     formData.append('length', propertyDetails.length);
//     formData.append('breadth', propertyDetails.breadth);
//     formData.append('totalArea', propertyDetails.totalArea);
//     formData.append('ownership', propertyDetails.ownership);
//     formData.append('bedrooms', propertyDetails.bedrooms);
//     formData.append('kitchen', propertyDetails.kitchen);
//     formData.append('kitchenType', propertyDetails.kitchenType);
//     formData.append('balconies', propertyDetails.balconies);
//     formData.append('floorNo', propertyDetails.floorNo);
//     formData.append('areaUnit', propertyDetails.areaUnit);
//     formData.append('propertyApproved', propertyDetails.propertyApproved);
//     formData.append('postedBy', propertyDetails.postedBy);
//     formData.append('facing', propertyDetails.facing);
//     formData.append('salesMode', propertyDetails.salesMode);
//     formData.append('salesType', propertyDetails.salesType);
//     formData.append('description', propertyDetails.description);
//     formData.append('furnished', propertyDetails.furnished);
//     formData.append('lift', propertyDetails.lift);
//     formData.append('attachedBathrooms', propertyDetails.attachedBathrooms);
//     formData.append('western', propertyDetails.western);
//     formData.append('numberOfFloors', propertyDetails.numberOfFloors);
//     formData.append('carParking', propertyDetails.carParking);
//     formData.append('rentalPropertyAddress', propertyDetails.rentalPropertyAddress);
//     formData.append('country', propertyDetails.country);
//     formData.append('state', propertyDetails.state);
//     formData.append('city', propertyDetails.city);
//     formData.append('district', propertyDetails.district);
//     formData.append('area', propertyDetails.area);
//     formData.append('streetName', propertyDetails.streetName);
//     formData.append('doorNumber', propertyDetails.doorNumber);
//     formData.append('nagar', propertyDetails.nagar);
//     formData.append('ownerName', propertyDetails.ownerName);
//     formData.append('email', propertyDetails.email);
//     formData.append('phoneNumber', propertyDetails.phoneNumber);
//     formData.append('bestTimeToCall', propertyDetails.bestTimeToCall);
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/update-property`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data', 
//         },
//       });

//       if (response.status === 200) {
//         // alert('Property details updated successfully!');
//       }
//     } catch (error) {
//       console.error('Error updating property details:', error);
//       // alert('Failed to update property details. Please try again.');
//     }
//     setCurrentStep(currentStep + 1);
//   };

//   const handlePhotoUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const maxSize = 10 * 1024 * 1024; // 10MB file size limit
//     for (let file of files) {
//       if (file.size > maxSize) {
//         alert('File size exceeds the 10MB limit');
//         return;
//       }
//     }
//     if (photos.length + files.length <= 15) {
//       setPhotos([...photos, ...files]);
//       setSelectedPhotoIndex(0); // Reset to the first uploaded photo
//     } else {
//       alert('Maximum 15 photos can be uploaded.');
//     }
//   };

//   const removePhoto = (index) => {
//     setPhotos(photos.filter((_, i) => i !== index));
//     if (index === selectedPhotoIndex) {
//       setSelectedPhotoIndex(0); // Reset to the first remaining photo
//     }
//   };

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     const maxSize = 50 * 1024 * 1024; // 50MB file size limit
//     if (file.size > maxSize) {
//       alert('File size exceeds the 50MB limit');
//       return;
//     }
//     setVideo(file);
//   };

//   const removeVideo = () => {
//     setVideo(null);
//   };

//   const handlePhotoSelect = (index) => {
//     setSelectedPhotoIndex(index); // Update the selected photo index
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();

//     if (video) {
//       formData.append('video', video);
//     }
    
//     // Ensure the selected photo is added first
//     if (photos.length > 0) {
//       formData.append('photos', photos[selectedPhotoIndex]);
//       photos.forEach((photo, index) => {
//         if (index !== selectedPhotoIndex) {
//           formData.append('photos', photo);
//         }
//       });
//     }

//     formData.append('ppcId', ppcId);
//     formData.append('phoneNumber', phoneNumber);
//     formData.append('propertyMode', propertyDetails.propertyMode);
//     formData.append('propertyType', propertyDetails.propertyType);
//     formData.append('price', propertyDetails.price);
//     formData.append('propertyAge', propertyDetails.propertyAge);
//     formData.append('bankLoan', propertyDetails.bankLoan);
//     formData.append('negotiation', propertyDetails.negotiation);
//     formData.append('length', propertyDetails.length);
//     formData.append('breadth', propertyDetails.breadth);
//     formData.append('totalArea', propertyDetails.totalArea);
//     formData.append('ownership', propertyDetails.ownership);
//     formData.append('bedrooms', propertyDetails.bedrooms);
//     formData.append('kitchen', propertyDetails.kitchen);
//     formData.append('kitchenType', propertyDetails.kitchenType);
//     formData.append('balconies', propertyDetails.balconies);
//     formData.append('floorNo', propertyDetails.floorNo);
//     formData.append('areaUnit', propertyDetails.areaUnit);
//     formData.append('propertyApproved', propertyDetails.propertyApproved);
//     formData.append('postedBy', propertyDetails.postedBy);
//     formData.append('facing', propertyDetails.facing);
//     formData.append('salesMode', propertyDetails.salesMode);
//     formData.append('salesType', propertyDetails.salesType);
//     formData.append('description', propertyDetails.description);
//     formData.append('furnished', propertyDetails.furnished);
//     formData.append('lift', propertyDetails.lift);
//     formData.append('attachedBathrooms', propertyDetails.attachedBathrooms);
//     formData.append('western', propertyDetails.western);
//     formData.append('numberOfFloors', propertyDetails.numberOfFloors);
//     formData.append('carParking', propertyDetails.carParking);
//     formData.append('rentalPropertyAddress', propertyDetails.rentalPropertyAddress);
//     formData.append('country', propertyDetails.country);
//     formData.append('state', propertyDetails.state);
//     formData.append('city', propertyDetails.city);
//     formData.append('district', propertyDetails.district);
//     formData.append('area', propertyDetails.area);
//     formData.append('streetName', propertyDetails.streetName);
//     formData.append('doorNumber', propertyDetails.doorNumber);
//     formData.append('nagar', propertyDetails.nagar);
//     formData.append('ownerName', propertyDetails.ownerName);
//     formData.append('email', propertyDetails.email);
//     formData.append('phoneNumber', propertyDetails.phoneNumber);
//     formData.append('bestTimeToCall', propertyDetails.bestTimeToCall);

//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/update-property`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data', 
//         },
//       });

//       if (response.status === 200) {
//         setMessage("Your Property Added Successfully");
//       }
//     } catch (error) {
//       console.error('Error updating property details:', error);
//       setMessage('Some Error Occurred');
//     }
//   };

//   return (
//     <Container style={{ fontFamily: '"inter",sans-serif' }}>
//       <Row className="g-03">
//         <Col lg={12} className="d-flex align-items-center justify-content-center">
//           <div
//             style={{
//               width: '100%',
//               maxWidth: '450px',
//               minWidth: '300px',
//               padding: '5px',
//               borderRadius: '8px',
//               margin: '0 5px',
//             }}
//           >


//           {/* Message Alert */}
//           {message.text && (
//             <div className="col-12">
//               <div className={`alert alert-${message.type} w-100`}>{message.text}</div>
//             </div>
//           )}

//             {!isPreview ? (
             
//               <Form onSubmit={handleSubmit}>
//                  <p>{phoneNumber}</p>
//                 <h2 className='text-center m-3'> Add Your Properties </h2>
//                 <p className='p-3' style={{color:"white",backgroundColor:"rgb(47,116,127)"}}>PPC-ID: {ppcId}</p>

//                 <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}> Property Images  </h4>
//                 {/* Upload Photos */}
//                 <div className="form-group photo-upload-container mt-2">
//                   <input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     onChange={handlePhotoUpload}
//                     name="photos"
//                     id="photo-upload"
//                     className="photo-upload-input"
//                   />
//                   <label htmlFor="photo-upload" className="photo-upload-label fw-normal m-0">
//                     <MdAddPhotoAlternate
//                       style={{
//                         color: 'white',
//                         backgroundColor: '#2e86e4',
//                         padding: '5px',
//                         fontSize: '30px',
//                         borderRadius: '50%',
//                         marginRight: '5px',
//                       }}
//                     />
//                     Upload Your Property Images
//                   </label>
//                 </div>

//                 {photos.length > 0 && (
//                   <div className="uploaded-photos">
//                     <h4>Uploaded Photos</h4>
//                     <div className="uploaded-photos-grid">
//                       {photos.map((photo, index) => (
//                         <div key={index} className="uploaded-photo-item">
//                           <input
//                             type="radio"
//                             name="selectedPhoto"
//                             className='me-1 '
//                             checked={selectedPhotoIndex === index}
//                             onChange={() => handlePhotoSelect(index)}
//                           />
//                           <img
//                             src={URL.createObjectURL(photo)}
//                             alt="Uploaded"
//                             className="uploaded-photo mb-3 "
//                           />
//                           <button
//                             className="remove-photo-btn"
//                             onClick={() => removePhoto(index)}
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}


// <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}> Property Video  </h4>
//         {/* Video Upload Section */}
//         <div className="form-group">
//           <input
//             type="file"
//             name="video"
//             accept="video/*"
//             id="videoUpload"
//             onChange={handleVideoChange}
//             className="d-none"
//           />
//           <label htmlFor="videoUpload" className="file-upload-label fw-normal">
//             <span className="ps-5 pt-5">
//               <FaFileVideo
//                 style={{
//                   color: 'white',
//                   backgroundColor: '#2e86e4',
//                   padding: '5px',
//                   fontSize: '30px',
//                   marginRight: '5px',
//                 }}
//               />
//               Upload Property Video
//             </span>
//           </label>

//           {/* Display the selected video */}
//           {video && (
//   <div className="selected-video-container">
//     <h4 className="text-start">Selected Video:</h4>
//     <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//       <video width="200" controls>
//         <source src={URL.createObjectURL(video)} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//       <Button
//         variant="danger"
//         // onClick={() => setVideo(null)}
//         // style={{ height: '40px' }}
//         onClick={removeVideo}
//         style={{ height: '40px' }}
//       >
//         Remove
//       </Button>
//     </div>
//   </div>
// )}
// </div>

// <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}> Basic Property Info  </h4>             
// {currentStep >= 1 && (
//                 <div>
// <Form.Group className='mb-2' controlId="propertyMode">
//                 Property Mode<span style={{ color: 'red' }}>* </span>
//                 <div className="input-card">
//                     <FaBuilding className="input-icon-left" />
//                 <Dropdown>
//                   <Dropdown.Toggle className="form-input no-background" id="dropdown-basic">
//                     {propertyDetails.propertyMode || 'Select Property Mode'}
//                   </Dropdown.Toggle>

//                   <Dropdown.Menu  className="custom-scroll-menu">
//                     <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, propertyMode: 'Residential' })}>
//                       Residential
//                     </Dropdown.Item>
//                     <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, propertyMode: 'Commercial' })}>
//                       Commercial
//                     </Dropdown.Item>
//                     <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, propertyMode: 'Agricultural' })}>
//                       Agricultural
//                     </Dropdown.Item>
//                     <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, propertyMode: 'Land' })}>
//                       Land
//                     </Dropdown.Item>
//                     <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, propertyMode: 'Rent' })}>
//                       Rent
//                     </Dropdown.Item>
//                   </Dropdown.Menu>
//                 </Dropdown>
//                 </div>
//               </Form.Group>

//                       {/* Property Type Dropdown */}
//                       <Form.Group controlId="propertyType">
//                 Property Type<span style={{ color: 'red' }}>* </span>
//                 <div className="input-card">
//                     <FaRegBuilding className="input-icon-left" />
//                     <Dropdown>
//                         <Dropdown.Toggle className="form-input no-background" id="dropdown-basic">
//                             {propertyDetails.propertyType || "Select Property Type"}
//                         </Dropdown.Toggle>

//                         <Dropdown.Menu  className="custom-scroll-menu">
//                             {/* Loop through the propertyTypes array and generate the dropdown items dynamically */}
//                             {propertyTypes.map((type, index) => (
//                                 <Dropdown.Item
//                                     key={index}
//                                     onClick={() => setPropertyDetails({ ...propertyDetails, propertyType: type })}
//                                 >
//                                     {type}
//                                 </Dropdown.Item>
//                             ))}
//                         </Dropdown.Menu>
//                     </Dropdown>
//                 </div>
//             </Form.Group>
//                             {/* Price Input */}
//                             <Form.Group controlId="price">
//                                 Price<span style={{ color: 'red' }}>* </span>
//                                 <div className="input-card">
//                                     <FaDollarSign className="input-icon" />
//                                     <Form.Control
//                                         type="number"
//                                         value={propertyDetails.price}
//                                         onChange={(e) =>
//                                             setPropertyDetails({ ...propertyDetails, price: e.target.value })
//                                         }
//                                         className="form-input"
//                                         placeholder="Price"
//                                     />
//                                 </div>
//                             </Form.Group>

//                             {/* Negotiation Dropdown */}
//                             <Form.Group controlId="negotiation">
//                                 <div className="input-card">
//                                     <FaHandshake className="input-icon" />
//                                     <Dropdown>
//                                         <Dropdown.Toggle className="form-input no-background" id="dropdown-negotiation">
//                                             {propertyDetails.negotiation || "Select Negotiation"}
//                                         </Dropdown.Toggle>

//                                         <Dropdown.Menu  className="custom-scroll-menu">
//                                             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, negotiation: "Yes" })}>Yes</Dropdown.Item>
//                                             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, negotiation: "No" })}>No</Dropdown.Item>
//                                             {/* <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, negotiation: "Depends" })}>Depends</Dropdown.Item> */}
//                                         </Dropdown.Menu>
//                                     </Dropdown>
//                                 </div>
//                             </Form.Group>

//                             {/* Length and Breadth */}
//                             <Form.Group controlId="length">
//                                 <div className="input-card">
//                                     <FaRulerCombined className="input-icon" />
//                                     <Form.Control
//                                         type="number"
//                                         value={propertyDetails.length}
//                                         onChange={(e) =>
//                                             setPropertyDetails({ ...propertyDetails, length: e.target.value })
//                                         }
//                                         className="form-input"
//                                         placeholder="Length (in meters)"
//                                     />
//                                 </div>
//                             </Form.Group>

//                             <Form.Group controlId="breadth">
//                                 <div className="input-card">
//                                     <FaRulerCombined className="input-icon" />
//                                     <Form.Control
//                                         type="number"
//                                         value={propertyDetails.breadth}
//                                         onChange={(e) =>
//                                             setPropertyDetails({ ...propertyDetails, breadth: e.target.value })
//                                         }
//                                         className="form-input"
//                                         placeholder="Breadth (in meters)"
//                                     />
//                                 </div>
//                             </Form.Group>

//                             {/* Total Area */}
//                             <Form.Group controlId="totalArea">
//                                 Total Area<span style={{ color: 'red' }}>* </span>
//                                 <div className="input-card">
//                                     <FaChartArea className="input-icon" />
//                                     <Form.Control
//                                         type="number"
//                                         value={propertyDetails.totalArea}
//                                         onChange={(e) =>
//                                             setPropertyDetails({ ...propertyDetails, totalArea: e.target.value })
//                                         }
//                                         className="form-input"
//                                         placeholder="Total Area"
//                                     />
//                                 </div>
//                             </Form.Group>

//               </div>
// )}

// {/* Step 2: Show next 5 fields */}
// {currentStep >= 2 && (
//   <div> 
//     {/* Area Unit */}
//     <Form.Group controlId="areaUnit">
//       Area Unit<span style={{ color: 'red' }}>* </span>
//       <div className="input-card">
//         <FaRegBuilding className="input-icon" />
//         <Dropdown>
//           <Dropdown.Toggle className="form-input no-background" id="dropdown-area-unit">
//             {propertyDetails.areaUnit || "Select Area Unit"}
//           </Dropdown.Toggle>

//           <Dropdown.Menu  className="custom-scroll-menu">
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, areaUnit: "" })}>
//               Select Area Unit
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, areaUnit: "sq.ft" })}>
//               sq.ft
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, areaUnit: "sq.meter" })}>
//               sq.meter
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, areaUnit: "cent" })}>
//               cent
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, areaUnit: "Acre" })}>
//               Acre
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, areaUnit: "Hectare" })}>
//               Hectare
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//     </Form.Group>

//     {/* Ownership */}
//     <Form.Group controlId="ownership">
//       <div className="input-card">
//         <FaUserAlt className="input-icon" />
//         <Dropdown>
//           <Dropdown.Toggle className="form-input no-background" id="dropdown-ownership">
//             {propertyDetails.ownership || "Select Ownership"}
//           </Dropdown.Toggle>

//           <Dropdown.Menu  className="custom-scroll-menu">
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, ownership: "" })}>
//               Select Ownership
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, ownership: "Single Owner" })}>
//               Single Owner
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, ownership: "Multiple Owners" })}>
//               Multiple Owners
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, ownership: "Power Of Attorney" })}>
//               Power Of Attorney
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//     </Form.Group>

//     {/* Property Approved */}
//     <Form.Group controlId="propertyApproved">
//       <div className="input-card">
//         <FaCheckCircle className="input-icon" />
//         <Dropdown>
//           <Dropdown.Toggle className="form-input no-background" id="dropdown-property-approved">
//             {propertyDetails.propertyApproved || "Select Property Approval"}
//           </Dropdown.Toggle>

//           <Dropdown.Menu  className="custom-scroll-menu">
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, propertyApproved: "" })}>
//               Select Property Approval
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, propertyApproved: "Yes" })}>
//               Yes
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, propertyApproved: "No" })}>
//               No
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//     </Form.Group>

//     {/* Bank Loan */}
//     <Form.Group controlId="bankLoan">
//       <div className="input-card">
//         <FaMoneyBill className="input-icon" />
//         <Dropdown >
//           <Dropdown.Toggle className="form-input no-background" id="dropdown-bank-loan">
//             {propertyDetails.bankLoan || "Bank Loan Availability"}
//           </Dropdown.Toggle>

//           <Dropdown.Menu  className="custom-scroll-menu">
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, bankLoan: "" })}>
//               Bank Loan Availability
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, bankLoan: "Yes" })}>
//               Yes
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, bankLoan: "No" })}>
//               No
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//     </Form.Group>

//     {/* Property Age */}
//     <Form.Group controlId="propertyAge">
//       <div className="input-card">
//         <FaCalendarAlt className="input-icon" />
//         <Dropdown>
//           <Dropdown.Toggle className="form-input no-background" id="dropdown-property-age">
//             {propertyDetails.propertyAge || "Select Property Age"}
//           </Dropdown.Toggle>

//           <Dropdown.Menu  className="custom-scroll-menu">
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, propertyAge: "" })}>
//               Select Property Age
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, propertyAge: "Newly Build" })}>
//               Newly Build
//             </Dropdown.Item>
//             {Array.from({ length: 20 }, (_, i) => (
//               <Dropdown.Item key={i + 2} onClick={() => setPropertyDetails({ ...propertyDetails, propertyAge: `${i + 2} Years` })}>
//                 {i + 2} Years
//               </Dropdown.Item>
//             ))}
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, propertyAge: "20+ Years" })}>
//               20+ Years
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//     </Form.Group>

//     {/* Bedrooms */}
//     <Form.Group controlId="bedrooms">
//       <div className="input-card">
//         <FaBed className="input-icon" />
//         <Dropdown>
//           <Dropdown.Toggle className="form-input no-background" id="dropdown-bedrooms" aria-label="Select Number of Floors">
//             {propertyDetails.bedrooms || "Select Bedrooms"}
//           </Dropdown.Toggle>

//           <Dropdown.Menu  className="custom-scroll-menu">
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, bedrooms: "" })}>
//               Select Bedrooms
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, bedrooms: "No" })}>
//               No Bedrooms
//             </Dropdown.Item>
//             {Array.from({ length: 20 }, (_, index) => {
//               const bedroom = `${index + 1}`;
//               return (
//                 <Dropdown.Item key={bedroom} onClick={() => setPropertyDetails({ ...propertyDetails, bedrooms: bedroom })}>
//                   {bedroom}
//                 </Dropdown.Item>
//               );
//             })}
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, bedrooms: "20+" })}>
//               20+
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//     </Form.Group>

//   </div>
// )}

// {/* Step 3: Show next 5 fields */}
// {currentStep >= 3 && (
//   <div>

// <h3 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}> Property Features  </h3>
// <Form.Group controlId="floorNo">
//   <div className="input-card">
//     <BsBuildingsFill className="input-icon" />
//     <Dropdown>
//       {/* Dropdown Toggle */}
//       <Dropdown.Toggle
//         className="form-input no-background"
//         variant="secondary"
//         id="dropdown-floor-no"
//         aria-label="Select Floor"
//       >
//         {propertyDetails.floorNo || "Select Floor No."}
//       </Dropdown.Toggle>

//       {/* Dropdown Menu */}
//       <Dropdown.Menu className="custom-scroll-menu">
//         <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, floorNo: "" })}>
//           Select Floor No.
//         </Dropdown.Item>
//         <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, floorNo: "Lower Basement" })}>
//           Lower Basement
//         </Dropdown.Item>
//         <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, floorNo: "Upper Basement" })}>
//           Upper Basement
//         </Dropdown.Item>
//         <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, floorNo: "Ground Floor" })}>
//           Ground Floor
//         </Dropdown.Item>
//         <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, floorNo: "Top Floor" })}>
//           Top Floor
//         </Dropdown.Item>
//         {Array.from({ length: 10 }, (_, index) => {
//           const floor = `${index + 1}st Floor`;
//           return (
//             <Dropdown.Item key={floor} onClick={() => setPropertyDetails({ ...propertyDetails, floorNo: floor })}>
//               {floor}
//             </Dropdown.Item>
//           );
//         })}
//         <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, floorNo: "20+" })}>
//           20+
//         </Dropdown.Item>
//       </Dropdown.Menu>
//     </Dropdown>
//   </div>
// </Form.Group>

   
//     {/* Floor Number */}
//     <Form.Group controlId="numberOfFloors">
//       <div className="input-card">
//         <BsBuildingsFill className="input-icon" />
//         <Dropdown>
//           {/* Dropdown Toggle */}
//           <Dropdown.Toggle
//             className="form-input no-background"
//             variant="secondary"
//             id="dropdown-floor-no"
//             aria-label="Select Number of Floors"
//           >
//             {propertyDetails.numberOfFloors || "Select No. of Floors"}
//           </Dropdown.Toggle>

//           {/* Dropdown Menu */}
//           <Dropdown.Menu className="custom-scroll-menu">
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, numberOfFloors: "" })}>
//               Select No. of Floors
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, numberOfFloors: "UnderGround" })}>
//               UnderGround
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, numberOfFloors: "GroundFloor" })}>
//               Ground Floor
//             </Dropdown.Item>
//             {Array.from({ length: 20 }, (_, index) => {
//               const floor = `${index + 1}`;
//               return (
//                 <Dropdown.Item key={floor} onClick={() => setPropertyDetails({ ...propertyDetails, numberOfFloors: floor })}>
//                   {floor}
//                 </Dropdown.Item>
//               );
//             })}
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, numberOfFloors: "20+" })}>
//               20+
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//     </Form.Group>

//     {/* Attached Bathrooms */}
//     <Form.Group controlId="attachedBathrooms">
//       <div className="input-card">
//         <FaBath className="input-icon" />
//         <Dropdown>
//           {/* Dropdown Toggle */}
//           <Dropdown.Toggle
//             className="form-input no-background"
//             variant="secondary"
//             id="dropdown-attached-bathrooms"
//             aria-label="Select Attached Bathrooms"
//           >
//             {propertyDetails.attachedBathrooms || "Select Attached Bathrooms"}
//           </Dropdown.Toggle>

//           {/* Dropdown Menu */}
//           <Dropdown.Menu className="custom-scroll-menu">
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, attachedBathrooms: "" })}>
//               Select Attached Bathrooms
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, attachedBathrooms: "No" })}>
//               No
//             </Dropdown.Item>
//             {Array.from({ length: 10 }, (_, index) => {
//               const bathrooms = `${index + 1}`;
//               return (
//                 <Dropdown.Item key={bathrooms} onClick={() => setPropertyDetails({ ...propertyDetails, attachedBathrooms: bathrooms })}>
//                   {bathrooms}
//                 </Dropdown.Item>
//               );
//             })}
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, attachedBathrooms: "10+" })}>
//               10+
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//     </Form.Group>

//     {/* Western Toilets */}
//     <Form.Group controlId="western">
//       <div className="input-card">
//         <FaBath className="input-icon" />
//         <Dropdown>
//           {/* Dropdown Toggle */}
//           <Dropdown.Toggle
//             className="form-input no-background"
//             variant="secondary"
//             id="dropdown-western"
//             aria-label="Select Western Toilets"
//           >
//             {propertyDetails.western || "Select Western Toilets"}
//           </Dropdown.Toggle>

//           {/* Dropdown Menu */}
//           <Dropdown.Menu className="custom-scroll-menu">
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, western: "" })}>
//               Select Western Toilets
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, western: "No" })}>
//               No
//             </Dropdown.Item>
//             {Array.from({ length: 10 }, (_, index) => {
//               const toilets = `${index + 1}`;
//               return (
//                 <Dropdown.Item key={toilets} onClick={() => setPropertyDetails({ ...propertyDetails, western: toilets })}>
//                   {toilets}
//                 </Dropdown.Item>
//               );
//             })}
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, western: "10+" })}>
//               10+
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//     </Form.Group>

//     {/* Car Parking */}
//     <Form.Group controlId="carParking">
//       <div className="input-card">
//         <FaCar className="input-icon" />
//         <Dropdown>
//           {/* Dropdown Toggle */}
//           <Dropdown.Toggle
//             className="form-input no-background"
//             variant="secondary"
//             id="dropdown-car-parking"
//             aria-label="Select Car Parking"
//           >
//             {propertyDetails.carParking || "Car Parking"}
//           </Dropdown.Toggle>

//           {/* Dropdown Menu */}
//           <Dropdown.Menu className="custom-scroll-menu">
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, carParking: "" })}>
//               Car Parking
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, carParking: "Yes" })}>
//               Yes
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, carParking: "No" })}>
//               No
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//     </Form.Group>

//     {/* Furnishing Status */}
//     <Form.Group controlId="furnished">
//       <div className="input-card">
//         <FaHome className="input-icon" />
//         <Dropdown>
//           {/* Dropdown Toggle */}
//           <Dropdown.Toggle
//             className="form-input no-background"
//             variant="secondary"
//             id="dropdown-furnishing-status"
//             aria-label="Select Furnishing Status"
//           >
//             {propertyDetails.furnished || "Select Furnishing Status"}
//           </Dropdown.Toggle>

//           {/* Dropdown Menu */}
//           <Dropdown.Menu className="custom-scroll-menu">
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, furnished: "" })}>
//               Select Furnishing Status
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, furnished: "Furnished" })}>
//               Furnished
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, furnished: "Unfurnished" })}>
//               Unfurnished
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, furnished: "Semi-Furnished" })}>
//               Semi-Furnished
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//     </Form.Group>

//     {/* Lift Availability */}
//     <Form.Group controlId="lift">
//       <div className="input-card">
//         <FaBuilding className="input-icon" />
//         <Dropdown>
//           {/* Dropdown Toggle */}
//           <Dropdown.Toggle
//             className="form-input no-background"
//             variant="secondary"
//             id="dropdown-lift-available"
//             aria-label="Select Lift Availability"
//           >
//             {propertyDetails.lift || "Lift Available"}
//           </Dropdown.Toggle>

//           {/* Dropdown Menu */}
//           <Dropdown.Menu className="custom-scroll-menu">
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, lift: "" })}>
//               Lift Available
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, lift: "Yes" })}>
//               Yes
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, lift: "No" })}>
//               No
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, lift: "Closed" })}>
//               Closed
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//     </Form.Group>

//   </div>
// )}


// {currentStep >= 4 && (
//   <div>
//     {/* Kitchen Availability */}
//     <Form.Group controlId="kitchen">
//       <div className="input-card">
//         <FaKitchenSet className="input-icon" />
//         <Dropdown>
//           {/* Dropdown Toggle */}
//           <Dropdown.Toggle
//             className="form-input no-background"
//             variant="secondary"
//             id="dropdown-kitchen"
//             aria-label="Select Kitchen Availability"
//           >
//             {propertyDetails.kitchen || "Select Kitchen"}
//           </Dropdown.Toggle>

//           {/* Dropdown Menu */}
//           <Dropdown.Menu className="custom-scroll-menu">
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, kitchen: "" })}>
//               Select Kitchen
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, kitchen: "Yes" })}>
//               Yes
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, kitchen: "No" })}>
//               No
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//     </Form.Group>

//     {/* Kitchen Type */}
//     <Form.Group controlId="kitchenType">
//       <div className="input-card">
//         <FaKitchenSet className="input-icon" />
//         <Dropdown>
//           {/* Dropdown Toggle */}
//           <Dropdown.Toggle
//             className="form-input no-background"
//             variant="secondary"
//             id="dropdown-kitchen-type"
//             aria-label="Select Kitchen Type"
//           >
//             {propertyDetails.kitchenType || "Select Kitchen Type"}
//           </Dropdown.Toggle>

//           {/* Dropdown Menu */}
//           <Dropdown.Menu className="custom-scroll-menu">
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, kitchenType: "" })}>
//               Select Kitchen Type
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, kitchenType: "Modular" })}>
//               Modular
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, kitchenType: "Normal" })}>
//               Normal
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, kitchenType: "No" })}>
//               No
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//     </Form.Group>

//     {/* Number of Balconies */}
//     <Form.Group controlId="balconies">
//       <div className="input-card">
//         <FaRegBuilding className="input-icon" />
//         <Dropdown>
//           {/* Dropdown Toggle */}
//           <Dropdown.Toggle
//             className="form-input no-background"
//             variant="secondary"
//             id="dropdown-balconies"
//             aria-label="Select Number of Balconies"
//           >
//             {propertyDetails.balconies || "Select Number of Balconies"}
//           </Dropdown.Toggle>

//           {/* Dropdown Menu */}
//           <Dropdown.Menu className="custom-scroll-menu">
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, Balconies: "" })}>
//               Select Number of Balconies
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, Balconies: "No" })}>
//               No
//             </Dropdown.Item>
//             {Array.from({ length: 10 }, (_, index) => {
//               const Balconie = `${index + 1} Balconie${index + 1 > 1 ? "s" : ""}`;
//               return (
//                 <Dropdown.Item key={Balconie} onClick={() => setPropertyDetails({ ...propertyDetails, balconies: Balconie })}>
//                   {Balconie}
//                 </Dropdown.Item>
//               );
//             })}
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, balconies: "10+ Balconies" })}>
//               10+ Balconies
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//     </Form.Group>

//     <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}> Property Info  </h4>
//     {/* Property Facing */}
//     <Form.Group controlId="facing">
//       <div className="input-card">
//         <GiHouse className="input-icon" />
//         <Dropdown>
//           {/* Dropdown Toggle */}
//           <Dropdown.Toggle
//             className="form-input no-background"
//             variant="secondary"
//             id="dropdown-facing"
//             aria-label="Select Facing"
//           >
//             {propertyDetails.facing || "Select Facing"}
//           </Dropdown.Toggle>

//           {/* Dropdown Menu */}
//           <Dropdown.Menu className="custom-scroll-menu">
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, facing: "" })}>
//               Select Facing
//             </Dropdown.Item>
//             {[
//               'North',
//               'South',
//               'East',
//               'West',
//               'North-East',
//               'South-East',
//               'North-West',
//               'South-West',
//             ].map((direction) => (
//               <Dropdown.Item key={direction} onClick={() => setPropertyDetails({ ...propertyDetails, facing: direction })}>
//                 {direction}
//               </Dropdown.Item>
//             ))}
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//     </Form.Group>

//     {/* Sales Mode */}
//     <Form.Group controlId="salesMode">
//       <div className="input-card">
//         <GiGears className="input-icon" />
//         <Dropdown>
//           {/* Dropdown Toggle */}
//           <Dropdown.Toggle
//             className="form-input no-background"
//             variant="secondary"
//             id="dropdown-sales-mode"
//             aria-label="Select Sales Mode"
//           >
//             {propertyDetails.salesMode || "Select Sales Mode"}
//           </Dropdown.Toggle>

//           {/* Dropdown Menu */}
//           <Dropdown.Menu className="custom-scroll-menu">
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, salesMode: "" })}>
//               Select Sales Mode
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, salesMode: "Full Payment" })}>
//               Full Payment
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, salesMode: "Partial Payment" })}>
//               Partial Payment
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//     </Form.Group>

//     {/* Sales Type */}
//     <Form.Group controlId="salesType">
//       <div className="input-card">
//         <FaRegBuilding className="input-icon" />
//         <Dropdown>
//           {/* Dropdown Toggle */}
//           <Dropdown.Toggle
//             className="form-input no-background"
//             variant="secondary"
//             id="dropdown-sales-type"
//             aria-label="Select Sales Type"
//           >
//             {propertyDetails.salesType || "Select Sales Type"}
//           </Dropdown.Toggle>

//           {/* Dropdown Menu */}
//           <Dropdown.Menu className="custom-scroll-menu">
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, salesType: "" })}>
//               Select Sales Type
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, salesType: "Normal" })}>
//               Normal
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, salesType: "Urgent" })}>
//               Urgent
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//     </Form.Group>

//     {/* Posted By */}
//     <Form.Group controlId="postedBy">
//       <div className="input-card">
//         <FaUserAlt className="input-icon" />
//         <Dropdown>
//           {/* Dropdown Toggle */}
//           <Dropdown.Toggle
//             className="form-input no-background"
//             variant="secondary"
//             id="dropdown-posted-by"
//             aria-label="Select Posted By"
//           >
//             {propertyDetails.postedBy || "Posted By"}
//           </Dropdown.Toggle>

//           {/* Dropdown Menu */}
//           <Dropdown.Menu className="custom-scroll-menu">
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, postedBy: "" })}>
//               Posted By
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, postedBy: "Owner" })}>
//               Owner
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, postedBy: "Agent" })}>
//               Agent
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, postedBy: "Builder" })}>
//               Builder
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//     </Form.Group>

//     <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}> Property Description  </h4>
//     {/* Property Description */}
//     <Form.Group controlId="description">
//       {/* <Form.Label style={{ color: "rgb(47,116,127)", fontWeight: "bold" }}> Property Description </Form.Label> */}
//       <div className="input-card">
//         <Form.Control
//           as="textarea"
//           rows={5}
//           value={propertyDetails.description}
//           onChange={(e) => setPropertyDetails({ ...propertyDetails, description: e.target.value })}
//           className="form-input h-25"
//           placeholder="What makes your ad unique (maximum 200 characters)"
//           maxLength={200}
//         />
//       </div>
//     </Form.Group>

//   </div>
// )}

// {currentStep >= 5 && (
//   <div>
//     <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}>
//       Property Address
//     </h4>

//     {/* State */}
//     <Form.Group controlId="state">
//       <span>state <span style={{ color: 'red' }}>* </span></span>
//       <div className="input-card">
//         <FaMapSigns className="input-icon" />
//         <Form.Control
//           type="text"
//           value={propertyDetails.state || ""}
//           onChange={(e) => setPropertyDetails({ ...propertyDetails, state: e.target.value })}
//           className="form-input"
//           placeholder="Enter State"
//         />
//       </div>
//     </Form.Group>

//     {/* City */}
//     <Form.Group controlId="city">
//       <span>city <span style={{ color: 'red' }}>* </span></span>
//       <div className="input-card">
//         <FaMapMarkerAlt className="input-icon" />
//         <Form.Control
//           type="text"
//           value={propertyDetails.city || ""}
//           onChange={(e) => setPropertyDetails({ ...propertyDetails, city: e.target.value })}
//           className="form-input"
//           placeholder="Enter City"
//         />
//       </div>
//     </Form.Group>

//     <Form.Group controlId="country">
//       <span>country <span style={{ color: 'red' }}>* </span></span>
//       <div className="input-card">
//         <FaMapMarkerAlt className="input-icon" />
//         <Form.Control
//           type="text"
//           value={propertyDetails.country || ""}
//           onChange={(e) => setPropertyDetails({ ...propertyDetails, country: e.target.value })}
//           className="form-input"
//           placeholder="Enter country"
//         />
//       </div>
//     </Form.Group>

//     <Form.Group controlId="rentalPropertyAddress">
//       <span>rentalPropertyAddress <span style={{ color: 'red' }}>* </span></span>
//       <div className="input-card">
//         <FaMapMarkerAlt className="input-icon" />
//         <Form.Control
//           type="text"
//           value={propertyDetails.rentalPropertyAddress || ""}
//           onChange={(e) => setPropertyDetails({ ...propertyDetails, rentalPropertyAddress: e.target.value })}
//           className="form-input"
//           placeholder="Enter rentalPropertyAddress"
//         />
//       </div>
//     </Form.Group>

//     {/* Area */}
//     <Form.Group controlId="area">
//       <span>area <span style={{ color: 'red' }}>* </span></span>
//       <div className="input-card">
//         <FaCity className="input-icon" />
//         <Form.Control
//           type="text"
//           value={propertyDetails.area || ""}
//           onChange={(e) => setPropertyDetails({ ...propertyDetails, area: e.target.value })}
//           className="form-input"
//           placeholder="Enter Area"
//         />
//       </div>
//     </Form.Group>

//     {/* District */}
//     <Form.Group controlId="district">
//       <div className="input-card">
//         <FaRegAddressCard className="input-icon" />
//         <Form.Control
//           type="text"
//           value={propertyDetails.district || ""}
//           onChange={(e) => setPropertyDetails({ ...propertyDetails, district: e.target.value })}
//           className="form-input"
//           placeholder="Enter District"
//         />
//       </div>
//     </Form.Group>

//     {/* Nagar */}
//     <Form.Group controlId="nagar">
//       <div className="input-card">
//         <FaRegAddressCard className="input-icon" />
//         <Form.Control
//           type="text"
//           value={propertyDetails.nagar || ""}
//           onChange={(e) => setPropertyDetails({ ...propertyDetails, nagar: e.target.value })}
//           className="form-input"
//           placeholder="Enter Nagar"
//         />
//       </div>
//     </Form.Group>

//     {/* Street Name */}
//     <Form.Group controlId="streetName">
//       <div className="input-card">
//         <FaRegAddressCard className="input-icon" />
//         <Form.Control
//           type="text"
//           value={propertyDetails.streetName || ""}
//           onChange={(e) => setPropertyDetails({ ...propertyDetails, streetName: e.target.value })}
//           className="form-input"
//           placeholder="Enter Street Name"
//         />
//       </div>
//     </Form.Group>

//     {/* Door Number */}
//     <Form.Group controlId="doorNumber">
//       <div className="input-card">
//         <FaRegAddressCard className="input-icon" />
//         <Form.Control
//           type="text"
//           value={propertyDetails.doorNumber || ""}
//           onChange={(e) => setPropertyDetails({ ...propertyDetails, doorNumber: e.target.value })}
//           className="form-input"
//           placeholder="Enter Door Number"
//         />
//       </div>
//     </Form.Group>
//   </div>
// )}

// {currentStep >= 6 && (
//   <div>
//     <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}>
//       Owner Info
//     </h4>

//     {/* Owner Name */}
//     <Form.Group controlId="ownerName">
//       <div className="input-card">
//         <FaUserAlt className="input-icon" />
//         <Form.Control
//           type="text"
//           value={propertyDetails.ownerName || ""}
//           onChange={(e) => setPropertyDetails({ ...propertyDetails, ownerName: e.target.value })}
//           className="form-input"
//           placeholder="Enter Owner Name"
//         />
//       </div>
//     </Form.Group>

//     {/* Email */}
//     <Form.Group controlId="email">
//       <div className="input-card">
//         <FaEnvelope className="input-icon" />
//         <Form.Control
//           type="email"
//           value={propertyDetails.email || ""}
//           onChange={(e) => setPropertyDetails({ ...propertyDetails, email: e.target.value })}
//           className="form-input"
//           placeholder="Enter Email"
//         />
//       </div>
//     </Form.Group>

//     {/* Phone Number */}
//     <Form.Group controlId="phone">
//       <div className="input-card">
//         <FaPhoneAlt className="input-icon" />
//         <Form.Control
//           type="text"
//           value={phoneNumber}
//           readOnly
//           placeholder="Phone Number"
//           className="form-input"
//           disabled
//         />
//       </div>
//     </Form.Group>

   


//     {/* Best Time to Call */}
//     <Form.Group controlId="bestTimeToCall">
//       <div className="input-card">
//         <FaClock className="input-icon" />
//         <Dropdown>
//           {/* Dropdown Toggle */}
//           <Dropdown.Toggle
//             className="form-input no-background"
//             variant="secondary"
//             id="dropdown-best-time-to-call"
//             aria-label="Select Best Time to Call"
//           >
//             {propertyDetails.bestTimeToCall || "Select Best Time to Call"}
//           </Dropdown.Toggle>

//           {/* Dropdown Menu */}
//           <Dropdown.Menu className="custom-scroll-menu">
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, bestTimeToCall: "" })}>
//               Select Best Time to Call
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, bestTimeToCall: "AnyTime" })}>
//               Any Time
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, bestTimeToCall: "Morning" })}>
//               Morning
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, bestTimeToCall: "Afternoon" })}>
//               Afternoon
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setPropertyDetails({ ...propertyDetails, bestTimeToCall: "Evening" })}>
//               Evening
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//     </Form.Group>
//   </div>
// )}
    

//               {/* Show "Show More" button */}
//               <div className="text-center mt-4">
//                 <div
//                   style={{
//                     display: 'inline-block',
//                     backgroundColor: 'rgb(219, 219, 219)',
//                     padding: '5px',
//                     borderRadius: '50%',
//                     cursor: 'pointer',
//                   }}
//                   onClick={handleShowMore}
//                 >
//                   <MdKeyboardDoubleArrowDown
//                     size={30}
//                     style={{ color: 'rgb(58, 57, 57)' }}
//                   />
//                 </div>
//               </div>

//               {/* Step 3: Submit all data */}
//               {currentStep > 6 && (
//                 <Button
//                   type="submit"
//                   style={{ marginTop: '15px', backgroundColor: "rgb(47,116,127)" }}
//                   onClick={handlePreview}
//                 >
//                   PreView
//                 </Button>
//               )}
//             </Form>
//              ) : (
//                 <div>
//                           <h2>Preview Property Details</h2>
                
//                           {Object.entries(propertyDetails).map(([key, value]) => (
//                             <p key={key}>
//                               <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:</strong> {value || 'Not Provided'}
//                             </p>
//                           ))}
                
//                           <Button variant="secondary" onClick={handlePreview}>
//                             Edit
//                           </Button>
//                           <Button variant="primary" onClick={handleSubmit} style={{ marginLeft: '10px' }}>
//                             Submit Property
//                           </Button>
//                         </div>
//                       )}
//                     </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default AddProps;

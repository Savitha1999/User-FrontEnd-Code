







// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import { FaBath,FaCity,FaBuilding, FaBed,FaCar, FaEnvelope,FaCalendarAlt,FaMapSigns, FaChartArea, FaCheckCircle, FaDollarSign, FaFileVideo, FaHandshake, FaHome, FaMapMarkerAlt, FaMoneyBill, FaPhoneAlt, FaRegBuilding, FaRulerCombined, FaTools, FaUserAlt } from 'react-icons/fa';
// import { FaKitchenSet } from "react-icons/fa6";
// import { BsBuildingsFill } from "react-icons/bs";
// import { GiHouse, GiGears } from "react-icons/gi";
// import {  FaClock, FaImage, FaRegAddressCard } from 'react-icons/fa6';
// import { MdAddPhotoAlternate, MdDescription, MdKeyboardDoubleArrowDown } from 'react-icons/md';



// import './AddProperty.css';

// const AddProperties = () => {
//   const [ppcId,setPpcId] =useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [propertyMode, setPropertyMode] = useState('');
//   const [propertyType, setPropertyType] = useState('');
//   const [price, setPrice] = useState('');
//   const [description, setDescription] = useState('');
//   const [photos, setPhotos] = useState([]);
//   const [video, setVideo] = useState(null);
//   const [propertyAge, setPropertyAge] = useState('');
//   const [bankLoan, setBankLoan] = useState('');
//   const [negotiation, setNegotiation] = useState('');
//   const [length, setLength] = useState('');
//   const [breadth, setBreadth] = useState('');
//   const [totalArea, setTotalArea] = useState('');
//   const [ownership, setOwnership] = useState('');
//   const [bedrooms, setBedrooms] = useState('');
//   const [kitchen, setKitchen] = useState('');
//   const [kitchenType, setKitchenType] = useState('');
//   const [balconies, setBalconies] = useState('');
//   const [floorNo, setFloorNo] = useState('');
//   const [areaUnit, setAreaUnit] = useState('');
//   const [propertyApproved, setPropertyApproved] = useState('');
//   const [postedBy, setPostedBy] = useState('');
//   const [facing, setFacing] = useState('');
//   const [salesMode, setSalesMode] = useState('');
//   const [salesType, setSalesType] = useState('');
//   const [furnished, setFurnished] = useState('');
//   const [lift, setLift] = useState('');
//   const [attachedBathrooms, setAttachedBathrooms] = useState('');
//   const [western, setWestern] = useState('');
//   const [numberOfFloors, setNumberOfFloors] = useState('');
//   const [carParking, setCarParking] = useState('');
//   const [rentalPropertyAddress, setRentalPropertyAddress] = useState('');
//   const [country, setCountry] = useState('');
//   const [state, setState] = useState('');
//   const [city, setCity] = useState('');
//   const [district, setDistrict] = useState('');
//   const [area, setArea] = useState('');
//   const [streetName, setStreetName] = useState('');
//   const [doorNumber, setDoorNumber] = useState('');
//   const [nagar, setNagar] = useState('');
//   const [ownerName, setOwnerName] = useState('');
//   const [email, setEmail] = useState('');
//   const [bestTimeToCall, setBestTimeToCall] = useState('');
//   const [rentAmount, setRentAmount] = useState('');
//   const [rentSecurityAmount, setRentSecurityAmount] = useState('');
//   const [rentMaintenanceCharge, setRentMaintenanceCharge] = useState('');
//   const [maintancePer, setMaintancePer] = useState('');

//   const [currentStep, setCurrentStep] = useState(1);
//   const [countryCode, setCountryCode] = useState('+1');



  
//   // useEffect(() => {
//   //   // Retrieve phone number from local storage
//   //   const storedPhoneNumber = localStorage.getItem('userPhoneNumber');
//   //   if (storedPhoneNumber) {
//   //     setPhoneNumber(storedPhoneNumber);
//   //   }
  
//   //   // Check if the phone number already has an associated ppcId
//   //   const existingPpcId = localStorage.getItem(storedPhoneNumber);
  
//   //   let newPpcId;
  
//   //   // If no ppcId is associated with this phone number, create a new one
//   //   if (!existingPpcId) {
//   //     // Retrieve last used ppcId from localStorage or set to 1000 if it doesn't exist
//   //     let lastUsedPpcId = parseInt(localStorage.getItem('lastUsedPpcId') || '1000');
//   //     lastUsedPpcId++; // Increment the ppcId for the new user
  
//   //     newPpcId = lastUsedPpcId;
  
//   //     // Save the new ppcId in state and localStorage
//   //     localStorage.setItem('lastUsedPpcId', lastUsedPpcId.toString());
//   //     localStorage.setItem(storedPhoneNumber, newPpcId.toString()); // Store the new ppcId for this phone number
//   //   } else {
//   //     // If there's already a ppcId, use it
//   //     newPpcId = parseInt(existingPpcId);
//   //   }
  
//   //   // Set the new or existing ppcId in state
//   //   setPpcId(newPpcId);
  
//   // }, [phoneNumber]);
  



//   useEffect(() => {
//     // Retrieve phone number from local storage
//     const storedPhoneNumber = localStorage.getItem('userPhoneNumber');
//     if (storedPhoneNumber) {
//       setPhoneNumber(storedPhoneNumber);
//     }

//     // Check if the phone number already has an associated ppcId
//     const existingPpcId = localStorage.getItem(`${countryCode}${storedPhoneNumber}`);

//     let newPpcId;

//     // If no ppcId is associated with this phone number, create a new one
//     if (!existingPpcId) {
//       // Retrieve last used ppcId from localStorage or set to 1000 if it doesn't exist
//       let lastUsedPpcId = parseInt(localStorage.getItem('lastUsedPpcId') || '1000');
//       lastUsedPpcId++; // Increment the ppcId for the new user

//       newPpcId = lastUsedPpcId;

//       // Save the new ppcId in state and localStorage
//       localStorage.setItem('lastUsedPpcId', lastUsedPpcId.toString());
//       localStorage.setItem(`${countryCode}${storedPhoneNumber}`, newPpcId.toString()); // Store the new ppcId for this phone number
//     } else {
//       // If there's already a ppcId, use it
//       newPpcId = parseInt(existingPpcId);
//     }

//     // Set the new or existing ppcId in state
//     setPpcId(newPpcId);
//   }, [phoneNumber, countryCode]);


//   // Handle photo uploads
//   const handlePhotoUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const maxSize = 10 * 1024 * 1024;

//     for (let file of files) {
//       if (file.size > maxSize) {
//         alert('File size exceeds the 10MB limit');
//         return;
//       }
//     }

//     if (photos.length + files.length <= 15) {
//       setPhotos([...photos, ...files]);
//     } else {
//       alert('Maximum 15 photos can be uploaded.');
//     }
//   };

//   // Remove a photo from the list
//   const removePhoto = (index) => {
//     setPhotos(photos.filter((_, i) => i !== index));
//   };

//   // Handle video file change
//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     setVideo(file);
//   };

//   // Handle show more functionality
//   const handleShowMore = () => {
//     console.log({
//       phoneNumber,
//       propertyMode,
//       propertyType,
//       price,
//       description,
//       photos,
//       video,
//       propertyAge,
//       bankLoan,
//       negotiation,
//       length,
//       breadth,
//       totalArea,
//       ownership,
//       bedrooms,
//       kitchen,
//       kitchenType,
//       balconies,
//       floorNo,
//       areaUnit,
//       propertyApproved,
//       postedBy,
//       facing,
//       salesMode, 
//     salesType, 
//     furnished,  
//     lift, 
//     attachedBathrooms, 
//     western, 
//     numberOfFloors, 
//     carParking,  
//     rentalPropertyAddress,  
//     country, 
//     state,  
//     city, 
//     district,  
//     area, 
//     streetName,  
//     doorNumber,  
//     nagar,  
//     ownerName,  
//     email,  
//     bestTimeToCall,  
//     rentAmount,  
//     rentSecurityAmount,
//     rentMaintenanceCharge,  
//     maintancePer,  
//     });

//     // Increment currentStep to show next set of fields
//     setCurrentStep(currentStep + 1);
//   };


// // Handle form submission
// const handleSubmit = (e) => {
//   e.preventDefault();

//   // Display all form data when the final submit button is clicked
//   console.log({
//     phoneNumber,
//     propertyMode,
//     propertyType,
//     price,
//     description,
//     photos,
//     video,
//     propertyAge,
//     bankLoan,
//     negotiation,
//     length,
//     breadth,
//     totalArea,
//     ownership,
//     bedrooms,
//     kitchen,
//     kitchenType,
//     balconies,
//     floorNo,
//     areaUnit,
//     propertyApproved,
//     postedBy,
//     facing,
//     salesMode, 
//     salesType, 
//     furnished,  
//     lift, 
//     attachedBathrooms, 
//     western, 
//     numberOfFloors, 
//     carParking,  
//     rentalPropertyAddress,  
//     country, 
//     state,  
//     city, 
//     district,  
//     area, 
//     streetName,  
//     doorNumber,  
//     nagar,  
//     ownerName,  
//     email,  
//     bestTimeToCall,  
//     rentAmount,  
//     rentSecurityAmount,
//     rentMaintenanceCharge,  
//     maintancePer,  
//   });

//   // Reset form after submission
//   setPhoneNumber('');
//   setPropertyMode('');
//   setPropertyType('');
//   setPrice('');
//   setDescription('');
//   setPhotos([]);
//   setVideo(null);
//   setPropertyAge('');
//   setBankLoan('');
//   setNegotiation('');
//   setLength('');
//   setBreadth('');
//   setTotalArea('');
//   setOwnership('');
//   setBedrooms('');
//   setKitchen('');
//   setKitchenType('');
//   setBalconies('');
//   setFloorNo('');
//   setAreaUnit('');
//   setPropertyApproved('');
//   setPostedBy('');
//   setFacing('');
//   setSalesMode('');
//   setSalesType('');
//   setFurnished('');
//   setLift('');
//   setAttachedBathrooms('');
//   setWestern('');
//   setNumberOfFloors('');
//   setCarParking('');
//   setRentalPropertyAddress('');
//   setCountry('');
//   setState('');
//   setCity('');
//   setDistrict('');
//   setArea('');
//   setStreetName('');
//   setDoorNumber('');
//   setNagar('');
//   setOwnerName('');
//   setEmail('');
//   setBestTimeToCall('');
//   setRentAmount('');
//   setRentSecurityAmount('');
//   setRentMaintenanceCharge('');
//   setMaintancePer('');
  
//   // If you have a step-based form, reset the step here (assuming 'setCurrentStep' exists)
//   setCurrentStep(1); // Resets to first step after submission
// };




//   return (
//     <Container>
//       <Row className="g-03">
//         <Col lg={12} className="d-flex align-items-center justify-content-center">
//           <div
//             style={{
//               width: "100%",
//               maxWidth: "450px",
//               minWidth: "300px",
//               padding: "2rem",
//               borderRadius: "8px",
//               margin: "0 20px",
//               backgroundRepeat: "no-repeat",
//               // color: "white",
//             }}
//           >
           

//             <Form onSubmit={handleSubmit}>

              
//                     {/* Photo Upload */}
// <div className="form-group photo-upload-container mt2">
//   <input
//     type="file"
//     multiple
//     accept="image/*"
//     onChange={handlePhotoUpload}
//     name="photos"
//     id="photo-upload"
//     className="photo-upload-input"
//   />
//   <label htmlFor="photo-upload" className="photo-upload-label fw-normal">
//     <span className='ps-5 pt-5 '  >
//   <MdAddPhotoAlternate 
//   style={{color:"white", 
//   backgroundColor:"#2e86e4",
//   padding:"5px", 
//   fontSize:"30px",
//   borderRadius:"50%",
//   marginRight:"5px"
//   }} />  
//    Upload Your Property Images
//   </span>
//   </label>
// </div>

// {/* Display Uploaded Photos */}
// {photos.length > 0 && (
//   <div className="uploaded-photos">
//     <h4>Uploaded Photos</h4>
//     <div className="uploaded-photos-grid">
//       {photos.map((photo, index) => (
//         <div key={index} className="uploaded-photo-item">
//           <img
//             src={URL.createObjectURL(photo)}
//             alt="Uploaded"
//             className="uploaded-photo mb-3 "
//           />
//           <button
//             className="remove-photo-btn"
//             onClick={() => removePhoto(index)}
//           >
//             Remove
//           </button>
//         </div>
//       ))}
//     </div>
//   </div>
// )}

//                {/* Video Upload */}
//                <div className="form-group ">
//       {/* Hidden file input */}
//       <input
//         type="file"
//         name="video"
//         accept="video/*"
//         id="videoUpload"
//         onChange={handleVideoChange}
//       />
//       {/* Custom upload button */}
//       <label htmlFor="videoUpload" className="file-upload-label fw-normal">
//       <span className='ps-5 pt-5 '  >
//       <FaFileVideo 
//        style={{color:"white", 
//         backgroundColor:"#2e86e4",
//         padding:"5px", 
//         fontSize:"30px",
//         marginRight:"5px"
//         }} />  
//       Upload Property Video
//       </span>
//       </label>

//       {/* Display the selected video */}
//       {video && (
//         <div className="selected-video-container">
//           <h4 className='text-start'>Selected Video:</h4>
//           <video width="200" controls>
//             <source src={URL.createObjectURL(video)} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       )}
//     </div>


//             <h6 className='text-white p-3 ' style={{backgroundColor:"rgb(47,116,127)"}}>PPC-ID : {ppcId} </h6>


//             <div className='fw-bold mb-2' style={{color:"rgb(47,116,127)"}} > Property Info </div>

//               {/* Step 1: Show the first 5 fields */}
//               {currentStep >= 1 && (
//                 <div>

                

//                   {/* Property Mode */}
//         <Form.Group controlId="propertyMode">
//           <div className="input-card">
//             <FaHome className="input-icon" />
//             <Form.Control
//               as="select"
//               value={propertyMode}
//               onChange={(e) => setPropertyMode(e.target.value)}
//               className="form-input"
//             >
//               <option value="">Select Property Mode</option>
//                 <option value="Residential">Residential</option>
//                 <option value="Commercial">Commercial</option>
//               <option value="Agricultural">Agricultural</option>
//               <option value="Land">Land </option>
//               <option value="Rent">Rent</option>
//             </Form.Control>
//           </div>
//         </Form.Group>

//         {/* Property Type */}
//         <Form.Group controlId="propertyType">
//           <div className="input-card">
//             <FaRegBuilding className="input-icon" />
//             <Form.Control
//               as="select"
//               value={propertyType}
//               onChange={(e) => setPropertyType(e.target.value)}
//               className="form-input"
//             >
//               <option value="">Select Property Type</option>
//                         <option value="Flat/ Apartment">Flat/ Apartment</option>
//                         <option value="Residential House">Residential House</option>
//                         <option value="Villa">Villa</option>
//                         <option value="Builder Floor Apartment">Builder Floor Apartment</option>
//                         <option value="Penthouse">Penthouse</option>
//                         <option value="Studio Apartment">Studio Apartment</option>
//                         <option value="Service Apartment">Service Apartment</option>
//                         <option value="Commercial Office Space">Commercial Office Space</option>
//                         <option value="Office in IT Park/ SEZ">Office in IT Park/ SEZ</option>
//                         <option value="Commercial Shop">Commercial Shop</option>
//                         <option value="Commercial Showroom">Commercial Showroom</option>
//                         <option value="Commercial Land">Commercial Land</option>
//                         <option value="Warehouse/ Godown">Warehouse/ Godown</option>
//                         <option value="Industrial Land">Industrial Land</option>
//                         <option value="Industrial Building">Industrial Building</option>
//                         <option value="Industrial Shed">Industrial Shed</option>
//                         <option value="Agricultural Land">Agricultural Land</option>
//                         <option value="Farm House">Farm House</option>
//             </Form.Control>
//           </div>
//         </Form.Group>

//         {/* Price */}
//         <Form.Group controlId="price">
//           <div className="input-card">
//             <FaDollarSign className="input-icon" />
//             <Form.Control
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               className="form-input"
//               placeholder="Price"
//             />
//           </div>
//         </Form.Group>

//         {/* Negotiation */}
//         <Form.Group controlId="negotiation">
//           <div className="input-card">
//             <FaHandshake className="input-icon" />
//             <Form.Control
//               as="select"
//               value={negotiation}
//               onChange={(e) => setNegotiation(e.target.value)}
//               className="form-input"
//             >
//               <option value="">Select Negotiation</option>
//               <option value="Yes">Yes</option>
//               <option value="No">No</option>
//             </Form.Control>
//           </div>
//         </Form.Group>

//           {/* Length */}
//           <Form.Group controlId="length">
//           <div className="input-card">
//             <FaRulerCombined className="input-icon" />
//             <Form.Control
//               type="number"
//               value={length}
//               onChange={(e) => setLength(e.target.value)}
//               className="form-input"
//               placeholder="Length (in meters)"
//             />
//           </div>
//         </Form.Group>

//         <Form.Group controlId="length">
//           <div className="input-card">
//             <FaRulerCombined className="input-icon" />
//             <Form.Control
//               type="number"
//               value={breadth}
//               onChange={(e) => setBreadth(e.target.value)}
//               className="form-input"
//               placeholder="Breadth (in meters)"
//             />
//           </div>
//         </Form.Group>

//         {/* Total Area */}
//         <Form.Group controlId="totalArea">
//           <div className="input-card">
//             <FaChartArea className="input-icon" />
//             <Form.Control
//               type="number"
//               value={totalArea}
//               onChange={(e) => setTotalArea(e.target.value)}
//               className="form-input"
//               placeholder="Total Area"
//             />
//           </div>
//         </Form.Group>

//                 </div>
//               )}


//               {/* Step 2: Show next 5 fields */}
//               {currentStep >= 2 && (
//                 <div>

//         <Form.Group controlId="areaUnit">
//   <div className="input-card">
//     <FaRegBuilding className="input-icon" />
//     <Form.Control
//       as="select"
//       value={areaUnit}
//       onChange={(e) => setAreaUnit(e.target.value)}
//       className="form-input"
//     >
//                         <option value="">Select Area Unit</option>
//                         <option value="sq.ft">sq.ft</option>
//                         <option value="sq.meter">sq.meter</option>
//                         <option value="cent">cent</option>
//                         <option value="Acre">Acre</option>
//                         <option value="Hectare">Hectare</option>
//     </Form.Control>
//   </div>
// </Form.Group>

// <Form.Group controlId="ownership">
//           <div className="input-card">
//             <FaUserAlt className="input-icon" />
//             <Form.Control
//               as="select"
//               value={ownership}
//               onChange={(e) => setOwnership(e.target.value)}
//               className="form-input"
//             >
//               <option value="">Select Ownership</option>
//               <option value="Single Owner">Single Owner</option>
//               <option value="Multiple Owners">Multiple Owners</option>
//               <option value="Power Of Attorney">Power Of Attorney</option>

//             </Form.Control>
//           </div>
//         </Form.Group>

//             {/* Property Approved */}
//             <Form.Group controlId="propertyApproved">
//           <div className="input-card">
//             <FaCheckCircle className="input-icon" />
//             <Form.Control
//               as="select"
//               value={propertyApproved}
//               onChange={(e) => setPropertyApproved(e.target.value)}
//               className="form-input"
//             >
//               <option value="">Select Property Approval</option>
//               <option value="Yes">Yes</option>
//               <option value="No">No</option>
//             </Form.Control>
//           </div>
//         </Form.Group>

        
//         {/* Bank Loan */}
//         <Form.Group controlId="bankLoan">
//           <div className="input-card">
//             <FaMoneyBill className="input-icon" />
//             <Form.Control
//               as="select"
//               value={bankLoan}
//               onChange={(e) => setBankLoan(e.target.value)}
//               className="form-input"
//             >
//               <option value=""> Bank Loan Availability</option>
//               <option value="Yes">Yes</option>
//               <option value="No">No</option>
//             </Form.Control>
//           </div>
//         </Form.Group>

                   
//         <Form.Group controlId="propertyAge">
//           <div className="input-card">
//             <FaCalendarAlt className="input-icon" />
//             <Form.Control
//               as="select"
//               value={propertyAge}
//               onChange={(e) => setPropertyAge(e.target.value)}
//               className="form-input"
//             >
//               <option value="">Select Property Age</option>
//             <option value="Newly Build">Newly Built</option>
//             <option value="2 Years">2 Years</option>
//             <option value="3 Years">3 Years</option>
//             <option value="4 Years">4 Years</option>
//             <option value="5 Years">5 Years</option>
//             <option value="6 Years">6 Years</option>
//             <option value="7 Years">7 Years</option>
//             <option value="8 Years">8 Years</option>
//             <option value="9 Years">9 Years</option>
//             <option value="10 Years">10 Years</option>
//             <option value="11 Years">11 Years</option>
//             <option value="12 Years">12 Years</option>
//             <option value="13 Years">13 Years</option>
//             <option value="14 Years">14 Years</option>
//             <option value="15 Years">15 Years</option>
//             <option value="16 Years">16 Years</option>
//             <option value="17 Years">17 Years</option>
//             <option value="18 Years">18 Years</option>
//             <option value="19 Years">19 Years</option>
//             <option value="20 Years">20 Years</option>
//             <option value="20+ Years">20+ Years</option>
//             </Form.Control>
//           </div>
//         </Form.Group>

//         {/* Bedrooms */}
//         <Form.Group controlId="bedrooms">
//           <div className="input-card">
//             <FaBed className="input-icon" />
//             <Form.Control
//             as="select"
//               value={bedrooms}
//               onChange={(e) => setBedrooms(e.target.value)}
//               className="form-input"
//             >
//             <option value="">Select BedRooms </option>
//                         <option value="No">No</option>
//                         <option value="1">1</option>
//                         <option value="2">2</option>
//                         <option value="3">3</option>
//                         <option value="4">4</option>
//                         <option value="5">5</option>
//                         <option value="6">6</option>
//                         <option value="7">7</option>
//                         <option value="8">8</option>
//                         <option value="9">9</option>
//                         <option value="10">10</option>
//                         <option value="11">11</option>
//                         <option value="12">12</option>
//                         <option value="13">13</option>
//                         <option value="14">14</option>
//                         <option value="15">15</option>
//                         <option value="16">16</option>
//                         <option value="17">17</option>
//                         <option value="18">18</option>
//                         <option value="19">19</option>
//                         <option value="20">20</option>
//                         <option value="20+">20+</option>
//                         </Form.Control>
//           </div>
          
//         </Form.Group>

//                 </div>
//               )}

             

// {currentStep >= 3 && (
//                 <div>

//         {/* Floor Number */}
//         <Form.Group controlId="floorNo">
//           <div className="input-card">
//             <BsBuildingsFill className="input-icon" />
//             <Form.Control
//               as="select"
//               value={floorNo}
//               onChange={(e) => setFloorNo(e.target.value)}
//               className="form-input"
//               >
//               <option value="">Select No.Of Floors </option>
//               <option value="UnderGround">UnderGround</option>
//                         <option value="GroundFloor">Ground Floor</option>
//                         <option value="1">1</option>
//                         <option value="2">2</option>
//                         <option value="3">3</option>
//                         <option value="4">4</option>
//                         <option value="5">5</option>
//                         <option value="6">6</option>
//                         <option value="7">7</option>
//                         <option value="8">8</option>
//                         <option value="9">9</option>
//                         <option value="10">10</option>
//                         <option value="11">11</option>
//                         <option value="12">12</option>
//                         <option value="13">13</option>
//                         <option value="14">14</option>
//                         <option value="15">15</option>
//                         <option value="16">16</option>
//                         <option value="17">17</option>
//                         <option value="18">18</option>
//                         <option value="19">19</option>
//                         <option value="20">20</option>
//                         <option value="20+">20+</option>
//                         </Form.Control>
//           </div>
//         </Form.Group>


        
// <Form.Group controlId="attachedBathrooms">
//   <div className="input-card">
//     <FaBath className="input-icon" />
//     <Form.Control
//       as="select"
//       value={attachedBathrooms}
//       onChange={(e) => setAttachedBathrooms(e.target.value)}
//       className="form-input"
//     >
//       <option value="">Select Attached Bathrooms</option>
//       <option value="No">No</option>
//       <option value="1">1</option>
//       <option value="2">2</option>
//       <option value="3">3</option>
//       <option value="4">4</option>
//       <option value="5">5</option>
//       <option value="6">6</option>
//       <option value="7">7</option>
//       <option value="8">8</option>
//       <option value="9">9</option>
//       <option value="10">10</option>
//       <option value="10+">10+</option>
//     </Form.Control>
//   </div>
// </Form.Group>


// <Form.Group controlId="western">
//   <div className="input-card">
//     <FaBath className="input-icon" />
//     <Form.Control
//       as="select"
//       value={western}
//       onChange={(e) => setWestern(e.target.value)}
//       className="form-input"
//     >
//       <option value="">Select Western Toilets</option>
//       <option value="No">No</option>
//       <option value="1">1</option>
//       <option value="2">2</option>
//       <option value="3">3</option>
//       <option value="4">4</option>
//       <option value="5">5</option>
//       <option value="6">6</option>
//       <option value="7">7</option>
//       <option value="8">8</option>
//       <option value="9">9</option>
//       <option value="10">10</option>
//       <option value="10+">10+</option>
//     </Form.Control>
//   </div>
// </Form.Group>



// <Form.Group controlId="carParking">
//   <div className="input-card">
//     <FaCar className="input-icon" />
//     <Form.Control
//       as="select"
//       value={carParking}
//       onChange={(e) => setCarParking(e.target.value)}
//       className="form-input"
//     >
//       <option value="">Car Parking</option>
//       <option value="Yes">Yes</option>
//       <option value="No">No</option>
//     </Form.Control>
//   </div>
// </Form.Group>

// <Form.Group controlId="furnished">
//   <div className="input-card">
//     <FaHome className="input-icon" />
//     <Form.Control
//       as="select"
//       value={furnished}
//       onChange={(e) => setFurnished(e.target.value)}
//       className="form-input"
//     >
//       <option value="">Select Furnishing Status</option>
//       <option value="Furnished">Furnished</option>
//       <option value="Unfurnished">Unfurnished</option>
//       <option value="Semi-Furnished">Semi-Furnished</option>
//     </Form.Control>
//   </div>
// </Form.Group>

// <Form.Group controlId="lift">
//   <div className="input-card">
//     <FaBuilding className="input-icon" />
//     <Form.Control
//       as="select"
//       value={lift}
//       onChange={(e) => setLift(e.target.value)}
//       className="form-input"
//     >
//       <option value="">Lift Available</option>
//       <option value="Yes">Yes</option>
//       <option value="No">No</option>
//       <option value="Closed">Closed</option>
//     </Form.Control>
//   </div>
// </Form.Group>

//                 </div>
//               )}


// {currentStep >= 4 && (
//   <div>

//         {/* Kitchen */}
//         <Form.Group controlId="kitchen">
//           <div className="input-card">
//             <FaKitchenSet className="input-icon" />
//             <Form.Control
//               as="select"
//               value={kitchen}
//               onChange={(e) => setKitchen(e.target.value)}
//               className="form-input"
//             >
//               <option value="">Select Kitchen</option>
//               <option value="Yes">Yes</option>
//               <option value="No">No</option>
//             </Form.Control>
//           </div>
//         </Form.Group>


//         <Form.Group controlId="kitchenType">
//   <div className="input-card">
//     <FaKitchenSet className="input-icon" />
//     <Form.Control
//       as="select"
//       value={kitchenType}
//       onChange={(e) => setKitchenType(e.target.value)}
//       className="form-input"
//     >
//       <option value="">Select Kitchen Type</option>
//       <option value="Modular">Modular</option>
//       <option value="Normal">Normal</option>
//       <option value="No">No</option>
//     </Form.Control>
//   </div>
// </Form.Group>

// <Form.Group controlId="balconies">
//   <div className="input-card">
//     <FaRegBuilding className="input-icon" />
//     <Form.Control
//       as="select"
//       value={balconies}
//       onChange={(e) => setBalconies(e.target.value)}
//       className="form-input"
//     >
//                         <option value="">Select Number of Balconies</option>
//                         <option value="No">No</option>
//                         <option value="1 Balcony">1 Balcony</option>
//                         <option value="2 Balconies">2 Balconies</option>
//                         <option value="3 Balconies">3 Balconies</option>
//                         <option value="4 Balconies">4 Balconies</option>
//                         <option value="5 Balconies">5 Balconies</option>
//                         <option value="6 Balcony">6 Balcony</option>
//                         <option value="7 Balconies">7 Balconies</option>
//                         <option value="8 Balconies">8 Balconies</option>
//                         <option value="9 Balconies">9 Balconies</option>
//                         <option value="10 Balconies">10 Balconies</option>
//                         <option value="10+ Balconies">10+ Balconies</option>
//     </Form.Control>
//   </div>
// </Form.Group>

// {/* Facing */}
// <Form.Group controlId="facing">
//   <div className="input-card">
//     <GiHouse className="input-icon" />
//     <Form.Control
//       as="select"
//       value={facing}
//       onChange={(e) => setFacing(e.target.value)}
//       className="form-input"
//     >
//       <option value="">Select Facing</option>
//       {[
//         'North',
//         'South',
//         'East',
//         'West',
//         'North-East',
//         'South-East',
//         'North-West',
//         'South-West',
//       ].map((direction) => (
//         <option key={direction} value={direction}>
//           {direction}
//         </option>
//       ))}
//     </Form.Control>
//   </div>
// </Form.Group>



// <Form.Group controlId="salesMode">
//   <div className="input-card">
//     <GiGears  className="input-icon" />
//     <Form.Control
//       as="select"
//       value={salesMode}
//       onChange={(e) => setSalesMode(e.target.value)}
//       className="form-input"
//     >
//       <option value="">Select Sales Mode</option>
//       <option value="Full Payment">Full Payment</option>
//       <option value="Partial Payment">Partial Payment</option>
//     </Form.Control>
//   </div>
// </Form.Group>

// <Form.Group controlId="salesType">
//   <div className="input-card">
//     <FaRegBuilding className="input-icon" />
//     <Form.Control
//       as="select"
//       value={salesType}
//       onChange={(e) => setSalesType(e.target.value)}
//       className="form-input"
//     >
//       <option value="">Select Sales Type</option>
//       <option value="Normal">Normal</option>
//       <option value="Urgent">Urgent</option>
//     </Form.Control>
//   </div>
// </Form.Group>

//  {/* Posted By */}
//  <Form.Group controlId="postedBy">
//           <div className="input-card">
//             <FaUserAlt className="input-icon" />
//             <Form.Control
//               as="select"
//               value={postedBy}
//               onChange={(e) => setPostedBy(e.target.value)}
//               className="form-input"
//             >
//             <option value="">Posted By </option>
//                         <option value="Owner">Owner</option>
//                         <option value="Agent">Agent</option>
//                         <option value="Builder">Builder</option>
//                         </Form.Control>
//           </div>
//         </Form.Group>

//            {/* Description */}
//            <Form.Group controlId="description">
//             <Form.Label style={{color:"rgb(47,116,127)",fontWeight:"bold"}}> Property Description </Form.Label>
//           <div className="input-card">
//             <Form.Control
//               as="textarea"
//               rows={5}
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="form-input h-25"
//               placeholder="What makes your add unique (maximum 200 characters)"
//               maxLength={200} 
//             />
//           </div>
//         </Form.Group>


//   </div>
// )}



// {currentStep >= 5 && (
//   <div>
    
// <div  style={{
//       color: "rgb(47,116,127)",
//       fontWeight: "bold",
//       marginBottom:"10px"
//     }}> Property Address </div>

// <Form.Group controlId="state">
//   <div className="input-card">
//     <FaMapSigns className="input-icon" />
//     <Form.Control
//       type="text"
//       value={state}
//       onChange={(e) => setState(e.target.value)}
//       className="form-input"
//       placeholder="Enter State"
//     />
//   </div>
// </Form.Group>

// <Form.Group controlId="city">
//   <div className="input-card">
//     <FaMapMarkerAlt className="input-icon" />
//     <Form.Control
//       type="text"
//       value={city}
//       onChange={(e) => setCity(e.target.value)}
//       className="form-input"
//       placeholder="Enter City"
//     />
//   </div>
// </Form.Group>


// <Form.Group controlId="country">
//   <div className="input-card">
//     <FaCity className="input-icon" />
//     <Form.Control
//       type="text"
//       value={area}
//       onChange={(e) => setArea(e.target.value)}
//       className="form-input"
//       placeholder="Enter Area"
//     />
//   </div>
// </Form.Group>

// <Form.Group controlId="district">
//   <div className="input-card">
//     <FaRegAddressCard className="input-icon" />
//     <Form.Control
//       type="text"
//       value={district}
//       onChange={(e) => setDistrict(e.target.value)}
//       className="form-input"
//       placeholder="Enter District"
//     />
//   </div>
// </Form.Group>


// <Form.Group controlId="nagar">
//   <div className="input-card">
//     <FaRegAddressCard className="input-icon" />
//     <Form.Control
//       type="text"
//       value={nagar}
//       onChange={(e) => setNagar(e.target.value)}
//       className="form-input"
//       placeholder="Enter Nagar"
//     />
//   </div>
// </Form.Group>


// <Form.Group controlId="streetName">
//   <div className="input-card">
//     <FaRegAddressCard className="input-icon" />
//     <Form.Control
//       type="text"
//       value={streetName}
//       onChange={(e) => setStreetName(e.target.value)}
//       className="form-input"
//       placeholder="Enter Street Name"
//     />
//   </div>
// </Form.Group>

// <Form.Group controlId="doorNumber">
//   <div className="input-card">
//     <FaRegAddressCard className="input-icon" />
//     <Form.Control
//       type="text"
//       value={doorNumber}
//       onChange={(e) => setDoorNumber(e.target.value)}
//       className="form-input"
//       placeholder="Enter Door Number"
//     />
//   </div>
// </Form.Group>

//   </div>
// )}



// {currentStep >= 6 && (
//   <div>
// <div  style={{
//       color: "rgb(47,116,127)",
//       fontWeight: "bold",
//       marginBottom:"10px"
//     }}> Owner Info </div>

// <Form.Group controlId="ownerName">
//   <div className="input-card">
//     <FaUserAlt className="input-icon" />
//     <Form.Control
//       type="text"
//       value={ownerName}
//       onChange={(e) => setOwnerName(e.target.value)}
//       className="form-input"
//       placeholder="Enter Owner Name"
//     />
//   </div>
// </Form.Group>

// <Form.Group controlId="email">
//   <div className="input-card">
//     <FaEnvelope className="input-icon" />
//     <Form.Control
//       type="email"
//       value={email}
//       onChange={(e) => setEmail(e.target.value)}
//       className="form-input"
//       placeholder="Enter Email"
//     />
//   </div>
// </Form.Group>



// <Form.Group controlId="phone">
//                 <div className="input-card">
//                   <FaPhoneAlt className="input-icon" />
//                   <Form.Control
//                     type="text"
//                     value={phoneNumber}
//                     readOnly
//                     placeholder="Phone Number"
//                     className="form-input"
//                     disabled
//                   />
//                 </div>
//               </Form.Group>


// <Form.Group controlId="bestTimeToCall">
//   <div className="input-card">
//     <FaClock className="input-icon" />
//     <Form.Control
//       as="select"
//       value={bestTimeToCall}
//       onChange={(e) => setBestTimeToCall(e.target.value)}
//       className="form-input"
//     >
//       <option value="">Select Best Time to Call</option>
//       <option value="AnyTime">Any Time</option>
//       <option value="Morning">Morning</option>
//       <option value="Afternoon">Afternoon</option>
//       <option value="Evening">Evening</option>
//     </Form.Control>
//   </div>
// </Form.Group>


//   </div>
// )}


// {currentStep >= 7 && (
//   <div>

// <div  style={{
//       color: "rgb(47,116,127)",
//       fontWeight: "bold",
//       marginBottom:"10px"
//     }}> Rent Info </div>

// <Form.Group controlId="rentAmount">
//   <div className="input-card">
//     <FaMoneyBill  className="input-icon" />
//     <Form.Control
//       type="number"
//       value={rentAmount}
//       onChange={(e) => setRentAmount(e.target.value)}
//       className="form-input"
//       placeholder="Enter Rent Amount"
//     />
//   </div>
// </Form.Group>


// <Form.Group controlId="rentSecurityAmount">
//   <div className="input-card">
//     <FaDollarSign  className="input-icon" />
//     <Form.Control
//       type="number"
//       value={rentSecurityAmount}
//       onChange={(e) => setRentSecurityAmount(e.target.value)}
//       className="form-input"
//       placeholder="Enter Rent Security Amount"
//     />
//   </div>
// </Form.Group>

// <Form.Group controlId="rentMaintenanceCharge">
//   <div className="input-card">
//     <FaTools  className="input-icon" />
//     <Form.Control
//       type="number"
//       value={rentMaintenanceCharge}
//       onChange={(e) => setRentMaintenanceCharge(e.target.value)}
//       className="form-input"
//       placeholder="Enter Maintenance Charge"
//     />
//   </div>
// </Form.Group>

// <Form.Group controlId="maintancePer">
//   <div className="input-card">
//     <FaTools  className="input-icon" />
//     <Form.Control
//       as="select"
//       value={maintancePer}
//       onChange={(e) => setMaintancePer(e.target.value)}
//       className="form-input"
//     >
//       <option value="">Select Maintenance Period</option>
//       <option value="Monthly">Monthly</option>
//       <option value="Yearly">Yearly</option>
//       <option value="Quarterly">Quarterly</option>
//       <option value="One-Time">One-Time</option>
//     </Form.Control>
//   </div>
// </Form.Group>

//   </div>
// )}

//         {/* Show "Show More" button */}
//                <div className="text-center mt-4">
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
              
// {currentStep > 7 && (
//                 <Button
//                   type="submit"
//                   style={{ marginTop: '15px',backgroundColor:"rgb(47,116,127)" }}
//                 >
//                   Submit Property
//                 </Button>
//               )}
            
//             </Form>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default AddProperties;


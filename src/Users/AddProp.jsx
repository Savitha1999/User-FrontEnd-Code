


















// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Button, Form } from 'react-bootstrap';
// import axios from 'axios';
// import { FaFileVideo } from 'react-icons/fa'; // Icon for video upload


// const AddProp = () => {
//   const location = useLocation();
//   const { ppcId, phoneNumber } = location.state || {};
//   // const [propertyDetails, setPropertyDetails] = useState({
//   //   propertyMode: '',
//   //   propertyType: '',
//   //   price:'',
//   //   propertyAge: '',
//   //   bankLoan: '',
//   //   negotiation: '',
//   //   length: '',
//   //   breadth: '',
//   //   totalArea: '',
//   //   ownership: '',
//   //   bedrooms: '',
//   //   kitchen: '',
//   //   kitchenType: '',
//   //   balconies: '',
//   //   floorNo: '',
//   //   areaUnit: '',
//   //   propertyApproved: '',
//   //   postedBy: '',
//   //   facing: '',
//   //   salesMode: '',
//   //   salesType: '',
//   //   description: '',
//   //   furnished: '',
//   //   lift: '',
//   //   attachedBathrooms: '',
//   //   western: '',
//   //   numberOfFloors: '',
//   //   carParking: '',
//   //   rentalPropertyAddress: '',
//   // country: '',
//   // state: '',
//   // city: '',
//   // district: '',
//   // area: '',
//   // streetName: '',
//   // doorNumber: '',
//   // nagar: '',
//   // ownerName: '',
//   // email: '',
//   // bestTimeToCall: '',
//   // });



  
//   // // Handle property details input change
//   // const handleInputChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setPropertyDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
//   // };




//   // Retrieve form data from localStorage or initialize with default values
//   const getStoredData = () => {
//     const storedData = localStorage.getItem('propertyDetails');
//     return storedData ? JSON.parse(storedData) : {
//       propertyMode: '',
//       propertyType: '',
//       price: '',
//       propertyAge: '',
//       bankLoan: '',
//       negotiation: '',
//       length: '',
//       breadth: '',
//       totalArea: '',
//       ownership: '',
//       bedrooms: '',
//       kitchen: '',
//       kitchenType: '',
//       balconies: '',
//       floorNo: '',
//       areaUnit: '',
//       propertyApproved: '',
//       postedBy: '',
//       facing: '',
//       salesMode: '',
//       salesType: '',
//       description: '',
//       furnished: '',
//       lift: '',
//       attachedBathrooms: '',
//       western: '',
//       numberOfFloors: '',
//       carParking: '',
//       rentalPropertyAddress: '',
//     country: '',
//     state: '',
//     city: '',
//     district: '',
//     area: '',
//     streetName: '',
//     doorNumber: '',
//     nagar: '',
//       ownerName: '',
//       email: '',
//       bestTimeToCall: '',
//     };
//   };



//   const [propertyDetails, setPropertyDetails] = useState(getStoredData);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     const updatedDetails = { ...propertyDetails, [name]: value };
//     setPropertyDetails(updatedDetails);

//     // Save updated data to localStorage
//     localStorage.setItem('propertyDetails', JSON.stringify(updatedDetails));
//   };


//   const [isPreview, setIsPreview] = useState(false);

//   const handlePreview = () => {
//     setIsPreview(!isPreview);
//   };


//   const [photos, setPhotos] = useState([]);
//   const [video, setVideo] = useState(null);






//   // Handle photo uploads
//   const handlePhotoUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const maxSize = 10 * 1024 * 1024; // 10MB file size limit

//     // Check if the file size is within the limit
//     for (let file of files) {
//       if (file.size > maxSize) {
//         alert('File size exceeds the 10MB limit');
//         return;
//       }
//     }

//     // Check if the number of photos exceeds the limit (5 photos)
//     if (photos.length + files.length <= 5) {
//       setPhotos([...photos, ...files]);
//     } else {
//       alert('Maximum 5 photos can be uploaded.');
//     }
//   };

//   // Remove a photo from the list
//   const removePhoto = (index) => {
//     setPhotos(photos.filter((_, i) => i !== index));
//   };

//   // Handle video file change with size validation
//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     const maxSize = 50 * 1024 * 1024; // 50MB file size limit

//     if (file.size > maxSize) {
//       alert('File size exceeds the 50MB limit');
//       return;
//     }

//     setVideo(file);
//   };

//   // Remove the selected video
// const removeVideo = () => {
//   setVideo(null);
// };

//   // Submit the form data (photos and video) to the backend
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();

//     // Add video and photos to FormData
//     if (video) {
//       formData.append('video', video);
//     }
//     photos.forEach((photo) => formData.append('photos', photo));

//     // Add property details to FormData
//     formData.append('ppcId', ppcId);
//     formData.append('phoneNumber', phoneNumber);
//     formData.append('propertyMode', propertyDetails.propertyMode);
//     formData.append('propertyType', propertyDetails.propertyType);
//     formData.append('price', propertyDetails.price);
//         formData.append('propertyAge', propertyDetails.propertyAge);
//         formData.append('bankLoan', propertyDetails.bankLoan);
//         formData.append('negotiation', propertyDetails.negotiation);
//         formData.append('length', propertyDetails.length);
//         formData.append('breadth', propertyDetails.breadth);
//         formData.append('totalArea', propertyDetails.totalArea);
//         formData.append('ownership', propertyDetails.ownership);
//         formData.append('bedrooms', propertyDetails.bedrooms);
//         formData.append('kitchen', propertyDetails.kitchen);
//         formData.append('kitchenType', propertyDetails.kitchenType);
//         formData.append('balconies', propertyDetails.balconies);
//         formData.append('floorNo', propertyDetails.floorNo);
//         formData.append('areaUnit', propertyDetails.areaUnit);
//         formData.append('propertyApproved', propertyDetails.propertyApproved);
//         formData.append('postedBy', propertyDetails.postedBy);
//         formData.append('facing', propertyDetails.facing);
//         formData.append('salesMode', propertyDetails.salesMode);
//         formData.append('salesType', propertyDetails.salesType);
//         formData.append('description', propertyDetails.description);
//         formData.append('furnished', propertyDetails.furnished);
//         formData.append('lift', propertyDetails.lift);
//         formData.append('attachedBathrooms', propertyDetails.attachedBathrooms);
//         formData.append('western', propertyDetails.western);
//         formData.append('numberOfFloors', propertyDetails.numberOfFloors);
//         formData.append('carParking', propertyDetails.carParking);
//         formData.append('rentalPropertyAddress', propertyDetails.rentalPropertyAddress);
//         formData.append('country', propertyDetails.country);
//         formData.append('state', propertyDetails.state);
//         formData.append('city', propertyDetails.city);
//         formData.append('district', propertyDetails.district);
//         formData.append('area', propertyDetails.area);
//         formData.append('streetName', propertyDetails.streetName);
//         formData.append('doorNumber', propertyDetails.doorNumber);
//         formData.append('nagar', propertyDetails.nagar);
//         formData.append('ownerName', propertyDetails.ownerName);
//         formData.append('email', propertyDetails.email);
//         formData.append('phoneNumber', propertyDetails.phoneNumber);
//         formData.append('alternatePhone', propertyDetails.alternatePhone);
//         formData.append('bestTimeToCall', propertyDetails.bestTimeToCall);

//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/update-property`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data', // Necessary for file uploads
//         },
//       });

//       if (response.status === 200) {
//         alert('Property details updated successfully!');
//       }
//     } catch (error) {
//       console.error('Error updating property details:', error);
//       alert('Failed to update property details. Please try again.');
//     }
//   };



//   return (
//     <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
//       <h1>Add Property Details</h1>
//       <p>PPC-ID: {ppcId}</p>
//       <p>Phone Number: {phoneNumber}</p>
     
//       {!isPreview ? (

//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3" controlId="propertyMode">
//           <Form.Label>Property Mode</Form.Label>
//           <Form.Control
//             as="select"
//             name="propertyMode"
//             value={propertyDetails.propertyMode}
//             onChange={handleInputChange}
//             required
//           >
//             <option value="">Select Mode</option>
//             <option value="Residential">Residential</option>
//             <option value="Commercial">Commercial</option>
//             <option value="Agricultural">Agricultural</option>
//             <option value="Rent">Rent</option>
//           </Form.Control>
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="propertyType">
//   <Form.Label>Property Type</Form.Label>
//   <Form.Control
//     as="select" // Use "as" prop to render a dropdown
//     name="propertyType"
//     value={propertyDetails.propertyType}
//     onChange={handleInputChange}
//   >
//     <option value="">Select Property Type</option>
//     {/* Residential Property Types */}
//     <optgroup label="Residential Property Types">
//       <option value="Flat/ Apartment">Flat/ Apartment</option>
//       <option value="Residential House">Residential House</option>
//       <option value="Villa">Villa</option>
//       <option value="Builder Floor Apartment">Builder Floor Apartment</option>
//       <option value="Penthouse">Penthouse</option>
//       <option value="Studio Apartment">Studio Apartment</option>
//       <option value="Service Apartment">Service Apartment</option>
//     </optgroup>

//     {/* Commercial Property Types */}
//     <optgroup label="Commercial Property Types">
//       <option value="Commercial Office Space">Commercial Office Space</option>
//       <option value="Office in IT Park/ SEZ">Office in IT Park/ SEZ</option>
//       <option value="Commercial Shop">Commercial Shop</option>
//       <option value="Commercial Showroom">Commercial Showroom</option>
//       <option value="Commercial Land">Commercial Land</option>
//       <option value="Warehouse/ Godown">Warehouse/ Godown</option>
//       <option value="Industrial Land">Industrial Land</option>
//       <option value="Industrial Building">Industrial Building</option>
//       <option value="Industrial Shed">Industrial Shed</option>
//     </optgroup>

//     {/* Agricultural Property Types */}
//     <optgroup label="Agricultural Property Types">
//       <option value="Agricultural Land">Agricultural Land</option>
//       <option value="Farm House">Farm House</option>
//     </optgroup>
//   </Form.Control>
// </Form.Group>


//         {/* Photo Upload Section */}
//         <div className="text-start mb-3">
//           <label htmlFor="photo-upload" className="btn rounded-0 photoupload" style={{ background: '#73C2FB', color: '#ffffff', fontWeight: 'bold' }}>
//             <i className="bi bi-image me-2"></i> Upload Photos
//           </label>
//           <input
//             id="photo-upload"
//             type="file"
//             multiple
//             accept="image/*"
//             className="form-control d-none"
//             onChange={handlePhotoUpload}
//           />
//         </div>

//         {/* Display selected photos */}
//         <div className="addpropertyphoto mb-3 p-3" style={{ display: 'grid', gap: '10px', gridTemplateColumns: `repeat(${window.innerWidth > 1200 ? 5 : window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : window.innerWidth > 576 ? 2 : 1}, 1fr)` }}>
//           {photos.map((photo, index) => (
//             <div key={index} style={{ textAlign: 'center' }}>
//               <img src={URL.createObjectURL(photo)} alt="Uploaded" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
//               <p style={{ color: 'red', cursor: 'pointer' }} onClick={() => removePhoto(index)}>Remove</p>
//             </div>
//           ))}
//         </div>



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




// <Form.Group className="mb-3" controlId="price">
//   <Form.Label>Price</Form.Label>
//   <Form.Control
//     type="number"
//     name="price"
//     value={propertyDetails.price}  // This binds the value from the state
//     onChange={handleInputChange}    // Handle change for input
//     placeholder="Enter the price"  // Placeholder text
//   />
// </Form.Group>



//         <Form.Group className="mb-3" controlId="propertyAge">
//   <Form.Label>Property Age</Form.Label>
//   <Form.Control
//     as="select"
//     name="propertyAge"
//     value={propertyDetails.propertyAge}
//     onChange={handleInputChange}
    
//   >
//     <option value="">Select Option</option>
//     <option value="Newly Build">Newly Build</option>
//     <option value="2 Years">2 Years</option>
//     <option value="3 Years">3 Years</option>
//     <option value="4 Years">4 Years</option>
//     <option value="5 Years">5 Years</option>
//     <option value="6 Years">6 Years</option>
//     <option value="7 Years">7 Years</option>
//     <option value="8 Years">8 Years</option>
//     <option value="9 Years">9 Years</option>
//     <option value="10 Years">10 Years</option>
//     <option value="11 Years">11 Years</option>
//     <option value="12 Years">12 Years</option>
//     <option value="13 Years">13 Years</option>
//     <option value="14 Years">14 Years</option>
//     <option value="15 Years">15 Years</option>
//     <option value="16 Years">16 Years</option>
//     <option value="17 Years">17 Years</option>
//     <option value="18 Years">18 Years</option>
//     <option value="19 Years">19 Years</option>
//     <option value="20 Years">20 Years</option>
//     <option value="20+ Years">20+ Years</option>
//   </Form.Control>
// </Form.Group>


//         <Form.Group className="mb-3" controlId="bankLoan">
//           <Form.Label>Bank Loan</Form.Label>
//           <Form.Control
//             as="select"
//             name="bankLoan"
//             value={propertyDetails.bankLoan}
//             onChange={handleInputChange}
//           >
//             <option value="">Select Option</option>
//             <option value="Yes">Yes</option>
//             <option value="No">No</option>
//           </Form.Control>
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="negotiation">
//           <Form.Label>Negotiation</Form.Label>
//           <Form.Control
//             as="select"
//             name="negotiation"
//             value={propertyDetails.negotiation}
//             onChange={handleInputChange}
//           >
//             <option value="">Select Option</option>
//             <option value="Yes">Yes</option>
//             <option value="No">No</option>
//           </Form.Control>
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="length">
//           <Form.Label>Length</Form.Label>
//           <Form.Control
//             type="number"
//             name="length"
//             value={propertyDetails.length}
//             onChange={handleInputChange}
//             placeholder="Enter length in meters"
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="breadth">
//           <Form.Label>Breadth</Form.Label>
//           <Form.Control
//             type="number"
//             name="breadth"
//             value={propertyDetails.breadth}
//             onChange={handleInputChange}
//             placeholder="Enter breadth in meters"
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="totalArea">
//           <Form.Label>Total Area</Form.Label>
//           <Form.Control
//             type="number"
//             name="totalArea"
//             value={propertyDetails.totalArea}
//             onChange={handleInputChange}
//             placeholder="Enter total area in square meters"
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="ownership">
//           <Form.Label>Ownership</Form.Label>
//           <Form.Control
//             as="select"
//             name="ownership"
//             value={propertyDetails.ownership}
//             onChange={handleInputChange}
//           >
//             <option value="">Select Ownership</option>
//             <option value="Single Owner">Single Owner</option>
//             <option value="Multiple Owner">Multiple Owner</option>
//             <option value="Power Of Attorney">Power Of Attorney</option>
//           </Form.Control>
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="bedrooms">
//   <Form.Label>Bedrooms</Form.Label>
//   <Form.Control
//     as="select"
//     name="bedrooms"
//     value={propertyDetails.bedrooms}
//     onChange={handleInputChange}
//   >
//     <option value="">Select number of bedrooms</option>
//     <option value="No">No</option>
//     <option value="1">1</option>
//     <option value="2">2</option>
//     <option value="3">3</option>
//     <option value="4">4</option>
//     <option value="5">5</option>
//     <option value="6">6</option>
//     <option value="7">7</option>
//     <option value="8">8</option>
//     <option value="9">9</option>
//     <option value="10">10</option>
//     <option value="11">11</option>
//     <option value="12">12</option>
//     <option value="13">13</option>
//     <option value="14">14</option>
//     <option value="15">15</option>
//     <option value="16">16</option>
//     <option value="17">17</option>
//     <option value="18">18</option>
//     <option value="19">19</option>
//     <option value="20">20</option>
//     <option value="20+">20+</option>
//   </Form.Control>
// </Form.Group>


//         <Form.Group className="mb-3" controlId="kitchen">
//           <Form.Label>Kitchen</Form.Label>
//           <Form.Control
//             as="select"
//             name="kitchen"
//             value={propertyDetails.kitchen}
//             onChange={handleInputChange}
//           >
//             <option value="">Select Option</option>
//             <option value="Yes">Yes</option>
//             <option value="No">No</option>
//           </Form.Control>
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="kitchenType">
//           <Form.Label>Kitchen Type</Form.Label>
//           <Form.Control
//             as="select"
//             name="kitchenType"
//             value={propertyDetails.kitchenType}
//             onChange={handleInputChange}
//           >
//             <option value="">Select Type</option>
//             <option value="Modular">Modular</option>
//             <option value="Normal">Normal</option>
//             <option value="No">No</option>
//           </Form.Control>
//         </Form.Group>

//          {/* Balconies */}
//          <Form.Group className="mb-3" controlId="balconies">
//           <Form.Label>Balconies</Form.Label>
//           <Form.Control
//             as="select"
//             name="balconies"
//             value={propertyDetails.balconies}
//             onChange={handleInputChange}
//           >
//             <option value="">Select Number of Balconies</option>
//             {['No', '1 Balcony', '2 Balconies', '3 Balconies', '4 Balconies', '5 Balconies', '6 Balcony', '7 Balconies', '8 Balconies', '9 Balconies', '10 Balconies', '10+ Balconies'].map((option) => (
//               <option key={option} value={option}>{option}</option>
//             ))}
//           </Form.Control>
//         </Form.Group>

//         {/* Floor Number */}
//         <Form.Group className="mb-3" controlId="floorNo">
//           <Form.Label>Floor Number</Form.Label>
//           <Form.Control
//             as="select"
//             name="floorNo"
//             value={propertyDetails.floorNo}
//             onChange={handleInputChange}
//           >
//             <option value="">Select Floor Number</option>
//             {['Lower Basement', 'Upper Basement', 'Ground Floor', 'Top Floor', '1st Floor', '2nd Floor', '3rd Floor', '4th Floor', '5th Floor', '6th Floor', '7th Floor', '8th Floor', '9th Floor', '10th Floor'].map((option) => (
//               <option key={option} value={option}>{option}</option>
//             ))}
//           </Form.Control>
//         </Form.Group>

//         {/* Area Unit */}
//         <Form.Group className="mb-3" controlId="areaUnit">
//           <Form.Label>Area Unit</Form.Label>
//           <Form.Control
//             as="select"
//             name="areaUnit"
//             value={propertyDetails.areaUnit}
//             onChange={handleInputChange}
//           >
//             <option value="">Select Area Unit</option>
//             {['sq.ft', 'sq.meter', 'cent', 'Acre', 'Hectare'].map((option) => (
//               <option key={option} value={option}>{option}</option>
//             ))}
//           </Form.Control>
//         </Form.Group>

//         {/* Property Approved */}
//         <Form.Group className="mb-3" controlId="propertyApproved">
//           <Form.Label>Property Approved</Form.Label>
//           <Form.Control
//             as="select"
//             name="propertyApproved"
//             value={propertyDetails.propertyApproved}
//             onChange={handleInputChange}
//           >
//             <option value="">Select Option</option>
//             <option value="Yes">Yes</option>
//             <option value="No">No</option>
//           </Form.Control>
//         </Form.Group>

//         {/* Posted By */}
//         <Form.Group className="mb-3" controlId="postedBy">
//           <Form.Label>Posted By</Form.Label>
//           <Form.Control
//             as="select"
//             name="postedBy"
//             value={propertyDetails.postedBy}
//             onChange={handleInputChange}
//           >
//             <option value="">Select Option</option>
//             <option value="Owner">Owner</option>
//             <option value="Agent">Agent</option>
//             <option value="Builder">Builder</option>
//           </Form.Control>
//         </Form.Group>

//         {/* Facing */}
//         <Form.Group className="mb-3" controlId="facing">
//           <Form.Label>Facing</Form.Label>
//           <Form.Control
//             as="select"
//             name="facing"
//             value={propertyDetails.facing}
//             onChange={handleInputChange}
//           >
//             <option value="">Select Facing</option>
//             {['North', 'South', 'East', 'West', 'North-East', 'South-East', 'North-West', 'South-West', 'North-North-East', 'South-South-West', 'East-North-East', 'West-North-West'].map((option) => (
//               <option key={option} value={option}>{option}</option>
//             ))}
//           </Form.Control>
//         </Form.Group>

//         {/* Sales Mode */}
//         <Form.Group className="mb-3" controlId="salesMode">
//           <Form.Label>Sales Mode</Form.Label>
//           <Form.Control
//             as="select"
//             name="salesMode"
//             value={propertyDetails.salesMode}
//             onChange={handleInputChange}
//           >
//             <option value="">Select Sales Mode</option>
//             <option value="Full Payment">Full Payment</option>
//             <option value="Partial Payment">Partial Payment</option>
//           </Form.Control>
//         </Form.Group>

//         {/* Sales Type */}
//         <Form.Group className="mb-3" controlId="salesType">
//           <Form.Label>Sales Type</Form.Label>
//           <Form.Control
//             as="select"
//             name="salesType"
//             value={propertyDetails.salesType}
//             onChange={handleInputChange}
//           >
//             <option value="">Select Sales Type</option>
//             <option value="Normal">Normal</option>
//             <option value="Urgent">Urgent</option>
//           </Form.Control>
//         </Form.Group>

//         {/* Description */}
//         <Form.Group className="mb-3" controlId="description">
//           <Form.Label>Description</Form.Label>
//           <Form.Control
//             as="textarea"
//             name="description"
//             value={propertyDetails.description}
//             onChange={handleInputChange}
//             placeholder="Provide property description"
//           />
//         </Form.Group>

//         {/* Furnished */}
//         <Form.Group className="mb-3" controlId="furnished">
//           <Form.Label>Furnished</Form.Label>
//           <Form.Control
//             as="select"
//             name="furnished"
//             value={propertyDetails.furnished}
//             onChange={handleInputChange}
//           >
//             <option value="">Select Furnishing Status</option>
//             <option value="Furnished">Furnished</option>
//             <option value="Unfurnished">Unfurnished</option>
//             <option value="Semi-Furnished">Semi-Furnished</option>
//           </Form.Control>
//         </Form.Group>

//         {/* Lift */}
//         <Form.Group className="mb-3" controlId="lift">
//           <Form.Label>Lift</Form.Label>
//           <Form.Control
//             as="select"
//             name="lift"
//             value={propertyDetails.lift}
//             onChange={handleInputChange}
//           >
//             <option value="">Has Lift?</option>
//             <option value="Yes">Yes</option>
//             <option value="No">No</option>
//             <option value="Closed">Closed</option>
//           </Form.Control>
//         </Form.Group>

//         {/* Attached Bathrooms */}
//         <Form.Group className="mb-3" controlId="attachedBathrooms">
//           <Form.Label>Attached Bathrooms</Form.Label>
//           <Form.Control
//             as="select"
//             name="attachedBathrooms"
//             value={propertyDetails.attachedBathrooms}
//             onChange={handleInputChange}
//           >
//             <option value="">Select Attached Bathrooms</option>
//             {['No', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '10+'].map((option) => (
//               <option key={option} value={option}>{option}</option>
//             ))}
//           </Form.Control>
//         </Form.Group>

//         {/* Western Bathrooms */}
//         <Form.Group className="mb-3" controlId="western">
//           <Form.Label>Western Bathrooms</Form.Label>
//           <Form.Control
//             as="select"
//             name="western"
//             value={propertyDetails.western}
//             onChange={handleInputChange}
//           >
//             <option value="">Select Western Bathrooms</option>
//             {['No', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '10+'].map((option) => (
//               <option key={option} value={option}>{option}</option>
//             ))}
//           </Form.Control>
//         </Form.Group>

//         {/* Number of Floors */}
//         <Form.Group className="mb-3" controlId="numberOfFloors">
//           <Form.Label>Number of Floors</Form.Label>
//           <Form.Control
//             as="select"
//             name="numberOfFloors"
//             value={propertyDetails.numberOfFloors}
//             onChange={handleInputChange}
//           >
//             <option value="">Select Number of Floors</option>
//             {['UnderGround', 'GroundFloor', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '20+'].map((option) => (
//               <option key={option} value={option}>{option}</option>
//             ))}
//           </Form.Control>
//         </Form.Group>

//         {/* Car Parking */}
//         <Form.Group className="mb-3" controlId="carParking">
//           <Form.Label>Car Parking</Form.Label>
//           <Form.Control
//             as="select"
//             name="carParking"
//             value={propertyDetails.carParking}
//             onChange={handleInputChange}
//           >
//             <option value="">Select Car Parking</option>
//             <option value="Yes">Yes</option>
//             <option value="No">No</option>
//           </Form.Control>
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="rentalPropertyAddress">
//   <Form.Label>Rental Property Address</Form.Label>
//   <Form.Control
//     type="text"
//     name="rentalPropertyAddress"
//     value={propertyDetails.rentalPropertyAddress}
//     onChange={handleInputChange}
//     placeholder="Enter rental property address"
//   />
// </Form.Group>

// <Form.Group className="mb-3" controlId="country">
//   <Form.Label>Country</Form.Label>
//   <Form.Control
//     type="text"
//     name="country"
//     value={propertyDetails.country}
//     onChange={handleInputChange}
//     placeholder="Enter country"
//   />
// </Form.Group> 


// <Form.Group className="mb-3" controlId="state">
//   <Form.Label>State</Form.Label>
//   <Form.Control
//     type="text"
//     name="state"
//     value={propertyDetails.state}
//     onChange={handleInputChange}
//     placeholder="Enter state"
//   />
// </Form.Group>

// <Form.Group className="mb-3" controlId="city">
//   <Form.Label>City</Form.Label>
//   <Form.Control
//     type="text"
//     name="city"
//     value={propertyDetails.city}
//     onChange={handleInputChange}
//     placeholder="Enter city"
//   />
// </Form.Group>

// <Form.Group className="mb-3" controlId="district">
//   <Form.Label>District</Form.Label>
//   <Form.Control
//     type="text"
//     name="district"
//     value={propertyDetails.district}
//     onChange={handleInputChange}
//     placeholder="Enter district"
//   />
// </Form.Group>

// <Form.Group className="mb-3" controlId="area">
//   <Form.Label>Area</Form.Label>
//   <Form.Control
//     type="text"
//     name="area"
//     value={propertyDetails.area}
//     onChange={handleInputChange}
//     placeholder="Enter area"
//   />
// </Form.Group>

// <Form.Group className="mb-3" controlId="streetName">
//   <Form.Label>Street Name</Form.Label>
//   <Form.Control
//     type="text"
//     name="streetName"
//     value={propertyDetails.streetName}
//     onChange={handleInputChange}
//     placeholder="Enter street name"
//   />
// </Form.Group>

// <Form.Group className="mb-3" controlId="doorNumber">
//   <Form.Label>Door Number</Form.Label>
//   <Form.Control
//     type="text"
//     name="doorNumber"
//     value={propertyDetails.doorNumber}
//     onChange={handleInputChange}
//     placeholder="Enter door number"
//   />
// </Form.Group>

// <Form.Group className="mb-3" controlId="nagar">
//   <Form.Label>Nagar</Form.Label>
//   <Form.Control
//     type="text"
//     name="nagar"
//     value={propertyDetails.nagar}
//     onChange={handleInputChange}
//     placeholder="Enter nagar"
//   />
// </Form.Group>

// <Form.Group className="mb-3" controlId="ownerName">
//   <Form.Label>Owner Name</Form.Label>
//   <Form.Control
//     type="text"
//     name="ownerName"
//     value={propertyDetails.ownerName}
//     onChange={handleInputChange}
//     placeholder="Enter owner name"
//   />
// </Form.Group>

// <Form.Group className="mb-3" controlId="email">
//   <Form.Label>Email</Form.Label>
//   <Form.Control
//     type="email"
//     name="email"
//     value={propertyDetails.email}
//     onChange={handleInputChange}
//     placeholder="Enter email"
//   />
// </Form.Group>


// <Form.Group controlId="phone">
// <Form.Label> PhoneNumber </Form.Label>

//                 {/* <div className="input-card"> */}
//                   {/* <FaPhoneAlt className="input-icon" /> */}
//                   <Form.Control
//                     type="text"
//                     value={phoneNumber}
//                     readOnly
//                     placeholder="Phone Number"
//                     className="form-input"
//                     disabled
//                   />
//                 {/* </div> */}
//               </Form.Group>

// <Form.Group className="mb-3" controlId="bestTimeToCall">
//   <Form.Label>Best Time to Call</Form.Label>
//   <Form.Control
//     as="select"
//     name="bestTimeToCall"
//     value={propertyDetails.bestTimeToCall}
//     onChange={handleInputChange}
//   >
//     <option value="">Select Option</option>
//     <option value="AnyTime">AnyTime</option>
//     <option value="Morning">Morning</option>
//     <option value="Afternoon">Afternoon</option>
//     <option value="Evening">Evening</option>
//   </Form.Control>
// </Form.Group>


//         {/* <Button variant="primary" type="submit">
//           Submit
//         </Button> */}



//           {/* Add other form fields here... */}

//           <Button variant="primary" onClick={handlePreview}>
//             Preview
//           </Button>
//         </Form>
//       ) : (
// <div>
//           <h2>Preview Property Details</h2>

//           {Object.entries(propertyDetails).map(([key, value]) => (
//             <p key={key}>
//               <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:</strong> {value || 'Not Provided'}
//             </p>
//           ))}

//           <Button variant="secondary" onClick={handlePreview}>
//             Edit
//           </Button>
//           <Button variant="primary" onClick={handleSubmit} style={{ marginLeft: '10px' }}>
//             Submit Property
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddProp;

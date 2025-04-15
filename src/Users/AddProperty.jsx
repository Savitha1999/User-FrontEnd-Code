// // import React, { useState, useEffect } from 'react';
// // import { Container, Row, Col, Form, Button } from 'react-bootstrap';

// // const AddProperty = () => {
// //   const [phoneNumber, setPhoneNumber] = useState('');

// //   useEffect(() => {
// //     const storedPhoneNumber = localStorage.getItem('userPhoneNumber');
// //     if (storedPhoneNumber) {
// //       setPhoneNumber(storedPhoneNumber);
// //     }
// //   }, []);

// //   return (
// //     <Container>
// //       <Row>
// //         <Col>
// //           <h3>Add Property</h3>
// //           <Form>
// //             <Form.Group controlId="phone">
// //               <Form.Label>Phone Number</Form.Label>
// //               <Form.Control
// //                 type="text"
// //                 value={phoneNumber}
// //                 readOnly
// //                 disabled
// //               />
// //             </Form.Group>
// //             <Button variant="primary" type="submit">Submit</Button>
// //           </Form>
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // };

// // export default AddProperty;






// // import React, { useState, useEffect } from 'react';
// // import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css'; 
// // import 'bootstrap/dist/css/bootstrap.min.css';

// // const AddProperty = () => {





// //   const [phoneNumber, setPhoneNumber] = useState('');
// //   const [propertyMode, setPropertyMode] = useState('');
// //   const [propertyType, setPropertyType] = useState('');
// //   const [price, setPrice] = useState('');
// //   const [description, setDescription] = useState('');
// //   const [photos, setPhotos] = useState([]); // State for photos
// //   const [video, setVideo] = useState(null); // State for video
// //   const [propertyAge, setPropertyAge] = useState('');
// //   const [bankLoan, setBankLoan] = useState('');
// //   const [negotiation, setNegotiation] = useState('');
// //   const [length, setLength] = useState('');
// //   const [breadth, setBreadth] = useState('');
// //   const [totalArea, setTotalArea] = useState('');
// //   const [ownership, setOwnership] = useState('');
// //   const [bedrooms, setBedrooms] = useState('');
// //   const [kitchen, setKitchen] = useState('');
// //   const [kitchenType, setKitchenType] = useState('');
// //   const [balconies, setBalconies] = useState('');
// //   const [floorNo, setFloorNo] = useState('');
// //   const [areaUnit, setAreaUnit] = useState('');
// //   const [propertyApproved, setPropertyApproved] = useState('');
// //   const [postedBy, setPostedBy] = useState('');
// //   const [facing, setFacing] = useState('');


// //   // Get phone number from localStorage
// //   useEffect(() => {
// //     const storedPhoneNumber = localStorage.getItem('userPhoneNumber');
// //     if (storedPhoneNumber) {
// //       setPhoneNumber(storedPhoneNumber);
// //     }
// //   }, []);

// //   // Handle photo uploads
// //   const handlePhotoUpload = (e) => {
// //     const files = Array.from(e.target.files);
// //     const maxSize = 10 * 1024 * 1024; // 10MB limit per file

// //     // Check for file size limit
// //     for (let file of files) {
// //       if (file.size > maxSize) {
// //         alert('File size exceeds the 10MB limit');
// //         return;
// //       }
// //     }

// //     // Limit to a maximum of 15 photos
// //     if (photos.length + files.length <= 15) {
// //       setPhotos([...photos, ...files]);
// //     } else {
// //       alert('Maximum 15 photos can be uploaded.');
// //     }
// //   };

// //   // Remove a photo from the list
// //   const removePhoto = (index) => {
// //     setPhotos(photos.filter((_, i) => i !== index));
// //   };

// //   // Handle video file change
// //   const handleVideoChange = (e) => {
// //     const file = e.target.files[0];
// //     setVideo(file);
// //   };

// //   // Handle form submission
// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     toast.success("Property Added Successfully!");


// //     // Log the form data (or send it to an API)
// //     console.log({
// //       phoneNumber,
// //       propertyMode,
// //       propertyType,
// //       price,
// //       description,
// //       photos,
// //       video,
// //       propertyAge,
// //       bankLoan,
// //       negotiation,
// //       length,
// //       breadth,
// //       totalArea,
// //       ownership,
// //       bedrooms,
// //       kitchen,
// //       kitchenType,
// //       balconies,
// //       floorNo,
// //       areaUnit,
// //       propertyApproved,
// //       postedBy,
// //       facing
// //     });

// //     // Reset the form after submission
// //     setPhoneNumber('');
// //     setPropertyMode('');
// //     setPropertyType('');
// //     setPrice('');
// //     setDescription('');
// //     setPhotos([]); // Clear the uploaded photos
// //     setVideo(''); // Clear the video
// //     setPropertyAge('');
// //     setBankLoan('');
// //     setNegotiation('');
// //     setLength('');
// //     setBreadth('');
// //     setTotalArea('');
// //     setOwnership('');
// //     setBedrooms('');
// //     setKitchen('');
// //     setKitchenType('');
// //     setBalconies('');
// //     setFloorNo('');
// //     setAreaUnit('');
// //     setPropertyApproved('');
// //     setPostedBy('');
// //     setFacing('');
// //   };

// //   return (
// //     <Container>
// //       <ToastContainer /> {/* This renders the toast notifications */}
// //       <Row>
// //         <Col>
// //           <h3>Add Property</h3>
// //           <Form onSubmit={handleSubmit}>
// //             <Form.Group controlId="phone">
// //               <Form.Label>Phone Number</Form.Label>
// //               <Form.Control
// //                 type="text"
// //                 value={phoneNumber}
// //                 readOnly
// //                 disabled
// //               />
// //             </Form.Group>

// //             <Form.Group controlId="propertyMode" className="mt-3">
// //               <Form.Label>Property Mode</Form.Label>
// //               <Form.Control
// //                 as="select"
// //                 value={propertyMode}
// //                 onChange={(e) => setPropertyMode(e.target.value)}
// //               >
// //                 <option value="">Select Property Mode</option>
// //                 <option value="Residential">Residential</option>
// //                 <option value="Commercial">Commercial</option>
// //                 <option value="Agricultural">Agricultural</option>
// //                 <option value="Rent">Rent</option>
// //               </Form.Control>
// //             </Form.Group>

// //             <Form.Group controlId="propertyType" className="mt-3">
// //               <Form.Label>Property Type</Form.Label>
// //               <Form.Control
// //                 as="select"
// //                 value={propertyType}
// //                 onChange={(e) => setPropertyType(e.target.value)}
// //               >
// //                 <option value="">Select Property Type</option>
// //                 {propertyMode === 'Residential' && (
// //                   <>
// //                     <option value="Flat/ Apartment">Flat/ Apartment</option>
// //                     <option value="Residential House">Residential House</option>
// //                     <option value="Villa">Villa</option>
// //                     <option value="Builder Floor Apartment">Builder Floor Apartment</option>
// //                     <option value="Penthouse">Penthouse</option>
// //                     <option value="Studio Apartment">Studio Apartment</option>
// //                     <option value="Service Apartment">Service Apartment</option>
// //                   </>
// //                 )}
// //                 {propertyMode === 'Commercial' && (
// //                   <>
// //                     <option value="Commercial Office Space">Commercial Office Space</option>
// //                     <option value="Office in IT Park/ SEZ">Office in IT Park/ SEZ</option>
// //                     <option value="Commercial Shop">Commercial Shop</option>
// //                     <option value="Commercial Showroom">Commercial Showroom</option>
// //                     <option value="Commercial Land">Commercial Land</option>
// //                     <option value="Warehouse/ Godown">Warehouse/ Godown</option>
// //                     <option value="Industrial Land">Industrial Land</option>
// //                     <option value="Industrial Building">Industrial Building</option>
// //                     <option value="Industrial Shed">Industrial Shed</option>
// //                   </>
// //                 )}
// //                 {propertyMode === 'Agricultural' && (
// //                   <>
// //                     <option value="Agricultural Land">Agricultural Land</option>
// //                     <option value="Farm House">Farm House</option>
// //                   </>
// //                 )}
// //               </Form.Control>
// //             </Form.Group>


// //             <Form.Group controlId="price" className="mt-3">
// //               <Form.Label>Price</Form.Label>
// //               <Form.Control
// //                 type="number"
// //                 value={price}
// //                 onChange={(e) => setPrice(e.target.value)}
// //                 placeholder="Enter price"
// //               />
// //             </Form.Group>

// //             <Form.Group controlId="description" className="mt-3">
// //               <Form.Label>Description</Form.Label>
// //               <Form.Control
// //                 as="textarea"
// //                 value={description}
// //                 onChange={(e) => setDescription(e.target.value)}
// //                 placeholder="Enter property description"
// //               />
// //             </Form.Group>

// //             {/* Photo Upload */}
// //             <div className="form-group">
// //               <label>Upload Photos:</label>
// //               <input
// //                 type="file"
// //                 multiple
// //                 accept="image/*"
// //                 onChange={handlePhotoUpload}
// //                 name="photos"
// //               />
// //             </div>

// //             {/* Display Uploaded Photos */}
// //             {photos.length > 0 && (
// //               <div>
// //                 <h4>Uploaded Photos</h4>
// //                 {photos.map((photo, index) => (
// //                   <div key={index} style={{ textAlign: 'center', margin: '10px' }}>
// //                     <img
// //                       src={URL.createObjectURL(photo)}
// //                       alt="Uploaded"
// //                       style={{ width: '80px', height: '80px', objectFit: 'cover' }}
// //                     />
// //                     <p
// //                       style={{ color: 'red', cursor: 'pointer' }}
// //                       onClick={() => removePhoto(index)}
// //                     >
// //                       Remove
// //                     </p>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}

// //             {/* Video Upload */}
// //             <div className="form-group">
// //               <label>Upload Video</label>
// //               <input
// //                 type="file"
// //                 name="video"
// //                 accept="video/*"
// //                 onChange={handleVideoChange}
// //               />
// //             </div>

// //             {/* Display Uploaded Video */}
// //             {video && (
// //               <div>
// //                 <h4>Selected Video:</h4>
// //                 <video width="200" controls>
// //                   <source src={URL.createObjectURL(video)} type="video/mp4" />
// //                   Your browser does not support the video tag.
// //                 </video>
// //               </div>
// //             )}

// // <Form.Group controlId="propertyAge" className="mt-3">
// //               <Form.Label>Property Age</Form.Label>
// //               <Form.Control
// //                 as="select"
// //                 value={propertyAge}
// //                 onChange={(e) => setPropertyAge(e.target.value)}
// //               >
// //                 <option value="">Select Property Age</option>
// //                 <option value="Newly Build">Newly Build</option>
// //                 <option value="2 Years">2 Years</option>
// //                 <option value="3 Years">3 Years</option>
// //                 <option value="4 Years">4 Years</option>
// //                 <option value="5 Years">5 Years</option>
// //                 <option value="6 Years">6 Years</option>
// //                 <option value="7 Years">7 Years</option>
// //                 <option value="8 Years">8 Years</option>
// //                 <option value="9 Years">9 Years</option>
// //                 <option value="10 Years">10 Years</option>
// //                 <option value="11 Years">11 Years</option>
// //                 <option value="12 Years">12 Years</option>
// //                 <option value="13 Years">13 Years</option>
// //                 <option value="14 Years">14 Years</option>
// //                 <option value="15 Years">15 Years</option>
// //                 <option value="16 Years">16 Years</option>
// //                 <option value="17 Years">17 Years</option>
// //                 <option value="18 Years">18 Years</option>
// //                 <option value="19 Years">19 Years</option>
// //                 <option value="20 Years">20 Years</option>
// //                 <option value="20+ Years">20+ Years</option>
// //               </Form.Control>
// //             </Form.Group>

// //             <Form.Group controlId="bankLoan" className="mt-3">
// //               <Form.Label>Bank Loan Available</Form.Label>
// //               <Form.Control
// //                 as="select"
// //                 value={bankLoan}
// //                 onChange={(e) => setBankLoan(e.target.value)}
// //               >
// //                 <option value="">Select Option</option>
// //                 <option value="Yes">Yes</option>
// //                 <option value="No">No</option>
// //               </Form.Control>
// //             </Form.Group>

// //             <Form.Group controlId="negotiation" className="mt-3">
// //               <Form.Label>Negotiation</Form.Label>
// //               <Form.Control
// //                 as="select"
// //                 value={negotiation}
// //                 onChange={(e) => setNegotiation(e.target.value)}
// //               >
// //                 <option value="">Select Option</option>
// //                 <option value="Yes">Yes</option>
// //                 <option value="No">No</option>
// //               </Form.Control>
// //             </Form.Group>

// //             <Form.Group controlId="length" className="mt-3">
// //               <Form.Label>Length (in meters)</Form.Label>
// //               <Form.Control
// //                 type="number"
// //                 value={length}
// //                 onChange={(e) => setLength(e.target.value)}
// //               />
// //             </Form.Group>

// //             <Form.Group controlId="breadth" className="mt-3">
// //               <Form.Label>Breadth (in meters)</Form.Label>
// //               <Form.Control
// //                 type="number"
// //                 value={breadth}
// //                 onChange={(e) => setBreadth(e.target.value)}
// //               />
// //             </Form.Group>

// //             <Form.Group controlId="totalArea" className="mt-3">
// //               <Form.Label>Total Area</Form.Label>
// //               <Form.Control
// //                 type="number"
// //                 value={totalArea}
// //                 onChange={(e) => setTotalArea(e.target.value)}
// //               />
// //             </Form.Group>

// //             <Form.Group controlId="ownership" className="mt-3">
// //               <Form.Label>Ownership</Form.Label>
// //               <Form.Control
// //                 as="select"
// //                 value={ownership}
// //                 onChange={(e) => setOwnership(e.target.value)}
// //               >
// //                 <option value="">Select Ownership</option>
// //                 <option value="single Owner">Single Owner</option>
// //                 <option value="Multiple Owner">Multiple Owner</option>
// //                 <option value="Power Of Attorney">Power Of Attorney</option>
// //               </Form.Control>
// //             </Form.Group>

// //             {/* Additional Fields */}
// //             <Form.Group controlId="bedrooms" className="mt-3">
// //               <Form.Label>Bedrooms</Form.Label>
// //               <Form.Control
// //                 as="select"
// //                 value={bedrooms}
// //                 onChange={(e) => setBedrooms(e.target.value)}
// //               >
// //                 <option value="">Select Bedrooms</option>
// //                 <option value="No">No</option>
// //                 <option value="1">1</option>
// //                 <option value="2">2</option>
// //                 <option value="3">3</option>
// //                 <option value="4">4</option>
// //                 <option value="5">5</option>
// //                 <option value="6">6</option>
// //                 <option value="7">7</option>
// //                 <option value="8">8</option>
// //                 <option value="9">9</option>
// //                 <option value="10">10</option>
// //                 <option value="20+">20+</option>
// //               </Form.Control>
// //             </Form.Group>

// //             <Form.Group controlId="kitchen" className="mt-3">
// //               <Form.Label>Kitchen Available</Form.Label>
// //               <Form.Control
// //                 as="select"
// //                 value={kitchen}
// //                 onChange={(e) => setKitchen(e.target.value)}
// //               >
// //                 <option value="">Select Kitchen Availability</option>
// //                 <option value="Yes">Yes</option>
// //                 <option value="No">No</option>
// //               </Form.Control>
// //             </Form.Group>

// //             <Form.Group controlId="kitchenType" className="mt-3">
// //               <Form.Label>Kitchen Type</Form.Label>
// //               <Form.Control
// //                 as="select"
// //                 value={kitchenType}
// //                 onChange={(e) => setKitchenType(e.target.value)}
// //               >
// //                 <option value="">Select Kitchen Type</option>
// //                 <option value="Modular">Modular</option>
// //                 <option value="Normal">Normal</option>
// //                 <option value="No">No</option>
// //               </Form.Control>
// //             </Form.Group>

// //             <Form.Group controlId="balconies" className="mt-3">
// //               <Form.Label>Balconies</Form.Label>
// //               <Form.Control
// //                 as="select"
// //                 value={balconies}
// //                 onChange={(e) => setBalconies(e.target.value)}
// //               >
// //                 <option value="">Select Balconies</option>
// //                 <option value="No">No</option>
// //                 <option value="1 Balcony">1 Balcony</option>
// //                 <option value="2 Balconies">2 Balconies</option>
// //                 <option value="3 Balconies">3 Balconies</option>
// //                 <option value="4 Balconies">4 Balconies</option>
// //                 <option value="5 Balconies">5 Balconies</option>
// //                 <option value="6 Balcony">6 Balcony</option>
// //                 <option value="7 Balconies">7 Balconies</option>
// //                 <option value="8 Balconies">8 Balconies</option>
// //                 <option value="9 Balconies">9 Balconies</option>
// //                 <option value="10 Balconies">10 Balconies</option>
// //                 <option value="10+ Balconies">10+ Balconies</option>
// //               </Form.Control>
// //             </Form.Group>

// //             <Form.Group controlId="floorNo" className="mt-3">
// //               <Form.Label>Floor No</Form.Label>
// //               <Form.Control
// //                 as="select"
// //                 value={floorNo}
// //                 onChange={(e) => setFloorNo(e.target.value)}
// //               >
// //                 <option value="">Select Floor</option>
// //                 <option value="Lower Basement">Lower Basement</option>
// //                 <option value="Upper Basement">Upper Basement</option>
// //                 <option value="Ground Floor">Ground Floor</option>
// //                 <option value="Top Floor">Top Floor</option>
// //                 <option value="1st Floor">1st Floor</option>
// //                 <option value="2nd Floor">2nd Floor</option>
// //                 <option value="3rd Floor">3rd Floor</option>
// //                 <option value="4th Floor">4th Floor</option>
// //                 <option value="5th Floor">5th Floor</option>
// //                 <option value="6th Floor">6th Floor</option>
// //                 <option value="7th Floor">7th Floor</option>
// //                 <option value="8th Floor">8th Floor</option>
// //                 <option value="9th Floor">9th Floor</option>
// //                 <option value="10th Floor">10th Floor</option>
// //               </Form.Control>
// //             </Form.Group>

// //             <Form.Group controlId="areaUnit" className="mt-3">
// //               <Form.Label>Area Unit</Form.Label>
// //               <Form.Control
// //                 as="select"
// //                 value={areaUnit}
// //                 onChange={(e) => setAreaUnit(e.target.value)}
// //               >
// //                 <option value="">Select Area Unit</option>
// //                 <option value="sq.ft">sq.ft</option>
// //                 <option value="sq.meter">sq.meter</option>
// //                 <option value="cent">cent</option>
// //                 <option value="Acre">Acre</option>
// //                 <option value="Hectare">Hectare</option>
// //               </Form.Control>
// //             </Form.Group>

// //             <Form.Group controlId="propertyApproved" className="mt-3">
// //               <Form.Label>Property Approved</Form.Label>
// //               <Form.Control
// //                 as="select"
// //                 value={propertyApproved}
// //                 onChange={(e) => setPropertyApproved(e.target.value)}
// //               >
// //                 <option value="">Select Approval Status</option>
// //                 <option value="Yes">Yes</option>
// //                 <option value="No">No</option>
// //               </Form.Control>
// //             </Form.Group>

// //             <Form.Group controlId="postedBy" className="mt-3">
// //               <Form.Label>Posted By</Form.Label>
// //               <Form.Control
// //                 as="select"
// //                 value={postedBy}
// //                 onChange={(e) => setPostedBy(e.target.value)}
// //               >
// //                 <option value="">Select Poster</option>
// //                 <option value="Owner">Owner</option>
// //                 <option value="Agent">Agent</option>
// //                 <option value="Builder">Builder</option>
// //               </Form.Control>
// //             </Form.Group>

// //             <Form.Group controlId="facing" className="mt-3">
// //               <Form.Label>Facing</Form.Label>
// //               <Form.Control
// //                 as="select"
// //                 value={facing}
// //                 onChange={(e) => setFacing(e.target.value)}
// //               >
// //                 <option value="">Select Facing</option>
// //                 <option value="North">North</option>
// //                 <option value="South">South</option>
// //                 <option value="East">East</option>
// //                 <option value="West">West</option>
// //                 <option value="North-East">North-East</option>
// //                 <option value="South-East">South-East</option>
// //                 <option value="North-West">North-West</option>
// //                 <option value="South-West">South-West</option>
// //                 <option value="North-North-East">North-North-East</option>
// //                 <option value="South-South-West">South-South-West</option>
// //                 <option value="East-North-East">East-North-East</option>
// //                 <option value="West-North-West">West-North-West</option>
// //               </Form.Control>
// //             </Form.Group>

// //             <Button variant="primary" type="submit" className="mt-3">
// //               Submit
// //             </Button>
// //           </Form>
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // };

// // export default AddProperty;












// // ----------------------------------------------



















// // import React, { useState, useEffect } from 'react';
// // import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import { ArrowRight } from 'react-bootstrap-icons'; // Ensure you have a suitable icon

// // const AddProperty = () => {
// //   const [phoneNumber, setPhoneNumber] = useState('');
// //   const [propertyMode, setPropertyMode] = useState('');
// //   const [propertyType, setPropertyType] = useState('');
// //   const [price, setPrice] = useState('');
// //   const [description, setDescription] = useState('');
// //   const [photos, setPhotos] = useState([]); // State for photos
// //   const [video, setVideo] = useState(null); // State for video
// //   const [propertyAge, setPropertyAge] = useState('');
// //   const [bankLoan, setBankLoan] = useState('');
// //   const [negotiation, setNegotiation] = useState('');
// //   const [length, setLength] = useState('');
// //   const [breadth, setBreadth] = useState('');
// //   const [totalArea, setTotalArea] = useState('');
// //   const [ownership, setOwnership] = useState('');
// //   const [bedrooms, setBedrooms] = useState('');
// //   const [kitchen, setKitchen] = useState('');
// //   const [kitchenType, setKitchenType] = useState('');
// //   const [balconies, setBalconies] = useState('');
// //   const [floorNo, setFloorNo] = useState('');
// //   const [areaUnit, setAreaUnit] = useState('');
// //   const [propertyApproved, setPropertyApproved] = useState('');
// //   const [postedBy, setPostedBy] = useState('');
// //   const [facing, setFacing] = useState('');

// //   const [currentStep, setCurrentStep] = useState(1); // Step tracker for fields to show

// //     // Get phone number from localStorage
// //     useEffect(() => {
// //       const storedPhoneNumber = localStorage.getItem('userPhoneNumber');
// //       if (storedPhoneNumber) {
// //         setPhoneNumber(storedPhoneNumber);
// //       }
// //     }, []);

// //   // Get phone number from localStorage
// //   useEffect(() => {
// //     const storedPhoneNumber = localStorage.getItem('userPhoneNumber');
// //     if (storedPhoneNumber) {
// //       setPhoneNumber(storedPhoneNumber);
// //     }
// //   }, []);
// //   // Handle photo uploads
// //   const handlePhotoUpload = (e) => {
// //     const files = Array.from(e.target.files);
// //     const maxSize = 10 * 1024 * 1024; // 10MB limit per file

// //     // Check for file size limit
// //     for (let file of files) {
// //       if (file.size > maxSize) {
// //         alert('File size exceeds the 10MB limit');
// //         return;
// //       }
// //     }

// //     // Limit to a maximum of 15 photos
// //     if (photos.length + files.length <= 15) {
// //       setPhotos([...photos, ...files]);
// //     } else {
// //       alert('Maximum 15 photos can be uploaded.');
// //     }
// //   };

// //   // Remove a photo from the list
// //   const removePhoto = (index) => {
// //     setPhotos(photos.filter((_, i) => i !== index));
// //   };

// //   // Handle video file change
// //   const handleVideoChange = (e) => {
// //     const file = e.target.files[0];
// //     setVideo(file);
// //   };



// //   // Handle first part of form submission (for first 5 fields)
// //   const handleShowMore = (e) => {
// //     e.preventDefault();

// //     // Validation before moving to the next set of fields
// //     // if (currentStep === 1) {
// //     //   if (!propertyMode || !propertyType || !price || !description || photos.length === 0) {
// //     //     toast.error("Please fill in the first 5 fields and upload at least one photo.");
// //     //     return;
// //     //   }
// //     // }

// //     // Move to the next set of fields
// //     setCurrentStep(currentStep + 1);
// //   };

// //   // Handle form submission for the final fields
// //   const handleSubmit = (e) => {
// //     e.preventDefault();


// //     // Log the data for all fields
// //     console.log({
// //       phoneNumber,
// //       propertyMode,
// //       propertyType,
// //       price,
// //       description,
// //       photos,
// //       video,
// //       propertyAge,
// //       bankLoan,
// //       negotiation,
// //       length,
// //       breadth,
// //       totalArea,
// //       ownership,
// //       bedrooms,
// //       kitchen,
// //       kitchenType,
// //       balconies,
// //       floorNo,
// //       areaUnit,
// //       propertyApproved,
// //       postedBy,
// //       facing
// //     });

// //     // Reset the form after submission
// //     setPhoneNumber('');
// //     setPropertyMode('');
// //     setPropertyType('');
// //     setPrice('');
// //     setDescription('');
// //     setPhotos([]); // Clear the uploaded photos
// //     setVideo(''); // Clear the video
// //     setPropertyAge('');
// //     setBankLoan('');
// //     setNegotiation('');
// //     setLength('');
// //     setBreadth('');
// //     setTotalArea('');
// //     setOwnership('');
// //     setBedrooms('');
// //     setKitchen('');
// //     setKitchenType('');
// //     setBalconies('');
// //     setFloorNo('');
// //     setAreaUnit('');
// //     setPropertyApproved('');
// //     setPostedBy('');
// //     setFacing('');
// //     setCurrentStep(1); // Reset the step tracker
// //   };

// //   return (
// //     <Container>
// //       <ToastContainer />
// //       <Row className="g-03">
// //         <Col lg={12} className="d-flex align-items-center justify-content-center">
// //           <div className="d-flex mt-3 justify-content-center align-items-center">
           
// //             <div
// //               style={{
// //                 width: "100%",
// //                 maxWidth: "450px",
// //                 minWidth: "300px",
// //                 padding: "2rem",
// //                 borderRadius: "8px",
// //                 margin: "0 20px",
// //                 backgroundRepeat: "no-repeat",
// //                 color: "white",
// //               }}
// //             >
// //       {/* <Row>
// //         <Col> */}
// //           <h3>Add Property</h3>
// //             <Form.Group controlId="phone">
// //               <Form.Label>Phone Number</Form.Label>
// //               <Form.Control
// //                 type="text"
// //                 value={phoneNumber}
// //                 readOnly
// //                 disabled
// //               />
// //             </Form.Group>
// //           <Form onSubmit={handleSubmit}>
// //             {/* Step 1: First 5 fields */}
// //             {currentStep === 1 && (
// //               <>
// //                 <Form.Group controlId="propertyMode" className="mt-3">
// //                   <Form.Label>Property Mode</Form.Label>
// //                   <Form.Control
// //                     as="select"
// //                     value={propertyMode}
// //                     onChange={(e) => setPropertyMode(e.target.value)}
// //                   >
// //                     <option value="">Select Mode</option>
// //                     <option value="Rent">Rent</option>
// //                     <option value="Buy">Buy</option>
// //                     <option value="Sell">Sell</option>
// //                   </Form.Control>
// //                 </Form.Group>

// //                 <Form.Group controlId="propertyType" className="mt-3">
// //                   <Form.Label>Property Type</Form.Label>
// //                   <Form.Control
// //                     as="select"
// //                     value={propertyType}
// //                     onChange={(e) => setPropertyType(e.target.value)}
// //                   >
// //                     <option value="">Select Property Type</option>
// //                     <option value="Apartment">Apartment</option>
// //                     <option value="House">House</option>
// //                     <option value="Villa">Villa</option>
// //                   </Form.Control>
// //                 </Form.Group>

// //                 <Form.Group controlId="price" className="mt-3">
// //                   <Form.Label>Price</Form.Label>
// //                   <Form.Control
// //                     type="number"
// //                     value={price}
// //                     onChange={(e) => setPrice(e.target.value)}
// //                   />
// //                 </Form.Group>

// //                 <Form.Group controlId="description" className="mt-3">
// //                   <Form.Label>Description</Form.Label>
// //                   <Form.Control
// //                     as="textarea"
// //                     rows={3}
// //                     value={description}
// //                     onChange={(e) => setDescription(e.target.value)}
// //                   />
// //                 </Form.Group>

// //                            {/* Photo Upload */}
// //             <div className="form-group">
// //               <label>Upload Photos:</label>
// //               <input
// //                 type="file"
// //                 multiple
// //                 accept="image/*"
// //                 onChange={handlePhotoUpload}
// //                 name="photos"
// //               />
// //             </div>

// //             {/* Display Uploaded Photos */}
// //             {photos.length > 0 && (
// //               <div>
// //                 <h4>Uploaded Photos</h4>
// //                 {photos.map((photo, index) => (
// //                   <div key={index} style={{ textAlign: 'center', margin: '10px' }}>
// //                     <img
// //                       src={URL.createObjectURL(photo)}
// //                       alt="Uploaded"
// //                       style={{ width: '80px', height: '80px', objectFit: 'cover' }}
// //                     />
// //                     <p
// //                       style={{ color: 'red', cursor: 'pointer' }}
// //                       onClick={() => removePhoto(index)}
// //                     >
// //                       Remove
// //                     </p>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}

// //             {/* Video Upload */}
// //             <div className="form-group">
// //               <label>Upload Video</label>
// //               <input
// //                 type="file"
// //                 name="video"
// //                 accept="video/*"
// //                 onChange={handleVideoChange}
// //               />
// //             </div>

// //             {/* Display Uploaded Video */}
// //             {video && (
// //               <div>
// //                 <h4>Selected Video:</h4>
// //                 <video width="200" controls>
// //                   <source src={URL.createObjectURL(video)} type="video/mp4" />
// //                   Your browser does not support the video tag.
// //                 </video>
// //               </div>
// //             )}
// //               </>
// //             )}

// //             {/* Step 2: Show next 5 fields */}
// //             {currentStep === 2 && (
// //               <>
//                 // <Form.Group controlId="propertyAge" className="mt-3">
//                 //   <Form.Label>Property Age</Form.Label>
//                 //   <Form.Control
//                 //     as="select"
//                 //     value={propertyAge}
//                 //     onChange={(e) => setPropertyAge(e.target.value)}
//                 //   >
//                 //     <option value="">Select Property Age</option>
//                 //     <option value="Newly Build">Newly Build</option>
//                 //     <option value="2 Years">2 Years</option>
//                 //     <option value="3 Years">3 Years</option>
//                 //     <option value="4 Years">4 Years</option>
//                 //     <option value="5 Years">5 Years</option>
//                 //     {/* Add more options here */}
//                 //   </Form.Control>
//                 // </Form.Group>

//                 // <Form.Group controlId="bankLoan" className="mt-3">
//                 //   <Form.Label>Bank Loan Available</Form.Label>
//                 //   <Form.Control
//                 //     as="select"
//                 //     value={bankLoan}
//                 //     onChange={(e) => setBankLoan(e.target.value)}
//                 //   >
//                 //     <option value="">Select Option</option>
//                 //     <option value="Yes">Yes</option>
//                 //     <option value="No">No</option>
//                 //   </Form.Control>
//                 // </Form.Group>

//                 // <Form.Group controlId="negotiation" className="mt-3">
//                 //   <Form.Label>Negotiation</Form.Label>
//                 //   <Form.Control
//                 //     as="select"
//                 //     value={negotiation}
//                 //     onChange={(e) => setNegotiation(e.target.value)}
//                 //   >
//                 //     <option value="">Select Option</option>
//                 //     <option value="Yes">Yes</option>
//                 //     <option value="No">No</option>
//                 //   </Form.Control>
//                 // </Form.Group>

//                 // <Form.Group controlId="length" className="mt-3">
//                 //   <Form.Label>Length (in meters)</Form.Label>
//                 //   <Form.Control
//                 //     type="number"
//                 //     value={length}
//                 //     onChange={(e) => setLength(e.target.value)}
//                 //   />
//                 // </Form.Group>

//                 // <Form.Group controlId="breadth" className="mt-3">
//                 //   <Form.Label>Breadth (in meters)</Form.Label>
//                 //   <Form.Control
//                 //     type="number"
//                 //     value={breadth}
//                 //     onChange={(e) => setBreadth(e.target.value)}
//                 //   />
//                 // </Form.Group>
// //               </>
// //             )}

// //             {/* Step 3: Show remaining fields */}
// //             {currentStep === 3 && (
// //               <>
//                 // <Form.Group controlId="totalArea" className="mt-3">
//                 //   <Form.Label>Total Area</Form.Label>
//                 //   <Form.Control
//                 //     type="number"
//                 //     value={totalArea}
//                 //     onChange={(e) => setTotalArea(e.target.value)}
//                 //   />
//                 // </Form.Group>

//                 // <Form.Group controlId="ownership" className="mt-3">
//                 //   <Form.Label>Ownership</Form.Label>
//                 //   <Form.Control
//                 //     as="select"
//                 //     value={ownership}
//                 //     onChange={(e) => setOwnership(e.target.value)}
//                 //   >
//                 //     <option value="">Select Ownership</option>
//                 //     <option value="single Owner">Single Owner</option>
//                 //     <option value="Multiple Owner">Multiple Owner</option>
//                 //     <option value="Power Of Attorney">Power Of Attorney</option>
//                 //   </Form.Control>
//                 // </Form.Group>

//                 // <Form.Group controlId="bedrooms" className="mt-3">
//                 //   <Form.Label>Bedrooms</Form.Label>
//                 //   <Form.Control
//                 //     type="number"
//                 //     value={bedrooms}
//                 //     onChange={(e) => setBedrooms(e.target.value)}
//                 //   />
//                 // </Form.Group>

//                 // <Form.Group controlId="kitchen" className="mt-3">
//                 //   <Form.Label>Kitchen</Form.Label>
//                 //   <Form.Control
//                 //     as="select"
//                 //     value={kitchen}
//                 //     onChange={(e) => setKitchen(e.target.value)}
//                 //   >
//                 //     <option value="">Yes/No</option>
//                 //     <option value="Yes">Yes</option>
//                 //     <option value="No">No</option>
//                 //   </Form.Control>
//                 // </Form.Group>

//                 // <Form.Group controlId="kitchenType" className="mt-3">
//                 //   <Form.Label>Kitchen Type</Form.Label>
//                 //   <Form.Control
//                 //     as="select"
//                 //     value={kitchenType}
//                 //     onChange={(e) => setKitchenType(e.target.value)}
//                 //   >
//                 //     <option value="">Select Kitchen Type</option>
//                 //     <option value="Modular">Modular</option>
//                 //     <option value="Normal">Normal</option>
//                 //   </Form.Control>
//                 // </Form.Group>
// //               </>
// //             )}

// // {currentStep === 4 && (  
// //   <>        
// // <Form.Group controlId="balconies" className="mt-3">
// //               <Form.Label>Balconies</Form.Label>
// //               <Form.Control
// //                 as="select"
// //                 value={balconies}
// //                 onChange={(e) => setBalconies(e.target.value)}
// //               >
// //                 <option value="">Select Balconies</option>
// //                 <option value="No">No</option>
// //                 <option value="1 Balcony">1 Balcony</option>
// //                 <option value="2 Balconies">2 Balconies</option>
// //                 <option value="3 Balconies">3 Balconies</option>
// //                 <option value="4 Balconies">4 Balconies</option>
// //                 <option value="5 Balconies">5 Balconies</option>
// //                 <option value="6 Balcony">6 Balcony</option>
// //                 <option value="7 Balconies">7 Balconies</option>
// //                 <option value="8 Balconies">8 Balconies</option>
// //                 <option value="9 Balconies">9 Balconies</option>
// //                 <option value="10 Balconies">10 Balconies</option>
// //                 <option value="10+ Balconies">10+ Balconies</option>
// //               </Form.Control>
// //             </Form.Group>

// //             <Form.Group controlId="floorNo" className="mt-3">
// //               <Form.Label>Floor No</Form.Label>
// //               <Form.Control
// //                 as="select"
// //                 value={floorNo}
// //                 onChange={(e) => setFloorNo(e.target.value)}
// //               >
// //                 <option value="">Select Floor</option>
// //                 <option value="Lower Basement">Lower Basement</option>
// //                 <option value="Upper Basement">Upper Basement</option>
// //                 <option value="Ground Floor">Ground Floor</option>
// //                 <option value="Top Floor">Top Floor</option>
// //                 <option value="1st Floor">1st Floor</option>
// //                 <option value="2nd Floor">2nd Floor</option>
// //                 <option value="3rd Floor">3rd Floor</option>
// //                 <option value="4th Floor">4th Floor</option>
// //                 <option value="5th Floor">5th Floor</option>
// //                 <option value="6th Floor">6th Floor</option>
// //                 <option value="7th Floor">7th Floor</option>
// //                 <option value="8th Floor">8th Floor</option>
// //                 <option value="9th Floor">9th Floor</option>
// //                 <option value="10th Floor">10th Floor</option>
// //               </Form.Control>
// //             </Form.Group>

// //             <Form.Group controlId="areaUnit" className="mt-3">
// //               <Form.Label>Area Unit</Form.Label>
// //               <Form.Control
// //                 as="select"
// //                 value={areaUnit}
// //                 onChange={(e) => setAreaUnit(e.target.value)}
// //               >
// //                 <option value="">Select Area Unit</option>
// //                 <option value="sq.ft">sq.ft</option>
// //                 <option value="sq.meter">sq.meter</option>
// //                 <option value="cent">cent</option>
// //                 <option value="Acre">Acre</option>
// //                 <option value="Hectare">Hectare</option>
// //               </Form.Control>
// //             </Form.Group>

// //             <Form.Group controlId="propertyApproved" className="mt-3">
// //               <Form.Label>Property Approved</Form.Label>
// //               <Form.Control
// //                 as="select"
// //                 value={propertyApproved}
// //                 onChange={(e) => setPropertyApproved(e.target.value)}
// //               >
// //                 <option value="">Select Approval Status</option>
// //                 <option value="Yes">Yes</option>
// //                 <option value="No">No</option>
// //               </Form.Control>
// //             </Form.Group>


          

// //             <Form.Group controlId="postedBy" className="mt-3">
// //               <Form.Label>Posted By</Form.Label>
// //               <Form.Control
// //                 as="select"
// //                 value={postedBy}
// //                 onChange={(e) => setPostedBy(e.target.value)}
// //               >
// //                 <option value="">Select Poster</option>
// //                 <option value="Owner">Owner</option>
// //                 <option value="Agent">Agent</option>
// //                 <option value="Builder">Builder</option>
// //               </Form.Control>
// //             </Form.Group>

// //             <Form.Group controlId="facing" className="mt-3">
// //               <Form.Label>Facing</Form.Label>
// //               <Form.Control
// //                 as="select"
// //                 value={facing}
// //                 onChange={(e) => setFacing(e.target.value)}
// //               >
// //                 <option value="">Select Facing</option>
// //                 <option value="North">North</option>
// //                 <option value="South">South</option>
// //                 <option value="East">East</option>
// //                 <option value="West">West</option>
// //                 <option value="North-East">North-East</option>
// //                 <option value="South-East">South-East</option>
// //                 <option value="North-West">North-West</option>
// //                 <option value="South-West">South-West</option>
// //                 <option value="North-North-East">North-North-East</option>
// //                 <option value="South-South-West">South-South-West</option>
// //                 <option value="East-North-East">East-North-East</option>
// //                 <option value="West-North-West">West-North-West</option>
// //               </Form.Control>
// //             </Form.Group>
// //             </>
// // )}

// //             {/* "Show More" Button */}
// //             <Button
// //               variant="primary"
// //               onClick={handleShowMore}
// //               className="mt-3"
// //             >
// //               Show More <ArrowRight />
// //             </Button>

// //             {/* Submit Button */}
// //             {currentStep === 4 && (
// //               <Button type="submit" className="mt-3">Submit</Button>
// //             )}
// //           </Form>
          
// //           {/* </Col>
// //           </Row> */}
// //           </div>
// //           </div>
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // };

// // export default AddProperty;





// // -----------------------------------------------------------------







// // import React, { useState, useEffect } from 'react';
// // import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import { ArrowRight } from 'react-bootstrap-icons';
// // import { MdArrowCircleDown, MdKeyboardDoubleArrowDown } from "react-icons/md";


// // const AddProperty = () => {
// //   const [phoneNumber, setPhoneNumber] = useState('');
// //   const [propertyMode, setPropertyMode] = useState('');
// //   const [propertyType, setPropertyType] = useState('');
// //   const [price, setPrice] = useState('');
// //   const [description, setDescription] = useState('');
// //   const [photos, setPhotos] = useState([]);
// //   const [video, setVideo] = useState(null);
// //   const [propertyAge, setPropertyAge] = useState('');
// //   const [bankLoan, setBankLoan] = useState('');
// //   const [negotiation, setNegotiation] = useState('');
// //   const [length, setLength] = useState('');
// //   const [breadth, setBreadth] = useState('');
// //   const [totalArea, setTotalArea] = useState('');
// //   const [ownership, setOwnership] = useState('');
// //   const [bedrooms, setBedrooms] = useState('');
// //   const [kitchen, setKitchen] = useState('');
// //   const [kitchenType, setKitchenType] = useState('');
// //   const [balconies, setBalconies] = useState('');
// //   const [floorNo, setFloorNo] = useState('');
// //   const [areaUnit, setAreaUnit] = useState('');
// //   const [propertyApproved, setPropertyApproved] = useState('');
// //   const [postedBy, setPostedBy] = useState('');
// //   const [facing, setFacing] = useState('');

// //   const [currentStep, setCurrentStep] = useState(1);

// //   useEffect(() => {
// //     const storedPhoneNumber = localStorage.getItem('userPhoneNumber');
// //     if (storedPhoneNumber) {
// //       setPhoneNumber(storedPhoneNumber);
// //     }
// //   }, []);

// //   // Handle photo uploads
// //   const handlePhotoUpload = (e) => {
// //     const files = Array.from(e.target.files);
// //     const maxSize = 10 * 1024 * 1024;

// //     for (let file of files) {
// //       if (file.size > maxSize) {
// //         alert('File size exceeds the 10MB limit');
// //         return;
// //       }
// //     }

// //     if (photos.length + files.length <= 15) {
// //       setPhotos([...photos, ...files]);
// //     } else {
// //       alert('Maximum 15 photos can be uploaded.');
// //     }
// //   };

// //   // Remove a photo from the list
// //   const removePhoto = (index) => {
// //     setPhotos(photos.filter((_, i) => i !== index));
// //   };

// //   // Handle video file change
// //   const handleVideoChange = (e) => {
// //     const file = e.target.files[0];
// //     setVideo(file);
// //   };

// //   // Handle show more functionality
// //   const handleShowMore = () => {
// //     setCurrentStep(currentStep + 1);
// //   };

// //   // Handle form submission
// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     console.log({
// //       phoneNumber,
// //       propertyMode,
// //       propertyType,
// //       price,
// //       description,
// //       photos,
// //       video,
// //       propertyAge,
// //       bankLoan,
// //       negotiation,
// //       length,
// //       breadth,
// //       totalArea,
// //       ownership,
// //       bedrooms,
// //       kitchen,
// //       kitchenType,
// //       balconies,
// //       floorNo,
// //       areaUnit,
// //       propertyApproved,
// //       postedBy,
// //       facing
// //     });

// //     // Reset form after submission
// //     setPhoneNumber('');
// //     setPropertyMode('');
// //     setPropertyType('');
// //     setPrice('');
// //     setDescription('');
// //     setPhotos([]);
// //     setVideo(null);
// //     setPropertyAge('');
// //     setBankLoan('');
// //     setNegotiation('');
// //     setLength('');
// //     setBreadth('');
// //     setTotalArea('');
// //     setOwnership('');
// //     setBedrooms('');
// //     setKitchen('');
// //     setKitchenType('');
// //     setBalconies('');
// //     setFloorNo('');
// //     setAreaUnit('');
// //     setPropertyApproved('');
// //     setPostedBy('');
// //     setFacing('');
// //     setCurrentStep(1);
// //   };

// //   return (
// //     <Container>
// //       <ToastContainer />
// //       <Row className="g-03">
// //         <Col lg={12} className="d-flex align-items-center justify-content-center">
// //           <div className="d-flex mt-3 justify-content-center align-items-center">
// //             <div
// //               style={{
// //                 width: "100%",
// //                 maxWidth: "450px",
// //                 minWidth: "300px",
// //                 padding: "2rem",
// //                 borderRadius: "8px",
// //                 margin: "0 20px",
// //                 backgroundRepeat: "no-repeat",
// //                 color: "white",
// //               }}
// //             >
// //               <h3>Add Property</h3>
// //               <Form.Group controlId="phone">
// //                 <Form.Label>Phone Number</Form.Label>
// //                 <Form.Control
// //                   type="text"
// //                   value={phoneNumber}
// //                   readOnly
// //                   disabled
// //                 />
// //               </Form.Group>

// //               <Form onSubmit={handleSubmit}>
// //                 {/* Step 1: Show the first 5 fields */}
// //                 {currentStep >= 1 && (
// //                   <div>
// //                     <Form.Group controlId="propertyMode" className="mt-3">
// //                       <Form.Label>Property Mode</Form.Label>
// //                       <Form.Control
// //                         as="select"
// //                         value={propertyMode}
// //                         onChange={(e) => setPropertyMode(e.target.value)}
// //                       >
// //                         <option value="">Select Mode</option>
// //                         <option value="Rent">Rent</option>
// //                         <option value="Buy">Buy</option>
// //                         <option value="Sell">Sell</option>
// //                       </Form.Control>
// //                     </Form.Group>

// //                     <Form.Group controlId="propertyType" className="mt-3">
// //                       <Form.Label>Property Type</Form.Label>
// //                       <Form.Control
// //                         as="select"
// //                         value={propertyType}
// //                         onChange={(e) => setPropertyType(e.target.value)}
// //                       >
// //                         <option value="">Select Property Type</option>
// //                         <option value="Apartment">Apartment</option>
// //                         <option value="House">House</option>
// //                         <option value="Villa">Villa</option>
// //                       </Form.Control>
// //                     </Form.Group>

// //                     <Form.Group controlId="price" className="mt-3">
// //                       <Form.Label>Price</Form.Label>
// //                       <Form.Control
// //                         type="number"
// //                         value={price}
// //                         onChange={(e) => setPrice(e.target.value)}
// //                       />
// //                     </Form.Group>

// //                     <Form.Group controlId="description" className="mt-3">
// //                       <Form.Label>Description</Form.Label>
// //                       <Form.Control
// //                         as="textarea"
// //                         rows={3}
// //                         value={description}
// //                         onChange={(e) => setDescription(e.target.value)}
// //                       />
// //                     </Form.Group>

//                     // {/* Photo Upload */}
//                     // <div className="form-group">
//                     //   <label>Upload Photos:</label>
//                     //   <input
//                     //     type="file"
//                     //     multiple
//                     //     accept="image/*"
//                     //     onChange={handlePhotoUpload}
//                     //     name="photos"
//                     //   />
//                     // </div>

//                     // {/* Display Uploaded Photos */}
//                     // {photos.length > 0 && (
//                     //   <div>
//                     //     <h4>Uploaded Photos</h4>
//                     //     {photos.map((photo, index) => (
//                     //       <div key={index} style={{ textAlign: 'center', margin: '10px' }}>
//                     //         <img
//                     //           src={URL.createObjectURL(photo)}
//                     //           alt="Uploaded"
//                     //           style={{ width: '80px', height: '80px', objectFit: 'cover' }}
//                     //         />
//                     //         <p
//                     //           style={{ color: 'red', cursor: 'pointer' }}
//                     //           onClick={() => removePhoto(index)}
//                     //         >
//                     //           Remove
//                     //         </p>
//                     //       </div>
//                     //     ))}
//                     //   </div>
//                     // )}

//                     // {/* Video Upload */}
//                     // <div className="form-group">
//                     //   <label>Upload Video</label>
//                     //   <input
//                     //     type="file"
//                     //     name="video"
//                     //     accept="video/*"
//                     //     onChange={handleVideoChange}
//                     //   />
//                     // </div>

//                     // {video && (
//                     //   <div>
//                     //     <h4>Selected Video:</h4>
//                     //     <video width="200" controls>
//                     //       <source src={URL.createObjectURL(video)} type="video/mp4" />
//                     //       Your browser does not support the video tag.
//                     //     </video>
//                     //   </div>
//                     // )}
                

// // <div className="text-center mt-4">
// //   <div
// //     style={{
// //       display: 'inline-block',
// //       backgroundColor: 'rgb(219, 219, 219)',  
// //       padding: '10px',              
// //       borderRadius: '50%',          
// //       cursor: 'pointer',           
// //     }}
// //     onClick={handleShowMore}
// //   >
// //     <MdKeyboardDoubleArrowDown
// //       size={50}  
// //       style={{ color: 'rgb(58, 57, 57)' }}  
// //     />
// //   </div>
// // </div>


// //                 </div>
// //                 )}

// //                 {/* Step 2: Show the next set of fields */}
// //                 {currentStep >= 2 && (
// //                   <div>
// //                     <Form.Group controlId="propertyAge" className="mt-3">
// //                       <Form.Label>Property Age</Form.Label>
// //                       <Form.Control
// //                         as="select"
// //                         value={propertyAge}
// //                         onChange={(e) => setPropertyAge(e.target.value)}
// //                       >
// //                         <option value="">Select Property Age</option>
// //                         <option value="Newly Build">Newly Build</option>
// //                         <option value="2 Years">2 Years</option>
// //                         <option value="3 Years">3 Years</option>
// //                         <option value="4 Years">4 Years</option>
// //                         <option value="5 Years">5 Years</option>
// //                       </Form.Control>
// //                     </Form.Group>

// //                     <Form.Group controlId="bankLoan" className="mt-3">
// //                       <Form.Label>Bank Loan Available</Form.Label>
// //                       <Form.Control
// //                         as="select"
// //                         value={bankLoan}
// //                         onChange={(e) => setBankLoan(e.target.value)}
// //                       >
// //                         <option value="">Select</option>
// //                         <option value="Yes">Yes</option>
// //                         <option value="No">No</option>
// //                       </Form.Control>
// //                     </Form.Group>

// //                     <Form.Group controlId="negotiation" className="mt-3">
// //                       <Form.Label>Negotiation</Form.Label>
// //                       <Form.Control
// //                         as="select"
// //                         value={negotiation}
// //                         onChange={(e) => setNegotiation(e.target.value)}
// //                       >
// //                         <option value="">Select</option>
// //                         <option value="Yes">Yes</option>
// //                         <option value="No">No</option>
// //                       </Form.Control>
// //                     </Form.Group>

// //                     <Form.Group controlId="length" className="mt-3">
// //                       <Form.Label>Length (in meters)</Form.Label>
// //                       <Form.Control
// //                         type="number"
// //                         placeholder='Area Length'
// //                         value={length}
// //                         onChange={(e) => setLength(e.target.value)}
// //                       />
// //                     </Form.Group>

// //                     <Form.Group controlId="breadth" className="mt-3">
// //                       <Form.Label>Breadth (in meters)</Form.Label>
// //                       <Form.Control
// //                         type="number"
// //                         placeholder='Area Breadth'
// //                         value={breadth}
// //                         onChange={(e) => setBreadth(e.target.value)}
// //                       />
// //                     </Form.Group>
                 
                

// //                     <div className="text-center mt-4">
// //   <div
// //     style={{
// //       display: 'inline-block',
// //       backgroundColor: 'rgb(219, 219, 219)',  
// //       padding: '10px',              
// //       borderRadius: '50%',          
// //       cursor: 'pointer',           
// //     }}
// //     onClick={handleShowMore}
// //   >
// //     <MdKeyboardDoubleArrowDown
// //       size={50}  
// //       style={{ color: 'rgb(58, 57, 57)' }}  
// //     />
// //   </div>
// // </div>

// // </div>
// // )}


// //                 {/* Final Submit Button */}
// //                 <Button variant="primary" type="submit" style={{ marginTop: '15px' }}>
// //                   Submit Property
// //                 </Button>
// //               </Form>
// //             </div>
// //           </div>
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // };

// // export default AddProperty;





















// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import { FaBath,FaCity,FaBuilding, FaBed,FaCar, FaEnvelope,FaCalendarAlt,FaMapSigns, FaChartArea, FaCheckCircle, FaDollarSign, FaFileVideo, FaHandshake, FaHome, FaMapMarkerAlt, FaMoneyBill, FaPhoneAlt, FaRegBuilding, FaRulerCombined, FaTools, FaUserAlt } from 'react-icons/fa';
// import { FaKitchenSet } from "react-icons/fa6";
// import { BsBuildingsFill } from "react-icons/bs";
// import { GiHouse, GiGears } from "react-icons/gi";
// import {  FaClock, FaImage, FaRegAddressCard } from 'react-icons/fa6';
// import { MdAddPhotoAlternate, MdDescription, MdKeyboardDoubleArrowDown } from 'react-icons/md';



// import './AddProperty.css';

// const AddProperty = () => {
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

//   // // Save phone number from local storage on component mount
//   // useEffect(() => {
//   //   const storedPhoneNumber = localStorage.getItem('userPhoneNumber');
//   //   if (storedPhoneNumber) {
//   //     setPhoneNumber(storedPhoneNumber);
//   //   }
//   // }, []);


//   // useEffect(() => {
//   //   // Retrieve phone number from local storage
//   //   const storedPhoneNumber = localStorage.getItem('userPhoneNumber');
//   //   if (storedPhoneNumber) {
//   //     setPhoneNumber(storedPhoneNumber);
//   //   }

//   //   // Retrieve last used ppcId from localStorage or set to 1000 if it doesn't exist
//   //   let lastUsedPpcId = parseInt(localStorage.getItem('lastUsedPpcId') || '1000');

//   //   // Increment the ppcId for the new user
//   //   lastUsedPpcId++;

//   //   // Save the new ppcId in state and localStorage
//   //   setPpcId(lastUsedPpcId);
//   //   localStorage.setItem('lastUsedPpcId', lastUsedPpcId.toString());

//   //   // Store the ppcId with the user's phone number in local storage (or a database)
//   //   localStorage.setItem(storedPhoneNumber, lastUsedPpcId.toString());
//   // }, [phoneNumber]);


//   useEffect(() => {
//     // Retrieve phone number from local storage
//     const storedPhoneNumber = localStorage.getItem('userPhoneNumber');
//     if (storedPhoneNumber) {
//       setPhoneNumber(storedPhoneNumber);
//     }
  
//     // Check if the phone number already has an associated ppcId
//     const existingPpcId = localStorage.getItem(storedPhoneNumber);
  
//     let newPpcId;
  
//     // If no ppcId is associated with this phone number, create a new one
//     if (!existingPpcId) {
//       // Retrieve last used ppcId from localStorage or set to 1000 if it doesn't exist
//       let lastUsedPpcId = parseInt(localStorage.getItem('lastUsedPpcId') || '1000');
//       lastUsedPpcId++; // Increment the ppcId for the new user
  
//       newPpcId = lastUsedPpcId;
  
//       // Save the new ppcId in state and localStorage
//       localStorage.setItem('lastUsedPpcId', lastUsedPpcId.toString());
//       localStorage.setItem(storedPhoneNumber, newPpcId.toString()); // Store the new ppcId for this phone number
//     } else {
//       // If there's already a ppcId, use it
//       newPpcId = parseInt(existingPpcId);
//     }
  
//     // Set the new or existing ppcId in state
//     setPpcId(newPpcId);
  
//   }, [phoneNumber]);
  


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
//       facing
//     });

//     // Increment currentStep to show next set of fields
//     setCurrentStep(currentStep + 1);
//   };

//   // // Handle form submission
//   // const handleSubmit = (e) => {
//   //   e.preventDefault();

//   //   // Display all form data when the final submit button is clicked
//   //   console.log({
//   //     phoneNumber,
//   //     propertyMode,
//   //     propertyType,
//   //     price,
//   //     description,
//   //     photos,
//   //     video,
//   //     propertyAge,
//   //     bankLoan,
//   //     negotiation,
//   //     length,
//   //     breadth,
//   //     totalArea,
//   //     ownership,
//   //     bedrooms,
//   //     kitchen,
//   //     kitchenType,
//   //     balconies,
//   //     floorNo,
//   //     areaUnit,
//   //     propertyApproved,
//   //     postedBy,
//   //     facing
//   //   });

//   //   // Reset form after submission
//   //   setPhoneNumber('');
//   //   setPropertyMode('');
//   //   setPropertyType('');
//   //   setPrice('');
//   //   setDescription('');
//   //   setPhotos([]);
//   //   setVideo(null);
//   //   setPropertyAge('');
//   //   setBankLoan('');
//   //   setNegotiation('');
//   //   setLength('');
//   //   setBreadth('');
//   //   setTotalArea('');
//   //   setOwnership('');
//   //   setBedrooms('');
//   //   setKitchen('');
//   //   setKitchenType('');
//   //   setBalconies('');
//   //   setFloorNo('');
//   //   setAreaUnit('');
//   //   setPropertyApproved('');
//   //   setPostedBy('');
//   //   setFacing('');
//   //   setCurrentStep(1);
//   // };

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
//     salesMode,  // Missing field added
//     salesType,  // Missing field added
//     furnished,  // Missing field added
//     lift,  // Missing field added
//     attachedBathrooms,  // Missing field added
//     western,  // Missing field added
//     numberOfFloors,  // Missing field added
//     carParking,  // Missing field added
//     rentalPropertyAddress,  // Missing field added
//     country,  // Missing field added
//     state,  // Missing field added
//     city,  // Missing field added
//     district,  // Missing field added
//     area,  // Missing field added
//     streetName,  // Missing field added
//     doorNumber,  // Missing field added
//     nagar,  // Missing field added
//     ownerName,  // Missing field added
//     email,  // Missing field added
//     bestTimeToCall,  // Missing field added
//     rentAmount,  // Missing field added
//     rentSecurityAmount,  // Missing field added
//     rentMaintenanceCharge,  // Missing field added
//     maintancePer,  // Missing field added
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
           
// {/* 
//             <Form.Group controlId="phone">
//               <Form.Control
//                 type="number"
//                 value={ppcId}
//                 readOnly
//                 disabled
//               />
//             </Form.Group>

//             <Form.Group controlId="phone">
//               <Form.Label>Phone Number</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={phoneNumber}
//                 readOnly
//                 disabled
//               />
//             </Form.Group> */}

//             <h6 className='text-white p-3 ' style={{backgroundColor:"rgb(47,116,127)"}}>PPC-ID : {ppcId} </h6>



//               <Form.Group controlId="phone">
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


//               {/* Step 1: Show the first 5 fields */}
//               {currentStep === 1 && (
//                 <div>

                

//                     {/* Photo Upload */}
// <div className="form-group photo-upload-container">
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
//             className="uploaded-photo"
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
//               <option value="Rent">Rent</option>
//               <option value="Buy">Buy</option>
//               <option value="Sell">Sell</option>
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
//               <option value="Apartment">Apartment</option>
//               <option value="House">House</option>
//               <option value="Villa">Villa</option>
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

                 
//                     {/* Video Upload */}
//                   <div className="form-group mt-3">
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
//       <FaFileVideo 
//        style={{color:"white", 
//         backgroundColor:"#2e86e4",
//         padding:"5px", 
//         fontSize:"30px",
//         marginRight:"5px"
//         }} />  
//       Upload Property Video
//       </label>

//       {/* Display the selected video */}
//       {video && (
//         <div className="selected-video-container">
//           <h4>Selected Video:</h4>
//           <video width="300" controls>
//             <source src={URL.createObjectURL(video)} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       )}
//     </div>

//                 </div>
//               )}

//               {/* Step 2: Show next 5 fields */}
//               {currentStep === 2 && (
//                 <div>
//                     <Form.Group controlId="propertyAge">
//           <div className="input-card">
//             <FaCalendarAlt className="input-icon" />
//             <Form.Control
//               as="select"
//               value={propertyAge}
//               onChange={(e) => setPropertyAge(e.target.value)}
//               className="form-input"
//             >
//               <option value="">Select Property Age</option>
//               <option value="Newly Built">Newly Built</option>
//               <option value="2 Years">2 Years</option>
//               <option value="3 Years">3 Years</option>
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
//               <option value="">Select Bank Loan Availability</option>
//               <option value="Yes">Yes</option>
//               <option value="No">No</option>
//             </Form.Control>
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

//         {/* Length */}
//         <Form.Group controlId="length">
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

             

//               {currentStep === 3 && (
//                 <div>
//                   <Form.Group controlId="ownership">
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

//         {/* Bedrooms */}
//         <Form.Group controlId="bedrooms">
//           <div className="input-card">
//             <FaBed className="input-icon" />
//             <Form.Control
//               type="number"
//               value={bedrooms}
//               onChange={(e) => setBedrooms(e.target.value)}
//               className="form-input"
//               placeholder="Bedrooms"
//             />
//           </div>
//         </Form.Group>

      

//         {/* Floor Number */}
//         <Form.Group controlId="floorNo">
//           <div className="input-card">
//             <BsBuildingsFill className="input-icon" />
//             <Form.Control
//               type="number"
//               value={floorNo}
//               onChange={(e) => setFloorNo(e.target.value)}
//               className="form-input"
//               placeholder="Floor Number"
//             />
//           </div>
//         </Form.Group>

    

//         {/* Posted By */}
//         <Form.Group controlId="postedBy">
//           <div className="input-card">
//             <FaUserAlt className="input-icon" />
//             <Form.Control
//               type="text"
//               value={postedBy}
//               onChange={(e) => setPostedBy(e.target.value)}
//               className="form-input"
//               placeholder="Posted By"
//             />
//           </div>
//         </Form.Group>

//         {/* Description */}
//         <Form.Group controlId="description">
//           <div className="input-card">
//             <MdDescription className="input-icon" />
//             <Form.Control
//               as="textarea"
//               rows={3}
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="form-input"
//               placeholder="Description"
//             />
//           </div>
//         </Form.Group>

//                 </div>
//               )}


// {currentStep === 4 && (
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
//       <option value="Traditional">Traditional</option>
//       <option value="Open">Open</option>
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
//       <option value="">Select Number of Balconies</option>
//       <option value="0">0</option>
//       <option value="1">1</option>
//       <option value="2">2</option>
//       <option value="3+">3+</option>
//     </Form.Control>
//   </div>
// </Form.Group>


// <Form.Group controlId="areaUnit">
//   <div className="input-card">
//     <FaRegBuilding className="input-icon" />
//     <Form.Control
//       as="select"
//       value={areaUnit}
//       onChange={(e) => setAreaUnit(e.target.value)}
//       className="form-input"
//     >
//       <option value="">Select Area Unit</option>
//       <option value="sqft">Sq. Ft.</option>
//       <option value="sqm">Sq. M.</option>
//       <option value="acre">Acre</option>
//     </Form.Control>
//   </div>
// </Form.Group>


// <Form.Group controlId="facing">
//   <div className="input-card">
//     <GiHouse  className="input-icon" />
//     <Form.Control
//       as="select"
//       value={facing}
//       onChange={(e) => setFacing(e.target.value)}
//       className="form-input"
//     >
//       <option value="">Select Facing</option>
//       <option value="North">North</option>
//       <option value="South">South</option>
//       <option value="East">East</option>
//       <option value="West">West</option>
//     </Form.Control>
//   </div>
// </Form.Group>

//   </div>
// )}

// {currentStep === 5 && (
// <div>
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


// </div>
// )}


// {currentStep === 6 && (
//   <div>

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

// <Form.Group controlId="rentalPropertyAddress">
//   <div className="input-card">
//     <FaMapMarkerAlt className="input-icon" />
//     <Form.Control
//       type="text"
//       value={rentalPropertyAddress}
//       onChange={(e) => setRentalPropertyAddress(e.target.value)}
//       className="form-input"
//       placeholder="Enter Address"
//     />
//   </div>
// </Form.Group>

// <Form.Group controlId="country">
//   <div className="input-card">
//     <FaCity className="input-icon" />
//     <Form.Control
//       type="text"
//       value={country}
//       onChange={(e) => setCountry(e.target.value)}
//       className="form-input"
//       placeholder="Enter Country"
//     />
//   </div>
// </Form.Group>

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
//   </div>
// )}


// {currentStep === 7 && (
//   <div>

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


// {currentStep === 8 && (
//   <div>
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


// {/* {currentStep === 9 && (
//   <div>

//   </div>
// )} */}

//                {/* Show "Show More" button */}
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
//               {currentStep > 8 && (
//                 <Button
//                   variant="primary"
//                   type="submit"
//                   style={{ marginTop: '15px' }}
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

// export default AddProperty;


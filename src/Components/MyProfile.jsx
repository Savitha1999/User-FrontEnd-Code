
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserAlt, FaEnvelope, FaPhoneAlt, FaHome, FaArrowLeft } from "react-icons/fa";
import logo from '../Assets/Sale Property-01.png'


const MyProfile = () => {
  const { phoneNumber } = useParams(); // Get mobile number from URL
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: "", email: "", mobile: phoneNumber, address: "" });
  const [isEditing, setIsEditing] = useState(false); // Track profile existence
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleAction = () => {
    switch (actionType) {
      case "update":
        handleUpdate();
        setSuccessMessage("Profile updated successfully!");
        break;
      case "create":
        handleSubmit();
        setSuccessMessage("Profile created successfully!");
        break;
      case "logout":
        handleLogout();
        setSuccessMessage("Logged out successfully!");
        break;
      case "permanentLogout":
        handlePermanentLogout();
        setSuccessMessage("Permanently logged out!");
        break;
      default:
        break;
    }

    setShowModal(false);
    setShowSuccess(true);

    // Hide the success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setSuccessMessage("");
    }, 3000);
  };

  const openModal = (type) => {
    setActionType(type);
    setShowModal(true);
  };
  // Fetch Profile Data on Mount
  useEffect(() => {
    if (phoneNumber) {
      axios.get(`${process.env.REACT_APP_API_URL}/profile/mobile/${phoneNumber}`)
        .then((res) => {
          if (res.data) {
            setProfile(res.data); // Ensure correct data structure
            setIsEditing(true);
            setIsLoggedIn(true);
          }
        })
        .catch(() => console.error("Profile not found"));
    }
  }, [phoneNumber]);

  // Handle Input Change
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Create Profile
  const handleSubmit = () => {
    if (!profile.name || !profile.email || !profile.address) {
      alert("Please fill all fields");
      return;
    }

    axios.post(`${process.env.REACT_APP_API_URL}/profile-create`, profile)
      .then((res) => {
        alert("Profile created successfully!");
        setProfile(res.data);
        setIsEditing(true);
        setIsLoggedIn(true);
      })
      .catch((error) => console.error("Error creating profile:", error));
  };

  // Update Profile
  const handleUpdate = () => {
    axios.put(`${process.env.REACT_APP_API_URL}/profile/${profile.mobile}`, {
      name: profile.name,
      email: profile.email,
      address: profile.address,
    })
      // .then(() => alert("Profile updated successfully!"))
      .catch((error) => console.error("Error updating profile:", error));
  };

  // Logout Function
  const handleLogout = () => {
    alert("Logged out successfully!");
    setProfile({ name: "", email: "", mobile: phoneNumber, address: "" });
    setIsEditing(false);
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home/login page
  };

  // Generate Profile Image with First Letter of Name
  const getProfileInitial = () => {
    return profile.name?.charAt(0)?.toUpperCase() || "?";
  };

  // const getProfileInitial = (name = "") => {
  //   return name ? name.charAt(0).toUpperCase() : "?";
  // };

  
  const handlePermanentLogout = async () => {
    const confirm = window.confirm("Are you sure you want to permanently logout?");
    if (!confirm) return;
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/permanent-logout`, {
        phone: profile.mobile
      });
  
      alert(response.data.message || "User permanently logged out.");
      setProfile({ name: "", email: "", mobile: phoneNumber, address: "" });
      setIsEditing(false);
      setIsLoggedIn(false);
      navigate("/"); // Redirect to home/login
    } catch (error) {
      alert("Error logging out permanently.");
    }
  };
  
  

  

  return (
    <div className="container d-flex align-items-center justify-content-center p-0">
     
     <div className="d-flex flex-column align-items-center justify-content-center m-0" 
        style={{ maxWidth: '450px', margin: 'auto', width: '100%' , fontFamily: 'Inter, sans-serif'}}>        
        {/* Header */}
        <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
        <button className="pe-5" onClick={() => navigate("/mobileviews")}>
            <FaArrowLeft color="#30747F" size={20} />
          </button>
          <h3 className="m-0 ms-3" style={{ fontSize: "20px", color: "#30747F" }}>My Profile</h3>
        </div>
        <div className="row g-2 w-100">

       
<div className="text-center my-3 mt-5">
  {profile && profile.name ? (
    // 🟢 User has a profile: Show initials inside a circle
    <div
      className="rounded-circle d-flex align-items-center justify-content-center"
      style={{
        width: "100px",
        height: "100px",
        background: "#30747F",
        color: "#fff",
        fontSize: "40px",
        fontWeight: "bold",
        marginLeft:"35%"
      }}
    >
      {getProfileInitial(profile.name)}
    </div>
  ) : (
    // 🔴 New user: Show default logo image
    <img
      src={logo} // Replace with actual default image URL
      alt="Default Profile"
      className="img-fluid"
      width={80}
    />
  )}
</div>


        {/* Form */}
        <form className="p-4">
         
<div className="form-group mb-3">
  <label htmlFor="name" className="form-label">
    <FaUserAlt className="me-2" color="#4F4B7E" /> <strong>Name</strong>
  </label>
  <input
    type="text"
    name="name"
    value={profile.name}
    onChange={handleChange}
    placeholder="Enter your name"
    required
    style={{
      backgroundColor: "transparent",
      border: "none",
      borderBottom: "1px solid #ccc",
      borderRadius: "0",
      boxShadow: "none",
      outline: "none",
      width: "100%",
    }}
    onFocus={(e) => (e.target.style.borderBottom = "2px solid #4F4B7E")}
    onBlur={(e) => (e.target.style.borderBottom = "1px solid #ccc")}
  />
</div>

<div className="form-group mb-3">
  <label htmlFor="email" className="form-label">
    <FaEnvelope className="me-2" color="#4F4B7E" /> <strong>Email</strong>
  </label>
  <input
    type="email"
    name="email"
    value={profile.email}
    onChange={handleChange}
    placeholder="Enter your email"
    required
    style={{
      backgroundColor: "transparent",
      border: "none",
      borderBottom: "1px solid #ccc",
      borderRadius: "0",
      boxShadow: "none",
      outline: "none",
      width: "100%",
    }}
    onFocus={(e) => (e.target.style.borderBottom = "2px solid #4F4B7E")}
    onBlur={(e) => (e.target.style.borderBottom = "1px solid #ccc")}
  />
</div>

<div className="form-group mb-3">
  <label htmlFor="mobile" className="form-label">
    <FaPhoneAlt className="me-2" color="#4F4B7E" /> <strong>Mobile Number</strong>
  </label>
  <input
    type="tel"
    name="mobile"
    value={profile.mobile}
    readOnly
    placeholder="Mobile number"
    style={{
      backgroundColor: "transparent",
      border: "none",
      borderBottom: "1px solid #ccc",
      borderRadius: "0",
      boxShadow: "none",
      outline: "none",
      width: "100%",
    }}
    onFocus={(e) => (e.target.style.borderBottom = "2px solid #4F4B7E")}
    onBlur={(e) => (e.target.style.borderBottom = "1px solid #ccc")}
  />
</div>

<div className="form-group mb-3">
  <label htmlFor="address" className="form-label">
    <FaHome className="me-2" color="#4F4B7E" /> <strong>Address</strong>
  </label>
  <input
    type="text"
    name="address"
    value={profile.address}
    onChange={handleChange}
    placeholder="Enter your address"
    required
    style={{
      backgroundColor: "transparent",
      border: "none",
      borderBottom: "1px solid #ccc",
      borderRadius: "0",
      boxShadow: "none",
      outline: "none",
      width: "100%",
    }}
    onFocus={(e) => (e.target.style.borderBottom = "2px solid #4F4B7E")}
    onBlur={(e) => (e.target.style.borderBottom = "1px solid #ccc")}
  />
</div>


<div className="col-12 d-flex align-items-center">
  <img src={logo} alt="" width={25} className="me-2"/>
  <div>
    <div style={{ fontSize: "13px", color: "grey" }}>App Version</div>
    <div style={{ fontSize: "15px", fontWeight: 600, color: "grey" }}>
33    </div>
  </div>
</div>
          {/* Buttons */}
          {/* <div className="d-flex flex-column mt-5">
            {isEditing ? (
             <button
             type="button"
             className="btn w-100 mb-2"
             style={{
               background: "#4F4B7E",
               color: "#fff",
               border: "none",
               fontSize: "14px",
               transition: "background 0.2s",
             }}
             onClick={handleUpdate}
             onMouseDown={(e) => (e.target.style.background = "#3e3a6a")}
             onMouseUp={(e) => (e.target.style.background = "#4F4B7E")}
             onMouseLeave={(e) => (e.target.style.background = "#4F4B7E")}
           >
             UPDATE PROFILE
         </button>
            ) : (
              <button
      type="button"
      className="btn w-100 mb-2"
      style={{
        background: "#00B072",
        color: "#fff",
        border: "none",
        fontSize: "14px",
        transition: "background 0.2s",
      }}
      onClick={handleSubmit}
      onMouseDown={(e) => (e.target.style.background = "#008e5e")}
      onMouseUp={(e) => (e.target.style.background = "#00B072")}
      onMouseLeave={(e) => (e.target.style.background = "#00B072")}
    >
      CREATE PROFILE
    </button>
            )}
          
{isLoggedIn && (
  <>
   <button
      type="button"
      className="btn w-100"
      style={{
        color: "black",
        border: "1px solid red",
        fontSize: "14px",
        background: "transparent",
        transition: "background 0.2s",
      }}
      onClick={handleLogout}
      onMouseDown={(e) => (e.target.style.background = "#ffe6e6")}
      onMouseUp={(e) => (e.target.style.background = "transparent")}
      onMouseLeave={(e) => (e.target.style.background = "transparent")}
    >
      LOGOUT
  </button>


<button
      type="button"
      className="btn w-100 mb-2"
      style={{
        background: "red",
        color: "#fff",
        border: "none",
        fontSize: "14px",
        transition: "background 0.2s",
      }}
      onClick={handlePermanentLogout}
      onMouseDown={(e) => (e.target.style.background = "red")}
      onMouseUp={(e) => (e.target.style.background = "red")}
      onMouseLeave={(e) => (e.target.style.background = "red4F4B7E")}
    >
      PERMANENT LOGOUT
  </button>
  </>
)}
          </div> */}

<div className="d-flex flex-column mt-5">
      {isEditing ? (
        <button
          type="button"
          className="btn w-100 mb-2"
          style={{ background: "#4F4B7E", color: "#fff", border: "none", fontSize: "14px" }}
          onClick={() => openModal("update")}
        >
          UPDATE PROFILE
        </button>
      ) : (
        <button
          type="button"
          className="btn w-100 mb-2"
          style={{ background: "#00B072", color: "#fff", border: "none", fontSize: "14px" }}
          onClick={() => openModal("create")}
        >
          CREATE PROFILE
        </button>
      )}

      {isLoggedIn && (
        <>
          <button
            type="button"
            className="btn w-100 mb-2"
            style={{ color: "black", border: "1px solid red", fontSize: "14px", background: "transparent" }}
            onClick={() => openModal("logout")}
          >
            LOGOUT
          </button>

          <button
            type="button"
            className="btn w-100 mb-2"
            style={{ background: "red", color: "#fff", border: "none", fontSize: "14px" }}
            onClick={() => openModal("permanentLogout")}
          >
            PERMANENT LOGOUT
          </button>
        </>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content animate__animated animate__fadeInDown">
              <div className="modal-header">
                <h5 className="modal-title">Please Confirm</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                <p>
                  {actionType === "update" && "Are you sure you want to update the profile?"}
                  {actionType === "create" && "Do you want to create the profile?"}
                  {actionType === "logout" && "Are you sure you want to logout?"}
                  {actionType === "permanentLogout" &&
                    "This will permanently logout your account. Continue?"}
                </p>
              </div>
              <div className="modal-footer">
                <button className="btn" style={{background:"#FF0000" ,  color:"#fff"}} onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" style={{background:"#2F747F" ,  color:"#fff"}} onClick={handleAction}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="w-100 p-2"
style={{  position: "fixed",
  top: "30px",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "#ffffff",
  color: "grey",
  // padding: "12px 20px",
  borderRadius: "8px",
  fontSize: "14px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  zIndex: 1050,
  opacity: 0.95,
  transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
  // Optional animation
  transform: showSuccess ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-20px)",
 }} >  {successMessage}
        </div>
      )}
    </div>
        </form>
        </div>

      </div>
    </div>
  );
};

export default MyProfile;

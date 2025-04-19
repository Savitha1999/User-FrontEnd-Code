import React from 'react'
import business from '../Assets/business.png'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';


export default function BusinessOpportunity() {

  const navigate = useNavigate();




  return (

   <div
   className="d-flex justify-content-center align-items-center"
   style={{ height: "100vh", backgroundColor: "#f8f9fa" }}
 >
   <div
     style={{
       width: "450px",
       height: "100vh",
       overflow: "auto", // Enables scrolling if content overflows
       border: "1px solid #ccc",
       borderRadius: "10px",
       backgroundColor: "#fff",
     }}
   >

          <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
          <button
      onClick={() => navigate(-1)}
      className="pe-5"
      style={{
        backgroundColor: '#f0f0f0',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        display: 'flex',
        alignItems: 'center',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f0f4f5'; // Change background
        e.currentTarget.querySelector('svg').style.color = '#ffffff'; // Change icon color
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#f0f0f0';
        e.currentTarget.querySelector('svg').style.color = '#30747F';
      }}
    >
      <FaArrowLeft style={{ color: '#30747F', transition: 'color 0.3s ease-in-out' , background:"transparent"}} />
    </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>Business Opportunity </h3> </div>
    
     <style>
          {`
            /* Hide scrollbar for all browsers */
            div::-webkit-scrollbar {
              width: 0;
              height: 0;
            }

            div {
              -ms-overflow-style: none; /* IE and Edge */
              scrollbar-width: none; /* Firefox */
            }
          `}
        </style>
     <img
        src={business}
        alt="Scrollable"
       style={{ width: "100%", height: "auto" }}
     />
   </div>
 </div>
)
}




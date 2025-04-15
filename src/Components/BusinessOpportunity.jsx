import React from 'react'
import business from '../Assets/business.png'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';


export default function BusinessOpportunity() {

  const navigate = useNavigate();


  const handlePageNavigation = () => {
    navigate('/mobileviews'); // Redirect to the desired path
  };

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
            <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
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




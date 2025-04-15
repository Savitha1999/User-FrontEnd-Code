












import React, { useEffect, useState } from 'react';
import TopBar from './TopBar';
import BottomNavigation from './BottomNavigation';
import { FaHome, FaBuilding, FaPlusSquare, FaUser, FaEllipsisH } from 'react-icons/fa';
import Nopage from './Nopage';
import MoreComponent from './MoreComponent';
import MyProperty from './MyProperty';
import PropertyCards from './PropertyCards';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import AddProps from './AddProps';
import logo from '../Assets/ppc_sentyourinterest.png';
import logo2 from '../Assets/allprop50.png';
import logo3 from '../Assets/bl50.png';
import logo4 from '../Assets/Rent Property-01.png';
import logo5 from '../Assets/uc50.png';
import logo6 from '../Assets/groom.PNG';
import logo7 from '../Assets/fprop50.png';
import nvprop50 from '../Assets/nvprop50.PNG';
import logo9 from '../Assets/my50.png';
import logo10 from '../Assets/seller50.png';
import logo11 from '../Assets/buyer50.PNG';
import PropertyForm from './PropertyAssistance';
import TopMyProperty from './TopMyProperty';
import OwnerMenu from './OwnerMenu';
import BuyerMenu from './BuyerMenu';
import CardsDemo from './CardsDemo';
import BuyerList from './BuyerList';
import ZeroView from './ZeroView';
import Building from './Building';
import Navbar from "./Navbar";
import FeaturedProperty from './FeatureProperty';
import BuyerLists from './BuyerLists';
import PyProperty from './PyProperty';
import AllProperty from './AllProperty';

const Main = () => {
  const [ppcId, setPpcId] = useState(null); // Add state for ppcId
  const navigate = useNavigate();
  const location = useLocation();

  const { phoneNumber: statePhoneNumber, countryCode: stateCountryCode } = location.state || {};
  const storedPhoneNumber = localStorage.getItem('phoneNumber');
  const storedCountryCode = localStorage.getItem('countryCode');

  const phoneNumber = statePhoneNumber || storedPhoneNumber;
  const countryCode = stateCountryCode || storedCountryCode;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden"; // Apply globally

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);
  useEffect(() => {
    if (phoneNumber && countryCode) {
      localStorage.setItem('phoneNumber', phoneNumber);
      localStorage.setItem('countryCode', countryCode);
      // handlehomeProperty(); // Automatically call handlehomeProperty when the component mounts
    } else {
    }
  }, [phoneNumber, countryCode]);


  const [activeContent, setActiveContent] = useState('bottomHome'); 

  const topBarItems = [
    { icon: logo, text: 'Py Property', content: 'topPyProperty' },
    { icon: logo2, text: 'All Property', content: 'topAllProperty' },
    { icon: logo3, text: 'Buyer List', content: 'topMBuyerList' },
    { icon: logo4, text: 'Rent Property', content: 'topRentProperty' },
    { icon: logo5, text: 'Used Cars', content: 'topUsedCars' },
    { icon: logo6, text: 'Pm Groom', content: 'topPmGroom' },
    { icon: logo6, text: 'Pm Bride', content: 'topPmBride' },
    { icon: logo7, text: 'Feature Property', content: 'topFeatureProperty' },
    { icon: nvprop50, text: 'Not Viewed Property', content: 'topNotViewedProperty' },
    { icon: logo9, text: 'My Property', content: 'topMyProperty' },
    { icon: logo10, text: 'Owner Menu', content: 'topOwnerMenu' },
    { icon: logo11, text: 'Buyer Menu', content: 'topBuyerMenu' },
  ];



  const bottomNavItems = [
    { icon: <FaHome />, text: 'Home', content: 'bottomHome' },
    { icon: <FaBuilding />, text: 'MyProperty', content: 'bottomProperty' },
    { icon: <FaPlusSquare />, text: 'AddProperty', content: 'bottomAdd'  },
    { icon: <FaUser />, text: 'Buyer', content: 'bottomBuyer' },
    { icon: <FaEllipsisH />, text: 'More', content: 'bottomMore' },
  ];

  const renderContent = () => {
    switch (activeContent) {
      case 'topPyProperty': return <PyProperty />;
      case 'topAllProperty': return <AllProperty phoneNumber={`${phoneNumber}`}  />;
      case 'topMBuyerList': return <BuyerLists phoneNumber={`${phoneNumber}`} />;
      case 'topRentProperty': return <Building />;
      case 'topUsedCars': return <Building />;
      case 'topPmGroom': return <Building />;
      case 'topPmBride': return <Building />;
      case 'topFeatureProperty': return <FeaturedProperty />;
      case 'topNotViewedProperty': return <ZeroView />;
      case 'topMyProperty': return <MyProperty phoneNumber={`${phoneNumber}`} />;
      case 'topOwnerMenu': return <OwnerMenu phoneNumber={`${phoneNumber}`}  />;
      case 'topBuyerMenu': return <BuyerMenu phoneNumber={`${phoneNumber}`} />;
      case 'bottomHome': return <PropertyCards  phoneNumber={`${phoneNumber}`} />;
      case 'bottomProperty': 
      // return <MyProperty />
         return <MyProperty phoneNumber={`${phoneNumber}` } />;
      case 'bottomAdd': 
      // return <AddProps />
        return <AddProps  phoneNumber={`${phoneNumber}`} />;
      case 'bottomBuyer': return <PropertyForm  phoneNumber={`${phoneNumber}`} />;
      case 'bottomMore': return <MoreComponent  phoneNumber={`${phoneNumber}`} />;
      default: return <Nopage />;
    }
  };

  return (
   
<div className="d-flex justify-content-center align-items-center" 
     style={{ minHeight: "100vh", background: '#E5E5E5' }}> 

  {/* Main Container - Expands for larger screens */}
  <div style={{ 
       maxWidth: '100%',  // Use full width on large screens
       width: "100vw",     // Adjust for all screen sizes
       maxWidth: '470px',  // Limit width to 470px on small screens
       background: 'white', 
       display: "flex", 
       flexDirection: "column", 
       height: "100vh", 
       overflow: "hidden",
       boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" // Light shadow for aesthetics
     }}>

    {/* Navbar - Fixed on Top */}
    <div className="position-fixed top-0 start-50 translate-middle-x" 
         style={{ width: "100%", maxWidth: "470px", zIndex: 1050 }}>
      <Navbar />
    </div>

    {/* TopBar - Below Navbar */}
    <div className="position-fixed start-50 translate-middle-x" 
         style={{ top: "60px", width: "100%", maxWidth: "470px", zIndex: 1040 }}>
      <TopBar items={topBarItems} setActive={setActiveContent} activeItem={activeContent} />
    </div>

    {/* Content Section - Scrollable */}
    <div className="flex-grow-1 mx-auto" 
         style={{ 
           width: "100%", 
           maxWidth: "470px", 
           overflowY: "auto", 
           paddingTop: "144px", 
           paddingBottom: "90px",
           scrollbarWidth:"none", 
           position:"relative"
           }}>
      {renderContent()}
    </div>

    {/* Bottom Navigation - Fixed at Bottom */}
    <div className="position-fixed bottom-0 start-50 translate-middle-x" 
         style={{ width: "100%", maxWidth: "470px", zIndex: 1050 }}>
      <BottomNavigation 
        items={bottomNavItems}
        setActive={setActiveContent}
        activeItem={activeContent}
      />
    </div>

  </div>
</div>

  );
};

export default Main;














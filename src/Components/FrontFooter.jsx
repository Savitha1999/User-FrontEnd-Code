

import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import pondypropertyApp from '../Assets/pondypropertyApp.png'
import rentpondylogo from '../Assets/rentpondylogo.png'
import tamilmatrim from '../Assets/TamilMatrim.png'
import tamilusedcards from '../Assets/tamilUsedcards.png'
import pondymat from '../Assets/PondyMat.png'
import pondyjob from '../Assets/pondyJob.png'
import bikesapplogo from '../Assets/bikesApplogo.png'
import facebook from '../Assets/facebook_5968764.png'
import insta from '../Assets/instagram_2111463.png'
import youtube from '../Assets/youtubee.png'

export default function FrontFooter() {
  const [hoveredLink, setHoveredLink] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredLink(index);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  const linkStyle = {
    textDecoration: "none",
    color: "white",
    position: "relative",
    display: "inline-block",
    transition: "all 0.3s ease",
  };

  const hoverEffectStyle = (index) => ({
    color: hoveredLink === index ? "#ffc631" : "white",
    borderBottom: hoveredLink === index ? "2px solid #ffc631" : "none",
  });

  return (

  <footer className="footer text-white py-5" style={{ background: '#001f3f' }}>
      <Container className='mt-2'>
        <Row>
          {/* Column 1: About Us */}
          <Col md={3}>
            <h5>About Us</h5>
            <div style={{ borderBottom: "2px solid purple", width: "17%", marginTop: "6px", marginBottom: "5px" }}></div>
            <ul className="list-unstyled">
  <li>
    <Link
      to="/about"
      style={{ ...linkStyle, ...hoverEffectStyle(0) }}
      onMouseEnter={() => handleMouseEnter(0)}
      onMouseLeave={handleMouseLeave}
    >
      About us
    </Link>
  </li>
  <li>
  <Link
      to="/terms-conditions-web"
      style={{ ...linkStyle, ...hoverEffectStyle(4) }}
      onMouseEnter={() => handleMouseEnter(4)}
      onMouseLeave={handleMouseLeave}
    >
Terms & Conditions    </Link>
</li>
  <li>
    <Link
      to="/privacy-web"
      style={{ ...linkStyle, ...hoverEffectStyle(1) }}
      onMouseEnter={() => handleMouseEnter(1)}
      onMouseLeave={handleMouseLeave}
    >
      Privacy Policy
    </Link>
  </li>
  <li>
    <Link
      to="/shiping-delivery"
      style={{ ...linkStyle, ...hoverEffectStyle(2) }}
      onMouseEnter={() => handleMouseEnter(2)}
      onMouseLeave={handleMouseLeave}
    >
      Shipping & Delivery
    </Link>
  </li>
</ul>

          </Col>

          {/* Column 2: How to Sell Fast */}
          <Col md={3}>
            <h5>How to Sell Fast</h5>
            <div style={{ borderBottom: "2px solid purple", width: "17%", marginTop: "6px", marginBottom: "5px" }}></div>
            <ul className="list-unstyled">
              <li>
    <Link
      to="https://rentpondy.com/pricing.php"
      style={{ ...linkStyle, ...hoverEffectStyle(6) }}
      onMouseEnter={() => handleMouseEnter(6)}
      onMouseLeave={handleMouseLeave}
    >
Price Plan    </Link>
  </li>            </ul>
          </Col>

          {/* Column 3: Help & Support */}
          <Col md={3}>
            <h5>Help & Support</h5>
            <div style={{ borderBottom: "2px solid purple", width: "17%", marginTop: "6px", marginBottom: "5px" }}></div>
            <ul className="list-unstyled">
              <li>
              <Link
                to={'/Frequently-Asked-Questions'}
                style={{ ...linkStyle, ...hoverEffectStyle(5) }}
                onMouseEnter={() => handleMouseEnter(5)}
                onMouseLeave={handleMouseLeave}
              >
                FAQ
              </Link>
              </li>
              <li>
              <Link
                to={'/contactus'}
                style={{ ...linkStyle, ...hoverEffectStyle(3) }}
                onMouseEnter={() => handleMouseEnter(3)}
                onMouseLeave={handleMouseLeave}
              >
                Contact us
              </Link>
              </li>
              <li className='hhh'>Delete My Account</li>
            </ul>
          </Col>

          {/* Column 4: Follow Us On */}
          <Col md={3}>
            <h5>Follow Us On</h5>
            <div style={{ borderBottom: "2px solid purple", width: "17%", marginTop: "6px", marginBottom: "15px" }}></div>
            {/* <div className="social-icons">
              <a href="https://www.facebook.com/pondyproperty">
              <img
      src={facebook}
      alt=""
      style={{ width: "30px", marginRight: "5px" }}
    />              </a>

              <a href="https://www.instagram.com/pondy_property?igsh=MWZyMTJvbnhlOWhncg%3D%3D&utm_source=qr"  target="_blank" rel="noopener noreferrer">
              <img
      src={insta}
      alt=""
      style={{ width: "30px", marginRight: "5px" }}
    /></a>

              <a href="https://www.youtube.com/@pondyclassifieds15" className="text-white "  target="_blank" rel="noopener noreferrer">
              <img
      src={youtube}
      alt=""
      style={{ width: "30px", marginRight: "5px" }}
    />               </a>
            </div> */}

<div className="flex mt-1">
  <a href="https://www.facebook.com/pondyproperty" className="text-white" target="_blank" rel="noopener noreferrer">
    <img
      src={facebook}
      alt=""
      style={{ width: "30px", marginRight: "5px" }}
    />
  </a>
  <a href="https://www.instagram.com/pondy_property?igsh=MWZyMTJvbnhlOWhncg%3D%3D&utm_source=qr" className="text-white" target="_blank" rel="noopener noreferrer">
    <img
      src={insta}
      alt=""
      style={{ width: "30px", marginRight: "5px" }}
    />
  </a>
  <a href="https://www.youtube.com/@pondyclassifieds15" className="text-white" target="_blank" rel="noopener noreferrer">
    <img
      src={youtube}
      alt=""
      style={{ width: "35px", marginRight: "5px" , height:"50px"}}
    />
  </a>

</div>
<h5>Our Apps</h5>

            <div className="flex mt-1">
  <a href="https://play.google.com/store/apps/details?id=com.apps.ppcpondy" className="text-white" target="_blank" rel="noopener noreferrer">
    <img
      src={pondypropertyApp}
      alt=""
      style={{ width: "30px", marginRight: "5px" }}
    />
  </a>
  <a href="https://play.google.com/store/apps/details?id=com.apps.rentpondy" className="text-white" target="_blank" rel="noopener noreferrer">
    <img
      src={rentpondylogo}
      alt=""
      style={{ width: "30px", marginRight: "5px" }}
    />
  </a>
  <a href="https://play.google.com/store/apps/details?id=com.thulirsolutions.tamilnadumatrimony" className="text-white" target="_blank" rel="noopener noreferrer">
    <img
      src={tamilmatrim}
      alt=""
      style={{ width: "30px", marginRight: "5px" }}
    />
  </a>
  <a href="https://play.google.com/store/apps/details?id=com.apps.tamilnaduusedcars" className="text-white" target="_blank" rel="noopener noreferrer">
    <img
      src={tamilusedcards}
      alt=""
      style={{ width: "30px" }}
    />
  </a>

</div>

<div className="flex mt-1">

  <a href="https://play.google.com/store/apps/details?id=com.thulirsolutions.pondicherrymatrimony" className="text-white" target="_blank" rel="noopener noreferrer">
    <img
      src={pondymat}
      alt=""
      style={{ width: "30px", marginRight: "5px" }}
    />
  </a>
    <a href="https://play.google.com/store/apps/details?id=com.apps.pondyjob" className="text-white" target="_blank" rel="noopener noreferrer">
    <img
      src={pondyjob}
      alt=""
      style={{ width: "30px", marginRight: "5px" }}
    />
  </a>  

  <a href="https://play.google.com/store/apps/details?id=com.apps.pondybikes" className="text-white" target="_blank" rel="noopener noreferrer">
    <img
      src={bikesapplogo}
      alt=""
      style={{ width: "30px", marginRight: "5px" }}
    />
  </a>
</div>
          </Col>
        </Row>
        <hr />
        <p className='text-center mt-4'>Copyright © 2025. All rights reserved.</p>
      </Container>
    </footer>
)
}

















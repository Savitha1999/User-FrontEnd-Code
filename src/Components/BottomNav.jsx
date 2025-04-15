

import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import AddHomeIcon from '@mui/icons-material/AddHome';
import './BottomNav.css';

function BottomNav({ value, onChange }) {
  return (
    <>      
      <BottomNavigation value={value} onChange={onChange} className="nav">
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="MyProperty" icon={<BusinessIcon />} />
        <BottomNavigationAction label="AddProperty" icon={<AddHomeIcon />} />
        <BottomNavigationAction label="BuyerList" icon={<PersonIcon />} />
        <BottomNavigationAction label="More" icon={<MoreHorizIcon />} />
        {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="filter-svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>   */}
      </BottomNavigation>
    </>
  );
}

export default BottomNav;

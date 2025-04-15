




import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import AddHomeIcon from '@mui/icons-material/AddHome';
import './BottomNav.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BottomNav({ onChange }) {
  // const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [message,setMessage]= useState();

  // Extract phoneNumber and countryCode from location.state or localStorage
  const { phoneNumber: statePhoneNumber, countryCode: stateCountryCode } = location.state || {};
  const storedPhoneNumber = localStorage.getItem('phoneNumber');
  const storedCountryCode = localStorage.getItem('countryCode');

  const phoneNumber = statePhoneNumber || storedPhoneNumber;
  const countryCode = stateCountryCode || storedCountryCode;

  const handleAddProperty = async () => {
    if (!phoneNumber || !countryCode) {
      setMessage('Missing phone number or country code.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/store-data`, {
        phoneNumber: `${countryCode}${phoneNumber}`,
      });

      if (response.status === 201) {
        setTimeout(() => {
          navigate('/add-form', {
            state: { ppcId: response.data.ppcId, phoneNumber: `${countryCode}${phoneNumber}` },
          });
        }, 100);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || 'Error adding user.');
      } else {
        setMessage('Error adding user. Please try again.');
      }
      console.error('Frontend Error:', error);
    }
  };

  const handlefetchProperty = async () => {
    if (!phoneNumber || !countryCode) {
      setMessage('Missing phone number or country code.');
      return;
    }
  
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-datas`, {
        params: { phoneNumber: `${countryCode}${phoneNumber}` }
      });

      if (response.status === 200) {
        // Check if the data exists
        const users = response.data.users;
        if (users && users.length > 0) {
          setTimeout(() => {
            navigate('/my', {
              state: { phoneNumber: `${countryCode}${phoneNumber}`, users },
            });
          }, 100);
        } else {
          setMessage('No properties added yet.');
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || 'Error fetching property.');
      } else {
        setMessage('Error fetching property. Please try again.');
      }
      console.error('Frontend Error:', error);
    }
  };

  React.useEffect(() => {
    if (phoneNumber && countryCode) {
      localStorage.setItem('phoneNumber', phoneNumber);
      localStorage.setItem('countryCode', countryCode);
    } else {
      setMessage('Missing required information to add property.');
    }
  }, [phoneNumber, countryCode]);

  return (
    <>
      <BottomNavigation  onChange={onChange} className="nav">
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction onClick={handlefetchProperty} label="Property" icon={<BusinessIcon />} />
        <BottomNavigationAction onClick={handleAddProperty} label="HomeProperty" icon={<AddHomeIcon />} />
        <BottomNavigationAction label="Buyer" icon={<PersonIcon />} />
        <BottomNavigationAction label="More" icon={<MoreHorizIcon />} />
      </BottomNavigation>
    </>
  );
}

export default BottomNav;














import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import AddHomeIcon from '@mui/icons-material/AddHome';
import PersonIcon from '@mui/icons-material/Person';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Paper from '@mui/material/Paper';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; // <-- Add this import for navigate


// Example RentCard component
function RentCard({ title }) {
  return (
    <Box p={2} sx={{ border: '1px solid gray', borderRadius: 2, mb: 2 }}>
      {title}
    </Box>
  );
}

// HomeProperty Section with Property API logic
function HomeProperty({ handleAddProperty }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { phoneNumber: statePhoneNumber, countryCode: stateCountryCode } = location.state || {};
  const storedPhoneNumber = localStorage.getItem('phoneNumber');
  const storedCountryCode = localStorage.getItem('countryCode');

  const phoneNumber = statePhoneNumber || storedPhoneNumber;
  const countryCode = stateCountryCode || storedCountryCode;

    const [message, setMessage] = useState("");
  

  React.useEffect(() => {
    if (phoneNumber && countryCode) {
      // Save phoneNumber and countryCode to localStorage
      localStorage.setItem('phoneNumber', phoneNumber);
      localStorage.setItem('countryCode', countryCode);
    } else {
      setMessage('Missing required information to add property.');
    }
  }, [phoneNumber, countryCode]);

  return (
    <Box p={2}>
      <RentCard title="Recent Property 1" />
      <RentCard title="Recent Property 2" />
      {/* Add Button to trigger handleAddProperty */}
      {/* <Button onClick={handleAddProperty}>Add Property</Button> */}
    </Box>
  );
}

// Other sections (Home, Property, Buyer, More, etc.)
function Home() {
  return (
    <Box p={2}>
      <RentCard title="Home Item 1" />
      <RentCard title="Home Item 2" />
      
    </Box>
  );
}

function Property({handlefetchProperty}) {
  const location = useLocation();
  const navigate = useNavigate();

  const { phoneNumber: statePhoneNumber, countryCode: stateCountryCode } = location.state || {};
  const storedPhoneNumber = localStorage.getItem('phoneNumber');
  const storedCountryCode = localStorage.getItem('countryCode');

  const phoneNumber = statePhoneNumber || storedPhoneNumber;
  const countryCode = stateCountryCode || storedCountryCode;
  const [message, setMessage] = useState("");


  React.useEffect(() => {
    if (phoneNumber && countryCode) {
      // Save phoneNumber and countryCode to localStorage
      localStorage.setItem('phoneNumber', phoneNumber);
      localStorage.setItem('countryCode', countryCode);
    } else {
      setMessage('Missing required information to add property.');
    }
  }, [phoneNumber, countryCode]);

  return (
    <Box p={2}>
      <RentCard title="Property Item 1" />
      <RentCard title="Property Item 2" />
    </Box>
  );
}

function Buyer() {
  return (
    <Box p={2}>
      <RentCard title="Favorite Item 1" />
      <RentCard title="Favorite Item 2" />
    </Box>
  );
}

function More() {
  return (
    <Box p={2}>
      <RentCard title="Archived Item 1" />
      <RentCard title="Archived Item 2" />
    </Box>
  );
}

// Main FixedBottomNavigation Component
export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const [message, setMessage] = useState("");

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
        // toast.success(`User added successfully! PPC-ID: ${response.data.ppcId}`);
        
        setTimeout(() => {
          navigate('/add-form', {
            state: { ppcId: response.data.ppcId, phoneNumber: `${countryCode}${phoneNumber}` },
          });
        }, 100);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // toast.error(error.response.data.message || 'Error adding user.');
      } else {
        // toast.error('Error adding user. Please try again.');
      }
      // console.error('Frontend Error:', error);
    }
  };

  const handlefetchProperty = async () => {
    if (!phoneNumber || !countryCode) {
      toast.error('Missing phone number or country code.');
      return;
    }
  
    try {
      // Fetch user data from the API using phone number
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-datas`, {
        params: { phoneNumber: `${countryCode}${phoneNumber}` }
      });
  
      if (response.status === 200) {
        // Assuming the response contains users data, navigate to MyProperty page
        setTimeout(() => {
          navigate('/my', {
            state: { phoneNumber: `${countryCode}${phoneNumber}`, users: response.data.users },
          });
        }, 100);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // toast.error(error.response.data.message || 'Error fetching property.');
      } else {
        // toast.error('Error fetching property. Please try again.');
      }
      // console.error('Frontend Error:', error);
    }
  };
  

  React.useEffect(() => {
    if (phoneNumber && countryCode) {
      // Save phoneNumber and countryCode to localStorage
      localStorage.setItem('phoneNumber', phoneNumber);
      localStorage.setItem('countryCode', countryCode);
    } else {
      toast.error('Missing required information to add property.');
    }
  }, [phoneNumber, countryCode]);

  const renderContent = () => {
    switch (value) {
      case 0:
        return <Home />;
      case 1:
        return <Property handlefetchProperty={handlefetchProperty} />;
      case 2:
        return <HomeProperty handleAddProperty={handleAddProperty} />;  {/* Pass the function as prop */}
      case 3:
        return <Buyer />;
      case 4:
        return <More />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      {renderContent()}
      <Paper sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction onClick={handlefetchProperty} label="Property" icon={<BusinessIcon />} />
          <BottomNavigationAction onClick={handleAddProperty} label="HomeProperty" icon={<AddHomeIcon />} />
          <BottomNavigationAction label="Buyer" icon={<PersonIcon />} />
          <BottomNavigationAction label="More" icon={<MoreHorizIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}









import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";
import {  useLocation, useNavigate } from "react-router-dom";
import { RiCloseCircleFill, RiLayoutLine } from 'react-icons/ri';
import { TbArrowLeftRight, TbMapPinCode } from 'react-icons/tb';
import {FaBuilding, FaMoneyBillWave,  FaBath, FaChartArea, FaPhone ,FaEdit,FaRoad,FaDoorClosed,FaMapPin, FaHome, FaUserAlt, FaEnvelope,  FaRupeeSign , FaFileVideo , FaToilet,FaCar,FaBed,  FaCity , FaTimes, FaArrowRight, FaStreetView} from 'react-icons/fa';
import {  FaRegAddressCard } from 'react-icons/fa6';
import { MdLocationOn, MdOutlineMeetingRoom, MdOutlineOtherHouses, MdSchedule , MdStraighten , MdApproval, MdLocationCity , MdAddPhotoAlternate, MdKeyboardDoubleArrowDown} from "react-icons/md";
import { BsBank, BsBuildingsFill, BsFillHouseCheckFill , BsTextareaT} from "react-icons/bs";
import { GiKitchenScale, GiMoneyStack , GiResize , GiGears} from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi";
import { BiBuildingHouse , BiMap, BiWorld} from "react-icons/bi";
import {   FaFileAlt, FaGlobeAmericas, FaMapMarkerAlt, FaMapSigns } from "react-icons/fa";
import {MdElevator ,MdOutlineChair ,MdPhone, MdOutlineAccessTime, MdTimer, MdHomeWork, MdHouseSiding, MdOutlineKitchen, MdEmail, } from "react-icons/md";
import {  BsBarChart, BsGraphUp } from "react-icons/bs";
import { BiBuilding, BiStreetView } from "react-icons/bi";
import { GiStairs, GiForkKnifeSpoon, GiWindow } from "react-icons/gi";
import { AiOutlineEye, AiOutlineColumnWidth, AiOutlineColumnHeight } from "react-icons/ai";
import { BiBed, BiBath, BiCar, BiCalendar, BiUser, BiCube } from "react-icons/bi";
import PricingPlans from "./PricingPlans";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { IoCloseCircle } from "react-icons/io5";
import moment from "moment";
import { format } from "date-fns";
import { Spinner } from "react-bootstrap"; // Using Bootstrap for loading animation
import { useSwipeable } from 'react-swipeable';
import SuccessIcon from '../Assets/Success.png';
import { toWords } from 'number-to-words';
import { FcSearch } from "react-icons/fc";


function AddProps({ phoneNumber }) {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]); // Store selected files
    const [swiped, setSwiped] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    
    const [step, setStep] = useState("form"); // "form" -> "preview" -> "submitted"

    const handlers = useSwipeable({
      onSwipedRight: () => {
        setSwiped(true);
        handleShowMore();
  
        // Automatically reset after 2 seconds
        setTimeout(() => {
          setSwiped(false);
        }, 2000);
      },
      trackMouse: true,
      delta: 40,
    });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const previewRef = useRef(null);

  const fileInputRef = useRef(null); // Ref for input field

  useEffect(() => {
    // This will trigger the animation when the component is loaded
    const timer = setTimeout(() => {
      setIsVisible(true); // Set to true after a short delay to trigger animation
    }, 100); // Delay before animation starts

    // Clean up the timeout on unmount
    return () => clearTimeout(timer);
  }, []);
  const [ppcId, setPpcId] = useState(null);
  // const [countryCode, setCountryCode] = useState(localStorage.getItem("countryCode"));
  const [priceInWords, setPriceInWords] = useState("");
  const location = useLocation();
    const [currentStep, setCurrentStep] = useState(1);
    const [showPlans, setshowPlans] = useState(false);

    const [message, setMessage] = useState({ text: "", type: "" , image: "" });


     // Auto-clear message after 3 seconds
      useEffect(() => {
        if (message.text) {
          const timer = setTimeout(() => {
            setMessage({ text: "", type: "" });
          }, 3000);
          return () => clearTimeout(timer);
        }
      }, [message]);
    
  

  useEffect(() => {
    if (!phoneNumber) {
      setMessage({ text: "Missing phone number.", type: "error" });
      return;
    }
  
    const handleAddProperty = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/store-data`, {
          phoneNumber: phoneNumber,
        });
  
        if (response.status === 200 || response.status === 201) {
          setPpcId(response.data.ppcId); // Set PPC-ID whether it's reused or new
          setMessage({ 
            text: response.data.message + ` PPC-ID: ${response.data.ppcId}`, 
            type: "success" 
          });
        }
      } catch (error) {
        setMessage({ 
          text: error.response?.data?.message || "Error adding user.", 
          type: "error" 
        });
      }
    };
  
    handleAddProperty();
  }, [phoneNumber]);
  

    const handleCloseAddForm = () => {
      setshowPlans(false); // Close add property form
    };
 const inputRef = useRef(null);
  const latRef = useRef(null);
  const lngRef = useRef(null);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);
  // const [ppcId, setPpcId] = useState(location.state?.ppcId || ""); 
  const [formData, setFormData] = useState({
    propertyMode: '',
    propertyType: '',
    price: '',
    propertyAge: '',
    bankLoan: '',
    negotiation: '',
    length: '',
    breadth: '',
    totalArea: '',
    ownership: '',
    bedrooms: '',
    kitchen: '',
    kitchenType: '',
    balconies: '',
    floorNo: '',
    areaUnit: '',
    propertyApproved: '',
    postedBy: '',
    facing: '',
    salesMode: '',
    salesType: '',
    description: '',
    furnished: '',
    lift: '',
    attachedBathrooms: '',
    western: '',
    numberOfFloors: '',
    carParking: '',
    rentalPropertyAddress: '',
    country: '',
    state: '',
    city: '',
    district: '',
    area: '',
    streetName: '',
    doorNumber: '',
    nagar: '',
    ownerName: '',
    email: '',
    countryCode:"+91",
    phoneNumber: "",
  phoneNumberCountryCode: "",
  alternatePhone: "",
  alternatePhoneCountryCode: "",
    bestTimeToCall: '',
    pinCode:"",
  });
 useEffect(() => {
    if (step !== "form" || !window.google) return;
  
    const interval = setInterval(() => {
      if (mapRef.current && inputRef.current) {
        clearInterval(interval);
  
        // Optional: clear any existing map to avoid duplication
        mapRef.current.innerHTML = "";
  
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 20.5937, lng: 78.9629 },
          zoom: 5,
        });
  
        mapInstance.current = map;
  
        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ['geocode'],
        });
  
        autocomplete.bindTo('bounds', map);
  
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (!place.geometry || !place.geometry.location) return;
  
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
  
          updateMap(lat, lng);
  
          const getComponent = (type) => {
            const comp = place.address_components?.find(c => c.types.includes(type));
            return comp?.long_name || '';
          };
  
          setFormData(prev => ({
            ...prev,
            rentalPropertyAddress: place.formatted_address || '',
          
            // Optional: Uncomment these if you still need coordinates
            latitude: lat,
            longitude: lng,
          
            pinCode: getComponent("postal_code"),
          
            // City is usually in 'locality', fallback to district-level if missing
            city: getComponent("sublocality_level_1"),
          
            // Area is more granular, typically sublocality levels
            area: getComponent("sublocality_level_2"),          
            // Optional: Nagar name, generally from level 1
            nagar: getComponent("sublocality"),
          
            // Street name or building/premise
            streetName: getComponent("route") || getComponent("premise"),
          
            // District is administrative_area_level_2 in most cases
            district: getComponent("administrative_area_level_2") || getComponent("locality"),
          
            state: getComponent("administrative_area_level_1"),
            country: getComponent("country"),
            doorNumber: getComponent("street_number"),
          }));
          
        });
      }
    }, 100);
  
    return () => clearInterval(interval);
  }, [step]); // 👈 critical: this makes map re-init on form re-entry
  
   // Initialize map only once
  const updateMap = (lat, lng) => {
    if (mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 12,
      });
      new window.google.maps.Marker({
        position: { lat, lng },
        map: map,
      });
    }
  };

  const handleLatLngSearch = (e) => {
    e.preventDefault();

    const lat = parseFloat(latRef.current.value);
    const lng = parseFloat(lngRef.current.value);

    if (!isNaN(lat) && !isNaN(lng)) {
      updateMap(lat, lng);

      const geocoder = new window.google.maps.Geocoder();
      const latlng = { lat, lng };

      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const place = results[0];

          const getComponent = (type) => {
            const comp = place.address_components.find(c => c.types.includes(type));
            return comp?.long_name || '';
          };

          // Update formData with address components, excluding latitude/longitude
          setFormData(prev => ({
            ...prev,
            rentalPropertyAddress: place.formatted_address || '',
            // latitude: lat,
            // longitude: lng,
            pinCode: getComponent("postal_code"),
          
            // City is usually in 'locality', fallback to district-level if missing
            city: getComponent("sublocality_level_1"),
          
            // Area is more granular, typically sublocality levels
            area: getComponent("sublocality_level_2"),          
            // Optional: Nagar name, generally from level 1
            nagar: getComponent("sublocality"),
          
            // Street name or building/premise
            streetName: getComponent("route") || getComponent("premise"),
          
            // District is administrative_area_level_2 in most cases
            district: getComponent("administrative_area_level_2") || getComponent("locality"),
          
            state: getComponent("administrative_area_level_1"),
            country: getComponent("country"),
            doorNumber: getComponent("street_number"),    }));
        } else {
          alert('Reverse geocoding failed: ' + status);
        }
      });
    } else {
      alert("Enter valid coordinates");
    }
  };
  



  useEffect(() => {
    const recordDashboardView = async () => {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/record-views`, {
          phoneNumber: phoneNumber,
          viewedFile: "Add Property",
          viewTime: new Date().toISOString(),
        });
        console.log("Dashboard view recorded");
      } catch (err) {
        console.error("Failed to record dashboard view:", err);
      }
    };
  
    if (phoneNumber) {
      recordDashboardView();
    }
  }, [phoneNumber]);



  // // ✅ Load Google Maps Script only once
  // useEffect(() => {
  //   const loadScript = () => {
  //     if (window.google) {
  //       setMapLoaded(true);
  //       return;
  //     }

  //     const script = document.createElement("script");
  //     script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
  //     script.async = true;
  //     script.onload = () => setMapLoaded(true);
  //     document.body.appendChild(script);
  //   };

  //   loadScript();
  // }, []);

  // // ✅ Initialize map only after script and step are ready
  // useEffect(() => {
  //   if (!mapLoaded || currentStep < 6) return;

  //   const map = new window.google.maps.Map(mapRef.current, {
  //     center: { lat: 28.6139, lng: 77.209 }, // Default to Delhi
  //     zoom: 13,
  //   });

  //   const input = document.getElementById("pac-input");
  //   const autocomplete = new window.google.maps.places.Autocomplete(input);
  //   autocomplete.bindTo("bounds", map);

  //   const marker = new window.google.maps.Marker({ map });

  //   autocomplete.addListener("place_changed", () => {
  //     const place = autocomplete.getPlace();
  //     if (!place.geometry || !place.geometry.location) return;

  //     map.setCenter(place.geometry.location);
  //     marker.setPosition(place.geometry.location);

  //     // ✅ Extract address components
  //     const addressComponents = place.address_components || [];
  //     const getComponent = (type) =>
  //       addressComponents.find((c) => c.types.includes(type))?.long_name || "";

  //     setFormData((prev) => ({
  //       ...prev,
  //       pinCode: getComponent("postal_code"),
  //       city: getComponent("locality") || getComponent("administrative_area_level_2"),
  //       area: getComponent("sublocality") || getComponent("sublocality_level_1"),
  //       streetName: getComponent("route") || getComponent("premise"),
  //       district: getComponent("administrative_area_level_2"),
  //       state: getComponent("administrative_area_level_1"),
  //       country: getComponent("country"),
  //     }));
      
      
  //   });
  // }, [mapLoaded, currentStep]);


  const [photos, setPhotos] = useState([]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [video, setVideo] = useState(null);
  const [isPreview, setIsPreview] = useState(true);

  const navigate = useNavigate();

  
  const formattedDate = formData.createdAt 
  ? new Date(formData.createdAt).toLocaleDateString("en-GB", { 
      day: "2-digit", 
      month: "2-digit", 
      year: "numeric", 
      hour: "2-digit", 
      minute: "2-digit", 
      second: "2-digit" 
    }) 
  : "N/A";

   
const formattedCreatedAt = Date.now
? moment(formData.createdAt).format("DD-MM-YYYY") 
: "N/A";



 
  const formRefs = {
    propertyMode: useRef(null),
    propertyType: useRef(null),
    price: useRef(null),
    totalArea: useRef(null),
    areaUnit: useRef(null),
    salesType: useRef(null),
    postedBy: useRef(null),
  };
 
  const handlePreview = () => {
    const requiredFields = Object.keys(formRefs);
  
  
    setStep("preview");
    setIsPreviewOpen(true);
  
    // Scroll to the preview section
    setTimeout(() => {
      previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };
  const propertyDetailsList = [
    { heading: true, label: "Basic Property Info" }, // Heading 1
    { icon: <MdHomeWork />, label: "Property Mode", value:  formData.propertyMode},
    { icon: <MdHouseSiding />, label: "Property Type", value: formData.propertyType },
    // { icon: <MdOutlineCurrencyRupee />, label: "Price", value: formData.price },
    // { icon: <FaBalanceScale />, label: "Negotiation", value: formData.negotiation },
    { icon: <AiOutlineColumnWidth />, label: "Length", value: formData.length },
    { icon: <AiOutlineColumnHeight />, label: "Breadth", value: formData.breadth  },
    // { icon: <RiLayoutLine />, label: "Total Area", value: formData.totalArea},
    {
      icon: <RiLayoutLine />,
      label: "Total Area",
      value: `${formData.totalArea} ${formData.areaUnit}`, // Combined value
    },
    // { icon: <BiRuler />, label: "Area Unit", value: formData.areaUnit },
    { icon: <FaUserAlt />, label: "Ownership", value: formData.ownership },
    { icon: <MdApproval />, label: "Property Approved", value: formData.propertyApproved },
    { icon: <MdTimer />, label: "Property Age", value: formData.propertyAge },
    { icon: <BsBank />, label: "Bank Loan", value: formData.bankLoan },


    { heading: true, label: "Property Features" }, // Heading 1
    { icon: <BiBed />, label: "Bedrooms", value: formData.bedrooms },

    { icon: <GiStairs />, label: "Floor No", value:formData.floorNo },
    { icon: <GiForkKnifeSpoon />, label: "Kitchen", value: formData.kitchen},
    { icon: <MdOutlineKitchen />, label: "Kitchen Type", value: formData.kitchenType },
    { icon: <GiWindow />, label: "Balconies", value: formData.balconies},
    { icon: <BiCube />, label: "Floors", value: formData.numberOfFloors },
{ label: "western", value: formData.western, icon: <BiBath /> },
{ label: "attached", value: formData.attachedBathrooms, icon: <BiBath /> },

    { icon: <BiCar />, label: "Car Park", value: formData.carParking },
    { icon: <MdElevator />, label: "Lift", value: formData.lift },
    { heading: true, label: "Other details" }, // Heading 2

    { icon: <MdOutlineChair />, label: "Furnished", value: formData.furnished },
    { icon: <TbArrowLeftRight />, label: "Facing", value: formData.facing },

    { icon: <BsGraphUp />, label: "Sale Mode", value: formData.salesMode },
    { icon: <BsBarChart />, label: "Sales Type", value: formData.salesType },
    { icon: <BiUser />, label: "Posted By", value: formData.postedBy },
    // { icon: <AiOutlineEye />, label: "No.Of.Views", value: "1200" },
    { icon: <BiCalendar />, label: "Posted On", value:formattedCreatedAt },
    { heading: true, label: "Description" }, // Heading 3
    { icon: <FaFileAlt />, label: "Description" , value: formData.description },
  
    { heading: true, label: "Property Location Info" }, // Heading 4
  
    // { icon: <BiMap />, label: "Location", value: "New York, USA" },
    { icon: <FaGlobeAmericas />, label: "Country", value: formData.country },
    { icon: <BiBuilding />, label: "State", value: formData.state },
    { icon: <MdLocationCity />, label: "City", value: formData.city },
    { icon: <FaMapMarkerAlt />, label: "District", value:  formData.district},
          { icon: <MdLocationOn />, label: "Area", value: formData.area },
   
    { icon: <FaMapSigns />, label: "Nagar", value: formData.nagar },
    { icon: <FaRoad />, label: "Street Name", value: formData.streetName },

    { icon: <FaDoorClosed />, label: "Door Number", value: formData.doorNumber },
    { icon: <TbMapPinCode />, label: "pinCode", value: formData.pinCode },

    { heading: true, label: "Contact Info" }, // Heading 5
   
    { icon: <FaUserAlt />, label: "Owner Name", value: formData.ownerName },
    { icon: <MdEmail />, label: "Email", value: formData.email },

    { icon: <MdPhone  />, label: "Phone Number", value: phoneNumber },
    { icon: <MdPhone  />, label: "alternate Phone", value: formData.alternatePhone },

    { icon: <MdOutlineAccessTime />, label: "Best Time To Call", value: formData.bestTimeToCall },
 
  ];
  const [dropdownState, setDropdownState] = useState({
    activeDropdown: null,
    filterText: "",
  });

  // Toggle dropdown visibility
  const toggleDropdown = (field) => {
    setDropdownState((prevState) => ({
      activeDropdown: prevState.activeDropdown === field ? null : field,
      filterText: "",
    }));
  };

  // Handle dropdown selection
  const handleDropdownSelect = (field, value) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
    setDropdownState({ activeDropdown: null, filterText: "" });
  };

  // Handle filter input change for dropdown
  const handleFilterChange = (e) => {
    setDropdownState((prevState) => ({ ...prevState, filterText: e.target.value }));
  };

 


  const [countryCodes, setCountryCodes] = useState([
    { code: '+1', country: 'USA/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'India' },
    { code: '+61', country: 'Australia' },
    { code: '+81', country: 'Japan' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+34', country: 'Spain' },
    { code: '+55', country: 'Brazil' },
    { code: '+52', country: 'Mexico' },
    { code: '+86', country: 'China' },
    { code: '+39', country: 'Italy' },
    { code: '+7', country: 'Russia/Kazakhstan' },
    // ... other countries
  ]);
  const [alternateCountryCodes, setAlternateCountryCodes] = useState([
    { code: '+1', country: 'USA/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'India' },
    { code: '+61', country: 'Australia' },
    { code: '+81', country: 'Japan' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+34', country: 'Spain' },
    { code: '+55', country: 'Brazil' },
    { code: '+52', country: 'Mexico' },
    { code: '+86', country: 'China' },
    { code: '+39', country: 'Italy' },
    { code: '+7', country: 'Russia/Kazakhstan' },
  ]);
  
  
  const [dataList, setDataList] = useState({});

  const fetchDropdownData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch`);
      const groupedData = response.data.data.reduce((acc, item) => {
        if (!acc[item.field]) acc[item.field] = [];
        acc[item.field].push(item.value);
        return acc;
      }, {});
      setDataList(groupedData);
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      fileInputRef.current.click();
      setLoading(false);
    }, 1000);
  };

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (!files.length) return;

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated upload delay

    setLoading(false);
    setSelectedFiles(files); // Update selected files

    for (let file of files) {
      if (file.size > maxSize) {
        alert("File size exceeds the 10MB limit");
        return;
      }
    }

    if (photos.length + files.length <= 15) {
      setPhotos([...photos, ...files]);
      setSelectedPhotoIndex(0);
    } else {
      alert("Maximum 15 photos can be uploaded.");
    }
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
    if (index === selectedPhotoIndex) {
      setSelectedPhotoIndex(0);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      alert('File size exceeds the 50MB limit');
      return;
    }
    setVideo(file);
  };

  const removeVideo = () => {
    setVideo(null);
  };

  const handlePhotoSelect = (index) => {
    setSelectedPhotoIndex(index);
  };

  // const handleFieldChange = (e) => {
  //   const { name, value } = e.target;
  //   // setFormData({ ...formData, [name]: value });
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value, // This dynamically updates the correct field (phoneNumberCountryCode or alternatePhoneCountryCode)
  //   }));
    
  // };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prev) => {
      let updatedValue = value;
  
      // Capitalize first letter if field is "description"
      if (name === "description" && value.length > 0) {
        updatedValue = value.charAt(0).toUpperCase() + value.slice(1);
      }
  
      // Convert "price" to Indian number words
      if (name === "price" && value !== "" && !isNaN(value)) {
        setPriceInWords(convertToIndianRupees(value));
      } else if (name === "price" && value === "") {
        setPriceInWords("");
      }
  
      return { ...prev, [name]: updatedValue };
    });
  };
   const convertToIndianRupees = (num) => {
      const number = parseInt(num, 10);
      if (isNaN(number)) return "";
    
      if (number >= 10000000) {
        return (number / 10000000).toFixed(2).replace(/\.00$/, '') + " crores";
      } else if (number >= 100000) {
        return (number / 100000).toFixed(2).replace(/\.00$/, '') + " lakhs";
      } else {
        return toWords(number).replace(/\b\w/g, l => l.toUpperCase()) + " rupees";
      }
    };
  

  const requiredFieldsByStep = {
    1: ['propertyMode', 'propertyType' , 'price'],
    2: ['totalArea', 'areaUnit'],
    4: ['salesType', 'postedBy'],
  };
  const stepRefs = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
    4: useRef(null),
    5: useRef(null),
    6: useRef(null),
  };
  const scrollToStep = (step) => {
    const element = stepRefs[step]?.current;
    const scrollContainer = document.querySelector(".flex-grow-1.mx-auto"); // Your scrollable parent
  
    if (element && scrollContainer) {
      const offsetTop = element.offsetTop;
      const offset = 144; // Matches your paddingTop
  
      scrollContainer.scrollTo({
        top: offsetTop - offset,
        behavior: "smooth",
      });
    }
  };
  
  

  // Scroll the field content whenever currentStep changes
  useEffect(() => {
    scrollToStep(currentStep);
  }, [currentStep]);

  const scrollFieldContentUp = () => {
    const fieldContent = document.querySelector(".fieldcontent");
    if (fieldContent) {
      fieldContent.scrollIntoView({
        behavior: "smooth",
        block: "start", // You can adjust "start", "center", or "end"
      });
    }
  };
  const handleShowMore =async (e) => {
  
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }    const stepRequiredFields = requiredFieldsByStep[currentStep] || [];
    const missingFields = stepRequiredFields.filter(field => !formData[field]);
  
    if (missingFields.length > 0) {
      // alert(`Please fill in the following fields before previewing: ${missingFields.join(", ")}`);
      setPopupMessage(`Please fill in the following fields before previewing: ${missingFields.join(", ")}`);
      setShowPopup(true);
    
      const firstMissingField = missingFields[0];
      const fieldRef = formRefs[firstMissingField];
  
      if (fieldRef?.current) {
        fieldRef.current.focus();
        setTimeout(() => {
          fieldRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
  
      return;

    }
    


    // Ensure `ppcId` is available
    if (!ppcId) {
      alert("PPC-ID is required. Please refresh or try again.");
      return;
    }
  
    // Create FormData instance to send photos and video
    const formDataToSend = new FormData();
  
    // Append PPC-ID first
    formDataToSend.append("ppcId", ppcId);
  
    // Append form fields
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
  
    // Append photos
    photos.forEach((photo) => {
      formDataToSend.append("photos", photo);
    });
  
    // Append video if available
    if (video) {
      formDataToSend.append("video", video);
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/update-property`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });

      if (response.status === 200) {
        // alert('Property details updated successfully!');
      }
    } catch (error) {
      console.error('Error updating property details:', error);
      // alert('Failed to update property details. Please try again.');
    }
    setCurrentStep(currentStep + 1);
    scrollFieldContentUp();
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setStep("submitted");
  
    const finalFormData = {
      ...formData,
      ownerName: formData.ownerName.trim() === "" ? "Owner" : formData.ownerName,
    };
  
    if (!ppcId) {
      setMessage({ text: "PPC-ID is required. Please refresh or try again.", type: "error" });
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append("ppcId", ppcId);
  
    // ✅ Use finalFormData instead of formData here:
    Object.keys(finalFormData).forEach((key) => {
      formDataToSend.append(key, finalFormData[key]);
    });
  
    photos.forEach((photo) => {
      formDataToSend.append("photos", photo);
    });
  
    if (video) {
      formDataToSend.append("video", video);
    }
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/update-property`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      setMessage({ text: "Property Added successfully!", type: "success" ,  image: SuccessIcon });
  
      setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 5000);
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || "Error saving property data.", 
        type: "error" 
      });
    }
  };
  

const fieldIcons = {
  // Contact Details
  phoneNumber: <FaPhone color="#2F747F" />,
  alternatePhone: <FaPhone color="#2F747F" />,
  email: <FaEnvelope color="#2F747F" />,
  bestTimeToCall: <MdSchedule color="#2F747F" />,
  
  // Property Location
  rentalPropertyAddress: <MdLocationCity color="#2F747F" />,
  country: <BiWorld color="#2F747F" />,
  state: <MdLocationCity color="#2F747F" />,
  city: <FaCity color="#2F747F" />,
  district: <FaRegAddressCard color="#2F747F" />,
  area: <MdLocationOn color="#2F747F" />,
  streetName: <RiLayoutLine color="#2F747F" />,
  doorNumber: <BiBuildingHouse color="#2F747F" />,
  nagar: <FaRegAddressCard color="#2F747F" />,

  // Ownership & Posting Info
  ownerName: <FaUserAlt color="#2F747F" />,
  postedBy: <FaUserAlt color="#2F747F" />,
  ownership: <HiUserGroup color="#2F747F" />,

  // Property Details
  propertyMode: <MdApproval color="#2F747F" />,
  propertyType: <MdOutlineOtherHouses color="#2F747F" />,
  propertyApproved: <BsFillHouseCheckFill color="#2F747F" />,
  propertyAge: <MdSchedule color="#2F747F" />,
  description: <BsTextareaT color="#2F747F" />,

  // Pricing & Financials
  price: <FaRupeeSign color="#2F747F" />,
  bankLoan: <BsBank color="#2F747F" />,
  negotiation: <GiMoneyStack color="#2F747F" />,

  // Measurements
  length: <MdStraighten color="#2F747F" />,
  breadth: <MdStraighten color="#2F747F" />,
  totalArea: <GiResize color="#2F747F" />,
  areaUnit: <FaChartArea color="#2F747F" />,

  // Room & Floor Details
  bedrooms: <FaBed color="#2F747F" />,
  kitchen: <GiKitchenScale color="#2F747F" />,
  kitchenType: <GiKitchenScale color="#2F747F" />,
  balconies: <MdOutlineMeetingRoom color="#2F747F" />,
  floorNo: <BsBuildingsFill color="#2F747F" />,
  numberOfFloors: <BsBuildingsFill color="#2F747F" />,
  attachedBathrooms: <FaBath color="#2F747F" />,
  western: <FaToilet  color="#2F747F" />,

  // Features & Amenities
  facing: <TbArrowLeftRight color="#2F747F" />,
  salesMode: <GiGears color="#2F747F" />,
  salesType: <MdOutlineOtherHouses color="#2F747F" />,
  furnished: <FaHome color="#2F747F" />,
  lift: <BsBuildingsFill color="#2F747F" />,
  carParking: <FaCar color="#2F747F" />,
};
const fieldLabels = {
  propertyMode: "Property Mode",
  propertyType: "Property Type",
  price: "Price",
  propertyAge: "Property Age",
  bankLoan: "Bank Loan",
  negotiation: "Negotiation",
  length: "Length",
  breadth: "Breadth",
  totalArea: "Total Area",
  ownership: "Ownership",
  bedrooms: "Bedrooms",
  kitchen: "Kitchen",
  kitchenType: "Kitchen Type",
  balconies: "Balconies",
  floorNo: "Floor No.",
  areaUnit: "Area Unit",
  propertyApproved: "Property Approved",
  postedBy: "Posted By",
  facing: "Facing",
  salesMode: "Sales Mode",
  salesType: "Sales Type",
  description: "Description",
  furnished: "Furnished",
  lift: "Lift",
  attachedBathrooms: "Attached Bathrooms",
  western: "Western Toilet",
  numberOfFloors: "Number of Floors",
  carParking: "Car Parking",
  rentalPropertyAddress: "Property Address",
  country: "Country",
  state: "State",
  city: "City",
  district: "District",
  area: "Area",
  streetName: "Street Name",
  doorNumber: "Door Number",
  nagar: "Nagar",
  ownerName: "Owner Name",
  email: "Email",
  phoneNumber: "Phone Number",
  phoneNumberCountryCode: "Phone Country Code",
  alternatePhone: "Alternate Phone",
  alternatePhoneCountryCode: "Alternate Phone Country Code",
  bestTimeToCall: "Best Time to Call",
};

    
    const renderDropdown = (field) => {
      const options = dataList[field] || [];
      const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(dropdownState.filterText.toLowerCase())
      );
  
      return (
        dropdownState.activeDropdown === field && (
          <div
            className="dropdown-popup"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              // backgroundColor: '#fff',
              backgroundColor: '#E9F7F2',

              width: '100%',
              // maxWidth: '400px',
              maxWidth: '350px',

              padding: '10px',
              zIndex: 10,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              overflowY: 'auto',
              maxHeight: '50vh',
              animation: 'popupOpen 0.3s ease-in-out',
            }}
          >
                <div
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            marginBottom: "10px",
            textAlign: "start",
            color: "#019988",
          }}
        >
           {fieldLabels[field] || "Property Field"}
        </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <input
                type="text"
                placeholder="Filter options..."
                value={dropdownState.filterText}
                onChange={handleFilterChange}
                style={{
                  width: '80%',
                  padding: '5px',
                  // marginBottom: '10px',
                  background:"#C0DFDA",
                  border:"none",
                  outline:"none"
                }}
              />
              <button
                type="button"
                onClick={() => toggleDropdown(field)}
                style={{
                  cursor: 'pointer',
                  border: 'none',
                  background: 'none',
                }}
              >
                <FaTimes size={18} color="red" />
              </button>
            </div>
            <ul
              style={{
                listStyleType: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              {filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setFormData((prevState) => ({
                      ...prevState,
                      [field]: option,
                    }));
                    toggleDropdown(field);
                  }}
                  style={{
                    padding: '5px',
                    cursor: 'pointer',
                    // backgroundColor: '#f9f9f9',
                    color:"#26794A",

                    marginBottom: '5px',
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )
      );
    };



const fields = [
  { name: "propertyMode", type: "select" },
  { name: "propertyType", type: "select" },
  { name: "price", type: "input" },
  { name: "propertyAge", type: "select" },
  { name: "bankLoan", type: "select" },
  { name: "negotiation", type: "select" },
  { name: "length", type: "input" },
  { name: "breadth", type: "input" },
  { name: "totalArea", type: "input" },
  { name: "ownership", type: "select" },
  { name: "bedrooms", type: "select" },
  { name: "kitchen", type: "select" },
  { name: "kitchenType", type: "select" },
  { name: "balconies", type: "select" },
  { name: "floorNo", type: "select" },
  { name: "areaUnit", type: "select" },
  { name: "propertyApproved", type: "select" },
  { name: "postedBy", type: "select" },
  { name: "facing", type: "select" },
  { name: "salesMode", type: "select" },
  { name: "salesType", type: "select" },
  { name: "description", type: "input" },
  { name: "furnished", type: "select" },
  { name: "lift", type: "select" },
  { name: "attachedBathrooms", type: "select" },
  { name: "western", type: "select" },
  { name: "numberOfFloors", type: "select" },
  { name: "carParking", type: "select" },
  { name: "rentalPropertyAddress", type: "input" },
  { name: "country", type: "input" },
  { name: "state", type: "input" },
  { name: "city", type: "input" },
  { name: "district", type: "input" },
  { name: "area", type: "input" },
  { name: "streetName", type: "input" },
  { name: "doorNumber", type: "input" },
  { name: "nagar", type: "input" },
  { name: "ownerName", type: "input" },
  { name: "email", type: "input" },
  { name: "phoneNumber", type: "input" },
  { name: "alternatePhone", type: "input" },
  { name: "bestTimeToCall", type: "select" },
];

const handleEdit = () => {
  // setIsPreview(false);
  setStep("form"); // Go back to form

};



  return (
    <Container fluid className="p-0 my-3 d-flex align-items-center justify-content-center" 
    style={{ width: "100%", overflowY: 'auto'
      ,    overflowX: 'hidden',  // 🔥 prevents horizontal shaking

    }}
    >
          <Row className="g-3 w-100">
          <Col lg={12} className="p-1 d-flex flex-column align-items-center">

    {/* <div className="g-3 w-100 p-1" 
        style={{
              // width: '100%',
              overflowY:"auto",
              fontFamily: "Inter, sans-serif",
              scrollbarWidth:"none"
            }}> */}

      {/* {message.text && (
          <div style={{ 
            padding: "10px", 
            backgroundColor: message.type === "success" ? "lightgreen" : "lightcoral", 
            color: "black", 
            margin: "10px 0",
            borderRadius: "5px"
          }}>
            {message.text}
          </div>
        )} */}
{message.text && (
 <div
 style={{
   padding: "10px",
   backgroundColor:
     message.type === "success" ? "lightgreen" :
     message.type === "error" ? "lightcoral" :
     message.type === "warning" ? "khaki" :
     message.type === "info" ? "lightblue" :
     message.type === "update" ? "#d1ecf1" :
     message.type === "deleted" ? "#f8d7da" :
     "white",
   color: "black",
   margin: "10px 0",
   borderRadius: "5px",
   display: "flex",
   flexDirection: "column",  // ⬅️ Stack vertically
   alignItems: "center",      // ⬅️ Center horizontally
   textAlign: "center",       // ⬅️ Center text
   gap: "10px"
 }}
>
 {message.image && (
   <img
     src={message.image}
     alt="icon"
     style={{ width: "40px", height: "40px", objectFit: "contain" }}
   />
 )}
 <span>{message.text}</span>
</div>

)}

      {step === "submitted" ?  (
            <PricingPlans phoneNumber={phoneNumber} onClose={handleCloseAddForm}/>
    ) : step === "form" ?  (
<form onSubmit={handleSubmit} style={{ fontFamily: "Inter, sans-serif"}}>
<h4 style={{ color: "rgb(10, 10, 10)", fontWeight: "bold", marginBottom: "10px" }}> Property Management</h4>             

        <p className="p-3" style={{ color: "white", backgroundColor: "rgb(47,116,127)" }}>PPC-ID: {ppcId}</p>
                        <h3 style={{ color: "rgb(47,116,127)", fontSize: "24px", marginBottom: "10px" }}> Property Images  </h3>

  <div className="form-group photo-upload-container mt-2">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handlePhotoUpload}
        name="photos"
        className="photo-upload-input"
        style={{ display: "none" }}
      />
      <label className="photo-upload-label fw-normal m-0">
        <button className="m-0 p-0"
          type="button"
          onClick={handleClick}
          style={{
            border: "none",
            background: "transparent",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            color:"black"
          }}
        >
          {loading ? (
            <Spinner animation="border" size="sm" style={{ color: "#2e86e4", marginRight: "5px" }} />
          ) : (
            <MdAddPhotoAlternate
              style={{
                color: "white",
                backgroundColor: "#2e86e4",
                padding: "5px",
                fontSize: "30px",
                borderRadius: "50%",
                marginRight: "5px",
              }}
            />
            
          )}
   {loading
            ? "Uploading..."
            : 'Upload Your Property Images' }
 </button>
      </label>
    </div>
        {photos.length > 0 && (
          <div className="uploaded-photos position-relative">
            <h4>Uploaded Photos</h4>
            <div className="uploaded-photos-grid" >
              {photos.map((photo, index) => (
                <div key={index} className="uploaded-photo-item">
                  <input
                    type="radio"
                    name="selectedPhoto"
                    className="position-absolute"
                    style={{ top: '-10px' }}

                    checked={selectedPhotoIndex === index}
                    onChange={() => handlePhotoSelect(index)}
                  />
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Uploaded"
                    className="uploaded-photo m-2"
                  />
                  <button 
                  style={{border:"none"}}
            className="position-absolute top-0 end-0 btn m-0 p-1"
    onClick={() => removePhoto(index)}
                  >
                    <IoCloseCircle size={20} color="#F22952"/>

                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video Upload Section */}
        <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}>Property Video</h4>
        <div className="form-group">
          <input
            type="file"
            name="video"
            accept="video/*"
            id="videoUpload"
            onChange={handleVideoChange}
            className="d-none"
          />
          <label htmlFor="videoUpload" className="file-upload-label fw-normal">
            <span className="pt-5">
              <FaFileVideo
                style={{
                  color: 'white',
                  backgroundColor: '#2e86e4',
                  padding: '5px',
                  fontSize: '30px',
                  marginRight: '5px',
                }}
              />
              Upload Property Video
            </span>
          </label>

          {/* Display the selected video */}
          {video && (
            <div className="selected-video-container">
              <h4 className="text-start">Selected Video:</h4>
              <div style={{ position: 'relative', display: 'inline-block' }}>
              <video width="200" controls>
                  <source src={URL.createObjectURL(video)} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <Button
                  variant="danger"
                  onClick={removeVideo}
                  style={{ border: 'none', background:"transparent"}}
                  className="position-absolute top-0 end-0 m-1 p-1"                >
                      <IoCloseCircle size={20} color="#F22952" />
                  
                </Button>
              </div>
            </div>
          )}
        </div>

{currentStep >= 1 && (
        <div 
        // className="fieldcontent p-0" ref={stepRefs[1]}
        >
  <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}>  Property OverView  </h4>             

  {/* Property Mode */}
  <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>Property Mode <span style={{ color: 'red' }}>* </span></label>

      <div style={{ display: "flex", alignItems: "center", width:"100%" }}>
        <div style={{ flex: "1" }}>
          <select
            name="propertyMode"
            value={formData.propertyMode || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }}
            required
          >
            <option value="">Select Property Mode</option>
            {dataList.propertyMode?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            ref={formRefs.propertyMode} // Attach ref here

            onClick={() => toggleDropdown("propertyMode")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.propertyMode || <FaHome />}
            </span>
            {formData.propertyMode || "Select Property Mode"}
          </button>

          {renderDropdown("propertyMode")}
        </div>
      </div>
    </label>
  </div>

  <div className="form-group">
    <label style={{ width: '100%'}}>
<label>Property Type <span style={{ color: 'red' }}>* </span> </label>
      <div style={{ display: "flex", alignItems: "center"}}>
        <div style={{ flex: "1" }}>
          <select
            name="propertyType"
            value={formData.propertyType || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} 
            required
          >
            <option value="">Select property Type</option>
            {dataList.propertyType?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            ref={formRefs.propertyType} // Attach ref here
            onClick={() => toggleDropdown("propertyType")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.propertyType || <FaHome />}
            </span>
            {formData.propertyType || "Select Property Type"}
          </button>

          {renderDropdown("propertyType")}
        </div>
      </div>
    </label>
  </div>
  {/* Price */}
 
  <div className="form-group">
  <label>Price <span style={{ color: 'red' }}>* </span> </label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <FaRupeeSign className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="number"
      name="price"
      value={formData.price}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="price"
      required
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
  {priceInWords && (
        <p style={{ fontSize: "14px", color: "#2F747F", marginTop: "5px" }}>
          {priceInWords}
        </p>
      )}
  </div>

  <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>Negotiation  </label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="negotiation"
            value={formData.negotiation || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select negotiation</option>
            {dataList.negotiation?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("negotiation")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.negotiation || <FaHome />}
            </span>
            {formData.negotiation || "Selectnegotiation"}
          </button>

          {renderDropdown("negotiation")}
        </div>
      </div>
    </label>
  </div>


  </div>
 )}


{currentStep >= 2 && (
        <div className="fieldcontent p-0" ref={stepRefs[2]}>
  {/* Negotiation */}
  <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}> Basic Property Info  </h4>             

 
  {/* Length */} 
  <div className="form-group">
  <label>Length</label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <AiOutlineColumnHeight className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="number"
      name="length"
      value={formData.length}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="length"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>
  {/* Breadth */}
  <div className="form-group">
  <label>Breadth:</label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <AiOutlineColumnWidth className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="number"
      name="breadth"
      value={formData.breadth}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="breadth"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
  </div>
  {/* Total Area */}
  <div className="form-group">
  <label>Total Area: <span style={{ color: 'red' }}>* </span> </label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <RiLayoutLine className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="number"
      name="totalArea"
      value={formData.totalArea}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="totalArea"
      required
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
  </div>

    {/* areaUnit */}
    <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>Area Unit <span style={{ color: 'red' }}>* </span> </label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="areaUnit"
            value={formData.areaUnit || ""}
            onChange={handleFieldChange}
            className="form-control"
            required
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select areaUnit</option>
            {dataList.areaUnit?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            ref={formRefs.areaUnit} // Attach ref here

            onClick={() => toggleDropdown("areaUnit")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.areaUnit || <FaHome />}
            </span>
            {formData.areaUnit || "Select areaUnit"}
          </button>

          {renderDropdown("areaUnit")}
        </div>
      </div>
    </label>
  </div>

  {/* Ownership */}
  <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>Ownership </label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="ownership"
            value={formData.ownership || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select ownership</option>
            {dataList.ownership?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("ownership")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.ownership || <FaHome />}
            </span>
            {formData.ownership || "Select ownership"}
          </button>

          {renderDropdown("ownership")}
        </div>
      </div>
    </label>
  </div>

  </div>
 )}


 {currentStep >= 3 && ( 
        <div className="fieldcontent p-0" ref={stepRefs[3]}>
  {/* Bedrooms */}
  <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}>  Property details  </h4>             

<div className="form-group">
    <label style={{ width: '100%'}}>
    <label>Bedrooms </label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="bedrooms"
            value={formData.bedrooms || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select bedrooms</option>
            {dataList.bedrooms?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("bedrooms")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.bedrooms || <FaHome />}
            </span>
            {formData.bedrooms || "Select bedrooms"}
          </button>

          {renderDropdown("bedrooms")}
        </div>
      </div>
    </label>
  </div>
  {/* kitchen */}
  <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>kitchen </label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="kitchen"
            value={formData.kitchen || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select kitchen</option>
            {dataList.kitchen?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("kitchen")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.kitchen || <FaHome />}
            </span>
            {formData.kitchen || "Select kitchen"}
          </button>

          {renderDropdown("kitchen")}
        </div>
      </div>
    </label>
  </div>
    {/* kitchenType */}
    <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>kitchenType </label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="kitchenType"
            value={formData.kitchenType || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select kitchenType</option>
            {dataList.kitchenType?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("kitchenType")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.kitchenType || <FaHome />}
            </span>
            {formData.kitchenType || "Select kitchenType"}
          </button>

          {renderDropdown("kitchenType")}
        </div>
      </div>
    </label>
  </div>
    {/* balconies */}
    <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>Balconies </label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="balconies"
            value={formData.balconies || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select balconies</option>
            {dataList.balconies?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("balconies")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.balconies || <FaHome />}
            </span>
            {formData.balconies || "Select balconies"}
          </button>

          {renderDropdown("balconies")}
        </div>
      </div>
    </label>
  </div>
    {/* floorNo */}
    <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>FloorNo </label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="floorNo"
            value={formData.floorNo || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select floorNo</option>
            {dataList.floorNo?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("floorNo")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.floorNo || <FaHome />}
            </span>
            {formData.floorNo || "Select floorNo"}
          </button>

          {renderDropdown("floorNo")}
        </div>
      </div>
    </label>
  </div>
  </div>
 )}
  

{currentStep >= 4 && (
        <div className="fieldcontent p-0" ref={stepRefs[4]}>

<h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}>  Other Details  </h4>             

    {/* propertyApproved */}

    <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>Property Approved</label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="propertyApproved"
            value={formData.propertyApproved || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select propertyApproved</option>
            {dataList.propertyApproved?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("propertyApproved")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.propertyApproved || <FaHome />}
            </span>
            {formData.propertyApproved || "Select propertyApproved"}
          </button>

          {renderDropdown("propertyApproved")}
        </div>
      </div>
    </label>
  </div>


    {/* Property Age */}
    <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>Property Age </label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="propertyAge"
            value={formData.propertyAge || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select Property Age</option>
            {dataList.propertyAge?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("propertyAge")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.propertyAge || <FaHome />}
            </span>
            {formData.propertyAge || "Select Property Age"}
          </button>

          {renderDropdown("propertyAge")}
        </div>
      </div>
    </label>
  </div>

  {/* Bank Loan */}

  <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>Bank Loan </label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="bankLoan"
            value={formData.bankLoan || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select Bank Loan</option>
            {dataList.bankLoan?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("bankLoan")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.bankLoan || <FaHome />}
            </span>
            {formData.bankLoan || "Select Bank Loan"}
          </button>

          {renderDropdown("bankLoan")}
        </div>
      </div>
    </label>
  </div>

 
    {/* facing */}
    <div className="form-group">

    <label style={{ width: '100%'}}>
    <label>Facing</label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="facing"
            value={formData.facing || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select facing</option>
            {dataList.facing?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("facing")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.facing || <FaHome />}
            </span>
            {formData.facing || "Select facing"}
          </button>

          {renderDropdown("facing")}
        </div>
      </div>
    </label>
  </div>
    {/* salesMode */}

    <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>Sales Mode</label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="salesMode"
            value={formData.salesMode || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select salesMode</option>
            {dataList.salesMode?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("salesMode")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.salesMode || <FaHome />}
            </span>
            {formData.salesMode || "Select salesMode"}
          </button>

          {renderDropdown("salesMode")}
        </div>
      </div>
    </label>
  </div>
    {/* salesType */}
    <div className="form-group">
    <label style={{ width: '100%'}}>
      <label>Sale Type <span style={{ color: 'red' }}>* </span> </label>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="salesType"
            value={formData.salesType || ""}
            onChange={handleFieldChange}
            className="form-control"
            required
            style={{ visibility: "hidden", position: "absolute" }} // Keep element in flow but hidden
            >
            <option value="">Select salesType</option>
            {dataList.salesType?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
                      ref={formRefs.salesType} // Attach ref here

            className="m-0"
            type="button"
            onClick={() => toggleDropdown("salesType")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.salesType || <FaHome />}
            </span>
            {formData.salesType || "Select salesType"}
          </button>

          {renderDropdown("salesType")}
        </div>
      </div>
    </label>
  </div>

   {/* postedBy */}
   <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>PostedBy <span style={{ color: 'red' }}>* </span> </label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="postedBy"

            value={formData.postedBy || ""}
            onChange={handleFieldChange}
            className="form-control"
            required
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select postedBy</option>
            {dataList.postedBy?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            ref={formRefs.postedBy} // Attach ref here

            onClick={() => toggleDropdown("postedBy")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.postedBy || <FaHome />}
            </span>
            {formData.postedBy || "Select postedBy"}
          </button>

          {renderDropdown("postedBy")}
        </div>
      </div>
    </label>
  </div>

  </div>
)} 



{currentStep >= 5 && (
        <div className="fieldcontent p-0" ref={stepRefs[5]}>
<h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}>  Property Description   </h4>             

  {/* Description */}
  {/* <div className="form-group">
    <label>Description:</label>
    <textarea name="description" onChange={handleFieldChange} className="form-control" placeholder="Enter Description"></textarea>
  </div> */}

<div className="form-group">
  <label>Description:</label>
  <textarea
    name="description"
    value={formData.description}
    onChange={handleFieldChange}
    className="form-control"
    placeholder="Maximum 250 characters"
    maxLength={250} // Limits input to 250 characters
  ></textarea>
  <small className="text-muted">Maximum 250 characters allowed.</small>
</div>


  {/* furnished */}
  <div className="form-group">
    <label style={{width:"100%"}}>
    <label>Furnished</label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="furnished"
            value={formData.furnished || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select furnished</option>
            {dataList.furnished?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("furnished")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.furnished || <FaHome />}
            </span>
            {formData.furnished || "Select furnished"}
          </button>

          {renderDropdown("furnished")}
        </div>
      </div>
    </label>
  </div>
    {/*lift */}
    <div className="form-group">
    <label style={{ width: '100%'}}>
      <label>Lift</label>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="lift"
            value={formData.lift || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select lift</option>
            {dataList.lift?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("lift")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.lift || <FaHome />}
            </span>
            {formData.lift || "Select lift"}
          </button>

          {renderDropdown("lift")}
        </div>
      </div>
    </label>
  </div>

      {/*attachedBathrooms */}
      <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>Attached Bathrooms</label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="attachedBathrooms"
            value={formData.attachedBathrooms || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select attachedBathrooms</option>
            {dataList.attachedBathrooms?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("attachedBathrooms")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.attachedBathrooms || <FaHome />}
            </span>
            {formData.attachedBathrooms || "Select attachedBathrooms"}
          </button>

          {renderDropdown("attachedBathrooms")}
        </div>
      </div>
    </label>
  </div>
    {/* western */}
    <div className="form-group">

    <label style={{ width: '100%'}}>
    <label>Western</label>

      <div style={{ display: "flex", alignItems: "center"}}>
        <div style={{ flex: "1" }}>
          <select
            name="western"
            value={formData.western || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select western</option>
            {dataList.western?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("western")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.western || <FaHome />}
            </span>
            {formData.western || "Select western"}
          </button>

          {renderDropdown("western")}
        </div>
      </div>
    </label>
  </div>
    {/* numberOfFloors */}
    <div className="form-group">

    <label style={{ width: '100%'}}>
    <label>Number Of Floors</label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="numberOfFloors"
            value={formData.numberOfFloors || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select numberOfFloors</option>
            {dataList.numberOfFloors?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("numberOfFloors")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.numberOfFloors || <FaHome />}
            </span>
            {formData.numberOfFloors || "Select numberOfFloors"}
          </button>

          {renderDropdown("numberOfFloors")}
        </div>
      </div>
    </label>
  </div>
    {/* carParking */}

    <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>Car Parking</label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="carParking"
            value={formData.carParking || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select carParking</option>
            {dataList.carParking?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("carParking")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.carParking || <FaHome />}
            </span>
            {formData.carParking || "Select carParking"}
          </button>

          {renderDropdown("carParking")}
        </div>
      </div>
    </label>
  </div>
  </div>
 )} 




  {/*   rentalPropertyAddress */}
  {currentStep >= 6 && (
        <div className="fieldcontent p-0" ref={stepRefs[6]}>

<h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}>  Property Address   </h4>             


<div className="form-group">
{/* <label>Quick Address:</label> */}

<div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px solid #2F747F', background:"#fff"}}>
    <FcSearch  className="input-icon" 
    style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      ref={inputRef}

      id="pac-input"
      className="form-input m-0"
      placeholder="Search location"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>
<div
  ref={mapRef}
  id="map"
  style={{ height: "200px", width: "100%" }}
></div>
<div className="mt-1 w-100 d-flex gap-2 mb-2">
  <input
    ref={latRef}
    placeholder="Latitude"
    className="form-control m-0"
  />
  <input 
    ref={lngRef}
    placeholder="Longitude"
    className="form-control m-0"
  />
  <button 
    onClick={handleLatLngSearch}
    className="btn btn-primary m-0 border-0"
    style={{ whiteSpace: 'nowrap', background:"#6CBAAF" ,  }}
  >
    Go
  </button>
</div>
{/* <input value={formData.pinCode || ""} readOnly />
<input value={formData.city || ""} readOnly />
<input value={formData.area || ""} readOnly />
<input value={formData.streetName || ""} readOnly />
 */}
<p className="mt-1" style={{color:"#0597FF" , fontSize:"13px"}}>IF YOU CAN'T FIND THE ADDRESS PLEASE ENTER MANUALLY</p>
  <div className="form-group">
<label>Property Address:</label>

<div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px solid #2F747F', background:"#fff"}}>
    <FaHome className="input-icon" 
    style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="text"
      name="rentalPropertyAddress"
      value={`${formData.doorNumber || ""} ${formData.streetName || ""} ${formData.area || ""}  ${formData.city || ""}   ${formData.state || ""} ${formData.pinCode || ""}`}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="Property Address"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>

  {/* country */}

  <div className="form-group">
  <label>country:</label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <BiWorld className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="text"
      name="country"
      value={formData.country}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="country"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
  </div>
  
  {/* State */}

<div className="form-group">
  <label>State:</label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <MdLocationCity className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="text"
      name="state"
      value={formData.state}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="State"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>
  {/* City */}

<div className="form-group">
  <label>City:</label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <FaCity className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="text"
      name="city"
      value={formData.city}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="City"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>

  {/* district */}
 <div className="form-group" >
    <label style={{width:'100%'}}>
    <label>District</label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="district"
            value={formData.district || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select District</option>
            {dataList.district?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("district")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.district || <FaHome />}
            </span>
            {formData.district || "Select District"}
          </button>

          {renderDropdown("district")}
        </div>
      </div>
    </label>
  </div>
  {/* <div className="form-group">
  <label>District:</label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <FaRegAddressCard className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="text"
      name="district"
      value={formData.district}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="District"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div> */}
  {/* area */}
  <div className="form-group">
  <label>Area:</label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <MdLocationOn className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="text"
      name="area"
      value={formData.area}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="Area"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>
  {/* streetName */}
  <div className="form-group">
  <label>Street Name:</label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <FaRoad className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="text"
      name="streetName"
      value={formData.streetName}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="Street Name"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>
  {/* doorNumber */}
  <div className="form-group">
  <label>Door Number:</label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <FaDoorClosed className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="number"
      name="doorNumber"
      value={formData.doorNumber}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="Door Number"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
  </div>

  {/* Nagar */}
  <div className="form-group">
  <label>Nagar:</label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <FaMapPin className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="text"
      name="nagar"
      value={formData.nagar}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="Nagar"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>
<div className="form-group">
  <label>pinCode:</label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <TbMapPinCode  className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="text"
      name="pinCode"
      value={formData.pinCode}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="pinCode"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>
<h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}>  Owner Details   </h4>             
  {/* Owner Name */}

<div className="form-group">
  <label>Owner Name:</label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <FaUserAlt className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="text"
      name="ownerName"
      value={formData.ownerName}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="Owner Name"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>

  {/* Email */}
  <div className="form-group">
  <label>Email:</label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <FaEnvelope className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="Email"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>
  {/* Phone Number */}

<div className="form-group">
<label>Phone Number:</label>

  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <FaPhone className="input-icon" style={{ color: '#2F747F', marginLeft:"10px" }} />
    
    <div style={{ flex: '0 0 10%' }}>
      <label>
        <select
          name="countryCode"
          value={formData.countryCode || ""}
          disabled
          onChange={handleFieldChange}
          className="form-control mt-1 pt-2"
          style={{ width: '100%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
        >
          <option value="">Select Country Code</option>
          {countryCodes.map((item, index) => (
            <option key={index} value={item.code}>
              {item.code} - {item.country}
            </option>
          ))}
        </select>
      </label>
    </div>

    <input
      type="text"
      name="phoneNumber"
      value={phoneNumber}
      readOnly
      className="form-input m-0"
      placeholder="Phone Number"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>
  {/* Alternate Number */}

<div className="form-group">
<label>Alternate number:</label>

  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <FaPhone className="input-icon" style={{ color: '#2F747F', marginLeft:"10px" }} />
    
    <div style={{ flex: '0 1 10%' }}>
      <label>
        <select
          name="countryCode"
          value={formData.countryCode || ""}
          onChange={handleFieldChange}
          className="form-control m-0"
          style={{ width: '100%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
        >
          <option value="">Select Country Code</option>
          {countryCodes.map((item, index) => (
            <option key={index} value={item.code}>
              {item.code} - {item.country}
            </option>
          ))}
        </select>
      </label>
    </div>

    <input
      type="number"
      name="alternatePhone"
      value={formData.alternatePhone}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="Alternate Phone Number"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>

{/* 
<div className="form-group">
  <label>Created At:</label>
  <div className="input-card p-2 rounded-1" style={{ border: '1px solid #2F747F', background:"#fff" }}>
    <span>{moment(formData.createdAt).format("DD-MM-YYYY HH:mm A")}</span>
  </div>
</div> */}


  {/* Best Time to Call */}
  <div className="form-group" >
    <label style={{width:'100%'}}>
    <label>Best Time To Call</label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="bestTimeToCall"
            value={formData.bestTimeToCall || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select bestTimeToCall</option>
            {dataList.bestTimeToCall?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("bestTimeToCall")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.bestTimeToCall || <FaHome />}
            </span>
            {formData.bestTimeToCall || "Select bestTimeToCall"}
          </button>

          {renderDropdown("bestTimeToCall")}
        </div>
      </div>
    </label>
  </div>
  </div>
)}



      {currentStep <= 6 && (

      <div>
  <style>
    {`
      // @keyframes transformText {
      //   0% {
      //     transform: translateX(-200px) skewX(30deg);
      //   }
      //   50% {
      //     transform: translateX(170px) skewX(30deg);
      //   }
      //   100% {
      //     transform: translateX(-200px) skewX(30deg);
      //   }
      // }

      @keyframes pulseIcon {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.15);
        }
        100% {
          transform: scale(1);
        }
      }
    `}
  </style>

  <div
    {...handlers}
    // {...(currentStep <= 6 ? handlers : {})}

    style={{
      width: '100%',
      height: '50px',
      borderRadius: '50px',
      background: swiped
        ? 'linear-gradient(to right, #1dd1a1, #10ac84)'
        : '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: swiped ? 'flex-end' : 'flex-start',
      padding: '5px',
      cursor: 'pointer',
      transition: 'all 0.4s ease-in-out',
      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
      position: 'relative',
      overflow: 'hidden',

    }}
  >
    <span
      style={{
        position: 'absolute',
        left: swiped ? '10px' : '50%',
        transform: swiped
          ? 'translateX(-200px) skewX(30deg)'
          : 'translateX(-50%)',
        color: '#00b894',
        fontWeight: 600,
        fontSize: '16px',
        pointerEvents: 'none',
        transition: 'all 0.4s ease-in-out',
        animation: swiped ? 'transformText 2s infinite' : 'none',
        whiteSpace: 'nowrap',
      }}
    >
     Swipe To Save & Continue
    </span>

    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        height: '40px',
        width: '40px',
        borderRadius: '50%',
        backgroundColor: swiped ? '#fff' : '#1dd1a1',
        transition: 'all 0.4s ease-in-out',
        animation: swiped ? 'pulseIcon 1.5s infinite' : 'none',
      }}
    >
      <FaArrowRight
        style={{
          color: swiped ? '#1dd1a1' : '#fff',
          fontSize: '20px',
          margin: 'auto',
          transition: 'all 0.4s ease-in-out',
          animation: 'moveLeftRight 1s infinite',

        }}
      />
        <style jsx>{`
    @keyframes moveLeftRight {
      0% {
        transform: translateX(0);
        color: #ffffff;
      }
      50% {
        transform: translateX(8px);
        // color: rgb(20, 195, 90);
      }
      100% {
        transform: translateX(0);
        color: #ffffff;
      }
    }
  `}</style>

    </div>
  </div>
</div>
)}

  {/* <div
      {...handlers}
      style={{
        width: '220px',
        height: '50px',
        borderRadius: '50px',
        background: swiped
          ? 'linear-gradient(to right, #1dd1a1, #10ac84)'
          : '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: swiped ? 'flex-end' : 'flex-start',
        padding: '5px',
        cursor: 'pointer',
        transition: 'all 0.4s ease-in-out',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        position: 'relative',
      }}
    >
        <span
          style={{
            position: 'absolute',
            // left: '50%',
            left: swiped ? '10px' : '50%',  // Move text to the left when swiped right
            // transform: 'translateX(-50%)',
            transform: 'translateX(-200px) skewX(30deg)',

            color: '#00b894',
            fontWeight: 600,
            fontSize: '16px',
            pointerEvents: 'none',
            transition: 'all 0.4s ease-in-out',  // Smooth transition for text movement
          }}
        >
          Save & Continue
        </span>
      <div className="d-flex align-items-center justify-content-center"
        style={{
          height: '40px',
          width: '40px',
          borderRadius: '50%',
          backgroundColor: swiped ? '#fff' : '#1dd1a1',
          transition: 'all 0.4s ease-in-out',
        }}
      >
             <FaArrowRight
          style={{
            color: swiped ? '#1dd1a1' : '#fff',
            fontSize: '20px',
            margin: 'auto',
            transition: 'all 0.4s ease-in-out',
          }}
        />
      </div>
    </div> */}
              {/* Step 3: Submit all data */}
              {currentStep > 6 && (
                <Button
                  type="submit"
                  style={{ marginTop: '15px', backgroundColor: "rgb(47,116,127)" }}
                  onMouseOver={(e) => {
                    e.target.style.background = "#029bb3"; // Brighter neon on hover
                    e.target.style.fontWeight = 600; // Brighter neon on hover
                    e.target.style.transition = "background 0.3s ease"; // Brighter neon on hover
          
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = "#2F747F"; // Original orange
                    e.target.style.fontWeight = 400; // Brighter neon on hover
          
                  }}
                  onClick={handlePreview}
                >
                  PreView
                </Button>
           )} 
{showPopup && (
  <div className="modal show d-block" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document" >
      <div className="modal-content" style={{background:"#fff"}}>
        {/* <div className="modal-header">
          <h5 className="modal-title">Missing Fields</h5>
          <button type="button" className="close" onClick={() => setShowPopup(false)}>
            <span>&times;</span>
          </button>
        </div> */}
   <div className="modal-body d-flex align-items-center justify-content-between gap-3">
  <p className="mb-0 flex-grow-1" style={{color:"grey", fontSize:"13px"}}>{popupMessage}</p>
  <button
    type="button"
    // style={{ background: "#16398B" }}
    className="btn border-0 p-2"
    onClick={() => setShowPopup(false)}
  >
    {/* Close */}
    <RiCloseCircleFill color='#16398B'size={25}/>

  </button>
</div>

        {/* <div className="modal-footer">
          <button type="button" style={{background:"#16398B"}} className="btn btn-secondary" onClick={() => setShowPopup(false)}>
            Close
          </button>
        </div> */}
      </div>
    </div>
  </div>
)}

      </form>
      
      ) :  (

<div ref={previewRef} className="preview-section w-100 ">
<div className="mb-4">
      
       <div className="preview-section row d-flex align-items-center justify-content-center">
       {photos.length > 0 || video ? (
         <Swiper navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}  modules={[Navigation]} className="swiper-container">
           {photos.map((photo, index) => (
             <SwiperSlide key={index}
             className="d-flex justify-content-center align-items-center"
             style={{
               height: "200px",
               width: "100%",
               overflow: "hidden",
               borderRadius: "8px",
               margin: "auto",
               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
               cursor: "pointer",
             }}>
               <img
                 src={URL.createObjectURL(photo)}
                 alt={`Preview ${index + 1}`}
                 className="preview-image"
                 style={{
                   height: "100%",
                   width: "100%",
                   objectFit: "cover",
                 }}
               />
             </SwiperSlide>
           ))}
           {video && (
             <SwiperSlide>
               <div
             className="d-flex justify-content-center align-items-center"
             style={{
               height: "200px",
               width: "100%",
               overflow: "hidden",
               borderRadius: "8px",
               margin: "auto",
               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
               cursor: "pointer",
             }}
           >
               <video controls className="preview-video" style={{ width: "100%", height: "200px", objectFit: "cover" }}>
                 <source src={URL.createObjectURL(video)} type={video.type} />
                 Your browser does not support the video tag.
               </video>
               </div>
             </SwiperSlide>
           )}
         </Swiper>
       ) : (
         <p>No media uploaded.</p>
       )}
    <style>
      {`
        .swiper-button-next, .swiper-button-prev {
          color: white !important;
          font-size: 24px !important;
        }
          
      `}
    </style>
    <div className="row d-flex align-items-center w-100">
    <div className="d-flex col-12 justify-content-end">  
      <button className="swiper-button-prev-custom m-1 w-30" style={{background:"#019988"}}>❮</button>
      <button className="swiper-button-next-custom m-1 w-30"style={{background:"#019988"}}>❯</button>
    </div>
  </div>
  </div>
  </div>

<div className="row w-100"
 style={{paddingLeft:"10px", paddingRight:"10px"}}
 >
<p className="m-0" style={{
        color: "#4F4B7E",
        fontWeight: 'bold',
        fontSize: "26px"
      }}>
        <FaRupeeSign size={26} /> {formData.price ? Number(formData.price).toLocaleString('en-IN') : 'N/A'}
    
        <span style={{ fontSize: '14px', color: "#30747F", marginLeft: "10px" }}>
           Negotiation: {formData.negotiation || "N/A"}
        </span>
      </p>
      {priceInWords && (
            <p style={{ fontSize: "14px", color: "#2F747F", marginTop: "5px" }}>
              {priceInWords}
            </p>
 )}

{propertyDetailsList.map((detail, index) => {
  // Check if it's a heading, which should always be full-width (col-12)
  if (detail.heading) {
    return (
      <div key={index} className="col-12">
        <h4
          className="m-0 fw-bold"
          style={{ color: "#000000", fontFamily: "Inter, sans-serif", fontSize: "16px" }}
        >
          {detail.label}
        </h4>
      </div>
    );
  }

  const isDescription = detail.label === "Description";
  const isEmail = detail.label === "Email";  // Check if the label is "Email"
  const columnClass = isDescription || isEmail ? "col-12" : "col-6";  // Apply col-12 for both Description and Email

  return (
    <div key={index} className={columnClass}>
      <div
        className="d-flex align-items-center border-0 rounded p-1 mb-1"
        style={{
          width: "100%",
          height: isDescription ? "auto" : "55px",
          wordBreak: "break-word",
        }}
      >
        <span className="me-3 fs-3" style={{ color: "#30747F" }}>
          {detail.icon}
        </span>
        <div>
          {!isDescription && !isEmail && (
            <span className="mb-1" style={{ fontSize: "12px", color: "grey" }}>
              {detail.label || "N/A"}
            </span>
          )}
          <p
            className="mb-0 p-0"
            style={{
              fontSize: "14px",
              color: "grey",
              fontWeight: "600",
              padding: "10px",
              borderRadius: "5px",
              width: "100%",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "normal",
            }}
          >
{detail.label === "Street Name" && typeof detail.value === "string" && detail.value.length > 8
    ? `${detail.value.slice(0, 8)}...`
    : detail.value || "N/A"} 
             </p>
        </div>
      </div>
    </div>
  );
})}


</div>

<div className="col-12"
        style={{paddingLeft:"10px" }}
>
      <button
        type="button"
        style={{ background: "#2F747F", color: "#fff" ,paddingLeft:"10px" }}
        onMouseOver={(e) => {
          e.target.style.background = "#029bb3"; // Brighter neon on hover
          e.target.style.fontWeight = 600; // Brighter neon on hover
          e.target.style.transition = "background 0.3s ease"; // Brighter neon on hover

        }}
        onMouseOut={(e) => {
          e.target.style.background = "#2F747F"; // Original orange
          e.target.style.fontWeight = 400; // Brighter neon on hover

        }}
        onClick={handleEdit}
      >
        Edit
      </button>
      <button
        type="button"
        style={{ border: "1px solid #2F747F",background:"none" , color: "#2F747F" , marginLeft: '10px', fontWeight:"bold"}}
        onMouseOver={(e) => {
          e.target.style.background = "#029bb3"; // Brighter neon on hover
          e.target.style.fontWeight = 600; // Brighter neon on hover
          e.target.style.transition = "background 0.3s ease"; // Brighter neon on hover

        }}
        onMouseOut={(e) => {
          e.target.style.color = "#ffffff"; // Original orange

          e.target.style.background = "#2F747F"; // Original orange
          e.target.style.fontWeight = 400; // Brighter neon on hover

        }}
        onClick={handleSubmit}
      >
        Submit Property
      </button> 
      </div>
      </div>
      )
    }

    {/* </div> */}
    </Col>
    </Row></Container>

  );
}

export default AddProps;




















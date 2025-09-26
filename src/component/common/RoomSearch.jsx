import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ApiService from '../../service/ApiService';

const RoomSearch = ({ handleSearchResult }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [roomType, setRoomType] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [error, setError] = useState('');

  const statesAndCities = {
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
    'Karnataka': ['Bangalore', 'Mysore', 'Mangalore'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
    'Delhi': ['Delhi'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra'],
    'West Bengal': ['Kolkata', 'Howrah'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara'],
    'Rajasthan': ['Jaipur', 'Udaipur', 'Jodhpur'],
    'Punjab': ['Chandigarh', 'Amritsar', 'Ludhiana'],
    'Haryana': ['Gurgaon', 'Faridabad', 'Panipat']
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const types = await ApiService.getRoomTypes();
        const defaultTypes = ["Single", "Double", "Deluxe", "Suite", "Family"];
        const uniqueTypes = Array.from(new Set([...defaultTypes, ...types]));
        setRoomTypes(uniqueTypes);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setRoomTypes(["Single", "Double", "Deluxe", "Suite", "Family"]);
      }
    };
    fetchData();
  }, []);

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setState(selectedState);
    setCity('');
    setCities(statesAndCities[selectedState] || []);
  };

  /**This methods is going to be used to show errors */
  const showError = (message, timeout = 5000) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, timeout);
  };

  /**THis is going to be used to fetch available rooms from database base on seach data that'll be passed in */
  const handleInternalSearch = async () => {
    if (!startDate || !endDate || !roomType || !city) {
      showError('Please select all fields');
      return false;
    }
    try {
      // Convert startDate to the desired format
      const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
      const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;
      // Call the API to fetch available rooms
      const response = await ApiService.getAvailableRoomsByDateAndType(formattedStartDate, formattedEndDate, roomType);

      // Check if the response is successful
      if (response.statusCode === 200) {
        let rooms = response.roomList;
        // Filter by city (assuming hotelName is city)
        rooms = rooms.filter(room => room.hotelName === city);
        if (rooms.length === 0) {
          showError('No rooms found for this selection.');
          return;
        }
        handleSearchResult(rooms);
        setError('');
      }
    } catch (error) {
      showError(" error occurred: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <section>
      <div className="search-container">
        <div className="search-field">
          <label>State</label>
          <select value={state} onChange={handleStateChange}>
            <option value="">
              Select State
            </option>
            {Object.keys(statesAndCities).map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
        <div className="search-field">
          <label>City</label>
          <select value={city} onChange={(e) => setCity(e.target.value)} disabled={!state}>
            <option value="">
              Select City
            </option>
            {cities.map((ct) => (
              <option key={ct} value={ct}>
                {ct}
              </option>
            ))}
          </select>
        </div>
        <div className="search-field">
          <label>Check-in Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Check-in Date"
          />
        </div>
        <div className="search-field">
          <label>Check-out Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Check-out Date"
          />
        </div>

        <div className="search-field">
          <label>Room Type</label>
          <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
            <option disabled value="">
              Select Room Type
            </option>
            {roomTypes.map((roomType) => (
              <option key={roomType} value={roomType}>
                {roomType}
              </option>
            ))}
          </select>
        </div>
        <button className="home-search-button" onClick={handleInternalSearch}>
          Search Rooms
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </section>
  );
};

export default RoomSearch;

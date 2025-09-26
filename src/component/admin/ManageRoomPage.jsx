import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';
import RoomResult from '../common/RoomResult';
import AdminLayout from './AdminLayout';

const ManageRoomPage = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await ApiService.getAllRooms();
        let allRooms = response.roomList;
        // Add dummy bookings count
        allRooms = allRooms.map(room => ({ ...room, bookingsCount: Math.floor(Math.random() * 10) }));
        setRooms(allRooms);
        setFilteredRooms(allRooms);
        setUniqueCities(allRooms);
      } catch (error) {
        console.error('Error fetching rooms:', error.message);
      }
    };

    const fetchRoomTypes = async () => {
      try {
        const types = await ApiService.getRoomTypes();
        setRoomTypes(types);
      } catch (error) {
        console.error('Error fetching room types:', error.message);
      }
    };

    const setUniqueCities = (allRooms) => {
      const uniqueCities = Array.from(new Set(allRooms.map(room => room.hotelName)));
      setCities(uniqueCities);
    };

    fetchRooms();
    fetchRoomTypes();
  }, []);

  const handleRoomTypeChange = (e) => {
    setSelectedRoomType(e.target.value);
    filterRooms();
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    filterRooms();
  };

  const handleAvailabilityChange = (e) => {
    setSelectedAvailability(e.target.value);
    filterRooms();
  };

  const filterRooms = () => {
    let filtered = rooms;
    if (selectedRoomType) {
      filtered = filtered.filter((room) => room.roomType === selectedRoomType);
    }
    if (selectedCity) {
      filtered = filtered.filter((room) => room.hotelName === selectedCity);
    }
    if (selectedAvailability) {
      // Assuming all are available, but if selected 'Available', keep all
      if (selectedAvailability === 'Available') {
        filtered = filtered; // all
      } else {
        filtered = []; // none, since no 'Not Available'
      }
    }
    setFilteredRooms(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Pagination
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <AdminLayout>
      <div className='all-rooms'>
        <h2>All Rooms</h2>
        <div className='all-room-filter-div'>
          <div className='filter-select-div'>
            <label>Filter by City:</label>
            <select value={selectedCity} onChange={handleCityChange}>
              <option value="">All</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className='filter-select-div'>
            <label>Filter by Room Type:</label>
            <select value={selectedRoomType} onChange={handleRoomTypeChange}>
              <option value="">All</option>
              {roomTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className='filter-select-div'>
            <label>Filter by Availability:</label>
            <select value={selectedAvailability} onChange={handleAvailabilityChange}>
              <option value="">All</option>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>
          <button className='add-room-button' onClick={() => navigate('/admin/add-room')}>
            Add Room
          </button>
        </div>

        <RoomResult roomSearchResults={currentRooms} />

        <Pagination
          roomsPerPage={roomsPerPage}
          totalRooms={filteredRooms.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </AdminLayout>
  );
};

export default ManageRoomPage;

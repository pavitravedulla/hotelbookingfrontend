import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RoomResult from '../common/RoomResult';

const AllRoomsPage = () => {
  const location = useLocation();
  const { state: navState } = location;

  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(navState?.city || '');
  const [selectedType, setSelectedType] = useState('');
  const [locations, setLocations] = useState([]);
  const [types, setTypes] = useState([]);

  // Predefined demo rooms with images using process.env.PUBLIC_URL
  const demoRooms = [
    { id: 1, hotelName: 'Mumbai', roomType: 'Single', rating: 4.2, price: 1200, description: 'Cozy single room with a balcony.', imagePath: `${process.env.PUBLIC_URL}/assets/images/rooms/single1.jpg` },
    { id: 2, hotelName: 'Mumbai', roomType: 'Single', rating: 4.5, price: 1350, description: 'Comfortable single room with city view.', imagePath: `${process.env.PUBLIC_URL}/assets/images/rooms/single2.jpg` },
    { id: 3, hotelName: 'Pune', roomType: 'Single', rating: 4.0, price: 1100, description: 'Budget-friendly single room near the beach.', imagePath: `${process.env.PUBLIC_URL}/assets/images/rooms/single3.jpg` },
    { id: 4, hotelName: 'Pune', roomType: 'Single', rating: 4.3, price: 1400, description: 'Quiet single room surrounded by greenery.', imagePath: `${process.env.PUBLIC_URL}/assets/images/rooms/single4.jpg` },
    { id: 5, hotelName: 'Bangalore', roomType: 'Single', rating: 4.1, price: 1250, description: 'Single room with modern interiors.', imagePath: `${process.env.PUBLIC_URL}/assets/images/rooms/single5.jpg` },

    { id: 6, hotelName: 'Chennai', roomType: 'Double', rating: 4.6, price: 2200, description: 'Spacious double room with a king-size bed.', imagePath: `${process.env.PUBLIC_URL}/assets/images/rooms/double1.jpg` },
    { id: 7, hotelName: 'Chennai', roomType: 'Double', rating: 4.4, price: 2100, description: 'Double room with a sea-facing balcony.', imagePath: `${process.env.PUBLIC_URL}/assets/images/rooms/double2.jpg` },
    { id: 8, hotelName: 'Delhi', roomType: 'Double', rating: 4.3, price: 2000, description: 'Double room overlooking the mountains.', imagePath: `${process.env.PUBLIC_URL}/assets/images/rooms/double3.jpg` },
    { id: 9, hotelName: 'Delhi', roomType: 'Double', rating: 4.2, price: 2300, description: 'Modern double room in the city center.', imagePath: `${process.env.PUBLIC_URL}/assets/images/rooms/double4.jpg` },
    { id: 10, hotelName: 'Kolkata', roomType: 'Double', rating: 4.5, price: 2250, description: 'Luxury double room near the beach.', imagePath: `${process.env.PUBLIC_URL}/assets/images/rooms/double5.jpg` },

    { id: 11, hotelName: 'Mumbai', roomType: 'Suite', rating: 4.7, price: 3500, description: 'Luxury suite with private lounge.', imagePath: `${process.env.PUBLIC_URL}/assets/images/rooms/suite1.jpg` },
    { id: 12, hotelName: 'Bangalore', roomType: 'Suite', rating: 4.8, price: 3700, description: 'Spacious suite with heritage-style decor.', imagePath: `${process.env.PUBLIC_URL}/assets/images/rooms/suite2.jpg` },
    { id: 13, hotelName: 'Chennai', roomType: 'Suite', rating: 4.6, price: 3600, description: 'Suite with panoramic city views.', imagePath: `${process.env.PUBLIC_URL}/assets/images/rooms/suite3.jpg` },
    { id: 14, hotelName: 'Delhi', roomType: 'Suite', rating: 4.9, price: 4000, description: 'Presidential suite with premium services.', imagePath: `${process.env.PUBLIC_URL}/assets/images/rooms/suite4.jpg` },
    { id: 15, hotelName: 'Kolkata', roomType: 'Suite', rating: 4.7, price: 3550, description: 'Suite with river-facing balcony.', imagePath: `${process.env.PUBLIC_URL}/assets/images/rooms/suite5.jpg` },

    { id: 16, hotelName: 'Pune', roomType: 'Deluxe', rating: 4.6, price: 2800, description: 'Deluxe room with elegant interiors.', imagePath: `${process.env.PUBLIC_URL}/assets/images/rooms/deluxe1.jpg` },
    { id: 17, hotelName: 'Mumbai', roomType: 'Deluxe', rating: 4.5, price: 2900, description: 'Deluxe room overlooking the lake.', imagePath: `${process.env.PUBLIC_URL}/assets/images/rooms/deluxe2.jpg` },
    { id: 18, hotelName: 'Bangalore', roomType: 'Deluxe', rating: 4.7, price: 3000, description: 'Deluxe room with spa access.', imagePath: `${process.env.PUBLIC_URL}/assets/images/rooms/deluxe3.jpg` },
    { id: 19, hotelName: 'Chennai', roomType: 'Deluxe', rating: 4.4, price: 2750, description: 'Deluxe room in a prime location.', imagePath: `${process.env.PUBLIC_URL}/assets/images/rooms/deluxe4.jpg` },
    { id: 20, hotelName: 'Delhi', roomType: 'Deluxe', rating: 4.3, price: 2850, description: 'Deluxe room with modern amenities.', imagePath: `${process.env.PUBLIC_URL}/assets/images/rooms/deluxe5.jpg` },
  ];

  useEffect(() => {
    setRooms(demoRooms);

    let filtered = demoRooms;
    if (selectedLocation) {
      filtered = demoRooms.filter(room => room.hotelName === selectedLocation);
    }
    setFilteredRooms(filtered);

    const uniqueLocations = ['Mumbai', 'Pune', 'Bangalore', 'Chennai', 'Delhi', 'Kolkata'];
    setLocations(uniqueLocations);

    const uniqueTypes = Array.from(new Set(demoRooms.map(room => room.roomType)));
    setTypes(uniqueTypes);
  }, [selectedLocation]);

  const handleFilter = () => {
    let filtered = rooms;
    if (selectedLocation) filtered = filtered.filter(room => room.hotelName === selectedLocation);
    if (selectedType) filtered = filtered.filter(room => room.roomType === selectedType);
    setFilteredRooms(filtered);
  };

  return (
    <div className='all-rooms'>
      <h2>All Rooms</h2>

      <div className='filters'>
        <div className='filter-group'>
          <label>Location:</label>
          <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div className='filter-group'>
          <label>Room Type:</label>
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="">All Types</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <button className='filter-button' onClick={handleFilter}>Filter</button>
      </div>

      {filteredRooms.length > 0 ? (
        <RoomResult roomSearchResults={filteredRooms} />
      ) : (
        <p>No rooms found for this selection.</p>
      )}
    </div>
  );
};

export default AllRoomsPage;

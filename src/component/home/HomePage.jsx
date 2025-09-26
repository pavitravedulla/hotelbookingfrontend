import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './HomePage.css';




const HomePage = () => {
    const navigate = useNavigate();
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [cities, setCities] = useState([]);

    // Predefined demo rooms for featured
    const demoRooms = [
        { id: 1, hotelName: 'Mumbai', roomType: 'Single', rating: 4.2, price: 1200, description: 'Cozy single room with a balcony.', imagePath: '/assets/images/rooms/single1.jpg' },
        { id: 2, hotelName: 'Pune', roomType: 'Double', rating: 4.5, price: 2100, description: 'Spacious double room with a king-size bed.', imagePath: '/assets/images/rooms/double1.jpg' },
        { id: 3, hotelName: 'Bangalore', roomType: 'Suite', rating: 4.7, price: 3500, description: 'Luxury suite with private lounge.', imagePath: '/assets/images/rooms/suite1.jpg' },
    ];

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
        'Haryana': ['Gurgaon', 'Faridabad', 'Panipat'],
        'Andhra Pradesh': ['Vijayawada', 'Visakhapatnam', 'Guntur', 'Tirupati'],
        'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar']
    };

    const handleStateChange = (e) => {
        const selectedState = e.target.value;
        setState(selectedState);
        setCity('');
        setCities(statesAndCities[selectedState] || []);
    };

    const handleSearch = () => {
        if (state && city) {
            navigate('/rooms', { state: { state, city } });
        }
    };

    return (
        <div className="home">
            {/* HEADER / BANNER ROOM SECTION */}
            <section>
                <header className="header-banner">
                   
                    <div className="overlay"></div>
                    <div className="animated-texts overlay-content">
                        <h1>
                            Welcome to <span className="phegon-color"> Find the Best Everywhere</span>
                        </h1><br />
                        <h3>Step into a haven of comfort and care</h3>
                    </div>
                </header>
            </section>

            {/* SEARCH/FIND AVAILABLE ROOM SECTION */}
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
                    <button className="home-search-button" onClick={handleSearch}>
                        Search Rooms
                    </button>
                </div>
            </section>

            <h4><a className="view-rooms-home" href="/rooms">All Rooms</a></h4>

            
            {/* FEATURED ROOMS SECTION */}
            <section>
                <h2 style={{ textAlign: 'center', margin: '40px 0 20px 0' }}>Featured Rooms</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                    {demoRooms.slice(0, 3).map(room => (
                        <div key={room.id} style={{
                            display: 'flex',
                            border: '1px solid #e0e0e0',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 8px rgba(0, 0, 255, 0.3)',
                            transition: 'box-shadow 0.3s'
                        }}>
                            <img
                                src={room.imagePath}
                                alt={`${room.hotelName} - ${room.roomType}`}
                                style={{ width: '250px', height: '180px', objectFit: 'cover' }}
                            />
                            <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <h3>{room.hotelName}</h3>
                                <p>Type: {room.roomType}</p>
                                <p>Price: ₹{room.price} / night</p>
                                <p>Availability: Available</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', padding: '20px', justifyContent: 'flex-end' }}>
                                <button style={{
                                    padding: '12px 20px',
                                    backgroundColor: '#90ee90',
                                    color: '#000',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    fontSize: '16px',
                                    transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
                                }}>Book Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default HomePage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const RoomResult = ({ roomSearchResults }) => {
    const navigate = useNavigate();
    const isAdmin = ApiService.isAdmin();

    if (isAdmin) {
        return (
            <section className="room-results">
                {roomSearchResults && roomSearchResults.length > 0 ? (
                    <table className="rooms-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>City</th>
                                <th>Price (₹)</th>
                                <th>Availability</th>
                                <th>Bookings</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roomSearchResults.map(room => (
                                <tr key={room.id}>
                                    <td>
                                        <img
                                            className="table-room-image"
                                            src={room.imagePath || room.roomPhotoUrl}
                                            alt={`${room.hotelName || room.roomType} - ${room.roomType}`}
                                        />
                                    </td>
                                    <td>{room.hotelName || 'Hotel'}</td>
                                    <td>{room.roomType}</td>
                                    <td>{room.hotelName}</td>
                                    <td>₹{room.roomPrice || room.price}</td>
                                    <td>Available</td>
                                    <td>{room.bookingsCount || 0}</td>
                                    <td>
                                        <button
                                            className="edit-room-button"
                                            onClick={() => navigate(`/admin/edit-room/${room.id}`)}
                                        >
                                            Edit Room
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    roomSearchResults && roomSearchResults.length === 0 && (
                        <p>No rooms found for this selection.</p>
                    )
                )}
            </section>
        );
    }

    return (
        <section className="room-results">
            {roomSearchResults && roomSearchResults.length > 0 ? (
                <div className="room-list-vertical">
                    {roomSearchResults.map(room => (
                        <div key={room.id} className="room-card">
                            <img
                                className="room-image"
                                src={room.imagePath || room.roomPhotoUrl}
                                alt={`${room.hotelName || room.roomType} - ${room.roomType}`}
                            />
                            <div className="room-info">
                                <h3 className="room-name">{room.hotelName || 'Hotel'}</h3>
                                <p className="room-type">Type: {room.roomType}</p>
                                <p className="room-price">Price: ₹{room.roomPrice || room.price} / night</p>
                                <p className="room-availability">Availability: Available</p>
                            </div>
                            <div className="book-now-container">
                                <button
                                    className="book-now-button"
                                    onClick={() => navigate(`/room-details-book/${room.id}`)}
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                roomSearchResults && roomSearchResults.length === 0 && (
                    <p>No rooms found for this selection.</p>
                )
            )}
        </section>
    );
}

export default RoomResult;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from '../../service/ApiService';
import AdminLayout from './AdminLayout';

const AdminPage = () => {
  const navigate = useNavigate();
  const [totalRooms, setTotalRooms] = useState(0);
  const [availableRooms, setAvailableRooms] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const roomsRes = await ApiService.getAllRooms();
        setTotalRooms(roomsRes.roomList.length);

        const availRes = await ApiService.getAllAvailableRooms();
        setAvailableRooms(availRes.roomList.length);

        const usersRes = await ApiService.getAllUsers();
        setTotalUsers(usersRes.length);

        const bookingsRes = await ApiService.getAllBookings();
        setRecentBookings(bookingsRes.bookingList.slice(0, 5)); // Recent 5 bookings
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const bookedRooms = totalRooms - availableRooms;

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-page">
          <p>Loading dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-page">
        <h1>Dashboard</h1>
        <div className="stats-cards">
          <div className="stat-card">
            <h3>Total Rooms</h3>
            <p>{totalRooms}</p>
          </div>
          <div className="stat-card">
            <h3>Available Rooms</h3>
            <p>{availableRooms}</p>
          </div>
          <div className="stat-card">
            <h3>Booked Rooms</h3>
            <p>{bookedRooms}</p>
          </div>
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>{totalUsers}</p>
          </div>
        </div>
        <div className="recent-bookings">
          <h2>Recent Bookings</h2>
          <ul>
            {recentBookings.map((booking) => (
              <li key={booking.id}>
                {booking.bookingConfirmationCode} - {booking.checkInDate} to {booking.checkOutDate}
              </li>
            ))}
          </ul>
        </div>
        <div className="admin-actions">
          <button className="admin-button" onClick={() => navigate('/admin/manage-rooms')}>
            Manage Rooms
          </button>
          <button className="admin-button" onClick={() => navigate('/admin/manage-bookings')}>
            Manage Bookings
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;

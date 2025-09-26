import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import './AdminLayout.css'; // We'll create this

const AdminLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      localStorage.setItem('theme', 'dark');
      document.body.classList.add('dark-mode');
    } else {
      localStorage.removeItem('theme');
      document.body.classList.remove('dark-mode');
    }
  };

  const handleLogout = () => {
    ApiService.logout();
    navigate('/login');
  };

  const sidebarItems = [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/manage-rooms', label: 'Manage Rooms' },
    { path: '/admin/manage-bookings', label: 'Manage Bookings' },
    { path: '/admin/add-room', label: 'Add Room' },
  ];

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="welcome-message">
          Welcome, Admin (2300033208@kluniversity.in)
        </div>
        <button className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <div className="admin-body">
        <aside className="admin-sidebar">
          <nav>
            <ul>
              {sidebarItems.map((item) => (
                <li key={item.path}>
                  <button
                    className={location.pathname === item.path ? 'active' : ''}
                    onClick={() => navigate(item.path)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
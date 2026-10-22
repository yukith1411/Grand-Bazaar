import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiLayout,
  FiGrid,
  FiAward,
  FiBox,
  FiUsers,
  FiShoppingBag,
  FiPercent,
  FiImage,
  FiMessageSquare,
  FiSettings,
} from 'react-icons/fi';
import '../../css/admin.css';

const AdminSidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FiLayout /> },
    { name: 'Departments', path: '/admin/categories', icon: <FiGrid /> },
    { name: 'Brands', path: '/admin/brands', icon: <FiAward /> },
    { name: 'Products', path: '/admin/products', icon: <FiBox /> },
    { name: 'Orders', path: '/admin/orders', icon: <FiShoppingBag /> },
    { name: 'Customers', path: '/admin/users', icon: <FiUsers /> },
    { name: 'Coupons', path: '/admin/coupons', icon: <FiPercent /> },
    { name: 'Banners', path: '/admin/banners', icon: <FiImage /> },
    { name: 'Reviews', path: '/admin/reviews', icon: <FiMessageSquare /> },
    { name: 'Settings', path: '/admin/settings', icon: <FiSettings /> }
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header" style={{ fontFamily: 'var(--font-main)', letterSpacing: '1px' }}>
        GRAND BAZAAR <span style={{ fontSize: '0.65rem', opacity: 0.7, display: 'block', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '2px' }}>Admin Portal</span>
      </div>
      <nav className="admin-sidebar-menu">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `admin-menu-item ${isActive ? 'active' : ''}`}
          >
            {item.icon} <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;

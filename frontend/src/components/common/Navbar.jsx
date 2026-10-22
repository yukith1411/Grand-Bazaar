import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiUser, FiMenu, FiX, FiLogOut, FiLayout, FiPhone } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import '../../css/navbar.css';

const Navbar = () => {
  const { isAuthenticated, isAdmin, user, logout } = useContext(AuthContext);
  const { getCartCount } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/login');
  };

  return (
    <>
      {/* Top strip */}
      <div style={{
        backgroundColor: 'var(--primary)',
        color: 'white',
        textAlign: 'center',
        fontSize: '0.78rem',
        padding: '8px 0',
        letterSpacing: '0.5px',
        fontFamily: 'var(--font-body)'
      }}>
        FREE SHIPPING ON ORDERS ABOVE ₹3,000 &nbsp;|&nbsp; <FiPhone style={{ display: 'inline', verticalAlign: 'middle' }} /> +91 98765 43210
      </div>

      <nav className="navbar">
        <div className="container navbar-container">
          <button
            className="nav-toggle-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>

          {/* Brand Logo */}
          <Link to="/" className="nav-brand" onClick={() => setMobileOpen(false)}>
            <span style={{ fontFamily: 'var(--font-main)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '2px' }}>
              GRAND BAZAAR
            </span>
          </Link>

          {/* Navigation Links */}
          <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
            <NavLink to="/" className="nav-link" onClick={() => setMobileOpen(false)}>Home</NavLink>
            <NavLink to="/shop" className="nav-link" onClick={() => setMobileOpen(false)}>All Departments</NavLink>
            <NavLink to="/shop?category=electronics" className="nav-link" onClick={() => setMobileOpen(false)}>Electronics</NavLink>
            <NavLink to="/shop?category=home-living" className="nav-link" onClick={() => setMobileOpen(false)}>Home & Living</NavLink>
            <NavLink to="/shop?category=fashion" className="nav-link" onClick={() => setMobileOpen(false)}>Fashion</NavLink>
          </div>

          {/* Action Buttons */}
          <div className="nav-actions">
            <Link to="/wishlist" className="nav-action-btn" aria-label="View Wishlist">
              <FiHeart />
              {wishlist.length > 0 && <span className="nav-badge">{wishlist.length}</span>}
            </Link>

            <Link to="/cart" className="nav-action-btn" aria-label="View Shopping Cart">
              <FiShoppingBag />
              {getCartCount() > 0 && <span className="nav-badge">{getCartCount()}</span>}
            </Link>

            {isAuthenticated ? (
              <div className="nav-profile-menu" ref={dropdownRef}>
                <div
                  className="nav-profile-trigger"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <FiUser />
                  <span style={{ fontSize: '0.85rem' }}>{user?.name?.split(' ')[0]}</span>
                </div>
                <div className={`nav-dropdown ${dropdownOpen ? 'show' : ''}`}>
                  {isAdmin && (
                    <Link to="/admin/dashboard" className="nav-dropdown-item" onClick={() => setDropdownOpen(false)}>
                      <FiLayout /> Admin Panel
                    </Link>
                  )}
                  <Link to="/profile" className="nav-dropdown-item" onClick={() => setDropdownOpen(false)}>
                    <FiUser /> My Account
                  </Link>
                  <Link to="/orders" className="nav-dropdown-item" onClick={() => setDropdownOpen(false)}>
                    <FiShoppingBag /> My Orders
                  </Link>
                  <div className="nav-dropdown-item" onClick={handleLogout}>
                    <FiLogOut /> Logout
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.8rem' }}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

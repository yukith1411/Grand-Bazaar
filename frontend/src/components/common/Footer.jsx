import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaFacebook, FaInstagram, FaTwitter, FaCcVisa, FaCcMastercard, FaRegCreditCard } from 'react-icons/fa';
import '../../css/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo" style={{ fontFamily: 'var(--font-main)', fontSize: '1.5rem', letterSpacing: '2px' }}>
              GRAND BAZAAR
            </div>
            <p className="footer-text">
              Your one-stop department store for Electronics, Home & Living, Fashion, Groceries, and much more. Quality products at unbeatable prices.
            </p>
            <div className="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-btn"><FaFacebook /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-btn"><FaInstagram /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-social-btn"><FaTwitter /></a>
            </div>
          </div>

          <div>
            <h3 className="footer-title">Departments</h3>
            <ul className="footer-links">
              <li><Link to="/shop?category=electronics" className="footer-link">Electronics</Link></li>
              <li><Link to="/shop?category=home-living" className="footer-link">Home & Living</Link></li>
              <li><Link to="/shop?category=fashion" className="footer-link">Fashion & Apparel</Link></li>
              <li><Link to="/shop?category=groceries" className="footer-link">Groceries & Food</Link></li>
              <li><Link to="/shop?category=sports" className="footer-link">Sports & Outdoors</Link></li>
              <li><Link to="/shop?category=beauty" className="footer-link">Beauty & Health</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Customer Care</h3>
            <ul className="footer-links">
              <li><Link to="/orders" className="footer-link">Track My Order</Link></li>
              <li><Link to="/profile" className="footer-link">My Account</Link></li>
              <li><Link to="/wishlist" className="footer-link">My Wishlist</Link></li>
              <li><Link to="/" className="footer-link">Return Policy</Link></li>
              <li><Link to="/" className="footer-link">Bulk Orders</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Contact Us</h3>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <FiMapPin /> 45 Market Square, Connaught Place, New Delhi - 110001
              </div>
              <div className="footer-contact-item">
                <FiPhone /> +91 98765 43210
              </div>
              <div className="footer-contact-item">
                <FiMail /> support@grandbazaar.in
              </div>
            </div>
            <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '4px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--secondary)' }}>Store Hours</strong><br />
              Mon–Sat: 9am – 9pm<br />
              Sunday: 10am – 7pm
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} Grand Bazaar Department Store. All Rights Reserved.
          </div>
          <div className="footer-payments">
            <FaCcVisa title="Visa" />
            <FaCcMastercard title="Mastercard" />
            <FaRegCreditCard title="Rupay / Net Banking" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

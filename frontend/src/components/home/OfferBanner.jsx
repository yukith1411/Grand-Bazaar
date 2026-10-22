import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/home.css';

const OfferBanner = ({ banner }) => {
  if (!banner) return null;

  return (
    <div
      className="offer-banner container"
      style={{ backgroundImage: `url(${banner.image})` }}
    >
      <div className="offer-banner-overlay" />
      <div className="offer-banner-content">
        <h2 className="offer-banner-title">{banner.title}</h2>
        <p className="offer-banner-text">{banner.subtitle}</p>
        <Link to={banner.link || '/shop'} className="btn btn-primary">
          Claim Offer
        </Link>
      </div>
    </div>
  );
};

export default OfferBanner;

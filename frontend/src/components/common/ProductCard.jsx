import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { WishlistContext } from '../../context/WishlistContext';
import Rating from './Rating';
import '../../css/productCard.css';

const ProductCard = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useContext(WishlistContext);

  const isFavorite = isInWishlist(product._id);

  // Discount calculation
  const hasDiscount = product.discountPrice > 0;
  const pctOff = hasDiscount
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleWishlist(product._id);
  };

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link to={`/product/${product.slug}`}>
        {/* Image Display */}
        <div className="product-card-image-wrapper">
          <img
            src={product.images && product.images[0]}
            alt={product.name}
            className="product-card-image"
            loading="lazy"
          />

          {/* Badge Indicators */}
          <div className="product-badge-group">
            {hasDiscount && (
              <span className="product-badge product-badge-discount">{pctOff}% Off</span>
            )}
            {product.featured && (
              <span className="product-badge product-badge-featured">Featured</span>
            )}
            {product.trending && (
              <span className="product-badge product-badge-trending">Trending</span>
            )}
          </div>

          {/* Wishlist Trigger */}
          <button
            className={`product-wishlist-btn ${isFavorite ? 'active' : ''}`}
            onClick={handleWishlistToggle}
            aria-label={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            {isFavorite ? <FaHeart style={{ color: 'var(--primary)' }} /> : <FiHeart />}
          </button>
        </div>

        {/* Content Box */}
        <div className="product-card-content">
          <span className="product-card-brand">{product.brand?.name || 'GENERIC'}</span>
          <h2 className="product-card-title">{product.name}</h2>

          <div className="product-card-rating">
            <Rating value={product.ratings?.average || 0} />
            <span style={{ color: 'var(--text-secondary)' }}>({product.ratings?.count || 0})</span>
          </div>

          <div className="product-card-price-row">
            {hasDiscount ? (
              <>
                <span className="product-card-price">₹{product.discountPrice}</span>
                <span className="product-card-old-price">₹{product.price}</span>
              </>
            ) : (
              <span className="product-card-price">₹{product.price}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;

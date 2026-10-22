import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import HeroSlider from '../../components/home/HeroSlider';
import OfferBanner from '../../components/home/OfferBanner';
import Testimonials from '../../components/home/Testimonials';
import ProductCard from '../../components/common/ProductCard';
import Skeleton from '../../components/common/Skeleton';
import '../../css/home.css';

const DeptCard = ({ icon, title, description, onClick }) => (
  <div
    onClick={onClick}
    style={{
      background: 'var(--bg-primary)',
      border: '1.5px solid var(--border-color)',
      borderRadius: '4px',
      padding: '32px 20px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'var(--transition-fast)',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.boxShadow = 'none'; }}
  >
    <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{icon}</div>
    <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '6px' }}>{title}</h3>
    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{description}</p>
  </div>
);

const Home = () => {
  const navigate = useNavigate();

  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        const [bannersRes, categoriesRes, brandsRes, featuredRes, newArrivalRes, trendingRes] = await Promise.all([
          API.get('/banners'),
          API.get('/categories'),
          API.get('/brands'),
          API.get('/products?featured=true&limit=4'),
          API.get('/products?newArrival=true&limit=4'),
          API.get('/products?trending=true&limit=4')
        ]);

        if (bannersRes.data.success) setBanners(bannersRes.data.banners);
        if (categoriesRes.data.success) setCategories(categoriesRes.data.categories.filter(c => c.active));
        if (brandsRes.data.success) setBrands(brandsRes.data.brands.filter(b => b.active));
        if (featuredRes.data.success) setFeaturedProducts(featuredRes.data.products);
        if (newArrivalRes.data.success) setNewArrivalProducts(newArrivalRes.data.products);
        if (trendingRes.data.success) setTrendingProducts(trendingRes.data.products);
      } catch (error) {
        console.error('Failed to load home page content', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const heroBanners = banners.filter((b) => b.type === 'hero');
  const offerBanners = banners.filter((b) => b.type === 'offer');

  const departments = [
    { icon: '📱', title: 'Electronics', description: 'Phones, Laptops, TVs & Gadgets', slug: 'electronics' },
    { icon: '🛋️', title: 'Home & Living', description: 'Furniture, Décor & Kitchenware', slug: 'home-living' },
    { icon: '👗', title: 'Fashion', description: 'Clothing, Footwear & Accessories', slug: 'fashion' },
    { icon: '🛒', title: 'Groceries', description: 'Fresh produce & daily essentials', slug: 'groceries' },
    { icon: '⚽', title: 'Sports', description: 'Equipment, Gear & Activewear', slug: 'sports' },
    { icon: '💄', title: 'Beauty & Health', description: 'Skincare, Wellness & Personal Care', slug: 'beauty' },
    { icon: '📚', title: 'Books & Stationery', description: 'Books, Notebooks & Office Supplies', slug: 'books' },
    { icon: '🧸', title: 'Toys & Baby', description: 'Toys, Games & Baby Care products', slug: 'toys' },
  ];

  return (
    <div style={{ paddingBottom: '40px' }}>
      {/* Hero Slider */}
      {loading ? (
        <Skeleton height="600px" borderRadius="0px" />
      ) : (
        <HeroSlider banners={heroBanners} />
      )}

      {/* Shop by Department */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Shop by Department</h2>
          <p className="section-subtitle">Everything you need, all under one roof</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {departments.map((dept) => (
              <DeptCard
                key={dept.slug}
                icon={dept.icon}
                title={dept.title}
                description={dept.description}
                onClick={() => navigate(`/shop?category=${dept.slug}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Brands / Trusted Partners */}
      <section style={{ backgroundColor: 'var(--bg-secondary)', padding: '40px 0' }}>
        <div className="container">
          <h3 style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Trusted Brands & Partners
          </h3>
          <div className="brands-grid">
            {loading ? (
              Array(5).fill(0).map((_, i) => <Skeleton key={i} width="120px" height="40px" borderRadius="4px" />)
            ) : (
              brands.map((brand) => (
                <div
                  key={brand._id}
                  className="brand-chip"
                  onClick={() => navigate(`/shop?brand=${brand.slug}`)}
                >
                  {brand.name}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Featured Categories</h2>
          <p className="section-subtitle">Curated selections from our most popular departments</p>
          <div className="categories-grid">
            {loading ? (
              Array(4).fill(0).map((_, i) => <Skeleton key={i} height="320px" borderRadius="4px" />)
            ) : (
              categories.slice(0, 4).map((cat) => (
                <div
                  key={cat._id}
                  className="category-card"
                  onClick={() => navigate(`/shop?category=${cat.slug}`)}
                >
                  <img src={cat.image} alt={cat.name} className="category-card-img" />
                  <div className="category-card-overlay">
                    <span className="category-card-name">{cat.name}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 className="section-title">Best Sellers</h2>
          <p className="section-subtitle">Top-rated products chosen by thousands of happy customers</p>
          <div className="products-grid">
            {loading ? (
              Array(4).fill(0).map((_, i) => <Skeleton key={i} height="400px" borderRadius="4px" />)
            ) : (
              trendingProducts.map((prod) => <ProductCard key={prod._id} product={prod} />)
            )}
          </div>
        </div>
      </section>

      {/* Offer Banner */}
      {!loading && offerBanners.length > 0 && <OfferBanner banner={offerBanners[0]} />}

      {/* New Arrivals */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">New Arrivals</h2>
          <p className="section-subtitle">Fresh additions to our collection, just landed in store</p>
          <div className="products-grid">
            {loading ? (
              Array(4).fill(0).map((_, i) => <Skeleton key={i} height="400px" borderRadius="4px" />)
            ) : (
              newArrivalProducts.map((prod) => <ProductCard key={prod._id} product={prod} />)
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 className="section-title">Staff Picks</h2>
          <p className="section-subtitle">Hand-selected by our expert team for exceptional quality & value</p>
          <div className="products-grid">
            {loading ? (
              Array(4).fill(0).map((_, i) => <Skeleton key={i} height="400px" borderRadius="4px" />)
            ) : (
              featuredProducts.map((prod) => <ProductCard key={prod._id} product={prod} />)
            )}
          </div>
        </div>
      </section>

      {/* Why Shop With Us */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Why Grand Bazaar?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px', marginTop: '48px' }}>
            {[
              { icon: '🚚', title: 'Free Delivery', desc: 'On all orders above ₹3,000 nationwide' },
              { icon: '↩️', title: 'Easy Returns', desc: '30-day hassle-free return policy' },
              { icon: '🔒', title: 'Secure Payments', desc: '100% encrypted transactions' },
              { icon: '🎧', title: '24/7 Support', desc: 'Round-the-clock customer care' },
            ].map(item => (
              <div key={item.title} style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '6px' }}>{item.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
};

export default Home;

import React from 'react';

const reviews = [
  {
    name: 'Arjun Mehta',
    location: 'Mumbai',
    text: 'Grand Bazaar is my go-to for everything from electronics to groceries. The quality is top-notch and delivery is always on time. Highly recommended!',
    rating: 5,
    purchase: 'Samsung 4K TV'
  },
  {
    name: 'Sneha Patel',
    location: 'Bangalore',
    text: 'Amazing selection across all departments. I bought furniture, skincare, and sports gear all in one order. The return process was super easy too.',
    rating: 5,
    purchase: 'IKEA Dresser'
  },
  {
    name: 'Rohan Kumar',
    location: 'Hyderabad',
    text: 'I love that I can find literally everything here. The discounts are genuine and the customer support team is incredibly helpful.',
    rating: 4,
    purchase: 'Nike Air Max'
  }
];

const Testimonials = () => {
  return (
    <section className="section" style={{ backgroundColor: 'var(--primary)' }}>
      <div className="container">
        <h2 className="section-title" style={{ color: 'white' }}>What Our Customers Say</h2>
        <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Trusted by over 2 million happy shoppers across India
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {reviews.map((rev, idx) => (
            <div key={idx} style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '4px',
              padding: '28px',
              color: 'white'
            }}>
              <div style={{ marginBottom: '16px', color: '#c9a84c', fontSize: '1.1rem' }}>
                {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
              </div>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '20px', opacity: 0.9 }}>
                "{rev.text}"
              </p>
              <div>
                <strong style={{ display: 'block', fontSize: '0.9rem' }}>{rev.name}</strong>
                <span style={{ fontSize: '0.8rem', opacity: 0.65 }}>{rev.location} &bull; Bought: {rev.purchase}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

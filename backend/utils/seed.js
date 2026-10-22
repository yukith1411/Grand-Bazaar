import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Brand from '../models/Brand.js';
import Product from '../models/Product.js';
import Coupon from '../models/Coupon.js';
import Banner from '../models/Banner.js';
import Review from '../models/Review.js';
import Order from '../models/Order.js';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dept-store');
    console.log(`Seed MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Category.deleteMany();
    await Brand.deleteMany();
    await Product.deleteMany();
    await Coupon.deleteMany();
    await Banner.deleteMany();
    await Review.deleteMany();
    await Order.deleteMany();

    console.log('Database wiped clean...');

    const users = await User.create([
      {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: 'adminpassword123',
        mobile: '9876543210',
        role: 'admin',
      },
      {
        name: 'Priya Sharma',
        email: 'priya@gmail.com',
        password: 'password123',
        mobile: '9876543211',
        role: 'user',
        addresses: [
          {
            street: '24 Lajpat Nagar, Block B',
            city: 'New Delhi',
            state: 'Delhi',
            zipCode: '110024',
            country: 'India'
          }
        ]
      }
    ]);

    console.log('Users seeded...');

    const categories = await Category.create([
      {
        name: 'Electronics',
        slug: 'electronics',
        description: 'Smartphones, Laptops, TVs, and Smart Gadgets',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&auto=format&fit=crop&q=80',
        active: true
      },
      {
        name: 'Home & Living',
        slug: 'home-living',
        description: 'Furniture, Décor, Bedding, and Kitchenware',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop&q=80',
        active: true
      },
      {
        name: 'Fashion',
        slug: 'fashion',
        description: 'Clothing, Footwear, and Accessories for all',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80',
        active: true
      },
      {
        name: 'Groceries',
        slug: 'groceries',
        description: 'Fresh produce, pantry staples, and daily essentials',
        image: 'https://images.unsplash.com/photo-1543168256-418811576931?w=600&auto=format&fit=crop&q=80',
        active: true
      },
      {
        name: 'Sports & Outdoors',
        slug: 'sports',
        description: 'Sports equipment, activewear, and outdoor gear',
        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&auto=format&fit=crop&q=80',
        active: true
      },
      {
        name: 'Beauty & Health',
        slug: 'beauty',
        description: 'Skincare, wellness products, and personal care',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop&q=80',
        active: true
      }
    ]);

    console.log('Categories seeded...');

    const brands = await Brand.create([
      { name: 'Samsung', slug: 'samsung', description: 'Global electronics leader', active: true },
      { name: 'Apple', slug: 'apple', description: 'Premium technology brand', active: true },
      { name: 'IKEA', slug: 'ikea', description: 'Modern home furnishing', active: true },
      { name: 'Nike', slug: 'nike', description: 'Just Do It - Sports & Fashion', active: true },
      { name: 'L\'Oreal', slug: 'loreal', description: 'World\'s leading beauty brand', active: true },
      { name: 'Philips', slug: 'philips', description: 'Innovating for a better future', active: true },
    ]);

    console.log('Brands seeded...');

    const elecCat = categories.find(c => c.slug === 'electronics')._id;
    const homeCat = categories.find(c => c.slug === 'home-living')._id;
    const fashionCat = categories.find(c => c.slug === 'fashion')._id;
    const sportsCat = categories.find(c => c.slug === 'sports')._id;
    const beautyCat = categories.find(c => c.slug === 'beauty')._id;

    const samsung = brands.find(b => b.slug === 'samsung')._id;
    const apple = brands.find(b => b.slug === 'apple')._id;
    const ikea = brands.find(b => b.slug === 'ikea')._id;
    const nike = brands.find(b => b.slug === 'nike')._id;
    const loreal = brands.find(b => b.slug === 'loreal')._id;
    const philips = brands.find(b => b.slug === 'philips')._id;

    await Product.create([
      {
        name: 'Samsung 65" 4K Smart TV',
        slug: 'samsung-65-4k-smart-tv-001',
        description: 'Immersive 65-inch 4K QLED display with Tizen OS, built-in Alexa, and crystal-clear HDR visuals. Perfect for home entertainment.',
        price: 89999,
        discountPrice: 74999,
        brand: samsung,
        category: elecCat,
        images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=600&auto=format&fit=crop&q=80'],
        stock: 15,
        sizes: [],
        colors: ['Black'],
        featured: true,
        trending: true,
        ratings: { average: 4.7, count: 124 }
      },
      {
        name: 'Apple iPhone 15 Pro',
        slug: 'apple-iphone-15-pro-0011',
        description: 'The most advanced iPhone ever with A17 Pro chip, titanium design, 48MP main camera, and all-day battery life.',
        price: 134900,
        discountPrice: 119900,
        brand: apple,
        category: elecCat,
        images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80'],
        stock: 30,
        sizes: ['128GB', '256GB', '512GB'],
        colors: ['Natural Titanium', 'Blue Titanium', 'Black Titanium'],
        featured: true,
        newArrival: true,
        ratings: { average: 4.9, count: 289 }
      },
      {
        name: 'IKEA MALM 6-Drawer Dresser',
        slug: 'ikea-malm-dresser-0012',
        description: 'Smooth-running drawers with a built-in safety function. Assembled dimensions: 160x77x48 cm. Anti-tip hardware included.',
        price: 18999,
        discountPrice: 0,
        brand: ikea,
        category: homeCat,
        images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80'],
        stock: 25,
        sizes: [],
        colors: ['White', 'Oak Veneer', 'Dark Brown'],
        featured: false,
        newArrival: true,
        ratings: { average: 4.4, count: 67 }
      },
      {
        name: 'Nike Air Max 270',
        slug: 'nike-air-max-270-0013',
        description: "Nike's largest Air unit yet in the heel for an extremely comfortable ride. The full-length upper is soft and breathable.",
        price: 12995,
        discountPrice: 9995,
        brand: nike,
        category: fashionCat,
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80'],
        stock: 80,
        sizes: ['6', '7', '8', '9', '10', '11'],
        colors: ['Black/White', 'Blue/Orange', 'All White'],
        featured: false,
        trending: true,
        ratings: { average: 4.6, count: 203 }
      },
      {
        name: 'L\'Oreal Revitalift Serum',
        slug: 'loreal-revitalift-serum-0014',
        description: '1.5% pure hyaluronic acid concentrated serum that intensely hydrates skin for up to 72 hours. Reduces wrinkles in 1 week.',
        price: 1499,
        discountPrice: 999,
        brand: loreal,
        category: beautyCat,
        images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80'],
        stock: 120,
        sizes: ['30ml', '50ml'],
        colors: [],
        newArrival: true,
        trending: true,
        ratings: { average: 4.5, count: 312 }
      },
      {
        name: 'Philips Air Purifier AC1215',
        slug: 'philips-air-purifier-ac1215-0015',
        description: 'HEPA filter removes 99.97% of allergens including pollen, bacteria, and viruses. Covers up to 333 sq ft. Quiet sleep mode.',
        price: 14999,
        discountPrice: 11999,
        brand: philips,
        category: homeCat,
        images: ['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&auto=format&fit=crop&q=80'],
        stock: 40,
        sizes: [],
        colors: ['White'],
        featured: true,
        ratings: { average: 4.3, count: 88 }
      },
      {
        name: 'Nike Dri-FIT Training T-Shirt',
        slug: 'nike-drifit-training-tshirt-0016',
        description: 'Lightweight, sweat-wicking fabric keeps you dry and comfortable during your workout. Standard fit, crew neck design.',
        price: 2495,
        discountPrice: 1795,
        brand: nike,
        category: sportsCat,
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=80'],
        stock: 200,
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'White', 'Navy', 'Grey'],
        newArrival: true,
        featured: false,
        ratings: { average: 4.2, count: 156 }
      },
      {
        name: 'Samsung Galaxy Tab S9',
        slug: 'samsung-galaxy-tab-s9-0017',
        description: 'Powerful Android tablet with Snapdragon 8 Gen 2, 11-inch AMOLED display, IP68 water resistance, and S Pen included.',
        price: 72999,
        discountPrice: 64999,
        brand: samsung,
        category: elecCat,
        images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80'],
        stock: 20,
        sizes: ['128GB', '256GB'],
        colors: ['Graphite', 'Beige', 'Lime'],
        trending: true,
        featured: false,
        ratings: { average: 4.8, count: 95 }
      }
    ]);

    console.log('Products seeded...');

    await Coupon.create([
      { code: 'GRAND10', discountType: 'Percentage', discountAmount: 10, minPurchase: 1000, expiryDate: new Date('2026-12-31'), active: true },
      { code: 'WELCOME500', discountType: 'Fixed', discountAmount: 500, minPurchase: 5000, expiryDate: new Date('2026-12-31'), active: true },
      { code: 'TECH15', discountType: 'Percentage', discountAmount: 15, minPurchase: 10000, expiryDate: new Date('2026-12-31'), active: true },
    ]);

    console.log('Coupons seeded...');

    await Banner.create([
      {
        title: 'Summer Sale — Up to 50% Off!',
        subtitle: 'Shop Electronics, Fashion, Home & more at incredible prices',
        image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&auto=format&fit=crop&q=80',
        link: '/shop',
        type: 'hero',
        active: true
      },
      {
        title: 'New Tech Arrivals',
        subtitle: 'Latest smartphones, tablets, and smart home devices',
        image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1400&auto=format&fit=crop&q=80',
        link: '/shop?category=electronics',
        type: 'hero',
        active: true
      },
      {
        title: 'Home Makeover Sale',
        subtitle: 'Up to 40% off on furniture and home décor this weekend',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80',
        link: '/shop?category=home-living',
        type: 'offer',
        active: true
      }
    ]);

    console.log('Banners seeded...');
    console.log('\n✅ Grand Bazaar Seed Completed Successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👤 Admin:   admin@gmail.com / adminpassword123');
    console.log('👤 User:    priya@gmail.com  / password123');
    console.log('🏷️  Coupons: GRAND10, WELCOME500, TECH15');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('Seeding Error:', error);
  } finally {
    mongoose.disconnect();
  }
};

seedData();

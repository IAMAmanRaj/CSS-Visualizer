import type { PatternTemplate } from '../types';

export const defaultPatterns: PatternTemplate[] = [
  // Flexbox Patterns
  {
    name: 'Flexbox - Basic Row',
    type: 'flexbox',
    description: 'Basic flexbox row layout with items distributed evenly',
    html: `<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>`,
    css: `.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: #f0f0f0;
  min-height: 200px;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: bold;
  font-size: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}`,
  },
  {
    name: 'Flexbox - Column Layout',
    type: 'flexbox',
    description: 'Vertical flexbox layout with column direction',
    html: `<div class="container">
  <div class="item header">Header</div>
  <div class="item content">Content</div>
  <div class="item footer">Footer</div>
</div>`,
    css: `.container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background: #1a1a2e;
  min-height: 300px;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: #16213e;
  color: #e94560;
  font-weight: 600;
  border-radius: 8px;
  border-left: 4px solid #e94560;
}

.header {
  flex: 0 0 auto;
}

.content {
  flex: 1;
}

.footer {
  flex: 0 0 auto;
}`,
  },
  {
    name: 'Flexbox - Centered Content',
    type: 'flexbox',
    description: 'Perfect centering with flexbox',
    html: `<div class="container">
  <div class="card">
    <h2>Centered Card</h2>
    <p>This card is perfectly centered using flexbox!</p>
  </div>
</div>`,
    css: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card {
  background: white;
  padding: 32px 48px;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.card h2 {
  margin: 0 0 12px 0;
  color: #333;
  font-size: 24px;
}

.card p {
  margin: 0;
  color: #666;
  font-size: 14px;
}`,
  },
  {
    name: 'Flexbox - Wrap Layout',
    type: 'flexbox',
    description: 'Flexible wrapping items in a container',
    html: `<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
</div>`,
    css: `.container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px;
  background: #f8f9fa;
}

.item {
  flex: 1 1 calc(33.333% - 16px);
  min-width: 100px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4CAF50;
  color: white;
  font-size: 20px;
  font-weight: bold;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(76, 175, 80, 0.4);
}`,
  },
  // Grid Patterns
  {
    name: 'Grid - Basic 3x3',
    type: 'grid',
    description: 'Basic 3x3 grid layout',
    html: `<div class="grid-container">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>
  <div class="grid-item">4</div>
  <div class="grid-item">5</div>
  <div class="grid-item">6</div>
  <div class="grid-item">7</div>
  <div class="grid-item">8</div>
  <div class="grid-item">9</div>
</div>`,
    css: `.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 80px);
  gap: 12px;
  padding: 20px;
  background: #2d3436;
}

.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
  color: white;
  font-size: 20px;
  font-weight: bold;
  border-radius: 8px;
  transition: transform 0.2s;
}

.grid-item:hover {
  transform: scale(1.05);
}`,
  },
  {
    name: 'Grid - Holy Grail Layout',
    type: 'grid',
    description: 'Classic holy grail layout with grid areas',
    html: `<div class="layout">
  <header class="header">Header</header>
  <nav class="sidebar">Sidebar</nav>
  <main class="main">Main Content</main>
  <aside class="aside">Aside</aside>
  <footer class="footer">Footer</footer>
</div>`,
    css: `.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 150px 1fr 150px;
  grid-template-rows: 60px 1fr 50px;
  gap: 8px;
  min-height: 300px;
  padding: 8px;
  background: #1a1a2e;
}

.header {
  grid-area: header;
  background: #e94560;
}

.sidebar {
  grid-area: sidebar;
  background: #0f3460;
}

.main {
  grid-area: main;
  background: #16213e;
}

.aside {
  grid-area: aside;
  background: #0f3460;
}

.footer {
  grid-area: footer;
  background: #e94560;
}

.header, .sidebar, .main, .aside, .footer {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  border-radius: 4px;
}`,
  },
  {
    name: 'Grid - Auto-fit Cards',
    type: 'grid',
    description: 'Responsive card grid with auto-fit',
    html: `<div class="card-grid">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
  <div class="card">Card 5</div>
  <div class="card">Card 6</div>
</div>`,
    css: `.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.card {
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-weight: 600;
  color: #333;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}`,
  },
  {
    name: 'Grid - Magazine Layout',
    type: 'grid',
    description: 'Complex magazine-style layout with spanning items',
    html: `<div class="magazine">
  <div class="item featured">Featured</div>
  <div class="item">Article 1</div>
  <div class="item">Article 2</div>
  <div class="item wide">Wide Article</div>
  <div class="item">Article 3</div>
  <div class="item tall">Tall</div>
</div>`,
    css: `.magazine {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 80px;
  gap: 12px;
  padding: 16px;
  background: #f0f0f0;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #6c5ce7;
  color: white;
  font-weight: 600;
  border-radius: 8px;
}

.featured {
  grid-column: span 2;
  grid-row: span 2;
  background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%);
  font-size: 20px;
}

.wide {
  grid-column: span 2;
  background: #fd79a8;
}

.tall {
  grid-row: span 2;
  background: #00b894;
}`,
  },
  // Custom Layouts
  {
    name: 'Custom - Navigation Bar',
    type: 'custom',
    description: 'Modern navigation bar with logo and links',
    html: `<nav class="navbar">
  <div class="logo">Logo</div>
  <ul class="nav-links">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
  <button class="cta-btn">Get Started</button>
</nav>`,
    css: `.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background: #2d3436;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #00cec9;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 32px;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #00cec9;
}

.cta-btn {
  padding: 10px 24px;
  background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
  color: white;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 206, 201, 0.4);
}`,
  },
  {
    name: 'Custom - Card Component',
    type: 'custom',
    description: 'Beautiful card component with image placeholder',
    html: `<div class="card-wrapper">
  <div class="product-card">
    <div class="card-image"></div>
    <div class="card-content">
      <span class="category">Technology</span>
      <h3 class="title">Amazing Product</h3>
      <p class="description">This is an amazing product with incredible features.</p>
      <div class="card-footer">
        <span class="price">$99.99</span>
        <button class="buy-btn">Buy Now</button>
      </div>
    </div>
  </div>
</div>`,
    css: `.card-wrapper {
  display: flex;
  justify-content: center;
  padding: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 280px;
}

.product-card {
  width: 280px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.card-image {
  height: 120px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.card-content {
  padding: 20px;
}

.category {
  font-size: 12px;
  color: #667eea;
  text-transform: uppercase;
  font-weight: 600;
}

.title {
  margin: 8px 0;
  font-size: 18px;
  color: #333;
}

.description {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.buy-btn {
  padding: 8px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
}`,
  },
  {
    name: 'Custom - Hero Section',
    type: 'custom',
    description: 'Modern hero section with text and CTA',
    html: `<section class="hero">
  <div class="hero-content">
    <h1>Build Amazing Things</h1>
    <p>Create beautiful web experiences with modern CSS techniques</p>
    <div class="hero-buttons">
      <button class="primary-btn">Get Started</button>
      <button class="secondary-btn">Learn More</button>
    </div>
  </div>
</section>`,
    css: `.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 40px 20px;
}

.hero-content {
  text-align: center;
  max-width: 500px;
}

.hero h1 {
  font-size: 36px;
  color: white;
  margin: 0 0 16px 0;
  background: linear-gradient(135deg, #e94560 0%, #f39c12 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero p {
  font-size: 16px;
  color: #a0a0a0;
  margin: 0 0 32px 0;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.primary-btn {
  padding: 14px 32px;
  background: linear-gradient(135deg, #e94560 0%, #f39c12 100%);
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.primary-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(233, 69, 96, 0.4);
}

.secondary-btn {
  padding: 14px 32px;
  background: transparent;
  color: white;
  border: 2px solid #e94560;
  border-radius: 30px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.secondary-btn:hover {
  background: rgba(233, 69, 96, 0.1);
}`,
  },
];

export const getPatternsByType = (type: string): PatternTemplate[] => {
  return defaultPatterns.filter((p) => p.type === type);
};

export const getDefaultPattern = (): PatternTemplate => {
  return defaultPatterns[0];
};

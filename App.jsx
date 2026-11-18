import React, { useMemo, useState } from 'react';

const categories = [
  { name: 'All places', icon: '✳' },
  { name: 'Restaurants', icon: '♨' },
  { name: 'Coffee & tea', icon: '☕' },
  { name: 'Beauty & wellness', icon: '✿' },
  { name: 'Home services', icon: '⌂' },
  { name: 'Shopping', icon: '◇' },
];

const businesses = [
  { id: 1, name: 'Mitti Café & Kitchen', category: 'Restaurants', area: 'Indiranagar, Bengaluru', rating: '4.9', reviews: 328, price: '₹₹', tag: 'Local favourite', tint: 'sage', initials: 'MC', emoji: '🥗', open: true },
  { id: 2, name: 'Sunday Coffee Roasters', category: 'Coffee & tea', area: 'Koramangala, Bengaluru', rating: '4.8', reviews: 214, price: '₹₹', tag: 'Great coffee', tint: 'peach', initials: 'SC', emoji: '☕', open: true },
  { id: 3, name: 'The Good Hair Studio', category: 'Beauty & wellness', area: 'Jubilee Hills, Hyderabad', rating: '4.9', reviews: 186, price: '₹₹₹', tag: 'Top rated', tint: 'lilac', initials: 'GH', emoji: '✂️', open: true },
  { id: 4, name: 'Namma Home Fix', category: 'Home services', area: 'HSR Layout, Bengaluru', rating: '4.7', reviews: 142, price: '₹₹', tag: 'Quick response', tint: 'blue', initials: 'NH', emoji: '🛠️', open: false },
  { id: 5, name: 'Little Loom Store', category: 'Shopping', area: 'Bandra West, Mumbai', rating: '4.8', reviews: 97, price: '₹₹', tag: 'Made nearby', tint: 'yellow', initials: 'LL', emoji: '🧵', open: true },
  { id: 6, name: 'Saffron & Stone', category: 'Restaurants', area: 'Koregaon Park, Pune', rating: '4.7', reviews: 263, price: '₹₹₹', tag: 'Worth a visit', tint: 'rose', initials: 'SS', emoji: '🍲', open: true },
];

function PinIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.3" /></svg>;
}

function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.2 4.2" /></svg>;
}

function App() {
  const [activeCategory, setActiveCategory] = useState('All places');
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('Bengaluru');
  const [saved, setSaved] = useState([]);
  const [showSaved, setShowSaved] = useState(false);

  const visibleBusinesses = useMemo(() => businesses.filter((business) => {
    const matchesCategory = activeCategory === 'All places' || business.category === activeCategory;
    const searchText = `${business.name} ${business.category} ${business.area}`.toLowerCase();
    const matchesQuery = searchText.includes(query.trim().toLowerCase());
    const matchesSaved = !showSaved || saved.includes(business.id);
    return matchesCategory && matchesQuery && matchesSaved;
  }), [activeCategory, query, saved, showSaved]);

  function toggleSaved(id) {
    setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Nearwise home"><span className="brand-mark">n</span><span>nearwise<span className="brand-period">.</span></span></a>
        <nav className="main-nav" aria-label="Main navigation"><a className="nav-active" href="#discover">Discover</a><a href="#categories">Categories</a><a href="#community">Our community</a></nav>
        <div className="top-actions"><button className="saved-link" onClick={() => setShowSaved((value) => !value)} aria-pressed={showSaved}><span>♡</span> Saved{saved.length > 0 && <b className="saved-count">{saved.length}</b>}</button><button className="add-business" onClick={() => window.alert('Business listings are coming soon!')}>List your business <span>↗</span></button><button className="menu-button" aria-label="Open menu">☰</button></div>
      </header>

      <main id="top">
        <section className="hero" id="discover">
          <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot" /> GOOD THINGS ARE CLOSER THAN YOU THINK</div><h1>Your neighbourhood,<br /><em>well discovered.</em></h1><p className="hero-description">Find the little places and local favourites that make a place feel like yours.</p>
            <div className="search-panel">
              <label className="search-field"><SearchIcon /><span className="sr-only">Search places</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try ‘best coffee’ or ‘a good barber’" /></label>
              <span className="search-divider" />
              <label className="location-field"><PinIcon /><span className="sr-only">Location</span><select value={location} onChange={(event) => setLocation(event.target.value)}><option>Bengaluru</option><option>Mumbai</option><option>Hyderabad</option><option>Pune</option><option>Delhi</option></select><span className="select-chevron">⌄</span></label>
              <button className="search-button" aria-label="Search"><SearchIcon /><span>Search</span></button>
            </div>
            <div className="popular-searches"><span>Popular:</span><button onClick={() => setQuery('coffee')}>Coffee shops</button><i>·</i><button onClick={() => setQuery('restaurants')}>Date night</button><i>·</i><button onClick={() => setQuery('wellness')}>Self-care</button></div>
          </div>
          <div className="hero-art" aria-label="Illustration of a sunny neighbourhood cafe"><div className="sun-disc" /><div className="art-label label-one"><span>✳</span> a local kind of lovely</div><div className="art-scene"><div className="scene-skyline"><div className="building building-back"><span /><span /><span /><span /></div><div className="building building-front"><div className="awning"><i /><i /><i /><i /><i /><i /></div><div className="shop-window"><span>little<br />corner</span></div><div className="door" /></div><div className="plant plant-left"><i /><i /><i /><b /></div><div className="plant plant-right"><i /><i /><i /><b /></div><div className="sidewalk" /></div></div><div className="art-label label-two">✦ &nbsp;your next favourite spot</div><div className="tiny-spark spark-one">✳</div><div className="tiny-spark spark-two">✦</div></div>
        </section>

        <section className="browse-section" id="categories"><div className="section-heading"><div><p className="section-kicker">A GOOD PLACE TO START</p><h2>What are you in the mood for?</h2></div><button className="text-link" onClick={() => { setActiveCategory('All places'); setShowSaved(false); }}>Explore all <span>↗</span></button></div>
          <div className="category-list" role="group" aria-label="Filter by category">{categories.map((category) => <button key={category.name} className={`category-chip ${activeCategory === category.name ? 'category-active' : ''}`} onClick={() => { setActiveCategory(category.name); setShowSaved(false); }}><span className="category-icon">{category.icon}</span>{category.name}</button>)}</div>
        </section>

        <section className="listings-section"><div className="listing-heading"><div><p className="section-kicker">A FEW GOOD FINDS</p><h2>{showSaved ? 'Your saved places' : 'Loved around you'} <span className="heading-spark">✳</span></h2></div><button className="sort-button" onClick={() => setActiveCategory('All places')}>Popular this week <span>⌄</span></button></div>
          {visibleBusinesses.length ? <div className="business-grid">{visibleBusinesses.map((business) => <article className="business-card" key={business.id}><div className={`card-art art-${business.tint}`}><span className="art-orbit orbit-one" /><span className="art-orbit orbit-two" /><div className="business-illustration">{business.emoji}</div><span className="listing-tag">{business.tag}</span><button className={`save-button ${saved.includes(business.id) ? 'is-saved' : ''}`} onClick={() => toggleSaved(business.id)} aria-label={`${saved.includes(business.id) ? 'Remove' : 'Save'} ${business.name}`} aria-pressed={saved.includes(business.id)}>{saved.includes(business.id) ? '♥' : '♡'}</button><span className="art-initials">{business.initials}</span></div><div className="card-content"><div className="business-title-line"><h3>{business.name}</h3><span className="rating"><span>★</span> {business.rating}</span></div><p className="business-meta">{business.category}<span>·</span>{business.price}</p><div className="business-bottom"><span className="business-area"><PinIcon />{business.area}</span><span className={`open-status ${business.open ? '' : 'closed'}`}><i />{business.open ? 'Open now' : 'Closed'}</span></div><div className="review-count">{business.reviews} neighbour reviews <span>↗</span></div></div></article>)}</div> : <div className="empty-state"><span>✳</span><h3>No places found just yet</h3><p>Try another search or browse all neighbourhood finds.</p><button onClick={() => { setQuery(''); setActiveCategory('All places'); setShowSaved(false); }}>Show all places</button></div>}
          <div className="all-listings-wrap"><button className="all-listings" onClick={() => { setActiveCategory('All places'); setShowSaved(false); setQuery(''); }}>See all local favourites <span>→</span></button></div>
        </section>

        <section className="community-banner" id="community"><div className="community-mark">n<span>.</span></div><div><p className="section-kicker">MADE BETTER TOGETHER</p><h2>Good neighbours make good neighbourhoods.</h2><p>Know a place people should know about? Help your community find its next favourite.</p></div><button onClick={() => window.alert('Business listings are coming soon!')}>Add a local business <span>↗</span></button><div className="banner-doodle">✳</div></section>
      </main>
      <footer className="footer"><a className="brand footer-brand" href="#top"><span className="brand-mark">n</span><span>nearwise<span className="brand-period">.</span></span></a><span>Closer places. Better days.</span><span>Made for the love of local <b>♥</b></span></footer>
    </div>
  );
}

export default App;

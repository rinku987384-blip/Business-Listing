import BusinessCard from './BusinessCard.jsx';

const DashboardIcon = ({ name }) => {
  const shapes = {
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    store: <><path d="M3 10h18l-2-6H5l-2 6Z"/><path d="M5 10v10h14V10M9 20v-6h6v6"/><path d="M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/></>,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>,
    arrow: <><path d="M4 16 9 11l4 3 7-8"/><path d="M14 6h6v6"/></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.2 4.2"/></>,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15m6-12v15"/><path d="M12 8c0 2-2.5 4.5-2.5 4.5S7 10 7 8a2.5 2.5 0 1 1 5 0Z"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></>,
  };
  return <svg className="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{shapes[name]}</svg>;
};

export default function DashboardOverview({ businesses, user, saved, search, setSearch, navigate, setDetailId, onToggleSaved }) {
  const ownedBusinesses = businesses.filter((business) => business.owner === user?.name);
  const savedBusinesses = businesses.filter((business) => saved.includes(business.id));
  const pendingCount = ownedBusinesses.filter((business) => business.status === 'Pending').length;
  const approvedCount = ownedBusinesses.filter((business) => business.status === 'Approved').length;
  const categoryCounts = businesses.reduce((counts, business) => {
    counts[business.category] = (counts[business.category] || 0) + 1;
    return counts;
  }, {});
  const categoryOverview = Object.entries(categoryCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 4);
  const largestCategoryCount = categoryOverview[0]?.[1] || 1;
  const metrics = [
    { label: 'Saved places', value: saved.length, detail: 'Places you want to revisit', icon: 'pin', tone: 'blue' },
    { label: 'Your listings', value: ownedBusinesses.length, detail: 'Businesses you have added', icon: 'store', tone: 'green' },
    { label: 'Pending reviews', value: pendingCount, detail: 'We will review these shortly', icon: 'star', tone: 'violet' },
    { label: 'Total listings', value: businesses.length, detail: 'Businesses in your directory', icon: 'arrow', tone: 'orange' },
  ];
  const quickActions = [
    { label: 'Add listing', description: 'Share a local business', action: () => navigate('/add-business') },
    { label: 'Browse places', description: 'Explore all nearby finds', action: () => navigate('/businesses') },
    { label: 'View profile', description: 'Update your details', action: () => navigate('/profile') },
  ];

  return <section className="content-section page-section dashboard-page">
    <section className="dashboard-hero">
      <div className="dashboard-hero-copy">
        <span className="section-label">BUSINESS OVERVIEW</span>
        <h1>Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}.</h1>
        <p>Keep your favourite places close and track how your listings are doing.</p>
        <div className="dashboard-hero-actions">
          <button type="button" className="primary-button dashboard-primary" onClick={() => navigate('/add-business')}>Add a business <span>→</span></button>
          <button type="button" className="outline-button dashboard-secondary" onClick={() => navigate('/businesses')}>Browse directory</button>
        </div>
        <form className="dashboard-search" onSubmit={(event) => { event.preventDefault(); navigate('/businesses'); }}>
          <DashboardIcon name="search"/>
          <input aria-label="Search businesses" placeholder="Search businesses, categories, or locations..." value={search} onChange={(event) => setSearch(event.target.value)}/>
          <button type="submit">Explore <span aria-hidden="true">→</span></button>
        </form>
      </div>
      <div className="dashboard-neighborhood" aria-hidden="true">
        <span className="scene-cloud cloud-one"/><span className="scene-cloud cloud-two"/>
        <div className="scene-hills"/><div className="scene-buildings"><i/><i/><i/><i/><i/></div>
        <div className="scene-shop"><span/><i/><b/><em/></div>
        <span className="scene-pin"><DashboardIcon name="pin"/></span>
        <span className="scene-tree tree-one"/><span className="scene-tree tree-two"/>
      </div>
    </section>

    <div className="dashboard-metrics">
      {metrics.map((metric) => <article className={`dashboard-metric metric-${metric.tone}`} key={metric.label}>
        <span className="metric-icon"><DashboardIcon name={metric.icon}/></span>
        <div className="metric-copy"><b>{metric.label}</b><small>{metric.detail}</small></div>
        <strong>{metric.value.toString().padStart(2, '0')}</strong>
        <span className="metric-arrow" aria-hidden="true">→</span>
      </article>)}
    </div>

    {!user && <div className="notice-bar"><span>✳</span> You are exploring as a guest. <button type="button" onClick={() => navigate('/login')}>Sign in</button> to keep your account details together.</div>}

    <div className="dashboard-quick-actions">
      {quickActions.map((action, index) => <button type="button" className="quick-action-card" key={action.label} onClick={action.action}><span className={`quick-action-icon quick-action-icon-${index}`} aria-hidden="true">{index === 0 ? '+' : index === 1 ? '⌕' : '↗'}</span><span className="quick-action-copy"><b>{action.label}</b><small>{action.description}</small></span><span className="quick-action-arrow" aria-hidden="true">→</span></button>)}
    </div>

    <div className="dashboard-insights">
      <section className="dashboard-section category-insights">
        <div className="section-title-row dashboard-title"><div><span className="section-label">DIRECTORY MIX</span><h2>Popular categories</h2></div><span className="insight-total"><DashboardIcon name="globe"/>{businesses.length} total</span></div>
        {categoryOverview.length ? <div className="category-bars">{categoryOverview.map(([name, count], index) => <div className="category-bar-row" key={name}><div className="category-bar-label"><span>{name}</span><b>{count}</b></div><div className="category-bar-track"><span className={`category-bar-fill category-fill-${index}`} style={{ width: `${Math.max(8, (count / largestCategoryCount) * 100)}%` }}/></div></div>)}</div> : <p className="insight-empty">Listings will appear here as the directory grows.</p>}
      </section>
      <section className="dashboard-section listing-health">
        <div className="section-title-row dashboard-title"><div><span className="section-label">YOUR ACCOUNT</span><h2>Listing status</h2></div><button className="subtle-link" onClick={() => navigate('/add-business')}>Add new <span>＋</span></button></div>
        <div className="health-stat"><span className="health-icon health-approved"><DashboardIcon name="check"/></span><span><b>Live listings</b><small>Visible in the directory</small></span><strong>{approvedCount.toString().padStart(2, '0')}</strong></div>
        <div className="health-stat"><span className="health-icon health-pending"><DashboardIcon name="clock"/></span><span><b>Under review</b><small>Usually reviewed shortly</small></span><strong>{pendingCount.toString().padStart(2, '0')}</strong></div>
        {!user && <button type="button" className="health-signin" onClick={() => navigate('/login')}>Sign in to manage your listings <span>→</span></button>}
      </section>
    </div>

    <section className="dashboard-section saved-section">
      <div className="section-title-row dashboard-title"><div><span className="section-label">KEEP CLOSE</span><h2>Your saved places</h2></div><button className="subtle-link" onClick={() => navigate('/businesses')}>Explore more <span>→</span></button></div>
      {savedBusinesses.length ? <div className="directory-grid">{savedBusinesses.map((business) => <BusinessCard key={business.id} business={business} isSaved onToggleSaved={onToggleSaved} onView={(item) => { setDetailId(item.id); navigate(`/business/${item.id}`); }}/>)}</div> : <div className="dashboard-empty"><div className="empty-map"><DashboardIcon name="map"/></div><div><h3>No businesses saved yet</h3><p>Explore the directory and save a place to find it here.</p></div><button className="empty-action" onClick={() => navigate('/businesses')}>Browse businesses <span>→</span></button></div>}
    </section>

    <section className="dashboard-section listings-section">
      <div className="section-title-row dashboard-title"><div><span className="section-label">YOUR CONTRIBUTION</span><h2>Your business listings</h2></div><button className="subtle-link" onClick={() => navigate('/add-business')}>Add a listing <span>＋</span></button></div>
      <div className="table-wrap"><table><thead><tr><th>BUSINESS</th><th>CATEGORY</th><th>LOCATION</th><th>STATUS</th></tr></thead><tbody>
        {ownedBusinesses.map((business) => <tr key={business.id}><td><span className="dashboard-business-emoji">{business.emoji}</span>{business.name}</td><td>{business.category}</td><td>{business.area}</td><td><span className={`status-badge ${business.status.toLowerCase()}`}>{business.status}</span></td></tr>)}
        {!ownedBusinesses.length && <tr><td colSpan="4" className="table-empty">Your business listings will appear here.</td></tr>}
      </tbody></table></div>
    </section>
  </section>;
}

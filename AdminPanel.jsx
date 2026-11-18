import React, { useState } from 'react';

const adminTabs = ['Dashboard', 'Users', 'Businesses', 'Categories'];
const demoUsers = [
  { name: 'Aman Verma', email: 'aman@example.com', role: 'Business owner' },
  { name: 'Neha Kapoor', email: 'neha@example.com', role: 'Business owner' },
  { name: 'Aarav Mehta', email: 'aarav@example.com', role: 'Customer' },
];

export default function AdminPanel({ businesses, setBusinesses, navigate, showToast }) {
  const [section, setSection] = useState('Dashboard');
  const pending = businesses.filter((business) => business.status === 'Pending');
  const approved = businesses.filter((business) => business.status === 'Approved');
  const users = [...new Map(businesses.map((business) => [business.owner, { name: business.owner, email: `${(business.owner || 'user').toLowerCase().replaceAll(' ', '.')}@example.com`, role: 'Business owner' }])).values()];
  const categories = [...new Set(businesses.map((business) => business.category))];

  const approve = (id) => {
    setBusinesses((items) => items.map((business) => business.id === id ? { ...business, status: 'Approved' } : business));
    showToast('Business approved and published.');
  };
  const reject = (id) => {
    setBusinesses((items) => items.filter((business) => business.id !== id));
    showToast('Business listing rejected.');
  };
  const visitBusiness = (id) => navigate(`/business/${id}`);

  return <section className="content-section page-section admin-workspace">
    <div className="page-heading"><div><span className="section-label">ADMINISTRATION</span><h1>Admin Panel</h1><p>Manage businesses, users, and your local directory.</p></div><span className="admin-status"><i/> Admin workspace</span></div>
    <nav className="admin-tabs" aria-label="Admin sections">{adminTabs.map((tab) => <button key={tab} className={section === tab ? 'admin-tab-active' : ''} onClick={() => setSection(tab)}>{tab}</button>)}<button className={section === 'Pending Businesses' ? 'admin-tab-active' : ''} onClick={() => setSection('Pending Businesses')}>Pending Businesses <b>{pending.length}</b></button></nav>
    {section === 'Dashboard' && <>
      <div className="admin-metric-grid"><article><span>Total Businesses</span><b>{Math.max(100, businesses.length)}</b><small>All directory listings</small></article><article><span>Pending Businesses</span><b>{Math.max(15, pending.length)}</b><small>Waiting for review</small></article><article><span>Approved Businesses</span><b>{Math.max(80, approved.length)}</b><small>Published in directory</small></article><article><span>Users</span><b>{Math.max(150, users.length)}</b><small>Registered members</small></article></div>
      <div className="admin-section-heading"><div><span className="section-label">NEEDS YOUR ATTENTION</span><h2>Pending Businesses</h2></div><button className="subtle-link" onClick={() => setSection('Pending Businesses')}>View all →</button></div>
      <PendingList businesses={pending} onView={visitBusiness} onApprove={approve} onReject={reject}/>
    </>}
    {section === 'Pending Businesses' && <><div className="admin-section-heading"><div><span className="section-label">LISTING MODERATION</span><h2>Pending Businesses <span className="pending-count">{pending.length} to review</span></h2></div></div><PendingList businesses={pending} onView={visitBusiness} onApprove={approve} onReject={reject}/></>}
    {section === 'Businesses' && <><div className="admin-section-heading"><div><span className="section-label">DIRECTORY</span><h2>Businesses</h2></div></div><div className="table-wrap"><table><thead><tr><th>BUSINESS</th><th>CATEGORY</th><th>LOCATION</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>{businesses.map((business) => <tr key={business.id}><td>{business.emoji} &nbsp;{business.name}</td><td>{business.category}</td><td>{business.area}</td><td><span className={`status-badge ${business.status.toLowerCase()}`}>{business.status}</span></td><td><button className="view-link" onClick={() => visitBusiness(business.id)}>View →</button></td></tr>)}</tbody></table></div></>}
    {section === 'Users' && <><div className="admin-section-heading"><div><span className="section-label">COMMUNITY</span><h2>Users</h2></div></div><div className="table-wrap"><table><thead><tr><th>NAME</th><th>EMAIL</th><th>ROLE</th></tr></thead><tbody>{[...demoUsers, ...users].filter((user, index, array) => array.findIndex((item) => item.name === user.name) === index).map((user) => <tr key={user.email}><td>{user.name}</td><td>{user.email}</td><td>{user.role}</td></tr>)}</tbody></table></div></>}
    {section === 'Categories' && <><div className="admin-section-heading"><div><span className="section-label">DIRECTORY ORGANIZATION</span><h2>Categories</h2></div></div><div className="admin-category-grid">{categories.map((category) => <article key={category}><span>✳</span><b>{category}</b><small>{businesses.filter((business) => business.category === category).length} businesses</small></article>)}</div></>}
  </section>;
}

function PendingList({ businesses, onView, onApprove, onReject }) {
  if (!businesses.length) return <div className="empty-panel"><span>✓</span><h3>No pending businesses</h3><p>New submissions will appear here for review.</p></div>;
  return <div className="pending-list">{businesses.map((business) => <article className="pending-business-card" key={business.id}><div className={`pending-business-icon art-${business.tint || 'sage'}`}>{business.emoji}</div><div className="pending-business-info"><h3>{business.name}</h3><p>{business.area.split(',').at(-1)?.trim() || business.area} <span>·</span> {business.category}</p></div><div className="pending-business-actions"><button className="outline-button" onClick={() => onView(business.id)}>View</button><button className="approve-button" onClick={() => onApprove(business.id)}>Approve</button><button className="reject-button" onClick={() => onReject(business.id)}>Reject</button></div></article>)}</div>;
}

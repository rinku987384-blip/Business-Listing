import React from 'react';

export default function ProfilePage({ user, onSave, onLogout }) {
  return <section className="content-section page-section"><div className="form-page-heading"><span className="section-label">ACCOUNT SETTINGS</span><h1>Profile</h1><p>Manage your account details and session.</p></div><form className="business-form profile-form" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); onSave({ name: data.get('name'), email: data.get('email') }); }}><label>Name<input name="name" required defaultValue={user?.name || ''} placeholder="Your name"/></label><label>Email<input name="email" type="email" required defaultValue={user?.email || ''} placeholder="you@example.com"/></label><div className="profile-actions"><button className="primary-button" type="submit">Save Profile</button><button className="outline-button" type="button" onClick={onLogout}>Logout</button></div></form></section>;
}

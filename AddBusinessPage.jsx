import React, { useRef, useState } from 'react';

const categories = ['Restaurant', 'Hotel', 'Hospital', 'Salon', 'IT Company', 'School', 'Gym', 'Lawyer', 'Other'];

export default function AddBusinessPage({ user, onSubmit, onBack }) {
  const formRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  function readForm() {
    const data = new FormData(formRef.current);
    return Object.fromEntries(data.entries());
  }

  function openPreview() {
    if (!formRef.current.reportValidity()) return;
    setPreview(readForm());
    setShowPreview(true);
  }

  function submit(event) {
    event.preventDefault();
    const values = readForm();
    onSubmit({
      id: Date.now(), name: values.name, category: values.category,
      area: [values.city, values.state].filter(Boolean).join(', '), locationLabel: [values.city, values.state, values.country].filter(Boolean).join(', '),
      address: values.address, pincode: values.pincode, rating: 0, reviews: 0, price: '₹₹', tag: 'New listing', tint: 'sage', emoji: '✳', open: true,
      description: values.description, phone: values.phone, email: values.email, website: values.website || 'XXXXX', owner: user?.name || values.ownerName || 'Neighbour', status: 'Pending',
    });
  }

  return <section className="content-section page-section">
    <button className="back-link" onClick={onBack}>← Back to dashboard</button>
    <div className="form-page-heading"><span className="section-label">BUSINESS OWNER WORKSPACE</span><h1>Add Business</h1><p>Share your business with the local community. New listings are reviewed before publishing.</p></div>
    <form className="business-form owner-business-form" ref={formRef} onSubmit={submit}>
      <div className="form-section-title"><span>01</span><div><h2>Business information</h2><p>Tell customers what makes your business special.</p></div></div>
      <div className="form-grid">
        <label className="span-two">Business Name<input name="name" required placeholder="e.g. ABC Restaurant"/></label>
        <label>Category<select name="category" required defaultValue=""><option value="" disabled>Select a category</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Phone<input name="phone" type="tel" required placeholder="Business phone"/></label>
        <label>Email<input name="email" type="email" required placeholder="business@example.com"/></label>
        <label>Website<input name="website" type="url" placeholder="https://example.com"/></label>
        <label className="span-two">Description<textarea name="description" rows="4" required placeholder="Describe your business and services..."/></label>
      </div>
      <div className="form-section-title form-second-title"><span>02</span><div><h2>Business location</h2><p>Help nearby customers find you.</p></div></div>
      <div className="form-grid">
        <label>Country<input name="country" required defaultValue="India" placeholder="Country"/></label>
        <label>State<input name="state" required placeholder="State"/></label>
        <label>City<input name="city" required placeholder="City"/></label>
        <label>Pincode<input name="pincode" required inputMode="numeric" pattern="[0-9]{6}" placeholder="6-digit pincode"/></label>
        <label className="span-two">Address<input name="address" required placeholder="Street, building, locality"/></label>
        {!user && <label className="span-two">Your Name<input name="ownerName" required placeholder="Business owner name"/></label>}
      </div>
      <div className="form-submit-row"><span>✳ &nbsp;Your listing will be marked Pending until it is approved.</span><div className="form-actions"><button className="outline-button" type="button" onClick={openPreview}>Preview</button><button className="primary-button" type="submit">Submit Business <span>→</span></button></div></div>
    </form>
    {showPreview && preview && <div className="preview-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowPreview(false); }}><section className="preview-modal" role="dialog" aria-modal="true" aria-labelledby="preview-title"><button className="preview-close" onClick={() => setShowPreview(false)} aria-label="Close preview">×</button><span className="section-label">LISTING PREVIEW</span><h2 id="preview-title">{preview.name}</h2><p className="preview-category">{preview.category}</p><p>{preview.description}</p><div className="preview-data"><span>☎ {preview.phone}</span><span>✉ {preview.email}</span><span>⌖ {[preview.address, preview.city, preview.state, preview.pincode].filter(Boolean).join(', ')}</span></div><div className="form-actions"><button className="outline-button" onClick={() => setShowPreview(false)}>Edit details</button><button className="primary-button" onClick={() => formRef.current.requestSubmit()}>Submit Business →</button></div></section></div>}
  </section>;
}

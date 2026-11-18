import React from 'react';

function PinIcon() {
  return <svg className="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.3"/></svg>;
}

function ArrowIcon() {
  return <svg className="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>;
}

export default function BusinessCard({ business, isSaved = false, onToggleSaved, onView }) {
  const rating = Number.isInteger(business.rating) ? `${business.rating}.0` : business.rating;
  const city = business.area.split(',')[1]?.trim() || business.area;

  return (
    <article className="directory-card">
      <div className={`directory-card-art art-${business.tint || 'sage'}`}>
        <span className="business-emoji">{business.emoji}</span>
        <span className="card-category">{business.category}</span>
        <button className={`card-save ${isSaved ? 'saved' : ''}`} aria-label={`${isSaved ? 'Unsave' : 'Save'} ${business.name}`} aria-pressed={isSaved} onClick={() => onToggleSaved(business.id)}>{isSaved ? '♥' : '♡'}</button>
      </div>
      <div className="directory-card-body">
        <div className="card-title-row"><h3>{business.name}</h3><span className="card-rating" aria-label={`${rating} out of 5`}>★ {rating}</span></div>
        <p className="card-location"><PinIcon/>{city}</p>
        <div className="card-bottom"><span className="card-tag">{business.tag}</span><button className="view-link" onClick={() => onView(business)} aria-label={`View ${business.name}`}><span>View Business</span><ArrowIcon/></button></div>
      </div>
    </article>
  );
}

import React from 'react';
import '../styles/Loader.css';

export default function Loader() {
  return (
    <div className="loader-container" role="status" aria-live="polite">
      <div className="spinner" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

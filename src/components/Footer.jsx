import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="cly-footer">
      <div className="cly-footer-container cly-footer-flex">
        <div className="cly-footer-logo">
          <Link to="/">
            <img src="/images/logo/clarity.svg" alt="clarity Logo" loading="lazy" />
          </Link>
        </div>
        <div className="cly-footer-socials">
          <a href="https://www.linkedin.com/company/clarity" className="cly-social-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
      <p className="cly-footer-text">&copy; <span id="current-year"></span> clarity. All rights reserved.</p>
    </footer>
  )
}

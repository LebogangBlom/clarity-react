import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function Header(){
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onKey(e){
      if(e.key === 'Escape' && open){
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // body scroll lock when mobile panel is open
  useEffect(()=>{
    if(open){
      document.body.classList.add('cly-scroll-lock')
    } else {
      document.body.classList.remove('cly-scroll-lock')
    }
    return ()=>document.body.classList.remove('cly-scroll-lock')
  },[open])

  // simple focus trap inside the mobile panel
  const firstLinkRef = useRef(null)
  const lastLinkRef = useRef(null)
  useEffect(()=>{
    function handleTab(e){
      if(!open) return
      if(e.key !== 'Tab') return
      const first = firstLinkRef.current
      const last = lastLinkRef.current
      if(!first || !last) return
      if(e.shiftKey && document.activeElement === first){
        e.preventDefault()
        last.focus()
      } else if(!e.shiftKey && document.activeElement === last){
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleTab)
    return ()=>document.removeEventListener('keydown', handleTab)
  },[open])

  function handleLinkClick(){
    // close the mobile nav when a link is clicked
    setOpen(false)
  }

  return (
    <header className="cly-header">
      <div className="cly-logo">
        <Link to="/">
          <img src="/images/logo/clarity.svg" alt="clarity logo" />
        </Link>
      </div>

      {/* Hamburger button for small screens */}
      <button
        className={"cly-hamburger" + (open ? ' active' : '')}
        aria-label="Toggle navigation"
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen(v => !v)}
      >
        <span className="cly-bar" />
        <span className="cly-bar" />
        <span className="cly-bar" />
      </button>

      {/* Backdrop for the sliding panel */}
      <div
        className={"cly-backdrop" + (open ? ' active' : '')}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      <nav className="cly-nav" aria-label="Main navigation">
        {/* Mobile sliding panel */}
        <div className={"cly-mobile-panel" + (open ? ' open' : '')} role="dialog" aria-modal="true" aria-hidden={!open}>
          <ul id="primary-navigation" className={"cly-nav-list"}>
            <li><Link ref={firstLinkRef} to="/" className="cly-nav-link cly-tap-target" onClick={handleLinkClick}>HOME</Link></li>
            <li><Link to="/services" className="cly-nav-link cly-tap-target" onClick={handleLinkClick}>SERVICES</Link></li>
            <li><Link to="/about" className="cly-nav-link cly-tap-target" onClick={handleLinkClick}>ABOUT US</Link></li>
            <li><Link ref={lastLinkRef} to="/contact" className="cly-nav-link cly-tap-target" onClick={handleLinkClick}>CONTACT</Link></li>
          </ul>
        </div>

        {/* Desktop nav (visible on larger screens) */}
        <ul className="cly-nav-list cly-desktop-nav">
          {/* Add onClick handler for consistency across all links */}
          <li><Link to="/" className="cly-nav-link" onClick={handleLinkClick}>HOME</Link></li>
          <li><Link to="/services" className="cly-nav-link" onClick={handleLinkClick}>SERVICES</Link></li>
          <li><Link to="/about" className="cly-nav-link" onClick={handleLinkClick}>ABOUT US</Link></li>
          <li><Link to="/contact" className="cly-nav-link" onClick={handleLinkClick}>CONTACT</Link></li>
        </ul>
      </nav>
    </header>
  )
}

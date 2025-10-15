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
            <li><Link ref={firstLinkRef} to="/" className="cly-nav-link cly-tap-target" onClick={() => setOpen(false)}>HOME</Link></li>
            <li><Link to="/services" className="cly-nav-link cly-tap-target" onClick={() => setOpen(false)}>SERVICES</Link></li>
            <li><Link to="/about" className="cly-nav-link cly-tap-target" onClick={() => setOpen(false)}>ABOUT US</Link></li>
            <li><Link to="/contact" className="cly-nav-link cly-tap-target" onClick={() => setOpen(false)}>CONTACT</Link></li>
            <li><Link to="/client-login" className="cly-nav-link cly-tap-target" onClick={() => setOpen(false)}>CLIENT</Link></li>
            <li><Link ref={lastLinkRef} to="/admin-login" className="cly-nav-link cly-tap-target" onClick={() => setOpen(false)}>ADMIN</Link></li>
          </ul>
        </div>

        {/* Desktop nav (visible on larger screens) */}
        <ul className="cly-nav-list cly-desktop-nav">
          <li><Link to="/" className="cly-nav-link">HOME</Link></li>
          <li><Link to="/services" className="cly-nav-link">SERVICES</Link></li>
          <li><Link to="/about" className="cly-nav-link">ABOUT US</Link></li>
          <li><Link to="/contact" className="cly-nav-link">CONTACT</Link></li>
          <li><Link to="/client-login" className="cly-nav-link">CLIENT</Link></li>
          <li><Link to="/admin-login" className="cly-nav-link">ADMIN</Link></li>
        </ul>
      </nav>
    </header>
  )
}

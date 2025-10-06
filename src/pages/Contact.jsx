import React, { useRef, useState } from 'react'
import { useEffect } from 'react'

export default function Contact(){
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'
  const formRef = useRef(null)
  const iframeName = 'form-submit-frame'
  const [invalidNames, setInvalidNames] = useState([])
  const closeBtnRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    if (invalidNames.length > 0) {
      // focus the close button when modal opens
      setTimeout(() => closeBtnRef.current && closeBtnRef.current.focus(), 0)
      // add key handler for Escape and simple focus trap
      const onKey = (ev) => {
        if (ev.key === 'Escape') {
          setInvalidNames([])
        }
        if (ev.key === 'Tab') {
          // very simple focus trap: keep focus on close button and ok button
          const focusables = modalRef.current ? Array.from(modalRef.current.querySelectorAll('button, [href], input, select, textarea')) : []
          if (focusables.length === 0) return
          const first = focusables[0]
          const last = focusables[focusables.length - 1]
          if (ev.shiftKey && document.activeElement === first) {
            ev.preventDefault(); last.focus();
          } else if (!ev.shiftKey && document.activeElement === last) {
            ev.preventDefault(); first.focus();
          }
        }
      }
      document.addEventListener('keydown', onKey)
      return () => document.removeEventListener('keydown', onKey)
    }
  }, [invalidNames])

  async function handleSubmit(e){
    e.preventDefault()
    const form = e.target

    // Client-side validation: collect required fields that are invalid
    const requiredEls = Array.from(form.querySelectorAll('[required]'))
    const invalidEls = requiredEls.filter(el => !el.checkValidity())
    if (invalidEls.length > 0) {
      // Build a friendly list of field names for the modal
      const names = invalidEls.map(el => {
        const lab = form.querySelector(`label[for="${el.id}"]`)
        if (lab) return lab.textContent.replace('*', '').trim()
        return el.name || el.id || 'field'
      })
      const unique = [...new Set(names)]
      setInvalidNames(unique)
      // Let browser show native validation UI for the first invalid element
      invalidEls[0].reportValidity()
      // focus will be handled when modal opens
      return
    }

    setStatus('sending')
    const formData = new FormData(form)

    // If honeypot filled, bail out silently
    if (formData.get('bot-field')) {
      setStatus('success')
      return
    }

    // Optional: try JSON POST to a Netlify Function endpoint if provided
    const fetchEndpoint = form.dataset.fetchEndpoint || ''
    try {
      if (fetchEndpoint) {
        const body = Object.fromEntries(formData.entries())
        const res = await fetch(fetchEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (res.ok) {
          setStatus('success')
          window.location.href = form.action
          return
        }
      }
    } catch (err) {
      // ignore and fall back to iframe submission so Netlify captures the POST
    }

    // Ensure Netlify captures the submission: submit the form into an invisible iframe, then redirect the top window
    let iframe = document.querySelector(`iframe[name="${iframeName}"]`)
    if (!iframe) {
      iframe = document.createElement('iframe')
      iframe.name = iframeName
      iframe.style.display = 'none'
      document.body.appendChild(iframe)
    }

    const previousTarget = form.target
    form.target = iframeName
    form.submit()
    form.target = previousTarget
    // Redirect the top-level window to the thank-you page so the user sees confirmation
    window.location.href = form.action
  }

  return (
    <section className="cly-contact-section container">
      {invalidNames.length > 0 && (
        <div className="validation-modal-backdrop" role="dialog" aria-modal="true">
          <div className={`validation-modal show`} ref={modalRef}>
            <div className="modal-top">
              <h3>Please complete the following fields</h3>
              <button className="close-icon" aria-label="Close" onClick={() => setInvalidNames([])}>×</button>
            </div>
            <ul>
              {invalidNames.map((n,i) => <li key={i}>{n}</li>)}
            </ul>
            <div style={{textAlign:'right'}}>
              <button
                ref={closeBtnRef}
                className="ok-btn"
                onClick={() => {
                  // focus the first invalid input in the form
                  const form = formRef.current || document.getElementById('contactForm')
                  if (form && form.querySelector) {
                    const firstInvalid = form.querySelector('[required]:invalid')
                    if (firstInvalid) firstInvalid.focus()
                  }
                  setInvalidNames([])
                }}
              >OK</button>
            </div>
          </div>
        </div>
      )}

      <div className="cly-contact-info">
        <h2>Contact Information</h2>
        <p>Feel free to reach out to us with any questions or inquiries. We are here to help!</p>
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          action="/thank-you"
          className="cly-contact-form"
          id="contactForm"
          noValidate
          onSubmit={handleSubmit}
          ref={formRef}
          data-fetch-endpoint="/api/contact"
        >
          {/* required hidden input for Netlify to pick up the form name */}
          <input type="hidden" name="form-name" value="contact" />
          {/* visually-hidden honeypot for bots (label + input). Screen readers will ignore because of .sr-only */}
          <p className="hidden-field" aria-hidden="true">
            <label className="sr-only" htmlFor="bot-field">Do not fill this field</label>
            <input id="bot-field" name="bot-field" />
          </p>
          <div className="cly-form-group">
            <label htmlFor="name">Name <span aria-hidden="true" style={{color:'#525252'}}>*</span></label>
            <input type="text" id="name" name="name" required minLength={2} maxLength={50} />
          </div>
          <div className="cly-form-group">
            <label htmlFor="email">Email <span aria-hidden="true" style={{color:'#525252'}}>*</span></label>
            <input type="email" id="email" name="email" required maxLength={100} />
          </div>
          <div className="cly-form-group">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" name="phone" maxLength={15} />
          </div>
          <div className="cly-form-group">
            <label htmlFor="subject">Subject <span aria-hidden="true" style={{color:'#525252'}}>*</span></label>
            <select id="subject" name="subject" required className="cly-form-select">
              <option value="">Select a subject</option>
              <option value="general">General Inquiry</option>
              <option value="services">Services</option>
              <option value="support">Support</option>
              <option value="feedback">Feedback</option>
            </select>
          </div>
          <div className="cly-form-group">
            <label htmlFor="message">Message <span aria-hidden="true" style={{color:'#525252'}}>*</span></label>
            <textarea id="message" name="message" rows={5} required minLength={10} maxLength={1000}></textarea>
          </div>
          {/* Netlify reCAPTCHA widget (Netlify will detect this and require site verification) */}
          <div data-netlify-recaptcha="true"></div>

          <button type="submit" className="cly-form-btn" disabled={status==='sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
          {status === 'success' && <p className="cly-form-success">Thanks — your message was sent.</p>}
          {status === 'error' && <p className="cly-form-error">Sorry, there was a problem. Please try again.</p>}
        </form>
      </div>
    </section>
  )
}

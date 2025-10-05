import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import ThankYou from './pages/ThankYou'
import Header from './components/Header'
import Footer from './components/Footer'
import UseYearEffect from './components/UseYearEffect'

export default function App(){
  return (
    <div className="app-root">
  <Header />
  <UseYearEffect />
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/services" element={<Services/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/thank-you" element={<ThankYou/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

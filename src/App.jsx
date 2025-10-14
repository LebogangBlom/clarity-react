import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import ThankYou from './pages/ThankYou';
import Header from './components/Header';
import Footer from './components/Footer';
import UseYearEffect from './components/UseYearEffect';

const ClientLogin = lazy(() => import('./pages/ClientLogin'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ClientDashboard = lazy(() => import('./pages/ClientDashboard'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

const App = () => (
    <div className="app-root">
        <Header />
        <UseYearEffect />
        <main>
            <Suspense fallback={<div className='suspense-loading'>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/thank-you" element={<ThankYou />} />
                    <Route path="/client-login" element={<ClientLogin />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/client-dashboard" element={<ClientDashboard />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                </Routes>
            </Suspense>
        </main>
        <Footer />
    </div>
);

export default App;

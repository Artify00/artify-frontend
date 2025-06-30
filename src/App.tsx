import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Dashboard } from './pages/Dashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { TransferVerification } from './pages/TransferVerification';
import { QRCodeGenerator } from './pages/QRCodeGenerator';
import { QRRegistration } from './pages/QRRegistration';
import { ArtworkPublicView } from './pages/ArtworkPublicView';
import { OwnershipConfirmation } from './pages/OwnershipConfirmation';
import { NotFound } from './pages/NotFound';
import { PreviewRedirect } from './components/PreviewRedirect';
import { ServiceDetail } from './pages/ServiceDetail';
export function App() {
  return <BrowserRouter>
      <div className="w-full min-h-screen flex flex-col">
        <Routes>
          {/* Restore original home route */}
          <Route path="/" element={<>
                <Header />
                <main>
                  <Hero />
                  <Features />
                  <Testimonials />
                </main>
                <Footer />
              </>} />
          {/* Temporarily commented out redirect */}
          {/* <Route path="/" element={<PreviewRedirect />} /> */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/verify-transfer" element={<TransferVerification />} />
          <Route path="/ownership-confirmation" element={<OwnershipConfirmation />} />
          <Route path="/qr-generator" element={<QRCodeGenerator />} />
          <Route path="/register-artwork" element={<QRRegistration />} />
          <Route path="/verify-artwork" element={<ArtworkPublicView />} />
          <Route path="/scan" element={<ArtworkPublicView />} />
          <Route path="/services" element={<ServiceDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>;
}
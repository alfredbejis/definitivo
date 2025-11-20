import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import Services from './components/Services';
import Process from './components/Process';
import ContactForm from './components/ContactForm';
import About from './components/About';
import Footer from './components/Footer';
import { CookiePolicy, PrivacyPolicy, LegalNotice, TermsOfUse } from './components/Legal';

type ViewState = 'home' | 'cookies' | 'privacy' | 'legal' | 'terms';

function App() {
  const [view, setView] = useState<ViewState>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Intelligent Navigation Handler
  const handleNavigation = (targetView: ViewState, hash?: string) => {
    if (targetView !== view) {
      // If changing main view (e.g. from Legal to Home)
      setView(targetView);
      
      // Wait for the render cycle to complete before trying to scroll
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo(0, 0);
      }
    } else {
      // If staying on the same view (e.g. Home -> Home anchor)
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo(0, 0);
      }
    }
  };

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  return (
    <div className="bg-dark-900 min-h-screen text-white selection:bg-neon-green selection:text-black relative overflow-x-hidden">
      {/* Global Noise Overlay for Texture */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[100] bg-noise mix-blend-overlay"></div>
      
      <Navbar onNavigate={handleNavigation} />
      
      <main>
        {view === 'home' ? (
          <>
            {/* HERO SECTION */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-12 md:pt-20 md:pb-0">
              <Hero3D />
              
              <div className="w-full max-w-[1400px] mx-auto relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex flex-col items-center"
                >
                  <div className="inline-block px-4 py-1 rounded-full border border-neon-green/30 bg-neon-green/5 text-neon-green text-[10px] md:text-xs font-bold tracking-widest mb-6 md:mb-8 backdrop-blur-md">
                    AUDITORÍA 100% GRATUITA
                  </div>
                  
                  <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-display font-bold leading-[1.1] md:leading-[0.9] mb-6 md:mb-8 tracking-tight break-words w-full">
                    TU ENERGÍA, <br />
                    <span className="shimmer-text bg-gradient-to-r from-white via-gray-400 to-white bg-[length:200%_auto] animate-text-shimmer text-transparent bg-clip-text block md:inline my-2 md:my-0 whitespace-nowrap text-[6.5vw] sm:text-5xl md:text-inherit leading-tight">
                      INTELIGENTEMENTE
                    </span> <br className="hidden md:block" />
                    GESTIONADA
                  </h1>
                  
                  <p className="text-base md:text-xl text-gray-400 max-w-xs md:max-w-4xl mx-auto mb-10 md:mb-12 leading-relaxed">
                    Analizamos tus facturas, ajustamos potencias y negociamos precios con más de 50 comercializadoras. Sin costes, sin compromiso.
                  </p>
                  
                  <motion.button 
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 md:px-12 md:py-5 bg-white text-black font-bold rounded-full hover:bg-neon-green transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(204,255,0,0.4)] cursor-pointer z-20 text-base md:text-lg tracking-wide"
                  >
                    Empezar Gratis
                  </motion.button>
                </motion.div>
              </div>
            </section>

            {/* AMBIENT CONTENT WRAPPER */}
            <div className="relative overflow-hidden">
              {/* Dynamic Ambient Lighting Background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                 {/* Neon Green Blob */}
                 <div className="absolute top-[5%] left-[-20%] md:left-[10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-neon-green/10 rounded-full blur-[80px] md:blur-[120px] animate-blob opacity-30 md:opacity-50"></div>
                 {/* Neon Purple Blob */}
                 <div className="absolute top-[35%] right-[-20%] md:right-[10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-neon-purple/10 rounded-full blur-[80px] md:blur-[120px] animate-blob animation-delay-2000 opacity-30 md:opacity-40"></div>
                 {/* Neon Cyan Blob */}
                 <div className="absolute bottom-[15%] left-[10%] md:left-[20%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-neon-cyan/10 rounded-full blur-[80px] md:blur-[120px] animate-blob animation-delay-4000 opacity-30 md:opacity-50"></div>
              </div>

              {/* Content Sections with Transparent Backgrounds to show Lights */}
              <About />
              <Services />
              <Process />
              <ContactForm />
            </div>
          </>
        ) : (
          <>
            {view === 'cookies' && <CookiePolicy onBack={() => handleNavigation('home')} />}
            {view === 'privacy' && <PrivacyPolicy onBack={() => handleNavigation('home')} />}
            {view === 'legal' && <LegalNotice onBack={() => handleNavigation('home')} />}
            {view === 'terms' && <TermsOfUse onBack={() => handleNavigation('home')} />}
          </>
        )}
      </main>

      <Footer onNavigate={handleNavigation} />

      {/* CONTACT MODAL POPUP */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 md:px-8">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl glass-panel rounded-3xl p-6 md:p-10 border border-white/10 bg-dark-900 max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl shadow-neon-green/10"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10 z-10"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-6 md:mb-8">
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-2 md:mb-3">Solicitar Estudio Gratuito</h3>
                <p className="text-gray-400 text-xs md:text-sm">Completa tus datos y te contactaremos en 24h.</p>
              </div>

              <form 
                name="contact-modal" 
                method="POST" 
                data-netlify="true"
                className="space-y-4 md:space-y-6"
              >
                <input type="hidden" name="form-name" value="contact-modal" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="group relative">
                    <input 
                      type="text" 
                      name="name"
                      required
                      className="peer w-full bg-transparent border-b border-gray-700 py-2 md:py-3 text-white focus:outline-none focus:border-neon-green transition-colors placeholder-transparent text-sm md:text-base"
                      placeholder="Tu nombre"
                      id="modal-name"
                    />
                    <label htmlFor="modal-name" className="absolute left-0 -top-3.5 text-[10px] text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-neon-green">
                      NOMBRE
                    </label>
                  </div>
                  <div className="group relative">
                    <input 
                      type="text" 
                      name="company"
                      className="peer w-full bg-transparent border-b border-gray-700 py-2 md:py-3 text-white focus:outline-none focus:border-neon-green transition-colors placeholder-transparent text-sm md:text-base"
                      placeholder="Empresa"
                      id="modal-company"
                    />
                    <label htmlFor="modal-company" className="absolute left-0 -top-3.5 text-[10px] text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-neon-green">
                      EMPRESA (OPCIONAL)
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="group relative">
                    <input 
                      type="email" 
                      name="email"
                      required
                      className="peer w-full bg-transparent border-b border-gray-700 py-2 md:py-3 text-white focus:outline-none focus:border-neon-green transition-colors placeholder-transparent text-sm md:text-base"
                      placeholder="Email"
                      id="modal-email"
                    />
                    <label htmlFor="modal-email" className="absolute left-0 -top-3.5 text-[10px] text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-neon-green">
                      EMAIL
                    </label>
                  </div>
                  <div className="group relative">
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      className="peer w-full bg-transparent border-b border-gray-700 py-2 md:py-3 text-white focus:outline-none focus:border-neon-green transition-colors placeholder-transparent text-sm md:text-base"
                      placeholder="Teléfono"
                      id="modal-phone"
                    />
                    <label htmlFor="modal-phone" className="absolute left-0 -top-3.5 text-[10px] text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-neon-green">
                      TELÉFONO
                    </label>
                  </div>
                </div>

                <div className="group relative">
                  <textarea 
                    rows={3}
                    name="message"
                    className="peer w-full bg-transparent border-b border-gray-700 py-2 md:py-3 text-white focus:outline-none focus:border-neon-green transition-colors resize-none placeholder-transparent text-sm md:text-base"
                    placeholder="Mensaje"
                    id="modal-message"
                  />
                  <label htmlFor="modal-message" className="absolute left-0 -top-3.5 text-[10px] text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-neon-green">
                    MENSAJE
                  </label>
                </div>

                <div className="pt-4 flex justify-center">
                  <button
                    type="submit"
                    className="w-full bg-white text-black px-6 py-3 md:px-8 md:py-4 rounded-full font-display font-bold text-base md:text-lg hover:bg-neon-green transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    ENVIAR SOLICITUD
                  </button>
                </div>
                <p className="text-center text-[10px] text-gray-600 mt-2">
                  Al enviar, aceptas nuestra política de privacidad.
                </p>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
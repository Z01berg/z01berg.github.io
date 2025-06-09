import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CV from './components/CV';
import { LanguageProvider } from './contexts/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  useEffect(() => {
    document.documentElement.classList.add('bg-grid-pattern');
    return () => {
      document.documentElement.classList.remove('bg-grid-pattern');
    };
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900">
            <LanguageSwitcher />
            <Header />
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <About />
                  <Skills />
                  <Projects />
                  <Contact />
                </>
              } />
              <Route path="/cv" element={<CV />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
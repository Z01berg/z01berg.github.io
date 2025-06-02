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

function App() {
  useEffect(() => {
    document.documentElement.classList.add('bg-grid-pattern');
    return () => {
      document.documentElement.classList.remove('bg-grid-pattern');
    };
  }, []);

  return (
      <Router>
        <ThemeProvider>
          <Routes>
            <Route path="/cv" element={<CV />} />
            <Route path="/" element={
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
                <Header />
                <main>
                  <Hero />
                  <About />
                  <Skills />
                  <Projects />
                  <Contact />
                </main>
                <Footer />
              </div>
            } />
          </Routes>
        </ThemeProvider>
      </Router>
  );
}

export default App;
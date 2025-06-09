import React from 'react';
import { motion } from 'framer-motion';
import { Code, Github, Linkedin, Mail, ArrowDown, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
        id="hero"
        className="min-h-screen pt-16 flex items-center relative overflow-hidden"
        style={{
          backgroundImage: 'url(/img/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900/80 backdrop-blur-[2px]"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="container mx-auto px-4 py-16 z-10 relative">
        <div className="flex flex-col items-center text-center">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
          >
            <Code className="w-16 h-16 text-orange-500 mx-auto" />
          </motion.div>

          <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.hero.title}
          </motion.h1>

          <motion.h2
              className="text-xl md:text-2xl text-gray-200 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t.hero.subtitle}
          </motion.h2>

          <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
                onClick={() => scrollToSection('projects')}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
            >
              {t.hero.viewWork}
            </button>
            <button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 backdrop-blur-sm"
            >
              {t.hero.contactMe}
            </button>
            <Link 
              to="/cv" 
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 backdrop-blur-sm flex items-center"
            >
              <FileText className="w-5 h-5 mr-2" />
              {t.hero.viewCV}
            </Link>
          </motion.div>

          <motion.div
              className="flex items-center justify-center space-x-6 mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a
                href="https://github.com/Z01berg"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:text-orange-500 hover:bg-white transition-all hover:scale-110 hover:shadow-lg"
                aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
                href="https://www.linkedin.com/in/%E2%96%93zahar-zubyk%E2%96%93/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:text-orange-500 hover:bg-white transition-all hover:scale-110 hover:shadow-lg"
                aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
                href="mailto:zubykzakharii@gmail.com"
                className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:text-orange-500 hover:bg-white transition-all hover:scale-110 hover:shadow-lg"
                aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </motion.div>

          <motion.div
              className="flex justify-center w-full"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.6,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 0.2
              }}
          >
            <button
                onClick={() => scrollToSection('about')}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Scroll down"
            >
              <ArrowDown className="w-8 h-8 text-white/70" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
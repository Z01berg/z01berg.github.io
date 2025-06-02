import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUp, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
          >
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">
                  <span className="text-orange-500">Dev</span>Portfolio
                </h3>
                <p className="text-gray-400 max-w-md">
                  A showcase of my journey as a Software Engineer and Innovation Specialist.
                </p>
              </div>

              <div className="flex space-x-4">
                <a
                    href="https://github.com/Z01berg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 rounded-full text-gray-300 hover:text-orange-500 transition-colors"
                    aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                    href="https://www.linkedin.com/in/%E2%96%93zahar-zubyk%E2%96%93/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 rounded-full text-gray-300 hover:text-orange-500 transition-colors"
                    aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                    href="mailto:zubykzakharii@gmail.com"
                    className="p-2 bg-gray-800 rounded-full text-gray-300 hover:text-orange-500 transition-colors"
                    aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <Link
                    to="/cv"
                    className="p-2 bg-gray-800 rounded-full text-gray-300 hover:text-orange-500 transition-colors"
                    aria-label="CV"
                >
                  <FileText className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-500 text-sm mb-4 md:mb-0">
                © {currentYear} Zahar Zubik. All rights reserved.
              </div>

              <div className="flex items-center">
                <nav className="flex space-x-6 mr-8">
                  <a href="#about" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">About</a>
                  <a href="#projects" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">Projects</a>
                  <a href="#skills" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">Skills</a>
                  <a href="#contact" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">Contact</a>
                  <Link to="/cv" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">CV</Link>
                </nav>

                <button
                    onClick={scrollToTop}
                    className="p-2 bg-orange-500 hover:bg-orange-600 rounded-full text-white transition-colors"
                    aria-label="Scroll to top"
                >
                  <ArrowUp className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
  );
};

export default Footer
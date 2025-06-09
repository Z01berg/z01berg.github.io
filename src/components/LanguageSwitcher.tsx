import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-20 right-4 z-50"
    >
      <div className="flex space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-1 shadow-lg">
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            language === 'en'
              ? 'bg-orange-500 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('uk')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            language === 'uk'
              ? 'bg-orange-500 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          UK
        </button>
        <button
          onClick={() => setLanguage('pl')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            language === 'pl'
              ? 'bg-orange-500 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          PL
        </button>
      </div>
    </motion.div>
  );
};

export default LanguageSwitcher; 
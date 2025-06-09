import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, Send, Github, Linkedin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/main';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { language } = useLanguage();
  const t = translations[language];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In a real app, you would send the form data to a server here
      console.log('Form submitted:', formData);

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError('Failed to send message. Please try again later.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <section
          id="contact"
          className="py-20 bg-gray-50 dark:bg-gray-900"
      >
        <div className="container mx-auto px-4">
          <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              {t.contact.title}
            </h2>

            <div className="relative mb-12">
              <div className="h-1 w-24 bg-orange-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  {t.contact.sendMessage}
                </h3>

                {submitSuccess && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
                      <p>{t.contact.messageSent}</p>
                    </div>
                )}

                {submitError && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                      <p>{submitError}</p>
                    </div>
                )}

                <form method="post" action="https://formspree.io/f/xzbovqdq">
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Your name"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Your email"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Your message"
                    />
                  </div>

                  <button
                      type="submit"
                      className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 mr-2" /> Send Message
                  </button>
                </form>
              </motion.div>

              <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Contact Information</h3>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-orange-100 dark:bg-orange-900/20 rounded-lg p-3 mr-4">
                        <Mail className="w-6 h-6 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Email</h4>
                        <a href="mailto:zubykzakharii@gmail.com" className="text-orange-500 hover:underline">zubykzakharii@gmail.com</a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-orange-100 dark:bg-orange-900/20 rounded-lg p-3 mr-4">
                        <MapPin className="w-6 h-6 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Location</h4>
                        <p className="text-gray-600 dark:text-gray-400">Warsaw, Poland</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Follow Me</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <a
                        href="https://github.com/Z01berg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Github className="w-6 h-6 mr-3 text-gray-700 dark:text-gray-300" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">GitHub</span>
                    </a>

                    <a
                        href="https://www.linkedin.com/in/%E2%96%93zahar-zubyk%E2%96%93/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Linkedin className="w-6 h-6 mr-3 text-blue-700 dark:text-blue-400" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">LinkedIn</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
  );
};

export default Contact;
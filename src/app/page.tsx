'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const WHATSAPP_NUMBER = '918954549798';
const DEVELOPER_NAME = 'Abhishek';
const DEVELOPER_EMAIL = 'abhishekmiyan34@gmail.com';
const DEVELOPER_LOCATION = 'Dehradun - Rishikesh, Uttarakhand, India';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    phone: '',
    email: '',
    country: '',
    requirements: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const whatsappLink = (message = '') => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.business || !formData.phone || !formData.country || !formData.email || !formData.requirements) {
      setSubmitMessage('Please fill all fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!emailResponse.ok) {
        throw new Error('Failed to send email');
      }

      const whatsappMessage = `Hi Abhishek,

I'm interested in your services. Here are my details:

*Name:* ${formData.name}
*Business:* ${formData.business}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Country:* ${formData.country}

*Requirements:*
${formData.requirements}

Looking forward to hearing from you!`;

      window.open(whatsappLink(whatsappMessage), '_blank');

      setSubmitMessage('✅ Email sent! Opening WhatsApp...');
      
      setTimeout(() => {
        setFormData({
          name: '',
          business: '',
          phone: '',
          email: '',
          country: '',
          requirements: '',
        });
        setSubmitMessage('');
      }, 2000);
    } catch (error) {
      setSubmitMessage('❌ Error sending email. Please try WhatsApp directly.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-dark-900 overflow-hidden">
      {/* Navbar */}
      <motion.nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-dark-900/95 backdrop-blur-md border-b border-dark-700'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-400 to-accent-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <span className="text-white font-bold text-lg hidden sm:inline">{DEVELOPER_NAME}</span>
                <div className="text-xs text-accent-400 hidden sm:block">Web Developer</div>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-dark-300 hover:text-accent-400 transition-colors">Services</a>
              <a href="#portfolio" className="text-dark-300 hover:text-accent-400 transition-colors">Case Studies</a>
              <a href="#pricing" className="text-dark-300 hover:text-accent-400 transition-colors">Pricing</a>
              <a href="#contact" className="text-dark-300 hover:text-accent-400 transition-colors">Contact</a>
            </div>

            <a
              href={whatsappLink('Hi, I need a website for my business')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-glow"
            >
              Get Started
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-b from-dark-900 via-dark-900 to-dark-800 pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-600/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="space-y-8" variants={itemVariants}>
              <div className="space-y-4">
                <motion.h1
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight"
                  variants={itemVariants}
                >
                  Websites & Apps That
                  <span className="bg-gradient-to-r from-accent-400 to-accent-500 bg-clip-text text-transparent"> Drive Growth</span>
                </motion.h1>

                <motion.p
                  className="text-xl text-dark-300 leading-relaxed max-w-lg"
                  variants={itemVariants}
                >
                  Professional web and app solutions for small businesses. Get more customers, increase sales, and build your online presence with modern, affordable technology.
                </motion.p>
              </div>

              <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
                <a
                  href={whatsappLink('Hi Abhishek, I need a free consultation for my business')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-glow text-center"
                >
                  Free Consultation
                </a>
                <a
                  href="#portfolio"
                  className="px-8 py-4 border-2 border-accent-500 text-accent-400 hover:bg-accent-500/10 rounded-lg font-semibold transition-all duration-300 text-center"
                >
                  View Case Studies
                </a>
              </motion.div>

              <motion.div className="grid grid-cols-3 gap-6 pt-8" variants={itemVariants}>
                <div className="bg-dark-800/50 backdrop-blur border border-dark-700 rounded-lg p-4">
                  <div className="text-3xl font-bold text-accent-400">100%</div>
                  <div className="text-sm text-dark-400">Client Satisfaction</div>
                </div>
                <div className="bg-dark-800/50 backdrop-blur border border-dark-700 rounded-lg p-4">
                  <div className="text-3xl font-bold text-accent-400">24/7</div>
                  <div className="text-sm text-dark-400">Support</div>
                </div>
                <div className="bg-dark-800/50 backdrop-blur border border-dark-700 rounded-lg p-4">
                  <div className="text-3xl font-bold text-accent-400">2hrs</div>
                  <div className="text-sm text-dark-400">Response Time</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Avatar Section */}
            <motion.div className="flex justify-center" variants={itemVariants}>
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-500/30 to-accent-600/30 rounded-3xl blur-3xl animate-pulse"></div>
                <motion.div
                  className="relative bg-gradient-to-br from-dark-700 to-dark-800 rounded-3xl p-8 border-2 border-accent-500/50 overflow-hidden"
                  whileHover={{ scale: 1.05, borderColor: '#0ea5e9' }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Avatar with Professional Frame */}
                  <div className="relative w-full aspect-square flex items-center justify-center bg-gradient-to-br from-dark-600 to-dark-700 rounded-2xl overflow-hidden border-4 border-accent-500/30">
                    {/* Animated Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 via-transparent to-accent-600/10 animate-pulse"></div>
                    
                    {/* Avatar Image - YOUR PHOTO */}
                    <motion.img
                      src="/avatar.jpg"
                      alt="Abhishek"
                      className="w-full h-full object-cover relative z-10 rounded-2xl"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/avataaars/svg?seed=abhishek&scale=90&backgroundColor=gradient";
                      }}
                    />

                    {/* Floating Particles Effect */}
                    <div className="absolute inset-0 z-20 pointer-events-none">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-accent-400 rounded-full"
                          animate={{
                            x: [0, Math.random() * 100 - 50],
                            y: [0, Math.random() * 100 - 50],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                          }}
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                        />
                      ))}
                    </div>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl z-30 pointer-events-none"></div>
                  </div>

                  {/* Info Card */}
                  <div className="mt-6 text-center">
                    <h3 className="text-2xl font-bold text-white mb-1">{DEVELOPER_NAME}</h3>
                    <p className="text-accent-400 font-semibold mb-2">Web & App Developer</p>
                    <p className="text-dark-400 text-sm">{DEVELOPER_LOCATION}</p>
                    <div className="mt-4 flex justify-center gap-3">
                      <a href={whatsappLink('Hi')} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white transition-all">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.946 1.347l-.355.192-.368-.06c-1.286-.113-2.511-.505-3.522-1.102l-.503-.294-.588.122c-.461.095-.902.196-1.322.303 1.08 1.494 2.656 2.674 4.32 3.204l.442.139-.011.48c-.021.845.062 1.667.196 2.472.134.804.34 1.592.612 2.36l.213.659-.655.236c-2.035.731-3.99 1.8-5.676 3.15.738-1.477 1.338-2.886 1.788-4.303l.262-.888-.895-.344C2.033 10.442 1 8.814 1 6.977 1 3.129 4.134 0 8 0c3.866 0 7 3.129 7 7s-3.134 7-7 7z" />
                        </svg>
                      </a>
                      <a href={`mailto:${DEVELOPER_EMAIL}`} className="w-10 h-10 bg-accent-500 hover:bg-accent-600 rounded-full flex items-center justify-center text-white transition-all">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-dark-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Services for Small Business Growth</h2>
            <p className="text-xl text-dark-400 max-w-2xl mx-auto">
              Affordable, professional solutions to help your business attract more customers and increase revenue.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              { 
                title: 'Business Website', 
                icon: '🏢', 
                desc: 'Professional website to establish your online presence and attract customers 24/7.' 
              },
              { 
                title: 'E-Commerce Store', 
                icon: '🛍️', 
                desc: 'Sell products online and reach customers beyond your physical location.' 
              },
              { 
                title: 'Mobile App', 
                icon: '📱', 
                desc: 'Custom mobile app to engage customers and increase brand loyalty.' 
              },
              { 
                title: 'Landing Page', 
                icon: '🎯', 
                desc: 'High-converting landing page designed to turn visitors into paying customers.' 
              },
              { 
                title: 'Website Redesign', 
                icon: '✨', 
                desc: 'Modernize your existing website with fresh design and improved functionality.' 
              },
              { 
                title: 'Maintenance & Support', 
                icon: '🔧', 
                desc: 'Keep your website running smoothly with ongoing support and updates.' 
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                className="group relative bg-dark-800 border border-dark-700 rounded-2xl p-8 hover:border-accent-500/50 transition-all duration-300 hover:shadow-glow"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-dark-400">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Me */}
      <section className="py-20 px-4 bg-dark-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose {DEVELOPER_NAME}?</h2>
            <p className="text-xl text-dark-400 max-w-2xl mx-auto">
              Professional quality at affordable prices. Perfect for small businesses looking to grow online.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              { icon: '💰', title: 'Affordable Pricing', desc: 'Best rates without compromising quality.' },
              { icon: '⚡', title: 'Fast Delivery', desc: 'Quick turnaround on your projects.' },
              { icon: '📱', title: 'Mobile First', desc: 'All websites optimized for mobile devices.' },
              { icon: '🎨', title: 'Modern Design', desc: 'Beautiful, professional designs that convert.' },
              { icon: '🔍', title: 'SEO Optimized', desc: 'Built to rank higher in search results.' },
              { icon: '🚀', title: 'High Performance', desc: 'Fast loading websites for better UX.' },
              { icon: '💬', title: 'Direct Support', desc: 'Direct communication with me, no middlemen.' },
              { icon: '🤝', title: 'Long-term Support', desc: 'Ongoing support after your website launches.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-dark-700 border border-dark-600 rounded-xl p-6 hover:border-accent-500/50 transition-all duration-300 hover:shadow-glow"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-dark-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="portfolio" className="py-20 px-4 bg-dark-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Case Studies</h2>
            <p className="text-xl text-dark-400 max-w-2xl mx-auto">
              Real examples of how websites help small businesses grow and attract more customers.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              {
                title: 'Local Restaurant',
                category: 'Food & Beverage',
                problem: 'No online presence, missing online orders',
                result: '150% increase in online inquiries',
                image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop',
              },
              {
                title: 'Fitness Gym',
                category: 'Health & Fitness',
                problem: 'Outdated website, low membership inquiries',
                result: '80+ qualified leads in 2 months',
                image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=300&fit=crop',
              },
              {
                title: 'Real Estate Agent',
                category: 'Real Estate',
                problem: 'No professional property showcase',
                result: '3x more property inquiries',
                image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=300&fit=crop',
              },
              {
                title: 'Coaching Business',
                category: 'Education',
                problem: 'No online booking system',
                result: '250% increase in consultations',
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
              },
              {
                title: 'Medical Clinic',
                category: 'Healthcare',
                problem: 'Manual appointment system',
                result: '60% reduction in phone calls',
                image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop',
              },
              {
                title: 'E-Commerce Store',
                category: 'Retail',
                problem: 'No online sales channel',
                result: '$5000+ in first month',
                image: 'https://images.unsplash.com/photo-1460925895917-adf4e565db18?w=500&h=300&fit=crop',
              },
            ].map((project, i) => (
              <motion.div
                key={i}
                className="group relative bg-dark-800 rounded-2xl overflow-hidden border border-dark-700 hover:border-accent-500/50 transition-all duration-300 hover:shadow-glow"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48 overflow-hidden bg-dark-700">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-accent-400 font-medium mb-2">{project.category}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                  <div className="mb-4">
                    <div className="text-sm font-semibold text-dark-300 mb-1">Challenge</div>
                    <p className="text-dark-400 text-sm">{project.problem}</p>
                  </div>
                  <div className="p-3 bg-accent-500/10 rounded-lg border border-accent-500/20">
                    <div className="text-sm font-semibold text-accent-400">Result</div>
                    <p className="text-accent-300 text-sm">{project.result}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-dark-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What Clients Say</h2>
            <p className="text-xl text-dark-400 max-w-2xl mx-auto">
              Real feedback from businesses that grew with our help.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              {
                name: 'Rajesh Kumar',
                business: 'Kumar\'s Restaurant',
                text: 'The website transformed our business. We went from zero online orders to 50+ orders per week. Highly recommended!',
              },
              {
                name: 'Priya Sharma',
                business: 'FitLife Gym',
                text: 'Professional, affordable, and delivered on time. Our membership inquiries tripled. Best investment for our business!',
              },
              {
                name: 'Amit Patel',
                business: 'Patel Real Estate',
                text: 'More inquiries in 2 months than the entire previous year. Great communication throughout the project!',
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                className="bg-dark-700 border border-dark-600 rounded-2xl p-8 hover:border-accent-500/50 transition-all duration-300 hover:shadow-glow"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="text-dark-300 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-sm text-dark-400">{testimonial.business}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-dark-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Affordable Pricing Plans</h2>
            <p className="text-xl text-dark-400 max-w-2xl mx-auto">
              Professional websites at prices that work for small businesses. All prices in USD for international clients.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              {
                name: 'Starter',
                price: '$299',
                features: ['5-7 Pages', 'Mobile Responsive', 'Contact Form', 'Basic SEO', 'Free Hosting (1 year)', 'Email Support'],
              },
              {
                name: 'Business',
                price: '$599',
                features: ['10-15 Pages', 'Mobile Responsive', 'Blog Section', 'Advanced SEO', 'Free Hosting (1 year)', 'Priority Support', 'Analytics Setup'],
                highlight: true,
              },
              {
                name: 'Premium',
                price: '$999',
                features: ['Unlimited Pages', 'E-commerce Ready', 'Blog & Portfolio', 'Advanced SEO', 'Free Hosting (1 year)', 'Custom Features', '24/7 Support'],
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                className={`relative rounded-2xl p-8 transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-accent-500/20 to-accent-600/10 border-2 border-accent-500 shadow-glow'
                    : 'bg-dark-800 border border-dark-700 hover:border-accent-500/50 hover:shadow-glow'
                }`}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-8">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-dark-400 ml-2">USD</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-dark-300">
                      <span className="text-accent-400">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappLink(`Hi Abhishek, I'm interested in the ${plan.name} plan`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 rounded-lg font-semibold text-center block transition-all duration-300 ${
                    plan.highlight
                      ? 'bg-accent-500 hover:bg-accent-600 text-white'
                      : 'bg-dark-700 hover:bg-dark-600 text-white'
                  }`}
                >
                  Get Started
                </a>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-dark-400 mb-4">
              Need something custom? <span className="text-accent-400 font-semibold">Custom quotes available</span>
            </p>
            <a
              href={whatsappLink('Hi Abhishek, I need a custom quote for my project')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 border-2 border-accent-500 text-accent-400 hover:bg-accent-500/10 rounded-lg font-semibold transition-all duration-300"
            >
              Request Custom Quote
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-dark-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Let's Build Your Online Presence</h2>
            <p className="text-xl text-dark-400">
              Fill out the form below and I'll contact you via email and WhatsApp within 2 hours.
            </p>
          </motion.div>

          <motion.div
            className="bg-dark-700 border border-dark-600 rounded-2xl p-8 md:p-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Business */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-dark-600 border border-dark-500 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-accent-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Business Name *</label>
                  <input
                    type="text"
                    name="business"
                    value={formData.business}
                    onChange={handleInputChange}
                    placeholder="Your Business"
                    className="w-full px-4 py-3 bg-dark-600 border border-dark-500 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-accent-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Phone and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 bg-dark-600 border border-dark-500 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-accent-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-dark-600 border border-dark-500 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-accent-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Country Selection */}
              <div>
                <label className="block text-white font-semibold mb-2">Country *</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-dark-600 border border-dark-500 rounded-lg text-white focus:outline-none focus:border-accent-500 transition-colors"
                  required
                >
                  <option value="">Select your country</option>
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Spain">Spain</option>
                  <option value="Italy">Italy</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Singapore">Singapore</option>
                  <option value="UAE">UAE</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-white font-semibold mb-2">Project Requirements *</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project, what you need, and your goals..."
                  rows={5}
                  className="w-full px-4 py-3 bg-dark-600 border border-dark-500 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-accent-500 transition-colors resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit Message */}
              {submitMessage && (
                <div className={`p-4 rounded-lg text-center font-semibold ${
                  submitMessage.includes('✅') 
                    ? 'bg-green-500/20 border border-green-500 text-green-400' 
                    : 'bg-red-500/20 border border-red-500 text-red-400'
                }`}>
                  {submitMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-accent-500 hover:bg-accent-600 disabled:bg-dark-600 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-glow"
              >
                {isSubmitting ? 'Sending...' : 'Send Details & Open WhatsApp'}
              </button>

              <p className="text-center text-dark-400 text-sm">
                Your details will be sent to my email and WhatsApp. I'll respond within 2 hours.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Grow Your Business Online?
            </h2>
            <p className="text-xl text-dark-400 max-w-2xl mx-auto">
              Let's discuss your project and create a website that brings real results. Free consultation available!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappLink('Hi Abhishek, I want to start my project')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-glow"
              >
                Start Your Project
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border-2 border-accent-500 text-accent-400 hover:bg-accent-500/10 rounded-lg font-semibold transition-all duration-300"
              >
                Send a Message
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-950 border-t border-dark-700 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-accent-400 to-accent-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <span className="text-white font-bold">{DEVELOPER_NAME}</span>
              </div>
              <p className="text-dark-400 text-sm">Web & App Developer helping small businesses grow online.</p>
              <p className="text-dark-400 text-sm mt-2">{DEVELOPER_LOCATION}</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#services" className="text-dark-400 hover:text-accent-400 transition-colors text-sm">Services</a></li>
                <li><a href="#portfolio" className="text-dark-400 hover:text-accent-400 transition-colors text-sm">Case Studies</a></li>
                <li><a href="#pricing" className="text-dark-400 hover:text-accent-400 transition-colors text-sm">Pricing</a></li>
                <li><a href="#contact" className="text-dark-400 hover:text-accent-400 transition-colors text-sm">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#services" className="text-dark-400 hover:text-accent-400 transition-colors text-sm">Business Website</a></li>
                <li><a href="#services" className="text-dark-400 hover:text-accent-400 transition-colors text-sm">E-Commerce Store</a></li>
                <li><a href="#services" className="text-dark-400 hover:text-accent-400 transition-colors text-sm">Mobile App</a></li>
                <li><a href="#services" className="text-dark-400 hover:text-accent-400 transition-colors text-sm">Maintenance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Get In Touch</h4>
              <ul className="space-y-2">
                <li><a href={whatsappLink('Hi')} target="_blank" rel="noopener noreferrer" className="text-dark-400 hover:text-accent-400 transition-colors text-sm">WhatsApp</a></li>
                <li><a href={`mailto:${DEVELOPER_EMAIL}`} className="text-dark-400 hover:text-accent-400 transition-colors text-sm">Email</a></li>
                <li><a href="#contact" className="text-dark-400 hover:text-accent-400 transition-colors text-sm">Contact Form</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-dark-700 pt-8 text-center text-dark-400 text-sm">
            <p>&copy; 2026 {DEVELOPER_NAME}. All rights reserved. | {DEVELOPER_LOCATION}</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        href={whatsappLink('Hi Abhishek, I need a website for my business')}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.946 1.347l-.355.192-.368-.06c-1.286-.113-2.511-.505-3.522-1.102l-.503-.294-.588.122c-.461.095-.902.196-1.322.303 1.08 1.494 2.656 2.674 4.32 3.204l.442.139-.011.48c-.021.845.062 1.667.196 2.472.134.804.34 1.592.612 2.36l.213.659-.655.236c-2.035.731-3.99 1.8-5.676 3.15.738-1.477 1.338-2.886 1.788-4.303l.262-.888-.895-.344C2.033 10.442 1 8.814 1 6.977 1 3.129 4.134 0 8 0c3.866 0 7 3.129 7 7s-3.134 7-7 7z" />
        </svg>
      </motion.a>
    </main>
  );
}

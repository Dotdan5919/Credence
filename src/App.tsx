import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ArrowRight, 
  ChevronDown, 
  CheckCircle2, 
  BarChart3, 
  Calculator, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  FileText,
  Play,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Calendar,
  Clock,
  Send,
  Download
} from 'lucide-react';

// --- Shared Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Services', path: '/#services' },
    { name: 'Process', path: '/#process' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ rotate: 180 }}
            className="w-8 h-8 bg-brand-green rounded flex items-center justify-center text-white font-bold"
          >
            C
          </motion.div>
          <span className="text-xl font-bold tracking-tight">Credence</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-sm font-medium transition-colors hover:text-brand-green ${location.pathname === link.path ? 'text-brand-green' : 'text-slate-600'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-6">
          <button className="text-sm font-medium hover:text-brand-green transition-colors">Log in</button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand-green text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-200"
          >
            Talk to an Expert
          </motion.button>
        </div>

        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white border-t p-6 md:hidden flex flex-col gap-4 shadow-xl overflow-hidden"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium py-2 border-b border-slate-50"
              >
                {link.name}
              </Link>
            ))}
            <button className="text-lg font-medium py-2 text-left">Log in</button>
            <button className="bg-brand-green text-white px-6 py-3 rounded-full text-lg font-semibold">
              Talk to an Expert
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Home Page Sections ---

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
          >
            Award Winning Financial Advisory
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
            Navigate Your Finances with <span className="text-brand-green">Confidence</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
            Expert Accounting, Tax, and CFO solutions tailored for growth. We handle the numbers so you can focus on building your legacy.
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.button 
              whileHover={{ x: 5 }}
              className="bg-brand-dark text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-slate-800 transition-all group"
            >
              Get Started Today <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <button className="px-8 py-4 rounded-full font-semibold border border-slate-200 hover:bg-slate-50 transition-all">
              View Services
            </button>
          </div>
          
          <div className="mt-16">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Trusted by Industry Leaders</p>
            <div className="flex gap-8 opacity-40 grayscale">
              {[1,2,3,4].map(i => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.1, opacity: 1, filter: 'grayscale(0%)' }}
                  className="w-12 h-12 bg-slate-300 rounded-full" 
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <motion.div style={{ y: y1 }} className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-2xl z-10">
            <img 
              src="https://picsum.photos/seed/finance-pro/800/1000" 
              alt="Professional" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-8 left-8 glass-card p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-green/20 rounded-full flex items-center justify-center text-brand-green">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Fueling Growth</p>
                <p className="text-sm font-bold">+124% Revenue</p>
              </div>
            </div>

            <div className="absolute bottom-8 right-8 glass-card p-4 rounded-2xl flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="user" referrerPolicy="no-referrer" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-brand-dark text-[10px] flex items-center justify-center text-white">+500</div>
              </div>
              <div>
                <p className="text-xs font-bold">Trusted by 500+</p>
                <p className="text-[10px] text-slate-500">growing enterprises</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            style={{ y: y2 }}
            className="absolute -z-10 -top-20 -right-20 w-80 h-80 bg-brand-green/10 rounded-full blur-3xl" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -z-10 -bottom-20 -left-20 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl" 
          />
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Personal connections, global solutions.
          </h2>
          <div className="w-20 h-1 bg-brand-green mb-8" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-lg font-semibold mb-6">
            Accounify is a leading network of independent accounting and consulting firms dedicated to driving business excellence.
          </p>
          <p className="text-slate-500 mb-8 leading-relaxed">
            With a presence in key financial hubs, our team of Chartered Accountants and Management Consultants partners with clients to strengthen governance, enhance performance, and unlock sustainable growth across the economic value chain.
          </p>
          <a href="#" className="text-brand-green font-bold flex items-center gap-2 hover:gap-3 transition-all">
            Learn more about our heritage <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const WhatWeDo = () => {
  return (
    <section className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6">What We Do</h2>
          <p className="text-xl font-semibold mb-6">
            Working with organizations and institutions to help them meet their obligations, maximize value, and achieve sustainable growth.
          </p>
          <p className="text-slate-500 leading-relaxed">
            We combine deep expertise with technology to work alongside our clients, uncovering insights and navigating complexity in an evolving business landscape.
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white p-12 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 text-brand-green/10">
            <ShieldCheck className="w-32 h-32" />
          </div>
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-brand-green mb-8">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold mb-6 leading-tight">
            "Ethics is the fabric that binds our work to excellence and underpins every engagement."
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            At our core, we are committed to advancing productivity and driving development across the economic value chain.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceCard = ({ icon: Icon, title, description, colorClass = "bg-white" }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`${colorClass} p-10 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col h-full`}
  >
    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-800 mb-8">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-slate-500 text-sm mb-8 leading-relaxed flex-grow">{description}</p>
    <a href="#" className="text-xs font-bold flex items-center gap-2 group">
      Learn More <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
    </a>
  </motion.div>
);

const Services = () => {
  const services = [
    { 
      icon: BarChart3, 
      title: "CFO Services", 
      description: "Expert guidance on financial strategy, due diligence, and investor relations to achieve sustainable value." 
    },
    { 
      icon: Calculator, 
      title: "Accounting Services", 
      description: "From daily tasks to financial reporting, we keep your books accurate and up-to-date for informed decisions.",
      colorClass: "bg-brand-dark text-white"
    },
    { 
      icon: FileText, 
      title: "Business Tax", 
      description: "Stay compliant and optimize your tax position with our proactive planning and expert filing services.",
      colorClass: "bg-emerald-300"
    },
    { 
      icon: ShieldCheck, 
      title: "Risk Management", 
      description: "Identify potential financial threats and implement robust controls to safeguard your enterprise assets." 
    },
    { 
      icon: TrendingUp, 
      title: "Business Valuation", 
      description: "Determine the true market value of your business for mergers, acquisitions, or internal transitions." 
    },
    { 
      icon: Users, 
      title: "SME Support", 
      description: "Specialized advisory and compliance support designed specifically for the unique needs of growing SMEs.",
      colorClass: "bg-brand-green text-white"
    }
  ];

  return (
    <section id="services" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-green mb-4">Comprehensive Expertise</p>
        <h2 className="text-4xl font-bold mb-6">Your All-in-One Finance Department</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Strategically designed solutions to navigate the complexities of modern business finance and regulatory landscapes.
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <ServiceCard key={i} {...service} />
        ))}
      </div>
    </section>
  );
};

const Trust = () => {
  return (
    <section className="section-padding bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-square rounded-[2rem] overflow-hidden shadow-lg"
            >
              <img src="https://picsum.photos/seed/trust1/400/400" alt="Trust" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-brand-green text-white p-8 rounded-[2rem] flex flex-col justify-center aspect-square"
            >
              <p className="text-4xl font-bold mb-2">15+</p>
              <p className="text-xs font-bold uppercase tracking-wider">Years of Excellence</p>
            </motion.div>
          </div>
          <div className="space-y-4 pt-12">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-brand-dark text-white p-8 rounded-[2rem] flex flex-col justify-center aspect-square"
            >
              <p className="text-4xl font-bold mb-2">99%</p>
              <p className="text-xs font-bold uppercase tracking-wider">Client Retention</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-square rounded-[2rem] overflow-hidden shadow-lg bg-emerald-100 flex items-center justify-center p-8"
            >
               <div className="w-full h-full border border-brand-green/20 rounded-full flex items-center justify-center">
                  <div className="w-3/4 h-3/4 border border-brand-green/40 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-12 h-12 text-brand-green" />
                  </div>
               </div>
            </motion.div>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-green mb-4">About Credence</p>
          <h2 className="text-4xl font-bold mb-8 leading-tight">Trusted Advisors. Ethical Leaders.</h2>
          
          <div className="space-y-8">
            {[
              { icon: Users, title: "We are trusted advisors", text: "Dedicated to the highest standards of financial integrity. Our team brings decades of combined experience across diverse industries." },
              { icon: ShieldCheck, title: "Ethics is the fabric", text: "That weaves through every engagement. We believe that transparency and honesty are the foundations of long-term financial success." },
              { icon: TrendingUp, title: "At our core", text: "We are driven by innovation and excellence. We leverage cutting-edge financial technology to provide real-time insights for our clients." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6"
              >
                <div className="w-10 h-10 bg-white rounded-full flex-shrink-0 flex items-center justify-center text-brand-green shadow-sm">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const AccordionItem = ({ number, title, content, isOpen, onClick }: any) => (
  <div className={`border rounded-[2rem] overflow-hidden transition-all duration-300 ${isOpen ? 'bg-white shadow-xl border-emerald-100' : 'bg-white border-slate-100'}`}>
    <button 
      onClick={onClick}
      className="w-full p-8 flex items-center justify-between text-left"
    >
      <div className="flex items-center gap-6">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${isOpen ? 'bg-brand-green text-white' : 'bg-slate-50 text-slate-400'}`}>
          {number}
        </div>
        <h4 className="text-xl font-bold">{title}</h4>
      </div>
      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-green' : 'text-slate-400'}`} />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-8 pb-8 ml-[4.5rem]"
        >
          <p className="text-slate-500 text-sm leading-relaxed max-w-xl">
            {content}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Process = () => {
  const [openIndex, setOpenIndex] = useState(2);

  const steps = [
    { number: "01", title: "Consultation Meeting", content: "We begin with a deep dive into your current financial landscape, goals, and challenges to tailor our approach." },
    { number: "02", title: "Information Sharing", content: "Securely gather all necessary documentation and data to build a comprehensive view of your operations." },
    { number: "03", title: "Comprehensive Analysis", content: "Our experts conduct a deep dive into your financial records, identifying opportunities for optimization, risk mitigation, and strategic growth. We provide a detailed report with actionable insights tailored to your specific goals." },
    { number: "04", title: "Partnership Kickoff", content: "Finalize the roadmap and begin our journey together towards financial excellence and sustainable growth." }
  ];

  return (
    <section id="process" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6">Our Process</h2>
          <p className="text-slate-500 mb-12 max-w-md">
            We've streamlined our onboarding process to make your transition to expert financial management smooth and efficient.
          </p>
          <div className="relative rounded-[2rem] overflow-hidden aspect-square shadow-2xl">
            <img src="https://picsum.photos/seed/process/800/800" alt="Process" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-brand-dark/20" />
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Step 1</p>
              <h4 className="text-2xl font-bold">Initial Discovery</h4>
            </div>
          </div>
        </motion.div>
        <div className="space-y-4">
          {steps.map((step, i) => (
            <AccordionItem 
              key={i} 
              {...step} 
              isOpen={openIndex === i} 
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const CaseStudy = () => {
  return (
    <section id="case-study" className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-brand-green mb-4">Success Story</p>
          <h2 className="text-4xl font-bold mb-8 leading-tight">
            Learn How Credence Transformed Masterpiece Cuisine
          </h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            With growing complexities, mastering accounting and financial strategy is paramount. Discover how Credence empowered Masterpiece Cuisine, turning challenges into opportunities and driving unprecedented profitability.
          </p>
          <button className="bg-brand-dark text-white px-8 py-4 rounded-full font-semibold hover:bg-slate-800 transition-all">
            Read the Case Study
          </button>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="rounded-[2rem] overflow-hidden aspect-video shadow-2xl relative group cursor-pointer">
            <img src="https://picsum.photos/seed/casestudy/800/450" alt="Case Study" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-brand-dark fill-brand-dark" />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 glass-card p-6 rounded-2xl flex items-center gap-4 max-w-xs">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-brand-green">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold">Boosting Profitability</p>
              <p className="text-[10px] text-slate-500">Turning challenges into opportunities</p>
            </div>
          </div>
          <div className="absolute -z-10 -top-10 -right-10 w-full h-full bg-brand-green/20 rounded-[2rem] blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="section-padding bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto bg-brand-dark rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden"
      >
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Ready to Transform Your Financial Operations?
          </h2>
          <p className="text-lg text-slate-300 mb-10 leading-relaxed">
            Schedule a consultation to see how we can support your business growth. No more guesswork, just results.
          </p>
          <button className="bg-brand-green text-brand-dark px-10 py-4 rounded-full font-bold hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20">
            Talk to an Expert
          </button>
        </div>
        
        <div className="absolute top-1/2 right-20 -translate-y-1/2 hidden lg:block">
           <div className="w-80 h-80 bg-slate-800 rounded-3xl rotate-12 flex items-center justify-center overflow-hidden border border-slate-700">
              <div className="w-full h-full opacity-50">
                <img src="https://picsum.photos/seed/cta-img/400/400" alt="CTA" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
           </div>
        </div>

        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl" />
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
      </motion.div>
    </section>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section className="section-padding bg-white" id="contact">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
          <p className="text-slate-500 mb-10 leading-relaxed">
            Have questions about our services or want to discuss your business needs? Fill out the form and our team will get back to you within 24 hours.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-brand-green">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Email Us</p>
                <p className="font-bold">hello@credence.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-brand-green">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Data Export</p>
                <a href="/api/export" className="font-bold text-brand-green hover:underline flex items-center gap-2">
                  Download Submissions (Excel) <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Subject</label>
              <input 
                required
                type="text" 
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 outline-none transition-all"
                placeholder="How can we help?"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Message</label>
              <textarea 
                required
                rows={4}
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 outline-none transition-all resize-none"
                placeholder="Tell us more about your project..."
              />
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === 'loading'}
              className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${
                status === 'success' ? 'bg-emerald-500 text-white' : 'bg-brand-dark text-white hover:bg-slate-800'
              }`}
            >
              {status === 'loading' ? 'Sending...' : status === 'success' ? (
                <>Success! <CheckCircle2 className="w-5 h-5" /></>
              ) : (
                <>Send Message <Send className="w-5 h-5" /></>
              )}
            </motion.button>
            {status === 'error' && <p className="text-red-500 text-center text-sm font-bold">Something went wrong. Please try again.</p>}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

// --- Pages ---

const HomePage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <Hero />
    <About />
    <WhatWeDo />
    <Services />
    <Trust />
    <Process />
    <CaseStudy />
    <CTA />
    <ContactForm />
  </motion.div>
);

const EventsPage = () => {
  const events = [
    {
      title: "Strategic Tax Planning 2026",
      date: "March 15, 2026",
      time: "10:00 AM - 2:00 PM",
      location: "Virtual Webinar",
      image: "https://picsum.photos/seed/event1/800/400",
      category: "Tax & Compliance"
    },
    {
      title: "CFO Roundtable: Scaling in Tech",
      date: "April 02, 2026",
      time: "6:00 PM - 9:00 PM",
      location: "Lagos Business Hub",
      image: "https://picsum.photos/seed/event2/800/400",
      category: "Leadership"
    },
    {
      title: "SME Growth Workshop",
      date: "April 20, 2026",
      time: "9:00 AM - 5:00 PM",
      location: "Abuja Conference Center",
      image: "https://picsum.photos/seed/event3/800/400",
      category: "Growth"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 bg-slate-50 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-bold mb-6"
          >
            Upcoming <span className="text-brand-green">Events</span>
          </motion.h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Join our expert-led sessions to stay ahead of financial trends and network with industry leaders.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 group"
            >
              <div className="aspect-video overflow-hidden relative">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute top-4 left-4 px-4 py-1.5 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-green">
                  {event.category}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-4 group-hover:text-brand-green transition-colors">{event.title}</h3>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <Calendar className="w-4 h-4 text-brand-green" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <Clock className="w-4 h-4 text-brand-green" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <MapPin className="w-4 h-4 text-brand-green" />
                    {event.location}
                  </div>
                </div>
                <button className="w-full py-4 rounded-2xl border border-slate-200 font-bold hover:bg-brand-dark hover:text-white transition-all">
                  Register Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-brand-green rounded flex items-center justify-center text-white font-bold">C</div>
              <span className="text-xl font-bold tracking-tight">Credence</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Elevating business finances through expert advisory and innovative accounting solutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h5 className="font-bold mb-8">Services</h5>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-brand-green transition-colors">Tax Advisory</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Audit & Assurance</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Business Valuation</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Risk Management</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">CFO Outsourcing</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-8">Quick Links</h5>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link to="/" className="hover:text-brand-green transition-colors">Home</Link></li>
              <li><Link to="/events" className="hover:text-brand-green transition-colors">Events</Link></li>
              <li><a href="#process" className="hover:text-brand-green transition-colors">Our Process</a></li>
              <li><a href="#contact" className="hover:text-brand-green transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-8">Our Offices</h5>
            <ul className="space-y-6 text-sm text-slate-500">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-brand-green flex-shrink-0" />
                <span>Plot 45, Garki District, Abuja, FCT, Nigeria</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-brand-green flex-shrink-0" />
                <span>hello@credence.com</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-brand-green flex-shrink-0" />
                <span>+234 (0) 900 000 0000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-400 font-medium">
          <p>© 2024 Credence Professional Services. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <ScrollToHash />
        <Navbar />
        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/events" element={<EventsPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

const ScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return null;
};

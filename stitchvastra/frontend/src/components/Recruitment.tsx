import React, { useState } from 'react';
import { 
  Home, 
  Scissors, 
  Users, 
  Heart, 
  HelpCircle, 
  Mail, 
  LogIn, 
  Menu, 
  X,
  ArrowRight,
  Sparkles,
  GraduationCap,
  HandHeart,
  Clock,
  CheckCircle2
} from 'lucide-react';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Scissors className="h-8 w-8 text-rose-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">StitchVastra</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-gray-600 hover:text-rose-600 transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" />
              Home
            </a>
            <a href="/services" className="text-gray-600 hover:text-rose-600 transition-colors">Products & Services</a>
            <a href="/join-us" className="text-gray-600 hover:text-rose-600 transition-colors">Why Join Us</a>
            <a href="/impact" className="text-gray-600 hover:text-rose-600 transition-colors flex items-center gap-1">
              <Heart className="w-4 h-4" />
              Social Impact
            </a>
            <a href="/faq" className="text-gray-600 hover:text-rose-600 transition-colors flex items-center gap-1">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </a>
            <a href="/contact" className="text-gray-600 hover:text-rose-600 transition-colors flex items-center gap-1">
              <Mail className="w-4 h-4" />
              Contact
            </a>
            <button className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors flex items-center gap-1">
              <LogIn className="w-4 h-4" />
              Login
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/" className="block px-3 py-2 text-gray-600 hover:text-rose-600 transition-colors">Home</a>
              <a href="/services" className="block px-3 py-2 text-gray-600 hover:text-rose-600 transition-colors">Products & Services</a>
              <a href="/join-us" className="block px-3 py-2 text-gray-600 hover:text-rose-600 transition-colors">Why Join Us</a>
              <a href="/impact" className="block px-3 py-2 text-gray-600 hover:text-rose-600 transition-colors">Social Impact</a>
              <a href="/faq" className="block px-3 py-2 text-gray-600 hover:text-rose-600 transition-colors">FAQ</a>
              <a href="/contact" className="block px-3 py-2 text-gray-600 hover:text-rose-600 transition-colors">Contact</a>
              <button className="w-full text-left px-3 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors">
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function ImpactCard({ number, text }: { number: string; text: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center">
      <p className="text-3xl font-bold text-rose-600 mb-2">{number}</p>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}

function TestimonialCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <p className="text-gray-600 italic mb-4">"{quote}"</p>
      <div>
        <p className="font-semibold text-gray-800">{author}</p>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </div>
  );
}

function StepCard({ icon: Icon, title, description }: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center mb-4">
        <Icon className="w-8 h-8 text-rose-600 mr-3" />
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function App() {
  const steps = [
    {
      icon: Users,
      title: "Sign Up",
      description: "Create a free account on StitchVastra and become part of our community."
    },
    {
      icon: GraduationCap,
      title: "Training",
      description: "We'll help you learn and grow your skills to provide top-quality stitching."
    },
    {
      icon: Sparkles,
      title: "Get Started",
      description: "Start printing, stitching, or designing, and earn money from your craft."
    }
  ];

  const policies = [
    {
      icon: HandHeart,
      title: "Fair Compensation",
      description: "Receive competitive wages for your work, paid directly and on time."
    },
    {
      icon: CheckCircle2,
      title: "Quality Support",
      description: "Access to premium materials and ongoing technical support."
    },
    {
      icon: Clock,
      title: "Flexible Hours",
      description: "Work from home or your chosen workspace at times that suit you."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative pt-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="Rural tailors working"
            className="w-full h-[600px] object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 pb-20 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl font-bold mb-6">Empowering Rural Artisans, One Stitch at a Time</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join us in bringing fashion to the world while uplifting communities through craftsmanship
          </p>
          <button className="inline-flex items-center px-8 py-3 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700 transition-colors">
            Join the Movement
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <ImpactCard number="500+" text="Rural Artisans Empowered" />
          <ImpactCard number="20+" text="Communities Uplifted" />
          <ImpactCard number="₹2Cr+" text="Earnings Generated" />
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">How It Works</h2>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Join our community in three simple steps and start your journey towards financial independence
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} />
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-rose-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Voices from Our Community</h2>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            Hear from artisans who have transformed their lives with StitchVastra
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <TestimonialCard
              quote="StitchVastra has given me the opportunity to work from home while taking care of my family. The training and support have been invaluable."
              author="Lakshmi Devi"
              role="Artisan from Rajasthan"
            />
            <TestimonialCard
              quote="I've been able to double my income and teach others in my village. It's not just work, it's about building a better future for our community."
              author="Ramesh Kumar"
              role="Master Craftsman"
            />
          </div>
        </div>
      </div>

      {/* Policies */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Our Commitment to You</h2>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          We believe in creating a supportive environment where artisans can thrive
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {policies.map((policy, index) => (
            <StepCard key={index} {...policy} />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-rose-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our growing community of artisans and be part of a movement that's transforming rural lives
          </p>
          <button className="inline-flex items-center px-8 py-3 bg-white text-rose-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            Apply Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Scissors className="h-8 w-8 text-rose-500" />
                <span className="ml-2 text-xl font-bold">StitchVastra</span>
              </div>
              <p className="text-gray-400">Empowering rural artisans through sustainable fashion</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-rose-500 transition-colors">Home</a></li>
                <li><a href="/services" className="hover:text-rose-500 transition-colors">Services</a></li>
                <li><a href="/impact" className="hover:text-rose-500 transition-colors">Impact</a></li>
                <li><a href="/faq" className="hover:text-rose-500 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: contact@stitchvastra.com</li>
                <li>Phone: +91 123 456 7890</li>
                <li>Address: Bangalore, India</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-rose-500 transition-colors">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-rose-500 transition-colors">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-rose-500 transition-colors">Twitter</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 StitchVastra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
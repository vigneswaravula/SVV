import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Recruitment from './components/Recruitment'; // Adjust the path if needed
import { ThemeProvider } from './components/context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar isSignedIn={false} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/joinus" element={<Recruitment />} />
            {/* You can add other routes here */}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}
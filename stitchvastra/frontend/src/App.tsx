import React from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import { ThemeProvider } from './components/context/ThemeContext';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

export default function App() {
  return (
    <AuthProvider> {/* Wrap the application in AuthProvider */}
      <ThemeProvider>
        <div className="min-h-screen">
          <Navbar isSignedIn={false} />
          <HomePage />
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

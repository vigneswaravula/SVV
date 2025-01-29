import { signInWithGoogle } from "../../firebaseConfig"; // Adjust the path if necessary
import React, { useState } from 'react';
import { LogIn, X, User, Mail, Lock, UserCog, CheckCircle2, MessageSquare, Chrome } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onSignIn: () => void;
}

export default function AuthModal({ onClose, onSignIn }: AuthModalProps) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [userType, setUserType] = useState('customer');
  const [rememberMe, setRememberMe] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isOtpLogin, setIsOtpLogin] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!isOtpLogin && !formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isOtpLogin && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (isOtpLogin && otpSent && !formData.otp) {
      newErrors.otp = 'OTP is required';
    }

    if (!isLoginTab) {
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowSuccess(true);
      
      setTimeout(() => {
        onSignIn();
        onClose();
      }, 1500);
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors({ email: 'Please enter a valid email' });
      return;
    }
    setOtpSent(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-bold text-gray-900">
              {isLoginTab ? 'Sign In Successful!' : 'Account Created Successfully!'}
            </h2>
            <p className="text-gray-600">
              {isLoginTab ? 'Welcome back to StitchVastra' : 'Welcome to StitchVastra'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{isLoginTab ? 'Sign In' : 'Sign Up'}</h2>
          <button onClick={onClose}>
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={isOtpLogin && !otpSent ? handleSendOtp : handleSubmit} className="space-y-4">
          {!isLoginTab && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {isLoginTab && isOtpLogin ? (
            otpSent ? (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleInputChange}
                    placeholder="Enter OTP sent to your email"
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.otp ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.otp && (
                  <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
                )}
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="text-sm text-indigo-600 hover:text-indigo-700"
                >
                  Resend OTP
                </button>
              </div>
            ) : null
          ) : (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          )}

          {!isLoginTab && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {isLoginTab && (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <a href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-700">
                  Forgot password?
                </a>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">User Type</label>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="customer"
                      name="userType"
                      value="customer"
                      checked={userType === 'customer'}
                      onChange={(e) => setUserType(e.target.value)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label htmlFor="customer" className="text-sm text-gray-600">
                      Customer
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="admin"
                      name="userType"
                      value="admin"
                      checked={userType === 'admin'}
                      onChange={(e) => setUserType(e.target.value)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label htmlFor="admin" className="text-sm text-gray-600 flex items-center gap-1">
                      <UserCog className="h-4 w-4" />
                      Admin
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="vastrakar"
                      name="userType"
                      value="vastrakar"
                      checked={userType === 'vastrakar'}
                      onChange={(e) => setUserType(e.target.value)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label htmlFor="vastrakar" className="text-sm text-gray-600 flex items-center gap-1">
                      <UserCog className="h-4 w-4" />
                      VastraKar
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            <LogIn className="h-5 w-5" />
            {isLoginTab 
              ? (isOtpLogin 
                  ? (otpSent ? 'Verify OTP' : 'Send OTP') 
                  : 'Sign In')
              : 'Sign Up'
            }
          </button>

          {isLoginTab && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="space-y-3">
              <button
  type="button"
  onClick={async () => {
    try {
      const user = await signInWithGoogle();
      console.log("User signed in:", user);
      onSignIn(); // Call the sign-in handler
      onClose();  // Close the modal
    } catch (error) {
      console.error("Google sign-in failed", error);
    }
  }}
  className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
>
  <Chrome className="h-5 w-5 text-red-500" />
  Continue with Google
</button>


                <button
                  type="button"
                  onClick={() => setIsOtpLogin(!isOtpLogin)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MessageSquare className="h-5 w-5 text-indigo-500" />
                  {isOtpLogin ? 'Sign in with Password' : 'Sign in with OTP'}
                </button>
              </div>
            </>
          )}

          {isLoginTab ? (
            <p className="text-center text-gray-600 text-sm">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsLoginTab(false);
                  setIsOtpLogin(false);
                }}
                className="text-indigo-600 hover:text-indigo-700"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p className="text-center text-gray-600 text-sm">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsLoginTab(true)}
                className="text-indigo-600 hover:text-indigo-700"
              >
                Sign in
              </button>
            </p>
          )}

          <p className="text-center text-xs text-gray-500">
            By continuing, you agree to our{' '}
            <a href="/terms" className="text-indigo-600 hover:text-indigo-700">Terms of Service</a>
            {' '}and{' '}
            <a href="/privacy" className="text-indigo-600 hover:text-indigo-700">Privacy Policy</a>
          </p>
        </form>
      </div>
    </div>
  );
}
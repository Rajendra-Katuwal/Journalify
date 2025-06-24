import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth';
import Button from '../common/Button';
import Input from '../common/Input';
import { toast } from 'react-toastify';

const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const { token } = useParams();

  // useEffect(() => {
  //   // Validate token on component mount
  //   // This would typically involve a backend request to verify the token
  //   // For now, we'll assume it's valid if it exists and has a minimum length
  //   if (!token || token.length < 10) {
  //     setTokenValid(false);
  //     toast.error('Invalid or expired password reset link');
  //   }
  // }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await resetPassword(token, password);
      toast.success('Password has been reset successfully');
      navigate('/auth/login');
    } catch (error) {
      toast.error(error.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!tokenValid) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="text-center mb-6">
            <svg 
              className="mx-auto h-12 w-12 text-red-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold mt-4 text-gray-800 dark:text-white">Invalid Reset Link</h2>
          </div>
          
          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
            The password reset link is invalid or has expired.
          </p>
          
          <div className="flex items-center justify-center">
            <Link to="/auth/forgot-password">
              <Button variant="primary">
                Request New Reset Link
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Set New Password</h2>
        
        <div className="mb-4">
          <Input
            label="New Password"
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Must be at least 8 characters long
          </p>
        </div>
        
        <div className="mb-6">
          <Input
            label="Confirm New Password"
            type="password"
            id="confirmPassword"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="flex items-center justify-center mb-6">
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
          </Button>
        </div>
        
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          Remember your password?{' '}
          <Link 
            to="/auth/login"
            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
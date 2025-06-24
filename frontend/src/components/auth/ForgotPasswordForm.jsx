import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';
import Input from '../common/Input';
import { toast } from 'react-toastify';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsSubmitting(true);

    try {
      await forgotPassword(email);
      setSubmitted(true);
      toast.success('Password reset link sent to your email');
    } catch (error) {
      toast.error(error.message || 'Failed to send reset link. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="text-center mb-6">
            <svg
              className="mx-auto h-12 w-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold mt-4 text-gray-800 dark:text-white">Check Your Email</h2>
          </div>

          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
            We've sent a password reset link to:
            <span className="block font-medium mt-1 text-indigo-600 dark:text-indigo-400">
              {email}
            </span>
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-justify">
            Please check your inbox and follow the instructions to reset your password.
            If you don't receive an email within a few minutes, check your spam folder.
          </p>

          <div className="flex items-center justify-center">
            <Link to="/auth/login">
              <Button variant="secondary">
                Back to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg px-8 pt-6 pb-4">

        <div className="mb-6">
          <Input
            label="Email"
            type="email"
            id="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-center">
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </div>

      </form>
    </div>
  );
};

export default ForgotPasswordForm;
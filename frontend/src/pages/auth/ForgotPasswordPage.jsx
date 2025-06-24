import React from 'react';
import { Link } from 'react-router-dom';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';

const ForgotPasswordPage = () => {
  return (
    <div className="w-full max-w-md p-4 space-y-4 bg-white rounded-lg dark:bg-gray-800">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Forgot Password</h1>
      </div>

      <ForgotPasswordForm />

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Remember your password?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
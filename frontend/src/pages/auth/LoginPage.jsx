import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => {
  const { isLoading } = useAuth();

  return (
    <div className="w-full max-w-md  space-y-8 bg-white rounded-lg dark:bg-gray-800">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Continue your journaling journey
        </p>
      </div>

      <LoginForm />

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            Sign up
          </Link>
        </p>
        <Link to="/forgot-password" className="block mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
          Forgot your password?
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
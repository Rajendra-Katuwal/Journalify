import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm';
import AuthLayout from '../../layouts/AuthLayout';

const RegisterPage = () => {
  return (
    // <AuthLayout>
      <div className="w-full max-w-md p-4 space-y-8 bg-white rounded-lg dark:bg-gray-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create an account</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Start your journaling journey today
          </p>
        </div>

        <RegisterForm />

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    // </AuthLayout>
  );
};

export default RegisterPage;
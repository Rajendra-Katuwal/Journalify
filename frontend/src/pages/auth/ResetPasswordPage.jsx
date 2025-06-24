import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import ResetPasswordForm from '../../components/auth/ResetPasswordForm';
import AuthLayout from '../../layouts/AuthLayout';
import { toast } from 'react-toastify';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const [isValidToken, setIsValidToken] = useState(false);
  const token = searchParams.get('token');
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Validate the token (in a real app, you would check with the API)
  //   if (!token) {
  //     toast.error('Invalid or missing password reset token');
  //     navigate('/forgot-password');
  //     return;
  //   }
    
  //   // For demo purposes, we're assuming the token is valid if it exists
  //   setIsValidToken(true);
    
  //   // In a real app, you would verify the token with your backend
  //   // authService.verifyResetToken(token).then(isValid => {
  //   //   if (!isValid) {
  //   //     toast.error('Invalid or expired password reset token');
  //   //     navigate('/forgot-password');
  //   //   } else {
  //   //     setIsValidToken(true);
  //   //   }
  //   // });
  // }, [token, navigate]);

  if (!isValidToken) {
    return null; // Don't render anything while checking the token
  }

  return (
    // <AuthLayout>
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reset Password</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Enter your new password
          </p>
        </div>

        <ResetPasswordForm token={token} />

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Remember your password?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    // </AuthLayout>
  );
};

export default ResetPasswordPage;
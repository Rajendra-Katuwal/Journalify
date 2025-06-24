import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Welcome to Journalify
        </h1>
        <p className="text-xl  mb-8">
          Your personal space for reflection, growth, and mindfulness
        </p>

        <div className="space-x-4">
          {user ? (
            <Link 
              to="/journal" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Go to Journal
            </Link>
          ) : (
            <>
              <Link 
                to="/login" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                Log In
              </Link>
              <Link 
                to="/register" 
                className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
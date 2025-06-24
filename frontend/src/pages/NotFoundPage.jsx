import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center overflow-hidden">
      <div className="text-center relative">
        {/* Animated 404 SVG */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 600 400" 
          className="mx-auto max-w-full h-72 mb-6"
        >
          {/* Background */}
          <rect width="100%" height="100%" fill="#f0f0f0" />

          {/* Broken Page Illustration */}
          <g className="broken-page">
            {/* Page Base */}
            <rect 
              x="150" 
              y="100" 
              width="300" 
              height="250" 
              fill="#ffffff" 
              stroke="#3B82F6" 
              strokeWidth="3"
              className="page-base"
            />

            {/* Cracked Effect */}
            <path 
              d="M150 200 L450 200" 
              stroke="#3B82F6" 
              strokeWidth="3" 
              strokeDasharray="10,10"
              className="crack-line animate-crack"
            />

            {/* Falling Fragments */}
            <g className="falling-fragments">
              <rect 
                x="200" 
                y="50" 
                width="50" 
                height="50" 
                fill="#E0E7FF" 
                transform="rotate(15)"
                className="fragment fragment-1 animate-fall-1"
              />
              <rect 
                x="350" 
                y="30" 
                width="40" 
                height="40" 
                fill="#DBEAFE" 
                transform="rotate(-10)"
                className="fragment fragment-2 animate-fall-2"
              />
            </g>

            {/* 404 Text */}
            <text 
              x="300" 
              y="200" 
              textAnchor="middle" 
              fontSize="72" 
              fontWeight="bold" 
              fill="#3B82F6"
              className="404-text"
            >
              404
            </text>
          </g>
        </svg>

        {/* Page Content */}
        <div className="px-4">
          <p className="text-2xl text-gray-600 mb-4">
            Oops! Page Not Found
          </p>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed or does not exist.
          </p>
          <Link 
            to="/" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 inline-block"
          >
            Go to Homepage
          </Link>
        </div>
      </div>

      {/* Tailwind CSS cannot handle complex animations, so we'll add custom styles */}
      <style jsx>{`
        @keyframes crack {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 20; }
        }
        @keyframes fall-1 {
          0% { 
            transform: translateY(0) rotate(15deg);
            opacity: 1;
          }
          100% { 
            transform: translateY(300px) rotate(45deg);
            opacity: 0;
          }
        }
        @keyframes fall-2 {
          0% { 
            transform: translateY(0) rotate(-10deg);
            opacity: 1;
          }
          100% { 
            transform: translateY(250px) rotate(-30deg);
            opacity: 0;
          }
        }
        .animate-crack {
          animation: crack 0.5s linear infinite;
        }
        .animate-fall-1 {
          animation: fall-1 2s ease-in forwards;
          animation-delay: 0.5s;
        }
        .animate-fall-2 {
          animation: fall-2 2s ease-in forwards;
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;
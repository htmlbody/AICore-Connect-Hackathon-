import React, { useId } from 'react';

const Logo = ({ size = 40, className = "", light = false }) => {
  const gradientId = useId();
  
  return (
    <div 
      className={className}
      style={{ 
        width: size, 
        height: size, 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        <circle cx="50" cy="50" r="45" fill="#10b981" fillOpacity="0.2" />
        <path 
          d="M50 20C66.5685 20 80 33.4315 80 50C80 66.5685 66.5685 80 50 80C33.4315 80 20 66.5685 20 50" 
          stroke={`url(#${gradientId})`} 
          strokeWidth="8" 
          strokeLinecap="round" 
        />
        <path 
          d="M50 35C58.2843 35 65 41.7157 65 50C65 58.2843 58.2843 65 50 65C41.7157 65 35 58.2843 35 50" 
          stroke={`url(#${gradientId})`} 
          strokeWidth="6" 
          strokeLinecap="round" 
        />
        <circle cx="50" cy="50" r="8" fill={light ? "#10b981" : "#fff"} />
        <defs>
          <linearGradient id={gradientId} x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10b981" />
            <stop offset="1" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Logo;

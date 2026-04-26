import React from 'react';

const Logo = ({ size = 40, className = "", light = false }) => {
  return (
    <div 
      className={className}
      style={{ 
        width: size, 
        height: size, 
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: light ? 'none' : 'drop-shadow(0 0 12px rgba(16, 185, 129, 0.3))',
      }}
    >
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Background Aura Glow */}
        <circle cx="50" cy="50" r="45" fill="url(#aura_grad)" fillOpacity={light ? "0.1" : "0.2"} />
        
        {/* Galaxy Spiral Path 1 */}
        <path 
          d="M50 20C66.5685 20 80 33.4315 80 50C80 66.5685 66.5685 80 50 80C33.4315 80 20 66.5685 20 50" 
          stroke="url(#galaxy_grad)" 
          strokeWidth="8" 
          strokeLinecap="round"
          strokeOpacity="0.8"
        />
        
        {/* Galaxy Spiral Path 2 */}
        <path 
          d="M50 35C58.2843 35 65 41.7157 65 50C65 58.2843 58.2843 65 50 65C41.7157 65 35 58.2843 35 50" 
          stroke="url(#galaxy_grad)" 
          strokeWidth="6" 
          strokeLinecap="round"
        />

        {/* Neural Core Star */}
        <circle cx="50" cy="50" r="8" fill="url(#core_grad)">
          <animate 
            attributeName="r" 
            values="7;9;7" 
            dur="3s" 
            repeatCount="indefinite" 
          />
        </circle>

        {/* Orbiting Stars */}
        <circle cx="75" cy="35" r="3" fill="#fff" opacity="0.8">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="25" cy="65" r="2.5" fill="#fff" opacity="0.6">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="50" cy="15" r="2" fill="#10b981">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
        </circle>

        <defs>
          <radialGradient id="aura_grad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 50) rotate(90) scale(45)">
            <stop stopColor="#10b981" />
            <stop offset="1" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>
          
          <linearGradient id="galaxy_grad" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10b981" />
            <stop offset="1" stopColor="#6366f1" />
          </linearGradient>

          <radialGradient id="core_grad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 50) rotate(90) scale(8)">
            <stop stopColor="#fff" />
            <stop offset="1" stopColor="#10b981" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Logo;

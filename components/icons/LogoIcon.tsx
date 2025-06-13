
import React from 'react';

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 100 100" 
    xmlns="http://www.w3.org/2000/svg" 
    {...props}
    fill="currentColor"
    aria-label="Logo de Cocinando Sonrisas"
  >
    <defs>
      <linearGradient id="smileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'rgb(2, 132, 199)', stopOpacity: 1 }} /> 
        <stop offset="100%" style={{ stopColor: 'rgb(14, 165, 233)', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    {/* Simplified representation for "Cocinando Sonrisas" (Cooking Smiles) */}
    <path 
      d="M50 15 C 20 15, 20 50, 20 50 C 20 80, 50 95, 50 95 C 50 95, 80 80, 80 50 C 80 50, 80 15, 50 15 Z" 
      fill="url(#smileGradient)" 
      transform="rotate(10 50 50)"
    />
    <path 
      d="M35 60 Q 50 75, 65 60" 
      stroke="white" 
      strokeWidth="5" 
      fill="transparent" 
      strokeLinecap="round"
    />
    <circle cx="38" cy="45" r="5" fill="white" />
    <circle cx="62" cy="45" r="5" fill="white" />
  </svg>
);
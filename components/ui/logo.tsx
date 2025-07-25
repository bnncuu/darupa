
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {/* You can replace this with your actual SVG or image logo */}
      <span className="text-2xl font-bold text-gray-900 dark:text-white">YourLogo</span>
    </div>
  );
};

export default Logo;

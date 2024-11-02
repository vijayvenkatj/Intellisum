import React from 'react';

interface LogoProps {
  className?: string; 
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className='font-bold'>
        <span className='text-white'>IntelliSum</span>
      </div>
    </div>
  );
};

export default Logo;
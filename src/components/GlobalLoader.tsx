import React from 'react';
import AnimatedShapeLoader from './loader';

interface GlobalLoaderProps {
  isLoading: boolean;
}

const GlobalLoader: React.FC<GlobalLoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center transition-opacity duration-300">
      <div className="transform scale-[0.25]">
        <AnimatedShapeLoader className="w-auto h-auto bg-transparent" />
      </div>
    </div>
  );
};

export default GlobalLoader;

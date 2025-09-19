import React from 'react';

interface LoadingProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

const Loading: React.FC<LoadingProps> = ({ 
  message = "Cargando...", 
  size = 'medium' 
}) => {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  };

  return (
    <div className="loading-container">
      <div className="loading-content">
        <img 
          src="/loading.gif" 
          alt="Loading..." 
          className={`loading-gif ${sizeClasses[size]}`}
        />
        <p className="loading-message rickFont">{message}</p>
      </div>
    </div>
  );
};

export default Loading;

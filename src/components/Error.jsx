import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Error = ({ message, onRetry }) => {
  return (
    <div className="error">
      <AlertTriangle size={48} className="error-icon" />
      <h3>Something went wrong</h3>
      <p>{message}</p>
      {onRetry && (
        <button className="retry-button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default Error;
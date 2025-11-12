import React from 'react';
import { Loader } from 'lucide-react';

const Loading = () => {
  return (
    <div className="loading">
      <div className="spinner">
        <Loader size={32} className="spinner-icon" />
      </div>
      <p>Searching GitHub...</p>
    </div>
  );
};

export default Loading;
import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
    return (
        <div className="loading-spinner-wrapper">
            <div className="apple-style-spinner" aria-label="로딩중" role="status"></div>
        </div>
    );
};

export default LoadingSpinner;
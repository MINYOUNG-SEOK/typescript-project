// src/components/LoadingSpinner/LoadingSpinner.tsx

import React from 'react';
import './LoadingSpinner.css';
import spinnerImage from '../../assets/icon-loading-spinner.svg'

const LoadingSpinner = () => {
    return (
        <div className="loading-spinner-wrapper">
            <img src={spinnerImage} alt="로딩중" className="loading-spinner-img" />
        </div>
    );
};

export default LoadingSpinner;
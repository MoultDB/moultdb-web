import React from 'react';
import './loading.css'

export default function Loading() {
    return (
        <div className="d-flex align-items-center">
            <strong>Loading</strong>
            <div className="spinner-border ml-2" role="status" aria-hidden="true"/>
        </div>
    );
}

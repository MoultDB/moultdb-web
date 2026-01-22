import React from 'react';
import './loading.css'

export default function Loading({ text = "Loading..." }) {
    return (
        <div className="d-flex align-items-center">
            <strong>{text}</strong>
            <div className="spinner-border ml-2" role="status" aria-hidden="true"/>
        </div>
    );
}

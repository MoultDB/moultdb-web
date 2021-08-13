import React from 'react';
import Timeline from "../timeline/timeline";

export default function News() {
    return (
        <div className="row">
            <div className='col-sm-10 offset-sm-1'>
                <h1>News</h1>
                <Timeline/>
            </div>
        </div>
    );
}
import React, { useState } from "react";

export const DownloadJsonButton = ({apiUrl}) => {

    const [errorMessage, setErrorMessage] = useState('');

    const handleDownload = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            const jsonString = JSON.stringify(data, null, 2); // Beautify JSON
            const blob = new Blob([jsonString], {type: 'application/json'});

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `MoultDB export - genes.json`; // File name
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            setErrorMessage(''); // Resets the error message if everything goes well
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="dt-buttons d-flex align-items-center gap-3">
            <button className="dt-button buttons-copy buttons-html5" onClick={handleDownload}>
                Download JSON
            </button>
            {errorMessage && <p className="text-danger mt-2" role={"alert"}>{errorMessage}</p>}
        </div>
    );
};
import React from 'react';
import { usePDF } from 'react-to-pdf';
import TripDocument from './TripDocument'; // Import your component

export default function PDFGenerator(){
    // 1. Initialize the usePDF hook.
    //    - `toPDF` is the function we'll call to start the download.
    //    - `targetRef` is a ref we'll attach to the component we want to print.
    const { toPDF, targetRef } = usePDF({ filename: 'MyTripDocument.pdf' });

    return (
        <div>
            {/* 2. The component you want to download. */}
            {/* We attach the `targetRef` to it. The component will render, but we can hide it */}
            {/* from the screen if we only want it for PDF generation. */}
            {/* This is a common approach to prevent it from showing on the page. */}
            <div style={{ position: 'absolute', left: '-9999px' }}>
                <TripDocument ref={targetRef} />
            </div>

            {/* 3. The download button. */}
            {/* We call the `toPDF` function in the onClick handler. */}
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Download Your Trip Document</h2>
                <p>Click the button below to save your personalized itinerary as a PDF.</p>
                <button
                    onClick={() => toPDF()}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        marginTop: '20px'
                    }}
                >
                    Download PDF
                </button>
            </div>
        </div>
    );
};


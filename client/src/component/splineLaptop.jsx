import React, { useEffect, useState } from 'react';
import { Application } from '@splinetool/runtime';
import { useRef } from 'react';

export const SplineLap = () => {
    const canvasRef = useRef(null);
    const appRef = useRef(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const app = new Application(canvasRef.current);
        appRef.current = app; // Store the app instance in appRef

        app.load('https://prod.spline.design/0lIdCpJ5AeWlt2Aa/scene.splinecode');

        return () => {
            if (appRef.current && typeof appRef.current.destroy === 'function') {
                appRef.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth <= 768); // Change the threshold according to your needs
        };

        // Check screen size on initial mount
        checkScreenSize();

        // Add event listener to listen for screen size changes
        window.addEventListener('resize', checkScreenSize);

        // Remove event listener on component unmount
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    if (isSmallScreen) {
        return null; // Don't render the component for small screens
    }

    return (
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    );
};

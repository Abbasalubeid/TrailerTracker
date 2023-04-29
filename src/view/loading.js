import React from 'react';
import "../styles/loading.css";

export default function Loading({ error, children }) {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer); // Clean up the timer when the component unmounts
    }, []);

    if (error && !loading) {
        return <div className="error-container">{error.message}</div>
    }

    if (children && !loading) {
        return children;
    }

    return <img className="loading-container" src="/Infinity-1s-200px.svg"/>;
}

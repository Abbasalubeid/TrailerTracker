import React from "react";
import "../styles/loading.css";

export default function Loading({ loading, error, children }) {
  // const [Fixedloading, setFixedLoading] = React.useState(true);

  // React.useEffect(() => {
  //   setFixedLoading(true);

  //   const timer = setTimeout(() => {
  //     setFixedLoading(false);
  //   }, 200);

  //   return () => clearTimeout(timer); // Clean up the timer when the component unmounts
  // }, []);

  if (error && !loading) {
    return (
      <div className="error-container">
        <img src="/error-icon-25240.png" alt="error" />
        <p>{error.message}</p>
      </div>
    );
  }

  if (children && !loading ) {
    return children;
  }

  return (
    <img
      className="loading-container"
      src="/Infinity-1s-200px.svg"
      alt="Loading"
    />
  );
}

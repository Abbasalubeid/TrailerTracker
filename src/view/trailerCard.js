import React from "react";
import "../styles/movieDetails.css";
import YouTube from "react-youtube";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function TrailerCard(props) {
  const [isReady, setIsReady] = React.useState(false);

  function handleVideoErrorACB() {
    props.onVideoError(props.trailer.id);
  }

  function handleOnReady() {
    setIsReady(true);
  }

  return (
    <div className="trailer-card">
      <div className="trailer-vid">
        {!isReady && (
          <SkeletonTheme
          baseColor="rgba(23, 23, 23, 1)"
            highlightColor="#ffffff"
          >
            <Skeleton
              width="100%"
              height="0"
              style={{ paddingTop: "56.25%", borderRadius: "25px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", transition: "all 0.3s ease-in-out" }}
            />
          </SkeletonTheme>
        )}
        <YouTube
          videoId={props.trailer?.key}
          onError={handleVideoErrorACB}
          onReady={handleOnReady}
          style={{ display: isReady ? "block" : "none", borderRadius: "25px" }}
        />
      </div>
    </div>
  );
}

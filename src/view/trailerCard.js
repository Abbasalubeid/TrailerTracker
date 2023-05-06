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
          baseColor="rgba(16, 16, 16, 1)"
          highlightColor="#838383"
          >
            <Skeleton
             height={450} duration={2}
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

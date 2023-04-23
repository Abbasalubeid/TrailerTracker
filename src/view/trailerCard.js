import "../styles/movieDetails.css";
import YouTube from "react-youtube";

export default function TrailerCard(props) {


  function handleVideoErrorACB() {
    props.onVideoError();
  }

  return (
    <div className="trailer-card">
      {!props.videoError && (
        <div className="trailer-vid">
          <YouTube videoId={props.trailer?.key} onError={handleVideoErrorACB} />
        </div>
      )}
    </div>
  );
}

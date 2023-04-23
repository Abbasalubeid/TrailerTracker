import "../styles/movieDetails.css";
import YouTube from "react-youtube";

export default function TrailerCard(props) {

  function handleVideoErrorACB() {
    props.onVideoError(props.trailer.id);
  }

  return (
    <div className="trailer-card">
      <div className="trailer-vid">
        <YouTube videoId={props.trailer?.key} onError={handleVideoErrorACB} />
      </div>
    </div>
  );
}

import "../styles/movieDetails.css"
import YouTube from 'react-youtube';


export default function TrailerCard(props){

    console.log(props.trailer);

    return(
        <div className='trailer-vid'>
            <YouTube 
                videoId={props.trailer?.key}
            />
        </div>
    );

}
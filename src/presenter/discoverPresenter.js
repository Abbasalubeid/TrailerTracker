import React from "react";
import {discoverMovies} from "../model/fetchSource.js"

export default function DiscoverPresenter(){
    const [movies, setMovies] = React.useState([]);

    function mountACB(){
        discoverMovies().then((movies) => setMovies(movies));
    }
    console.log(movies);

    React.useEffect(mountACB, []);

    return (
        <>
        Hello
        </>
    );
}
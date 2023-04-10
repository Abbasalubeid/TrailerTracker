import React from "react";
import {discoverMovies} from "../model/fetchSource.js"
import MovieCardView from "../view/movieCardView.js";

export default function MovieCardPresenter(){
    const [promise, setPromise] = React.useState(null);
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);

    function promiseHasChangedACB() {
        setData(null);
        setError(null);
        let cancelled = false;
    
        function changedAgainACB() { cancelled = true; }
        if (promise)
            promise.then(function saveData(data) { if (!cancelled) setData(data); }).
                catch(function saveError(error) { if (!cancelled) setError(error); });
    
        return changedAgainACB;
    }

    function mountACB(){
        setPromise(discoverMovies())
    }

    React.useEffect(mountACB, []);
    React.useEffect(promiseHasChangedACB, [promise]);

    return(
        <MovieCardView>
            
        </MovieCardView>
    )
}
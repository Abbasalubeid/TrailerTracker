import React from "react";
import {discoverMovies} from "../model/fetchSource.js"

export default function movieCardPresenter(){
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


    React.useEffect(promiseHasChangedACB, []);
}
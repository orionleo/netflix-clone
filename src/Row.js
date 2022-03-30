import React, { useState, useEffect } from 'react'
import axios from './axios';
import "./row.css"
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/"
let opts = {
    height: "390px",
    width: "100%",
    playerVars: {
        autoplay: 1,
    },
};
function Row({ title, fetchUrl, isLargeRow }) {
    let [movies, SetMovies] = useState([]);
    let [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            let request = await axios.get(fetchUrl);
            // console.log(request.data.results);
            SetMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    // console.table(movies);

    const handleClick = (movie) => {
        // const url = movie.original_title;
        // const urlParams = new URLSearchParams(new URL(url).search);
        if (trailerUrl) {
            setTrailerUrl();
        }
        else {
            movieTrailer(movie?.name||movie?.original_title)
                .then((url) => {
                    console.log(url)
                    const urlParams = new URLSearchParams(new URL(url).search);
                    // console.log(urlParams.get('v'))
                    setTrailerUrl(urlParams.get('v'));
                    // console.log(new URL(url).search); 
                })
                .catch((error) => console.log(error))
            // console.log(movie);
        }
        // console.log(movie);
    }

    return (
        <div className='row'>
            {/* title */}
            <h2>{title}</h2>
            {/* container->posters */}
            <div className='row__posters'>
                {/* several row_posters */}
                {movies.map((movie, index) => {
                    return <img
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        onClick={() => handleClick(movie)}
                        src={`${base_url}${movie.poster_path}`} alt={movie.name} key={movie.id} id={index} />
                })}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row;
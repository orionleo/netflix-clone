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

function Collection({ title, fetchUrl, isLargeRow }) {
    // console.log(fetchUrl);
    let [movies, SetMovies] = useState([]);
    let [trailerUrl, setTrailerUrl] = useState("");

    const handleClick = (movie) => {
        // const url = movie.original_title;
        // const urlParams = new URLSearchParams(new URL(url).search);
        if (trailerUrl) {
            setTrailerUrl();
        }
        else {
            movieTrailer(movie?.original_title || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    console.log(urlParams.get('v'))
                    // console.log(movie?.original_title);
                    setTrailerUrl(urlParams.get('v'));
                    // console.log(new URL(url).search); 
                })
                .catch((error) => console.log(error))
            // console.log(movie);
        }
    }

    useEffect(() => {
        async function fetchData() {
            let request = await axios.get(fetchUrl);
            // console.log(request.data.parts);
            SetMovies(request.data.parts);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    return (
        <div className='row'>
            {/* title */}
            <h2>{title}</h2>

            {/* container->posters */}
            <div className='row__posters'>
                {/* several row_posters */}
                {movies.map((movie, index) => {
                    return <img
                        //    className={`row__poster ${isLargeRow&&"row__posterLarge"}`}
                        className={`row__poster collection`}
                        onClick={()=>handleClick(movie)}
                        // src={`${base_url}${isLargeRow?movie.poster_path:movie.backdrop_path}`} alt={movie.name} key={movie.id} id={index} />
                        src={`${base_url}${movie.poster_path}`} alt={movie.name} key={movie.id} id={index} />
                })}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Collection;
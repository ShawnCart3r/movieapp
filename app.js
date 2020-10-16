import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();





const Movie_API_URL = `https://www.omdbapi.com/?apikey=${process.env.964e63b6}`;

export const fetchMovies = (search = 'war') => (
    fetch( `${MOVIE_API_URL}&s=${search}`)
    .then(response => response.json())
);

import React from "react";

const Movie = ({ movie }) => {
    return (
        <figure className="card">
            <img src={movie.Poster}
            alt={`the movie titled: ${movie/Title}`}/>
            <figcaption>{movie.Title}</figcaption>
        </figure>
    );
};

export default Movie;

export const initialState = {
    loading: true,
    movies: [],
    errorMessage: null
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "SEARCH_MOVIES_SUCCESS":
            return {
                loading: false,
                movies: action.payload,
                errorMessage: null,
            };
            default:
                return state;
    }
};

import React, { useReducer } from 'react';
import { initialState, reducer } from "./reducer";
import Movie from "../Movie/Movie"

export const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { movies,errorMessage,loading } = state;

    return (
        <div className="wrapper">
            <h2><strong>Movies</strong></h2>
            <div className="cards">
                {loading && 
                <span>loading...</span>
                }
                {errorMessage &&
        <span>{errorMessage}</span>
      }

      {movies &&
        movies.map((movie, index) => (
          <Movie key={`${index}-${movie.Title}`} movie={movie} />
        ))
      }
            </div>
        </div>
    );
};

import React, { useEffect, useReducer } from 'react';
import { fetchMovies } from '../../api/api'; 

export const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetchMovies()
        .then(jsonResponse => {
            dispatch({
                type:"SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.Search
            });
        });

    });
}
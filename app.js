import {
    getMovie,
    updateMovie,
    removeMovie,
    createMovie,
    displayMovies,
} from "./backend.js";
import { Movie } from "./movie.js";

const MovieApp = (function () {
    let five = 5;

    return {
        five,
    };
})();
console.log(MovieApp.five);
displayMovies();
// getMovie();

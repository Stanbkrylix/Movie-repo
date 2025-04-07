import {
    getMovie,
    updateMovie,
    removeMovie,
    createMovie,
    displayMovies,
} from "./backend.js";

// Movie class
import { Movie } from "./movie.js";

const MovieApp = (function () {
    const allMoviesLinks = document.querySelector(".all-movies-link");
    const watchedMoviesLinks = document.querySelector(".watched-movies-link");
    const planToWatchedLink = document.querySelector(".plan-to-watch-link");
    const moviesSection = document.querySelector(".movies-section");
    const trackAllMovies = false;

    async function init() {
        setupEventListener();
        await renderMoviesCards();
    }

    function setupEventListener() {
        allMoviesLinks.addEventListener("click", () => {
            trackAllMovies = true;
        });

        watchedMoviesLinks.addEventListener("click", () => {
            trackAllMovies = false;
        });

        planToWatchedLink.addEventListener("click", () => {
            trackAllMovies = false;
        });
    }

    async function renderMoviesCards() {
        moviesSection.innerHTML = "";

        if (moviesSection.innerHTML === "") {
            moviesSection.innerHTML =
                "<h1 class = 'no-movies-comment'>No Movies</h1>";
        }

        try {
            const movieData = await getMovie();

            //load movie into the section
            moviesSection.innerHTML = movieData
                .map((movie) => {
                    return cardHtml(movie);
                })
                .join("");
        } catch (error) {
            alert(error);
        }
    }

    function cardHtml(movie) {
        return `<div> <p>${movie.title}</p> </div>`;
    }

    return { init };
})();
// console.log(MovieApp.five);
displayMovies();
MovieApp.init();
// getMovie();

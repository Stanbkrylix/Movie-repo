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
    const moviesDiv = document.querySelector(".movies-div");
    const addBtn = document.querySelector(".add-btn");

    let trackAllMovies = false;
    let idOfEditCard = null;
    let genreArray = [];

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

        addBtn.addEventListener("click", (e) => {
            moviesDiv.innerHTML = "";
            moviesDiv.innerHTML = newCardHtml();
        });

        moviesDiv.addEventListener("click", async (e) => {
            const target = e.target;

            if (target.classList.contains("card-remove-btn")) {
                const cardElement = target.parentElement.parentElement;
                const cardId = cardElement.dataset.id;

                await movieToRemove(cardId);
                await renderMoviesCards();
            }

            if (target.classList.contains("card-edit-btn")) {
                const cardElement = target.parentElement.parentElement;
                const cardId = cardElement.dataset.id;
                idOfEditCard = cardId;

                const movieData = await getMovie();

                const intendedMovie = movieData.find(
                    (movie) => movie.id === cardId
                );

                moviesDiv.innerHTML = "";
                moviesDiv.innerHTML = renderEditCardHtml(intendedMovie);
            }

            if (target.classList.contains("new-card-submit-btn")) {
                await submitNewCardFunctionality();
            }

            if (target.classList.contains("new-card-cancel-btn")) {
                resetInputs();
                await renderMoviesCards();
            }

            if (target.classList.contains("edit-card-submit-btn")) {
                await submitEditCardFunctionality();
            }
        });

        moviesDiv.addEventListener("change", (e) => {
            const target = e.target;

            if (target.classList.contains("new-genre-select")) {
                const selectedValue = target.value;

                // if selectedValue is empty, and if array does not already have value
                if (
                    selectedValue !== "" &&
                    !genreArray.includes(selectedValue)
                ) {
                    console.log(genreArray.includes(selectedValue));
                    genreArray.push(selectedValue);

                    target.value = "";

                    const infoSpan = target.nextElementSibling;

                    if (
                        infoSpan &&
                        infoSpan.classList.contains("genre-count-info")
                    ) {
                        infoSpan.textContent = `${genreArray.length} ${
                            genreArray.length === 1 ? "genre" : "genres"
                        } selected`;
                    }
                }
            }
        });
    }

    function resetInputs() {
        const newMovieTitle = (document.querySelector(".new-card-title").value =
            "");
        // const newMovieGenre = (document.querySelector(
        //     ".new-genre-buttons"
        // ).value = "");
        const newMovieRating = (document.querySelector(
            ".new-card-rating"
        ).value = "");
        const newMovieWatchedCheckbox = (document.querySelector(
            ".new-card-watched-checkbox"
        ).checked = false);

        genreArray = [];
    }

    async function submitEditCardFunctionality() {
        const editCardTitle = document.querySelector(".edit-card-title");
        const editCardRating = document.querySelector(".edit-card-rating");
        const editCardWatched = document.querySelector(
            ".edit-card-watched-checkbox"
        );

        if (editCardRating.value === "" || editCardTitle.value === "")
            alert("All Fields must have a value");

        const movieData = await getMovie();
        const intendedMovie = movieData.find(
            (movie) => movie.id === idOfEditCard
        );

        intendedMovie.title = editCardTitle.value;
        intendedMovie.rating = editCardRating.value;
        intendedMovie.watched = editCardWatched.checked;

        await updateMovie(intendedMovie);
        await renderMoviesCards();

        // To reset value
        editCardTitle.value = "";
        editCardRating.value = "";
    }

    async function submitNewCardFunctionality() {
        // new card movies
        const newMovieTitle = document.querySelector(".new-card-title");
        const newMovieRating = document.querySelector(".new-card-rating");
        const newMovieWatchedCheckbox = document.querySelector(
            ".new-card-watched-checkbox"
        );

        if (
            newMovieTitle.value === "" ||
            newMovieRating.value === "" ||
            genreArray.length === 0
        ) {
            alert("Please fill out all text input fields");
            return;
        }

        const movie = new Movie(
            newMovieTitle.value,
            genreArray,
            newMovieRating.value,
            newMovieWatchedCheckbox.checked
        );
        resetInputs();
        await createMovie(movie);
        await renderMoviesCards();
    }

    async function movieToRemove(cardId) {
        try {
            const movieData = await getMovie();
            const movieToRemove = movieData.find(
                (movie) => movie.id === cardId
            );

            await removeMovie(movieToRemove);
        } catch (error) {
            alert(`This error is "${error}"`);
        }
    }

    async function renderMoviesCards() {
        moviesDiv.innerHTML = "";

        if (moviesDiv.innerHTML === "") {
            moviesDiv.innerHTML =
                "<h1 class = 'no-movies-comment'>No Movies</h1>";
        }

        try {
            const movieData = await getMovie();

            //load movie into the section
            moviesDiv.innerHTML = movieData
                .map((movie) => {
                    return cardHtml(movie);
                })
                .join("");
        } catch (error) {
            alert(error);
        }
    }

    function cardHtml(movie) {
        return `
        <div class="movie-card" data-id="${movie.id}">
        
            <div class="movie-card-title-div">
                <span class="title">Title:</span>
                <span class="card-title">${movie.title}</span>
            </div>

            <div class="movie-card-genre-div">
                <span class="title">Genre:</span>
                <div class="genre-buttons">${movie.genre
                    .map((g) => {
                        return `<span class="genre-tag" >${g}</span>`;
                    })
                    .join("")}</div>
            </div>

            <div class="movie-card-rating-div">
                <span class="rating">Rating:</span>
                <span class="card-rating">${movie.rating}/100</span>
            </div>

            <div class="movie-card-watched-div">
                <span class="watched">Watched:</span>
                <span class="card-watched">${
                    movie.watched === false ? "No" : "Yes"
                }</span>
            </div>
            <div class="movie-card-edit-remove-div" >
                <button class="card-edit-btn" >Edit</button>
                <button class="card-remove-btn" >Remove</button>
            </div>
        </div>
        
        
        `;
    }

    function newCardHtml() {
        return `
        
    <div class="new-movie-card slide-fade-in">
            <h1 class="new-movie-h1">New Movie</h1>
        <div class="new-movie-card-title-div">
            <span class="new-title">Title:</span>
            <input class="new-card-title" type="text">
        </div>

        <div class="new-movie-card-genre-div">
            <label for="genre-select"><span class="new-title">Genre:</span></label>
            <select class="new-genre-select" id="genre-select">
                <option value="">-- Select a genre --</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Horror">Horror</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Romance">Romance</option>
                <option value="Documentary">Documentary</option>
            </select>
            <span class="genre-count-info" style="margin-left: 3.5rem; padding:0.5rem; font-style: italic;"></span>     
        </div>

        <div class="new-movie-card-rating-div">
            <span class="new-rating">Rating:</span>
            <input class="new-card-rating" type="number">
        </div>

        <div class="new-movie-card-watched-div">
            <span class="new-watched">Watched:</span>
            <input class="new-card-watched-checkbox" type="checkbox" >
        </div>

        <div class="new-movie-card-submit-cancel-div">
            <button class="new-card-submit-btn">Submit</button>
            <button class="new-card-cancel-btn">Cancel</button>
        </div>

    </div>
        `;
    }

    function renderEditCardHtml(movie) {
        return `
        <div class="edit-movie-card slide-fade-in">
    <h1 class="edit-movie-h1">Edit Movie</h1>

    <div class="edit-movie-card-title-div">
        <span class="edit-title">Title:</span>
        <input class="edit-card-title" type="text" value ="${movie.title}">
    </div>

    <div class="edit-movie-card-genre-div">
        <label for="edit-genre-select"><span class="edit-title">Genre:</span></label>
        <select class="edit-genre-select" id="edit-genre-select">
            <option value="">-- Select a genre --</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Romance">Romance</option>
            <option value="Documentary">Documentary</option>
        </select>
        <span class="genre-count-info" style="margin-left: 3.5rem; padding:0.5rem; font-style: italic;">
            ${movie.genre.length} ${
            movie.genre.length > 1 ? "genres" : "genre"
        } selected
        </span>
    </div>

    <div class="edit-movie-card-rating-div">
        <span class="edit-rating">Rating:</span>
        <input class="edit-card-rating" type="number" value="${movie.rating}">
    </div>

    <div class="edit-movie-card-watched-div">
        <span class="edit-watched">Watched:</span>
        <input class="edit-card-watched-checkbox" type="checkbox" ${
            movie.watched ? "checked" : ""
        } >
    </div>

    <div class="edit-movie-card-submit-cancel-div">
        <button class="edit-card-submit-btn">Edit</button>
        <button class="edit-card-cancel-btn">Cancel</button>
    </div>
</div>

        
        `;
    }

    return { init };
})();
// console.log(MovieApp.five);
displayMovies();
MovieApp.init();
// getMovie();

async function data() {
    const response = await fetch(
        `https://67ed4a0a4387d9117bbd140e.mockapi.io/api/movies`
    );
    const movieData = await response.json();
    return movieData;
}

async function displayMovies() {
    try {
        const movieData = await data();
        console.log(movieData);
    } catch (error) {
        alert(`The Error: ${error}`);
    }
}

async function getMovie() {
    try {
        const movieData = await data();
        return movieData;
    } catch (error) {
        alert(error);
    }
}

async function createMovie(movie) {
    try {
        const response = await fetch(
            `https://67ed4a0a4387d9117bbd140e.mockapi.io/api/movies`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(movie),
            }
        );

        const movieData = await response.json();
        return movieData;
    } catch (error) {
        alert(error);
    }
}

async function updateMovie(movie) {
    try {
        const response = fetch(
            `https://67ed4a0a4387d9117bbd140e.mockapi.io/api/movies/${movie.id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(movie),
            }
        );
        const movieData = response.json();

        return movieData;
    } catch (error) {
        alert(error);
    }
}

async function removeMovie(movie) {
    console.log(movie);
    try {
        const response = await fetch(
            `https://67ed4a0a4387d9117bbd140e.mockapi.io/api/movies/${movie.id}`,
            {
                method: "DELETE",
            }
        );

        if (response.ok) {
            alert("Deleting...");
        }
    } catch (error) {
        alert(error);
    }
}

// async function
export { getMovie, displayMovies, removeMovie, createMovie, updateMovie };

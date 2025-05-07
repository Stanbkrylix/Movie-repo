async function data(userId) {
    try {
        const response = await fetch(
            `https://67ed4a0a4387d9117bbd140e.mockapi.io/api/movies?userId=${userId}`
        );
        if (!response.ok) throw new Error("Movie could not be found");

        const movieData = await response.json();
        return movieData;
    } catch (error) {
        alert(error);
    }
}

// To display data for debugging purposes
async function displayMovies(userId) {
    try {
        const movieData = await data(userId);
        return movieData;
    } catch (error) {
        alert(`The Error: ${error}`);
    }
}

async function getMovie(userId) {
    try {
        const movieData = await data(userId);

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
        const response = await fetch(
            `https://67ed4a0a4387d9117bbd140e.mockapi.io/api/movies/${movie.id}`,
            {
                method: "PUT",
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

async function removeMovie(movie) {
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

export { getMovie, displayMovies, removeMovie, createMovie, updateMovie };

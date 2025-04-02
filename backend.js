async function getMovie() {
    try {
        const response = await fetch(
            `https://67ed4a0a4387d9117bbd140e.mockapi.io/api/movies`
        );
        const movieData = await response.json();

        console.log(movieData);
        return movieData;
    } catch (error) {
        alert(error);
    }
}

export { getMovie };

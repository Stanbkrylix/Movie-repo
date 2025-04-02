import { getMovie } from "./backend.js";

const MovieApp = (function () {
    let five = 5;

    return {
        five,
    };
})();
console.log(MovieApp.five);
getMovie();

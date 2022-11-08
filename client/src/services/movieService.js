import axios from "axios";

export async function createMovie(movieData, userId) {
    return await axios.post('/create', {movieData, userId});
}

export async function getMostWatchedMovies() {
    return await axios.get('/movies/most-watched');
}

export async function getAllMovies() {
    return await axios.get('/movies');
}

export async function getOneMovie(movieId) {
    return await axios.post(`/details/movie`, movieId);
}

export async function searchMovies(searchedData) {
    return await axios.post('/movies/search', searchedData);
}

export async function editMovie(movieData, movieId) {
    return await axios.post('/details/movie/edit', {movieData, movieId});
}

export async function saveMovie(movieId, userId) {
    return await axios.post('/details/movie/save', {movieId, userId});
}

export async function unsaveMovie(movieId, userId) {
    return await axios.post('/details/movie/unsave', {movieId, userId});
}

export async function deleteMovie(movieId) {
    return await axios.post('/details/movie/delete', movieId);
}
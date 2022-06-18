const axios = require("axios").default;
const NotFoundError = require("../exceptions/NotFoundError");

class MoviesService {
  constructor() {
    this.BASE_URL = "https://api.themoviedb.org/3";
    this.API_KEY = "1535d2a383900b08bbc8e7d584f7acaa";
  }

  async getNowPlayingMovies({ page = 1 }) {
    const params = {
      api_key: this.API_KEY,
      page,
    };
    const response = await axios.get(`${this.BASE_URL}/movie/now_playing`, {
      params,
    });

    return response.data;
  }

  async getMovieDetails({ movieId }) {
    const params = {
      api_key: this.API_KEY,
    };

    try {
      const response = await axios.get(`${this.BASE_URL}/movie/${movieId}`, {
        params,
      });

      return response.data;
    } catch (error) {
      throw new NotFoundError("Movie tidak ditemukan");
    }
  }

  async searchMovies({ page, query = "" }) {
    const params = {
      api_key: this.API_KEY,
      page,
      query,
    };
    const response = await axios.get(`${this.BASE_URL}/search/movie`, {
      params,
    });

    return response.data;
  }
}

module.exports = MoviesService;

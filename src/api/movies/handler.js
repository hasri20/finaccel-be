const NotFoundError = require("../../exceptions/NotFoundError");

class MoviesHandler {
  constructor(service) {
    this._service = service;

    this.getNowPlayingMoviesHandler =
      this.getNowPlayingMoviesHandler.bind(this);

    this.getMovieDetailsHandler = this.getMovieDetailsHandler.bind(this);
  }

  async getNowPlayingMoviesHandler(request) {
    const { page } = request.query;
    const movies = await this._service.getNowPlayingMovies({ page });

    return {
      status: "success",
      data: {
        ...movies,
      },
    };
  }

  async getMovieDetailsHandler(request, h) {
    const { id: movieId } = request.params;

    try {
      const movies = await this._service.getMovieDetails({ movieId });

      return {
        status: "success",
        data: {
          ...movies,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
    }
  }
}

module.exports = MoviesHandler;

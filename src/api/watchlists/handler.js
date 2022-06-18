const ClientError = require("../../exceptions/ClientError");
const InvariantError = require("../../exceptions/InvariantError");

class WatchlistsHandler {
  constructor(service) {
    this._service = service;

    this.getWatchlistsFromUser = this.getWatchlistsFromUser.bind(this);
    this.postWatchlistFromUser = this.postWatchlistFromUser.bind(this);
    this.deleteWatchlistFromUser = this.deleteWatchlistFromUser.bind(this);
  }

  async getWatchlistsFromUser(request) {
    const { id: userId } = request.auth.credentials;
    const watchlists = await this._service.getWatchlistFromUser({ userId });

    return {
      status: "success",
      data: watchlists,
    };
  }

  async postWatchlistFromUser(request, h) {
    try {
      const { id: userId } = request.auth.credentials;
      const { movieId } = request.payload;

      const watchlistId = await this._service.addMovieToWatchlist({
        userId,
        movieId,
      });

      const response = h.response({
        status: "success",
        message: "Watchlists berhasil ditambahkan",
        data: {
          watchlistId,
        },
      });

      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof InvariantError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
    }
  }

  async deleteWatchlistFromUser(request, h) {
    try {
      const { id: userId } = request.auth.credentials;
      const { movieId } = request.payload;

      await this._service.deleteMovieFromWatchlist({ userId, movieId });

      return {
        status: "success",
        message: "Watchlists berhasil dihapus",
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: "error",
        message: "Maaf, terjadi kegagalan pada server kami.",
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = WatchlistsHandler;

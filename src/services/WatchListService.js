const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const InvariantError = require("../exceptions/InvariantError");
const { mapDBToModel } = require("../utils");

class WatchlistService {
  constructor() {
    this._pool = new Pool();
  }

  async addMovieToWatchlist({ userId, movieId }) {
    const id = nanoid(16);
    const query = {
      text: "INSERT INTO watchlists VALUES($1, $2, $3) RETURNING id",
      values: [id, movieId, userId],
    };

    try {
      const result = await this._pool.query(query);
      return result.rows[0].id;
    } catch (error) {
      throw new InvariantError("Movie ini sudah ada dalam watchlist");
    }
  }

  async deleteMovieFromWatchlist({ userId, movieId }) {
    const query = {
      text: "DELETE FROM watchlists WHERE user_id = $1 AND movie_id = $2 RETURNING id",
      values: [userId, movieId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError("Watchlist gagal dihapus");
    }
    return result.rows[0].id;
  }

  async getWatchlistFromUser({ userId }) {
    const query = {
      text: "SELECT * FROM watchlists where user_id = $1",
      values: [userId],
    };

    try {
      const result = await this._pool.query(query);
      return result.rows;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = WatchlistService;

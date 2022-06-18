/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("watchlists", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    movie_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    user_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
  });

  pgm.addConstraint(
    "watchlists",
    "unique_movie_id_and_user_id",
    "UNIQUE(movie_id, user_id)"
  );

  pgm.addConstraint(
    "watchlists",
    "fk_watchlists.user_id_users.id",
    "FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE"
  );
};

exports.down = (pgm) => {
  pgm.dropTable("watchlists");
};

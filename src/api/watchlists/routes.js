const routes = (handler) => [
  {
    method: "GET",
    path: "/watchlists",
    handler: handler.getWatchlistsFromUser,
    options: {
      auth: "moviesapp_jwt",
    },
  },
  {
    method: "POST",
    path: "/watchlists",
    handler: handler.postWatchlistFromUser,
    options: {
      auth: "moviesapp_jwt",
    },
  },
  {
    method: "DELETE",
    path: "/watchlists",
    handler: handler.deleteWatchlistFromUser,
    options: {
      auth: "moviesapp_jwt",
    },
  },
];

module.exports = routes;

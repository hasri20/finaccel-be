const routes = (handler) => [
  {
    method: "GET",
    path: "/movies",
    handler: handler.getNowPlayingMoviesHandler,
  },
  {
    method: "GET",
    path: "/movies/{id}",
    handler: handler.getMovieDetailsHandler,
  },
];

module.exports = routes;

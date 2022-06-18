const MoviesHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "movies",
  version: "1.0.0",
  register: async (server, { service }) => {
    const moviesHandler = new MoviesHandler(service);
    server.route(routes(moviesHandler));
  },
};

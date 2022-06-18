const WatchlistsHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "watchlists",
  version: "1.0.0",
  register: async (server, { service }) => {
    const watchlistsHandler = new WatchlistsHandler(service);
    server.route(routes(watchlistsHandler));
  },
};

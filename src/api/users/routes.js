const routes = (handler) => [
  {
    method: "POST",
    path: "/users",
    handler: handler.postUserHandler,
  },
  {
    method: "GET",
    path: "/users",
    handler: handler.getUserByIdHandler,
    options: {
      auth: "moviesapp_jwt",
    },
  },
];

module.exports = routes;

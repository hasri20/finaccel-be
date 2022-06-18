const Joi = require("joi");

const WathclistPayloadSchema = Joi.object({
  movieId: Joi.string().required(),
});

module.exports = { WathclistPayloadSchema };

const InvariantError = require("../../exceptions/InvariantError");
const { WathclistPayloadSchema } = require("./schema");

const WatchlistsValidator = {
  validateNotePayload: (payload) => {
    const validationResult = WathclistPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = WatchlistsValidator;

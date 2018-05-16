const requireAPI = api => require("../API/" + api );

module.exports = {
  "/graphql": requireAPI("graphql"),
};

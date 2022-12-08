const knex = require("../database/knex");

class TagsController {
  async index(request, response) {
    const { user_id } = request.params;

    const moviesTags = await knex("movie_tags").where({ user_id });

    return response.json(moviesTags);
  }
}

module.exports = TagsController;

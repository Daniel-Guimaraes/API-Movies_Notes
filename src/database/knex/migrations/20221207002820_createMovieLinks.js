exports.up = (knex) =>
  knex.schema.createTable("movie_links", (table) => {
    table.increments("id");
    table.text("url").notNullable();
    table.timestamp("created_at").default(knex.fn.now());
    table
      .integer("movie_note_id")
      .references("id")
      .inTable("movie_notes")
      .onDelete("CASCADE");
  });

exports.down = (knex) => knex.schemas.dropTable("movie_links");

exports.up = function(knex, Promise) {
  const date = Date.now();
  const now = new Date(date);

  return knex.schema.createTable('comments', commentsTable => {
    commentsTable.increments('comment_id').primary();
    commentsTable
      .string('author')
      .references('username')
      .inTable('users')
      .unsigned()
      .onDelete('CASCADE');
    commentsTable
      .integer('article_id')
      .references('article_id')
      .inTable('articles')
      .unsigned()
      .onDelete('CASCADE');
    commentsTable.integer('votes').defaultTo(0);
    commentsTable.string('created_at').defaultTo(knex.fn.now());
    commentsTable.string('body', 2000).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};

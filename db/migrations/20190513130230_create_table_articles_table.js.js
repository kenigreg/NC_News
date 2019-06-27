exports.up = function(knex, Promise) {
  const date = Date.now();
  const now = new Date(date);

  return knex.schema.createTable('articles', articlesTable => {
    articlesTable.increments('article_id').primary();
    articlesTable.string('title').notNullable();
    articlesTable.string('body', 2000).notNullable();
    articlesTable.integer('votes').defaultTo(0);
    articlesTable
      .string('topic')
      .references('slug')
      .inTable('topics')
      .unsigned()
      .onDelete('CASCADE');
    articlesTable
      .string('author')
      .references('username')
      .inTable('users')
      .unsigned()
      .onDelete('CASCADE');
    articlesTable.string('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles');
};

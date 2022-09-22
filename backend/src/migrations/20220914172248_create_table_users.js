exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.string('name').notNull()
    table.string('email').notNull().unique()
    table.string('password').notNull()
    table.string('country').notNull()
    table.string('state').notNull()
    table.string('city').notNull()
    table.string('zipcode').notNull()
    table.string('street').notNull()
    table.string('number').notNull()
    table.string('complement')
    table.string('cpf').notNull().unique()
    table.string('pis').notNull()
    table.timestamp('deletedAt')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};

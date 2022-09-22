require('dotenv').config();

module.exports = {
  client: 'postgresql',
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
  migrations: {
    tableName: 'knex_migrations'
  },
  test: {
    client: 'postgresql',
    connection: {
      connectionString: process.env.DATABASE_TEST_URL,
    },
    migrations: {
      directory: 'src/migrations',
      tableName: 'knex_migrations'
    },
  }
};

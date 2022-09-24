require('dotenv').config();

module.exports = {
  client: 'postgresql',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized : false },
  },
  migrations: {
    directory: 'src/migrations',
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

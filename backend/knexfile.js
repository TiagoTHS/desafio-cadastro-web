require('dotenv').config();

module.exports = {
  client: 'postgresql',
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    ssl: { rejectUnauthorized : false },
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};

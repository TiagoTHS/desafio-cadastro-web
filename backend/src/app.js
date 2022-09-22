require('dotenv').config();
const app = require('express')()
const consign = require('consign')
const db = require('./config/db')

app.db = db

consign({ cwd: 'src' })
  .include('./config/passport.js')
  .then('./config/middlewares.js')
  .then('./api/validation.js')
  .then('./api')
  .then('./config/routes.js')
  .into(app)

module.exports = app;

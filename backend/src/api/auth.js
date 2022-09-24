const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
  const signin = async (req, res) => {
    if (!req.body.login || !req.body.password) {
      return res.status(400).send('Informe usuário e senha!')
    }

    const { emailRegex } = app.api.validation

    let user = null

    if (emailRegex.test(req.body.login)){
      user = await app.db('users')
      .where({ email: req.body.login })
      .whereNull('deletedAt')
      .first()
    } else {
      user = await app.db('users')
      .where({ cpf: req.body.login })
      .whereNull('deletedAt')
      .first()

      if(!user) {
        user = await app.db('users')
        .where({ pis: req.body.login })
        .whereNull('deletedAt')
        .first()
      }
    }

    if (!user) return res.status(400).send('Usuário não encontrado!')

    const isMatch = bcrypt.compareSync(req.body.password, user.password)
    if (!isMatch) return res.status(401).send('Email/Senha inválidos!')

    const now = Math.floor(Date.now() / 1000)

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      iat: now,
      exp: now + (60 * 60 * 24 * 3)
    }

    res.json({
      ...payload,
      token: jwt.encode(payload, process.env.AUTH_SECRET)
    })
  }

  const validateToken = async (req, res) => {
    const userData = req.body || null
    try {
      if (userData) {
        const token = jwt.decode(userData.token, process.env.AUTH_SECRET)
        if (new Date(token.exp * 1000) > new Date()) {
          return res.send(true)
        }
      }
    } catch (e) {
    }

    res.send(false)
  }

  return { signin, validateToken }
}

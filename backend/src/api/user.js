const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
  const { 
    existsOrError, 
    notExistsOrError, 
    equalsOrError, 
    isAnEmailOrError,
    isCPFOrError,
    isPISOrError } = app.api.validation

  const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
  }

  const save = async (req, res) => {
    const user = { ...req.body }
    if(req.params.id) user.id = req.params.id

    try {
      existsOrError(user.name, 'Nome não informado')
      existsOrError(user.email, 'E-mail não informado')
      isAnEmailOrError(user.email, 'E-mail inválido')
      if (!user.id){
        existsOrError(user.password, 'Senha não informado')
        existsOrError(user.confirmPassword, 'Confirmação de Senha inválida')
        equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')
      }
      existsOrError(user.country, 'País não informado')
      existsOrError(user.state, 'Estado não informado')
      existsOrError(user.city, 'Cidade não informada')
      existsOrError(user.zipcode, 'CEP não informado')
      existsOrError(user.street, 'Rua não informada')
      existsOrError(user.number, 'Número não informado')
      existsOrError(user.cpf, 'CPF não informado')
      isCPFOrError(user.cpf, 'CPF inválido')
      existsOrError(user.pis, 'PIS não informado')
      isPISOrError(user.pis, 'PIS inválido')

      const userFromDB = await app.db('users')
        .where({ email: user.email }).first()

      if (userFromDB && userFromDB.deletedAt) {
        user.id = userFromDB.id
        user.deletedAt = null
        user.password = encryptPassword(user.password)
        delete user.confirmPassword
      }

      if(!user.id) { 
        notExistsOrError(userFromDB, 'Usuário já cadastrado')
      }
    } catch(msg) {
      return res.status(400).send(msg)
    }

    if(user.id) {
      app.db('users')
        .update(user)
        .where({ id: user.id })
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
    } else {
      user.password = encryptPassword(user.password)
      delete user.confirmPassword

      app.db('users')
        .insert(user)
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
    }
  }

  const get = (req, res) => {
    app.db('users')
      .select('id', 'name', 'email', 'country', 'state', 'city', 'zipcode', 
        'street', 'number', 'complement', 'cpf', 'pis')
      .whereNull('deletedAt')
      .then(users => res.json(users))
      .catch(err => res.status(500).send(err))
  }

  const getById = async (req, res) => {
    app.db('users')
      .select('id', 'name', 'email', 'country', 'state', 'city', 'zipcode', 
        'street', 'number', 'complement', 'cpf', 'pis')
      .where({ id: req.params.id })
      .whereNull('deletedAt')
      .first()
      .then(user => res.json(user))
      .catch(err => res.status(500).send(err))
  }

  const changePassword = async (req, res) => {
    const newPass = { ...req.body }
    if(req.params.id) userId = req.params.id

    try {
      existsOrError(newPass.password, 'Senha não informado')
      existsOrError(newPass.confirmPassword, 'Confirmação de Senha inválida')
      equalsOrError(newPass.password, newPass.confirmPassword, 'Senhas não conferem')
    } catch(msg) {
      return res.status(400).send(msg)
    }

    newPass.password = encryptPassword(newPass.password)
    delete newPass.confirmPassword

    app.db('users')
      .update(newPass)
      .where({ id: userId })
      .whereNull('deletedAt')
      .then(_ => res.status(204).send())
      .catch(err => res.status(500).send(err))
  }

  const remove = async (req, res) => {
    try {
      const rowsUpdated = await app.db('users')
        .update({ deletedAt: new Date() })
        .where({ id: req.params.id })
      existsOrError(rowsUpdated, 'Usuário não foi encontrado')
    
      res.status(204).send()
    } catch(msg) {
      res.status(400).send(msg)
    }
  }

  return { save, get, getById, changePassword, remove }
}

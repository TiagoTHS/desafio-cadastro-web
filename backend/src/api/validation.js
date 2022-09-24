module.exports = app => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  const cpfRegex = /^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/
  const pisRegex = /^[0-9]{3}.?[0-9]{5}.?[0-9]{2}-?[0-9]{1}/

  function existsOrError(value, msg) {
    if(!value) throw msg
    if(Array.isArray(value) && value.length === 0) throw msg
    if(typeof value === 'string' && !value.trim()) throw msg
  }
  
  function notExistsOrError(value, msg) {
    try {
      existsOrError(value, msg)
    } catch(msg) {
      return
    }
    throw msg
  }
  
  function equalsOrError(valueA, valueB, msg) {
    if(valueA !== valueB) throw msg
  }

  function verifyUnique(user, userFromDB) {
    if (userFromDB) {
      if (userFromDB.email == user.email) {
        throw 'Email já cadastrado'
      } else if (userFromDB.cpf == user.cpf) {
        throw 'CPF já cadastrado'
      } else if (userFromDB.pis == user.pis) {
        throw 'PIS já cadastrado'
      }
    }

    return
  }

  function isAnEmailOrError(strEmail, msg) {
    if (!emailRegex.test(strEmail)) {
      throw msg
    }
  }

  function isCPFOrError(strCPF, msg) {
    if (!cpfRegex.test(strCPF)) {
      throw msg
    }
  }

  function isPISOrError(strPIS, msg) {
    if (!pisRegex.test(strPIS)) {
      throw msg
    }
  }

  return { 
    emailRegex,
    cpfRegex,
    pisRegex,
    existsOrError, 
    notExistsOrError, 
    equalsOrError, 
    verifyUnique,
    isAnEmailOrError,
    isCPFOrError,
    isPISOrError
  }
}

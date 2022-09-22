module.exports = app => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  const cpfRegex = /^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/

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

  return { 
    emailRegex,
    cpfRegex,
    existsOrError, 
    notExistsOrError, 
    equalsOrError, 
    isAnEmailOrError,
    isCPFOrError
  }
}

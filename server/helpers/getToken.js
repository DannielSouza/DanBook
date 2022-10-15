const getToken = (req) => {
  const authHeader = req.headers.authorization
  if(authHeader !== undefined){
    const token = authHeader.split(' ')[1]
    return token
  }
  return null
}

module.exports = getToken
const jwt = require('jsonwebtoken')

const createUserToken = (user, req, res)=>{
  const token = jwt.sign({
    name: user.name,
    id: user._id
  }, 'secretdanbook')

  return res.status(200).json({message: 'Usuário criado com sucesso.', token: token})

}

module.exports = createUserToken
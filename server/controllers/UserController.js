const User = require('../models/User')
const bcrypt = require('bcryptjs')
const createUserToken = require('../helpers/createUserToken') 
const getToken = require('../helpers/getToken')
const getUserByToken = require('../helpers/getUserByToken')
const Post = require('../models/Posts')

module.exports = class UserController{

  /* REGISTER */
  static async register(req, res){
    const {name, email, password, confirmpassword} = req.body

    //VALIDATIONS
    if(!name) return res.status(422).json({message: 'O nome é obrigatório.'})
    if(!email) return res.status(422).json({message: 'O e-mail é obrigatório.'})
    if(!password) return res.status(422).json({message: 'A senha é obrigatória.'})
    if(!confirmpassword) return res.status(422).json({message: 'A confirmação de senha é obrigatório.'})
    if(password !== confirmpassword) return res.status(422).json({message: 'As senhas são diferentes.'})

    //CHECK IF THERE'S ALREARY A USER WITH THIS EMAIL
    const userExist = await User.findOne({email:email})
    if(userExist) return res.status(422).json({message: 'Este e-mail já está em uso.'})

    //CREATE PASSWORD
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    //CREATE USER
    const user = new User({
      name,
      email,
      password: passwordHash
    })

    try {
      const newUser = await user.save()
      await createUserToken(newUser, req, res)
    } catch (error) {
      console.log('Erro ao tentar criar usuário: '+error);
    }
  }


  /* LOGIN */
  static async login(req, res){
    const {email, password} = req.body

    //VALIDATIONS
    if(!email) return res.status(422).json({message: 'O e-mail é obrigatório.'})
    if(!password) return res.status(422).json({message: 'A senha é obrigatória.'})

    //CHECK IF THE USER EXIST
    const user = await User.findOne({email:email})
    if(!user) return res.status(422).json({message: 'E-mail incorreto.'})

    //CHECK PASSWORD
    const checkedPassword = await bcrypt.compare(password, user.password)
    if(!checkedPassword) return res.status(422).json({message: 'Senha inválida.'})

    await createUserToken(user, req, res)
  }


  /* GET USER BY ID */
  static async getUserById(req, res){
    const {id} = req.params

    //CHECK IF THE USER EXIST
    const user = await User.findById(id).select('-password')
    if(!user) return res.status(422).json({message: 'Usuário não encontrado.'})

    const usersPost = await Post.find({'user._id': user._id}).sort('-createdAt')

    res.status(200).json({user: user, posts: usersPost})
  }


  /* EDIT USER */
  static async editUser(req, res){
    const {name, email, password, confirmpassword} = req.body

    const token = getToken(req)
    const user = await getUserByToken(token)
    if(!user) return res.status(422).json({message: 'Usuário não encontrado.'})

    //CHECK IF THE USER UPLOADED AN IMAGE
    if(req.file) user.image = req.file.filename

    //VALIDATIONS
    if(!name) return res.status(422).json({message: 'O nome é obrigatório.'})
    if(!email) return res.status(422).json({message: 'O e-mail é obrigatório.'})
    if(password !== confirmpassword) return res.status(422).json({message: 'As senhas são diferentes.'})
    if(password === confirmpassword && password !== null){
      const salt = await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash(password, salt)

      user.password = passwordHash
    }

    //VERIFY IF THE USER CHANGE THE EMAIL, IF YES, CHECK IF THERE'S A USER USING THE SAME EMAIL
    const userEmail = await User.findOne({email: email})
    if(userEmail && userEmail.email !== user.email )return res.status(422).json({message: 'Este e-mail já está em uso.'})

    try {
      await User.findOneAndUpdate(
        {_id: user._id},
        {$set: user},
        {new: true}
      )
      return res.status(200).json({message: 'Usuário atualizado com sucesso.'})
    } catch (error) {
      return res.status(500).json({message: 'Houve um erro ao atualzar os dados.'})
    }
    
  };
}
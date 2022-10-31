const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
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


  /* CHECK WHAT USER IS USING THE PROFILE BY TOKEN */
  static async checkUser(req, res){
    let currentUser = null

    //CHECK IF THERES AN AUTHORIZATION ON THE HEADERS
    if(req.headers.authorization){
      const token = getToken(req)
      const decoded = jwt.verify(token, 'secretdanbook')
      currentUser = await User.findById(decoded.id)
      currentUser.password = undefined
    }
    else return res.status(422).json({message: 'Houve um erro com o token.'})

    res.status(200).send(currentUser)
  }


  /* EDIT USER */
  static async editUser(req, res){
    const {name, email, description, password, confirmpassword} = req.body

    const token = getToken(req)
    let user = await getUserByToken(token)
    if(!user) return res.status(422).json({message: 'Usuário não encontrado.'})

    //CHECK IF THE USER UPLOADED AN IMAGE
    if(req.file) user.image = req.file.filename

    user.description = description

    //VALIDATIONS
    if(!name) return res.status(422).json({message: 'O nome é obrigatório.'})
    if(!email) return res.status(422).json({message: 'O e-mail é obrigatório.'})
    if(password !== confirmpassword) return res.status(422).json({message: 'As senhas são diferentes.'})
    if(password === confirmpassword && password !== undefined){
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

      await Post.updateMany({'userId': user._id},{userImage: user.image})
      
      return res.status(200).json({message: 'Usuário atualizado com sucesso.'})
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'Houve um erro ao atualzar os dados.'})
    }
  }


  /* USER PROFILE */
  static async profile(req, res){
    const token = getToken(req)
    const user = await getUserByToken(token)
    user.password = undefined

    if(!user) return res.status(422).json({message: 'Usuário não encontrado.'})

    const usersPost = await Post.find({'userId': user._id}).sort('-createdAt')

    res.status(200).json({user: user, posts: usersPost})
  }


  /* USER PROFILE BY OTHERS PEOPLE */
  static async peopleProfile(req, res){
    const {id} = req.params

    const user = await User.find({_id: id})
    const posts = await Post.find({userId: id}).sort('-createdAt')
    
    if(!user) return res.status(422).json({message: 'Usuário não encontrado.'})

    res.status(200).json({user, posts})
  }


  /* FOLLOW OTHER PEOPLE */
  static async followPeople(req, res){
    const {id} = req.params
    const followedUser = await User.findById(id)
    if(!followedUser) return res.status(422).json({message: 'Usuário não encontrado.'})

    const token = getToken(req)
    const followingUser = await getUserByToken(token)

    if(followingUser.email === followedUser.email) return res.status(422).json({message: 'Você não pode seguir a si mesmo.'})

    followedUser.followers.forEach((item)=>{
      if(item.email === followingUser.email)  return res.status(422).json({message: 'Você já está seguindo esse usuário.'})
    })

    const newFollow={
      _id: followingUser._id,
      name: followingUser.name,
      email: followingUser.email,
      image: followingUser.image
    }

    followedUser.followers.push(newFollow)
    
    await User.findOneAndUpdate(
      {_id: followedUser._id},
      {$set: followedUser},
      {new: true}
    )

    res.status(200).json({message: `Agora você está seguindo ${followedUser.name}.`})

  }
}
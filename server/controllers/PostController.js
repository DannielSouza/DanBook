const Post = require('../models/Posts')
const getToken = require('../helpers/getToken')
const getUserByToken = require('../helpers/getUserByToken')
const ObjetctId= require('mongoose').Types.ObjectId

module.exports = class PostController{
  
  /* CREATE POST */
  static async createPost(req, res){
    const {content} = req.body
    const imagesForm = req.file

    if(!content) return res.status(422).json({message: 'o post não pode ser em branco'})

    const token = getToken(req)
    const user = await getUserByToken(token)

    const post = new Post({
      content,
      image: '',
      userId: user._id,
      userName: user.name,
      userImage: user.image
    })

    if(imagesForm) post.image =imagesForm.filename

    try {
      const newPost = await post.save()
      return res.status(201).json({message: 'Post publicado com sucesso.', newPost})
    } catch (error) {
        res.status(500).json({message: 'Houve um arro ao publicar o post.'})
        return console.log(error)
    }
  }


  /* GET ALL POSTS */
  static async getAllPosts(req, res){
    const posts = await Post.find().sort('-createdAt')
    res.status(200).send(posts)
  }


  /* DETELE USER'S POST */
  static async deletePostById(req, res){
    const {id} = req.params

    if(!ObjetctId.isValid(id)) return res.status(422).json({message: 'Id inválido.'})

    const post = await Post.findOne({_id: id})
    if(!post) return res.status(404).json({message: 'Pet não encontrado.'})

    const token = getToken(req)
    const user = await getUserByToken(token)

    if(String(post.userId) !== String(user._id)) return res.status(422).json({message: 'O post foi publicado por outro usuário.'})

    await Post.findByIdAndDelete(id)
    return res.status(200).json({message: 'Post removido com sucesso.'})
  }


  /* UPDATE USER'S POST */
  static async updatePostById(req, res){
    const {id} = req.params
    const {content} = req.body
    const imagesForm = req.file

    const post = await Post.findOne({_id: id})
    if(!post) return res.status(404).json({message: 'Post não encontrado.'})

    const token = await getToken(req)
    const user = await getUserByToken(token)

    if(String(post.userId) !== String(user._id)) return res.status(422).json({message: 'O post foi publicado por outro usuário.'})
    
    if(!content) return res.status(422).json({message: 'o post não pode ser em branco'})

    let updatedPost = {
      ...post
    }

    updatedPost._doc.content = content
    if(imagesForm) updatedPost._doc.image = imagesForm.filename

    await Post.findByIdAndUpdate(id, updatedPost)
    return res.status(200).json({message: 'Post atualizado com sucesso.'})
  }


  /* GET A POST DETAILS BY ID */
  static async getPostById(req, res){
    const {id} = req.params
    const post = await Post.findOne({_id: id})

    if(!post) return res.status(404).json({message: 'Post não encontrado.'})

    res.status(200).json(post)
  }


  /* COMMENT A POST BY ID */
  static async commentAPostById(req, res){
    const {id} = req.params
    const {comment} = req.body
    const post = await Post.findOne({_id:id})

    if(!post) return res.status(404).json({message: 'Post não encontrado.'})
    if(!comment) return res.status(422).json({message: 'O comentário não pode ser vázio.'})

    const token = getToken(req)
    const user = await getUserByToken(token)

    post.comments.push({
      comment,
      user:{
        _id: user._id,
        name: user.name,
        image: user.image,
      }
    })

    await Post.findByIdAndUpdate(id, post)
    return res.status(200).json({message: 'Comentário feito com sucesso.'})
  }


  /* LIKE A POST BY ID */
  static async likeAPostById(req, res){
    const {id} = req.params
    const post = await Post.findOne({_id:id})

    const token = getToken(req)
    const user = await getUserByToken(token)
    
    let userAlreadyLikedIt = false

    if(!post) return res.status(404).json({message: 'Post não encontrado.'})
      post.likes.map((item)=>{
      if(String(item._id) === String(user._id)){
        userAlreadyLikedIt = true
      }
    })

    if(userAlreadyLikedIt)  return res.status(422).json({message: 'Você já curtiu essa publicação.'})
    

    post.likes.push(
      {
        _id: user._id,
        name: user.name,
        image: user.image,
    })

    await Post.findByIdAndUpdate(id, post)
    return res.status(200).json({message: 'Post curtido com sucesso.'})
  }


}
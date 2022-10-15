// MODULES
const express = require('express')
const cors = require('cors')
const UserRoutes = require('./routes/UserRoutes')
const PostRoutes = require('./routes/PostRoutes')


//CONGIFGS
   //EXPRESS
   const app = express()
   app.use(express.json())
   app.use(express.static('public'))
  //CORS
    app.use(cors())
    app.use(express.json())
 
//ROUTES
app.use('/user', UserRoutes)
app.use('/post', PostRoutes)

//OTHERS
app.listen(4000, ()=>console.log('Server rodando'))
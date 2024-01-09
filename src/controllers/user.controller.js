const helpers = require('../utils/helpers')
const User = require('../models/User')

const userController = {

  createUser: async (req, res) => { 
    try{
      
      const {senha} = new User(req.body)
      let newUser = new User(req.body)    
        
      const hashDaSenha = {
        senha: await helpers.encryptPassword(senha)   
      }          

      Object.assign(newUser, hashDaSenha)

      await newUser.save()     
      
      res.status(201).send(newUser)

    } catch (error) {
      res.status(400).send(error)
    }
  },

  getAllUsers: async (req, res) => { 
    try{
      const users = await User.find()
    
      res.send(users)

    } catch (error) {
      res.status(500).send(error)
    }
  },

  getUserById: async (req, res) => { 
    try{
      const user = await User.findById(req.params.id)
      
      if (!user) return res.status(404).send()

      res.send(user)

    } catch (error) {
      res.status(500).send(error)
    }
  },

  updateUser: async (req, res) => { 
    const updates = Object.keys(req.body)
    const allowedUpdates = ['nome', 'email', 'senha']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation) {
      return res.status(400).send({error: 'Atualização inválida'})
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

      if (!user) return res.status(404).send()

      res.send(user)
    } catch (error) {
      res.status(400).send(error)
    }
  },

  deleteUser: async (req, res) => { 
    try{
      const user = await User.findByIdAndDelete(req.params.id)
      
      if (!user) return res.status(404).send()

      res.send(user)

    } catch (error) {
      res.status(500).send(error)
    }
  }
}

module.exports = userController
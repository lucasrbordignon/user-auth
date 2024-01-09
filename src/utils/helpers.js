const bcrypt = require('bcrypt')

const helpers = {
  encryptPassword: async (password) => {
    try {
      const salt = await bcrypt.genSalt(10)
      
      const hash = await bcrypt.hash(password, salt)
      return hash

    } catch (error) {
      throw error
    }
  },

  checkPassword: async (password, user) => {
    try {      
      const salt = await bcrypt.genSalt(10)
      
      const hash = await bcrypt.hash(password, salt)
    
      return await bcrypt.compare(hash, user)

    } catch (error) {
      throw error
    }
  }
}

module.exports = helpers
const mongoose = require('mongoose')

async function main() {
  require('dotenv').config();

  try {
    mongoose.set('strictQuery', true)

    await mongoose
    .connect(
      `mongodb+srv://${process.env.USER_MONGODB}:${process.env.PASSWORD_MONGODB}@user-crud.assez7n.mongodb.net/?retryWrites=true&w=majority`
    )
    
    console.log('Conectado ao banco!')
  } catch (error) {
    console.log({erro: error})
  }

}

module.exports = main
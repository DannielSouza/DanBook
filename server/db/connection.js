const mongoose = require("mongoose")

async function main() {
  await mongoose.connect(
    "mongodb+srv://admin:admin@danbookdb.fsq3xvg.mongodb.net/?retryWrites=true&w=majority"
  )
}

main().catch((error) =>
  console.log("Erro ao conectar ao banco de dados: " + error)
)


module.exports = mongoose
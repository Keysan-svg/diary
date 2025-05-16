const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors')
const { dbConnectionTest } = require('./app/database/dbConnect')
const userRoutes = require('./app/routes/userRoutes')

dotenv.config({
    path: path.join(__dirname, '.env')
})

dbConnectionTest()

const app = express()

// le serveur connaît de nouveaux formats de corps de requête et de réponse
app.use(express.urlencoded())
app.use(express.json())
app.use(cors()) // a modifier ajouter une origine pour communiquer
app.use('/api/v1/user', userRoutes)

app.listen(3000, function(){

    console.log('🚀 Server running on port 3000')
})
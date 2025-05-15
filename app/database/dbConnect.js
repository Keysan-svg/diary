const { Sequelize } = require('sequelize');
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({
    path: path.join(__dirname, '../../.env')
})

console.log(process.env)

const sequelizeClient = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
{
  host: process.env.DB_HOSTNAME,
  dialect: process.env.DB_DIALECT,
  dialectOptions: {
    ssl: {
        rejectUnauthorized: false //a modifier la bdd ne doit pas etre accessible depuis internet
    }
},
});

async function dbConnectionTest(){

    try{
        
        await sequelizeClient.authenticate()
        console.log('✅connection succeeded')
        
    } catch (err) {
        console.trace(err)
        console.log('❌error while trying to connect to the db')
    }

}

module.exports = {
    dbConnectionTest,
    sequelizeClient
}
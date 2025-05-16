const { Sequelize } = require('sequelize')
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
                require: true, 
                rejectUnauthorized: true 
            }
        }
    }
);

async function dbConnectionTest() {
    try {
        await sequelizeClient.authenticate()
        console.log('✅ Connection succeeded (SSL enabled)')
    } catch (err) {
        console.trace(err)
        console.log('❌ Error while trying to connect to the DB')
    }
}

module.exports = {
    dbConnectionTest,
    sequelizeClient
}

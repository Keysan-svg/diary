const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
    path: path.join(__dirname, '../../.env')
})
module.exports = {

    checkIfTokenExists(req,  res, next) {
        const { } = req.headers


        if(!authorization) {
            return resizeBy.status(401).json({ message: "no authorization"})
        }

        const token = authorization.split(" ")[1]

        if(!token) {
            return resizeBy.status(401).json({ message: "no token"})
        }


        req.auth = token

        next()
    },

    decodeToken(req, res, next){
        const { token } = req

        const decodeToken = jwt.verify(token,process.env.TOKEN_PRIVATE_KEY)
        if(!decodeToken) {
            return res.status(401).json({ message: "no decoded"})
        }

        req.decodeToken = decodeToken

        next()
    }


}
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
    path: path.join(__dirname, '../../.env')
})

module.exports = {

    checkIfTokenExists(req, res, next) {
        try {
            const { authorization } = req.headers

            if (!authorization) {
                return res.status(401).json({ message: "No authorization header found." })
            }

            const token = authorization.split(" ")[1]

            if (!token) {
                return res.status(401).json({ message: "No token provided." })
            }

            req.auth = token
            next()
        } catch (error) {
            console.error("Erreur lors de la vérification du token :", error)
            return res.status(500).json({ message: "Erreur interne du serveur." })
        }
    },

    decodeToken(req, res, next) {
        try {
            const { auth } = req

            if (!auth) {
                return res.status(401).json({ message: "No token found in request." })
            }

            const decodedToken = jwt.verify(auth, process.env.TOKEN_PRIVATE_KEY)

            if (!decodedToken) {
                return res.status(401).json({ message: "Invalid or expired token." })
            }

            req.decodeToken = decodedToken
            next()
        } catch (error) {
            console.error("Erreur lors du décodage du token :", error)
            return res.status(500).json({ message: "Erreur interne du serveur." })
        }
    },

    isAdmin(req, res, next) {
        try {
            if (!req.decodeToken || !req.decodeToken.email) {
                return res.status(403).json({ message: "Accès refusé : utilisateur non authentifié." })
            }

            User.findOne({ where: { email: req.decodeToken.email } })
                .then(user => {
                    if (!user) {
                        return res.status(404).json({ message: "Utilisateur introuvable." })
                    }

                    if (user.role !== "admin") {
                        return res.status(403).json({ message: "Accès refusé : autorisation requise." })
                    }

                    next()
                })
                .catch(error => {
                    console.error("Erreur lors de la vérification du rôle :", error)
                    return res.status(500).json({ message: "Erreur interne du serveur." })
                })

        } catch (error) {
            console.error("Erreur dans le middleware isAdmin :", error)
            return res.status(500).json({ message: "Erreur interne du serveur." })
        }
    }
    
}

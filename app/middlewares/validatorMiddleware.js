const { body, validationResult } = require('express-validator')

const validatorMiddlewares = {
    password: body('password').notEmpty().trim().isStrongPassword({
        minLength: 12,
        minSymbols: 1,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1
    }),
    email: body('email').notEmpty(),
    validationResult: (req, res, next) => {
        try {
            const result = validationResult(req)
            if (!result.isEmpty()) {
                return res.status(400).json({ result: result.array() })
            }
            next()
        } catch (error) {
            console.error("Erreur de validation :", error)
            return res.status(500).json({ message: "Erreur interne du serveur." })
        }
    }
}

module.exports = validatorMiddlewares

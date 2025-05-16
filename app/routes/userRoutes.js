const { Router } = require('express')
const userController = require('../controllers/userController')
const { checkIfTokenExists, decodeToken, isAdmin } = require('../middlewares/authMiddlewares')
const { validationResult, password, email } = require('../middlewares/validatorMiddleware')
const route = Router()

route.get('/', isAdmin, userController.index)
route.post('/', [password, validationResult], userController.store)
route.post('/login', email, validationResult, userController.login)
route.get('/me', [ checkIfTokenExists, decodeToken ] , userController.getOneByEmail)
route.delete('/:id', [ checkIfTokenExists, decodeToken ] , userController.deleteOneById)

module.exports = route
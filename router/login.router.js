const router = require('express').Router();
const  loginController = require('../controller/login.controller')
const  userMiddleware = require('../middleware/user.middleware')

router.get('/', loginController.getCreateUserForm);
router.post('/',userMiddleware.IsUserDataValid, loginController.createUser);



module.exports = router;
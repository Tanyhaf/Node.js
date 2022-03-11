const router = require('express').Router();
const signInController = require('../controller/signIn.controller');
const signInMiddleware = require('../middleware/signin.middleware');

router.get('/', signInController.getFormSignIn);
router.post('/', signInMiddleware.checkUserAuth, signInController.signIn );


module.exports = router;
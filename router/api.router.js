const router = require('express').Router();

const userRouter = require('./user.router');
const loginRouter = require('./login.router');
const signInRouter = require('./sigin.router');

router.use('/login', loginRouter);
router.use('/signIn',signInRouter);
router.use('/users',userRouter);

router.get('/error', ({query},res)=>{
    res.render('error', {error: query.error})
});

router.use( (req,res)=>{
    res.render('error');
});

module.exports = router;
const users = require('../db/users');

module.exports={
    checkUserAuth : (req, res, next) => {
        try {
            const user = users.find(user => user.email === body.email && user.password === body.password);
            if (!user) throw new Error('Wrong email or password');
            req.user = user;
            next();
        } catch ({massage}){
            res.redirect(`/error?error=${message}`)
        }
    }
}
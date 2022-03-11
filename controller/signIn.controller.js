module.exports = {
    getFormSignIn:  (req, res) => {
        res.render('signin')
    },

    signIn : ({user}, res) => {
            res.redirect(`/users/${user.id}`);

    }
}
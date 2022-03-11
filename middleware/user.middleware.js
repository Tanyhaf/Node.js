const users = require("../db/users");

module.exports = {
    IsUserIdValid: ({params}, res, next) => {
        try{
            const {userId} = req.params;
            if (!Number.isInteger(userId) || Number.isNaN(+userId)){
                throw new Error('Not valid ID');
            }

            const user = users.find(user => user.id === +params.userId);
            if (!user) throw new Error('No such user');
            next();

            req.user=user;

        } catch ({message}){
            res.redirect(`/error?error=${message}`);
        }

    },

    IsUserDataValid: (req, res, next)=>{
        try {
            const {firstName,lastName, email, password, age, city}=req.body;

            if (firstName.length < 2 || lastName.length < 2){
                throw new Error('Name must be min 2 symbols');
            }
            if (!email.includes('@')){
                throw new Error('Email must contain @');
            }
            if (password.length < 6){
                throw new Error('Password min 6 symbols');
            }
            if (age < 18){
                throw new Error('Age must be more than 18');
            }
            if (!city){
                throw new Error('City cant be empty');
            }

            next();
        } catch ({message}){
            res.redirect(`/error?error=${message}`);
        }

    },

    IsUserExist: ({body}, res, next)=>{
        try{
            const userExist = users.some(user => user.email === body.email);
            if (userExist) throw new Error('User with this email is already exist');

            next();
        } catch ({message}){
            res.redirect(`/error?error=${message}`);
        }

    }
};
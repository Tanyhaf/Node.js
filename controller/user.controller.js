let users = require('../db/users');

module.exports ={
    getAllUsers: ({query}, res) => {
        if (Object.keys(query).length) {
            let usersNew = [...users];

            if (query.city) {
                usersNew = usersNew.filter(user => user.city === query.city);
            }

            if (query.age) {
                usersNew = usersNew.filter(user => user.age === query.age);
            }
            res.render('users', {users: usersNew});
            return;
        }
        res.render('users', {users});
    },

    getUserById:({params, user}, res) => {
            res.render('userAbout', {user});
    },

    deleteUserById:({params},res)=>{
        users = users.filter(user => user.id !== +params.userId);
        res.redirect('/users');
    }
};
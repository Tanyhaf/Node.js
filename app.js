// ДЗ
//
// декілька ендпоінтів зробити
//
// 1. /login, поля які треба відрендерити в файлі hbs: firstName, lastName, email(унікальне поле), password, age, city
// просто зробити темплейт з цим усім і вводити свої дані які будуть пушитися в масив і редірект робити на сторінку з усіма юзерами /users і перевірка чи такий імейл не існує, якщо існує то редірект на еррор пейдж
// 2. /users просто сторінка з усіма юзерами, але можна по квері параметрам їх фільтрувати по age і city
// 3. /user/:id сторінка з інфою про одного юзера

// 4. зробити якщо не відпрацюють ендпоінти то на сторінку notFound редірект

const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'static')));
app.set('view engine','.hbs');
app.engine('.hbs',engine({defaultLayout:false}));
app.set('views',path.join(__dirname,'static'));

const users = [
    // {
    //     firstName: 'Nata',
    //     lastName: 'Natali',
    //     email: 'Natali.gmail.com',
    //     password: '12345',
    //     age: '23',
    //     city: 'Lviv'
    // },
    // {
    //     firstName: 'Sasha',
    //     lastName: 'Sanuch',
    //     email: 'sansanuch.gmail.com',
    //     password: '32435',
    //     age: '25',
    //     city: 'Kiev'
    // },
    // {
    //     firstName: 'Bob',
    //     lastName: 'Spanch',
    //     email: 'spanchBob.gmail.com',
    //     password: '345645',
    //     age: '30',
    //     city: 'Novgorod'
    // }
];
let error = '';
app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/users',(req,res)=>{
    res.render('users',{users})
})

app.get('/users/:userId',({params},res)=>{
    const user = users.find(user => user.id === +params.userId);
    if (!user){
        error = 'No such user'
         res.render('/error')
        return;
    }
    res.render('users',{users})
})

app.get('/users',({query},res)=>{
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
    res.render('users', { users });

})

app.post('/login', ({body},res)=>{
    const userExist = users.some(user => user.email === body.email);
        if (userExist){
           error ='User with this email is already exist';
            res.redirect('/error')
        }
        users.push({ ...body, id: users.length ? users[users.length - 1].id + 1 : 1 })
        res.redirect('/users')
    });


app.use((req,res)=>{
    res.render('error', {error})
});

app.listen(5500,()=>{
    console.log('server start 5500')
});
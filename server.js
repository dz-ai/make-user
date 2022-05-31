const express = require('express');
const {v4: uuidv4} = require('uuid')
const session = require('express-session');

const usersList = []

const app = express();
app.use(express.static('public'))
app.use(express.json());
// app.set('trust proxy', 1)
app.use(session({secret: 'black-board'}))


app.get('/secret', (req, res) => {

        if (session.userName
            && session.passWord) {
            res.send({answer: 'i love you'})
        } else {
            res.send({answer: 'ammm you dont know my secret'})
        }
})

 app.post('/register', (req, res) => {
     console.log(req.body)
    const {name, pass} = req.body;
    session.userName = name;
    session.passWord = pass;
    usersList.push({name, pass, id: uuidv4() });
     console.log(usersList);
     res.send({
         signed: 'Signed In',
         loge: 'Log Out'
     });
 })

app.post('/login', (req, res) => {
    const {name, pass} = req.body;
    const user = usersList.find(user => {
        return user.name === name && user.pass === pass
    })
    if (user) {
        session.userName = user.name;
        session.passWord = user.pass;
        res.send({loge: 'Log Out'})
    } else {
        res.send({loge: 'Sign In First'})
    }

})

app.get('/logout', (req, res) => {

    res.send({loge: 'Login'})
})

app.listen(9000, () => {
    console.log('listen on 9000')
})
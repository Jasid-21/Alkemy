const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');


//Settings and middlewares
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(require('./routes/routes.js'));



function verify_session(req, resp, next){
    const cookie = req.cookies['session_id'];
    console.log("Hola");
    console.log(cookie);
    get_session(cookie).then(function(resolved){
        req.user_id = resolved.User_id;
        req.username = resolved.Username;
        next();
    }, function(rejected){
        console.log(rejected);
        resp.redirect('/login');
    });
}



app.listen(app.get('port'), function() {
    console.log(`Server listening in port ${app.get('port')}`);
});
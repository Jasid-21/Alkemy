const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const path = require('path');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

router.use(cookieParser());
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


router.get('/', verify_session, function(req, resp) {
    resp.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
});



router.get('/login', function(req, resp) {
    resp.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

router.post('/login', function(req, resp) {
    const username = req.query.username;
    const pass = req.query.password;

    connection.query(`SELECT * FROM users WHERE Username = '${username}'`, function(error, data){
        if(error){
            console.log(error);
            resp.status(500).send("Error logining. Please try later...");
        }else{
            if(data.length > 0){
                const hash = data[0].Pass;
                if(bcrypt.compare(pass, hash)){
                    create_session(Number(data[0].Id)).then(function(resolved){
                        resp.cookie('session_id', resolved.token, {maxAge: 2600000*1000}).send({status: 1});
                    }, function(rejected){
                        console.log(rejected);
                        resp.status(500).send({status: 0, message: "Error creating session..."});
                    });
                }else{
                    resp.status(400).send();
                }
            }else{
                resp.send({status: 0, message: "User not found..."});
            }
        }
    });
});

router.get('/logout', verify_session, function(req, resp) {
    const user_id = req.user_id;
    connection.query(`DELETE FROM sessions WHERE user_id = ${user_id}`, function(error){
        if(error) {
            console.log(error);
            resp.status(404).send();
        }else{
            resp.status(200).send({status: 1});
        }
    });
});



router.get('/signup', function(req, resp) {
    resp.sendFile(path.join(__dirname, '..', 'public', 'signup.html'));
});

router.post('/signup', function(req, resp) {
    const username = req.query.username;
    const pass = req.query.password;
    console.log(pass);

    connection.query(`SELECT * FROM users WHERE Username = '${username}'`, function(error, data){
        if(error){
            console.log(error);
            resp.status(500);
        }else{
            if(data.length > 0){
                resp.send({status: 0, message: "This username is alredy in use"});
            }else{
                const password = bcrypt.hashSync(pass, 10);
                connection.query(`INSERT INTO users (Username, Pass) 
                VALUES ('${username}', '${password}')`, function(error, ret){
                    if(error){
                        console.log(error);
                        resp.status(500);
                    }else{
                        const id = ret.insertId;
                        create_session(id).then(function(response){
                            if(response.status == 0){
                                resp.status(500);
                            }else{
                                resp.status(200).cookie('session_id', response.token, {maxAge: 2600000*1000}).send({status: 1});
                            }
                        }).catch(function(error){
                            console.log(error)
                            resp.status(500).send("Error creating session...");
                        })
                    }
                });
            }
        }
    });
});

router.get('/initialMoneey',verify_session, function(req, resp) {
    const user_id = req.user_id;
    connection.query(`SELECT 
    (SELECT SUM(Amount) FROM transactions WHERE Type_id = 1 AND Id_user = '${user_id}') -
    (SELECT SUM(Amount) FROM transactions WHERE Type_id = 2 AND Id_user = '${user_id}') AS Total;`, function(error, data) {
        if(error) {
            console.error(error);
            resp.status(500).send();
        }else{
            data = data[0].Total;
            resp.status(200).send({status: 1, money: data});
        }
    })
});

router.get('/getTransactions', verify_session, function(req, resp) {
    const user_id = req.user_id;
    connection.query(`SELECT Type_name, Date, Amount, Concept 
    FROM transactions
    INNER JOIN t_types ON t_types.Id = transactions.Type_id
    WHERE transactions.Id_user = ${user_id}
    ORDER BY Date DESC
    LIMIT 10;`, function(error, data){
        if(error) {
            console.error(error);
            resp.status(500).send();
        }else{
            resp.status(200).send({status: 1, transactions: data});
        }
    });
});

router.get('/newTransaction', verify_session, function(req, resp) {
    const user_id = req.user_id;
    const type = req.query.type;
    const date = req.query.date;
    const amount = req.query.amount;
    const concept = req.query.concept;

    if(amount > 0) {
        if(type == 1) {
            connection.query(`INSERT INTO transactions (Id_user, Type_id, Date, Amount, Concept) 
            VALUES ('${user_id}', '${type}', '${date}', '${amount}', '${concept}')`, function(error) {
                if(error) {
                    console.error(error);
                    resp.status(500).send();
                }else{
                    resp.status(200).send({status: 1});
                }
            });
        }else{
            connection.query(`SELECT 
            (SELECT SUM(Amount) FROM transactions WHERE Type_id = 1 AND Id_user = '${user_id}') -
            (SELECT SUM(Amount) FROM transactions WHERE Type_id = 2 AND Id_user = '${user_id}') AS Total;`, function(error, data) {
                if(error) {
                    console.error(error);
                    resp.status(500).send();
                }else{
                    if(data.length > 0) {
                        data = data[0].Total;
                        console.log(`Money: ${data}`);
                        if(data >= Number(amount)) {
                            connection.query(`INSERT INTO transactions (Id_user, Type_id, Date, Amount, Concept) 
                            VALUES ('${user_id}', '${type}', '${date}', '${amount}', '${concept}')`, function(error) {
                                if(error) {
                                    console.error(error);
                                    resp.status(500).send();
                                }else{
                                    resp.status(200).send({status: 1});
                                }
                            });
                        }else{
                            resp.status(200).send({status: 0, message: "Insuficient money"});
                        }
                    }
                }
            });
        }
    }else{
        resp.status(200).send({status: 0, message: "Please enter a valid number"});
    }
});




//FUNCTIONS.
async function verify_session(req, resp, next){
    const cookie = req.cookies['session_id'];
    console.log(cookie);
    const resolved = await get_session(cookie).catch(function(rejected) {
        console.log(rejected);
    });

    if(resolved) {
        req.user_id = resolved.User_id;
        req.username = resolved.Username;
        next();
    }else{
        resp.redirect('/login');
    }
}

async function get_session(cookie){
    return(
        new Promise(function(resolve, reject){
            connection.query(`SELECT * FROM sessions 
            INNER JOIN users ON sessions.User_id = users.Id AND sessions.session = '${cookie}'`, function(error, data){
                if(error){
                    reject(error);
                }else{
                    if(data.length > 0){
                        resolve(data[0]);
                    }else{
                        reject("Session not found...");
                    }
                }
            });
        })
    )
}

async function create_session(user){
    return(new Promise(async function(resolve, reject){
        var id;
        if(typeof user == "string"){
            id = await get_user_id(user)
        }else{
            id = user;
        }

        if(typeof id != "number"){
            reject({status: 0, message: "Error creating session..."});
        }else{
            const token = create_token(30);
            connection.query(`INSERT INTO sessions (User_id, Session) VALUES ('${id}', '${token}')`, function(error){
                if(error){
                    console.log(error);
                    reject({status: 0, message: "Error creating session..."});
                }else{
                    resolve({status: 1, token: token})
                }
            });
        }
    }));
}

function create_token(tam){
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = upper.toLowerCase();
    const number = "0123456789";
    const total = upper + lower + number;
    var token = "";

    for(var i=0; i<tam; i++){
        token += total[Math.floor(Math.random()*(total.length - 1))];
    }

    return token;
}


module.exports = router;
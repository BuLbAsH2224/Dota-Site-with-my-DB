const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const passport = require('passport')


const Pool = require('pg').Pool
const pool = new Pool({
    user:'express_512',
    host:'localhost',
    database:'db_express',
    password:'512',
    port:5432
})

function checkEmail(req,res){
    const {email} = req.body
    return new Promise( function(resolve, reject){
        pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results)=>{
            if(error){
                reject(error)
            } else {
                resolve(results.rows.length == 0)
            }
        })
    })
}

function signup(req,res){
    const {name, email, password} = req.body
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64,'sha512').toString('hex')
    return new Promise (function (resolve, reject){
        pool.query('INSERT INTO users (name, email, salt, hash) VALUES ($1, $2, $3, $4 )',[name, email, salt, hash], function (error, results){
            if(error){
                reject(error)
                res.status(500)
                res.type('text/plain')
                res.send('500 - Internal Server Error')
            } else {
                let expiry = new Date()
                expiry.setDate(expiry.getDate()+7)
                let token = jwt.sign({
                    name:name,
                    email:email,
                    exp: parseInt(expiry.getTime()/1000)
                }, 'secretCode')
                resolve({"message":"User is added",
                        "token": token}
                    )
            }
        })
    })
}
function login(req, res){
    const {email, password} = req.body
    passport.authenticate('local',
    function(err, user, info){
        if(err){
            res.status(404)
            res.send(err)
            return
        }
        if(user){
            let expiry = new Date()
                expiry.setDate(expiry.getDate()+7)
                let token = jwt.sign({
                    name:user.author_name,              //Добавлено  - user
                    email:user.email,                   //Добавлено  - user
                    exp: parseInt(expiry.getTime()/1000)
                }, 'secretCode')
                res.status(200)
                res.send({message: "You have successfully logged into your account","token":token})
        } else{
            res.status(401)
            res.send(info)
        }
    })(req, res)

}
module.exports = {
    checkEmail,
    signup,
    login
}

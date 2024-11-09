const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const crypto = require('crypto')



const Pool = require('pg').Pool
const pool = new Pool({
    user:'express_512',
    host:'localhost',
    database:'db_express',
    password:'512',
    port:5432
})


function checkEmail(email){
    
    return new Promise( function(resolve, reject){
        pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results)=>{
            if(error){
                reject(error)
            } else {
                resolve(results.rows)
            }
        })
    })
}

function verifyPassword(user, password) {
    const salt = user.salt; 
    let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return user.hash === hash;
}



passport.use(new LocalStrategy({
    usernameField:'email'                 
},function(username, password, done){     
    checkEmail(username)
    .then(response=>{

        let user = response[0]
        if(!user) return done(null, false, {
            message:"Incoorect email"
        })
        if(!verifyPassword(user, password)){
            return done(null, false, {message:"Incorrect password"})
        }
        return done(null, user)
        })
    })
)
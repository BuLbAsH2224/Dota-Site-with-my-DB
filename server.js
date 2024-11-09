const express = require("express");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken')
const authentication = require(`./authentication.js`)
const controllers = require("./controllers.js");
const passport  = require('passport')
require(`./passport.js`)
const app = express();

app.use(express.static("./public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (err, req, res, next){
    if(err.name = "UnauthorizedError"){
      res.status(401)
      res.send({"message":err.name+":"+err.message})
    }
  })
app.use(passport.initialize())
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});
const auth = (req, res, next)=>{  

    try{
        const {authorization} = req.headers
        console.log("Authorization", req.headers['authorization'])
        if(authorization){
            const token = authorization.split(' ')[1]
            const result = jwt.verify(token, 'secretCode',{algorithms:['HS256']})
            console.log("Result", result)
            next()
        } else {
            res.send("No token")
        }
    } catch{
        res.send({"message":"ERROR"})
    }
}


app.get('/getAllAccounts', function(req, res) {
    controllers.getAllAccounts()
        .then(result => {
            res.status(200);
            res.type("json"); 
            res.send(result);
        })
        .catch(err => console.error(err));
});

app.post('/getAccountFromId', function(req, res) {
    controllers.getAccountFromId(req,res)
        .then(result => {
            res.status(200);
            res.type("json"); 
            res.send(result);
        })
        .catch(err => console.error(err));
});

app.post('/addAccount',auth, function(req, res) {
    controllers.addAccount(req,res)
        .then(result => {
            res.status(200);
            res.type("json"); 
            res.send(result);
        })
        .catch(err => console.error(err));
});

app.post('/DeleteAccountFromId', auth,function(req, res) {
    controllers.DeleteAccountFromId(req,res)
        .then(result => {
            res.status(200);
            res.type("json"); 
            res.send(result);
        })
        .catch(err => console.error(err));
});

app.post('/UpdateAccount', auth,function(req, res) {
    controllers.UpdateAccount(req,res)
        .then(result => {
            res.status(200);
            res.type("json"); 
            res.send(result);
        })
        .catch(err => console.error(err));
});

app.post('/checkEmail', function(req, res) {
    authentication.checkEmail(req,res)
        .then(result => {
            res.status(200);
            res.type("json"); 
            res.send(result);
        })
        .catch(err => console.error(err));
});

app.post('/SignUp', function(req, res) {
    authentication.signup(req,res)
        .then(result => {
            res.status(200);
            res.type("json"); 
            res.send(result);
        })
        .catch(err => console.error(err));
});

app.post('/LogIn', function(req,res){
    authentication.login(req, res)

})

app.use(function(req, res, next) {
    res.status(404);
    res.type("text/plain");
    res.send("404 - Not Found");
});

app.use(function(error, req, res, next) {
    console.log(error);
    res.status(500);
    res.type("text/plain");
    res.send("Error 500");
});

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Server is listening at ${port}`); });

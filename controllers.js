const { Pool } = require("pg");
const pool = new Pool({
    user: 'express_512',
    host: 'localhost',
    database: 'db_express',
    password: '512',
    port: 5432
});



function getAllAccounts() {  
    return new Promise((resolve, reject) => {
        pool.query(`
            SELECT * FROM accounts`, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows);
            }
        });
    });
}

function getAccountFromId(req,res) {
    let {id} = req.body;  
    return new Promise((resolve, reject) => {
        pool.query(`
            SELECT * FROM accounts WHERE id = $1`,[id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows);
            }
        });
    });
}

function addAccount(req,res) {
    let {title,decency,description,mmr,price,guarantee,steamLevel, nOfMatches} = req.body;  
    return new Promise((resolve, reject) => {
        pool.query(`
            INSERT INTO accounts (title, decency, description, mmr, price, guarantee, steamLevel, nOfMatches) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,[title,decency,description,mmr,price,guarantee,steamLevel,nOfMatches], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve({message: "User is succesfully added"});
            }
        });
    });
}


function DeleteAccountFromId(req,res) {
    let {id} = req.body;  
    return new Promise((resolve, reject) => {
        pool.query(`
            DELETE FROM accounts WHERE id = $1`,[id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve({message: "Account is deleted"});
            }
        });
    });
}

function UpdateAccount(req,res){
    const {id,title,decency,description,mmr,price,guarantee,steamLevel, nOfMatches} = req.body
    return new Promise (function (resolve, reject){
        pool.query('UPDATE accounts SET title = $2, decency = $3, description = $4, mmr = $5, price = $6, guarantee = $7, steamLevel = $8, nOfMatches = $9 WHERE id = $1',[id,title,decency,description,mmr,price,guarantee,steamLevel, nOfMatches], function (error, results){
            if(error){
                reject(error)
                res.status(500)
                res.type('text/plain')
                res.send('500 - Internal Server Error')
            } else {
                resolve({message:"User is succesfully updated"}) 
            }
        })
    })
}

module.exports = {
    getAllAccounts,
    getAccountFromId,
    addAccount,
    DeleteAccountFromId,
    UpdateAccount
};

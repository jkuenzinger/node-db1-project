const express = require("express");

// going to make the database acessibly via knex

const db = require("./data/dbConfig.js");
 
const router = express.Router();
//this gets all accounts
router.get("/", (req,res) => {
    db.select()
    .from('accounts')
    .then(account => {
        res.json(account)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: error.message})
    })
})
// this gets accounts by id
router.get('/:id', (req,res) => {
    db('accounts')
    .where({ id: req.params.id})
    .first()
    .then(account => {
        res.status(200).json({data: account})
    })
})

//this is goin to post a new account
router.post('/', (req,res) => {
    const accountData =req.body
    db('accounts')
    .insert(accountData, 'id')
    .then(ids => {
        const id = ids[0];
        db('accounts')
        .where({id})
        .first()
        .then(account => {
            res.status(201).json({data: account})
        })
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: error.message})
    })
})

//here i am going to update an account 

module.exports = router;
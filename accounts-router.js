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
router.post("/", (req,res )=>{
    const postData=req.body;
    db("accounts")
    .insert(postData)
    .then(post=>{
        res.status(201).json(post)
    })
    .catch(err=>{
        res.status(500).json({message: "cannot create account"})
    })
})


//here i am going to update an account by id

router.put("/:id", (req,res)=>{
    const {id}=req.params
    const changes=req.body

    db("accounts")
    .where({id})
    .update(changes)
    .then(count=>{
        if(count){
            res.json({updated:count})
        }else{
            res.status(200).json(count)
        }
    })
    .catch(err=>{
        res.status(500).json({message: "cannot update "})
    })

})


// here I am goign to delete an account by id


router.delete("/:id", (req,res)=>{
    const {id}= req.params
    db("accounts")
    .where ({id})
    .del({id})
    .then(deleted=>{
        res.status(200).json(deleted
        )
    })
    .catch(
        err=>{
            res.status(500).json({message: "cannot delete"})
        }
    )
})

module.exports = router;
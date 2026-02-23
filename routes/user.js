const express = require('express');
const fs = require('fs');
const app = express.Router();
const users = require('../users.json');
const uuid = require('uuid');


app.get("/displayUsers", (req, res) => {
    if(!users) 
        return res.status(404).json({status: "error", message: "Users not found"});
    res.json(users);
});

app.post("/createUser", (req,res)=>
{
    const user=req.body;
    if(!user.first_name || !user.last_name || !user.email || !user.gender)
    {
        return res.status(400).json({message:"bad request"});
    }
    if(users.some(user=>user.email===req.body.email ))
    {
        return res.status(400).json({message:"email already exists"});
    }
    const newId = uuid.v4();
    users.push({id:newId,...user});
    fs.writeFile('./users.json',JSON.stringify(users),(err,data)=>{
        if(err)
            return res.status(500).json({ status: "error", message: "Failed to write file" });
        return res.json({status:"success", id:newId});
    }
    );  
});

app.get('/displayUser/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const user = users.find(user => user.id === id);
    if (!user) {
        return res.status(404).json({status: "error", message: "User not found"});
    }
    res.status(200).json({status: "success", message: "Successfully fetched user", user});
});

app.put("/updateUser/:id", (req, res) => {
    const id=req.params.id;
    const user=users.find(user=>user.id===id);
    if(!user)
    {
        return res.status(404).json({message:"user not found"});
    }
    if(users.some(user=>user.email===req.body.email ))
    {
        return res.status(400).json({message:"email already exists"});
    }
    if(req.body.first_name) user.first_name=req.body.first_name;
    if(req.body.last_name) user.last_name = req.body.last_name;
    if(req.body.email) user.email=req.body.email;
    if(req.body.gender) user.gender=req.body.gender;
    fs.writeFile('./users.json', JSON.stringify(users), (err) => {
        if (err) return res.status(500).json({message: "Error writing file"});
        return res.json({status: "success", id: user.id});
    });

});

app.delete('/deleteUser/:id', (req, res) => {
    const removeIndex = users.findIndex(user => user.id === req.params.id);
    if (removeIndex === -1) {
        return res.status(404).json({message: "User not found"});
    }
    users.splice(removeIndex, 1);
    fs.writeFile('./users.json', JSON.stringify(users), (err) => {
        if (err) return res.status(500).json({message: "Error writing file"});
        return res.json({status: "success", id: req.params.id});
    });
});

module.exports = app;
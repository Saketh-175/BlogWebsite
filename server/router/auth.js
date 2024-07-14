const express = require('express');
const router = express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
require('../db/conn');
const User = require('../model/userSchema');
router.get('/', (req, res) => {
    res.send("hello world from server router");
});
router.post('/register', async(req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "plz fill the details" });
    }
    try{
        const userExist=await User.findOne({ email: email})
        if (userExist) {
            return res.status(422).json({ error: "Email already exits" });
        }
        else if(password!=cpassword){
            return res.status(422).json({ error: "passwords are not matching" });
        }
        else{
        const user = new User({name,email,phone,work,password,cpassword });

        await user.save();

        res.status(201).json({ message: "data saved" })
        }
        
    }
    catch(err){
        console.log(err);
    }
});

//login route

router.post('/signin',async(req,res)=>{
    try{
    const {email,password}=req.body;

    if(!email || !password){
        return res.status(422).json({ error: "plz fill the details" });
    }
        const userExist= await User.findOne({email:email});

        if(userExist){
        const match=await bcrypt.compare(password,userExist.password);

        const token=await userExist.generateAuthToken();

        if(match){
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+256920000),
                httpOnly:true
            });
            res.status(200).json({ message: "login successfull" });
        }
        else{
            res.status(400).json({error:"invalid credintials"});
        }
    }
    else{
        res.status(400).json({error:"invalid credintials"});
    }
    }
    catch(err){
        console.log(err);
    }

})

module.exports = router;
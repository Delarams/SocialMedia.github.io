// import { request } from "express";
import {db} from "../connect.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) =>{
    
    // check if user exists
    const q = "SELECT * From users WHERE username = ?"
    db.query(q, [req.body.username], (err, data)=>{
        if(err) return res.status(500).json(err)
        if(data.length) return res.status(409).json("User already exists")
        // create new user

        // hash password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)

        const q = "INSERT INTO users (`username`, `email`, `password`, `name`) VALUE (?)" 

        const values = [
            req.body.username, 
            req.body.email, 
            hashedPassword, 
            req.body.name
        ];
        

        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("User has been created")    
        });
    } );


};

// export const login = (req, res) =>{
//     const q = "SELECT * FROM users WHERE username = ?"
//     db.query(q, [req.body.username], (err, data)=>{
//         if(err) return res.status(500).json(err);
//         if(data.length===0) return res.status(404).json("User not found!");

//         const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)

//         if(!checkPassword) return res.status(400).json("Wrong password or username!")
        
        
//         // example use: TO make sure only you can delete your own post
//         const token = jwt.sign({id:data[0].id}, "secretkey");

//         // separates password and other properties
//         const {password, ...others} = data[0]

//         // Using the cookie stores a hashed token includes the userId, and using that id
//         // we can delete posts, follow/unfollow people and more
//         res.cookie("accessToken", token, {
//             httpOnly: true,
//         })
//         .status(200)
//         .json(others);
//     });
// };

export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
        if (!checkPassword) return res.status(400).json("Wrong password or username!");

        const token = jwt.sign({ id: data[0].id }, "secretkey", { expiresIn: "1h" });

        const { password, ...others } = data[0];

        // ✅ Ensure cookies are stored correctly
        res.cookie("accessToken", token, {
            httpOnly: true, 
            secure: false,  // Set to true in production (HTTPS required)
            sameSite: "lax"
        }).status(200).json(others);
    });
};


export const logout = (req, res) =>{
    res.clearCookie("accessToken", {
        secure:true, 
        sameSite:"none"
    }).status(200).json("User has been logged out.")
};
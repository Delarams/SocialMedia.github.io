import {db} from "../connect.js"
import jwt from "jsonwebtoken";

export const getLikes = (req, res)=>{

    // AS p JOIN users AS u because we want fetch user data from user table to show the user s
    //profile pic on top of the post
    const q = "SELECT userId FROM likes WHERE postId = ?"

    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map(like=>like.userId))
    });

}

export const addLike =(req, res)=>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!")

        // AS p JOIN users AS u because we want fetch user data from user table to show the user s
        //profile pic on top of the post
        const q = "INSERT INTO likes (`userId`, `postId`) VALUES (?)"

        const values = [
            userInfo.id,
            req.body.postId
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been Liked!")
        });
    }); 
};

export const deleteLike =(req, res)=>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!")

        // AS p JOIN users AS u because we want fetch user data from user table to show the user s
        //profile pic on top of the post
        const q = "DELETE FROM likes WHERE `userId` = ? AND `postId`=?"


        db.query(q, [userInfo.id, req.query.postId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Like has been deleted!")
        });
    }); 
};
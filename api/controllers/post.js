import {db} from "../connect.js"
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
    console.log("🔍 Request received at /posts");
    console.log("🛠️ Full request query:", req.query); // Log the entire query object

    const userId = req.query.userId;
    console.log("🛠️ Extracted userId:", userId || "No userId provided"); // Log extracted userId

    const token = req.cookies.accessToken;

    if (!token) {
        console.log("🚨 No token found in cookies");
        return res.status(401).json("Not logged in!");
    }

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) {
            console.log("🚨 Token verification failed");
            return res.status(403).json("Token is not valid!");
        }

        console.log(`🔍 Fetching posts for userId: ${userId || userInfo.id}`);

        const q = userId
            ? `SELECT p.*, u.id AS userId, u.name, u.profilePic FROM posts AS p 
               JOIN users AS u ON (u.id = p.userId) 
               WHERE p.userId = ? ORDER BY p.createdAt DESC`
            : `SELECT p.*, u.id AS userId, u.name, u.profilePic FROM posts AS p 
               JOIN users AS u ON (u.id = p.userId) 
               LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) 
               WHERE r.followerUserId = ? OR p.userId = ? 
               ORDER BY p.createdAt DESC`;

        const values = userId ? [userId] : [userInfo.id, userInfo.id];

        console.log("🛠️ SQL Query:", q);
        console.log("🛠️ Query Values:", values);

        db.query(q, values, (err, data) => {
            if (err) {
                console.log("🚨 Database error:", err);
                return res.status(500).json(err);
            }
            console.log("✅ Posts fetched:", data.length, "posts found");
            return res.status(200).json(data);
        });
    });
};




export const addPost =(req, res)=>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!")

        // AS p JOIN users AS u because we want fetch user data from user table to show the user 
        //profile pic on top of the post
        const q = "INSERT INTO posts (`desc`, `img`, `createdAt`, `userId`) VALUES (?)"

        const values = [
            req.body.desc, 
            req.body.img, 
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been created!")
        });
    }); 
}
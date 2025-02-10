import express from "express";
const app = express();
app.use("/upload", express.static("../client/public/upload"));

import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js"
import authRoutes from "./routes/auth.js"
import cors from "cors"
import multer from "multer"
import cookieParser from "cookie-parser"
import fs from "fs";
import path from "path";



//middlewares
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(cookieParser())

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '../client/public/upload')
//     },
//     filename: function (req, file, cb) {
//         // Added Date.now() to avoid similar file names
//       cb(null, Date.now() + file.originalname)
//     }
// });

const uploadDirectory = path.join("../client/public/upload");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory); // Use the verified directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage });


app.post("/api/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        console.error("No file received!"); // Debugging line
        return res.status(400).json("No file uploaded");
    }

    console.log("Uploaded file:", req.file); // Debugging line

    const file = req.file;
    res.status(200).json(file.filename);
});


app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/auth", authRoutes)


app.listen(8800, ()=>{
    console.log("API working!")
});
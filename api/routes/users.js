import express from "express";
import {getUser} from "../controllers/user.js";

const router = express.Router()

// router.get("/test", getUser)
router.get("/test", (req,res)=>{
    res.send("it works!")
}
)

export default router
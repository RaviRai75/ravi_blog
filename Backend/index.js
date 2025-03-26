import express from "express"
import connectDB from "./lib/connectDB.js"
import userRouter from "./routes/user.route.js"
import postRouter from "./routes/post.route.js"
import commentRouter from "./routes/comment.route .js"
import webhookRouter from "./routes/webhook.route.js"
import { clerkMiddleware, requireAuth } from '@clerk/express'
import cors from "cors"


const app = express()
app.use(cors(process.env.CLIENT_URL))
app.use(clerkMiddleware())
app.use("/webhooks", webhookRouter)
app.use(express.json());


const port = process.env.PORT 


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
      "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// app.get("/auth-state", (req, res) => {
//     const authState = req.auth
//     res.json(authState)
// })
// app.get("/protect", (req, res) => {
//     const {userId} = req.auth
//     if (!userId) {
//         return res.status(401).json("not authenticate")
//     }
//     res.status(201).json("content")
// })
// app.get("/protect",  requireAuth(),(req, res) => {
   
//     res.status(201).json("content")
// })

app.use("/users" , userRouter)
app.use("/posts" , postRouter)
app.use("/comments", commentRouter)

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        message: error.message || 500,
        status: error.status,
        stack: error.stack,
    });
});

app.listen(port, () => {
    connectDB()
    console.log("Server is running")
})
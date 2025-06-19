import express, { Application, Request, Response } from "express";
import { notesRouter } from "./app/controllers/notes.controllers";
import { usersRoutes } from "./app/controllers/user.controller";


const app: Application = express();

// Middleware
app.use(express.json())

app.use("/notes", notesRouter)
app.use("/users", usersRoutes)


app.get("/", (req: Request, res: Response) => {
    res.send('Welcome to Learning Mongoose')
})



export default app;
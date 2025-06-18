import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();

// create schema
const noteSchema = new Schema({
    title: String,
    content: String
})

// create model
const Note = model("Note", noteSchema)

app.post("/create-note", async (req: Request, res: Response) => {
    const myNote = new Note({
        title: "Learning Mongoose",
        content: "I am Learning Mongoose"
    })

    await myNote.save()
    res.status(201).json({
        success: true,
        message: "Note created Successfully",
        note: myNote
    })
})


app.get("/", (req: Request, res: Response) => {
    res.send('Welcome to Learning Mongoose')
})



export default app;
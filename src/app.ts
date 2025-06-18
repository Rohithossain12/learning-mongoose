import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();

// create schema
const noteSchema = new Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, default: "" },
    category: {
        type: String,
        enum: ["personal", "work", "study", "other"],
        default: "personal"
    },
    pinned: {
        type: Boolean,
        default: false,
    }
})

// create model
const Note = model("Note", noteSchema)

app.post("/create-note", async (req: Request, res: Response) => {
    const myNote = new Note({
        title: "Learning Mongoose",
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
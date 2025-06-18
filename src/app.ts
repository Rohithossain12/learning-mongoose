import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();

// Middleware
app.use(express.json())

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
    },
    tags: {
        label: { type: String, required: true },
        color: { type: String, default: "gray" }
    }
})

// create model
const Note = model("Note", noteSchema)
// create note data
app.post("/notes/create-note", async (req: Request, res: Response) => {
    const noteData = req.body;
    //Approach -1 of creating a data
    // const myNote = new Note({
    //     title: "Learning Mongoose",
    // })
    // await myNote.save()
    //Approach -2 
    const note = await Note.create(noteData)

    res.status(201).json({
        success: true,
        message: "Note created Successfully",
        note
    })
})

// get all notes
app.get("/notes", async (req: Request, res: Response) => {
    const notes = await Note.find()

    res.status(201).json({
        success: true,
        message: "get all notes successfully",
        notes
    })


})
// get single note
app.get("/notes/:noteId", async (req: Request, res: Response) => {
    const id = req.params.noteId
    const note = await Note.findById(id)

    res.status(201).json({
        success: true,
        message: "get single notes successfully",
        note
    })


})
// delete note
app.delete("/notes/:noteId", async (req: Request, res: Response) => {
    const id = req.params.noteId;
    
    const note = await Note.findByIdAndDelete(id)

    res.status(201).json({
        success: true,
        message: " note delete successfully",
        note
    })


})
app.patch("/notes/:noteId", async (req: Request, res: Response) => {
    const id = req.params.noteId;
    const noteData =req.body;
    const note = await Note.findByIdAndUpdate(id,noteData,{new:true})

    res.status(201).json({
        success: true,
        message: " note updated successfully",
        note
    })


})







app.get("/", (req: Request, res: Response) => {
    res.send('Welcome to Learning Mongoose')
})



export default app;

import express, { Request, Response } from "express"
import { Note } from "../models/notes.model";
export const notesRouter =express.Router()

// create note data
notesRouter.post("/create-note", async (req: Request, res: Response) => {
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
notesRouter.get("/", async (req: Request, res: Response) => {
    const notes = await Note.find()

    res.status(201).json({
        success: true,
        message: "get all notes successfully",
        notes
    })


})
// get single note
notesRouter.get("/:noteId", async (req: Request, res: Response) => {
    const id = req.params.noteId
    const note = await Note.findById(id)

    res.status(201).json({
        success: true,
        message: "get single notes successfully",
        note
    })


})
// delete note
notesRouter.delete("/:noteId", async (req: Request, res: Response) => {
    const id = req.params.noteId;

    const note = await Note.findByIdAndDelete(id)

    res.status(201).json({
        success: true,
        message: " note delete successfully",
        note
    })


})
notesRouter.patch("/:noteId", async (req: Request, res: Response) => {
    const id = req.params.noteId;
    const noteData = req.body;
    const note = await Note.findByIdAndUpdate(id, noteData, { new: true })

    res.status(201).json({
        success: true,
        message: " note updated successfully",
        note
    })


})


import express, { Request, Response } from "express"
import { User } from "../models/user.model";
export const usersRoutes = express.Router()

// create user data
usersRoutes.post("/create-user", async (req: Request, res: Response) => {
    const userData = req.body;
    const user = await User.create(userData)
    res.status(201).json({
        success: true,
        message: " created user Successfully",
        user
    })
})

// get all users
usersRoutes.get("/", async (req: Request, res: Response) => {
    const users = await User.find()

    res.status(201).json({
        success: true,
        message: " all users retrieved  successfully",
        users
    })


})
// get single user
usersRoutes.get("/:userId", async (req: Request, res: Response) => {
    const id = req.params.userId
    const user = await User.findById(id)

    res.status(201).json({
        success: true,
        message: "User retrieved successfully",
        user
    })


});
// delete user
usersRoutes.delete("/:userId", async (req: Request, res: Response) => {
    const id = req.params.userId;

    const user = await User.findByIdAndDelete(id)

    res.status(201).json({
        success: true,
        message: " user delete successfully",
        user
    })


});

// specific user updated 
usersRoutes.patch("/:userId", async (req: Request, res: Response) => {
    const id = req.params.userId;
    const userData = req.body;
    const user = await User.findByIdAndUpdate(id, userData, { new: true })

    res.status(201).json({
        success: true,
        message: " user updated successfully",
        user
    })


})

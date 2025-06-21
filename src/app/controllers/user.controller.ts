
import express, { Request, Response } from "express"
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { z } from "zod";
export const usersRoutes = express.Router()


const createUserZodSchema = z.object(
    {
        firstName: z.string(),
        lastName: z.string(),
        age: z.number(),
        email: z.string(),
        password: z.string(),
        role: z.string().optional()
    }
)

// create user data
usersRoutes.post("/create-user", async (req: Request, res: Response) => {
    try {
        const body = req.body
        // const password = await bcrypt.hash(userData.password, 10);
        // userData.password = password
        // const userData = await createUserZodSchema.parseAsync(req.body)
        //    built in and custom instance methods
        // const user = new User(body)
        // const password = await user.hashPassword(body.password)
        // user.password = password 
        // await user.save()

        // built in and custom static methods
        // const password = await User.hashPassword(body.password);
        // console.log(password);
        // body.password = password
        const user = await User.create(body);

        res.status(201).json({
            success: true,
            message: " created user Successfully",
            user: user
        })
    } catch (error) {
        console.log(error);
    }
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

    // const user = await User.findByIdAndDelete(id)
    const user =await User.findOneAndUpdate({_id:id})

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

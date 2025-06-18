import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;
const PORT = 5000;


async function main() {

    try {
        await mongoose.connect('mongodb+srv://mongoose:mongoose@cluster0.uv360.mongodb.net/note-app?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Connected to mongoDB Using Mongoose");
        server = app.listen(PORT, () => {
            console.log(`App is Listening on port ${PORT}`);
        })

    } catch (error) {
        console.log(error);
    }
}


main()
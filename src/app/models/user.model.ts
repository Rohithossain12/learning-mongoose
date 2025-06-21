import { Model, model, Schema } from "mongoose";
import validator from "validator"
import bcrypt from "bcryptjs";
import { IAddress, IUser, UserInstanceMethods, UserStaticMethods } from "../interfaces/user.interface";
import { Note } from "./notes.model";


const addressSchema = new Schema<IAddress>({
    city: { type: String },
    street: { type: String },
    zip: { type: Number }
}, {
    _id: false
})



const userSchema = new Schema<IUser, UserStaticMethods, UserInstanceMethods>({
    firstName: {
        type: String,
        required: [true, "First Name daw nai kno"],
        trim: true,
        minlength: [5, "First Name must be al least 5 characters gog {VALUE}"],
        maxlength: 10,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 10,
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 60,
    },
    email: {
        type: String,
        unique: [true, "Email Common hoye gese!!"],
        required: true,
        lowercase: true,
        trim: true,
        // validate: {
        //     validator: function (value) {
        //         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        //     },
        //     message: function (props) {
        //         return `Email ${props.value} is not valid email`
        //     }
        // }
        validate: [validator.isEmail, "Invalid Email {VALUE}"]
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: {
            values: ['user', 'admin'],
            message: "Role is not valid. got {VALUE} role"
        },
        default: 'user'
    },
    address: {
        type: addressSchema
    }

}, {
    versionKey: false,
    timestamps: true
});

userSchema.method("hashPassword", async function (plainPassword: string) {
    const password = await bcrypt.hash(plainPassword, 10);
    return password

})
userSchema.static("hashPassword", async function (plainPassword: string) {
    const password = await bcrypt.hash(plainPassword, 10);
    return password

});


// Pre Hooks
// Document Middleware

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next()
});

// Query Middleware
userSchema.pre("find", async function ( next) {
    console.log("inside pre find hooks");
    next()
})

// Post Hooks

// Document Middleware
userSchema.post("save", function (doc,next) {
    console.log(`${doc.email} has been saved`);
    next()
})

// delete user and user create all post delete
// Query Middleware
userSchema.post("findOneAndUpdate", async function (doc,next) {
    if (doc) {
        console.log(doc);
        await Note.deleteMany({ user: doc._id })
    }
    next()
})


export const User = model<IUser, UserStaticMethods>("User", userSchema)


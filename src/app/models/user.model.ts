import { model, Schema } from "mongoose";
import validator from "validator"
import { IAddress, IUser } from "../interfaces/user.interface";


const addressSchema = new Schema<IAddress>({
    city: { type: String },
    street: { type: String },
    zip: { type: Number }
}, {
    _id: false
})



const userSchema = new Schema<IUser>({
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

},{
    versionKey: false,
    timestamps: true
});


export const User = model("User", userSchema)


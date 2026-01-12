import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'password must be atleast 6 characters long']
    },
    hasSubscribed: {
        type: Boolean,
        default:false
    },
    topicsCovered: {
        type: [String],
        default: []
    },
    description: {
        type: String,
        default: ''
    }
}, 
{ timestamps: true }
)

const User = mongoose.model("User", userSchema);

export default User
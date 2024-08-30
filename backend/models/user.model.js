import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String, unique:true, required:true},
    email:{type:String, unique:true, required:true},
    password:{type:String, required:true},
    profilePic:{type:String, default:''},
    bio:{type:String, default:'',maxlength: 20}
})

export const User = mongoose.model('User', userSchema);

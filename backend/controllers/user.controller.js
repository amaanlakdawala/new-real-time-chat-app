import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";


export const register = async (req,res)=>{
    try {
        console.log(req.body)
        const {username,email ,password} = req.body;
        console.log(username)
        console.log(email)
        console.log(password)
        if(!username || !email || !password){
            return res.status(400).json({message: "Please fill in all fields"});
        }
        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(401).json({
                message: "Email already exists",
                success:false
            })
        }

        const checkUserName = await User.findOne({username});
        if(checkUserName){
            return res.status(401).json({
                message: "Username already exists",
                success:false
                })
        }
         const hashPassword = await bcrypt.hash(password,10);

         const user =  new User({
            username,
            email,
            password:hashPassword
            })
        await user.save(); 

        return res.status(200).json({
            message:"Account Created Successfully",
            success:true
        })

    } catch (error) {
        console.log(error)
        console.log("error in regsiter controller")
    }

}


export const login = async (req,res) =>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "Please fill in all fields",success:false});
            }
        const user = await User.findOne({email})
        if (!user) return res.status(400).json({message:"User is not registered",success:false})
        
        const isPasswordMatch = await bcrypt.compare(password,user.password)
        if(!isPasswordMatch){
            return res.status(400).json({
                message: "Invalid password",
                success:false
            })
        }

        const token =  jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:'1d'})

         

        return res.cookie('token',token,{httpOnly:true,sameSite:'strict',maxAge:1*24*60*60*1000}).json({
            message:"Logged in Successfully",
            success:true ,
            user          
        })

        
    } catch (error) {
        console.log(error);
        console.log("error in login controller")
        
    }
}


export const logout = (req,res)=>{
    try {
        res.cookie('token','',{httpOnly:true,sameSite:'strict',maxAge:0})
        return res.json({message:"Logged out Successfully",success:true})
    } catch (error) {
        console.log(error)
        console.log("error in logout controller")
    }
}

export const getUserProfile = async (req,res)=>{
    const userId = req.id
    const user = await User.findById({_id:userId})
    if(!user){
        return res.status(400).json({
            message: "User not found",
            success:false
        })
    }
    return res.json({message:"User found",
        success:true
        ,user})

}

export const getAllUsers = async (req,res) =>{
    try {
        const userId = req.id
        const user = await User.find({_id:{$ne:userId}}).select('-password').sort({createdAt:-1})
        return res.status(200).json({
            message:"Users fetched successfully",
            success:true ,
            user
        })
       
    } catch (error) {
        console.log(error)
        console.log("error in getAllUser")
    }
}

export const updateProfile = async (req, res) => {
    try {
        console.log(req)
        const userId = req.id;
        const { username, bio } = req.body;
        const  profilePic  = req.file;

        
        const updateData = {};


       
        if (profilePic) {
            const fileUri = getDataUri(profilePic);
            const cloudResponse = await cloudinary.uploader.upload(fileUri);

            if (cloudResponse) {
                updateData.profilePic = cloudResponse.secure_url;
            }
        }

       
        if (username) updateData.username = username;
        if (bio) updateData.bio = bio;

        
        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error updating profile",
            success: false,
            error: error.message
        });
    }
};

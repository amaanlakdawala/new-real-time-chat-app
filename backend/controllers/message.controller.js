import { Message } from "../models/message.model.js"
import { getReceiverSocketId,io } from "../socket/socket.js"


export const sendMessage = async (req,res)=>{
    try {
        const senderId = req.id
        const receiverId = req.params.id
        const text = req.body.text
        if(!text) return res.json({message:"Enter a message as it cannot be empty",success:false})
        const message = new Message({
            senderId,
            receiverId,
            text
        })
        await message.save()
        await message.populate('senderId receiverId')

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId){
            io.to(receiverSocketId).emit('newMessage', message);
        }
        
        return res.status(200).json({
            message:"Message sent successfully",
            success:true,
            message
        })

    } catch (error) {
        console.log(error)
        console.log("error in sendMessage")
    }
}


export const getMessages = async (req,res)=>{
    try {
        const senderId = req.id
        const receiverId = req.params.id
        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId } // Swap the sender and receiver
            ]
        }).populate({ path: 'senderId receiverId', select: '-password' })

        if(!messages){
            return res.status(400).json({
                message:"No messages found",
                success:false
            })
        }

        return res.status(200).json({
            message:"Messages fetched successfully",
            success:true,
            messages
        })

        
    } catch (error) {
        console.log(error);
        console.log("error in getMessages");       
    }
}


export const getMessagedUser = async (req,res)=>{
    try {
        const userId = req.id
        const uniqueReceiverIds = await Message.distinct('receiverId', { senderId: userId });

        // Step 2: Fetch one message per unique receiverId and populate receiver details
        const users = await Promise.all(
          uniqueReceiverIds.map(async (receiverId) => {
            return await Message.findOne({ senderId: userId, receiverId })
              .populate('receiverId', '-password') // Populate the receiverId details, excluding password
              .exec();
          })
        );


        if(!users){
            return res.status(400).json({
                message:"User not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"User found successfully",
            success:true,
            users
        })
        
    } catch (error) {
        console.log(error);
        console.log("error in getMessagedUser of backend");
        
        
    }
}
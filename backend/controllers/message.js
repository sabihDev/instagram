import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const {message} = req.body;

        let conversation = await Conversation.findOne({participants:{$all:[senderId,receiverId]}});

        if(!conversation){
            conversation = await Conversation.create({participants:[senderId,receiverId]});
        }

        const newMessage = await Message.create({senderId,receiverId,message});

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        return res.status(200).json({status:'Message sent successfully', newMessage, success: true });
    } catch (error) {
        console.log(error);        
    }
}
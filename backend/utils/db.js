import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected Successfully`);

    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

export default connectDB
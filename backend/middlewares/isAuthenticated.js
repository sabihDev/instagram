import jwt from "jsonwebtoken";

const isAuthenticated = (req,res,next) => {
    try {
        const {token} = req.cookies;
        if (!token) {
            return res.status(401).json({message:"User Unauthenticated",success:false});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({message:" Invalid User",success:false});
        }

        req.id = decoded.userId;
        next();
    } catch (error) {
        console.log(error);        
    }
};

export default isAuthenticated;
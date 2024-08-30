import jwt from "jsonwebtoken"

const isAuthenticated = (req,res,next)=>{
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({
                message:"You are not authenticated and token not found",
                success:false
            })
        }
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        req.id=decoded.userId
        next()
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: "Invalid or expired token."
        });
        
    }
}

export default isAuthenticated;
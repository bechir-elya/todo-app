import jwt from 'jsonwebtoken';
import dotenv from "dotenv"

dotenv.config();

export default function verifyToken(req, res, next) {
   
    const token = req.cookies.token;

    if (!token) return res.status(400).json('Unauthorized');

     try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId;
        next();
     } catch (error) {
        res.status(401).json({error: 'Invalid cookie'});
     }
}
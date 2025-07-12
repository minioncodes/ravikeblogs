import jwt from 'jsonwebtoken'
export const userMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ msg: "Token is missing" });
        }

        const secret_key = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret_key);
        req.user = {
            id: decoded.id
        };
        next();
    } catch (error) {
        console.log("userMiddleware error:", error);
        return res.status(401).json({ msg: "Invalid or expired token" });
    }
};
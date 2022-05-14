import db from "../db.js";

export const validAdminToken = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        const token = authorization?.replace('Bearer ', '').trim()
        if (!token) {
            return res.sendStatus(401);
        }
        const session = await db.collection('adminSession').findOne({ token })
        if (!session) {
            return res.sendStatus(401);
        }
        const user = await db.collection('users').findOne({ _id: session.userId });
        if (!user) {
            return res.sendStatus(401);
        }
        next()
    } catch {
        res.sendStatus(500);
    }
}
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secret-key'; // Use the same secret key

export const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ error: 'Access denied', code: 403 });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token', code: 403 });
        }
        req.user = user;
        next();
    });
};

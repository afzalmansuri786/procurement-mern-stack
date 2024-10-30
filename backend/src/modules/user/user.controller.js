import User from './user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secret-key'; 

export const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required', code: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(201).json({ data: 'User registered successfully', code: 201 });
    } catch (error) {
        res.status(500).json({ error: error.message, code: 500 });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials', code: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials', code: 401 });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1 day' });
        res.json({ data: { token }, code: 200 });
    } catch (error) {
        res.status(500).json({ error: error.message, code: 500 });
    }
};

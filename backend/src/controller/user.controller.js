import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const signupUser = async (req, res) => {
    const { name, email, password } = req.body;

    const isUserAlreadyExists = await User.findOne({ email });
    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "user already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

    // set cookie to persist for 7 days
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });

    return res.status(201).json({
        message: "User registered successfully",
        user: {
            name: user.name,
            email: user.email,
            _id: user._id
        }
    })
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const isUserExists = await User.findOne({ email });
    if(!isUserExists){
        return res.status(400).json({
            message: "No such user exists"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,isUserExists.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message: "Incorrect email or password"
        })
    }

    const token = jwt.sign({
        id: isUserExists._id
    }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

    // set cookie to persist for 7 days
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });

    return res.status(200).json({
        message: `Welcome back ${isUserExists.name}`,
        user: {
            name: isUserExists.name,
            email: isUserExists.email,
            _id: isUserExists._id
        }
    })
}

export const logoutUser = async (req, res) => {
    // clear cookie using same options (except maxAge)
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });
    return res.status(200).json({
        message: "user logged out sucessfully"
    });
}

export const editDescription = async (req,res) => {
    try{ 
        const { userId, description } = req.body;

        const user = await User.findById(userId);

        user.description = description;
        await user.save();

        return res.status(200).json({
            message: "Description updated successfully",
            description: user.description
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({ message: "Not logged in" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id).select("name email _id topicsCovered description");

        if(!user){
            return res.status(404).json({ message: "User not found" })
        }

        return res.status(200).json({
            user
        })
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    };
};

export const completeTopic = async (req, res) => {
    try {
        const { userId, topicName } = req.body; 

        const user = await User.findById(userId);

        if (user.topicsCovered.includes(topicName)) {
            return res.status(400).json({
                message: "Topic already completed"
            });
        }

        user.topicsCovered.push(topicName);
        await user.save();

        res.status(200).json({
            message: "Topic marked as completed",
            totalCompleted: user.topicsCovered.length,
            topicsCovered: user.topicsCovered
        });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

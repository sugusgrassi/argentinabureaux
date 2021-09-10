import bcrypt from 'bycrptjs'; // to hash the paswords 
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';
dotenv.config()
const {
    SECRET
  } = process.env;


import User from '../models/user.js';

// To create the instances of users

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({message: "El usuario no está cargado"});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(404).json({message: "Credencial no válida"});
        
        // Token creation
        // Arguments ({object with the data}, secret password in .env, option object
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, SECRET, { expiresIn: '1h'});
        res.status(200).json({ result: existingUser, token})

    } catch (error) {
        // status(500): Internal Server Error
        res.status(500).json({ message: "Algo salió mal"})
    }
}


export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        // status(400): bad request
        if (existingUser) return res.status(400).json({message: "El usuario ya está cargado"});

        if(password !== confirmPassword) return res.status(400).json({message: "Las contraseñas no coinciden"});

        // arguments (password, salt: level of difficult usually 12)
        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`})

        const token = jwt.sign({ email: result.email, id: result._id}, SECRET, { expiresIn: '1h'});

        res.status(200).json({ result, token })
        
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal"})
    }
}
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (req, res) => {
	const { email, password } = req.body;
	try {
		const userExist = await User.findOne({ email });

		if (!userExist) return res.status(404).json({ message: 'User does not exist.' });

		const isPasswordCorrect = bcrypt.compare(password, userExist.password);

		if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials.' });

		const token = jwt.sign({ email: userExist.email, id: userExist._id }, 'test', { expiresIn: '1h' });

		res.status(200).json({ result: userExist, token });

	} catch (error) {
		res.status(500).json({ message : 'Something went wrong' }) ;
	}
};

export const signup = async (req, res) => {
	const { firstName, lastName, email, password, confirmPassword } = req.body ;
	try {
		const userExist = await User.findOne({ email });

		if(userExist) return res.status(400).json({ message : 'User already exist.' }) ;

		if(password !== confirmPassword) return res.status(400).json({ message : 'Password does not match.' }) ;

		const hashedPassword = await bcrypt.hash(password,12) ; 

		const result = await User.create( {email, password : hashedPassword , name : `${firstName} ${lastName}`} ) ;

		const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' });

		res.status(200).json({ result, token });

	} catch (error) {
		res.status(500).json({ message : 'Something went wrong' }) ;
	}
};
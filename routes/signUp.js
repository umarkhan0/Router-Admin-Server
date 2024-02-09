import express from 'express';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import dotenv from 'dotenv';
import Admin from '../models/SingUp.js';
import Jwt from "jsonwebtoken"
dotenv.config();



const router = express.Router();

const userSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().required().min(6),
});



router.post('/', async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const password = await bcrypt.hash(req.body.password, 10);
    const user = new Admin({ ...req.body, password});
   await user.save();

   
      const token = Jwt.sign({ email: req.body.email }, process.env.JWT_SECRET);
      res.status(200).send({ message: token });

   

  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(400).send({ status_code: 400, message: err.message });
  }
});

export default router;

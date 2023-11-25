import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      return res.send({
        success: false,
        message: 'User already exists',
      });
    }

    const hashedPassword: string = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();

    const token: string = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1d',
      }
    );

    res.send({
      success: true,
      message: 'User created successfully',
      data: token,
    });
  } catch (error: any) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.send({
        success: false,
        message: 'User does not exist',
      });
    }

    const validPassword: boolean = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.send({
        success: false,
        message: 'Invalid password',
      });
    }

    const token: string = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1d',
      }
    );

    res.send({
      success: true,
      message: 'User logged in successfully',
      data: token,
    });
  } catch (error: any) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

export default router;

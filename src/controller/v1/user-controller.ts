import { Request, Response } from 'express';
import Users, { User } from '../../db/schemas/users';
import bcrypt from 'bcrypt';
import { sendError, validaObjectId } from '../../utils/errors';
import Products from '../../db/schemas/products';
import jwt from 'jsonwebtoken';

export const getUsers = async (rq: Request, rs: Response): Promise<void> => {
  const users = await Users.find().select({ password: 0, __v: 0 }); // Select sirve para que password: 0 no aparezca
  rs.send(users);
};

export const getUserById = async (rq: Request, rs: Response): Promise<void> => {
  try {
    const { userId } = rq.params;
    validaObjectId(userId);
    const user = await Users.findById(userId).select({ password: 0, __v: 0 });

    if (user) {
      rs.send(user);
    } else {
      rs.status(404).send({});
    }
  } catch (e) {
    sendError(rs, e);
  }
};

export const createUser = async (rq: Request, rs: Response): Promise<void> => {
  try {
    const { email, firstName, lastName, avatar, password } = rq.body;
    const hash: string = await bcrypt.hash(password, 15);
    const newUser = await Users.create({
      email,
      firstName,
      lastName,
      avatar,
      password: hash,
    });

    rs.send(newUser);
  } catch (e) {
    sendError(rs, e);
  }
};

export const deleteUserById = async (
  rq: Request,
  rs: Response
): Promise<void> => {
  try {
    const { userId } = rq.params;
    validaObjectId(userId);
    const user = await Users.findByIdAndDelete(userId);

    if (user) {
      await Products.deleteMany({ user: user._id });
      rs.send('OK');
    } else {
      rs.send(404).send({});
    }
  } catch (e) {
    sendError(rs, e);
  }
};

export const login = async (rq: Request, rs: Response): Promise<void> => {
  try {
    const { email, password } = rq.body;
    const user: User | null = await Users.findOne({ email });

    if (!user) {
      throw rs.status(404).send('User not found');
    } else {
      const isOk: boolean = await bcrypt.compare(password, user.password);

      if (!isOk) {
        throw rs.status(401).send('Invalid password');
      }

      const expiresIn = 60 * 60;
      // Token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET!,
        {
          expiresIn
        }
      );

      rs.send({ toke: token, expiresIn });
    }
  } catch (e) {
    sendError(rs, e);
  }
};

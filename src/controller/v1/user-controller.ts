import { Request, Response } from 'express';
// import { users } from '../../data/users';
import Users from '../../db/schemas/users';
import bcrypt from 'bcrypt';
import mongo from 'mongoose';

export const getUsers = async (rq: Request, rs: Response): Promise<void> => {
  // rs.send({
  //   page: 1,
  //   per_page: 6,
  //   total: 12,
  //   total_pages: 2,
  //   data: users,
  //   support: {
  //     url: 'https://reqres.in/#support-heading',
  //     text: 'To keep ReqRes free, contributions towards server costs are appreciated!',
  //   },
  // });
  const users = await Users.find().select({ password: 0, __v: 0 }); // Select sirve para que password: 0 no aparezca
  rs.send(users);
};

export const getUserById = async (rq: Request, rs: Response): Promise<void> => {
  const { userId } = rq.params;

  const user = await Users.findById(userId).select({ password: 0, __v: 0 });

  if (user) {
    rs.send(user);
  } else {
    rs.status(404).send({});
  }

  // const index = users.findIndex((item) => item.id === parseInt(userId));

  // if (index !== -1) {
  //   rs.send({ data: users[index] });
  // } else {
  //   rs.status(404).send({});
  // }
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
    if (e instanceof mongo.mongo.MongoError) {
      rs.status(400).send({
        code: e.code,
        message: e.code === 11000 ? 'Valor duplicado' : 'Error',
      });
      return;
    }
    rs.status(500).send(e.message);
  }
};

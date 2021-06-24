import { Request, Response } from 'express';
import { users } from '../../data/users';

export const getUsers = (rq: Request, rs: Response): void => {
  rs.send({
    page: 1,
    per_page: 6,
    total: 12,
    total_pages: 2,
    data: users,
    support: {
      url: 'https://reqres.in/#support-heading',
      text: 'To keep ReqRes free, contributions towards server costs are appreciated!',
    },
  });
};

export const getUserById = (rq: Request, rs: Response): void => {
  const { userId } = rq.params;
  const index = users.findIndex((item) => item.id === parseInt(userId));

  if (index !== -1) {
    rs.send({ data: users[index] });
  } else {
    rs.status(404).send({});
  }
};

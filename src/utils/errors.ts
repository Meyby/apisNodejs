import { Response } from "express";
import { isValidObjectId, mongo } from 'mongoose';

const { MongoError } = mongo

export const validaObjectId = (id: string): void => {
  if (!isValidObjectId(id)) {
    console.log(Error);
    throw new Error(`Invalid ObjectId ${id}`);
  }
};

export const sendError = (rs: Response, e: any): void => {
  console.log(e);
  if (e instanceof MongoError) {
    rs.status(400).send({
      code: e.code,
      message: e.code === 11000 ? 'Valor duplicado' : 'Error',
    });
    return;
  }
  const statusCode: number = e.code || 500;
  rs.status(statusCode).send(e.message);
};

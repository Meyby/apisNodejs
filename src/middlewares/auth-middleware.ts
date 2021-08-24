/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    export interface Request {
      session: {
        userId: string;
        email: string;
      }
    }
  }
}

export const checkAut = (rq: Request, rs: Response, next: NextFunction) => {
  try {
    // const tokenUsar = rq.headers['<Nombre>o<nombre-token>'] se usa en caso de 
    const { token } = rq.headers;
    if (!token) {
      throw new Error("Falta el token de encabezado"); 
    }

    const {userId, email}  = jwt.verify(token as string, process.env.JWT_SECRET!) as any;
    rq.session = {
      userId, email
    }
    
    next(); // si no se coloca el next no sigue el flujo

  } catch (e: any) {
    rs.status(401).send(e.message);
  }  
}

export const checkIp = (rq: Request, rs: Response, next: NextFunction) => {
  if (rq.hostname === 'localhost') {
    next();
  } else {
    rs.status(403).send('Acceso denegado');
  }
}
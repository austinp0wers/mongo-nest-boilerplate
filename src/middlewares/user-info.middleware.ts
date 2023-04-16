import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

interface DecodedJwtPayload extends jwt.JwtPayload {
  clientId: string;
}

@Injectable()
export class UserInfoMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET,
        ) as DecodedJwtPayload;
        req['clientId'] = decoded.clientId;
      } catch (err) {
        console.error(err);
      }
      next();
    }
  }
}

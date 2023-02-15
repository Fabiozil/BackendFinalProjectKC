import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UUIDValidator implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers['trace-uuid']) {
      console.log('trace-uuid header not found, generating header');
      req.headers['trace-uuid'] = `self-generated-${uuidv4()}`;
    }
    next();
  }
}

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const oldJson = res.json;
    res.json = (body) => {
      res.locals.body = body;
      return oldJson.call(res, body);
    };

    res.on('finish', () => {
      const logData = {
        url: req.originalUrl,
        body: req.body,
        user: req.user ? (req.user as any).id : 'anonymous', // Adjust according to your auth setup
        method: req.method,
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
      };
      if (req.method !== 'GET') this.loggerService.create(logData);
    });

    next();
  }
}

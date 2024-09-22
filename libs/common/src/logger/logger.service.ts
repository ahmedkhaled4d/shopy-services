import { Logger, LoggerDocument } from '@app/database/schemas/logger.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LoggerService {
  constructor(
    @InjectModel(Logger.name) private loggerModel: Model<LoggerDocument>,
  ) {}

  async create(logData: Partial<Logger>): Promise<Logger> {
    const createdLog = new this.loggerModel(logData);
    return createdLog.save();
  }
}

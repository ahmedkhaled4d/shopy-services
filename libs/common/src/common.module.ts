import { Module } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [DatabaseModule],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class CommonModule {}

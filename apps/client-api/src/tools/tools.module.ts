import { Module } from '@nestjs/common';
import { MenuService } from './menu/menu.service';
import { MenuController } from './menu/menu.controller';

@Module({
  controllers: [MenuController],
  providers: [MenuService],
})
export class ToolsModule {}

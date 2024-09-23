import { Module } from '@nestjs/common';
import { PagesService } from './pages/pages.service';
import { TemplatesService } from './templates/templates.service';
import { LearnService } from './learn/learn.service';
import { DiscoverService } from './discover/discover.service';
import { BlogController } from './blog/blog.controller';
import { BlogService } from './blog/blog.service';

@Module({
  providers: [PagesService, TemplatesService, LearnService, DiscoverService, BlogService],
  controllers: [BlogController]
})
export class WebsiteModule {}

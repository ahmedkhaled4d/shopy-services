import { Test, TestingModule } from '@nestjs/testing';
import { AiApiController } from './ai-api.controller';
import { AiApiService } from './ai-api.service';

describe('AiApiController', () => {
  let aiApiController: AiApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AiApiController],
      providers: [AiApiService],
    }).compile();

    aiApiController = app.get<AiApiController>(AiApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(aiApiController.getHello()).toBe('Hello World!');
    });
  });
});

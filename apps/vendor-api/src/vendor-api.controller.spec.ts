import { Test, TestingModule } from '@nestjs/testing';
import { VendorApiController } from './vendor-api.controller';
import { VendorApiService } from './vendor-api.service';

describe('VendorApiController', () => {
  let vendorApiController: VendorApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [VendorApiController],
      providers: [VendorApiService],
    }).compile();

    vendorApiController = app.get<VendorApiController>(VendorApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(vendorApiController.getHello()).toBe('Hello World!');
    });
  });
});

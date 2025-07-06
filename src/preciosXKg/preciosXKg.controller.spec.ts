import { Test, TestingModule } from '@nestjs/testing';
import { PreciosXKgController } from './preciosXKg.controller';

describe('PreciosXKgController', () => {
  let controller: PreciosXKgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreciosXKgController],
    }).compile();

    controller = module.get<PreciosXKgController>(PreciosXKgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

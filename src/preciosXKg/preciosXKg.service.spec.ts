import { Test, TestingModule } from '@nestjs/testing';
import { PreciosXKgService } from './preciosXKg.service';

describe('PreciosXKgService', () => {
  let service: PreciosXKgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreciosXKgService],
    }).compile();

    service = module.get<PreciosXKgService>(PreciosXKgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PromediosVariedadService } from './promedios-variedad.service';

describe('PromediosVariedadService', () => {
  let service: PromediosVariedadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromediosVariedadService],
    }).compile();

    service = module.get<PromediosVariedadService>(PromediosVariedadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PromediosEspecieService } from './promedios-especie.service';

describe('PromediosService', () => {
  let service: PromediosEspecieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromediosEspecieService],
    }).compile();

    service = module.get<PromediosEspecieService>(PromediosEspecieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

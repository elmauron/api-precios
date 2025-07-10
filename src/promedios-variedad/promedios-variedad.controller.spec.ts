import { Test, TestingModule } from '@nestjs/testing';
import { PromediosVariedadController } from './promedios-variedad.controller';

describe('PromediosVariedadController', () => {
  let controller: PromediosVariedadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromediosVariedadController],
    }).compile();

    controller = module.get<PromediosVariedadController>(PromediosVariedadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

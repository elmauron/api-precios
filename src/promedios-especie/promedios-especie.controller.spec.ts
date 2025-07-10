import { Test, TestingModule } from '@nestjs/testing';
import { PromediosController } from './promedios-especie.controller';

describe('PromediosController', () => {
  let controller: PromediosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromediosController],
    }).compile();

    controller = module.get<PromediosController>(PromediosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

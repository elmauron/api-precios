import { Module } from '@nestjs/common';
import { PromediosVariedadController } from './promedios-variedad.controller';
import { PromediosVariedadService } from './promedios-variedad.service';

@Module({
  controllers: [PromediosVariedadController],
  providers: [PromediosVariedadService]
})
export class PromediosVariedadModule {}

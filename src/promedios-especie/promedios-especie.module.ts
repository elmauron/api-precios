import { Module } from '@nestjs/common';
import { PromediosEspecieController } from './promedios-especie.controller';
import { PromediosEspecieService } from './promedios-especie.service';

@Module({
  controllers: [PromediosEspecieController],
  providers: [PromediosEspecieService]
})
export class PromediosEspecieModule { }

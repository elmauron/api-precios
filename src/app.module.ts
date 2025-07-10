import { Module } from '@nestjs/common';
import { PreciosModule } from './precios/precios.module';
import { PreciosXKgController } from './preciosXKg/preciosXKg.controller';
import { PreciosXKgService } from './preciosXKg/preciosXKg.service';
import { PreciosXKgModule } from './preciosXKg/preciosXKg.module';
import { PromediosEspecieModule } from './promedios-especie/promedios-especie.module';
import { PromediosVariedadModule } from './promedios-variedad/promedios-variedad.module';
import { EspecieModule } from './especie/especie.module';

@Module({
  imports: [PreciosModule, PreciosXKgModule, PromediosEspecieModule, PromediosVariedadModule, EspecieModule],
  controllers: [PreciosXKgController],
  providers: [PreciosXKgService],
})
export class AppModule { }

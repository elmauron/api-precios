import { Module } from '@nestjs/common';
import { PreciosModule } from './precios/precios.module';
import { PreciosXKgController } from './preciosXKg/preciosXKg.controller';
import { PreciosXKgService } from './preciosXKg/preciosXKg.service';
import { PreciosXKgModule } from './preciosXKg/preciosXKg.module';

@Module({
  imports: [PreciosModule, PreciosXKgModule],
  controllers: [PreciosXKgController],
  providers: [PreciosXKgService],
})
export class AppModule { }

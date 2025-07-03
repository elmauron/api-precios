import { Module } from '@nestjs/common';
import { PreciosModule } from './precios/precios.module';

@Module({
  imports: [PreciosModule],
  controllers: [],
  providers: [],
})
export class AppModule { }

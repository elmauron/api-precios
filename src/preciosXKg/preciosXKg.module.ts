import { Module } from '@nestjs/common';
import { PreciosXKgController } from './preciosXKg.controller';
import { PreciosXKgService } from './preciosXKg.service';

@Module({
    controllers: [PreciosXKgController],
    providers: [PreciosXKgService]
})
export class PreciosXKgModule { }

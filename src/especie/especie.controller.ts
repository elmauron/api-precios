import { Controller, Get, Query } from '@nestjs/common';
import { EspecieService } from './especie.service';

@Controller('especie')
export class EspecieController {
    constructor(private readonly especieService: EspecieService) { }

    @Get()
    getAllEspecies(
        @Query('limit') limit?: string
    ) {
        return this.especieService.getAllEspecies({ limit: limit ? parseInt(limit) : undefined });
    }
}

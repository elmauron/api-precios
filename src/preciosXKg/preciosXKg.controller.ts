import { Controller, Get, Query } from '@nestjs/common';
import { PreciosXKgService } from './preciosXKg.service';

@Controller('precios-x-kg')
export class PreciosXKgController {
    constructor(private readonly preciosService: PreciosXKgService) { }

    @Get()
    getFiltrado(
        @Query('especie') especie?: string,
        @Query('fecha') fecha?: string,
        @Query('origen') origen?: string,
        @Query('limit') limit?: string
    ) {
        return this.preciosService.getAllFiltrado({ especie, fecha, origen, limit: limit ? parseInt(limit) : undefined });
    }

}

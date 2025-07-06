import { Controller, Get, Query } from '@nestjs/common';
import { PreciosService } from './precios.service';

@Controller('precios')
export class PreciosController {
    constructor(private readonly preciosService: PreciosService) { }

    @Get()
    getFiltrado(
        @Query('especie') especie?: string,
        @Query('fecha') fecha?: string,
        @Query('origen') origen?: string,
        @Query('limit') limit?: string
    ) {
        return this.preciosService.getAllFiltrado({ especie, fecha, origen, limit: limit ? parseInt(limit) : undefined });
    }

    @Get('xkg')
    getFiltradoXKg(
        @Query('especie') especie?: string,
        @Query('fecha') fecha?: string,
        @Query('origen') origen?: string,
        @Query('limit') limit?: string
    ) {
        return this.preciosService.getAllFiltradoXKg({ especie, fecha, origen, limit: limit ? parseInt(limit) : undefined });
    }

}
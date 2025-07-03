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
    ) {
        return this.preciosService.getAllFiltrado({ especie, fecha, origen });
    }

    @Get('por-especie')
    getAllByEspecie(@Query('especie') especie: string) {
        return this.preciosService.getAllPreciosByEspecie(especie);
    }

    @Get('por-fecha')
    getAllByFecha(@Query('fecha') fecha: string) {
        return this.preciosService.getAllPreciosByFecha(fecha);
    }

}
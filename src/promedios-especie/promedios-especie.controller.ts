import { Controller, Get, Query } from '@nestjs/common';
import { PromediosEspecieService } from './promedios-especie.service';

@Controller('promedios-especie')
export class PromediosEspecieController {
    constructor(private readonly promediosService: PromediosEspecieService) { }

    @Get()
    async getPromediosPorEspecie(
        @Query('especie') especie: string,
        @Query('from') from?: string,
        @Query('to') to?: string,
    ) {
        return this.promediosService.getPromediosPorEspecie(especie, from, to);
    }


    @Get('xkg')
    getPromediosVariedadXKg(
        @Query('fecha') fecha?: string,
        @Query('especie') especie?: string
    ) {
        return this.promediosService.getPromediosPorEspecieXKg({ especie, fecha });
    }
}

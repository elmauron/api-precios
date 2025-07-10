import { Controller, Get, Query } from '@nestjs/common';
import { PromediosVariedadService } from './promedios-variedad.service';

@Controller('promedios-variedad')
export class PromediosVariedadController {
    constructor(private readonly promediosService: PromediosVariedadService) { }

    @Get()
    getPromediosVariedad(
        @Query('fecha') fecha?: string,
        @Query('variedad') variedad?: string
    ) {
        return this.promediosService.getPromediosPorVariedad({ variedad, fecha });
    }

    @Get('xkg')
    getPromediosVariedadXKg(
        @Query('fecha') fecha?: string,
        @Query('variedad') variedad?: string
    ) {
        return this.promediosService.getPromediosPorVariedadXKg({ variedad, fecha });
    }
}

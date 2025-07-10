import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class EspecieService {
    private prisma = new PrismaClient();

    async getAllEspecies({         //ENPOINT PARA TRAER ESPECIES A GUSTO, YA SEA POR ESPECIE, FECHA, ORIGEN, ETC.
        limit,
    }: {
        limit?: number;
    }) {
        // Filtro general
        const where: any = {};

        // Subfiltros del producto
        const productoFilter: Record<string, any> = {};

        // Si hay algún filtro de producto, lo agregamos
        if (Object.keys(productoFilter).length > 0) {
            where.cat_productos = productoFilter;
        }

        // Consulta a la base
        const especies = await this.prisma.cat_especies.findMany({
            where,
            take: limit,
            include: { cat_variedades: true },
        });

        // Transformamos la respuesta
        return especies.map((especies) => ({
            especie_id: especies.especie_id,
            especie: especies.nombre,
            cantidad_variedades: especies.cat_variedades.length,
            variedades: especies.cat_variedades.map((v) =>
                v.nombre && v.nombre !== 'NaN' ? v.nombre : 'No especificada'
            ),

        }));
    }


}

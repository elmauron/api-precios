import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PromediosVariedadService {
    private prisma = new PrismaClient();

    async getPromediosPorVariedad({
        variedad,
        fecha,
    }: {
        variedad?: string;
        fecha?: string;
    }) {
        const where: any = {};

        const variedadFilter: Record<string, any> = {};


        if (variedad) {
            const parsedId = Number(variedad);

            if (!isNaN(parsedId)) {
                // Si es un número, filtro por ID
                variedadFilter.is = {
                    variedad_id: parsedId,
                };
            } else {
                // Si no es un número, asumo que es el nombre
                variedadFilter.is = {
                    nombre: {
                        equals: variedad,
                        mode: 'insensitive',
                    },
                };
            }
        }

        // Si hay algún filtro de variedad, lo agregamos
        if (Object.keys(variedadFilter).length > 0) {
            where.cat_variedades = variedadFilter;
        }

        // Filtro por fecha
        if (fecha) {
            const start = new Date(fecha);
            const end = new Date(start);
            end.setDate(end.getDate() + 1);

            where.fecha = {
                gte: start,
                lt: end,
            };
        }

        // Consulta a la base
        const precios = await this.prisma.preciospromediovariedad.findMany({
            where,
            orderBy: { fecha: 'desc' },
            include: {
                cat_variedades: {
                    include: { cat_especies: true }
                }
            }
        });

        // Transformamos la respuesta
        return precios.map((precio) => ({
            especie: precio.cat_variedades.cat_especies.nombre,
            variedad: precio.cat_variedades.nombre,
            fecha: precio.fecha,
            precio_promedio_variedad: precio.precio_promedio_var,
        }));
    }

    async getPromediosPorVariedadXKg({
        variedad,
        fecha,
    }: {
        variedad?: string;
        fecha?: string;
    }) {
        const where: any = {};

        const variedadFilter: Record<string, any> = {};


        if (variedad) {
            const parsedId = Number(variedad);

            if (!isNaN(parsedId)) {
                // Si es un número, filtro por ID
                variedadFilter.is = {
                    variedad_id: parsedId,
                };
            } else {
                // Si no es un número, asumo que es el nombre
                variedadFilter.is = {
                    nombre: {
                        equals: variedad,
                        mode: 'insensitive',
                    },
                };
            }
        }

        // Si hay algún filtro de variedad, lo agregamos
        if (Object.keys(variedadFilter).length > 0) {
            where.cat_variedades = variedadFilter;
        }

        // Filtro por fecha
        if (fecha) {
            const start = new Date(fecha);
            const end = new Date(start);
            end.setDate(end.getDate() + 1);

            where.fecha = {
                gte: start,
                lt: end,
            };
        }

        // Consulta a la base
        const precios = await this.prisma.preciospromediovariedad.findMany({
            where,
            orderBy: { fecha: 'desc' },
            include: {
                cat_variedades: {
                    include: { cat_especies: true }
                }
            }
        });

        // Transformamos la respuesta
        return precios.map((precio) => ({
            especie: precio.cat_variedades.cat_especies.nombre,
            variedad: precio.cat_variedades.nombre,
            fecha: precio.fecha,
            precio_promedio_variedad_x_kg: precio.precio_promedio_var_x_kg,
        }));

    }
}

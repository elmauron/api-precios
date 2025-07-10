import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PromediosEspecieService {
    private prisma = new PrismaClient();

    async getPromediosPorEspecie(especie: string, from?: string, to?: string) {
        const where: any = {
            cat_variedades: {
                cat_especies: {
                    nombre: {
                        equals: especie,
                        mode: 'insensitive',
                    },
                },
            },
        };

        if (from || to) {
            where.PreciosDiarios = {
                some: {
                    fecha: {
                        ...(from && { gte: new Date(from) }),
                        ...(to && { lte: new Date(to) }),
                    },
                },
            };
        }

        const variedades = await this.prisma.cat_variedades.findMany({
            where: {
                cat_especies: {
                    nombre: {
                        equals: especie,
                        mode: 'insensitive',
                    },
                },
            },
            include: {
                cat_productos: {
                    include: {
                        preciosdiarios: {
                            where: {
                                ...(from || to) && {
                                    fecha: {
                                        ...(from && { gte: new Date(from) }),
                                        ...(to && { lte: new Date(to) }),
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });


        const flattened = variedades.flatMap(v =>
            v.cat_productos.flatMap(p =>
                p.preciosdiarios.map(d => ({
                    fecha: d.fecha,
                    precio_mayorista: Number(d.precio_mayorista),
                    precio_minorista: Number(d.precio_minorista),
                    precio_modal: Number(d.precio_modal),
                    variedad: v.nombre,
                }))
            )
        );
        return flattened;
    }


    async getPromediosPorEspecieXKg({
        especie,
        fecha,
    }: {
        especie?: string;
        fecha?: string;
    }) {
        const where: any = {};

        const especieFilter: Record<string, any> = {};


        if (especie) {
            const parsedId = Number(especie);

            if (!isNaN(parsedId)) {
                // Si es un número, filtro por ID
                especieFilter.is = {
                    especie_id: parsedId,
                };
            } else {
                // Si no es un número, asumo que es el nombre
                especieFilter.is = {
                    nombre: {
                        equals: especie,
                        mode: 'insensitive',
                    },
                };
            }
        }

        // Si hay algún filtro de especie, lo agregamos
        if (Object.keys(especieFilter).length > 0) {
            where.cat_especies = especieFilter;
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
        const precios = await this.prisma.preciospromedioespecie.findMany({
            where,
            orderBy: { fecha: 'desc' },
            include: { cat_especies: true }
        });

        // Transformamos la respuesta
        return precios.map((precio) => ({
            especie: precio.cat_especies.nombre,
            fecha: precio.fecha,
            precio_promedio_especie_x_kg: precio.precio_promedio_x_kg,
        }));

    }
}

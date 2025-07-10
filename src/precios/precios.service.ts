import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PreciosService {
    private prisma = new PrismaClient();

    async getAllFiltrado({         //ENPOINT PARA TRAER PRECIOS DE PRODUCTOS A GUSTO, YA SEA POR ESPECIE, FECHA, ORIGEN, ETC.
        especie,
        fecha,
        origen,
        limit,
    }: {
        especie?: string;
        fecha?: string;
        origen?: string;
        limit?: number;
    }) {
        // Filtro general
        const where: any = {};

        // Subfiltros del producto
        const productoFilter: Record<string, any> = {};

        if (especie) {
            const parsedId = Number(especie);

            if (!isNaN(parsedId)) {
                // Si es un número, filtro por ID
                productoFilter.cat_variedades = {
                    cat_especies: {
                        especie_id: parsedId,
                    },
                };
            } else {
                // Si no es un número, asumo que es el nombre
                productoFilter.cat_variedades = {
                    cat_especies: {
                        nombre: {
                            equals: especie,
                            mode: 'insensitive',
                        },
                    },
                };
            }
        }

        if (origen) {
            productoFilter.cat_origenes = {
                nombre: {
                    equals: origen,
                    mode: 'insensitive',
                },
            };
        }

        // Si hay algún filtro de producto, lo agregamos
        if (Object.keys(productoFilter).length > 0) {
            where.cat_productos = productoFilter;
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
        const precios = await this.prisma.preciosdiarios.findMany({
            where,
            orderBy: { fecha: 'desc' },
            take: limit,
            include: {
                cat_productos: {
                    include: {
                        cat_variedades: { include: { cat_especies: true } },
                        cat_presentaciones: true,
                        cat_origenes: true,
                    },
                },
            },
        });

        // Transformamos la respuesta
        return precios.map((precio) => ({
            especie: precio.cat_productos.cat_variedades.cat_especies.nombre,
            variedad: precio.cat_productos.cat_variedades.nombre,
            presentacion: precio.cat_productos.cat_presentaciones.nombre,
            origen: precio.cat_productos.cat_origenes?.nombre ?? 'Sin origen',
            fecha: precio.fecha,
            precio_mayorista: precio.precio_mayorista,
            precio_minorista: precio.precio_minorista,
            precio_modal: precio.precio_modal,
        }));
    }

    async getAllFiltradoXKg({         //ENPOINT PARA TRAER PRECIOS por kilo DE PRODUCTOS A GUSTO, YA SEA POR ESPECIE, FECHA, ORIGEN, ETC.
        especie,
        fecha,
        origen,
        limit,
    }: {
        especie?: string;
        fecha?: string;
        origen?: string;
        limit?: number;
    }) {
        // Filtro general
        const where: any = {};

        // Subfiltros del producto
        const productoFilter: Record<string, any> = {};

        if (especie) {
            productoFilter.cat_variedades = {
                cat_especies: {
                    nombre: {
                        equals: especie,
                        mode: 'insensitive',
                    },
                },
            };
        }

        if (origen) {
            productoFilter.cat_origenes = {
                nombre: {
                    equals: origen,
                    mode: 'insensitive',
                },
            };
        }

        // Si hay algún filtro de producto, lo agregamos
        if (Object.keys(productoFilter).length > 0) {
            where.cat_productos = productoFilter;
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
        const precios = await this.prisma.preciosdiarios.findMany({
            where,
            orderBy: { fecha: 'desc' },
            take: limit,
            include: {
                cat_productos: {
                    include: {
                        cat_variedades: { include: { cat_especies: true } },
                        cat_presentaciones: true,
                        cat_origenes: true,
                    },
                },
            },
        });

        // Transformamos la respuesta
        return precios.map((precio) => ({
            especie: precio.cat_productos.cat_variedades.cat_especies.nombre,
            variedad: precio.cat_productos.cat_variedades.nombre,
            presentacion: precio.cat_productos.cat_presentaciones.nombre,
            origen: precio.cat_productos.cat_origenes?.nombre ?? 'Sin origen',
            fecha: precio.fecha,
            precio_mayorista_x_kg: precio.precio_mayorista_x_kg,
            precio_minorista_x_kg: precio.precio_minorista_x_kg,
            precio_modal_x_kg: precio.precio_modal_x_kg,
        }));
    }
}
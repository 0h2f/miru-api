import type { Comunity } from '@prisma/client'
import { prisma } from "../app";

async function getComunity(id: number): Promise<Comunity | null> {
    return prisma.comunity.findUnique({
        where: {
            id: id
        },
    })
}

async function getComunitys(): Promise<Comunity[]> {
    return await prisma.comunity.findMany();
}

async function addComunity(comunity: Comunity): Promise<Comunity> {
    return await prisma.comunity.create({ data: comunity });
}

async function updateComunity(id: number, newComunity: Comunity): Promise<Comunity | null> {
    return await prisma.comunity.update({
        where: {
            id: id
        },
        data: newComunity,
    })
}

async function deleteComunity(id: number): Promise<Comunity | null> {
    return await prisma.comunity.delete({
        where: {
            id: id
        }
    });
}

export default {
    getComunity,
    getComunitys,
    addComunity,
    updateComunity,
    deleteComunity
}
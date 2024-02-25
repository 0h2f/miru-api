import type { Manga } from '@prisma/client'
import { prisma } from "../app";

async function getManga(id: number): Promise<Manga | null> {
    return prisma.manga.findUnique({
        where: {
            id: id
        },
    })
}

async function getMangas(): Promise<Manga[]> {
    return await prisma.manga.findMany();
}

async function addManga(manga: Manga): Promise<Manga> {
    return await prisma.manga.create({ data: manga });
}

async function updateManga(id: number, newManga: Manga): Promise<Manga | null> {
    return await prisma.manga.update({
        where: {
            id: id
        },
        data: newManga,
    })
}

async function deleteManga(id: number): Promise<Manga | null> {
    return await prisma.manga.delete({
        where: {
            id: id
        }
    });
}

export default {
    getManga,
    getMangas,
    addManga,
    updateManga,
    deleteManga
}
import type { Author } from '@prisma/client'
import { prisma } from "../app";

async function getAuthor(id: number): Promise<Author | null> {
    return prisma.author.findUnique({
        where: {
            id: id
        },
    })
}

async function getAuthors(): Promise<Author[]> {
    return await prisma.author.findMany();
}

async function addAuthor(author: Author): Promise<Author> {
    return await prisma.author.create({ data: author });
}

async function updateAuthor(id: number, newAuthor: Author): Promise<Author | null> {
    return await prisma.author.update({
        where: {
            id: id
        },
        data: newAuthor,
    })
}

async function deleteAuthor(id: number): Promise<Author | null> {
    return await prisma.author.delete({
        where: {
            id: id
        }
    });
}

export default {
    getAuthor,
    getAuthors,
    addAuthor,
    updateAuthor,
    deleteAuthor
}
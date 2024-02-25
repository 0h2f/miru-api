import type { ComunityRole } from '@prisma/client'
import { prisma } from "../app";

async function getComunityRole(id: number): Promise<ComunityRole | null> {
    return prisma.comunityRole.findUnique({
        where: {
            id: id
        },
    })
}

async function getComunityRoles(): Promise<ComunityRole[]> {
    return await prisma.comunityRole.findMany();
}

async function addComunityRole(member: ComunityRole): Promise<ComunityRole> {
    return await prisma.comunityRole.create({ data: member });
}

async function updateComunityRole(id: number, newMember: ComunityRole): Promise<ComunityRole | null> {
    return await prisma.comunityRole.update({
        where: {
            id: id
        },
        data: newMember,
    })
}

async function deleteComunityRole(id: number): Promise<ComunityRole | null> {
    return await prisma.comunityRole.delete({
        where: {
            id: id
        }
    });
}

export default {
    getComunityRole,
    getComunityRoles,
    addComunityRole,
    updateComunityRole,
    deleteComunityRole
}
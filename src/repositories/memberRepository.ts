import type { ComunityMember } from '@prisma/client'
import { prisma } from "../app";

async function getComunityMember(id: number): Promise<ComunityMember | null> {
    return prisma.comunityMember.findUnique({
        where: {
            memberId: id
        },
    })
}

async function getComunityMembers(): Promise<ComunityMember[]> {
    return await prisma.comunityMember.findMany();
}

async function addComunityMember(member: ComunityMember): Promise<ComunityMember> {
    return await prisma.comunityMember.create({ data: member });
}

async function updateComunityMember(id: number, newMember: ComunityMember): Promise<ComunityMember | null> {
    return await prisma.comunityMember.update({
        where: {
            memberId: id
        },
        data: newMember,
    })
}

async function deleteComunityMember(id: number): Promise<ComunityMember | null> {
    return await prisma.comunityMember.delete({
        where: {
            memberId: id
        }
    });
}

export default {
    getComunityMember,
    getComunityMembers,
    addComunityMember,
    updateComunityMember,
    deleteComunityMember
}
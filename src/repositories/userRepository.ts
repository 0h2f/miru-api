import type { User } from '@prisma/client'
import { prisma } from "../app";

async function getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
        where: {
            id: id
        },
    })
}

async function getUserByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({
        where: {
            username: username
        },
    })
}

async function getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
        where: {
            email: email
        },
    })
}

async function getUsers(): Promise<User[]> {
    return await prisma.user.findMany();
}

async function addUser(user: User): Promise<User> {
    return await prisma.user.create({ data: user });
}

async function updateUser(id: number, newUser: User): Promise<User | null> {
    return await prisma.user.update({
        where: {
            id: id
        },
        data: newUser,
    })
}

async function deleteUser(id: number): Promise<User | null> {
    return await prisma.user.delete({
        where: {
            id: id
        }
    });
}

export default {
    getUserById,
    getUserByUsername,
    getUserByEmail,
    getUsers,
    addUser,
    updateUser,
    deleteUser
}
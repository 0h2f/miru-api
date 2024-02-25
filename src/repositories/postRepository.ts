import type { Post } from '@prisma/client'
import { prisma } from "../app";

async function getPost(id: number): Promise<Post | null> {
    return prisma.post.findUnique({
        where: {
            id: id
        },
    })
}

async function getPosts(): Promise<Post[]> {
    return await prisma.post.findMany();
}

async function addPost(post: Post): Promise<Post> {
    return await prisma.post.create({ data: post });
}

async function updatePost(id: number, newPost: Post): Promise<Post | null> {
    return await prisma.post.update({
        where: {
            id: id
        },
        data: newPost,
    })
}

async function deletePost(id: number): Promise<Post | null> {
    return await prisma.post.delete({
        where: {
            id: id
        }
    });
}

export default {
    getPost,
    getPosts,
    addPost,
    updatePost,
    deletePost
}
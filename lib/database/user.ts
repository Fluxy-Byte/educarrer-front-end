import { prisma } from "@/lib/prisma";
import { UpdateUserDTO, CreateUserDTO, UserDTO } from "@/lib/interfaces/user.interface";

export async function getUserByEmail(email: string): Promise<UserDTO | null> {
    return await prisma.user.findUnique({
        where: {
            email,
        },
    });
}

export async function getUserById(id: string): Promise<UserDTO | null> {
    return await prisma.user.findUnique({
        where: {
            id
        }
    });
}

export async function createUser(data: CreateUserDTO): Promise<UserDTO> {
    return await prisma.user.create({
        data
    })
}

export async function deleteUser(id: string) {
    return await prisma.user.delete({
        where: {
            id
        }
    })
}

export async function updateUser(data: UpdateUserDTO) {
    return await prisma.user.update({
        where: {
            email: data.email
        },
        data
    })
}
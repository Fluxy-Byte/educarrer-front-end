import { prisma } from "@/lib/prisma";

import {
    UpdateUserDTO,
    CreateUserDTO
} from "@/lib/interfaces/user.interface";

import { User } from "@/lib/entities/user"

export class UserRepository {

    // Implementação do método getUserByEmail para buscar um usuário pelo email no banco de dados
    async getUserByEmail(
        email: string
    ): Promise<User | null> {

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return null;
        }

        return new User(
            user.id,
            user.name,
            user.email,
            user.emailVerified,
            user.image,
            user.role,
            user.banned,
            user.createdAt,
            user.updatedAt
        );
    }

    // Implementação do método getUserById para buscar um usuário pelo ID no banco de dados
    async getUserById(
        id: string
    ): Promise<User | null> {

        const res = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        if(!res){
            return null;
        }

        return new User(
            res.id,
            res.name,
            res.email,
            res.emailVerified,
            res.image,
            res.role,
            res.banned,
            res.createdAt,
            res.updatedAt
        );
    }

    // Implementação do método createUser para adicionar um novo usuário ao banco de dados
    async createUser(
        data: CreateUserDTO
    ): Promise<User | null> {

        const res = await prisma.user.create({
            data,
        });
        
        if(!res){
            return null;
        }

        return new User(
            res.id,
            res.name,
            res.email,
            res.emailVerified,
            res.image,
            res.role,
            res.banned,
            res.createdAt,
            res.updatedAt
        );
    }

    // Implementação do método deleteUser para remover um usuário do banco de dados
    async deleteUser(id: string) {

        return await prisma.user.delete({
            where: {
                id,
            },
        });
    }

    // Implementação do método updateUser para atualizar as informações de um usuário existente no banco de dados
    async updateUser(data: UpdateUserDTO): Promise<User | null> {

        const res = await prisma.user.update({
            where: {
                email: data.email,
            },
            data,
        });

        if(!res){
            return null;
        }

        return new User(
            res.id,
            res.name,
            res.email,
            res.emailVerified,
            res.image,
            res.role,
            res.banned,
            res.createdAt,
            res.updatedAt
        );
    }

    async getAllUser(){
        return await prisma.user.count()
    }
}
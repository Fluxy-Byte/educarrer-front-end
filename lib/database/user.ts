import { prisma } from "@/lib/prisma";
import { auth } from "../auth/auth";
import { UpdateUserDTO } from "@/lib/interfaces/user.interface";

export async function updateUser(id: string, data: UpdateUserDTO) {
    const user = await prisma.user.update({
        where: {
            id
        },
        data
    })

    return user;
}
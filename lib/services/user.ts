import { UserRepository } from "@/lib/repositories/user";
import { CreateUserDTO, UpdateUserDTO } from "@/lib/interfaces/user.interface";

const userRepository = new UserRepository();

export async function getUserByEmail(email: string) {
    return await userRepository.getUserByEmail(email);
}

export async function getUserById(id: string) {
    return await userRepository.getUserById(id);
}

export async function createUser(data: CreateUserDTO) {
    return await userRepository.createUser(data);
}

export async function deleteUser(id: string) {
    return await userRepository.deleteUser(id);
}

export async function updateUser(data: UpdateUserDTO) {
    return await userRepository.updateUser(data);
}
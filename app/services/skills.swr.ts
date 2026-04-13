import useSWR from 'swr';
import axios from 'axios';

export interface ResultGetVagas {
    status: boolean
    skills: Skill[]
    message: string
}

export interface Skill {
    id: string;
    name: string;
    level: number;
    about?: string | null;
    userId: string;
}

const fetcher = async (url: string): Promise<ResultGetVagas> => {
    const { data } = await axios.get(url, {
        withCredentials: true
    })
    return data
}

export function useSkills() {
    const { data, error, isLoading, mutate } = useSWR('/api/skill', fetcher);

    return {
        skills: data?.skills || [],
        isLoading,
        isError: error,
        message: data?.message,
        refresh: mutate
    }
}

export async function createSkill(name: string, level?: number, about?: string) {
    const { data } = await axios.post('/api/skill', {
        name,
        level,
        about
    }, {
        withCredentials: true
    })
    return data
}

export async function updateSkill(id: string, name: string, level?: number, about?: string) {
    const { data } = await axios.put(`/api/skill/${id}`, {
        name,
        level,
        about
    }, {
        withCredentials: true
    })
    return data
}

export async function deleteSkill(id: string) {
    const { data } = await axios.delete(`/api/skill/${id}`, {
        withCredentials: true
    })
    return data
}
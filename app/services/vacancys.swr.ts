import useSWR from 'swr';
import axios from 'axios';

export interface ResultGetVacancys {
    status: boolean
    vacancys: VacancyDTO[]
    message: string
}

export interface VacancyDTO {
    id: number;
    title: string;
    description: string;
    company: string;
    modality: string;
    level: string;
    technologies: string[];
    link: string;
    origin: string;
    location: string;
    salary: string | null;
    createdAt: Date;
    updatedAt: Date;
}

const fetcher = async (url: string): Promise<ResultGetVacancys> => {
    const { data } = await axios.get(url, {
        withCredentials: true
    })
    return data
}

const URL = process.env.NEXT_PUBLIC_AMBIENTE == "dev" ? "http://localhost:5401" : "https://protec-edu-carrer-ai.egnehl.easypanel.host"
export function useVacancys() {
    const { data, error, isLoading, mutate } = useSWR(`${URL}/api/vacancy`, fetcher);

    return {
        vacancys: data?.vacancys || [],
        isLoading,
        isError: error,
        message: data?.message,
        refresh: mutate
    }
}
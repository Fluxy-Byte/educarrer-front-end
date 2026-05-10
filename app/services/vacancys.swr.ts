import useSWR from 'swr';
import axios from 'axios';

export interface ResultGetVacancys {
    status: boolean
    vacancys: Vacancys[]
    message: string
}

export interface Vacancys {
    id: number;
    titulo: string;
    empresa: string;
    localizacao: string;
    modalidade: string;
    nivel: string;
    salario: string;
    tecnologias: string[];
    descricao: string;
    link: string;
    nome: string;
}

const fetcher = async (url: string): Promise<ResultGetVacancys> => {
    const { data } = await axios.get(url, {
        withCredentials: true
    })
    return data
}

export function useVacancys() {
    const { data, error, isLoading, mutate } = useSWR('/api/vacancy', fetcher);

    return {
        vacancys: data?.vacancys || [],
        isLoading,
        isError: error,
        message: data?.message,
        refresh: mutate
    }
}
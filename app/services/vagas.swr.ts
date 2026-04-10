import useSWR from 'swr';
import axios from 'axios';

export interface ResultGetVagas {
    status: boolean
    vagas: Vaga[]
    message: string
}

export interface Vaga {
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

const fetcher = async (url: string): Promise<ResultGetVagas> => {
    const { data } = await axios.get(url, {
        withCredentials: true
    })
    return data
}

export function useVagas() {
    const { data, error, isLoading, mutate } = useSWR('/api/vagas', fetcher);

    return {
        vagas: data?.vagas || [],
        isLoading,
        isError: error,
        message: data?.message,
        refresh: mutate
    }
}
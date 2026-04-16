import useSWR from 'swr';
import axios from 'axios';

export interface ResultGetStudy {
    status: boolean
    studies: StudyDTO[]
    message: string
}

export interface StudyDTO {
  id: string;
  title: string;
  study: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  userId: string;
}

const fetcher = async (url: string): Promise<ResultGetStudy> => {
    const { data } = await axios.get(url, {
        withCredentials: true
    })
    return data
}

export function useStudies() {
    const { data, error, isLoading, mutate } = useSWR('/api/study', fetcher);

    return {
        studies: data?.studies || [],
        isLoading,
        isError: error,
        message: data?.message,
        refresh: mutate
    }
}

export async function createStudy(name: string, about?: string) {
    const { data } = await axios.post('/api/study', {
        name,
        about
    }, {
        withCredentials: true
    })
    return data
}

export async function updateStudy(id: string, name: string, about?: string) {
    const { data } = await axios.put(`/api/study/${id}`, {
        name,
        about
    }, {
        withCredentials: true
    })
    return data
}

export async function deleteStudy(id: string) {
    const { data } = await axios.delete(`/api/study/${id}`, {
        withCredentials: true
    })
    return data
}
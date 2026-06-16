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
  study: StudyItem[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
  userId: string;
}

export interface StudyItem {
  id: string,
  title: string,
  details: string,
  studyId: string
}

const URL = process.env.NEXT_PUBLIC_AMBIENTE == "dev" ? "http://localhost:5401" : "https://protec-edu-carrer-ai.egnehl.easypanel.host"

const fetcher = async (url: string): Promise<ResultGetStudy> => {
    const { data } = await axios.get(url, {
        withCredentials: true
    })
    return data
}

export function useStudies() {
    const { data, error, isLoading, mutate } = useSWR(`${URL}/api/study`, fetcher);

    return {
        studies: data?.studies || [],
        isLoading,
        isError: error,
        message: data?.message,
        refresh: mutate
    }
}

export async function createStudy(idVacancy: string) {
    const { data } = await axios.post(`${URL}/api/study`, {
        idVacancy
    }, {
        withCredentials: true
    })
    return data
}

export async function updateStudy(id: string, name: string, about?: string) {
    const { data } = await axios.put(`${URL}/api/study/${id}`, {
        name,
        about
    }, {
        withCredentials: true
    })
    return data
}

export async function deleteStudy(id: string) {
    const { data } = await axios.delete(`${URL}/api/study/${id}`, {
        withCredentials: true
    })
    return data
}
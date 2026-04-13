import useSWR from 'swr';
import axios from 'axios';

export interface ResultGetExperience {
    status: boolean
    experiences: Experience[]
    message: string
}

export interface Experience {
  id: string;
  name: string;
  seniority: string;
  about: string;
  startDate?: Date | null;
  endDate?: Date | null;
  userId: string;
}

const fetcher = async (url: string): Promise<ResultGetExperience> => {
    const { data } = await axios.get(url, {
        withCredentials: true
    })
    return data
}

export function useExperiences() {
    const { data, error, isLoading, mutate } = useSWR('/api/experience', fetcher);

    return {
        experiences: data?.experiences || [],
        isLoading,
        isError: error,
        message: data?.message,
        refresh: mutate
    }
}
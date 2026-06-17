import useSWR from 'swr';
import axios from 'axios';
import { Vacancy } from "@/app/services/vacancys.swr";

export interface ResultGetStudy {
    status: boolean
    studies: StudyDTO[]
    message: string
}

export interface StudyDTO {
    id: string;
    title: string;
    createdAt?: Date | null;
    userId: string;
    vacancy: Vacancy;
}

export interface ResultGetFilterStudy {
    status: boolean
    study: StudyFilterDTO | null
    message: string
}

export interface StudyFilterDTO {
    id: string;
    title: string;
    sections: StudySectionDTO[];
    createdAt?: Date | null;
    updatedAt?: Date | null;
    userId: string;
}

export interface StudySectionDTO {
    id: string;
    studyId: string;
    section: string;
    type: string;
    content?: string | null;
    strengths: StudyStrengthDTO[];
    gaps: StudyGapDTO[];
    plans: StudyPlanDTO[];
    createdAt?: Date | null;
}

export interface StudyStrengthDTO {
    id: string;
    sectionId: string;
    skill: string;
    importance: string;
    advice: string;
}


export interface StudyPlanDTO {
    id: string;
    sectionId: string;
    week: number;
    focus: string;
    goals: string;
}

export interface StudyGapDTO {
    id: string;
    sectionId: string;
    skill: string;
    explanation: string;
    priority: string;
    estimatedTime: string;
    topics: string[];
    resources: string[];
}

export interface CreateStudyDTO {
    status: boolean,
    message: string
}

const URL = process.env.NEXT_PUBLIC_AMBIENTE == "dev" ? "http://localhost:5401" : "https://educarrerai.egnehl.easypanel.host"

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

export async function createStudy(idVacancy: string): Promise<CreateStudyDTO> {
    const { data } = await axios.post(`${URL}/api/study`, {
        idVacancy
    }, {
        withCredentials: true
    })
    return data
}

export async function getStudyById(id: string): Promise<ResultGetFilterStudy> {
    const { data } = await axios.get(`${URL}/api/study/${id}`,
        {
            withCredentials: true
        }
    )
    return data
}

export async function deleteStudy(id: string) {
    const { data } = await axios.delete(`${URL}/api/study/${id}`, {
        withCredentials: true
    })
    return data
}
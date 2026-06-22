import { prisma } from "@/lib/prisma";
import {
    Study,
    StudyGap,
    StudyPlan,
    StudySection,
    StudyStrength
} from "@/lib/entities/study";

import {
    CreateStudyDTO,
    CreateStudyGapDTO,
    CreateStudyPlanDTO,
    CreateStudySectionDTO,
    CreateStudyStrengthDTO,
    StudyDTO,
    StudyGapDTO,
    StudyPlanDTO,
    StudySectionDTO,
    StudyStrengthDTO
} from "@/lib/interfaces/study.interface";
import { tr } from "date-fns/locale";


export class StudyRepository {

    private mapToEntity(study: any): Study {
        return new Study(
            study.id,
            study.title,

            study.sections.map(
                (section: any) =>
                    new StudySection(
                        section.id,
                        section.studyId,
                        section.section,
                        section.type,
                        section.content,

                        section.strengths.map(
                            (strength: any) =>
                                new StudyStrength(
                                    strength.id,
                                    strength.sectionId,
                                    strength.skill,
                                    strength.importance,
                                    strength.advice
                                )
                        ),

                        section.gaps.map(
                            (gap: any) =>
                                new StudyGap(
                                    gap.id,
                                    gap.sectionId,
                                    gap.skill,
                                    gap.explanation,
                                    gap.priority,
                                    gap.estimatedTime,
                                    gap.topics,
                                    gap.resources
                                )
                        ),

                        section.plans.map(
                            (plan: any) =>
                                new StudyPlan(
                                    plan.id,
                                    plan.sectionId,
                                    plan.week,
                                    plan.focus,
                                    plan.goals
                                )
                        ),

                        section.createdAt
                    )
            ),

            study.createdAt,
            study.updatedAt,
            study.userId
        );
    }

    private mapToEntityEmpty(study: any): Study {
        return new Study(
            study.id,
            study.title,
            [],
            study.createdAt,
            study.updatedAt,
            study.userId
        );
    }

    async getStudyByUserId(userId: string): Promise<StudyDTO[]> {
        const studies = await prisma.study.findMany({
            where: {
                userId,
            },
            include: {
                sections: {
                    include: {
                        strengths: true,
                        gaps: true,
                        plans: true,
                    },
                },
            },
        });

        return studies.map((study) => this.mapToEntity(study));
    }

    async getStudyByUserIdClear(userId: string) {
        const studies = await prisma.study.findMany({
            where: {
                userId
            },
            select: {
                id: true,
                title: true,
                userId: true,
                createdAt: true,
                vacancy: true,
            }
        });

        return studies;
    }

    async getStudyByUserIdAndVancacyId(userId: string, vacancyId: string) {
        const study = await prisma.study.findFirst({
            where: {
                userId,
                vacancyId
            },
            include: {
                sections: {
                    include: {
                        strengths: true,
                        gaps: true,
                        plans: true,
                    },
                },
            },
        });

        return study;
    }

    async getStudyById(id: string): Promise<StudyDTO | null> {
        const study = await prisma.study.findUnique({
            where: {
                id,
            },
            include: {
                sections: {
                    include: {
                        strengths: true,
                        gaps: true,
                        plans: true,
                    },
                },
            },
        });

        if (!study) {
            return null;
        }

        return this.mapToEntity(study);
    }

    async getAllStudy(): Promise<StudyDTO[]> {
        const studies = await prisma.study.findMany({
            include: {
                sections: {
                    include: {
                        gaps: true,
                        plans: true,
                        strengths: true
                    }
                }
            }
        });

        return studies.map((study) => this.mapToEntity(study));
    }

    // Estudo vazio
    async createStudyEmpty(data: CreateStudyDTO): Promise<StudyDTO> {
        const study = await prisma.study.create({
            data: {
                title: data.title,
                userId: data.userId,
                vacancyId: data.vacancyId
            }
        });

        return this.mapToEntityEmpty(study);
    }

    // Sessões de estudo
    async createSectionStudy(data: CreateStudySectionDTO): Promise<StudySectionDTO> {
        const study = await prisma.studySection.create({
            data: {
                studyId: data.studyId,
                type: data.type,
                content: data.content,
                section: data.section
            }
        });

        return new StudySection(
            study.id,
            study.studyId,
            study.section,
            study.type,
            study.content,
            [],
            [],
            [],
            study.createdAt,
        );
    }

    // Sessão de pontos fortes do candidato
    async createSectionStrength(data: CreateStudyStrengthDTO): Promise<StudyStrengthDTO> {
        const study = await prisma.studyStrength.create({
            data: {
                skill: data.skill,
                advice: data.advice,
                importance: data.importance,
                sectionId: data.sectionId
            }
        });

        return new StudyStrength(
            study.id,
            study.skill,
            study.advice,
            study.importance,
            study.sectionId
        );
    }


    // Seção de estudos
    async createSectionGap(data: CreateStudyGapDTO): Promise<StudyGapDTO> {
        const study = await prisma.studyGap.create({
            data: {
                skill: data.skill,
                explanation: data.explanation,
                priority: data.priority,
                topics: data.topics,
                resources: data.resources,
                estimatedTime: data.estimatedTime,
                sectionId: data.sectionId
            }
        });

        return new StudyGap(
            study.id,
            study.sectionId,
            study.skill,
            study.explanation,
            study.priority,
            study.estimatedTime,
            study.topics,
            study.resources
        );
    }

    // Plano de estudos
    async createSectionPlan(data: CreateStudyPlanDTO): Promise<StudyPlanDTO> {
        const study = await prisma.studyPlan.create({
            data: {
                week: data.week,
                focus: data.focus,
                goals: data.goals,
                sectionId: data.sectionId
            }
        });

        return new StudyPlan(
            study.id,
            study.sectionId,
            study.week,
            study.focus,
            study.goals
        );
    }

    async getCountStudyes(): Promise<number> {
        return await prisma.study.count();
    }
}
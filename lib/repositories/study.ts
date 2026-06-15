import { prisma } from "@/lib/prisma";
import { Study } from "@/lib/entities/study";
import { CreateStudyDTO, UpdateStudyDTO, StudyDTO } from "@/lib/interfaces/study.interface";


export class StudyRepository {

    async getStudyByUserId(userId: string): Promise<StudyDTO[]> {
        const studys = await prisma.study.findMany({
            where: {
                userId,
            },
        });

        return studys.map(study => new Study(
            study.id,
            study.title,
            study.study,
            study.createdAt,
            study.updatedAt,
            study.userId
        ));
    }

    async createStudy(data: CreateStudyDTO): Promise<StudyDTO | null> {

        const study = await prisma.study.create({
            data
        });

        return new Study(
            study.id,
            study.title,
            study.study,
            study.createdAt,
            study.updatedAt,
            study.userId
        );
    }

    async deleteStudy(id: string) {

        return await prisma.study.delete({
            where: {
                id
            }
        });
    }

    async updateStudy(id: string, data: Partial<UpdateStudyDTO>): Promise<StudyDTO> {

        const study = await prisma.study.update({
            where: {
                id
            },
            data
        });

        return new Study(
            study.id,
            study.title,
            study.study,
            study.createdAt,
            study.updatedAt,
            study.userId
        );
    }

    async getAllStudy() {
        const all = await prisma.study.findMany();

        return all.map((study) => {
            return new Study(
                study.id,
                study.title,
                study.study,
                study.createdAt,
                study.updatedAt,
                study.userId
            )
        })
    }
}
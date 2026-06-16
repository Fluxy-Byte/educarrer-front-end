import { prisma } from "@/lib/prisma";
import { Study, StudyItemClass } from "@/lib/entities/study";
import { CreateStudyDTO, UpdateStudyDTO, StudyDTO, StudyItem, StudyItemCreate } from "@/lib/interfaces/study.interface";


export class StudyRepository {

    async getStudyByUserId(userId: string): Promise<StudyDTO[]> {
        const studys = await prisma.study.findMany({
            where: {
                userId,
            },
            include: {
                studyItems: true
            }
        });

        const items = studys

        return studys.map(study => new Study(
            study.id,
            study.title,
            study.studyItems,
            study.createdAt,
            study.updatedAt,
            study.userId
        ));
    }

    async createStudy(data: CreateStudyDTO): Promise<StudyDTO | null> {
        const study = await prisma.study.create({
            data: {
                title: data.title,
                userId: data.userId
            }
        });

        return new Study(
            study.id,
            study.title,
            [],
            study.createdAt,
            study.updatedAt,
            study.userId
        );
    }

    async createStudyItem(data: StudyItemCreate){
        const studyItem = await prisma.studyItem.create({
            data
        })
    }

    async deleteStudy(id: string) {

        return await prisma.study.delete({
            where: {
                id
            }
        });
    }

    // async updateStudy(id: string, data: Partial<UpdateStudyDTO>): Promise<StudyDTO> {

    //     const study = await prisma.study.update({
    //         where: {
    //             id
    //         },
    //         data
    //     });

    //     return new Study(
    //         study.id,
    //         study.title,
    //         study.study,
    //         study.createdAt,
    //         study.updatedAt,
    //         study.userId
    //     );
    // }

    async getAllStudy() {
        const all = await prisma.study.findMany({
            include:{
                studyItems: true
            }
        });

        return all.map((study) => {
            return new Study(
                study.id,
                study.title,
                study.studyItems,
                study.createdAt,
                study.updatedAt,
                study.userId
            )
        })
    }
}
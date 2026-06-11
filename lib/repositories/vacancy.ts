import { Vacancy } from "@/lib/entities/vacancy";
import { CreateVacancyData } from "@/lib/interfaces/vacancy.interface";
import { prisma } from "@/lib/prisma"

export async function getVacancys() {
    return [
        {
            id: 1,
            title: "Arquiteto de Software",
            company: "ArchTech",
            location: "Brasília - DF",
            modality: "Híbrido",
            level: "Sênior",
            salary: "R$ 14.000 - R$ 16.000",
            technologies: [
                "Cloud",
                "Microservices",
                "Docker",
                "Kubernetes",
                "AWS"
            ],
            description:
                "Responsável pela definição de arquitetura de sistemas escaláveis, liderança técnica do time e implementação de boas práticas de desenvolvimento. Atuação direta com microsserviços, integrações e ambientes em nuvem.",
            link: "https://www.linkedin.com/jobs/",
            origin: "LinkedIn",
            createdAt: new Date(),
            updatedAt: new Date(),
            active: true
        },
        {
            id: 2,
            title: "Desenvolvedor Front-End React",
            company: "CodeWave",
            location: "São Paulo - SP",
            modality: "Remoto",
            level: "Pleno",
            salary: "R$ 7.000 - R$ 9.000",
            technologies: [
                "React",
                "Next.js",
                "TypeScript",
                "TailwindCSS",
                "Redux"
            ],
            description:
                "Desenvolvimento de interfaces modernas e responsivas utilizando React e Next.js. Participação em decisões técnicas, componentização e integração com APIs REST e GraphQL.",
            link: "https://github.com/jobs",
            origin: "GitHub Jobs",
            createdAt: new Date(),
            updatedAt: new Date(),
            active: true
        },
        {
            id: 3,
            title: "Back-End Developer Node.js",
            company: "ApiSync Soluções",
            location: "Uberlândia - MG",
            modality: "Híbrido",
            level: "Pleno",
            salary: "R$ 8.500 - R$ 11.000",
            technologies: [
                "Node.js",
                "Express",
                "PostgreSQL",
                "JWT",
                "Docker"
            ],
            description:
                "Criação e manutenção de APIs escaláveis utilizando Node.js e Express. Implementação de autenticação JWT, integrações com serviços externos e otimização de banco de dados.",
            link: "https://www.linkedin.com/jobs/",
            origin: "LinkedIn",
            createdAt: new Date(),
            updatedAt: new Date(),
            active: true
        },
        {
            id: 4,
            title: "Engenheiro de Software Java",
            company: "Enterprise Systems",
            location: "Curitiba - PR",
            modality: "Presencial",
            level: "Sênior",
            salary: "R$ 13.000 - R$ 15.500",
            technologies: [
                "Java",
                "Spring Boot",
                "RabbitMQ",
                "MySQL",
                "Hibernate"
            ],
            description:
                "Atuação em sistemas corporativos de alta disponibilidade utilizando Java e Spring Boot. Desenvolvimento de APIs REST, mensageria e arquitetura orientada a eventos.",
            link: "https://www.infojobs.com.br/",
            origin: "InfoJobs",
            createdAt: new Date(),
            updatedAt: new Date(),
            active: true
        },
        {
            id: 5,
            title: "Desenvolvedor Full Stack",
            company: "Digital Future",
            location: "Belo Horizonte - MG",
            modality: "Remoto",
            level: "Júnior",
            salary: "R$ 4.000 - R$ 5.500",
            technologies: [
                "React",
                "Node.js",
                "MongoDB",
                "JavaScript",
                "Git"
            ],
            description:
                "Participação no desenvolvimento de aplicações web completas, atuando tanto no front-end quanto no back-end. Correção de bugs, criação de novas funcionalidades e integração de APIs.",
            link: "https://www.linkedin.com/jobs/",
            origin: "LinkedIn",
            createdAt: new Date(),
            updatedAt: new Date(),
            active: true
        },
        {
            id: 6,
            title: "DevOps Engineer",
            company: "CloudOps",
            location: "Florianópolis - SC",
            modality: "Remoto",
            level: "Sênior",
            salary: "R$ 12.000 - R$ 15.000",
            technologies: [
                "AWS",
                "Terraform",
                "Docker",
                "Kubernetes",
                "CI/CD"
            ],
            description:
                "Automação de infraestrutura em nuvem, pipelines CI/CD e monitoramento de aplicações. Atuação estratégica em escalabilidade, segurança e alta disponibilidade dos serviços.",
            link: "https://www.linkedin.com/jobs/",
            origin: "LinkedIn",
            createdAt: new Date(),
            updatedAt: new Date(),
            active: true
        },
        {
            id: 7,
            title: "Desenvolvedor Mobile Flutter",
            company: "MobApps",
            location: "Rio de Janeiro - RJ",
            modality: "Híbrido",
            level: "Pleno",
            salary: "R$ 7.500 - R$ 9.500",
            technologies: [
                "Flutter",
                "Dart",
                "Firebase",
                "REST API",
                "Clean Architecture"
            ],
            description:
                "Desenvolvimento de aplicativos mobile multiplataforma com Flutter. Integração com Firebase, gerenciamento de estado e implementação de arquiteturas escaláveis.",
            link: "https://www.glassdoor.com.br/",
            origin: "Glassdoor",
            createdAt: new Date(),
            updatedAt: new Date(),
            active: true
        },
        {
            id: 8,
            title: "Analista de Dados",
            company: "DataVision",
            location: "Campinas - SP",
            modality: "Remoto",
            level: "Pleno",
            salary: "R$ 6.500 - R$ 8.000",
            technologies: [
                "Python",
                "Pandas",
                "Power BI",
                "SQL",
                "Machine Learning"
            ],
            description:
                "Análise de dados estratégicos para geração de insights de negócio. Construção de dashboards, automações de relatórios e modelos analíticos para tomada de decisão.",
            link: "https://www.linkedin.com/jobs/",
            origin: "LinkedIn",
            createdAt: new Date(),
            updatedAt: new Date(),
            active: true
        }
    ];
}

export class VacancyRepository {

    async getVacancys(): Promise<Vacancy[]> {

        const vacancys = await prisma.vacancy.findMany();

        return vacancys.map(v => new Vacancy(
            v.id,
            v.title,
            v.description,
            v.company,
            v.modality,
            v.level,
            v.technologies,
            v.link,
            v.origin,
            v.location,
            v.salary,
            v.createdAt,
            v.updatedAt,
            v.active
        ));
    }

    async getVacancysById(id: string): Promise<Vacancy | null> {
        return await prisma.vacancy.findFirst({
            where: { id }
        });
    }

    async createVacancy(data: CreateVacancyData) {
        return await prisma.vacancy.create({
            data
        })
    }

    async updateVacancy(id: string, data: CreateVacancyData) {
        return await prisma.vacancy.update({
            where: { id },
            data
        })
    }
}
import { link } from "fs";
import { VacancyDTO } from "@/lib/interfaces/vacancy.interface";

export async function getVacancys() {
    return [
        {
            id: 1,
            titulo: "Desenvolvedor Front-end",
            empresa: "Tech Solutions",
            localizacao: "São Paulo - SP",
            modalidade: "Remoto",
            nivel: "Júnior",
            salario: "R$ 3.500 - R$ 4.500",
            tecnologias: ["React", "JavaScript", "CSS", "HTML"],
            descricao: "Desenvolvimento de interfaces modernas e responsivas com foco em performance e experiência do usuário.",
            link: "https://www.linkedin.com/jobs/",
            nome: "LinkedIn"
        },
        {
            id: 2,
            titulo: "Desenvolvedor Back-end",
            empresa: "CodeBase",
            localizacao: "Uberlândia - MG",
            modalidade: "Híbrido",
            nivel: "Pleno",
            salario: "R$ 6.000 - R$ 7.500",
            tecnologias: ["Node.js", "Express", "SQL"],
            descricao: "Desenvolvimento de APIs escaláveis e integração com serviços externos.",
            link: "https://www.gupy.io/",
            nome: "Gupy"
        },
        {
            id: 3,
            titulo: "Engenheiro de Software",
            empresa: "InovaTech",
            localizacao: "Belo Horizonte - MG",
            modalidade: "Remoto",
            nivel: "Sênior",
            salario: "R$ 11.000 - R$ 13.000",
            tecnologias: ["Java", "Spring Boot", "AWS"],
            descricao: "Atuação em sistemas distribuídos e arquitetura de software.",
            link: "https://www.indeed.com/",
            nome: "Indeed"
        },
        {
            id: 4,
            titulo: "Analista de Dados",
            empresa: "DataCorp",
            localizacao: "Curitiba - PR",
            modalidade: "Presencial",
            nivel: "Pleno",
            salario: "R$ 5.500 - R$ 6.500",
            tecnologias: ["Python", "SQL", "Power BI"],
            descricao: "Análise de dados e geração de insights estratégicos.",
            link: "https://www.glassdoor.com/",
            nome: "Glassdoor"
        },
        {
            id: 5,
            titulo: "Cientista de Dados",
            empresa: "AI Labs",
            localizacao: "São Paulo - SP",
            modalidade: "Remoto",
            nivel: "Sênior",
            salario: "R$ 12.000 - R$ 14.000",
            tecnologias: ["Python", "Machine Learning"],
            descricao: "Criação de modelos preditivos e soluções com IA.",
            link: "https://www.catho.com.br/",
            nome: "Catho"
        },
        {
            id: 6,
            titulo: "DevOps Engineer",
            empresa: "CloudOps",
            localizacao: "Remoto",
            modalidade: "Remoto",
            nivel: "Pleno",
            salario: "R$ 8.000 - R$ 9.500",
            tecnologias: ["Docker", "Kubernetes"],
            descricao: "Automação de infraestrutura e pipelines CI/CD.",
            link: "https://www.linkedin.com/jobs/",
            nome: "LinkedIn"
        },
        {
            id: 7,
            titulo: "Analista de Segurança",
            empresa: "SecureNet",
            localizacao: "Rio de Janeiro - RJ",
            modalidade: "Híbrido",
            nivel: "Pleno",
            salario: "R$ 7.000 - R$ 8.500",
            tecnologias: ["Cybersecurity", "SIEM"],
            descricao: "Proteção de dados e monitoramento de ameaças.",
            link: "https://www.gupy.io/",
            nome: "Gupy"
        },
        {
            id: 8,
            titulo: "Desenvolvedor Mobile",
            empresa: "Appify",
            localizacao: "Florianópolis - SC",
            modalidade: "Remoto",
            nivel: "Júnior",
            salario: "R$ 4.000 - R$ 5.000",
            tecnologias: ["React Native", "Flutter"],
            descricao: "Desenvolvimento de aplicativos mobile multiplataforma.",
            link: "https://www.infojobs.com.br/",
            nome: "InfoJobs"
        },
        {
            id: 9,
            titulo: "UX/UI Designer",
            empresa: "DesignPro",
            localizacao: "São Paulo - SP",
            modalidade: "Híbrido",
            nivel: "Pleno",
            salario: "R$ 5.000 - R$ 6.000",
            tecnologias: ["Figma", "Adobe XD"],
            descricao: "Criação de interfaces intuitivas e design centrado no usuário.",
            link: "https://www.glassdoor.com/",
            nome: "Glassdoor"
        },
        {
            id: 10,
            titulo: "QA Tester",
            empresa: "QualitySoft",
            localizacao: "Remoto",
            modalidade: "Remoto",
            nivel: "Júnior",
            salario: "R$ 3.000 - R$ 4.000",
            tecnologias: ["Cypress", "Selenium"],
            descricao: "Execução de testes automatizados e garantia de qualidade.",
            link: "https://www.indeed.com/",
            nome: "Indeed"
        },
        {
            id: 11,
            titulo: "Desenvolvedor Full Stack",
            empresa: "StackHouse",
            localizacao: "Campinas - SP",
            modalidade: "Híbrido",
            nivel: "Pleno",
            salario: "R$ 7.000 - R$ 8.500",
            tecnologias: ["React", "Node.js"],
            descricao: "Atuação completa no desenvolvimento de aplicações.",
            link: "https://www.linkedin.com/jobs/",
            nome: "LinkedIn"
        },
        {
            id: 12,
            titulo: "DBA",
            empresa: "DBMasters",
            localizacao: "Remoto",
            modalidade: "Remoto",
            nivel: "Sênior",
            salario: "R$ 9.000 - R$ 11.000",
            tecnologias: ["SQL Server", "Oracle"],
            descricao: "Gerenciamento e otimização de bancos de dados.",
            link: "https://www.catho.com.br/",
            nome: "Catho"
        },
        {
            id: 13,
            titulo: "Machine Learning Engineer",
            empresa: "DeepTech",
            localizacao: "São Paulo - SP",
            modalidade: "Remoto",
            nivel: "Sênior",
            salario: "R$ 13.000 - R$ 15.000",
            tecnologias: ["Python", "PyTorch"],
            descricao: "Deploy e manutenção de modelos de ML em produção.",
            link: "https://www.indeed.com/",
            nome: "Indeed"
        },
        {
            id: 14,
            titulo: "Analista de BI",
            empresa: "Insight BI",
            localizacao: "Curitiba - PR",
            modalidade: "Presencial",
            nivel: "Pleno",
            salario: "R$ 6.000 - R$ 7.000",
            tecnologias: ["Power BI", "SQL"],
            descricao: "Criação de dashboards e relatórios estratégicos.",
            link: "https://www.gupy.io/",
            nome: "Gupy"
        },
        {
            id: 15,
            titulo: "Suporte Técnico",
            empresa: "HelpDesk Pro",
            localizacao: "Uberlândia - MG",
            modalidade: "Presencial",
            nivel: "Júnior",
            salario: "R$ 2.500 - R$ 3.200",
            tecnologias: ["Redes", "Hardware"],
            descricao: "Atendimento ao usuário e suporte técnico.",
            link: "https://www.infojobs.com.br/",
            nome: "InfoJobs"
        },
        {
            id: 16,
            titulo: "Engenheiro de Dados",
            empresa: "DataFlow",
            localizacao: "Remoto",
            modalidade: "Remoto",
            nivel: "Pleno",
            salario: "R$ 9.000 - R$ 10.500",
            tecnologias: ["Spark", "ETL"],
            descricao: "Construção de pipelines de dados.",
            link: "https://www.linkedin.com/jobs/",
            nome: "LinkedIn"
        },
        {
            id: 17,
            titulo: "Desenvolvedor PHP",
            empresa: "WebDev Co",
            localizacao: "Recife - PE",
            modalidade: "Híbrido",
            nivel: "Pleno",
            salario: "R$ 5.000 - R$ 6.500",
            tecnologias: ["PHP", "Laravel"],
            descricao: "Manutenção e desenvolvimento de sistemas web.",
            link: "https://www.catho.com.br/",
            nome: "Catho"
        },
        {
            id: 18,
            titulo: "Engenheiro .NET",
            empresa: "DotNet Corp",
            localizacao: "São Paulo - SP",
            modalidade: "Remoto",
            nivel: "Sênior",
            salario: "R$ 10.000 - R$ 12.000",
            tecnologias: [".NET", "C#"],
            descricao: "Desenvolvimento de aplicações com stack Microsoft.",
            link: "https://www.glassdoor.com/",
            nome: "Glassdoor"
        },
        {
            id: 19,
            titulo: "Desenvolvedor Go",
            empresa: "FastAPI Tech",
            localizacao: "Remoto",
            modalidade: "Remoto",
            nivel: "Pleno",
            salario: "R$ 8.000 - R$ 9.500",
            tecnologias: ["Go", "Docker"],
            descricao: "Criação de APIs de alta performance.",
            link: "https://www.indeed.com/",
            nome: "Indeed"
        },
        {
            id: 20,
            titulo: "Arquiteto de Software",
            empresa: "ArchTech",
            localizacao: "Brasília - DF",
            modalidade: "Híbrido",
            nivel: "Sênior",
            salario: "R$ 14.000 - R$ 16.000",
            tecnologias: ["Cloud", "Microservices"],
            descricao: "Definição de arquitetura e liderança técnica.",
            link: "https://www.linkedin.com/jobs/",
            nome: "LinkedIn"
        }
    ];
}

export class VagasRepository {

    async getVacancys(): Promise<VacancyDTO[]> {
        return await getVacancys();
    }
    
}
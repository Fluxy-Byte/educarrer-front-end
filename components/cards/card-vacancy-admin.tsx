import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { createStudy } from "@/app/services/study.swr";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandDialog
} from "@/components/ui/command";

import { Badge } from "@/components/ui/badge";

import { Building2, MapPin, HandCoins, Blocks, Rocket, LoaderCircle, PenBox } from "lucide-react";

import { useState } from "react";

import TooltipPerso from "@/components/tooltip";
import { DialogVacancyUpdate } from "@/components/dialog/dialog-vacancy.update";

export interface Vacancy {
    id: string;
    title: string;
    description: string;
    company: string;
    modality: string;
    level: string;
    technologies: string[];
    link: string;
    origin: string;
    location: string;
    salary: string | null;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface DialogVagasProps {
    vacancy: Vacancy
}
export default function CadsVacancyAdmin({ vacancy }: DialogVagasProps) {
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [isLoading, setIsLoading] = useState<Boolean>(false);


    async function handleCreateStudy(id: string) {
        setIsLoading(true);
        await createStudy(id);
        setIsLoading(false);
        console.log("Criar estudo para a vaga:", vacancy);
        setIsLoading(false);
    }

    return (
        <Card key={vacancy.id}>
            <CardHeader className="w-full flex flex-col gap-4">
                <CardTitle className="w-full">
                    <span className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4" >
                            <h1 className="text-black text-xl">
                                {vacancy.title}
                            </h1>
                            <Badge
                                key={vacancy.modality}
                                className={`${getModalityColor(vacancy.modality)}`}
                            >
                                {vacancy.modality}
                            </Badge>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 shrink-0">
                            <Badge
                                key={String(vacancy.createdAt)}
                                className={`text-purple-500 border-pur bg-purple-200`}
                            >
                                {getVacancyLabel(vacancy.createdAt)}
                            </Badge>
                            <p className="text-zinc-400 text-sm whitespace-nowrap">
                                {getTimeAgo(vacancy.createdAt)}
                            </p>
                        </div>
                    </span>
                </CardTitle>
                <CardDescription>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                        <div className="flex flex-col gap-2 min-w-0">
                            <div className="flex gap-2 items-center justify-start text-black/60">
                                <Building2 strokeWidth={1} className="h-6 w-6 shrink-0" />
                                <h2 className="break-words">
                                    {vacancy.company ?? "Não identificado"}
                                </h2>
                            </div>

                            <div className="flex gap-2 items-center text-black/60">
                                <MapPin strokeWidth={1} className="h-6 w-6 shrink-0" />
                                <h2 className="break-words">
                                    {vacancy.location ?? "Não identificado"}
                                </h2>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 min-w-0">
                            <div className="flex gap-2 items-center text-black/60">
                                <HandCoins strokeWidth={1} className="h-6 w-6 shrink-0" />
                                <h2 className="break-words">
                                    {vacancy.salary ? vacancy.salary : "Não identificado"}
                                </h2>
                            </div>

                            <div className="flex gap-2 items-center text-black/60">
                                <Blocks strokeWidth={1} className="h-6 w-6 shrink-0" />
                                <h2 className="break-words">
                                    {vacancy.level ?? "Não identificado"}
                                </h2>
                            </div>
                        </div>


                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent className="w-full text-sm flex flex-col items-start">
                <div className="w-full">
                    <TooltipPerso
                        message="Clique para ver a descrição por completo"
                        key={"verdetalhes"}
                    >
                        <Button onClick={() => setOpen(true)} size={"link"} variant="link_card" className="mb-6">
                            {`${vacancy.description.slice(0, 50).split("[QB]")[0]}...`}
                        </Button>

                    </TooltipPerso>

                    <CommandDialog open={open} onOpenChange={setOpen}>
                        <Command className="p-4 flex flex-col gap-4 justify-start items-center text-center max-h-[80vh]">
                            <h1 className="text-black text-xl font-bold">Informações da vaga</h1>

                            <p className="text-black overflow-y-auto pr-2 text-justify w-full max-h-[60vh]">
                                {vacancy.description.split("[QB]").map((parte, index) => (
                                    <span key={index}>
                                        {parte}
                                        {index < vacancy.description.split("[QB]").length - 1 && <br />}
                                    </span>
                                ))}
                            </p>
                        </Command>
                    </CommandDialog>

                    <div className="w-full flex justify-between flex-col lg:flex-row gap-4 lg:gap-0">
                        <div className="w-full flex flex-wrap items-center justify-start">
                            {vacancy.technologies.map((tech) => (
                                <Badge
                                    key={tech}
                                    className={`mr-2 mb-2 text-white ${getTechColor(tech)}`}
                                >
                                    {tech}
                                </Badge>
                            ))}
                        </div>

                        <div className="w-full sm:w-auto gap-2 flex flex-col sm:flex-row shrink-0">
                            <DialogVacancyUpdate vacancy={vacancy} open={openEdit} onOpenChange={setOpenEdit} />

                            <TooltipPerso
                                message="Clique para editar dados desta vaga"
                                key={"verdetalhes"}
                            >
                                <Button
                                    className="w-full sm:w-full bg-blue-500 hover:bg-blue-600"
                                    onClick={() => setOpenEdit(true)}
                                >
                                    <PenBox /> Editar vaga
                                </Button>

                            </TooltipPerso>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


function getTechColor(tech: string): string {
    const map: Record<string, string> = {
        // Front
        "React": "bg-blue-500",
        "JavaScript": "bg-yellow-400 text-black",
        "TypeScript": "bg-blue-600",
        "HTML": "bg-orange-500",
        "CSS": "bg-blue-400",

        // Back
        "Node.js": "bg-green-600",
        "Java": "bg-orange-600",
        "Spring Boot": "bg-green-700",
        ".NET": "bg-purple-600",
        "C#": "bg-purple-700",
        "PHP": "bg-indigo-500",
        "Laravel": "bg-red-500",
        "Go": "bg-cyan-500",

        // Mobile
        "React Native": "bg-blue-500",
        "Flutter": "bg-sky-500",

        // Dados
        "Python": "bg-blue-800 text-white",
        "Pandas": "bg-purple-500",
        "SQL": "bg-gray-600",
        "Power BI": "bg-yellow-600 text-black",
        "Machine Learning": "bg-pink-500",
        "TensorFlow": "bg-orange-600",
        "PyTorch": "bg-red-500",

        // DevOps / Cloud
        "Docker": "bg-blue-700",
        "Kubernetes": "bg-indigo-600",
        "AWS": "bg-orange-400 text-black",
        "Azure": "bg-blue-700",

        // Testes
        "Cypress": "bg-green-500",
        "Selenium": "bg-lime-600",

        // Default
        "default": "bg-black"
    };

    return map[tech] || map["default"];
}

function getModalityColor(modality: string): string {
    const map: Record<string, string> = {
        "Presencial": "bg-green-100 text-green-600 border-green-500",
        "Híbrido": "bg-orange-100 text-orange-400 border-orange-400",
        "Remoto": "bg-blue-100 text-blue-600 border-blue-600",

        // Default
        "default": "bg-green-100 text-green-600 border-green-500"
    };

    return map[modality] || map["default"];
}


export function getTimeAgo(createdAt: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - new Date(createdAt).getTime();

    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (minutes < 1) {
        return "Agora";
    }

    if (minutes < 60) {
        return `${minutes} min atás`;
    }

    if (hours < 24) {
        return `${hours}h atás`;
    }

    return `${days} dias atás`;
}

export function getVacancyLabel(createdAt: Date): string {
    const now = new Date();
    const created = new Date(createdAt);

    const diffMs = now.getTime() - created.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    // Menos de 24 horas
    if (diffDays < 1) {
        return "Novo";
    }

    // Menos de 7 dias
    if (diffDays < 7) {
        return "Desta semana";
    }

    // Mais de 7 dias -> retorna o mês
    return created.toLocaleDateString("pt-BR", {
        month: "long",
    });
}
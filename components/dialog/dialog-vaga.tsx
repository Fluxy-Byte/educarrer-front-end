import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge"

export interface VacancyDTO {
    id: number;
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
    createdAt: Date;
    updatedAt: Date;
}

interface DialogVagasProps {
    vacancy: VacancyDTO
}


export function DialogVaga({ vacancy }: DialogVagasProps) {
    return (
        <Dialog key={vacancy.id}>
            <DialogTrigger asChild>
                <Button className="flex flex-col h-auto items-start justify-start gap-2 w-full bg-zinc-200 border-3 border-zinc-200 rounded-md p-4 hover:bg-blue-700/20 hover:border-blue-700">
                    <span className="hover:underline text-black text-lg font-semibold">
                        {vacancy.title}
                    </span>
                    <span className="text-zinc-700 font-medium text-sm">
                        • {vacancy.company} ( {vacancy.modality} )
                    </span>
                    <span className="text-sm mt-2">
                        {vacancy.technologies.map((tech) => (
                            <Badge
                                key={tech}
                                className={`mb-2 mr-2 text-white ${getTechColor(tech)}`}
                            >
                                {tech}
                            </Badge>
                        ))}
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-black text-xl">
                        {vacancy.title}
                    </DialogTitle>

                    <DialogDescription className="flex text-zinc-600 flex-wrap gap-2 mt-2 text-sm">
                        <span>{vacancy.company}</span>
                        <span>• {vacancy.location}</span>
                        <span>• {vacancy.modality}</span>
                        <span>• {vacancy.level}</span>
                    </DialogDescription>
                </DialogHeader>

                {/* Salário destaque */}
                <div className="bg-blue-700/20 border border-blue-700 rounded-lg p-3 text-black font-semibold">
                    💰 {vacancy.salary}
                </div>

                {/* Tecnologias */}
                <div>
                    <p className="text-sm font-semibold mb-2 text-zinc-700">
                        Tecnologias esperadas
                    </p>
                    <div className="flex flex-wrap">
                        {vacancy.technologies.map((tech) => (
                            <Badge
                                key={tech}
                                className={`mr-2 mb-2 text-white ${getTechColor(tech)}`}
                            >
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Descrição */}
                <div className="max-h-[200px] overflow-y-auto pr-2">
                    <p className="text-md text-zinc-700 leading-relaxed whitespace-pre-line">
                        {vacancy.description}
                    </p>
                </div>

                {/* Footer */}
                <DialogFooter className="flex justify-between mt-4">
                    <div className="w-auto h-auto flex justify-start items-center">
                        <Button variant={"link"}>
                            Criar estudo
                        </Button>
                    </div>
                    <div className="w-full h-auto flex justify-end items-center gap-3">
                        <DialogClose asChild>
                            <Button type="button" variant="close">
                                Fechar
                            </Button>
                        </DialogClose>

                        <a href={vacancy.link} target="_blank">
                            <Button variant={"secondary"}>
                                🚀 Candidatar-se
                            </Button>
                        </a>
                    </div>

                </DialogFooter>
            </DialogContent>
        </Dialog>
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
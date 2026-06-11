import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createStudy } from "@/app/services/study.swr";
import { ToastPersonalizado } from "@/components/toast";
import { LoaderCircle } from "lucide-react";
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
import { DialogVacancyUpdate } from "@/components/dialog/dialog-vacancy.update";
import { Badge } from "@/components/ui/badge"

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
}

interface DialogVagasProps {
    vacancy: Vacancy
}


export function DialogVagaAdmin({ vacancy }: DialogVagasProps) {
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [open, setOpen] = useState(false);

    const handleClosed = () => {
        setOpen(false);
    }

    async function handleCreateStudy(id: string) {
        setIsLoading(true);
        await createStudy(id);
        setIsLoading(false);
        console.log("Criar estudo para a vaga:", vacancy);
        setIsLoading(false);
    }

    return (
        <div>
            <Button
                onClick={() => setOpen(true)}
                className="flex flex-col h-auto items-start justify-start gap-2 w-full bg-zinc-200 border-3 border-zinc-200 rounded-md p-4 hover:bg-blue-700/20 hover:border-blue-700"
            >
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
            <DialogVacancyUpdate vacancy={vacancy} open={open} onOpenChange={setOpen} />
        </div>
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
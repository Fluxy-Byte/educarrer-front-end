import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandDialog
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trash2, SquarePen, Calendar } from "lucide-react";
import { DialogSkillUpdate } from "@/components/dialog/dialog-skill.update";
import { useState } from "react";
import { ToastPersonalizado } from "@/components/toast";
import { Skill, deleteSkill, useSkills } from "@/app/services/skills.swr"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface DialogSkillProps {
    skill: Skill,
    key: string
}

export default function CadsSkill({ skill }: DialogSkillProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const { refresh } = useSkills();

    const handleDelete = async () => {
        try {
            setIsLoading(true)
            const result = await deleteSkill(skill.id);
            ToastPersonalizado({ mensagem: result.message || "Habilidade deletada com sucesso!" });
        } catch (error: any) {
            console.error(error);
            ToastPersonalizado({ mensagem: "Erro ao deletar habilidade tente novamente." });
        } finally {
            await refresh();
            setIsLoading(false);
        }
    }

    return (
        <Card key={skill.id} className="w-full flex flex-row items-center p-4 gap-4 rounded-2xl">
            <CardContent className="flex flex-row items-center gap-4 p-0 flex-1">

                {/* Ícone/Nome da tecnologia */}
                <span className={`w-auto px-4 py-3 rounded-xl flex items-center justify-center ${getTechColor(skill.name)}`}>
                    <h1 className="text-base font-semibold whitespace-nowrap">
                        {skill.name}
                    </h1>
                </span>

                {/* Nível + Badge */}
                <div className="w-auto flex flex-col items-center justify-center gap-2">
                    <Badge className={`${getLevelColor(skill.level)}`}>{getLevelAvaliation(skill.level)}</Badge>
                    <div className="flex gap-1">
                        <span className={`w-4 h-2 rounded-sm ${skill.level >= 1 ? "bg-orange-500!" : "bg-zinc-300!"}`}></span>
                        <span className={`w-4 h-2 rounded-sm ${skill.level >= 3 ? "bg-orange-500!" : "bg-zinc-300!"}`}></span>
                        <span className={`w-4 h-2 rounded-sm ${skill.level >= 5 ? "bg-orange-500!" : "bg-zinc-300!"}`}></span>
                        <span className={`w-4 h-2 rounded-sm ${skill.level >= 7 ? "bg-orange-500!" : "bg-zinc-300!"}`}></span>
                        <span className={`w-4 h-2 rounded-sm ${skill.level >= 9 ? "bg-orange-500!" : "bg-zinc-300!"}`}></span>
                    </div>
                </div>

                {/* Descrição */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button onClick={() => setOpen(true)} size={"link"} variant="link_card" className="w-1/4 text-left flex-1 text-sm text-zinc-500">
                            {skill.about ? `${skill.about.slice(0, 50)}...` : "Sem informações"}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Clique aqui para ver a descrição completa</p>
                    </TooltipContent>
                </Tooltip>

                <CommandDialog open={open} onOpenChange={setOpen}>
                    <Command className="p-4 flex flex-col gap-4 justify-start items-center text-center max-h-[80vh]">
                        <h1 className="text-black text-xl font-bold">Descrição da habilidade</h1>
                        <p className="text-black overflow-y-auto pr-2 text-justify w-full max-h-[60vh]">
                            {skill.about}
                        </p>
                    </Command>
                </CommandDialog>

                {/* Data atualizada */}
                <span className="w-1/5 flex items-center gap-2 text-sm text-zinc-500 whitespace-nowrap">
                    <Calendar className="w-4 h-4" />
                    <span>
                        Atualizado<br />
                        {skill.updatedAt ? formatDateTime(skill.updatedAt) : "Não encontramos uma data no momento"}
                    </span>
                </span>

                <div className="w-auto flex gap-2 items-center">
                    <Button variant={"create"} size="icon" onClick={() => setOpenUpdate(true)}>
                        <SquarePen className="w-4 h-4" />
                    </Button>
                    <Button
                        variant={"destructive"}
                        size="icon"
                        onClick={() => handleDelete()}
                        disabled={isLoading}
                    >
                        {
                            isLoading ? (
                                <Loader2 className="animate-spin w-4 h-4" />
                            ) : (
                                <Trash2 className="w-4 h-4" />
                            )
                        }
                    </Button>
                </div>

                <DialogSkillUpdate
                    skill={skill}
                    open={openUpdate}
                    onOpenChange={setOpenUpdate}
                />
            </CardContent>
        </Card>
    )
}

// Formata data e hora: dd/MM/yyyy HH:mm
function formatDateTime(date: null | Date): string {

    if (!date) return "Não encontramos uma data no momento"

    const d = new Date(date);

    if (isNaN(d.getTime())) return "Data inválida";

    const dia = String(d.getDate()).padStart(2, "0");
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const ano = d.getFullYear();
    const horas = String(d.getHours()).padStart(2, "0");
    const minutos = String(d.getMinutes()).padStart(2, "0");

    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}

function getLevelColor(level: number): string {
    const map: Record<string, string> = {
        1: "bg-red-100 text-red-600 border-red-500 px-3 py-1",
        2: "bg-red-100 text-red-600 border-red-500 px-3 py-1",
        3: "bg-red-100 text-red-600 border-red-500 px-3 py-1",
        4: "bg-purple-100 text-purple-600 border-purple-600 px-3 py-1",
        5: "bg-purple-100 text-purple-600 border-purple-600 px-3 py-1",
        6: "bg-purple-100 text-purple-600 border-purple-600 px-3 py-1",
        7: "bg-blue-100 text-blue-600 border-blue-600 px-3 py-1",
        8: "bg-blue-100 text-blue-600 border-blue-600 px-3 py-1",
        9: "bg-green-100 text-green-600 border-green-600 px-3 py-1",
        10: "bg-green-100 text-green-600 border-green-600 px-3 py-1",
        "default": "bg-zinc-100 text-zinc-600 border-zinc-500 px-3 py-1"
    };
    return map[level] || map["default"];
}

function getLevelAvaliation(level: number): string {
    const map: Record<string, string> = {
        1: "Iniciante",
        2: "Iniciante",
        3: "Iniciante",
        4: "Intermediário",
        5: "Intermediário",
        6: "Intermediário",
        7: "Profissional",
        8: "Profissional",
        9: "Experte",
        10: "Experte",
        "default": "Não identificado"
    };
    return map[level] || map["default"];
}

function getTechColor(tech: string): string {
    const map: Record<string, string> = {
        "React": "bg-blue-500 text-white",
        "JavaScript": "bg-yellow-400 text-black",
        "TypeScript": "bg-blue-600 text-white",
        "HTML": "bg-orange-500 text-white",
        "CSS": "bg-blue-400 text-white",
        "Node.js": "bg-green-600 text-white",
        "Java": "bg-orange-600 text-white",
        "Spring Boot": "bg-green-700 text-white",
        ".NET": "bg-purple-600 text-white",
        "C#": "bg-purple-700 text-white",
        "PHP": "bg-indigo-500 text-white",
        "Laravel": "bg-red-500 text-white",
        "Go": "bg-cyan-500 text-white",
        "React Native": "bg-blue-500 text-white",
        "Flutter": "bg-sky-500 text-white",
        "Python": "bg-blue-800 text-white",
        "Pandas": "bg-purple-500 text-white",
        "SQL": "bg-gray-600 text-white",
        "Power BI": "bg-yellow-600 text-black",
        "Machine Learning": "bg-pink-500 text-white",
        "TensorFlow": "bg-orange-600 text-white",
        "PyTorch": "bg-red-500 text-white",
        "Docker": "bg-blue-700 text-white",
        "Kubernetes": "bg-indigo-600 text-white",
        "AWS": "bg-orange-400 text-black",
        "Azure": "bg-blue-700 text-white",
        "Cypress": "bg-green-500 text-white",
        "Google Cloud": "bg-green-500 text-white",
        "Selenium": "bg-lime-600 text-white",
        "Postman": "bg-orange-500 text-white",
        "Git": "bg-orange-500 text-white",
        "default": "bg-black text-white"
    };
    return map[tech] || map["default"];
}
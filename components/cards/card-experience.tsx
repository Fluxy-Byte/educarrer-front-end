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
import { useState } from "react";
import { ToastPersonalizado } from "@/components/toast";
import { DialogExperienceUpdate } from "@/components/dialog/dialog-experience.update";
import { deleteExperience, Experience, useExperiences } from "@/app/services/experiences.swr"

interface DialogSkillProps {
    experience: Experience,
    key: string
}

export default function CadsExperience({ experience }: DialogSkillProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const { refresh } = useExperiences();

    const handleDelete = async () => {
        try {
            setIsLoading(true)
            const result = await deleteExperience(experience.id);
            ToastPersonalizado({ mensagem: result.message || "Experiência deletada com sucesso!" });
        } catch (error: any) {
            console.error(error);
            ToastPersonalizado({ mensagem: "Erro ao deletar experiência tente novamente." });
        } finally {
            await refresh()
            setIsLoading(false);
        }
    }

    return (
        <Card key={experience.id} className="w-full flex flex-row items-center p-4 gap-4 rounded-2xl">
            <CardContent className="flex flex-row items-center gap-4 p-0 flex-1">

                {/* Avatar com inicial */}
                <span className={`w-14 h-14 flex items-center justify-center rounded-xl text-white text-2xl font-bold ${getCompanyColor(experience.name)}`}>
                    {experience.name?.charAt(0).toUpperCase()}
                </span>

                {/* Nome, cargo e período */}
                <div className="flex flex-col gap-1 min-w-[180px]">
                    <h1 className="text-base font-semibold text-black">
                        {experience.name}
                    </h1>
                    <p className="text-sm font-medium text-blue-600">
                        {experience.seniority}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <Calendar className="w-4 h-4" />
                        <span>
                            {formatPeriod(experience.startDate, experience.endDate, experience.currentJob)}
                        </span>
                        {experience.currentJob && (
                            <Badge className="bg-green-100 text-green-600 border-green-500 px-2 py-0.5">
                                Atual
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Descrição */}
                <Button onClick={() => setOpen(true)} size={"link"} variant="link_card" className="text-left flex-1 text-sm text-zinc-500">
                    {experience.about ? `${experience.about.slice(0, 100)}...` : "Sem informações"}
                </Button>
                <CommandDialog open={open} onOpenChange={setOpen}>
                    <Command className="p-4 flex flex-col gap-4 justify-start items-center text-center max-h-[80vh]">
                        <h1 className="text-black text-xl font-bold">Descrição da experiência</h1>
                        <p className="text-black overflow-y-auto pr-2 text-justify w-full max-h-[60vh]">
                            {experience.about}
                        </p>
                    </Command>
                </CommandDialog>

                {/* Ações */}
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

                <DialogExperienceUpdate
                    experience={experience}
                    open={openUpdate}
                    onOpenChange={setOpenUpdate}
                />
            </CardContent>
        </Card>
    )
}

// Formata período: "Mês/Ano - Mês/Ano" ou "Mês/Ano - Presente"
function formatPeriod(startDate?: Date | null, endDate?: Date | null, currentJob?: boolean): string {
    const formatMonthYear = (date: Date) => {
        const meses = [
            "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
            "Jul", "Ago", "Set", "Out", "Nov", "Dez"
        ];
        const d = new Date(date);
        return `${meses[d.getMonth()]} ${d.getFullYear()}`;
    };

    if (!startDate) return "Data não informada";

    const start = formatMonthYear(startDate);

    if (currentJob) return `${start} - Presente`;

    if (!endDate) return start;

    return `${start} - ${formatMonthYear(endDate)}`;
}

// Formata data e hora: dd/MM/yyyy HH:mm
function formatDateTime(date?: Date | null): string {
    if (!date) return "Não encontramos uma data no momento";

    const d = new Date(date);

    if (isNaN(d.getTime())) return "Data inválida";

    const dia = String(d.getDate()).padStart(2, "0");
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const ano = d.getFullYear();
    const horas = String(d.getHours()).padStart(2, "0");
    const minutos = String(d.getMinutes()).padStart(2, "0");

    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}

// Cor do avatar baseada no nome da empresa
function getCompanyColor(name: string): string {
    const colors = [
        "bg-blue-700", "bg-red-600", "bg-green-600", "bg-purple-600",
        "bg-orange-500", "bg-indigo-600", "bg-pink-600", "bg-cyan-600",
        "bg-amber-600", "bg-teal-600"
    ];

    if (!name) return colors[0];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
}
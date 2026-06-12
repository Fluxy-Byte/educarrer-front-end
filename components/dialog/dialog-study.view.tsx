"use client";

import { Button } from "@/components/ui/button";
import { Trash2, CloudUpload, Loader2 } from "lucide-react";
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

import { DialogExperienceUpdate } from "@/components/dialog/dialog-experience.update";
import { deleteExperience } from "@/app/services/experiences.swr"
import { useState } from "react";
import { useSkills } from "@/app/services/skills.swr";
import { ToastPersonalizado } from "@/components/toast";

export interface Experience {
    id: string;
    name: string;
    seniority: string;
    about: string;
    startDate?: Date | null;
    endDate?: Date | null;
    userId: string;
}

interface DialogSkillProps {
    experience: Experience,
    key: string
}

export function DialogExperienceView({ experience }: DialogSkillProps) {
    const [openUpdate, setOpenUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [openView, setOpenView] = useState(false);
    const { refresh } = useSkills();

    const handleDelete = async () => {
        try {
            setIsLoading(true)
            const result = await deleteExperience(experience.id);
            ToastPersonalizado({ mensagem: result.message || "Habilidade deletada com sucesso!" });
            setOpenView(false);
        } catch (error) {
            console.error(error);
            ToastPersonalizado({ mensagem: "Erro ao deletar habilidade tente novamente." });
        } finally {
            await refresh()
            setIsLoading(false);
        }
    }

    return (
        <Dialog key={experience.id} open={openView} onOpenChange={setOpenView}>
            <DialogTrigger asChild>
                <Button
                    onClick={() => setOpenView(true)}
                    className="w-auto"
                    variant={"create"}>
                    <span>
                        {experience.name}
                    </span>
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <div>
                        <DialogTitle className="text-black text-xl">
                            {experience.name}
                        </DialogTitle>

                        <DialogDescription className="text-zinc-600 mt-2 flex flex-col gap-2 text-sm">
                            <span className="text-black">
                                Nível de senioridade: {experience.seniority}
                            </span>

                            <span className="text-black">
                                Detalhes da experiência: {experience.about}
                            </span>

                            <span className="text-black">
                                Data de início: {experience.startDate ? new Date(experience.startDate).toLocaleDateString() : "Data de início não informada"}
                            </span>

                            <span className="text-black">
                                Data de término: {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : "Data de término não informada"}
                            </span>
                        </DialogDescription>
                    </div>
                </DialogHeader>


                {/* Footer */}
                <DialogFooter className="flex justify-between mt-4">
                    <DialogClose asChild>
                        <Button type="button" variant="close">
                            Fechar
                        </Button>
                    </DialogClose>
                    <div className="flex justify-start gap-2 items-center">
                        <Button variant={"create"} onClick={() => setOpenUpdate(true)}>
                            <CloudUpload /> Atualizar
                        </Button>
                        <Button onClick={() => handleDelete()}>
                            {
                                isLoading ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <span className="flex gap-2 items-center"><Trash2 /> Deletar</span>
                                )
                            }
                        </Button>
                    </div>

                </DialogFooter>

            </DialogContent>
            <DialogExperienceUpdate
                experience={experience}
                open={openUpdate}
                onOpenChange={setOpenUpdate}
            />
        </Dialog>
    );
}
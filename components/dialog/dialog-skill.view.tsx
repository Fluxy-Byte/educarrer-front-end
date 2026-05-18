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

import { DialogSkillUpdate } from "@/components/dialog/dialog-skill.update";
import { ToastPersonalizado } from "@/components/toast";
import { Skill, deleteSkill } from "@/app/services/skills.swr"
import { useState } from "react";
import { useSkills } from "@/app/services/skills.swr";

interface DialogSkillProps {
    skill: Skill,
    key: string
}

export function DialogSkillView({ skill }: DialogSkillProps) {
    const [openUpdate, setOpenUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [openView, setOpenView] = useState(false);
    const { refresh } = useSkills();

    const handleDelete = async () => {
        try {
            setIsLoading(true)
            const result = await deleteSkill(skill.id);
            ToastPersonalizado({ mensagem: result.message || "Habilidade deletada com sucesso!" });
            setOpenView(false);
        } catch (error: any) {
            console.error(error);
            ToastPersonalizado({ mensagem: "Erro ao deletar habilidade tente novamente." });
        } finally {
            await refresh();
            setIsLoading(false);
        }
    }

    return (
        <Dialog key={skill.id} open={openView} onOpenChange={setOpenView}>
            <DialogTrigger asChild>
                <Button
                    onClick={() => setOpenView(true)}
                    className="w-auto"
                    variant={"secondary"}>
                    <span>
                        {skill.name}
                    </span>
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <div>
                        <DialogTitle className="text-black text-xl">
                            {skill.name}
                        </DialogTitle>

                        <DialogDescription className="text-zinc-600 mt-2 flex flex-col gap-2 text-sm">
                            <span className="text-black">
                                Nível de conhecimento: {skill.level}
                            </span>

                            <span className="text-black">
                                Detalhes de conhecimento: {skill.about}
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
                        <Button variant={"secondary"} onClick={() => setOpenUpdate(true)}>
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
            <DialogSkillUpdate
                skill={skill}
                open={openUpdate}
                onOpenChange={setOpenUpdate}
            />
        </Dialog>
    );
}
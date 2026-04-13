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

import { Input } from "../ui/input";



import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Skill, deleteSkill } from "@/app/services/skills.swr"

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createSkill } from "@/app/services/skills.swr";
import { useState } from "react";
import { useSkills } from "@/app/services/skills.swr";


const skillSchema = z.object({
    nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    nivel: z
        .number()
        .min(0, "Mínimo é 0")
        .max(10, "Máximo é 10"),
    descricao: z.string().min(5, "Descrição deve ter pelo menos 5 caracteres"),
});

type SkillFormData = z.infer<typeof skillSchema>;

interface DialogSkillProps {
    skill: Skill,
    key: string
}

export function DialogSkillView({ skill }: DialogSkillProps) {
    const [openUpdate, setOpenUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [openView, setOpenView] = useState(false);
    const { refresh } = useSkills();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<SkillFormData>({
        resolver: zodResolver(skillSchema),
        defaultValues: {
            nivel: undefined,
        },
    });


    const onSubmit = async (data: SkillFormData) => {
        try {
            setIsLoading(true)
            await createSkill(data.nome, data.nivel, data.descricao);
        } catch (error) {
            console.error(error);
        } finally {
            reset();
            await refresh()
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setIsLoading(true)
            const result = await deleteSkill(skill.id);
            setOpenView(false);
        } catch (error) {
            console.error(error);
        } finally {
            reset();
            await refresh()
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
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "../ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Skill, updateSkill, useSkills } from "@/app/services/skills.swr";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ToastPersonalizado } from "@/components/toast";

const skillSchema = z.object({
    nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    nivel: z.number().min(0).max(10),
    descricao: z.string().min(5),
});

type SkillFormData = z.infer<typeof skillSchema>;

interface DialogSkillUpdateProps {
    skill: Skill;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DialogSkillUpdate({
    skill,
    open,
    onOpenChange,
}: DialogSkillUpdateProps) {
    const { refresh } = useSkills();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<SkillFormData>({
        resolver: zodResolver(skillSchema),
    });

    useEffect(() => {
        if (skill) {
            reset({
                nome: skill.name,
                nivel: skill.level,
                descricao: skill.about ?? "",
            });
        }
    }, [skill, reset]);

    const onSubmit = async (data: SkillFormData) => {
        try {
            const result = await updateSkill(skill.id, data.nome, data.nivel, data.descricao);
            ToastPersonalizado({ mensagem: result.message || "Habilidade atualizada com sucesso!" });
            onOpenChange(false);
        } catch (error: any) {
            console.error(error);
            ToastPersonalizado({ mensagem: "Erro ao atualizar habilidade" });
        } finally {
            await refresh();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-black text-xl">
                        Atualizar habilidade
                    </DialogTitle>

                    <DialogDescription className="text-zinc-600 mt-2 text-sm">
                        Edite os dados da habilidade.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >

                    {/* Nome */}
                    <div>
                        <Input
                            placeholder="Nome da habilidade"
                            {...register("nome")}
                        />
                        {errors.nome && (
                            <p className="text-red-500 text-sm">
                                {errors.nome.message}
                            </p>
                        )}
                    </div>

                    {/* Nivel */}
                    <div>
                        <Controller
                            control={control}
                            name="nivel"
                            render={({ field }) => (
                                <Select
                                    onValueChange={(value) =>
                                        field.onChange(Number(value))
                                    }
                                    value={
                                        field.value !== undefined
                                            ? String(field.value)
                                            : ""
                                    }
                                >
                                    <SelectTrigger
                                        className="w-full h-12! border border-zinc-200 bg-white! text-black!"
                                    >
                                        <SelectValue className="placeholder:text-zinc-200" placeholder="Selecione o nível" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {Array.from({ length: 11 }, (_, i) => (
                                            <SelectItem key={i} value={String(i)}>
                                                {i}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />

                        {errors.nivel && (
                            <p className="text-red-500 text-sm">
                                {errors.nivel.message}
                            </p>
                        )}
                    </div>

                    {/* Descrição */}
                    <div>
                        <Input
                            placeholder="Descrição"
                            {...register("descricao")}
                        />
                        {errors.descricao && (
                            <p className="text-red-500 text-sm">
                                {errors.descricao.message}
                            </p>
                        )}
                    </div>

                    {/* Footer */}
                    <DialogFooter className="flex justify-between mt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="close">
                                Fechar
                            </Button>
                        </DialogClose>

                        <Button type="submit" variant={"secondary"}>
                            Atualizar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
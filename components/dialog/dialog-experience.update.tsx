"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; 
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

import { CloudUpload } from "lucide-react";
import { updateExperience, useExperiences } from "@/app/services/experiences.swr";
import { ToastPersonalizado } from "@/components/toast";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Schema
const skillSchema = z.object({
    nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    senioridade: z.string().min(2, "Senioridade deve ter pelo menos 2 caracteres"),
    descricao: z.string().min(5, "Descrição deve ter pelo menos 5 caracteres"),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
});

type SkillFormData = z.infer<typeof skillSchema>;

interface DialogSkillUpdateProps {
    experience: Experience,
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export interface Experience {
    id: string;
    name: string;
    seniority: string;
    about: string;
    startDate?: Date | null;
    endDate?: Date | null;
    userId: string;
}

export function DialogExperienceUpdate({
    experience,
    open,
    onOpenChange,
}: DialogSkillUpdateProps) {
    const { refresh } = useExperiences();
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
    if (experience) {
        reset({
            nome: experience.name,
            senioridade: experience.seniority,
            descricao: experience.about ?? "",
            startDate: experience.startDate
                ? new Date(experience.startDate).toISOString().split("T")[0] as any
                : undefined,
            endDate: experience.endDate
                ? new Date(experience.endDate).toISOString().split("T")[0] as any
                : undefined,
        });
    }
}, [experience, reset]);

    const onSubmit = async (data: SkillFormData) => {
        try {
            const result = await updateExperience(experience.id, data.nome, data.senioridade, data.descricao, data.startDate, data.endDate);
            ToastPersonalizado({ mensagem: result.message || "Experiência atualizada com sucesso!" });
            onOpenChange(false);
        } catch (error: any) {
            console.error(error);
            ToastPersonalizado({ mensagem: "Erro ao atualizar experiência. Tente novamente." });
        } finally {
            await refresh();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-black text-xl">
                        Atualizar experiência
                    </DialogTitle>

                    <DialogDescription className="text-zinc-600 mt-2 text-sm">
                        Edite os dados da experiência.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >

                    {/* Nome */}
                    <div>
                        <Label className="text-black!" htmlFor="nome">Nome da experiência</Label>
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
                        <Label className="text-black!" htmlFor="senioridade">Senioridade</Label>
                        <Controller
                            control={control}
                            name="senioridade"
                            render={({ field }) => (
                                <Select
                                    onValueChange={(value) =>
                                        field.onChange(value)
                                    }
                                    value={
                                        field.value !== undefined
                                            ? String(field.value)
                                            : ""
                                    }

                                >
                                    <SelectTrigger
                                        className="w-full h-12! border border-zinc-200 bg-white! text-black! placeholder:text-zinc-200!"
                                    >
                                        <SelectValue className="placeholder:text-zinc-200" placeholder="Selecione a senioridade" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem key="Junior" value="Junior">
                                            Junior
                                        </SelectItem>
                                        <SelectItem key="Pleno" value="Pleno">
                                            Pleno
                                        </SelectItem>
                                        <SelectItem key="Sênior" value="Sênior">
                                            Sênior
                                        </SelectItem>

                                    </SelectContent>
                                </Select>
                            )}
                        />

                        {errors.senioridade && (
                            <p className="text-red-500 text-sm">
                                {errors.senioridade.message}
                            </p>
                        )}
                    </div>

                    {/* Descrição */}
                    <div>
                        <Label className="text-black!" htmlFor="descricao">Descrição</Label>
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

                    { /* Datas */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-black!" htmlFor="startDate">Data de Início</Label>
                            <Input
                                type="date"
                                id="startDate"
                                {...register("startDate", { valueAsDate: true })}
                            />
                        </div>
                        <div>
                            <Label className="text-black!" htmlFor="endDate">Data de Término</Label>
                            <Input
                                type="date"
                                id="endDate"
                                {...register("endDate", { valueAsDate: true })}
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <DialogFooter className="flex justify-between mt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="close">
                                Fechar
                            </Button>
                        </DialogClose>

                        <Button type="submit" variant={"btn_yellow"}>
                            <CloudUpload /> Atualizar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    );
}
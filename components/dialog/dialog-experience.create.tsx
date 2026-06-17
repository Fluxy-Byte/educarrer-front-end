"use client";

import { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodError } from "zod";

import { Button } from "@/components/ui/button";
import { CirclePlus, Plus, Rocket, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Switch } from "@/components/ui/switch";

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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";

import { useExperiences } from "@/app/services/experiences.swr";
import { createExperience } from "@/app/services/experiences.swr";
import { ToastPersonalizado } from "@/components/toast";

const skillSchema = z.object({
    nome: z
        .string()
        .min(2, "Nome deve ter pelo menos 2 caracteres"),

    senioridade: z
        .string()
        .min(2, "Senioridade deve ter pelo menos 2 caracteres"),

    descricao: z
        .string()
        .min(5, "Descrição deve ter pelo menos 5 caracteres"),

    startDate: z.date().optional(),

    endDate: z.date().optional(),

    currentJob: z.boolean().optional(),
});

type SkillFormData = z.infer<typeof skillSchema>;

export function DialogExperienceCreate() {
    const { refresh } = useExperiences();
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SkillFormData>({
        resolver: zodResolver(skillSchema),
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: {
            currentJob: false,
        },
    });

    const currentJob = useWatch({
        control,
        name: "currentJob",
    });

    const onSubmit = async (data: SkillFormData) => {
        try {
            const result = await createExperience(
                data.nome,
                data.senioridade,
                data.descricao,
                data.startDate,
                data.endDate,
                data.currentJob
            );

            ToastPersonalizado({
                mensagem:
                    result.message ||
                    "Experiência cadastrada com sucesso!",
            });

            reset();
            setOpen(false);
        } catch (error: any) {
            if (error instanceof ZodError) {
                error.issues.forEach((err) => {
                    toast.error(err.message);
                });
                return;
            }

            toast.error("Erro ao cadastrar experiência");
        } finally {
            await refresh();
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full bg-purple-50 border-purple-500! text-purple-500!" variant="dashed">
                    <Plus />
                    Adicionar Experiência
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl text-black">
                        Adicionando uma nova experiência
                    </DialogTitle>

                    <DialogDescription className="mt-2 text-sm text-zinc-600">
                        Preencha os dados para adicionar uma nova experiência ao
                        seu perfil para sabermos mais um pouco de sua trajetória.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >
                    {/* Nome */}
                    <div className="w-full flex flex-col gap-2">
                        <Label
                            htmlFor="nome"
                            className="text-black"
                        >
                            Nome de onde você trabalhou ou teve experiência
                        </Label>

                        <Input
                            id="nome"
                            placeholder="Nome da experiência"
                            {...register("nome")}
                        />

                        {errors.nome && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.nome.message}
                            </p>
                        )}
                    </div>

                    {/* Senioridade */}
                    <div className="w-full flex flex-col gap-2">
                        <Label
                            htmlFor="senioridade"
                            className="text-black"
                        >
                            Qual a sua senioridade nesta empresa?
                        </Label>

                        <Controller
                            control={control}
                            name="senioridade"
                            render={({ field }) => (
                                <Select
                                    value={field.value ?? ""}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className="w-full bg-white! border border-zinc-200 rounded-md px-3 text-sm text-black focus:ring-0 focus:ring-offset-0 h-12!">
                                        <SelectValue placeholder="Selecione a senioridade" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="Junior">
                                            Junior
                                        </SelectItem>

                                        <SelectItem value="Pleno">
                                            Pleno
                                        </SelectItem>

                                        <SelectItem value="Sênior">
                                            Sênior
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />

                        {errors.senioridade && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.senioridade.message}
                            </p>
                        )}
                    </div>

                    {/* Descrição */}
                    <div className="w-full flex flex-col gap-2">
                        <Label
                            htmlFor="descricao"
                            className="text-black"
                        >
                            Me conte um pouco sobre essa experiência profissional
                        </Label>

                        <Input
                            id="descricao"
                            placeholder="Descrição da experiência"
                            {...register("descricao")}
                        />

                        {errors.descricao && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.descricao.message}
                            </p>
                        )}
                    </div>

                    {/* Datas */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="w-full flex flex-col gap-2">
                                <Label
                                    htmlFor="startDate"
                                    className="text-black"
                                >
                                    Data de Início
                                </Label>

                                <Input
                                    id="startDate"
                                    type="date"
                                    {...register("startDate", {
                                        valueAsDate: true,
                                    })}
                                />
                            </div>

                            <div className="w-full flex flex-col gap-2">
                                <Label
                                    htmlFor="endDate"
                                    className="text-black"
                                >
                                    Data de Término
                                </Label>

                                <Input
                                    id="endDate"
                                    type="date"
                                    disabled={currentJob}
                                    {...register("endDate", {
                                        valueAsDate: true,
                                    })}
                                />
                            </div>
                        </div>

                        {/* Trabalho Atual */}
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="w-full flex flex-col gap-2">
                                <Label
                                    htmlFor="currentJob"
                                    className="text-black"
                                >
                                    Trabalho Atual
                                </Label>

                                <p className="text-sm text-gray-400">
                                    Marque esta opção se você ainda esta ativo nessa experiência.
                                </p>
                            </div>

                            <Controller
                                control={control}
                                name="currentJob"
                                render={({ field }) => (
                                    <Switch
                                        id="currentJob"
                                        checked={field.value ?? false}
                                        onCheckedChange={(checked) => {
                                            field.onChange(checked);

                                            if (checked) {
                                                setValue(
                                                    "endDate",
                                                    undefined
                                                );
                                            }
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <DialogFooter className="mt-4 flex justify-between">
                        <Button
                            type="submit"
                            variant="create"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ?
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="animate-spin" /> Adicionando...
                                </span>
                                :
                                <span className="flex items-center justify-center gap-2">
                                    <Rocket /> Adicionar
                                </span>
                            }
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
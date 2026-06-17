"use client";

import { Button } from "@/components/ui/button";
import { Plus, Rocket, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
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
import { Input } from "../ui/input";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    SelectSeparator
} from "@/components/ui/select";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodError } from "zod";
import { createSkill, useSkills } from "@/app/services/skills.swr";
import { useState } from "react";
import { ToastPersonalizado } from "@/components/toast";
import { Label } from "../ui/label";

import skillsTI from "@/components/dialog/skills.json";

const skillSchema = z.object({
    nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    nivel: z.number().min(1).max(10),
    descricao: z.string().min(5, "Descrição deve ter pelo menos 5 caracteres"),
});

type SkillFormData = z.infer<typeof skillSchema>;

export function DialogSkillCreate() {
    const { refresh } = useSkills();
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SkillFormData>({
        resolver: zodResolver(skillSchema),
        mode: "onSubmit",
        reValidateMode: "onSubmit"
    });

    const onSubmit = async (data: SkillFormData) => {
        try {
            const result = await createSkill(data.nome, data.nivel, data.descricao);
            ToastPersonalizado({ mensagem: result.message || "Habilidade cadastrada com sucesso!" });
            reset();
            setOpen(false);

        } catch (error: any) {
            if (error instanceof ZodError) {
                error.issues.forEach((err) => {
                    ToastPersonalizado({ mensagem: err.message });
                });
            } else {
                ToastPersonalizado({ mensagem: "Erro ao cadastrar habilidade" });
            }
        } finally {
            await refresh();
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full" variant={"dashed"}>
                    <Plus /> Adicionar habilidade
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-black text-xl">
                        Adicionar uma nova habilidade
                    </DialogTitle>

                    <DialogDescription className="text-zinc-600 mt-2 text-sm">
                        Aqui e necessário que preencha suas habilidades de desenvolvimento ou pessoal para que possamos utilizalas com as recomendações e com a geração de estudos personalizados.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                    {/* Nome */}
                    <div className="w-full flex flex-col gap-2">
                        <Label className="text-black!" htmlFor="nome">Qual o nome dessa habilidade?</Label>
                        <Controller
                            control={control}
                            name="nome"
                            render={({ field }) => (
                                <Select
                                    onValueChange={(value) => field.onChange(value)}
                                    value={field.value ?? ""}
                                >
                                    <SelectTrigger className="w-full h-12! border border-zinc-200 bg-white! text-black!">
                                        <SelectValue className="placeholder:text-zinc-200" placeholder="Selecione uma habilidade" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {Object.entries(skillsTI).map(([group, items]) => (
                                            <SelectGroup  key={group}>
                                                <SelectLabel className="text-gray-400">{group}</SelectLabel>
                                                {items.map((v, i) => (
                                                    <SelectItem key={v + i} value={v}>
                                                        {v}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        
                        {errors.nome && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.nome.message}
                            </p>
                        )}
                    </div>

                    {/* Nível */}
                    <div className="w-full flex flex-col gap-2">
                        <Label className="text-black!" htmlFor="nivel">Considerando 1 como fraco e 10 como forte, qual o seu nível de conhecimento ou experiência?</Label>
                        <Controller
                            control={control}
                            name="nivel"
                            render={({ field }) => (
                                <Select
                                    onValueChange={(value) => field.onChange(Number(value))}
                                    value={field.value !== undefined ? String(field.value) : ""}
                                >
                                    <SelectTrigger className="w-full h-12! border border-zinc-200 bg-white! text-black">
                                        <SelectValue className="placeholder:text-zinc-200" placeholder="Selecione o nível" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {Array.from({ length: 10 }, (_, i) => (
                                            <SelectItem key={i + 1} value={String(i + 1)}>
                                                {i + 1}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />

                        {errors.nivel && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.nivel.message}
                            </p>
                        )}
                    </div>

                    {/* Descrição */}
                    <div className="w-full flex flex-col gap-2">
                        <Label className="text-black!" htmlFor="descricao">Descreva um pouco sobre oque você ja fez ou praticou com essa habilidade.</Label>
                        <Textarea

                            placeholder="Descrição da habilidade"
                            {...register("descricao")}
                        />
                        {errors.descricao && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.descricao.message}
                            </p>
                        )}
                    </div>

                    {/* Footer */}
                    <DialogFooter className="flex justify-between mt-4">
                        <Button
                            type="submit"
                            variant="create"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ?
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="animate-spin" /> Adicionando...
                                </span> :
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
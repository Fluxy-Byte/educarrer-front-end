"use client";

import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { Label } from "@/components/ui/label";
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
import { useSkills } from "@/app/services/skills.swr";
import { Input } from "../ui/input";
import { ToastPersonalizado } from "@/components/toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodError } from "zod";
import { createExperience } from "@/app/services/experiences.swr";
import { useState } from "react";
import { toast } from "sonner";

const skillSchema = z.object({
    nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    senioridade: z.string().min(2, "Senioridade deve ter pelo menos 2 caracteres"),
    descricao: z.string().min(5, "Descrição deve ter pelo menos 5 caracteres"),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
});

type SkillFormData = z.infer<typeof skillSchema>;

export function DialogExperienceCreate() {
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
            const result = await createExperience(data.nome, data.senioridade, data.descricao, data.startDate, data.endDate);
            ToastPersonalizado({ mensagem: result.message || "Experiência cadastrada com sucesso!" });
            reset();
            setOpen(false);
            return;
        } catch (error: any) {
            if (error instanceof ZodError) {
                error.issues.forEach((err) => {
                    toast.error(err.message);
                    console.log(error)
                });
                return;
            } else {
                toast.error("Erro ao cadastrar experiência");
                return;
            }
        } finally {
            await refresh();
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"btn_yellow"}>
                    <CirclePlus /> Nova Experiência
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-black text-xl">
                        Nova Experiência
                    </DialogTitle>

                    <DialogDescription className="text-zinc-600 mt-2 text-sm">
                        Preencha os dados para adicionar uma nova experiência ao seu perfil.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                    {/* Nome */}
                    <div>
                        <Label className="text-black!" htmlFor="nome">Nome da experiência</Label>
                        <Input
                            placeholder="Nome da experiência"
                            {...register("nome")}
                        />
                        {errors.nome && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.nome.message}
                            </p>
                        )}
                    </div>

                    {/* Nível */}
                    <div className="w-full">
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
                                        <SelectValue className="placeholder:text-zinc-200!" placeholder="Selecione a senioridade" />
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
                            <p className="text-red-500 text-sm mt-1">
                                {errors.senioridade.message}
                            </p>
                        )}
                    </div>

                    {/* Descrição */}
                    <div>
                        <Label className="text-black!" htmlFor="descricao">Descrião</Label>
                        <Input
                            placeholder="Descrição da habilidade"
                            {...register("descricao")}
                        />
                        {errors.descricao && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.descricao.message}
                            </p>
                        )}
                    </div>

                    {/* Datas */}
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
                            <Button
                                type="button"
                                variant="close"
                                onClick={() => reset()}
                            >
                                Fechar
                            </Button>
                        </DialogClose>

                        <Button
                            type="submit"
                            variant="btn_yellow"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
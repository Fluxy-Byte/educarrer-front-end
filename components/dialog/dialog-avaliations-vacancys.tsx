import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { createAvaliationVancancy } from "@/app/services/avaliationsVacancy.swr"
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button"
import { ToastPersonalizado } from "@/components/toast";

interface DialogAvaliationsVacancysProps {
    active: boolean;
    closeDialog: () => void;
}

export function DialogAvaliationsVacancys({ active, closeDialog }: DialogAvaliationsVacancysProps) {

    const handleAvaliationVacancys = async (avaliation: boolean) => {
        try {
            const res = await createAvaliationVancancy(avaliation);
            ToastPersonalizado({ mensagem: res.message || "Avaliação coletada com sucesso!" });
        } catch (e) {
            ToastPersonalizado({ mensagem: "Erro durante a coleta da avaliação!" });
        }finally {
            closeDialog();
        }
    }

    return (
        <Dialog open={active}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-black text-xl">Poderia fazer uma avaliação?</DialogTitle>
                    <DialogDescription className="text-zinc-600 mt-2 text-sm">
                        Para continuar melhorando a experiência, gostaríamos de saber se você esta gostando das vagas recomendadas para você, sua opinião é muito importante para nós!
                    </DialogDescription>

                    <div className="flex justify-start gap-2 items-center mt-6">
                        <Button
                            className="flex items-center gap-2 pl-4! w-1/2"
                            variant={"link"}
                            onClick={() => handleAvaliationVacancys(true)}
                        >
                            <ThumbsUp className="w-4 h-4" />
                            Sim, estou gostando!
                        </Button>
                        <Button
                            className="flex items-center gap-2 pl-4! w-1/2"
                            variant={"link"}
                            onClick={() => handleAvaliationVacancys(false)}
                        >
                            <ThumbsDown className="w-4 h-4" />
                            Não, não estou gostando!
                        </Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
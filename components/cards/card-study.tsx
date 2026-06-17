import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Command,
    CommandDialog
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trash2, Eye, Calendar } from "lucide-react";
import { DialogSkillUpdate } from "@/components/dialog/dialog-skill.update";
import { useState } from "react";
import { ToastPersonalizado } from "@/components/toast";
import { StudyDTO, useStudies } from "@/app/services/study.swr"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface DialogStudyProps {
    study: StudyDTO,
    key: string
}

export default function CadsStudy({ study }: DialogStudyProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const { refresh } = useStudies();

    const formattedDate = study.createdAt
        ? new Date(study.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
        : "";

    return (
        <Card key={study.id} className="w-full flex flex-row items-center p-4 gap-4 rounded-2xl">
            <CardContent className="flex flex-col lg:flex-row items-center justify-between gap-4 p-0 flex-1">

                <span className={`w-auto px-4 py-3 rounded-xl flex items-center justify-center`}>
                    <h1 className="text-black w-auto text-base sm:text-center font-semibold wrap-break-word">
                        {study.title}
                    </h1>
                </span>

                <div className="w-auto flex gap-4 items-center">
                    <p className="text-zinc-600">
                        {formattedDate}
                    </p>
                    <Link href={`/learning/${study.id}`}>
                        <Button variant={"create"} size="icon">
                            <Eye className="w-4 h-4" />
                        </Button>
                    </Link>

                </div>

            </CardContent>
        </Card>
    )
}
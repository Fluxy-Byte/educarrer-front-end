import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";
import { StudyDTO } from "@/app/services/study.swr"

import TooltipPerso from "@/components/tooltip";
import { useViewPort } from "@/components/viewport";

interface DialogStudyProps {
    study: StudyDTO,
    key: string
}

export default function CadsStudy({ study }: DialogStudyProps) {
    const { isMobile, isTablet } = useViewPort();

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

                <span className={`w-auto px-4 py-3 rounded-xl flex ${isMobile ? "flex-col!" : ""} items-center justify-center gap-1`}>
                    <p className="text-black font-bold">
                        Estudo:
                    </p>
                    <p className="text-black w-auto text-base sm:text-center wrap-break-word">
                        {study.title}
                    </p>
                </span>

                <span className="flex flex-col text-center gap-1">
                    <p className="text-black font-bold">
                        Nome da vaga:
                    </p>
                    <p className="text-zinc-600">
                        {study.vacancy.title}
                    </p>
                </span>

                <span className="flex flex-col text-center gap-1">
                    <p className="text-black font-bold">
                        Data de criação:
                    </p>
                    <p className="text-zinc-600">
                        {formattedDate}
                    </p>
                </span>



                <div className={`w-auto flex ${isMobile ? "flex-col!" : ""} gap-4 items-center`}>

                    <TooltipPerso
                        id="verestudo"
                        message="Clique para ver o estudo"
                    >
                        <Link href={`/learning/${study.id}`}>
                            <Button variant={"create"}>
                                <Eye className="w-4 h-4" /> Ver estudo
                            </Button>
                        </Link>
                    </TooltipPerso>


                </div>

            </CardContent>
        </Card>
    )
}
import { NextResponse } from "next/server";
import { auth } from "@/lib/utils/auth";
import { getVacancys } from "@/lib/database/repositories/vacancy";

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { status: false, skills: [], message: "Não encontramos a sessão do usuario" },
        { status: 401 }
      );
    }

    const vagas = await getVacancys();

    return NextResponse.json({
      status: true,
      vagas,
      message: "Sucesso na consulta"
    });
  } catch (e: any) {
    return NextResponse.json({
      status: false,
      vagas: [],
      message: "Erro interno no servidor"
    })
  }
}

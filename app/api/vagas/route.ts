import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { getVagas } from "@/lib/database/vagas.mock";

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

    const vagas = await getVagas();

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

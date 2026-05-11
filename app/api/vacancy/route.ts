import { NextResponse } from "next/server";
import { auth } from "@/lib/utils/auth";
import { getVacancys } from "@/lib/services/vacancy";

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { status: false, vacancys: [], message: "Não encontramos a sessão do usuario" },
        { status: 401 }
      );
    }

    const vacancys = await getVacancys();

    return NextResponse.json({
      status: true,
      vacancys,
      message: "Sucesso na consulta"
    });
  } catch (e: any) {
    return NextResponse.json({
      status: false,
      vacancys: [],
      message: "Erro interno no servidor"
    })
  }
}

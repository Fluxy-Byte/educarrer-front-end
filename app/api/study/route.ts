import { NextResponse } from "next/server";
import { auth } from "@/lib/utils/auth";
import { getStudyByUserId, createStudy } from "@/lib/services/study";
import { CreateStudyDTO } from "@/lib/interfaces/study.interface";

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { status: false, studies: [], message: "Não encontramos a sessão do usuario" },
        { status: 401 }
      );
    }

    const user = session.user;

    const studies = await getStudyByUserId(user.id);

    return NextResponse.json({
      status: true,
      studies,
      message: "Sucesso na consulta dos estudos do usuário"
    });
  } catch (e: any) {
    return NextResponse.json({
      status: false,
      studies: [],
      message: "Erro interno no servidor"
    })
  }
}

export async function POST(req: Request) {
  try {
    const { name, about, } = await req.json();

    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { status: false, studies: null, message: "Não encontramos a sessão do usuário" },
        { status: 401 }
      );
    }

    const user = session.user;

    const data: CreateStudyDTO = {
      title: name,
      study: about,
      userId: user.id
    }

    const studies = await createStudy(data);

    return NextResponse.json({
      status: true,
      studies,
      message: "Sucesso na criação da study"
    });
  } catch (e: any) {
    console.error(e);

    return NextResponse.json(
      {
        status: false,
        studies: null,
        message: "Erro interno no servidor"
      },
      { status: 500 }
    );
  }
}
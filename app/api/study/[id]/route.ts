import { NextResponse } from "next/server";
import { auth } from "@/lib/utils/auth";
import { deleteStudy, updateStudy } from "@/lib/services/study";
import { UpdateStudyDTO } from "@/lib/interfaces/study.interface";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session || !session.user || !id) {
      return NextResponse.json(
        {
          status: false,
          message: "Não encontramos a sessão do usuário ou id da organização",
        },
        { status: 401 }
      );
    }

    await deleteStudy(
      id
    );

    return NextResponse.json({
      status: true,
      message: "Sucesso ao deletar a experiência",
    });
  } catch (e) {
    return NextResponse.json(
      {
        status: false,
        message: "Erro interno no servidor",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      {
        status: false,
        study: null,
        message: "ID da study não fornecido"
      },
      { status: 400 }
    );
  }

  try {
    const { title, study } = await req.json();

    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { status: false, experience: null, message: "Não encontramos a sessão do usuário" },
        { status: 401 }
      );
    }

    const data: Partial<UpdateStudyDTO> = {
      title,
      study,
      updatedAt: new Date(),
    }

    const resultStudy = await updateStudy(
      id,
      data
    );

    return NextResponse.json({
      status: true,
      study: resultStudy,
      message: "Sucesso na atualização"
    });
  } catch (e: any) {
    console.error(e);

    return NextResponse.json(
      {
        status: false,
        study: null,
        message: "Erro interno no servidor"
      },
      { status: 500 }
    );
  }
}
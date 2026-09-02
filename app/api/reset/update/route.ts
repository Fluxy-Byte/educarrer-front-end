import { NextResponse } from "next/server";
import { authClient } from "@/lib/utils/auth-client";

export async function POST(req: Request) {
  try {
    const { password, token } = await req.json();

    const { data, error } = await authClient.resetPassword({
      newPassword: password,
      token: token,
    });

    return NextResponse.json({
      status: data?.status ?? false,
      message: data?.status == true ? "Senha atualizada com sucesso" : error?.message
    },
    { status: data?.status ? 204 : 400 });
  } catch (e: any) {
    console.error(e);

    return NextResponse.json(
      {
        status: false,
        message: "Erro interno no servidor"
      },
      { status: 500 }
    );
  }
}


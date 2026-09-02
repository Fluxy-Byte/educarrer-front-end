import { NextResponse } from "next/server";
import { authClient } from "@/lib/utils/auth-client";
import { ResetPassword } from "@/lib/services/resetPassword";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          status: false,
          message: "Necessário um token para validar a possibilidade de alteração de senha",
        },
        { status: 500 }
      );
    }

    const resetPassword = new ResetPassword();
    const resFilterReset = await resetPassword.getResetPasswordByTokenToReset(id);

    return NextResponse.json({
      status: resFilterReset,
      message: resFilterReset == true ? "Cliente apto a alterar senha" : "Cliente não esta apto a alterar a senha, possivel causa seja o token expirado ou ja utilizado",
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

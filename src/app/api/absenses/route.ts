import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import axios from 'axios';

const currentYear = new Date().getFullYear();

export async function GET() {
  const session = await getServerSession(authOptions);

  const response = await axios.get(`https://suap.ifrn.edu.br/api/v2/minhas-informacoes/boletim/${currentYear}/1/`, {
    headers: {
      Authorization: `Bearer ${session?.user.token}`,
    },
  });
  
  return NextResponse.json(response.data);
}
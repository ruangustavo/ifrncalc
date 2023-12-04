"use client";

import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
	const { data, status } = useSession();

	if (status === "authenticated") {
		return (
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				Você está logado com sucesso! {data?.accessToken}
			</h1>
		);
	}

	return (
		<>
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				IFRN Calc
			</h1>
			<Button className="mt-2" onClick={() => signIn("suap")}>
				Entrar com SUAP
			</Button>
		</>
	);
}

"use client";

import { Button } from "@/components/ui/button";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
	const { status } = useSession();

	if (status === "authenticated") {
		redirect("/dashboard");
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

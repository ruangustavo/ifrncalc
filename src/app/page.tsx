"use client";

import { GithubCorner } from "@/components/github-corner";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { ExternalLink } from "lucide-react";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  const { status } = useSession();

  if (status === "authenticated") {
    redirect("/dashboard");
  }

  return (
    <>
      <aside>
        <GithubCorner />
      </aside>
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col max-w-xl mx-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">{siteConfig.name}</h1>
          <small className="text-muted-foreground">{siteConfig.description}</small>
          <Button className="mt-4" onClick={() => signIn("suap")}>
            Entrar com SUAP
            <ExternalLink size={20} className="ml-2" />
          </Button>
        </div>
      </main>
      <footer className="p-4 bg-slate-50 flex items-center justify-center">
        <Image
          src={"https://github.com/ruangustavo.png"}
          width={32}
          height={32}
          className="rounded-full"
          alt="Imagem de perfil do GitHub de @ruangustavo"
        />
        <p className="text-sm text-muted-foreground ml-2">
          Desenvolvido por{" "}
          <a
            href="https://github.com/ruangustavo"
            target="_blank"
            rel="noreferrer"
          >
            @ruangustavo
          </a>
        </p>
      </footer>
    </>
  );
}

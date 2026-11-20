import { BrowserBarArt } from "./browser-bar-art"
import { ConfirmArt } from "./confirm-art"
import { CopyLinkButton } from "./copy-link-button"
import { InstallSteps } from "./install-steps"
import { IosConfirmArt } from "./ios-confirm-art"
import { IosToolbarArt } from "./ios-toolbar-art"
import { MenuArt } from "./menu-art"
import { PromptInstallButton } from "./prompt-install-button"
import { ShareActionsArt } from "./share-actions-art"
import type { InstallContext } from "./use-install-context"

export function InstallGuideBody({ context }: { context: InstallContext }) {
  switch (context.kind) {
    case "ios":
      return (
        <InstallSteps
          steps={[
            {
              text: (
                <>
                  Toque em <strong>Compartilhar</strong> na barra do Safari.
                </>
              ),
              art: <IosToolbarArt />,
            },
            {
              text: (
                <>
                  Toque em <strong>Ver mais</strong>.
                </>
              ),
              art: <ShareActionsArt />,
            },
            {
              text: (
                <>
                  Toque em <strong>Adicionar à Tela de Início</strong>. Se não
                  aparecer, abra o site no Safari primeiro.
                </>
              ),
              art: (
                <MenuArt
                  above="Buscar na Página"
                  target="Adicionar à Tela de Início"
                  below="Marcação"
                />
              ),
            },
            {
              text: (
                <>
                  Deixe <strong>Abrir como App Web</strong> ligado e toque em{" "}
                  <strong>Adicionar</strong>.
                </>
              ),
              art: <IosConfirmArt />,
            },
          ]}
        />
      )
    case "android-manual":
      return (
        <InstallSteps
          steps={[
            {
              text: (
                <>
                  Toque no <strong>⋮</strong> do navegador.
                </>
              ),
              art: <BrowserBarArt />,
            },
            {
              text: (
                <>
                  Toque em <strong>Instalar app</strong> ou em{" "}
                  <strong>Adicionar à tela inicial</strong>.
                </>
              ),
              art: (
                <MenuArt
                  above="Favoritos"
                  target="Instalar app"
                  below="Compartilhar"
                />
              ),
            },
            {
              text: (
                <>
                  Confirme em <strong>Instalar</strong>.
                </>
              ),
              art: <ConfirmArt action="Instalar" />,
            },
          ]}
        />
      )
    case "android-prompt":
      return <PromptInstallButton prompt={context.prompt} />
    case "in-app": {
      const browser = context.os === "ios" ? "Safari" : "Chrome"

      return (
        <div className="grid gap-4">
          <InstallSteps
            steps={[
              {
                text: (
                  <>
                    Você está no navegador de outro app, e por ele não dá pra
                    instalar. Toque no{" "}
                    <strong>{context.os === "ios" ? "⋯" : "⋮"}</strong> e em{" "}
                    <strong>Abrir no {browser}</strong>.
                  </>
                ),
                art: (
                  <MenuArt
                    above="Copiar link"
                    target={`Abrir no ${browser}`}
                    below="Compartilhar"
                  />
                ),
              },
            ]}
          />
          <CopyLinkButton browser={browser} />
        </div>
      )
    }

    case "installed":
      return (
        <p className="text-sm text-pretty text-muted-foreground">
          Pronto. Abra o IFRN Calc pelo ícone na sua tela inicial.
        </p>
      )
    case "unsupported":
      return (
        <p className="text-sm text-pretty text-muted-foreground">
          Abra o IFRN Calc no celular pra instalar.
        </p>
      )
  }
}

"use client"

import * as React from "react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

interface BaseProps {
  children: React.ReactNode
}

interface RootCredenzaProps extends BaseProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface CredenzaProps extends BaseProps {
  className?: string
  asChild?: true
}

const CredenzaContext = React.createContext<{ isDesktop: boolean }>({
  isDesktop: false,
})

const useCredenzaContext = () => {
  const context = React.useContext(CredenzaContext)

  if (!context) {
    throw new Error(
      "Credenza components cannot be rendered outside the Credenza Context",
    )
  }

  return context
}

const Credenza = ({ children, ...props }: RootCredenzaProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const Root = isDesktop ? Dialog : Drawer

  return (
    <CredenzaContext.Provider value={{ isDesktop }}>
      <Root {...props} {...(!isDesktop && { autoFocus: true })}>
        {children}
      </Root>
    </CredenzaContext.Provider>
  )
}

const CredenzaTrigger = ({ className, children, ...props }: CredenzaProps) => {
  const { isDesktop } = useCredenzaContext()
  const Trigger = isDesktop ? DialogTrigger : DrawerTrigger

  return (
    <Trigger className={className} {...props}>
      {children}
    </Trigger>
  )
}

const CredenzaClose = ({ className, children, ...props }: CredenzaProps) => {
  const { isDesktop } = useCredenzaContext()
  const Close = isDesktop ? DialogClose : DrawerClose

  return (
    <Close className={className} {...props}>
      {children}
    </Close>
  )
}

const CredenzaContent = ({ className, children, ...props }: CredenzaProps) => {
  const { isDesktop } = useCredenzaContext()
  const Content = isDesktop ? DialogContent : DrawerContent

  return (
    <Content className={className} {...props}>
      {children}
    </Content>
  )
}

const CredenzaDescription = ({
  className,
  children,
  ...props
}: CredenzaProps) => {
  const { isDesktop } = useCredenzaContext()
  const Description = isDesktop ? DialogDescription : DrawerDescription

  return (
    <Description className={className} {...props}>
      {children}
    </Description>
  )
}

const CredenzaHeader = ({ className, children, ...props }: CredenzaProps) => {
  const { isDesktop } = useCredenzaContext()
  const Header = isDesktop ? DialogHeader : DrawerHeader

  return (
    <Header className={className} {...props}>
      {children}
    </Header>
  )
}

const CredenzaTitle = ({ className, children, ...props }: CredenzaProps) => {
  const { isDesktop } = useCredenzaContext()
  const Title = isDesktop ? DialogTitle : DrawerTitle

  return (
    <Title className={className} {...props}>
      {children}
    </Title>
  )
}

const CredenzaBody = ({ className, children, ...props }: CredenzaProps) => {
  return (
    <div className={cn("px-4 md:px-0", className)} {...props}>
      {children}
    </div>
  )
}

const CredenzaFooter = ({ className, children, ...props }: CredenzaProps) => {
  const { isDesktop } = useCredenzaContext()
  const Footer = isDesktop ? DialogFooter : DrawerFooter

  return (
    <Footer
      className={cn(
        "p-0 [&>button]:text-base md:[&>button]:text-sm",
        className,
      )}
      {...props}
    >
      {children}
    </Footer>
  )
}

export {
  Credenza,
  CredenzaTrigger,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaBody,
  CredenzaFooter,
}

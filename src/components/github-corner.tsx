import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Icons } from "./icons"

export const GithubCorner = () => {
  return (
    <Link
      href={siteConfig.links.github}
      className="absolute top-0 right-0 z-20 cursor-pointer xl:fixed"
    >
      <Icons.octocat className="size-16" />
    </Link>
  )
}

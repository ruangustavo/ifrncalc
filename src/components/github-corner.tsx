import { siteConfig } from '@/config/site'
import Link from 'next/link'
import { Icons } from './icons'

export const GithubCorner = () => {
  return (
    <Link
      href={siteConfig.links.github}
      className="absolute right-0 top-0 z-20 cursor-pointer xl:fixed"
    >
      <Icons.octocat className="size-16" />
    </Link>
  )
}

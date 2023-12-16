import Link from 'next/link'
import { Icons } from './icons'
import { siteConfig } from '@/config/site'

export const GithubCorner = () => {
  return (
    <Link
      href={siteConfig.links.github}
      className="top-0 right-0 xl:fixed absolute z-20 cursor-pointer"
    >
      <Icons.octocat className="w-16 h-16" />
    </Link>
  )
}

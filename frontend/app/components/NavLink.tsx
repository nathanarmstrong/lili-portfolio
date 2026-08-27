import Link from 'next/link'

export default function NavLink({
  href,
  children,
  underline,
}: {
  href: string
  children: React.ReactNode
  underline?: boolean
}) {
  return (
    <li>
      <Link href={href} className="group transition duration-300">
        {children}
        {underline && (
          <span className="block bg-white h-0.5 max-w-0 group-hover:max-w-full transition-all duration-500" />
        )}
      </Link>
    </li>
  )
}

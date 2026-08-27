'use client'
import Link from 'next/link'

export default function StyledButton({
  children,
  link,
  color,
  solid,
  onClick,
  className,
}: {
  children: React.ReactNode
  link?: string
  color?: 'primary' | 'secondary' | 'tertiary'
  solid?: boolean
  onClick?: () => void
  className?: string
}) {
  const primaryColor = solid
    ? 'px-4 bg-white text-black border border-white border-solid hover:bg-black hover:text-white *:hover:fill-white'
    : 'text-white border-bottom border-white border-solid'
  const secondaryColor = solid
    ? 'px-4 bg-black text-white border border-solid border-black hover:bg-white hover:text-black *:hover:fill-black'
    : 'bg-black text-white'
  const tertiaryColor = solid
    ? 'px-4 bg-black text-gray-600 border border-solid border-gray-600 hover:bg-white hover:text-black *:hover:fill-white'
    : 'bg-gray-200 text-black'

  let buttonStyle = ''
  switch (color) {
    case 'primary':
      buttonStyle = primaryColor
      break
    case 'secondary':
      buttonStyle = secondaryColor
      break
    case 'tertiary':
      buttonStyle = tertiaryColor
      break
    default:
      color = 'primary'
  }
  const styleClasses = ` py-2 ${buttonStyle}  ${className || ''}`
  return (
    <>
      {link && (
        <Link href={link} className={styleClasses}>
          {children}
        </Link>
      )}
      {!link && (
        <button onClick={onClick} className={styleClasses}>
          {children}
        </button>
      )}
    </>
  )
}

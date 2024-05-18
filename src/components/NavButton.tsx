import React from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

interface NavButtonProps {
  route: string
  className?: string
  text?: string
  children?: React.ReactElement
}

export const NavButton: React.FC<NavButtonProps> = ({
  route,
  className,
  text,
  children
}) => {
  return (
    <Link to={route} className={twMerge('navButton', className)}>
      {text}
      {children}
    </Link>
  )
}

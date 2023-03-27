import Link from "next/link"
import { useRouter } from "next/router"
import { FC, ReactNode } from "react"

interface Props {
  text: string
  children: ReactNode
  customHref?: string
}

const SideLink: FC<Props> = ({ text, children, customHref }) => {

  const { pathname } = useRouter()

  return (
    <Link
      href={customHref ?? ''}
      className={`
        mx-auto py-2 px-4 w-full 
        rounded-md 
        hover:bg-slate-700 
        border-2 hover:border-slate-700
        flex align-middle gap-4 
        cursor-pointer 
        active:bg-slate-600 
        ${pathname === customHref ? "bg-slate-700 border-slate-200 hover:border-slate-200" : "bg-slate-600 border-slate-600"}
      `}
    >
      {
        children
      }
      <p className="text-white hidden lg:block" > {text}</p>
    </Link >
  )
}

export default SideLink
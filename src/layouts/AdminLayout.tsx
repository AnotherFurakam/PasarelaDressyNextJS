import { AdminNavbar } from "@/components/AdminNavbar"
import { AdminSidebar } from "@/components/AdminSidebar"
import { FC, ReactNode } from "react"
import Media from "react-media";

interface Props {
  children: ReactNode
}

export const AdminLayout: FC<Props> = ({ children }) => {

  return (
    <>
      <div className="flex md:flex-row">
        <Media queries={{
          media: "(min-width: 500px)"
        }}>
          {
            matches => (
              <>
                {matches.media ? <AdminSidebar /> : <></>}
              </>
            )
          }
        </Media>
        <div className="w-full grid grid-cols-1 grid-rows-[auto_1fr]">
          <AdminNavbar />
          <main className="flex w-full">
            <div className="bg-gray-100 w-full p-3 flex justify-center">
              <div className='shadow-xl rounded-md w-full max-w-[1280px] overflow-hidden h-[806px] my-auto'>
                {
                  children
                }
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

AdminLayout.propTypes = {}

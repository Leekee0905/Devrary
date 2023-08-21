import Header from "@/components/Header";
import React, {ReactNode} from "react"

const Layout = ({children}: {children: ReactNode}) => {
  return (
    <div>
      <Header/>
      <main>{children}</main>
    </div>
  )
}

export default Layout;
import { About } from "./Component/About"
import { Events } from "./Component/Events"
import { Header } from "./Component/Header"
import { Mission } from "./Component/Mission"
import { Trustee } from "./Component/Trustee"
import { Vision } from "./Component/Vision"

function HomePage() {
  return (
    <>
      <Header/>
      <About/>
      <Vision/>
      <Mission/>
      <Trustee/>
      <Events/>
      
    </>
  )
}

export default HomePage

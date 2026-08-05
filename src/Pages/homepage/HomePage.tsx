import { About } from "./component/About"
import { Events } from "./component/Events"
import { Header } from "./component/Header"
import { Mission } from "./component/Mission"
import { Services } from "./component/Services"
import { Trustee } from "./component/Trustee"
import { Vision } from "./component/Vision"

function HomePage() {
  return (
    <>
      <Header/>
      <About/>
      <Services/>
      {/* <Vision/> */}
      <Mission/>
      <Trustee/>
      <Events/>
      
    </>
  )
}

export default HomePage

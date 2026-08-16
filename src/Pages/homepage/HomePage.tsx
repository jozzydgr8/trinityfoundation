import { About } from "./component/About"
import { Achievement } from "./component/Achievement"
import { Cta } from "./component/Cta"
import { Events } from "./component/Events"
import { Header } from "./component/Header"
import { Impact } from "./component/Impact"
import { Mission } from "./component/Mission"
import { Services } from "./component/Services"
import { Trustee } from "./component/Trustee"
import { Vision } from "./component/Vision"

function HomePage() {
  return (
    <>
      <Header/>
       <About/>
      <Cta/>
     
      <Services/>
      <Achievement/>
      {/* <Vision/> */}
      <Mission/>
      <Trustee/>
      <Impact/>
      <Events/>
      
    </>
  )
}

export default HomePage

import { About } from "./Component/About"
import { Events } from "./Component/Events"
import { Header } from "./Component/Header"
import { Mission } from "./Component/Mission"
import { Vision } from "./Component/Vision"

function HomePage() {
  return (
    <>
      <Header/>
      <About/>
      <Vision/>
      <Mission/>
      <Events/>
    </>
  )
}

export default HomePage

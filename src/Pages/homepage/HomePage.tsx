import { About } from "./component/About"
import { Achievement } from "./component/Achievement"
import { Cta } from "./component/Cta"
import { Events } from "./component/Events"
import { Header } from "./component/Header"
import { Impact } from "./component/Impact"
import { Mission } from "./component/Mission"
import { Product } from "./component/Product"
import { Services } from "./component/Services"
import { Trustee } from "./component/Trustee"


function HomePage() {
  return (
    <>
      <Header/>
       <About/>
      <Cta/>
     
      <Services/>
      <Achievement/>

      <Mission/>
      <Trustee/>
      <Impact/>
      <Product/>
      <Events/>
      
    </>
  )
}

export default HomePage

import { Auth } from "../components/Auth"
import { Quotes } from "../components/Quote"

export const Signin = () => {
      return (

            <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div>
                        <Auth type="signin" />
                  </div>

                  <div className="invisible md:visible">
                        <Quotes />
                  </div>
            </div>      
      )}
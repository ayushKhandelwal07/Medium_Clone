import { Auth } from "../components/Auth"
import { Quotes } from "../components/Quote"

export const Signup = () => {
      return (
            <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div>
                        <Auth type="signup" />
                  </div>

                  <div className="invisible lg:visible">
                        <Quotes />
                        
                  </div>
            </div>
      )
}
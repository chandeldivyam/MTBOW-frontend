import ReactGA from "react-ga4";
const GA_MID = "G-0F9LXVEJKC"

export function initializeGa(){
    if(GA_MID){
      ReactGA.initialize([
      {
        trackingId: GA_MID,
        gtagOptions: {
          send_page_view: false,
        }
      }
      ]);
      ReactGA.set({
        dimension2: "userId"
      })
    }
}

export function trackPageView(userId, path){
    if(!userId || !path) return
    if(GA_MID){
      ReactGA.gtag("set", "user_properties", { userId: userId })
      ReactGA.send({ hitType: "pageview", page: path });
    }
  }

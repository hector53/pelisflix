export const state = () => ({
    urlProcesos: 'https://api.pelisflix.com/',
    urlBase: 'http://localhost:3000/',
    skeleton:0, 
    DesYearI: 0, 
    DesYearE: 2020, 
    DesImdbI: 0, 
    DesImdbE: 0, 
    DesGenSerie: "", 
    DesPais: "", 
    s: "serie", 
    sessionCookie: false, 
    arraySession: {}, 
    dropdownHeader: false, 
    opa: false, 
    siteName: 'Pelisflix',
    siteUrlSeo: 'beta.pelisflix.com',
    siteUrl: 'https://beta.pelisflix.com/',
    titleHome: 'Pelisflix ▷ Ver Peliculas y Series Online Gratis Completas HD',
    descripcionHome: 'En ✅ Pelisflix ✅ puedes ver peliculas y series online gratis HD en Español, Latino y Subtitulado. Ver Estrenos, Episodios y Temporadas Completas en HD.'
  })

  export const getters = {
    getSkeleton: (state) => {
      return state.skeleton
    }, 

  }

  export const mutations = {
    setSkeleton(state, val){
      state.skeleton = val;
    }, 
    
    scrollToTopCine() {
        window.scrollTo(0,0);
        
   //     console.log(this.state.skeleton)
      }, 
      scrollToTop() {
        window.scrollTo(0,0);
        this.state.skeleton = 0;
   //     console.log(this.state.skeleton)
      }, 
      enableordisableCookie(state, payload) {
          if(payload.confirm == true){
            this.state.arraySession = payload.cookie
            this.state.sessionCookie = true
        //    console.log(this.state.arraySession)
          }else{
            this.state.arraySession = {}
            this.state.sessionCookie = false
          }
             
      }
  }
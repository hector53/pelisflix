export const state = () => ({
    urlProcesos: 'https://api.pelisflix.com/',
    urlBase: 'https://pelisflix.com/',
    skeleton:0, 
    DesYearI: 0, 
    DesYearE: 2020, 
    DesImdbI: 0, 
    DesImdbE: 0, 
    DesGenSerie: "", 
    DesPais: "", 
    s: "pelicula", 
    sessionCookie: false, 
    arraySession: {}, 
    dropdownHeader: false, 
    opa: false, 
    siteName: 'Pelisflix',
    siteUrlSeo: 'pelisflix.com',
    siteUrl: 'https://pelisflix.com/',
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
    setS(state, val){
      state.s = val;
    },
    setDesYearI(state, val){
      state.DesYearI = val;
    }, 
    setDesYearE(state, val){
      state.DesYearE = val;
    }, 
    setDesImdbI(state, val){
      state.DesImdbE = val;
    },
    setDesImdbE(state, val){
      state.DesImdbE = val;
    },
    setDesGenSerie(state, val){
      state.DesGenSerie = val;
    },
    setDesPais(state, val){
      state.DesPais = val;
    },
    setStateAll(state, val){

      state.DesYearI = val;
      state.DesYearE = val;
      state.DesImdbI = val;
      state.DesImdbE = val;
      state.DesGenSerie = "";
      state.DesPais = "";
      state.s = "pelicula";
    },
    
    scrollToTopCine() {
        window.scrollTo(0,0);
        
   //     console.log(this.state.skeleton)
      }, 
      scrollToTop() {
        window.scrollTo(0,0);
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
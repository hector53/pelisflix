<template>
  <div class="inner-content container" id="page-archive">
    <div class="ui grid mb-0">
      <div
        class="left floated sixteen wide tablet twelve wide computer column pb-0"
      >
        <h1 class="page-title pt-sm">
          <font style="vertical-align: inherit"
            ><font style="vertical-align: inherit"
              >Series de {{tituloCat}}</font
            ></font
          >
        </h1>
        <div class="sub-title pt-sm pb-sm mb-sm">
          <font >Vea las mejores Series de {{tituloCat}} en 
            HD completa y sin cortes, online en español latino Gratis, en calidad 1080p (HD)</font>
        </div>
      </div>
      <div
        class="right floated sixteen wide tablet four wide computer wide column"
        id="di-all-items"
      >
        <div class="watch-together-button">
          <nuxt-link  :to="{name:'series'}" class="ui primary button mt-sm" >
            <font >Todas las Series</font></nuxt-link>
        </div>
      </div>
    </div>

    <div class="dark-segment">
     <GenerosSeries />

      <MoviesList :genSlug="genSlug" :arrayUltimas="arrayMoviesGeneros" :totalPaginas="totalPaginas" :paginaActual="paginaActual" 
    :num_actual_ini="num_actual_ini" :num_actual_fin="num_actual_fin" :urlTest="urlTest" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from "axios";
import { mapState } from "vuex";
import GenerosSeries from '@/components/GenerosSeries/GenerosSeries.vue'; 
import MoviesList from '@/components/GenerosSeries/MoviesList.vue'; 

export default {
  name: "GenerosPeliculas",
  components: {GenerosSeries, MoviesList},
  async asyncData({ params, store, context }) {
    var parametro = params.slug.replace("-", " "); 
    return {generoParam: parametro}
  },
 head(){
    return {
      
      title: "Ver Series de "+this.generoParam+" Online. Serie "+this.generoParam+" en Latino, Castellano y Subtitulado Completa en HD Gratis.",
            meta: [
                { name: 'description', content:  this.$store.state.descripcionHome},
                { property: 'og:locale', content: 'es_ES'},
                { property: 'og:title', content: this.$store.state.titleHome},
                { property: 'og:site_name', content: this.$store.state.siteName},
                {property: 'og:type', content: 'website'},    
                {property: 'og:url', content: this.$store.state.siteUrl+"series/genero/"+this.$route.params.slug},   
                { name: 'twitter:card', content:  'summary_large_image'}, 
                {name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} 
            ], 
            link: [
      { rel: 'canonical', href: this.$store.state.siteUrl }, 
      
    ]
    }
  },
  data() {
    return {
          totalPaginas: 0, 
       registrosxPag: 20,
      paginaActual: 1, 
       num_actual_ini: 1,
        num_actual_fin: 3,
        ini: 0, 
        fin: 20,
        urlTest: {}, 
        arrayMoviesGeneros: [], 
        genSlug: this.$route.params.slug,
        tituloCat: ""
    };
  },
  computed: {
    ...mapState(["urlProcesos"]),
  },
  methods: {
      	async getVerPeliculas(){
  console.log(this.urlProcesos +
          "wp-json/peliculas/generos/?q=getMoS&slug="+this.$route.params.slug+"&xPag="+
          this.registrosxPag+"&ini="+this.ini+"&fin="+this.fin)
            await fetch(this.urlProcesos +
          "wp-json/peliculas/generos/?q=getMoS&slug="+this.$route.params.slug+"&xPag="+
          this.registrosxPag+"&ini="+this.ini+"&fin="+this.fin)
                    .then((r) => r.json())
                    .then((res) => {
                  //  console.log(res)
              
                    
                        this.arrayMoviesGeneros =  res[0].movies
                        this.totalPaginas =  res[0].totalPaginas;
                        this.tituloCat = res[0].titulo;
                      this.paginaActual = parseInt(this.$route.params.pag); 
                     if(this.$route.params.pag > 1){
                       
                   
                       this.fin = this.registrosxPag
                       this.num_actual_fin = 5
                       if(this.$route.params.pag > 4){
                         if(this.$route.params.pag == this.totalPaginas){
                     
                           this.num_actual_ini = this.paginaActual - 2
                           this.num_actual_fin = this.totalPaginas
                         }else
                         {
                            this.num_actual_ini = this.paginaActual - 2
                          this.num_actual_fin = this.paginaActual + 2
                       
                         }
                         
                       }
                       
                     }else
                     {
                       this.paginaActual = 1
                       this.num_actual_fin = 3
                     
                     }
                         this.$store.commit('setSkeleton', 1);
                    
                    }
                    );
           }
  },

  mounted() {
   

    this.getVerPeliculas()
  },

  created() {
    this.$store.commit("setSkeleton", 0);
        if(this.$route.params.pag > 1){
  
    this.ini = (parseInt(this.$route.params.pag) - 1) * this.registrosxPag;
    
}else{

    this.ini = 0; 
}
  },
};
</script>

<style >
</style>

